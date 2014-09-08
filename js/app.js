$(document).ready(function() {

	var min='',
	url='',

//Instagram access info 
	instagram = {                                     
		clientID: '03dfcae06e944df4a0e54fad2c3abcab',
		apiHost: 'https://api.instagram.com',
	}

//Load images from Instagram
	function loadInstagrams() {                      
		$('#backgroundimage').addClass('hidden');
		$('.subtitle').removeClass('hidden');
 		tag = $('input').val();
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: false,
			url: instagram.apiHost + "/v1/tags/" + tag + "/media/recent/?client_id=" + instagram.clientID + "&count=20",
			data: {'client_id': instagram.clientID, 'max_tag_id': min,},
			success: function(pic) {
				min = pic.pagination.next_max_tag_id;
				url = pic.pagination.next_url;
				$('.loading').addClass('hidden');
				$('.controlbutton').removeClass('hidden');
				for (var i = 0; i < pic.data.length; i++) {
					likes = pic.data[i].likes.count;
					link = pic.data[i].link;
					urlsrc = pic.data[i].images.thumbnail.url;
					$("#output").append("<div id='outputpic'><a target='_blank' href='" + link + "'><div id='imgStyle'></div><img src='" + urlsrc + "'></img></div>");
				}  
	        }      
	    });
	}

//Load more pictures when button is clicked
	 $('#morepics').on('click', function() {         
	 	loadInstagrams();
	 })

//Clear pictures, resets page when button is clicked
	 $('#clearall').on('click', function() {        
	 	$('#output').empty();
	 	$('#backgroundimage').removeClass('hidden');
	 	$('.controlbutton').addClass('hidden');
	 	$('input').val('');
	 	$('input').focus();
	 })

//Removes input value on focus	 
	$('input').on('click focusin', function() {      
		this.value = '';
	});

//Automatically submit input after time delay
	var timerid;                                     
	$('input').keyup(function() {
		clearTimeout(timerid);
		timerid = setTimeout(function() { loadInstagrams(); }, 500);
	});
});
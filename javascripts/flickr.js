;$(function(){
	var flickr_search_url = "https://api.flickr.com/services/rest/?" +
        "method=flickr.photos.search&" +
        "api_key=92bd0de55a63046155c09f1a06876875&" +
        "text=hello%20world&" +
        "safe_search=1&" +  // 1 is "safe"
        "content_type=1&" +  // 1 is "photos only"
        "sort=relevance&" +  // another good one is "interestingness-desc"
        "per_page=18";
		
	var flickr_veda_photos = "https://api.flickr.com/services/rest/?" +
        "method=flickr.people.getPublicPhotos&" +
        "api_key=92bd0de55a63046155c09f1a06876875&" +
        "user_id=34215713%40N07&"+
		"per_page=18&"+
		"format=rest";

	var flickr_photo_info = "https://api.flickr.com/services/rest/?" +
        "method=flickr.photos.getInfo&" +
        "api_key=92bd0de55a63046155c09f1a06876875&" +
		"format=json&nojsoncallback=1&" ;

	var PAGENO = 1;

	$('.prev a').on('click', function(){
		loadImages(PAGENO - 1);
	});
	
	$('.next a').on('click', function(){
		loadImages(PAGENO + 1);
	});

	function loadImages(pageNo){
		PAGENO = pageNo = (pageNo = pageNo || 1) < 1? 1 : pageNo;
		$.get(flickr_veda_photos+"&page="+pageNo, showPhotos);
	}
	
	function showPhotos(responseXML) {
		var imgEl = $(".flimages").empty();
		
		var photos = responseXML.getElementsByTagName("photo");

		for (var i = 0, photo; photo = photos[i]; i++) {
			var img = document.createElement("img");
			img.src = constructImageURL(photo);
			img.title = photo.getAttribute('title');
			
			var span = document.createElement("span");
			span.className = 'enlarge';
			span.title = photo.getAttribute('title');
			span.setAttribute('href', constructImageURL(photo, 'b'));
			span.setAttribute('photo_id', photo.getAttribute('id'));
			span.appendChild(img);
			imgEl.append(span);
		}
		imgEl.find('span.enlarge')
			.on('click', enlarge)
			.eq(Math.round((Math.random()*1000)%photos.length)).click();
	}

	// See: http://www.flickr.com/services/api/misc.urls.html
	function constructImageURL(photo, type) {
		type = type || 's';

		return 'https://farm'+photo.getAttribute("farm")+'.staticflickr.com/'+
				photo.getAttribute("server")+'/'+
				photo.getAttribute("id")+'_'+photo.getAttribute("secret")+'_'+type+'.jpg';
	}
	
	function enlarge(){
		var $me = $(this), imgEl = $("#my_view .full_img").empty().show();

		$('body').css({'background-image': "url("+$me.attr('href')+")", 'background-size':'100%'});

		return false;
		/*
		var photoId = $me.attr('photo_id');
		$.get(flickr_photo_info+"&photo_id="+photoId, showPhotoInfo);
		return false;
		*/
	};

	function showPhotoInfo(photoInfo) {
		if(!photoInfo){
			console.log("No photo info arrived...");
			return;
		}
		
		var htm = '', photo = photoInfo.photo;

		var span = document.createElement("span");
		span.innerHTML = JSON.stringify(photo);
		/*
		for(var i in photo){
			if(!photo.hasOwnProperty(i))
				return;			
			htm += '<li><label>'+i+'</label><span>'+photo[i]+'</span></li>';
		}
		span.innerHTML = htm;
		*/
		$("#my_view .full_img").append(span);
	}

	//call it
	loadImages();
});

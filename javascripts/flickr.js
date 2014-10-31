var flickr_search_url = "https://api.flickr.com/services/rest/?" +
        "method=flickr.photos.search&" +
        "api_key=92bd0de55a63046155c09f1a06876875&" +
        "text=hello%20world&" +
        "safe_search=1&" +  // 1 is "safe"
        "content_type=1&" +  // 1 is "photos only"
        "sort=relevance&" +  // another good one is "interestingness-desc"
        "per_page=20";
var flickr_veda_photos = "https://api.flickr.com/services/rest/?" +
        "method=flickr.people.getPublicPhotos&" +
        "api_key=92bd0de55a63046155c09f1a06876875&" +//3a5137e25b65dcd4e9e0e11809de438d
        "user_id=34215713%40N07&"+
		"per_page=18&"+
		"format=rest";
		//"format=json&"+"nojsoncallback=1";

		/*
		//https://c4.staticflickr.com/4/3896/14728357248_b8dcb73ede_n.jpg - small
		//https://c4.staticflickr.com/4/3896/14728357248_b8dcb73ede_c.jpg - big
		<photo id="14728357248" owner="34215713@N07" secret="b8dcb73ede" server="3896" farm="4" title="Trishna's drawings" ispublic="1" isfriend="0" isfamily="0" />

		//https://c2.staticflickr.com/6/5585/14235650864_a6d74aa426_t.jpg - thumbnail
		//https://farm6.staticflickr.com/5585/14235650864_a6d74aa426_t.jpg - thumbnail
		<photo id="14235650864" owner="34215713@N07" secret="a6d74aa426" server="5585" farm="6" title="Sooooo many" ispublic="1" isfriend="0" isfamily="0" />
		
		//flickr.photos.info - Photo information
		*/
		
function loadImages(pageNo){
	PAGENO = pageNo = (pageNo = pageNo || 1) < 1? 1 : pageNo;

	var req = new XMLHttpRequest();
	req.open("GET", flickr_veda_photos+"&page="+pageNo, true);
	req.onload = showPhotos;
	req.send(null);

	function showPhotos() {
		imgEl.innerHTML = '';
		var photos = req.responseXML.getElementsByTagName("photo");

		for (var i = 0, photo; photo = photos[i]; i++) {
			var img = document.createElement("img");
			img.src = constructImageURL(photo);
			img.title = photo.getAttribute(photo.title);
			imgEl.appendChild(img);
		}
	}

	// See: http://www.flickr.com/services/api/misc.urls.html
	function constructImageURL(photo) {

		return 'https://farm'+photo.getAttribute("farm")+'.staticflickr.com/'+
				photo.getAttribute("server")+'/'+
				photo.getAttribute("id")+'_'+photo.getAttribute("secret")+'_s.jpg';

				/*
				return "http://farm" + photo.getAttribute("farm") +
					  ".static.flickr.com/" + photo.getAttribute("server") +
					  "/" + photo.getAttribute("id") +
					  "_" + photo.getAttribute("secret") +
					  "_s.jpg";
				*/
	}
}
var PAGENO = 1, imgEl;

document.addEventListener('DOMContentLoaded', function () {
	imgEl = document.getElementsByClassName("flimages")[0];
	//call it
	loadImages();
	
	document.getElementsByClassName('prev')[0].getElementsByTagName('a')[0].addEventListener('click', function(){
		loadImages(PAGENO - 1);
	});
	document.getElementsByClassName('next')[0].getElementsByTagName('a')[0].addEventListener('click', function(){
		loadImages(PAGENO + 1);
	});
});


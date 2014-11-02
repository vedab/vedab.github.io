function appendResults(blogId, result) {
	//console.log(blogId, ":", result);
	var $blogcont = $('#'+blogId +' .content')
	  , htm='<ul>';
	for(var i=0,s=result.items.length, item; (i < s) && (item=result.items[i]); ++i){
		htm += '<li>';
		htm += '<h4><a href="'+item.url+'" title="'+item.title+'">'+item.title+'</a></h4>';
		htm += '<h6><a href="'+item.url+'" title="'+item.title+'">Published: '+item.published+'</a></h6>';
		htm += '</li>';
	}
	htm += '</ul>';
	//console.log("blogId:",blogId+"; htm:", htm);
	$blogcont.empty().append(htm);
}

function getBlogPosts(blogId) {
	var request = gapi.client.blogger.posts.list({
		'blogId': blogId,
		'view'  : 'READER',
		'fetchImages' : true,
		'fetchBodies' : false,
		'fields': 'items(blog,id,images,published,title,titleLink,updated,url)'
	});

	request.then(function(response) {
		console.log(response);
	  appendResults(blogId, response.result);
	}, function(reason) {
	  console.log('Error: ' + reason.result.error.message);
	});
}

function init() {
	gapi.client.setApiKey('AIzaSyA0XRc2cNq8y1bNFbp5zfD5oQpqEzPRRMo');
	gapi.client.load('blogger', 'v3')
		.then(function(){
			getBlogPosts('5331494767611710968');
			getBlogPosts('5212948442335423983');
		});
}
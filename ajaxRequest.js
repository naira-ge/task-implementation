/* Task Descriptions
1. Create ajax method which, uses XMLHttpRequest under the hood, but returns a promise
2. It should accept two parameters url – remote service endpoint (ex. https://example.com/api/shoes)config – possible configs described further
3. Implement your own Promise library, which ajax must use (for inspiration read the dochttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Possible cases

const p1 = ajax(url, {
  type: “GET” // by default,
  headers: {} // by default,
  data: {}
}).then(() => {}).catch(() => {})

const p2 = ajax(url, {
  type: “GET” // by default,
  headers: {} // by default,
  data: {}
}).then(() => {}).then(() => {}).catch(() => {})

const p3 = ajax(url, {
  type: “GET” by default,
  headers: {} by default,
  data: {}
}).catch(() => {}).then(() => {}).then(() => {})


Promise.all(p1, p2, p3).catch(() => {}).then(([]) => {}).then(() => {})
Promise.all([p1, p2, p3]).catch(() => {}).then(() => {}).then(() => {})

*/
 //Task implementation example 1

 let handle = document.getElementById('response');

let ajaxRequest = function (url, method) {

	// Create the XHR request
	var request = new XMLHttpRequest();

	// Return it as a Promise
	return new Promise(function (resolve, reject) {

		// Setup our listener to process compeleted requests
		request.onreadystatechange = function () {

			// Only run if the request is complete
			if (request.readyState !== 4) return;

			// Process the response
			if (request.status >= 200 && request.status < 300) {
				// If successful
				resolve(request);
			} else {
				// If failed
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}

		};

		// Setup our HTTP request
		request.open(method || 'GET', url, true);

		// Send the request
		request.send();

	});
};

ajaxRequest('https://example.com/api/shoes')
	.then(function (posts) {
		return ajaxRequest('https://example.com/api/shoes' + posts[0].id);
	})
	.then(function (post) {
		return {
			title: post.title.toUpperCase(),
			content: post.body,
			date: post.date
		}
	})
	.then(function (postData) {
		handle.innerHTML = postData;
	})
	.catch(function (error) {
		console.log('Something went wrong', error);
	});


 //Task implementation example 2

async function request(url) {
  var resp = await (
    new Promise( function(resolve,reject){
    var xhr = new XMLHttpRequest();
    xhr.open( "GET", url );
    xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
    if (xhr.status == 200) {
    resolve( xhr );
    }
    else {
    reject( xhr.statusText );
    }
    }
    };
    xhr.send();
    } )
    );
    return resp.responseText;
    }
  
  
    let ajaxRequests = request( "https://example.com/api/shoes" );
    ajaxRequests.then(
    function fulfilled(responseText){
    // ajax success
    },
    function rejected(reason){
    // Oops, something went wrong
    }
    );
  
    
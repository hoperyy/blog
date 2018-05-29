[issue](https://github.com/hoperyy/blog/issues/64)

```
/*
 * 1. req
 		1.0 req.headers
 			req.headers['content-type'] 小写
 		1.1 req.method
 * 		1.2 req.url: 主机名后所有的内容
 * 		1.3 req.on('data', function() {})
 * 		1.4 req.on('end', function() {})
 * 
 */

var qs = require('querystring');
require('http').createServer(function(req, res) {

	if ('/' === req.url) {
		console.log(req.headers);
		res.writeHead(200, { 'Content-Type': 'text/html' });

		res.end([
			'<form method="POST" action="/url">',
				'<h1>My form</h1>',
				'<fieldset>',
				'<label>Personal information</label>',
				'<p>What is your name?</p>',
				'<input type="text" name="name">',
				'<p>How old are you?</p>',
				'<input type="text" name="age">',
				'<p><button>submit</button></p>',
			'</form>'
		].join(' '));
	
	} else if ('/url' === req.url && 'POST' === req.method) {
		var body = '';

		req.on('data', function(chunk) {
			body += chunk;
		});

		// body: name=xxx&age=xxx

		req.on('end', function() {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end('<p>Content-Type: ' + req.headers['content-type'] + '</p>' + 
				'<p>Data: </p><pre>' + JSON.stringify(qs.parse(body)) + '</pre>'
			);
		});
	} else {
		res.writeHead(404);
		res.end('Not Found');
	}

}).listen(3300)
```
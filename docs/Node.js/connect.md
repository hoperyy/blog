[issue](https://github.com/hoperyy/blog/issues/63)

```
var connect = require('connect');
var app = connect();

app.listen(3001);

app.use(function (req, res, next) {
    console.log('req info: ', req.method, req.url)
    next();
});

app.use(function (req, res, next) {

    if ('GET' === req.method && '/images' == req.url.substr(0, 7)) {
        // 托管图片
    } else {
        next();
    }
});

app.use(function (req, res, next) {

    if ('GET' === req.method && '/' == req.url) {
        // 响应 index 文件
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    res.writeHead(200);
    res.end('Not Found');
});
```
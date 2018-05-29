[issue](https://github.com/hoperyy/blog/issues/62)

## 概述

浏览器向服务器发起资源请求，服务器先对资源进行压缩，再返回给浏览器，以此节省流量，加快访问速度。

## 浏览器

通过 HTTP 头部加上 `Accept-Encoding`，告诉服务器可以使用 gzip、defalte 等算法压缩资源。

```
Accept-Encoding:gzip,defalte
```

## Nodejs

在 Nodejs 中，对资源进行压缩的就是 `zlib` 模块。

+   举例：gzip 压缩

    ```
    var fs = require('fs');

    // 知识点
    var zlib = require('zlib');

    // 知识点
    var gzip = zlib.createGzip();

    var in = fs.createReadStream('./test.js');
    var out = fs.createWriteStream('./test.js.gz');

    // 知识点
    in.pipe(gzip).pipe(out);
    ```

+   举例: unzip 解压缩

    ```
    var fs = require('fs');
    var zlib = require('zlib');

    // 知识点
    var gunzip = zlib.createGunzip();

    var in = fs.createReadStream('./test.js.gz');
    var out = fs.createWriteStream('./test.js');

    // 知识点
    in.pipe(gunzip).pipe(out);
    ```

## 服务端 gzip 压缩

第一步：判断是否包含 `Accept-Encoding` 首部，且值为 gzip

+   是：返回压缩的文件
+   否：返回未压缩的文件

```
var http = require('http');
var zlib = require('zlib');
var fs = require('fs');
var filepath = './test.js';

var server = http.createServer(function(req, res) {

    // 知识点
    var acceptEncoding = req.headers['accept-encoding'];

    var gzip;

    if (acceptEncoding.indexOf('zgip') !== -1) {
        gzip = zlib.createGzip();

        // 知识点
        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        });

        // 知识点
        fs.createReadStream(filepath).pipe(gzip).pipe(res);
    } else {
        fs.createReadStream(filepath).pipe(res);
    }
});

server.listen(3000);
```

## 服务端字符串 gzip 压缩

```
var http = require('http');
var zlib = require('zlib');

var responseText = 'hello world';

var server = http.createServer(function(req, res) {
    var acceptEncoding = req.headers['accept-encoding'];

    if (acceptEncoding.indexOf('zgip') !== -1) {
        
        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        });

        // 知识点
        res.end(zlib.gzipSync(responseText));

    } else {
        res.end(responseText);
    }
});

server.listen('3000');
```
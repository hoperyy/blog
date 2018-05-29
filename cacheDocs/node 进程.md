[issue](https://github.com/hoperyy/blog/issues/98)

## demo

parent.js

```
var fork = require('child_process').fork;
var cpus = require('os').cpus();
var server = require('net').createServer();

server.listen(1337);

var workers = {};
var createWorker = function () {
    var worker = fork('./child.js');

    worker.on('exit', function () {
        console.log('worker ' + worker.pid + ' exited.');
        delete workers[worker.id];
        // createWorker();
    });

    worker.on('message', function(message) {
        if (message.act === 'suicide') {
            createWorker();
        }
    })

    worker.send('server', server);

    workers[worker.id] = worker;
    console.log('Create worker. pid: ' + worker.pid);
}

for (var i = 0; i < cpus.length; i++) {
    createWorker();
}

process.on('exit', function () {
    for(var pid in workers) {
        workers[pid].kill();
    }
})
```

child.js

```
var http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('handled by child, pid is ' + process.pid + '\n');
    throw new Error('throw exception');
});

var worker;
process.on('message', function (m, tcp) {
    if (m === 'server') {
        console.log(4);
        worker = tcp;
        tcp.on('connection', function (socket) {
            server.emit('connection', socket);
        })
    }
})

process.on('uncaughtException', function() {
    process.send({act: 'suicide'});
    worker.close(function() {
        process.exit(1);
    });

    setTimeout(() => {
        process.exit(1);
    }, 5000);
})
```
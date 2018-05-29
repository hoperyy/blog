[issue](https://github.com/hoperyy/blog/issues/68)

```
/*
 * 建立一个 Telnet 的聊天室
 * 知识点:
 *  1. 终端 Telnet 输入的任何信息都会立刻发送到服务器，按回车键是为了输入 \n 字符，在 Node 服务器，通过 \n 来判断消息是否已经完全到达
 *  2. net.createServer(callback) 每当客户端连接时会触发回调函数执行
 *  3. conn.setEncoding('utf8') 设置接收到客户端发送的信息为 utf8 而不是默认的 buffer
 *  4. conn.write('message') 服务器向客户端推送消息
 *
 * 使用：
 *  1. 服务器: node index.js
 *  2. 客户端: telnet 127.0.0.1 3000
 */

var net = require('net');

var count = 0;
var users = {};

// 客户端连接时会触发回调
var server = net.createServer(function(conn) {

    // onData 中的 Data 会是 utf8 而不是 buffer 格式
    conn.setEncoding('utf8');

    var nickname;

    console.log('\033[90m   new connection!\033[39m');

    // 向客户端推送消息
    conn.write(
        '\n > welcome to \033[92mnode-chat\033[39m'
        + '\n > ' + count + ' other people are connected at this time.'
        + '\n > please write your name and press enter: '
    );

    count++;

    function broadcast(msg, exceptMyself) {
        for (var i in users) {
            if (!exceptMyself || i !== nickname) {
                users[i].write(msg);
            }
        }
    }

    conn.on('close', function () {
        count--;
        delete users[nickname];
        broadcast('\033[96m > ' + nickname + ' leave \033[39m \n', true);
    });

    // 客户端输入字符后 enter，会向服务器发送数据包，触发回调函数
    conn.on('data', function (data) {

        // 用户在终端 enter 会带入回车字符
        data = data.replace('\r\n', '');

        if (!nickname) {
            if (users[data]) {
                conn.write('\033]93m> nickname already in use. try again:\033[39m ');
                return;
            } else {
                nickname = data;
                users[nickname] = conn;

                for (var i in users) {
                    users[i].write('\033[90m > ' + nickname + ' joined the room\033[39m\n');
                }
            }
            // 否则视为聊天消息
        } else {
            broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n', true);
        }

    });
});

server.listen(3000, function () {
    console.log('\033[96m   server listening on *:3000!\033[39m');
});
```
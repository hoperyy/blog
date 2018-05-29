[issue](https://github.com/hoperyy/blog/issues/24)

## websocket 是什么？

websocket 是 HTML5 提出的协议。

和 HTTP 协议有交集，但不是包含关系。

websocket 是基于 HTTP 的，借用了 HTTP 协议来完成一部分握手，在握手阶段是一样的。

## HTTP 协议有什么缺点？

+	HTTP 协议是不支持持久连接的（长连接、轮询不算）
+	HTTP 连接是无状态的。每次新创建连接，都要经过重新鉴定
+	HTTP 中，Response 是被动的
+	无论是 HTTP 1.0 还是 HTTP 1.1，Request == Response
	+	HTTP 1.0 是一个 Request，一个 Response
	+	HTTP 1.1 进行了改进，有一个 keep-alive，也就是说，在一个 HTTP 连接中，可以发送多个 Request，接收多个 Response
+	ajax 轮询需要服务器有很快的处理速度和资源
+	long poll 需要有很高的并发处理能力

## websocket 有什么优点

+	websocket 是一个持久化的协议，相对于 HTTP 这种非持久的协议来说
+	websocket 和 Nginx 建立持久链接，服务器有信息的时候交给 Nginx，Nginix 统一传输到客户端；没有信息的时候，就交给 Nginx 处理和客户端的连接，不占用资源

## 其他背景知识

客户端到服务端要经过两层代理：HTTP 协议经过 Nginx 等服务器解析，再传送给服务器处理
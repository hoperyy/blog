## HTTP/1.0

HTTP 全称：Hyper Text Transfer Protocol

它伴随着计算机网络和浏览器诞生。

HTTP 处于计算机网络中的应用层。

HTTP 建立在 TCP 协议上，所以 HTTP 协议的瓶颈和优化技巧都是基于 TCP 本身的特性。

影响 HTTP 网络请求的因素主要有两个：带宽和延迟。

以下是 HTTP 的基本优化：

+	带宽

	在拨号上网的时代，这是一个很需要重视的问题，但随着网络基础设施的发展，现在不用担心带宽引起的影响了。

+	延迟

	+	浏览器阻塞

		浏览器会因为一些原因阻塞请求。浏览器对于同一个域名，同时只能有 4 个连接（不同的浏览器限制可能不同），超过浏览器最大请求数的限制，后续请求就会被阻塞。

	+	DNS 查询

		通常可以利用 DNS 缓存来优化。

	+	建立连接

		HTTP 是基于 TCP 的，浏览器最快也要在三次握手时才能捎带 HTTP 请求报文，达到真正的建立连接，但是这些连接如果无法复用就会导致每次请求都经理三次握手。

		三次握手在高延迟的场景下影响比较明显。

## HTTP/1.1

HTTP/1.0 最早应用在网页是 1996 年，那时候主要使用在一些比较简单的网页上和请求上，而 HTTP/1.1 则在 1999 年才开始广泛应用于现在的各大浏览器网络请求中，同时 HTTP/1.1 也是当前使用最为广泛的 HTTP 协议。

## HTTP/1.0 和 HTTP/1.1 的区别：

+	缓存处理

	HTTP/1.0 中主要使用 header 里的 `If-Modified-Since,Expires` 来作为缓存判断的标准。

	HTTP/1.1 引入了更多的缓存控制策略，如 `Entity tag`，`If-Unmodified-Since`,  `If-Match`, `If-None-Match` 等更多可供选择的缓存头来控制缓存策略。

+	带宽优化及网络连接的使用

	HTTP/1.0 中存在一些浪费现象，如客户端只是需要某个对象的一部分，而服务器却把整个对象带过来了，并且不支持断点续传功能。

	HTTP/1.1 在请求头中增加了 range 头域，它允许只请求资源的一部分，即返回码是 206（Partial Content），这样就方便了开发者自由地选择以便于充分利用带宽和连接。

+	错误通知的管理

	在 HTTP1.1 中新增了 24 个错误状态响应码，如 409（Conflict） 表示请求的资源与资源的当前状态发生冲突；410（Gone） 表示服务器上的某个资源被永久性的删除。

+	Host 头处理

	在 HTTP1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个 IP 地址。HTTP1.1 的请求消息和响应消息都应支持 Host 头域，且请求消息中如果没有 Host 头域会报告一个错误（400 Bad Request）。

+	长连接

	HTTP/1.1 支持长连接（PersistentConnection）和请求的流水线（Pipelining）处理，在一个 TCP 连接上可以传送多个 HTTP 请求和响应，减少了建立和关闭连接的消耗和延迟，在 HTTP1.1 中默认开启 Connection： keep-alive，一定程度上弥补了 HTTP1.0 每次请求都要创建连接的缺点。

## HTTP/1.x 的缺点

+	HTTP/1.x 在传输数据时，每次都需要重新建立连接，无疑增加了大量的延迟时间，特别是在移动端更为突出。

+	HTTP/1.x 在传输数据时，所有传输的内容都是明文，客户端和服务器端都无法验证对方的身份，这在一定程度上无法保证数据的安全性。

+	HTTP/1.x在使用时，header 里携带的内容过大，在一定程度上增加了传输的成本，并且每次请求 header 基本不怎么变化，尤其在移动端增加用户流量。

+	虽然 HTTP/1.x 支持了 keep-alive，来弥补多次创建连接产生的延迟，但是 keep-alive 使用多了同样会给服务端带来大量的性能压力，并且对于单个文件被不断请求的服务(例如图片存放网站)，keep-alive 可能会极大的影响性能，因为它在文件被请求之后还保持了不必要的连接很长时间。

## HTTPS

网景在 1994 年创建了 HTTPS，并应用在网景导航者浏览器中。 最初，HTTPS 是与 SSL 一起使用的；在 SSL 逐渐演变到 TLS 时（其实两个是一个东西，只是名字不同而已），最新的 HTTPS 也由在 2000 年五月公布的 RFC 2818 正式确定下来。简单来说，HTTPS 就是安全版的HTTP，并且由于当今时代对安全性要求更高，chrome 和 firefox 都大力支持网站使用 HTTPS，苹果也在 ios 10 系统中强制 app 使用 HTTPS 来传输数据，由此可见 HTTPS 势在必行。 

+	HTTPS 和 HTTP 的区别

	+	HTTPS 协议需要到 CA 申请证书，一般免费证书很少，需要交费。 
	+	HTTP 协议运行在 TCP 之上，所有传输的内容都是明文，HTTPS 运行在 SSL/TLS 之上，SSL/TLS 运行在 TCP 之上，所有传输的内容都经过加密的。
	+	HTTP 和 HTTPS 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443。
	+	HTTPS 可以有效的防止运营商劫持，解决了防劫持的一个大问题。

+	如何进行 HTTPS 改造

	如果一个网站要全站由 HTTP 替换成 HTTPS，可能需要关注以下几点：

	+	安装 CA 证书，一般的证书都是需要收费的，这边推荐一个比较好的购买证书网站：

		1）Let's Encrypt，免费，快捷，支持多域名（不是通配符），三条命令即时签署+导出证书。缺点是暂时只有三个月有效期，到期需续签。

		2）Comodo PositiveSSL，收费，但是比较稳定。

		在购买证书之后，在证书提供的网站上配置自己的域名，将证书下载下来之后，配置自己的web服务器，同时进行代码改造。

	+	HTTPS 降低用户访问速度。SSL握手，HTTPS 对速度会有一定程度的降低，但是只要经过合理优化和部署，HTTPS 对速度的影响完全可以接受。在很多场景下，HTTPS 速度完全不逊于 HTTP，如果使用 SPDY，HTTPS 的速度甚至还要比 HTTP 快。

	+	相对于 HTTPS 降低访问速度，其实更需要关心的是服务器端的 CPU 压力，HTTPS 中大量的密钥算法计算，会消耗大量的 CPU 资源，只有足够的优化，HTTPS 的机器成本才不会明显增加。

	推荐一则[阿里巴巴改造HTTPS](http://velocity.oreilly.com.cn/2015/ppts/lizhenyu.pdf)的文章。  

## SPDY

SPDY 用于加快网站安全性和响应速度。

<img src="http://tenny.qiniudn.com/SPDY.png">

+	降低延迟：多路复用

	针对 HTTP 高延迟的问题，SPDY 采用了多路复用。多路复用通过多个请求 stream 共享一个 TCP 连接，降低了延迟同时提高了带宽的利用率。

+	请求优先级

	多路复用带来新的问题，在连接共享的基础上有可能会导致某些关键请求被阻塞。SPDY 允许给每个 request 设置优先级，这样重要的请求就会优先得到响应。比如浏览器加载首页，首页的 html 内容应该优先展示，之后才是各种静态资源文件，脚本文件等加载，这样可以保证用户能第一时间看到网页内容。

+	header 压缩

	HTTP/1.x 的 header 很多时候都是重复多余的。选择合适的压缩算法可以减小包的大小和数量。

+	SPDY 强制使用 HTTPS，大大提高了传输数据的可靠性。

+	服务端推送（server push）

	采用了 SPDY 的网页，例如我的网页有一个 style.css 的请求，在客户端收到 style.css 数据的同时，服务端会将 style.js 的文件推送给客户端，当客户端再次尝试获取 style.js 时就可以直接从缓存中获取到，不用再发请求了。

## HTTP/2

+	什么是 HTTP/2

	HTTP/2 可以说是 SPDY 的升级版（其实原本也是基于 SPDY 设计的）

	HTTP/2 跟 SPDY 仍有不同的地方，主要是以下：

	+	HTTP/2 支持明文 HTTP 传输，而 SPDY 强制使用 HTTPS
	+	HTTP/2 消息头的压缩算法采用 HPACK，而非 SPDY 采用的 DEFLATE
	+	新的二进制格式

		HTTP/1.x 的解析是基于文本。基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认 0 和 1 的组合。基于这种考虑 HTTP2.0 的协议解析决定采用二进制格式，实现方便且健壮。


## 参考资料

http://www.alloyteam.com/2016/07/httphttp2-0spdyhttps-reading-this-is-enough/#prettyPhoto
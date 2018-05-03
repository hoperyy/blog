## LocalStorage 和 SessionStorage

+   共同点
    +   存储大小均为 5M 左右
    +   受同源策略限制
    +   仅在客户端保存，不参与和服务端通信
+   不同点
    +   生命周期：数据可以存储多长时间
        +   localStorage：永久性，除非手动删除
        +   sessionStorage：与存储数据的脚本所在的标签页的有效期相同。一旦窗口或者标签页被关闭，那么所有通过 sessionStorage 存储的数据也会被删除。
    +   作用域：谁拥有数据的访问权
        +   localStorage：同浏览器、同源
        +   sessionStorage: 同浏览器、同源、同窗口

## Cookie

+   大小限制为 4KB 左右
+   一般由服务端生成
+   如果在浏览器生成，默认关闭浏览器后失效
+   每次都会携带在 HTTP 头中
+   浏览器对同域名下 Cookie 数量有限制

## Session

是在无状态 HTTP 协议下，服务端记录用户状态来标识具体用户的机制。

保存在服务端。

浏览器关闭后，Session ID 发生变化。

## Session 和 Cookie 的关系

+   Session 保存在服务端
+   Cookie 安全性较差
+   Cookie 可携带 Session ID，当然 Session ID 也可放在 url
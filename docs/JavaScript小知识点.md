## 堆栈

我们都知道：在计算机领域中，堆栈是两种数据结构，它们只能在一端(称为栈顶(top))对数据项进行插入和删除。

+   堆
    
    队列优先,先进先出；由操作系统自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。

+   栈
    
    先进后出；动态分配的空间 一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回收，分配方式倒是类似于链表。

## JavaScript 数据类型

+   基本类型：`Undefined`、`Null`、`Boolean`、`Number` 和 `String`，这5中基本数据类型可以直接访问，他们是按照值进行分配的，存放在 **栈(stack)** 内存中的简单数据段，数据大小确定，内存空间大小可以分配。 

+   引用类型：即存放在 **堆(heap)** 内存中的对象，变量实际保存的是一个指针，这个指针指向另一个位置。

## call 和 apply 的区别

+   `func.call(this, 'test')`
+   `func.apply(this, ['test'])`

## 去除字符首尾的空白符

+   方法一：`str.replace(/^\s+/, '').replace(/\s+$/, '')`
+   方法二：`str.replace(/(^\s+)|(\s+$)/g, '')`

## 实现 bind

```js
Function.prototype.bind = function(context) {
        var preArgs = [].slice.call(arguments, 1);
        var fn = this;

        // bound 是 fn 的替代品
        var bound = function () {
            var curArgs = [].slice.call(arguments);
            var finalArgs = preArgs.concat(curArgs);

            var result = fn.apply(context, finalArgs);

            // new bound 相当于 new fn
            if (this instanceof bound) {
                var F = function() {};
                F.prototype = fn.prototype;
                return new F();
            }

            return result;
        };

        return bound;
    };

    // test
    var fn = function() {
        console.log('this: ', this);
    }
    fn.prototype.name = 'lyy is lyy';
    var newFn = fn.bind({ name: 'lyy' });

    var a = new newFn(); // this:  {name: "lyy"}
    console.log('a.name: ', a.name); // a.name:  lyy is lyy
```

## jsonp

+   安全性：无域名限制，https
+   缺点：只能 get

## 如何解决表单的重复提交

+   前端对提交状态进行标识
+   加验证码，每次提交时进行验证
+   token 机制（TODO）

## 替换当前历史记录的方法

+   location.replace
+   history.replaceState

## ES6/7 新特性与解决的问题

+   类和继承
+   generator | promise | async
+   箭头函数
+   import export
+   块级作用域
+   const

## 翻转字符串

```js
str.split('').reverse().join('')
```

## HTML5 的 API

`Storage\postmessage\webworker\canvas\...`

## 不使用其他变量，交换两个整型 x，y 的值

```js
x = x + y;
y = x - y;
x = x - y;
```

## `<script>` 标签的使用

html4.0 中定义了 defer；html5.0 中定义了 async。

+   没有 defer、async
    +   串行 **加载并执行**
+   有 async
    +   并行 **加载并执行**
    +   无法保证执行顺序
    +   一定会在 `window.onload` 之前执行，但可能在 `document` 的 `DOMContentLoaded` 之前或之后执行
+   有 defer
    +   并行加载，顺序执行
    +   JS 的执行要在所有文档元素解析完成之后，**一般** 会在DOMContentLoaded 事件触发之前完成。

## 浏览器的渲染过程与优化技巧

参考文章：https://juejin.im/post/59d489156fb9a00a571d6509

+   总结
    +   DOM 树在构建过程中，发出 CSS 请求后，继续构建 DOM 树
    +   JS 会阻塞 DOM 树的构建
    +   CSS 可能会引发 JS 的延迟执行（CSSOM 构建完成后，JS 才执行，然后再执行 DOM 构建）
+   优化
    +   CSS
        +   媒体查询：只有在符合特定条件时，才会让浏览器进行阻塞渲染然后构建CSSOM树。
    +   JS
        +   async

## cookie 和 stroage 有哪些区别

+   cookie 服务端可操作，有网络传输
+   storage 容量更大
+   cookie 有过期时间
+   cookie 同域共享，但有路径区别
+   storage 同源共享，但无法区分路径

思路：

+   从API出发（set\get\modefy\delete + domain/http-only/secure/path/expire）
+   从归属的规范出发，一个属于 HTTP规范，一个属于HTML5 规范
+   从解决的目的出发，一个是解决 HTTP 无状态问题，一个是解决本地存储问题
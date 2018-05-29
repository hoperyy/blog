[issue](https://github.com/hoperyy/blog/issues/28)

## 作用域链

```
[函数] -- 活动对象1 -- 活动对象2 -- ……

            ^
            |
            |           

          [函数] -- 活动对象1 -- 活动对象2 -- ……

                        ^
                        |
                        |           

                    [函数] -- 活动对象1 -- 活动对象2 -- ……
```

举例：

```

function a() {
  var v3 = 'v333';

  b();
}

function b() {
  console.log(v3);
}

var v3 = 'v3';

a();

// 打印的是 v3
```

## 实例的作用域链

+	实例可以访问 `prototype` 上的属性
+ `prototype` 上的方法里的 `this` 是实例
+  示例

	```
	  构造函数                          构造函数          

       |                               |
       |                               |

	实例 --> 构造函数.prototype（同时是实例）  -->  构造函数.prototype
	```



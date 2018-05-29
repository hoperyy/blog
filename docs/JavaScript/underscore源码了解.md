[issue](https://github.com/hoperyy/blog/issues/5)

# 参考资料
	
[js高手进阶之路：underscore源码经典](http://yalishizhude.github.io/tags/underscore/)

[underscore源码英文注释文档](http://www.css88.com/doc/underscore/docs/underscore.html)

# 闭包

整个函数在一个闭包里

```
(function() {
	...
}).call(this)
```

和`jQuery`的异曲同工

```
(function(window, undefined) {
	...
})(window);
```

# 原型赋值

```
18 var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
```
将原型赋值给变量有两个好处：

1、提高性能，减少作用域链长度

2、便于压缩。变量名压缩时是可以换名字的，但像`Array.prototype`这样的如果压缩时变名字的话，浏览器就不认识了。

# 变量声明格式

```
20 var
nativeIsArray      = Array.isArray,
nativeKeys         = Object.keys,
nativeBind         = FuncProto.bind,
nativeCreate       = Object.create;
```

这样，省去了多余的`var`，格式也美观

# 数据判断

##	`_.isElement`

```
1185 _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };
```

判断是否是`dom`，`dom`的`nodeType`值为1，用`!!`强制转为`boolean`值。

##	`_.isArray`

```
1200 _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };
```

判断是否是数组，优先判断是否存在原生函数`Array.isArray`，这个函数是`ES5`新增函数，如果没有，则自定义一个函数

##	`_.isObject`

```
1194 _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};
```

判断是否为对象。函数也是对象，需要包含在内；但`null`也是对象，需要排除，用`!!obj`区分。

##	`_.isArguments`

```
1219 if (!_.isArguments(arguments)) {
	_.isArguments = function(obj) {
  		return _.has(obj, 'callee');
	};
}
```

判断`arguments`很简单，`arguments`对象有个特殊属性`callee`

##	`_.isNaN`

```
1239 _.isNaN = function(obj) {
	return _.isNumber(obj) && obj !== +obj;
};
```

`NaN`这个值有两个特点：1、它是一个数；2、它不等于自己

另外，`var num = new Number()`这种没有值的对象（数字）也归为`NaN`。`+obj`是为了把`var num = new Number()`先转为数字（`+(new Number())`为`0`，`+{}`为`NaN`）

##	`_.isBoolean`

```
1244   _.isBoolean = function(obj) {
	return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
};
```

判断是否是布尔值，除了`true`和`false`外，也把`new Boolean()`认为是布尔值

##	`_.isUndefined`

```
1254   _.isUndefined = function(obj) {
	return obj === void 0;
};
```

小技巧：用`void 0`返回`undefined`

##	`_.eq`

暂略

##	内部函数`optimizeCb`

暂略

##	`_.each`和`_.map`

```
131 _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };
```

能够看出，`_.each`是“遍历”数组/对象，返回原对象；`_.map`是“操作”数组/对象，以数组的形式返回结果。


##	内部函数`createReduce`

```
161 function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }
```

先不谈功能，这段代码里有几个点可以说下：

1、	用闭包定义函数。闭包的好处有：避免命名冲突、私有化变量、延长变量生命周期。这里的作用就是“延长变量生命周期”，继续调用函数的时候就不用重新定义函数了。

2、	两层闭包。目的就是“延长变量生命周期”

3、	用`slice.call(arguments, 2)`截取后后面的不定参数。

```
254 _.invoke = function(obj, method) {

var args = slice.call(arguments, 2);
var isFunc = _.isFunction(method);
return _.map(obj, function(value) {
  var func = isFunc ? method : value[method];
  return func == null ? func : func.apply(value, args);
});
};
```

##	`_.delay`

```
749 _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };
```

把参数缓存起来供延迟函数加载，很好的技巧

##	`_.after`

```
861 _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };
```

同样缓存次数变量，函数多次执行都会访问闭包里的`times`变量，直到到达上限，再执行闭包里缓存的函数。这个在处理异步请求的时候还是很有用的。
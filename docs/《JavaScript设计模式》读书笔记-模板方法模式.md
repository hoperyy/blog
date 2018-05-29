[issue](https://github.com/hoperyy/blog/issues/15)

这章读完，还是很简单的。

但凡公司有开发框架的，很多是用的这套结构，比如我所在的alibaba B2B、TaoBao

这种模式的实现上有两种方式：

第一种：利用继承

子类继承父类，父类提供生命周期、常用方法之类的。

第二种：利用高阶函数

创建一个工厂函数，执行该函数，会返回一个新创建的函数，并给该新函数提供一个作用域，该域内提供了默认方法，支持传参

```
var Base = function(param) {
	var fnA = param.A || function() { throw Error('必须传递A方法') };

	var fnB = param.B || function() { throw Error('必须传递B方法') };

	var fnC = param.C || function() { throw Error('必须传递C方法') };
	
	var R = function() {};
	
	R.prototype.init = function

	return R;
};

var ClassA = Base({
	A: function() {},
	B: function() {},
	C: function() {}
});

var ClassB = Base({
	A: function() {},
	B: function() {},
	C: function() {}
});
```
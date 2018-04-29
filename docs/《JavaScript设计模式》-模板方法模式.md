+	模板方法模式的定义和组成
	
	模板方法模式由两部分组成：第一部分是抽象父亲，第二部分是具体的实现子类。

	父类封装了子类的算法框架。子类继承整个算法结构，并且可以选择重写父类的方法。

+	最简单的实现逻辑

	```
	var Father = function() {};

	Father.prototype.init = function() {
		this.fn1();
		this.fn2();
		this.fn3();
	};
	Father.prototype.fn1 = function() {};
	Father.prototype.fn2 = function() {};
	Father.prototype.fn3 = function() {};
	
	var Child = function() {};

	Child.prototype = new Father();
	```

+	`Java` 与 `JavaScript` 的实现区别

	在 `Java` 中编译器会保证子类会重写父类中的抽象方法，但 `JavaScript` 中却没有这些检查工作，如果子类没有某个方法而父类的该方法是个空函数时，就没有任何提示，很难调试

	解决方案：

	1、鸭子模型。子类需重写父类的方法，不过这个方法太繁琐，而且会增加业务代码的复杂度。

	2、父类抛异常。

+	模板方法的使用场景。

	模板方法常被用于搭建项目的框架。

+	真的需要“继承”吗？ ofcourse not ~~~

	```
	var Base = function(param) {
		var fnA = param.A || function() { throw Error('必须传递A方法') };

		var fnB = param.B || function() { throw Error('必须传递B方法') };

		var fnC = param.C || function() { throw Error('必须传递C方法') };
		
		var R = function() {};
		
		R.prototype.init = function() {
			fnA();
			fnB();
			fnC();
		};

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
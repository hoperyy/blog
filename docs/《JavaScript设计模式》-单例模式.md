##	基础知识回顾

+	`this` 的指向
	+	根据函数的指针是谁的属性
		+	直接属性
		+	间接属性（实例）
		+	`window`
	+	`apply/call`

+	`this` 的指向是根据函数运行的方式变化的，不是一定的
+	作用域链
	
	活动对象 -- 函数定义处的环境 ...

+	谁能访问活动对象中的变量？
	
	+	定义在其中的函数

+	几种对象区分

	+	函数对象
	+	活动对象

		函数执行时创建，执行完毕后销毁；

		但如果活动对象里有对象被外部引用，则不会销毁。
 
+	对象何时销毁：没有指针指向它的时候

+	一个闭包包含
	+	函数对象
	+	函数对象的作用域链

+	每个函数都有自己的作用域链

#	第四章内容

+	实现单例模式
	
	+	实现方式 1：用函数的属性存储单例

		```
		var SingleInstance = function(name) {
		  this.name = name;
		  this.instance = null;
		};

		SingleInstance.prototype.getName = function() {
		  return this.name;
		};

		SingleInstance.getInstance = function() {
		  if (!this.instance) {
		    this.instance = new SingleInstance();
		  }

		  return this.instance;
		};
		```

	+	实现方式 2：用闭包存储单例

		```
		var SingleInstance = function(name) {
		  this.name = name;
		};

		SingleInstance.prototype.getName = function() {
		  return this.name;
		};

		SingleInstance.getInstance = (function() {
		  var instance = null;

		  return function() {
		    if (!instance) {
		      instance = new SingleInstance();
		    }
		  };

		  if (!this.instance) {
		    this.instance = new SingleInstance();
		  }

		  return this.instance;
		})();
		```

+	透明的单例模式

	“透明”的单例：实现一个类，用户从这个类中创建对象的时候，可以像使用其他任何普通类一样。

	+	version 1：实际业务逻辑被放进了类里，耦合严重

		```
		var GetInstance = (function() {
			var instance = null;

			return function(html) {
				if (instance) {
					return instance;
				}

				this.html = html;
				this.init();

				return instance = this;
			};
		})();

		GetInstance.prototype.init = xxx;
		```
	+	version 1 advanced: 用代理模式解决业务逻辑耦合的问题
	
		```
		var Proxy = (function(fn) {
			var instance = null;

			return function() {
				if (!instance) {
					instance = new fn(arguments);
				}

				return instance;
			};
		})();

		new Proxy() 也相当于 new Handler()
		```

+	通用的惰性单例模式

	```
	var getSingle = function(fn) {
		var result;

		return function() {
			return result || fn.apply(this, arguments);
		};
	};
	```

	要点：

	+	返回一个函数
	+	执行该函数，和执行原始函数 `fn` 的上下文环境一致

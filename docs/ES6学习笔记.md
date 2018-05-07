## 19. Class 的基本用法

### 学习链接

http://es6.ruanyifeng.com/#docs/class

### 笔记

+   传统的生成类的方式

    ```js
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    Point.prototype.toString = function() { 
        // ...
    };
    ```

+   ES6 的类的写法

    ```js
    Class Point {
        constructor(x, y) { // 也就是构造函数
            this.x = x;
            this.y = y;
        }

        toString() {
            // ...
        }
    }
    ```

    **类的所有方法都定义在类的 `prototype` 属性上面。**

    在类的实例上面调用方法，其实就是调用原型上的方法。

    实例的属性除非显式定义在其本身（即定义在 `this` 对象上），否则都是定义在原型上（即定义在 `class` 上）。

+   ES6 和 ES5 行为不一致的地方

    +   类的内部所有定义的方法，都是不可枚举的（non-enumerable）。ES5 可枚举。
    +   类必须使用 `new` 调用，否则会报错。ES5 可以不用 `new` 调用。
    +   类不存在变量提升（hoist），这一点与 ES5 完全不同。

+   类的属性名，可以采用表达式。

+   `constructor`
    +   一个类必须有 `constructor` 方法，如果没有显式定义，一个空的 `constructor` 方法会被默认添加。
    +   `constructor` 方法默认返回实例对象（即 `this`），完全可以指定返回另外一个对象。

+   类也可以用作表达式

    +   举例

        ```js
        const MyClass = class Me {
            getClassName() {
                return Me.name;
            }
        };
        ```

    +   可以写出立即执行的类

        ```js
        let person = new class {
            constructor(name) {
                this.name = name;
            }

            sayName() {
                console.log(this.name);
            }
        }('张三');

        person.sayName(); // "张三"
        ```

+   ES6 明确规定，Class 内部只有静态方法，没有静态属性。

    ```js
    // 以下两种写法都无效
    class Foo {
    // 写法一
    prop: 2

    // 写法二
    static prop: 2
    }

    Foo.prop // undefined
    ```

    +   类的实例属性

        类的**实例属性**可以用等式，写入类的定义之中。

        ```js
        class MyClass {
            myProp = 42;

            constructor() {
                console.log(this.myProp); // 42
            }
        }
        ```

        我们定义实例属性，只能写在类的 `constructor` 方法里面。

    +   类的静态属性

        类的静态属性只要在上面的实例属性写法前面，加上 `static` 关键字就可以了。

        ```js
        class MyClass {
            static myStaticProp = 42;

            constructor() {
                console.log(MyClass.myStaticProp); // 42
            }
        }
        ```

+   Class 的取值函数（`getter`）和存值函数（`setter`）

    存值函数和取值函数是设置在属性的 Descriptor 对象上的。这与 ES5 完全一致。

+   静态方法

    如果静态方法包含 `this` 关键字，这个 `this` 指的是类，而不是实例。


## 20. Class 的继承

### 学习链接

http://es6.ruanyifeng.com/#docs/class-extends

### 笔记

+   ES5 的继承实现方式

    组合继承

    ```js
    function Animal() {
        // xxx
    }

    function Cat() {
        Animal.apply(this, arguments);
    }

    Cat.prototype = new Animal();

    // 修正 constructor
    Cat.prototype.constructor = Cat;
    ```

+   ES6 的继承方式

    ```js
    class A {
    }

    class B {
    }

    // B 的实例继承 A 的实例
    Object.setPrototypeOf(B.prototype, A.prototype);

    // B 继承 A 的静态属性
    Object.setPrototypeOf(B, A);

    const b = new B();
    ```

    也就是：

    ```js
    class A {
    
    }

    class B extends A {
    
    }

    B.__proto__ === A // true
    B.prototype.__proto__ === A.prototype // true
    ```

    `Object.setPrototypeOf` 的实现：

    ```js
    Object.setPrototypeOf = function (obj, proto) {
        obj.__proto__ = proto;
        return obj;
    }
    ```

    **父类的静态方法，也会被子类继承。**

+   ES5 和 ES6 继承方式对比

    ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（ `Parent.apply(this)` ）。
    
    ES6 的继承机制完全不同，实质是先创造父类的实例对象 this（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

+   constructor

    +   子类中，可以没有 constructor，此时会自动创建一个空的 constructor 函数
    +   子类中如果有 constructor，需要调用 `super()`（ES6 要求，子类的构造函数必须执行一次 super 函数。）

+   super
    +   子类 constructor 中的 `super()` 相当于：`Parent.prototype.constructor.call(this)`，其中 `this` 是子类的实例
    +   super 作为函数调用时，代表父类的构造函数
    +   super 作为对象调用时
        +   在普通方法中，super 指向父类的原型对象：`Parent.prototype`

            this 的指向：在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例。

        +   在静态方法中，super 指向父类：`Parent`

            this 的指向：方法内部的 this 指向当前的子类，而不是子类的实例。

        +   总结

            ```
            普通方法 -- 父类的原型 -- 子类的实例
            静态方法 -- 父类 -- 子类
            ```

+   `Object.getPrototypeOf()`

    可以用来从子类上获取父类。

    ```js
    Object.getPrototypeOf(ColorPoint) === Point
    // true
    ```

## 21. Decorator

### 学习链接

http://es6.ruanyifeng.com/#docs/decorator

### 笔记

修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。

+   类修饰器

    +   原理

        ```js
        @decorator
        class A {}

        // 等同于

        class A {}
        A = decorator(A) || A;
        ```

    +   参数

        第一个参数是目标类

+   方法修饰器

    +   接受三个参数

        +   类的原型对象 `target`
        +   方法名 `name`
        +   描述符 `descriptor`

    +   如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。

        ```js
        function dec(id){
            console.log('evaluated', id);
            return (target, property, descriptor) => console.log('executed', id);
        }

        class Example {
            @dec(1)
            @dec(2)
            method(){}
        }
        // evaluated 1
        // evaluated 2
        // executed 2
        // executed 1
        ```

## 22. Module 的语法

### 学习链接

http://es6.ruanyifeng.com/#docs/module

### 笔记

+   概述
    +   在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。
    +   CommonJS 用于服务器，AMD 用于浏览器。
    +   CommonJS 和 AMD 是运行时加载。
    +   ES6 是编译时加载、静态加载，也就是在编译时就完成加载。
    +   ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

    +   ES6 模块带来的好处
        +   不再需要 UMD 格式
        +   避免输出全局变量，而是模块化
        +   不在用对象作为命名空间，各个变量通过模块输出

    +   ES6 模块默认使用严格模式，严格模式的特点
        +   禁止 `this` 指向全局对象。在顶层，`this` 指向 `undefined`
        +   增加了保留字 `protected`、`static`、`interface`

+   export

    export 向外输出接口，出来的接口就是本来的名字。
    
    export 输出的接口可以使用 as 关键字重命名。
    
    ```js
    // 写法一
    export var m = 1;

    // 写法二
    var m = 1;
    export { m };

    // 写法三
    var n = 1;
    export {n as m};
    ```
    
    export 规定了对外的接口。

    ```js
    // 报错
    export 1;

    // 报错
    var m = 1;
    export m;
    ```

    export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

    ```js
    export var foo = 'bar';
    setTimeout(() => foo = 'baz', 500);
    ```

    这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存

    export 命令可以出现在模块的任何位置，只要处于模块顶层就可以。

+   import

    **import 接受一对大括号。**

    大括号里面的变量名，必须与被导入模块对外接口的名称相同。

    可以用 as 重命名。

    ```js
    import { lastName as surname } from './profile.js';
    ```

    import 输入的变量是只读的，但如果是对象，可以改它的属性。

    import 命令具有提升效果，会提升到整个模块的头部，首先执行。这种行为的本质是，import 命令是编译阶段执行的，在代码运行之前。

    整体加载：

    ```js
    import * as circle from './circle';
    ```

+   `export default`

    常规用法：

    ```js
    // export-default.js
    export default function () {
        console.log('foo');
    }
    ```

    ```js
    // import-default.js
    import customName from './export-default';
    customName(); // 'foo'
    ```

    `export default` 也就可以用在匿名函数了。

    本质：

    `export default xx` 相当于 `export xx as default`。

    本质是将 default 后面的值，赋给 default 变量。

    ```js
    import { default as newName } from 'xxx';
    ```

+   总结

    ```js
    import {...} from xxx 
            --> export var m = 1; 
                export { m }; 
                export { n as m };

    import xx from xxx 
            --> export default xxxx
    ```
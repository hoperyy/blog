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

+   Class 的取值函数（`getter`）和存值函数（`setter`）

    存值函数和取值函数是设置在属性的 Descriptor 对象上的。这与 ES5 完全一致。

+   静态方法

    如果静态方法包含 `this` 关键字，这个 `this` 指的是类，而不是实例。

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
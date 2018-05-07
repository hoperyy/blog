## 20. Class 的继承

### 学习链接

链接：http://es6.ruanyifeng.com/#docs/class-extends

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
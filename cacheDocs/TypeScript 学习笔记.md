[issue](https://api.github.com/repos/hoperyy/blog/issues/105)

+   细节

    ```
    interface SquareConfig {
        a: string;
        b: string
    }

    function fn(config: SquareConfig) {
        // console.log(config.c); // 访问不存在的属性会报错
    }

    // 字面量：在定义范围内
    // let result = fn({ a: 'a', b: 'b' });

    // 变量：必须包含定义
    let obj = { a: 'a', b: 'b' };
    let result2 = fn(obj);

    ```

    ```
    interface ClockInterface {
        currentTime: Date;
        setTime(d: Date); // 方法的定义
    }

    class Clock implements ClockInterface {
        currentTime: Date; // 分号
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(h: number, m: number) {}
    }
    ```
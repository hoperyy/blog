[issue](https://api.github.com/repos/hoperyy/blog/issues/104)

## promise 用法

##  基本用法

```JavaScript
const something = new Promise(function name(resolve, reject) {

   // resolve 传入的参数：普通参数 或 promise 对象
    resolve(new Promise(function name(resolve, reject) {
        setTimeout(() => {
            resolve(333);
        }, 3000);
    }));

   // return 333;  // return 无效
});

something
    .then(function name(params) {
        console.log('aa', params)

        // then 返回的数据：普通数据 或 promise 对象
        return new Promise(function name(resolve, reject) {
            setTimeout(() => {
                resolve(444);
            }, 3000);
        })
    })
    .then(function name(params) {
        console.log('bb', params)
    })
    .catch(function name(err) {
        console.log('!!!err', err)
    })
```

1. `new Promise(...)` 中必须使用 resolve 传递数据，可以是 普通数据 或 promise 对象，不能使用 return，否则无效
2. `then()` 中使用 `return` 传递数据，可以是普通数据 或 promise 对象
3. 如果设置 `then/catch` 的时候 promise 对象的状态已经改变，仍然会触发

```JavaScript
const something = new Promise(function name(resolve, reject) {
    throw Error('hahaha');
});

setTimeout(() => {
    something
        .then(function name(params) {
            console.log('a', params)
        })
        .then(function name(params) {
            console.log('b', params)
        })
        .catch(function name(err) {
            console.log('!!!err', err) // catch 仍然会触发
        })
}, 3000);
```

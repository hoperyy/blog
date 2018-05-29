[issue](https://github.com/hoperyy/blog/issues/3)

## 问题背景

webpack 的使用其实并没有太多难点，对于开发者来说，webpack 是一个黑盒，按照官方配置即可快速的配置开发环境。
    
同样的，如果使用过程中有一些不常见的报错或异常行为，这个 **webpack 黑盒** 产生报错或异常的原因就较难排查。
    
比如，如果文件 `index.js` 在被修改后，立刻作为 webpack 的入口文件，并启动 webpack 且监听，会引起持续时间大约 10s 的频繁的编译和回调。

这个现象在 webpack-dev-server 上可以重现。
    
## 问题还原
    
以 webpack 为例，代码如下：
    
```
const webpack = require('webpack');
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
    
const entryFile = path.join(__dirname, './src/index.js');
const tmpFile = path.join(__dirname, './src/tmp.js');
    
// 临时文件复制到入口文件，会触发持续时间大约 10s 的回调
fse.copySync(tmpFile, entryFile);
    
// 入口文件被修改，同样会触发持续时间大约 10s 的回调
// fs.writeFileSync(entryFile, (fs.readFileSync(entryFile).toString() + ''));
    
const webpackConfig = {
    
   // 启动 webpack 监听
   watch: true,
    
   entry: {
       index: './src/index.js'
   },
   output: {
       path: path.resolve(`./dist/`), // 绝对路径
       filename: '[name].js'
   }
};
    
let startTime = Date.now();
let loopCount = 0;
const compiler = webpack(webpackConfig, function() {

    console.log(
      `webpack 触发回调, 距离 webpack 启动的时间: ${(Date.now() - startTime) / 1000} s`,
      `回调次数: ${++loopCount}`
    );

});
```

效果：

![image](https://user-images.githubusercontent.com/5757051/26910283-74b4d99e-4c38-11e7-9aaa-7982714b038d.png)


## 原理分析

+   寻找相关代码

    `node_modules/watchpack/lib/DirectoryWatcher.js` 中有这样一段代码：
 
    ![image](https://user-images.githubusercontent.com/5757051/26910290-810cfb40-4c38-11e7-8905-83b96b0e35ac.png)
   
![image](https://user-images.githubusercontent.com/5757051/26910346-c78e4970-4c38-11e7-9662-b67adca3c0ad.png)

+   是 watchpack 的问题，还是 webpack 的问题，还是 webpack 和 watchpack 的配合的问题？

    分析这个问题，可能需要一层层理解相关的逻辑，成本很大，那么，我们能否通过一些蛛丝马迹猜想一下问题可能出在哪里呢？

    注意到 `node_modules/watchpack/lib/DirectoryWatcher.js` 中有大量的逻辑涉及到 `mtime`，也就是文件的修改时间。我们发现的编译和回调持续 10s 左右极有可能和 `FS_ACCURACY` 的值 `10000` 有关。
    
+   可能的解决方案

    既然可能和文件的 `mtime` 有关，那就尝试把被修改的入口文件的 `mtime` 修改到 10s（保险起见，大于 10s 更好） 以前，看看能否解决问题。
    
    代码如下：
    
    ```
    // 临时文件复制到入口文件，会触发持续时间大约 10s 的回调
    fse.copySync(tmpFile, entryFile);

    // 修改入口文件的 mtime
    fs.utimesSync(entryFile, ((Date.now() - 10 * 1000)) / 1000, (Date.now() - 10 * 1000) / 1000);

    // 启动 webpack...
    ```
    
    结果是：
    
    ![image](https://user-images.githubusercontent.com/5757051/26910313-94ae3b96-4c38-11e7-9f2f-556788ab4240.png)

    问题解决！
    
    ## 后续
    
    如果入口文件有依赖其他的模块且这些模块也有修改的话，该模块的文件时间戳也需要修改，这是需要注意的一点。
    
    不过这个方案还是比较 hack。这个问题已反馈到 webpack 和 watchpack，但从官方的反馈来看，近期修复的可能性不大。
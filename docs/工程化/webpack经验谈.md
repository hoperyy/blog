[issue](https://github.com/hoperyy/blog/issues/22)

## 为引入的资源指定后缀
    
举例：

```
resolve: {
    extensions: ['.js', '.vue']
}
```

这样，如果有这样的语句

```
import('./app')
```

`webpack` 会尝试查找 `./app.js` 和 `./app.vue`
    
## 指定快捷路径

```
resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
}
```

这样在代码里，`import 'vue'` 其实引用的是 `vue/dist/vue.js`

可以用来提升打包性能
    
## 指定 `webpack` 加载各种 `loader` 时查找的路径

webpack 默认从 node_modules 里找 loader。

可以手动设置 loader 查找顺序以提升性能：

```
resolveLoader: {
    modules: [
        path.resolve('./node_modules/'),
        path.resolve('../node_modules/'),
        path.resolve('../../node_modules/')
    ]
}
```

更多 loader 知识：https://juejin.im/post/5accd3aa6fb9a028dd4e91d3
    
## 替换关键字

使用插件 `string-replace-webpack-plugin`

在 `module.rules` 数组，添加下列代码：

```
// 用于配置关键词替换
{
    test: /\.[(vue)(vuex)(js)(jsx)(html)]*$/,
    exclude: /(node_modules|bower_components)/,
    loader: StringReplacePlugin.replace({
        replacements: [{
            pattern: new RegExp('$_TEST_REPLACE_$'.replace(/\$/g, '\\$', 'g')),
            replacement: function (match, p1, offset, string)   {
                return 'this is a test replace demo string';
            }
        }]
    })
}
```

这里配置了关键词 `$_TEST_REPLACE_$` 的替换规则，可根据实际情况修改相应代码
    
## 提取公共代码（多页项目）
    
目的：提取多页项目中的公共代码，同时将一些第三方库（如 `vue`、`vue-router`）也提取出来

+   step1
    
    `entry` 中添加 `vendor`:
    
    ```
    entry: {
        vendor: ['vue', 'vue-router']
    }
    ```
    
+   step2
    
    由于 step1 的配置，入口变为了多个，因此目前的 `entry` 应该是这个样子：
    
    ```
    entry: {
        build: './src/main.js',         // key 可以自定义
        vendor: ['vue', 'vue-router']
    }
    ```
    
    相应的 `output` 也需要改变：
    
    ```
    output: {
        path: __dirname + '/dist',
        publicPath: '/static/',
        filename: '[name].js'           // 新增了这个配置
    }
    ```
    
+   step3
    
    `plugins` 中添加 webpack 提供的插件
    
    ```
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'common.js', // 公共代码命名为 common.js，可自定义
    })
    ```
    
+   step4

    `index.html` 中新增对 `common.js` 的引用
    
    ```
    <body>
        <div id="app"></div>
        <script src="/static/common.js"></script>
        <script src="/static/build.js"></script>
    </body>
    ```

## `extract-text-webpack-plugin`

`extract-text-webpack-plugin` 如果将 css 文件单独抽离出来，不会有 HMR（hot module reload）的效果，因此在开发环境下，不能使用这个插件，只在生产环境下使用
    
## `webpack-dev-server`

错误信息：`Can't resolve 'fs' in webpack-dev-server/client`

如果 `webpack` 配置中有 `resolve.mainFields`，但是没有包含以下三个配置：`["browser", "module", "main"]`，在使用 `webpack-dev-server` 的时候就会报错。

解决方案：删除 `resolve.mainFields` 或将其配置的值至少有 `["browser", "module", "main"]`

issue：https://github.com/webpack/webpack-dev-server/issues/727

## 如何支持 `module.exports` 和 `import` 混用

https://github.com/59naga/babel-plugin-add-module-exports

通常情况下是不建议混用的，但在特殊的场景下，比如历史包袱等，可以用这个方案处理

## 性能优化

建议参考文档：https://doc.webpack-china.org/guides/build-performance/

+   问题定位

    webpack 提供了几个参数帮助我们分析构建效率。
    
    在命令行输入：
    
    ```
    webpack --colors --profile --display-modules
    ```
    
    `--colors` 输出结果带彩色，比如会用红色显示耗时较长的步骤

    `--profile` 输出性能数据，可以看到每一步的耗时
    
    `--display-modules` 默认情况下 `node_modules` 下的模块会被隐藏，加上这个参数可以显示这些隐藏的模块
    
    根据终端中提示的信息，可以采取对应的方法进行优化。
    
+   缩小 Loader 的覆盖范围
    
    webpack 推荐使用 `include` 而不是 `exclude` 来设定要编译的文件目录。
    
    通过 `include` 即可圈定编译范围，而不是被引用到的所有文件。

+   使用别名快速定位文件: `resolve.alias`

    例如：
    
    ```
    resolve: {
    	   alias: {
    		      jquery: './node_modules/jquery/dist/jquery.min.js'
    	   }
    }
    ```
    
    打包脚本中的 `require('jquery')` 其实就等价于 `require('./node_modules/jquery/dist/jquery.min.js')`。这样能帮助 `webpack` 在打包过程中快速定位文件，减少搜索时间。
    
+   忽略对已知文件的解析

    有时一些模块是不需要解析的，我们可以告诉 webpack 不去解析这些模块。可以这样配置：
    
    ```
    module: {
        	noParse: [path.resolve(__dirname, './node_modules/jquery/dist/jquery.min.js')]
    }
    ```
    
    这样，每当 webpack 尝试去解析那个压缩后的文件，我们阻止它，因为这个不必要。
    
+   使用公共 CDN

    对于一些第三方库，我们不想打包到 bundle 中，可以作为外部以来引用 CDN，这时使用 `externals` 声明一个外部依赖。
    
    ```
    externals: {
    	jquery: 'jQuery'
    }
    ```
    
    同时在 HTML 中引用 CDN 的 jQuery

    ```
    <script src="//xxx.com.jQuery.min.js"></script>
    ```
    
    这时，`require('jquery')` 其实获取的是 `window.jquery`
    
    当前，`externals` 还有更多能匹配的场景，如 cmd、amd 等，详见 [webpack externals](https://webpack.js.org/configuration/externals/)
    
+   提取公共模块

    当 webpack 构建任务中有多个入口模块，会遇到这样的情况，这些入口文件引用了相同的模块，正常情况下， webpack 会为每个入口文件打包一份相同的模块。

    这样会出现的问题是：当相同的模块被改变后，会触发所有引用它的入口文件进行构建，这无疑是造成了性能浪费。

    解决办法是使用 webpack 提供的 `CommonChunks` 插件把这些公用的模块抽离出来，它们的改变就不影响所有入口文件进行构建了。

## webpack 容易混淆的地方

参考文章：http://www.qinshenxue.com/article/20170315092242.html

+   `context`
    +   功能

        `context` 是 webpack 编译时的基础目录，入口起点（`entry`）会相对于此目录查找。
        
    +   默认值

        `process.cwd()`
        
    +   路径

        必须是绝对路径
        
    +   相关
        +   `output` 和它无关
        +   有些插件的配置和它有关

+   `output.path`
    +   功能

        打包文件输出的目录
        
    +   默认值

        和 `context` 一样，都是 `process.cwd()`
        
    +   配置

        除了常规的配置方式，还可以在 path 中用使用 `[hash]` 模板，比如配置：`path: path.resolve('./dist/[hash:8]/')`
        
    +   路径

        建议设置为绝对路径，相对路径不会报错
        
    +   相关

        有些插件的配置项和 `context` 有关

+   `output.publicPath`

    +   规则

        `静态资源最终访问路径 = output.publicPath + 资源 loader 或插件等配置路径`

    +   默认

        空字符串
        
    +   路径

        +   相对路径
        
            设置为相对路径时，实际上是相对于 `html` 文件的路径
            
        +   绝对路径
        
            也可以设置为相对协议（`//`）或 http 地址（`http://`）

    +   有关
    
        `publicPath` 应该以 `/` 结尾，同时其他 loader 或插件的配置不要以 `/` 开头

+   webpack-dev-server： `publicPath`
    
    +   功能

        用于开发环境，不会出现绝对路径
        
    +   为了提供浏览器访问打包资源的功能，提供了浏览器访问打包资源的功能。

        webpack 中的 loader 和插件仍然是取 `ouput.publicPath`。
        
        比如如果设置为 `/web/`，访问 CSS 文件是 `127.0.0.1:8080/web/index.css`。
        但CSS 里面的图片最终的路径仍是 `/static/img/xxxx.png`。

## 参考

https://juejin.im/post/5ac9dc9af265da23884d5543

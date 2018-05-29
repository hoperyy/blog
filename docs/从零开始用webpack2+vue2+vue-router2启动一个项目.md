[issue](https://github.com/hoperyy/blog/issues/1)

webpack 本身是一个工程化工具，作为工具本身教程、文档很多，但这个工具对于新手而言很难通过一两个文档就能掌握各种配置原理。

这篇文章就是为了减少新手的入手成本，并通过一个简单的项目，了解 webpack 配置的基本原理。

下面这个例子是如何从零配置一个 webpack2 + vue2 + vue-router2 的工程（[github demo](https://github.com/liuyuanyangscript/blog/tree/master/demo/webpack2%2Bvue2%2Bvue-router2)）

+   进入一个空文件夹，执行 `npm init`，生成 `package.json` 文件。

+   安装 webpack2 vue2 vue-router2 的各项依赖

    ```
    npm install vue vue-loader vue-router vue-template-compiler webpack webpack-dev-server --save
    ```
    
    1. `vue`、`vue-loader`、`vue-template-compiler` 负责解析 `.vue` 文件
    
        注：`vue-template-compiler` 必须安装且版本号和 `vue-loader` 保持一致（目前二者是同步更新）。
    
    2. `webpack`、`webpack-dev-server` 负责 `webpack` 相关

+   在文件夹内创建项目目录

    ```
    demo
    |-- package.json
    |-- index.html         // 启动页面
    |-- webpack.config.js  // webpack 配置文件
    |-- src
        |-- views       // vue 页面组件目录
        |-- main.js     // 入口文件
        |-- router.js   // vue-router 配置
        |-- app.vue   // 首页
    ```
    
+   配置 webpack

    webpack 默认读取 `webpack.config.js`，文件名不能随便改，其中 `entry` 是必须配置的。
    
    ```
    module.exports = {
        entry: './src/main.js',
        output: {
            // webpack2 要求配置项 output.path 必须为绝对路径。
            path: __dirname + '/dist',
            publicPath: '/static/',
            filename: 'build.js'
        }
    };
    ```
    
    配置 webpack-dev-server，只需在 `package.json` 添加以下启动命令即可。
    
    ```
    "scripts": {
      "dev": "webpack-dev-server --hot --open"
    }
    ```
    
+   测试
    
    在 `index.html` 中添加测试文字，引入打包后的 js 文件。
    
    ```
    <!-- index.html -->
    <body>
        Hello, Webpack 2.
        <script src="/static/build.js"></script>
    </body>
    ```
    
    在 main.js 中添加如下测试代码：
    
    ```
    // main.js
    document.write('来自main.js的问候！')
    ```
    
    安装依赖并启动服务
    
    ```
    npm i && npm run dev
    ```
    
+   配置 vue 页面

    +   新建子页面

        在 views 目录下新建 about.vue。

        ```
        <template>
            <div>
                这是{{page}}页面
            </div>
        </template>
        <script>
            module.exports = {
                data: function () {
                    return {
                        page: 'about'
                    }
                }
            }
        </script>
        ```
        
    +   配置路由 `router.js`
        
        ```
        module.exports = {
            routes: [
                {
                    path: '/about',
                    component: require('./views/about.vue')
                }
            ]
        }
        ```
        
    +   配置首页

        首页引入 ouput 配置的 JS，添加 Vue 实例的挂载目标。
        
        ```
        <body>
            <div id="app"></div>
            <script src="/static/build.js"></script>
        </body>
        ```
        
    +   配置入口 js

        ```
        import Vue from 'vue';
        import VueRouter from 'vue-router';
        
        const App = require('./app.vue');
        
        Vue.use(VueRouter);
        
        const router = new VueRouter(require('./router'));
        new Vue({
            el: '#app',
            router: router,
            render: h => h(App)
        });
        ```
        
    +   在首页组件 app.vue 中添加路由链接、路由视图组件。

        ```
        <template>
            <div>
                <div>
                    <router-link to="/about">about</router-link>
                </div>
                <div>
                    <router-view></router-view>
                </div>
            </div>
        </template>
        ```
        
+   `webpack.config.js` 中配置 `vue` 的 loader

    ```
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    }
    ```
    
+   执行 `npm run dev`，会自动打开页面访问

+   支持 css

    +   支持 `.vue` 内部的 css

        安装 `css-loader` 后即可在 vue 文件中使用 `<style>`，不需要配置 `rule`。
        
        ```
        npm install css-loader --save
        ```
    
    +   支持 `import / require` 引入的 css 文件

        需要在 `webpack.config.js` 配置对应的 `rule`。
    
        ```
        {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
        }
        ```
    
+   支持预处理语言，比如 less

    +   安装依赖

        `npm install less less-loader --save`
        
    +   支持 `.vue` 文件内的 less 语法

        无需配置 `rule`，安装 `less less-loader` 依赖即可
    
    +   支持外部 less 文件
    
        配置 `webpack.config.js` 的 `rule`

        ```
        {
            test: /\.less$/,
            use: ['vue-style-loader', 'css-loader', 'less-loader']
        }
        ```
+   支持图片及图标字体

    +   安装各种 loader

        ```
        npm install url-loader file-loader --save
        ```
        
    +   配置 `webpack.config.js` 的 `rule`

        ```
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'    // 将图片都放入images文件夹下，[hash:7]防缓存
                }
            }]
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'    // 将字体放入fonts文件夹下
                }
            }]
        }
        ```
        
+   支持 es6

    +   安装依赖

        ```
        npm install babel-loader babel-core babel-preset-es2015 --save
        ```
        
    +   增加配置文件 `.babelrc`

        ```
        {
            "presets": ["es2015"],
            "comments": false
        }
        ```
        
    +   配置 loader

        ```
        {
            test: /\.js$/,
            use: 'babel-loader',
            include: [__dirname + '/src']
        }
        ```
        
        注意：webpack2 建议尽量避免 `exclude`，更倾向于使用 `include`。
        
+   提取 css

    +   安装插件 `extract-text-webpack-plugin`

        ```
        npm i extract-text-webpack-plugin -D
        ```
        
    +   提取外部样式文件
    
        ```
        // var ExtractTextPlugin = require("extract-text-webpack-plugin")
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        },
        {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'less-loader']
            })
        }
        ```
    
        上述配置并不能提取 vue 文件中的 style，需要设置 `vue-loader` 参数才可以。
        
    +   提取 `.vue` 文件的样式
    
        ```
        {
            test: /\.vue$/,
            use: {
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader'
                        }),
                        stylus: ExtractTextPlugin.extract({
                            use: ['css-loader', 'stylus-loader']
                        })
                    }
                }
            }
        }
        ```
    
    +   初始化插件，`filename` 可以指定 css 文件的目录。
    
        ```
        new ExtractTextPlugin({
            filename: "css/style.css"
        })
        ```
    
+   postcss

    +   安装 `postcss-loader` 及 `postcss` 插件。
    
        ```
        npm install postcss-loader autoprefixer --save
        ```
    
    +   配置 `loader`
    
        ```
        // css-loader 配置改为
        use: ['css-loader', 'postcss-loader']
        // less-loader 配置改为
        use: ['css-loader', 'postcss-loader', 'less-loader']
        ```
    
        `postcss-loader` 要放在 `css-loader` 和 `style-loader` 之后，css 预处理语言 loader 之前（`less-loader`）。
    
        配置 `postcss-loader` 的插件。建议新增 `postcss.config.js` 来配置 postcss 插件，以免要给每个 `postcss-loader` 去配置。
        
        更多 `postcss-loader` 的配置方式请参考 [postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config)。
    
    ```
    module.exports = {
        plugins: [
            require('autoprefixer')
        ]
    }
    ```
    
+   压缩

    在 `webpack.config.js` 的 `plugins` 添加：

    ```
    new webpack.optimize.UglifyJsPlugin()
    ```
    
    注意：必须将 es6 语法转为 es5 语法才能压缩，否则会报错。
    
+   构建

    `package.json` 添加 `build` 命令：
    
    ```
    "build":"webpack --progress --colors"
    ```
    
    ```
    npm run build
    ```
    
    
    




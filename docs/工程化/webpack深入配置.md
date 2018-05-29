[issue](https://github.com/hoperyy/blog/issues/2)

# webpack 深入配置

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

        `静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径`

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


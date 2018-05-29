[issue](https://github.com/hoperyy/blog/issues/52)

在 webpack 里，所有资源都当成模块，在使用前需要经过 webpack 的构建，一旦项目比较复杂，引用的模块巨大，往往会导致构建速度慢、内存暴涨。

如何提高 webpack 的构建效率成为提高开发效率的关键之一。

## 问题定位

webpack 提供了几个参数帮助我们分析构建效率。

在命令行输入：

```
webpack --colors --profile --display-modules
```

`--colors` 输出结果带彩色，比如会用红色显示耗时较长的步骤

`--profile` 输出性能数据，可以看到每一步的耗时

`--display-modules` 默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些隐藏的模块

根据终端中提示的信息，可以采取对应的方法进行优化。

## 缩小 Loader 的覆盖范围

一般我们使用到 `babel-loader`，可能都会这样配置，让所有的 `js/jsx` 都经过 `babel-loader`

```
module: {
	loaders: [
		test: /\.js(x)*$/,
		loader: 'babel-loader',
		query: {
			presets: ['es2015']
		}
	]
}
```

但是对于 `npm` 包来说，他们完全没有必要经过 babel，这些文件对给打包带来巨大的性能负担。我们可以用 `exclude` 忽略 `node_modules` 里的文件。

```
module: {
	loaders: [
		test: /\.js(x)*$/,
		loader: 'babel-loader',
		query: {
			presets: ['es2015']
		},
		exclude: path.resolve(__dirname, './node_modules')
	]
}
```

## 使用别名快速定位文件

webpack 有个 `resolve.alias` 的配置，它的作用是把用户的一个请求重定向到另一个路径。比如：

```
resolve: {
	alias: {
		jquery: './node_modules/jquery/dist/jquery.min.js'
	}
}
```

打包脚本中的 `require('jquery')` 其实就等价于 `require('./node_modules/jquery/dist/jquery.min.js')`。这样能帮助 webpack 在打包过程中快速定位文件，减少搜索时间。

## 忽略对已知文件的解析

有时一些模块是不需要解析的，我们可以告诉 webpack 不去解析这些模块。可以这样配置：

```
module: {
	noParse: [path.resolve(__dirname, './node_modules/jquery/dist/jquery.min.js')]
}
```

这样，每当 webpack 尝试去解析那个压缩后的文件，我们阻止它，因为这个不必要。

## 使用公共 CDN

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

这时，`require('jquery')` 其实访问的是 `window.jquery`。

## 提取公共模块

当 webpack 构建任务中有多个入口模块，会遇到这样的情况，这些入口文件引用了相同的模块，正常情况下， webpack 会为每个入口文件打包一份相同的模块。

这样会出现的问题是：当相同的模块被改变后，会触发所有引用它的入口文件进行构建，这无疑是造成了性能浪费。

解决办法是使用 `CommonChunks` 插件把这些公用的模块抽离出来，它们的改变就不影响所有入口文件进行构建了。

```
module.exports = {
	entry: {
		main1: './main1',
		main2: './main2'
	},
	plugins: [
		new webpack.optimize.CommonChunksPlugin('common.js', ['main1', 'main2'])
	]
};
```
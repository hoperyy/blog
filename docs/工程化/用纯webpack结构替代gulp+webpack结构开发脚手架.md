[issue](https://github.com/hoperyy/blog/issues/111)

gulp + webpack 这种结构是常见的脚手架开发方式，这种方式的好处是十分灵活，但缺点也很明显，对代码编写的质量要求较高，因为很容易陷入各种处理逻辑。

经过闫安同学的分享，豁然开朗。

现在开发脚手架，我更倾向于使用纯 webpack 结构，并利用 loader + plugin 来管理 webpack 整个构建的生命周期，同样能实现 gulp + webpack 的各项功能。

而且，webpack 生态圈如此繁荣也和 loader + plugin 机制有关，webpack 为它们提供了丰富的生命周期钩子和对象，让开发者可以在构建的生命周期内灵活处理各种问题。
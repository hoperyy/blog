[issue](https://github.com/hoperyy/blog/issues/11)

# 前言

chrome 开发工具好，谁用谁知道。

# 如何打开 chrome 开发者工具

+	方法一

	直接在页面上点击右键，然后选择“审查元素”

+	方法二

	快捷键：`ctrl+shift+I` 或者 `F12`

# 开发者工具中，每个 tab 的作用

## Elements

你可以：

+	查看 HTML
+	编辑 HTML，即时生效
+	监听 HTML 修改

	在JS对元素的属性或者 HTML 进行修改的时候，直接出发断点，跳转到对该元素修改的JS代码处：

+	查看和编辑元素的 CSS

## Network

Network 对于分析网络请求情况、查看请求和响应的详情特别有用

## Sources

sources 展示了网站加载的资源文件。

它的一大用处是在JS调试时设置断点

还可以格式化压缩后的JS代码

## Timeline

Timeline 并不是指网络请求的加载时间，而是指 JS 执行时间、页面渲染时间，点击底部的 record 可以录制页面上执行的内容。

## Profiles

主要是做性能优化的，包括查看CPU执行时间与内存占用

## Audits

对于优化前端页面、加速网页加载速度很有用。

点击 run 按钮，就可以开始分析页面，分析完了就可以看到分析结果了

它也可以分析出页面上的样式表中有哪些CSS是没有使用的

## Console 

这就是 JS 控制台了，前端调试用的最多的地方。可以直接执行 JS 代码，或者是chrome开放的控制台API。

如`console`：

+	`console.log()`
+	`console.info()`
+	`console.error()`
+	`console.warn()`
+	`console.group()`与`console.groupEnd()`
+	`console.table()`
+	`console.assert()`
+	`console.count()`
+	`console.dir()`
+	`console.time()`与`console.timeEnd()`
+	控制台API
	+	`$`等价于`document.querySelector()`
	+	`$$`等价于`document.querySelectorAll()`
	+	`$_`

		最近一次表达式执行的结果

	+	`$0~$4`

		最近5个选择过的 DOM 节点
	+	`keys` 与 `values`
	+	`monitor` 与 `unmonitor`
		
		`monitor(函数名)`：每执行一次函数，会在控制台输出一条信息
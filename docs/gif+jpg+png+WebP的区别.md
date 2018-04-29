+	gif
	+	优点
		+	是无损压缩
		+	是水平压缩，也就是说 `10*500` 的图片压缩效果不如 `500*10` 的图片
		+	支持动画
		+	支持透明
		+	支持渐变色彩
	+	缺点
		+	只支持 1-bit 的透明，即要么透明，要么不透明
		+	只支持 8-bit 种色彩，所以对色彩丰富的图片压缩效果不好。

	+	适合
		+	小图标
		+	色彩不丰富的图片

+	png
	+	无损压缩
	+	png8：256 色，支持透明（要么全透明、要么不透明），浏览器中可能出现毛边
	+	png24：不支持透明
	+	png32：支持 8 位透明通道，所以支持透明

+	jpg
	+	优点
		+	支持百万种颜色。
	+	缺点
		+	是有损压缩。
	+	适合
		+	色彩丰富的图片
	+	不适合
		+	小图标
		+	线条图片

+	WebP 
	+	介绍

		是一种支持有损压缩和无损压缩的图片文件格式，派生自图像编码格式 VP8。

	+	优点
		+	png 转 WebP 的压缩率要高于 png 的压缩率，同样支持有损和无损
		+	转换后的 WebP 体积大幅减少，图片质量也得到保障（同时肉眼几乎无法看出差异）
		+	支持 24-bit 的 RGB 颜色和 8-bit 的 Alpha 透明通道，不存在 png8 色彩不够丰富和在浏览器中可能会出现毛边的问题
		+	支持动画。gif 转 Animated WebP 后可以减少 64% 的体积，转成无损可以减少 19% 的体积

	+	缺点
		+	CPU 解码时间更长
		+	和 gif 相比兼容性更差
		+	为了支持 Animated WebP， Chrome 新版内核 Blink 添加了近 1500 行的代码

	+	如何使用 WebP
		+	如果使用场景是浏览器，可以
			+	JS 能力检测，对支持 WebP 的浏览器输出 WebP
			+	使用 WebP 支持插件：[WebPJS](http://WebPjs.appspot.com/)
		+	如果使用场景是 APP，可以
			+	Android 4.0 以下使用 [WebP 解析库](https://github.com/alexey-pelykh/WebP-android-backport)
			+	IOS [WebP 解析库](https://github.com/carsonmcdonald/WebP-iOS-example)


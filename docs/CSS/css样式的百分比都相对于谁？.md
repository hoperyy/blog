[issue](https://github.com/hoperyy/blog/issues/18)

+	相对于父元素宽度的

	`[max/min-]width`、`left`、`right`、`padding`、`margin` 等；

+	相对于父元素高度的

	`[max/min-]height`、`top`、`bottom` 等；

+	相对于继承字号的

	`font-size` 等；

+	相对于自身字号的

	`line-height` 等；

+	相对于自身宽高的

	`border-radius`、`background-size`、`transform: translate()`、`transform-origin`、`zoom`、`clip-path` 等；

+	特殊算法的

	`background-position（方向长度 / 该方向除背景图之外部分总长度 * 100）`、
`filter` 系列函数等；

+	父元素

	+	如果自身设置 `position: absolute`

		“父元素”指：相对于离它最近的那个 `position` 不为 `static` 的外层元素，如果没有这样的元素，则相对于窗口。

	+	如果 `position: fixed`

		“父元素”指：视口。

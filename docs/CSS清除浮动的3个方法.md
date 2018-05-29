[issue](https://github.com/hoperyy/blog/issues/17)

## `clear: both;`

浮动末尾添加新标签或使用 `::after` 为元素，设置样式为 `clear:both`。

原理：清除浮动的块盒在 `margin-top` 上所产生的间距（clearance）的值与其 `margin-top` 之和应该足够使其 `border-top` 恰好与浮动元素的 `margin-bottom` 相邻接。

## 构造 `BFC`

构造 `BFC` 的方法

+	`float` 设置为非 `none` 值
+	`overflow` 设置为非 `visible`
+	`display` 设置为 `table-cell, table-caption, inline-block`
+	`position` 设置为 `absolute` 或 `fixed`

## `IE6/7` 下没有 `BFC` 的概念，但有类似 `BFC` 的 `has layout`

`has layout`的方法

+	有些元素本身就 `has layout`
+	没有 `has layout` 的元素
	+	`position: absolute`
	+	`float` 不为 `none`
	+	`display`: `inline-block`
	+	`height`：除 `auto` 外任意值
	+	`width`：除 `auto` 外任意值
	+	`zoom`：除 `normal` 外任意值
	+	`overflow` 非 `visible` (仅限 IE7)
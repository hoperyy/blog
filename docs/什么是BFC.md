## 什么是 BFC？

BFC(Block formating contexts) 块级格式上下文。

BFC 是一个独立的容器环境，在这个环境里，物品的摆放是不受外界影响的。

## 在 BFC 中有什么效果？

+	在 BFC 中，物品的摆放是不受外界影响的
+	在 BFC 中，块盒与行盒（行盒由一行中所有的内联元素组成）都会垂直地沿着其父元素的边框排列
+	BFC 元素可以清除浮动

## 怎样产生 BFC？

+	浮动元素
+	绝对定位元素
+	块级盒子：overflow 值不为 visible
+	非块级盒子：inline-blocks、table-cells、table-captions

以上元素均会为其内容创建新的 BFC（块级格式化上下文）。

## BFC 的运用

+	左边图片 + 右边信息（利用了 BFC 内部元素不受外界元素影响的特点）

	```
	<style type="text/css">
	.bfc-example-0 {
		width: 210px;
		border: 1px solid #000;
	}
	.bfc-example-0-img {
		width: 100px;
		height: 100px;
		background: #696;
		float: left;
	}
	.bfc-example-0-info {
		background: #ccc;
		color: #fff;
		margin:0;
	}	
	</style>

	<div class="bfc-example-0">
		<div class="bfc-example-0-img">img float-left</div>
		<p class="bfc-example-0-info">
			.info .info .info .info .info .info .info .info .info .info .info .info .info .info .info .info .info .info .info .info .info .info 
		</p>
	</div>
	```

![image](https://user-images.githubusercontent.com/5757051/27517352-a39246f2-59fd-11e7-85e7-1504fa2a0fa1.png)


  这时，浮动的图片已经影响到了 .info 的布局，可以给 .info 创建 BFC 环境，解决这个问题：`overflow: hidden;`

         
  ![image](https://user-images.githubusercontent.com/5757051/27517365-da867e12-59fd-11e7-87d5-cbbc6e29082e.png)
	

## 再聊聊外边距合并

+	什么是外边距合并

	在 CSS 中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。

	这种合并外边距的方式称为折叠，并且因而所结合成的外边距称为折叠外边距。

+	折叠的结果

	+	两个相邻的外边距都是正数时，结果是它们两者之间较大的值。
	+	两个相邻的外边距都是负数时，结果是两者绝对值较大的值。
	+	两个相邻的外边距一正一负时，结果是两者相加的和。

+	产生折叠的有以下必备条件：margin 必须是相邻的
	
	+	1、必须位于常规文档流（非 float 和 绝对定位）
	+	2、必须是块级盒子（display 属性必须是以下之一：block、list-item、table）
	+	3、必须处于同一个 BFC 中
	+	4、没有线盒，没有空隙（clearance），没有 padding 和 border 将他们分开
	+	5、都属于垂直方向上相邻的外边距
		+	元素的 margin-top 与其第一个常规文档流的子元素的 margin-top
		+	元素的 margin-bottom 与其下一个常规文档流的兄弟元素的 margin-top
		+	height 为 auto 的元素的 margin-bottom 与其最后一个常规文档流的子元素的 margin-bottom
		+	高度为 0 并且最小高度也为 0，不包含常规文档流的子元素，并且自身没有建立新的 BFC 的元素的 margin-top 和 margin-bottom

+	**外边距合并与 BFC 之间的关系**

	外边距合并的规则里，有一条：两个元素位于同一个 BFC 中

+	基于以上规则，就意味着
	
	+	创建了新的 BFC 的元素（例如浮动元素或者 overflow 值为 visible 以外的元素）与它的子元素的外边距不会折叠

		因为元素和其子元素不在同一个 BFC 中（规则：3）

	+	浮动元素不与任何元素的外边距产生折叠（包括其父元素和子元素）

		因为脱离了常规文档流（规则：1）

	+	绝对定位元素不与任何元素的外边距产生折叠

		因为脱离了常规文档流（规则：1）

	+	inline-block 元素不与任何元素的外边距产生折叠

		因为不是块级盒子（规则：2）

	+	一个常规文档流元素的 margin-bottom 与它下一个常规文档流的兄弟元素的 margin-top 会产生折叠，除非它们之间存在间隙（clearance）。

		（规则4）

	+	一个常规文档流元素的 margin-top 与其第一个常规文档流的子元素的 margin-top 产生折叠，条件为父元素不包含 padding 和 border ，子元素不包含 clearance。

		（规则4、5）

	+	一个 height 为 auto 并且 min-height 为 0 的常规文档流元素的 margin-bottom 会与其最后一个常规文档流子元素的 margin-bottom 折叠，条件为父元素不包含 padding 和 border ，子元素的 margin-bottom 不与包含 clearance 的 margin-top 折叠。

		（规则4、5）

	+	一个不包含 border-top、border-bottom、padding-top、padding-bottom 的常规文档流元素，并且其 height 为 0 或 auto， min-height 为 0，其里面也不包含行盒(line box)，其自身的 margin-top 和 margin-bottom 会折叠。

		（规则4、5）

+	一些具体情况

	+	浮动和绝对定位不与任何元素产生 margin 重叠，原因如下

		+	脱离了当前的文档流，违反了外边距合并的两个元素必须相邻的条件，因此与兄弟元素就不会重叠
		+	为内容创建了新的 BFC，该元素和子元素所处的 BFC 是不同的，因此与子元素不会重叠

	+	inline-block 元素与其兄弟元素、子元素、父元素的外边距军不会重叠

		因为 inline-block 元素不是块级盒子。

	+	clearance

		<img src="http://cdn2.w3cplus.com/cdn/farfuture/i8a8BoTw7r0VM_q1xZ_uX5dPybQw6gqTebBLQWnb8fs/mtime:1421034944/sites/default/files/styles/print_image/public/baiyaimages/margin-colla-3.jpg">

		根据图中文字的描述，可以看出：

		+	none-float: 不浮动的元素(margin 部分用阴影表示了)
		+	float-left: float 的元素
		+	clear: clear:both 的元素(margin 部分用阴影表示了)

		有一个现象，无论 clear 元素的 margin-top 如何调整，其位置不变；但 float 元素的 margin-bottom 变化的话， clear 元素的位置就会变化。

		通过 w3c 的官方规范可知，清除浮动的块盒在 margin-top 上所产生的间距（clearance）的值与其 margin-top 之和应该足够使其 border-top 恰好与浮动元素的 margin-bottom 相邻接。

		用上图例子中的相关值可以得出这样一个式子：

		`r-margin-top + r-clearance = g-margin-top + g-height + g-margin-bottom`

		注意：闭合浮动并不能使浮动元素回到原来的 BFC 中。

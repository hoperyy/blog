[issue](https://github.com/hoperyy/blog/issues/41)

## 容器

+	容器的属性集中在：
	+	流动性(flex-flow)
		+	flex-direction
		+	flex-wrap
	+	纵横（横1纵2）
		+	justify-content
		+	align-items
		+	align-content

+	其他
	+	横一纵二
		+	横：justify-content
		+	纵：align-items/align-content
	+	横纵均有
		+	flex-start
		+	flex-end
		+	center
	+	纵向有：stretch

+	容器属性
	
	+	flex-flow（**简写** 顺序如下所示）
		+	flex-direction
			+	row(default)
			+	row-reverse
			+	column
			+	column-reverse
		+	flex-wrap
			+	nowrap(default)
			+	wrap
			+	wrap-reverse
	+	justify-content
		+	**flex-start**
		+	**flex-end**
		+	**center**
		+	**<span style="color:blue;">space-between</span>**
		+	**<span style="color:blue;">space-around</span>**
	+	align-content
		+	**flex-start**
		+	**flex-end**
		+	**center**
		+	**<span style="color:blue;">space-between</span>**
		+	**<span style="color:blue;">space-around</span>**	
		+	**<span style="color:red;">stretch</span>**
	+	align-items
		+	**flex-start**
		+	**flex-end**
		+	**center**
		+	**<span style="color:green;">baseline</span>**
		+	**<span style="color:red;">stretch</span>**

## 子项目

+	子项目的属性集中在
	+	影响流动性
		+	align-self
		+	order
	+	伸缩宽(flex)
		+	flex-grow
		+	flex-shrink
		+	flex-basis
	
+	子项目属性

	+	order（数值越小越靠前，默认为0）
	+	flex（**简写** 顺序如下所示）
		+	flex-grow
			+	0(default，不放大)
			+	所有项目的flex-grow属性都为1，则它们将等分剩余空间
		+	flex-shrink
			+	1(default，可缩小)
		+	flex-basis
			+	width

		flex: 1 等价于 flex: 1 1 0%;

		flex: 0 等价于 flex: 0 1 0%;

	+	align-self
		+	**<span style="color:red;">auto</span>**
		+	flex-start
		+	flex-end
		+	center
		+	baseline
		+	stretch

## 其他

+	影响流动的地方，子项目有：order、align-self 两处
+	换行

	+	flex-start

		```
		- - -
		-
		```

	+	flex-end

		```
		- - -
		    -
		```

	+	换行的时候，需要调整的是 align-content

+	flex-direction: column 时

	```
	-
	- 
	-  -
	```

	方向是从左到右的
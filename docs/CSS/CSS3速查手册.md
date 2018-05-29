[issue](https://github.com/hoperyy/blog/issues/13)

#  hack（各个浏览器前缀）
    
举例：

    transform:rotate(30deg);
    -ms-transform:rotate(30deg); /* IE 9 */
    -moz-transform:rotate(30deg); /* Firefox */
    -webkit-transform:rotate(30deg); /* Safari and Chrome */
    -o-transform:rotate(30deg); /* Opera */

#  边框
+   新的边框属性
    +   border-image    设置所有 border-image-* 属性的简写属性。    
    +   border-radius   设置所有四个 border-*-radius 属性的简写属性。 
    +   box-shadow  向方框添加一个或多个阴影。
+   `box-shadow`
    +   `x轴距离 y轴距离 阴影区域大小 阴影颜色`
+   `border-image`
    +   暂略

#  背景
+   新的背景属性
    +   background-clip 规定背景的绘制区域。  
    +   background-origin   规定背景图片的定位区域。    
    +   background-size 规定背景图片的尺寸。  
+   `background-size`
    +   可以是像素、百分比
    +   百分比的话，相对于父元素的宽度和高度
+   `background-origin`
    +   可以这是背景的起始位置
    +   支持多重背景
+   `background-clip`
    +   背景的裁剪位置
   
#  文本效果
+   新的文本属性
    +   hanging-punctuation 规定标点字符是否位于线框之外。 
    +   punctuation-trim    规定是否对标点字符进行修剪。  
    +   text-align-last 设置如何对齐最后一行或紧挨着强制换行符之前的行。    
    +   text-emphasis   向元素的文本应用重点标记以及重点标记的前景色。 
    +   text-justify    规定当 text-align 设置为 "justify" 时所使用的对齐方法。 
    +   text-outline    规定文本的轮廓。    
    +   text-overflow   规定当文本溢出包含元素时发生的事情。  
    +   text-shadow 向文本添加阴影。    
    +   text-wrap   规定文本的换行规则。  
    +   word-break  规定非中日韩文本的换行规则。  
    +   word-wrap   允许对长的不可分割的单词进行分割并换行到下一行。    
+   `word-wrap`
    +   所有主流浏览器都支持
+   `text-shadow`
    +   `text-shadow(x轴距离 y轴距离 阴影区域大小 阴影颜色)`
+   还有一些新的文本属性

#  字体
+   `@font-face`
    +   是一个规则，定义名称（`font-family`）和源`src`
+   能够在 @font-face 规则中定义的所有字体描述符
    +   font-family 必需。规定字体的名称。
    +   src 必需。定义字体文件的 URL。
    +   font-stretch    可选。定义如何拉伸字体。默认是 "normal"。  
    +   font-style  可选。定义字体的样式。默认是 "normal"。
    +   font-weight 可选。定义字体的粗细。默认是 "normal"。
    +   unicode-range   可选。定义字体支持的 UNICODE 字符范围。默认是 "U+0-10FFFF"。
    
#  转换
+   所有转换属性
    +   transform   向元素应用 2D 或 3D 转换。   3
    +   transform-origin    允许你改变被转换元素的位置。  3
    +   transform-style 规定被嵌套元素如何在 3D 空间中显示。    3
    +   perspective 规定 3D 元素的透视效果。  3
    +   perspective-origin  规定 3D 元素的底部位置。  3
    +   backface-visibility 定义元素在不面对屏幕时是否可见。
+   `transform`
    +   2D Transform 方法
        +   matrix(n,n,n,n,n,n) 定义 2D 转换，使用六个值的矩阵。
        +   translate(x,y)  定义 2D 转换，沿着 X 和 Y 轴移动元素。
        +   translateX(n)   定义 2D 转换，沿着 X 轴移动元素。
        +   translateY(n)   定义 2D 转换，沿着 Y 轴移动元素。
        +   scale(x,y)  定义 2D 缩放转换，改变元素的宽度和高度。
        +   scaleX(n)   定义 2D 缩放转换，改变元素的宽度。
        +   scaleY(n)   定义 2D 缩放转换，改变元素的高度。
        +   rotate(angle)   定义 2D 旋转，在参数中规定角度。
        +   skew(x-angle,y-angle)   定义 2D 倾斜转换，沿着 X 和 Y 轴。
        +   skewX(angle)    定义 2D 倾斜转换，沿着 X 轴。
        +   skewY(angle)    定义 2D 倾斜转换，沿着 Y 轴。
    +   3D Transform 方法
        +   matrix3d(n,n,n,n,n,n,
        n,n,n,n,n,n,n,n,n,n)    定义 3D 转换，使用 16 个值的 4x4 矩阵。
        +   translate3d(x,y,z)  定义 3D 转化。
        +   translateX(x)   定义 3D 转化，仅使用用于 X 轴的值。
        +   translateY(y)   定义 3D 转化，仅使用用于 Y 轴的值。
        +   translateZ(z)   定义 3D 转化，仅使用用于 Z 轴的值。
        +   scale3d(x,y,z)  定义 3D 缩放转换。
        +   scaleX(x)   定义 3D 缩放转换，通过给定一个 X 轴的值。
        +   scaleY(y)   定义 3D 缩放转换，通过给定一个 Y 轴的值。
        +   scaleZ(z)   定义 3D 缩放转换，通过给定一个 Z 轴的值。
        +   rotate3d(x,y,z,angle)   定义 3D 旋转。
        +   rotateX(angle)  定义沿 X 轴的 3D 旋转。
        +   rotateY(angle)  定义沿 Y 轴的 3D 旋转。
        +   rotateZ(angle)  定义沿 Z 轴的 3D 旋转。
        +   perspective(n)  定义 3D 转换元素的透视视图。

+   `transform-origin`
    +   该属性必须与 transform 属性一同使用。
    +   改变被转换元素的位置
    +   `transform-origin: x-axis y-axis z-axis;`
   
#  过渡
+   定义
    +   CSS3 过渡是元素从一种样式逐渐改变为另一种的效果
    +   要实现这一点，必须规定两项内容：
        +   规定您希望把效果添加到哪个 CSS 属性上，把规则应用到属性的变化上
        +   规定效果的时长
    +   使用方法
        +   在初始样式上加上`transition`属性，并设定是哪个属性变化时应用效果
        
	            div {
	                transition: width 2s;
	                -moz-transition: width 2s;  /* Firefox 4 */
	                -webkit-transition: width 2s;   /* Safari 和 Chrome */
	                -o-transition: width 2s;    /* Opera */
	            }
	
	            div:hover {
	                width:300px;
	            }
+   所有的过渡属性
    +   transition  简写属性，用于在一个属性中设置四个过渡属性。  3
    +   transition-property 规定应用过渡的 CSS 属性的名称。  3
    +   transition-duration 定义过渡效果花费的时间。默认是 0。  3
    +   transition-timing-function  规定过渡效果的时间曲线。默认是 "ease"。 3
    +   transition-delay    规定过渡效果何时开始。默认是 0。
   
#  动画
+   百分比或`from-to`定义发生变化的时间，优先使用百分比
+   动画完成后，会返回原来的状态
+   使用方法
    +   在样式上加上`animation`属性，并加上动画规则

	        div {
	            width:100px;
	            height:100px;
	            background:red;
	            position:relative;
	            animation:myfirst 5s;
	            -moz-animation:myfirst 5s; /* Firefox */
	            -webkit-animation:myfirst 5s; /* Safari and Chrome */
	            -o-animation:myfirst 5s; /* Opera */
	        }
	    
	        @keyframes myfirst {
	            0%   {background: red; left:0px; top:0px;}
	            25%  {background: yellow; left:200px; top:0px;}
	            50%  {background: blue; left:200px; top:200px;}
	            75%  {background: green; left:0px; top:200px;}
	            100% {background: red; left:0px; top:0px;}
	        }

+    @keyframes 规则和所有动画属性
    +   @keyframes  规定动画。   
    +   animation   所有动画属性的简写属性，除了 animation-play-state 属性。 
    +   animation-name  规定 @keyframes 动画的名称。    
    +   animation-duration  规定动画完成一个周期所花费的秒或毫秒。默认是 0。   
    +   animation-timing-function   规定动画的速度曲线。默认是 "ease"。   
    +   animation-delay 规定动画何时开始。默认是 0。 
    +   animation-iteration-count   规定动画被播放的次数。默认是 1。   
    +   animation-direction 规定动画是否在下一周期逆向地播放。默认是 "normal"。  
    +   animation-play-state    规定动画是否正在运行或暂停。默认是 "running"。    
    +   animation-fill-mode 规定对象动画时间之外的状态。
    
#  多列
+   定义
    
    创建多个列来对文本进行布局 - 就像报纸那样

+   所有的转换属性
    +   column-count    规定元素应该被分隔的列数。  
    +   column-fill 规定如何填充列。   
    +   column-gap  规定列之间的间隔。  
    +   column-rule 设置所有 column-rule-* 属性的简写属性。
    +   column-rule-color   规定列之间规则的颜色。
    +   column-rule-style   规定列之间规则的样式。
    +   column-rule-width   规定列之间规则的宽度。
    +   column-span 规定元素应该横跨的列数。   
    +   column-width    规定列的宽度。
    +   columns 规定设置 column-width 和 column-count 的简写属性。
    
#  用户界面
+   所有的转换属性
    +   appearance  允许您将元素设置为标准用户界面元素的外观    
    +   box-sizing  允许您以确切的方式定义适应某个区域的具体内容。 
    +   icon    为创作者提供使用图标化等价物来设置元素样式的能力。   
    +   nav-down    规定在使用 arrow-down 导航键时向何处导航。 
    +   nav-index   设置元素的 tab 键控制次序。    
    +   nav-left    规定在使用 arrow-left 导航键时向何处导航。 
    +   nav-right   规定在使用 arrow-right 导航键时向何处导航。    
    +   nav-up  规定在使用 arrow-up 导航键时向何处导航。   
    +   outline-offset  对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。    
    +   resize  规定是否可由用户对元素的尺寸进行调整。
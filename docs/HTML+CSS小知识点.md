## HTML 元素的分类

参考文章：https://blog.csdn.net/sakurallj/article/details/48277463

元素有两种分类方式：

+   可替换元素和非可替换元素
    +   替换元素就是浏览器根据元素的标签和属性，来决定元素的具体显示内容。
    +   `<img>`、`<input>`、`<textarea>`、`<select>`、`<object>` 等
    +   HTML 的大多数元素是不可替换元素，即其内容直接表现给用户端（例如浏览器）
+   块元素和行内元素

## CSS 定位
+   static（默认）
+   relative
+   absolute
+   fixed
+   sticky
+   initial
+   unset
+   inherit

## px、em、rem
+   px：相对屏幕分辨率的长度单位
+   em：相对单位，相对于当前对象内文本的字体尺寸，如当前行内文本的字体尺寸未被设置，则相对于浏览器的默认字体尺寸
+   rem：相对单位，但相对的只是 HTML 根元素

## 高性能 CSS3 动画

+   GPU 硬件渲染，3d
+   尽可能让动画元素不在文档流中，减少回流重绘
+   GPU 渲染区域不能超过三屏，尽量小

## z-index 生效的前提条件
+   position 非 static
+   display 非 none

## 多屏适配方案
+   media query
+   flex
+   rem
+   弹性布局

## 布局相关的属性
+   table — 删除多行多列布局
+   float — 实现文字环绕效果，早期的自适应布局实现方案
+   display — inline block，正常布局，占据文档空间
+   position — 绝对定位和相对偏移，脱离文档，视觉层叠效果，固定位置
+   flex — 弹性布局，灵活分配空间
+   grid — 栅格布局，设计规则
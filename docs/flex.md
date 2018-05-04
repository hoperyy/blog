## 参考文章

http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

## 重点

+   容器（6 个属性）：关键词 “滑轨”
    +   `flex-direction`：墙在左侧/右侧/上侧/下侧 && 和墙挨着的 item 不变
    +   `flex-wrap`： 为默认的 `nowrap` 时，如果 item 数量足够多，即使 item 设置有宽度，也会失效
    +   `flex-flow`：格式 `row nowrap`
    +   `justify-content`： 将 items 看做整体，所有 item 在一个水平滑轨上水平滑动，item 的顺序不会变换
    +   `align-content`：将每行 items 看做整体，所有 行 在一个垂直滑轨上滑动，行 的顺序不会变换
    +   `align-items`：每个 item 一个纵轴，item 在纵轴上滑动，items 之间的对齐方式

+   项目（6 个属性）：关键词 “宽度”
    +   `order`：顺序。数值越小越靠前，可以为负值
    +   `flex-grow`：放大比例，默认为 0，默认不放大
    +   `flex-shrink`：缩小比例，默认为 1，默认缩小
    +   `flex-basis`：默认 auto，即项目的本来大小，可以设置为 `width`
    +   `flex`：`flex-grow || flex-shrink || flex-basis`
    +   `align-self`：可以覆盖 `align-items`
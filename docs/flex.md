## 参考文章

http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

https://segmentfault.com/q/1010000004080910/a-1020000004121373

## 重点

+   容器（6 个属性）：关键词 “滑轨”
    +   `flex-direction`：墙在左侧/右侧/上侧/下侧 && 和墙挨着的 item 不变
    +   `flex-wrap`： 为默认的 `nowrap` 时，如果 item 数量足够多，即使 item 设置有宽度，也会失效
    +   `flex-flow`：格式 `row nowrap`
    +   `justify-content`： 将 items 看做整体，每个水平线上的所有 item 在一个水平滑轨上水平滑动，item 的顺序不会变换
    +   `align-content`：将每行 items 看做整体，所有 行 在一个垂直滑轨上滑动，行 的顺序不会变换

        **如果只有一行，设置 center、flex-end 等无效**

    +   `align-items`：每个 item 一个纵轴，item 在纵轴上滑动，items 之间的对齐方式

+   项目（6 个属性）：关键词 “宽度”
    +   `order`：顺序。数值越小越靠前，可以为负值
    +   `flex-grow`：放大比例，默认为 0，默认不放大
    +   `flex-shrink`：缩小比例，默认为 1，默认缩小
    +   `flex-basis`：默认 auto，即项目的本来大小，可以设置为 `width`

        flex-basis 和 width（或者 height）的关系，目前（说不定啥时候就又变了）只是当 flex-basis 设置为 auto 且 width（或者 height）不为 auto 时，计算 flex-basis 的 used size 时会用到width（或者 height）的值。

    +   `flex`：`flex-grow || flex-shrink || flex-basis`

        **注意**

        +   如果 `flex-direction: row`，则为横向伸缩，设置的 `width` 不一定生效，`flex-basis` 能生效
        +   如果 `flex-direction: column`，则为纵向伸缩，设置的 `height` 不一定生效，`flex-basis` 能生效
        +   如果不设置 `flex: 1`，则  items 不会自动充满容器（水平或纵向）

    +   `align-self`：可以覆盖 `align-items`
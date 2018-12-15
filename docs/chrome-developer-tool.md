# 背景

本文依赖 chrome 版本 69.0.3497.100，日期 2018-10-30

# 打开开发者工具

+   在Chrome菜单中选择 更多工具 > 开发者工具

+   在页面元素上右键点击，选择 “检查”

+   使用 快捷键 Ctrl+Shift+I (Windows) 或 Cmd+Opt+I (Mac)。更多快捷键https://developers.google.com/web/tools/chrome-devtools/shortcuts

# 概览

参考文章： [前端开发必备之Chrome开发者工具（上篇）](https://www.cnblogs.com/laixiangran/p/8777579.html)

chrome 开发者工具主要包含 10+ 个部分

![image](https://user-images.githubusercontent.com/5757051/47730418-12e87300-dc9d-11e8-9e40-6319132053ca.png)

1. 设备模式（device toolbar）
2. 元素面板（Elements）
3. 控制台面板（Console）
4. 源代码面板（Sources） 
5. 网络面板（Network）
6. 性能面板（Performance）
7. 内存面板（Memory）
8. 应用面板（Application）
9. 安全面板（Security）
10. 主菜单（Customize and control DevTools）

# 设备模式（device toolbar）

使用 Chrome DevTools 的 Device Mode 打造移动设备优先的完全自适应式网站

**该模式不可替代真实设备测试**

+   切换 Device Mode 按钮可以打开或关闭 Device Mode

    ![image](https://user-images.githubusercontent.com/5757051/47730725-b9347880-dc9d-11e8-905a-d3afacaf3165.png)

+   选择设备

    ![image](https://user-images.githubusercontent.com/5757051/47730756-c6e9fe00-dc9d-11e8-8613-25d064da5767.png)

    通过该视图控件，你可以设定下面两种模式：

    +  自适应（Reponsive）。 使视口可以通过任意一侧的大手柄随意调整大小
    +  特定设备（iPhone XS 等）。 将视口锁定为特定设备确切的视口大小，并模拟特定设备特性

+   媒体查询
    
    媒体查询是自适应网页设计的基本部分。要查看媒体查询检查器，请在三圆点菜单中点击 Show Media queries。DevTools会在样式表中检测媒体查询，并在顶端标尺中将它们显示为彩色条形

    ![image](https://user-images.githubusercontent.com/5757051/47731001-41b31900-dc9e-11e8-942d-3ca8c9fb6ba9.png)

    用彩色标记的媒体查询示例如下：

    ![image](https://user-images.githubusercontent.com/5757051/47731096-65765f00-dc9e-11e8-90cb-7e6dd3af8ad9.png)

    +  快速预览媒体查询

        点击媒体查询条形，调整视口大小和预览适合目标屏幕大小的样式

    +  查看关联的 CSS

        右键点击某个条形，查看媒体查询在 CSS 中何处定义并跳到源代码中的定义

# 元素面板（Elements）

使用元素面板可以自由地操作 DOM 和 CSS 来迭代布局和设计页面。

在这个面板里，可以自由地修改 DOM 和 CSS 结构，详细操作可参考  [前端开发必备之Chrome开发者工具（上篇）](https://www.cnblogs.com/laixiangran/p/8777579.html)

# 控制台面板（Console）

在开发期间，可以使用控制台面板记录诊断信息，或者使用它作为 shell 在页面上与 JavaScript 交互。

+   以抽屉式导航栏形式打开

    按 `Esc` 打开或关闭抽屉式导航栏。

    ![image](https://user-images.githubusercontent.com/5757051/50040582-213df300-0081-11e9-8810-779b45ce2cb4.png)

+   消息堆叠
   
    如果一条消息连续重复，而不是在新行上输出每一个消息实例，控制台将“堆叠”消息并在左侧外边距显示一个数字。此数字表示该消息已重复的次数。

    ![image](https://user-images.githubusercontent.com/5757051/47760798-0ee64080-dcf1-11e8-8842-c0d1001a6224.png)

+   清除历史记录

    +   在控制台选择清除图标
    +   在控制台输入 `clear()`
    +   在控制台输入 `console.clear()`
    +   按 `Ctrl + L`

+   保存历史记录

    在控制台中点击右键，然后选择 `Save as`，将控制台的输出保存到日志文件中。

+   选择执行环境  Execution Context Selector
  
    ![image](https://user-images.githubusercontent.com/5757051/47761001-c2e7cb80-dcf1-11e8-9504-7aac670115d0.png)

    通常，您会看到此环境设置为 top（页面的顶部框架），也就是当前正在打开的页面。

    其他框架和扩展程序在其自身的环境中运行。要使用这些其他环境，您需要从下拉菜单中选中它们。 例如，如果您要查看 `<iframe>` 元素的日志输出，并修改该环境中存在的某个变量，您需要从 Execution Context Selector 下拉菜单中选中该元素。
     
    举个例子，假如一个页面有一个全局变量 `window.x = 'page1'`，该页面内使用 `iframe` 引入了另一个页面，该页面也有一个全局变量 `window.x = 'page2'`。
     
    那么，当控制台默认设置为 top 环境，我们在 console 控制台输入 `x`，可以看到控制台显示的是 `page1`，假如我们将控制台设置为 `iframe` 环境，那么，我们在 console 控制台输入 `x`，可以看到控制台显示的是 `page2`。

+   其他更详细的设置

    +   `Hide network messages`: 默认情况下，控制台将报告网络问题。启用此设置将指示控制台不显示这些错误的日志。例如，将不会记录 404 和 500 系列错误。
    +   `Log XMLHttpRequests`: 确定控制台是否记录每一个 XMLHttpRequest。
    +   `Show timestamps`: 如果您倾向于为每一个日志使用一个独特的行条目，请在 DevTools 设置中启用 Show timestamps。由于每个 log 的时间戳不同，故**可以消除 log 堆叠**。

+   日志

    +   使用 `console.log()` 进行基本记录
    +   使用 `console.error()` 和 `console.warn()` 显示引入注目的消息
    +   使用 `console.group()` 和 `console.groupEnd()` 对相关消息进行分组，避免混乱

        ```js
        var user = "jsmith", authenticated = false;
        console.group("Authentication phase");
        console.log("Authenticating user '%s'", user);
        // authentication code here...
        if (!authenticated) {
            console.log("User '%s' not authenticated.", user)
        }
        console.groupEnd();
        ```

        **组是自动展开的。**

        可以用 `console.groupCollapsed` 自动折叠组。

        ```js
        console.groupCollapsed("Authenticating user '%s'", user);
        if (authenticated) {
            ...
        }
        console.groupEnd();
        ```

    +   使用 `console.assert()` 显示条件性错误消息

        `console.assert()` 方法可以仅在其第一个参数为 `false` 时有条件地显示错误字符串（其第二个参数）。

    +   字符串替代和格式设置

        格式：`%格式`。

        举例：`console.log("%s has %d points", "Sam", 100);`

        +   `%s` 将值格式化为字符串
        +   `%i` 或 `%d` 将值格式化为整型
        +   `%f` 将值格式化为浮点值
        +   `%o` 将值格式化为可扩展 DOM 元素。如同在 Elements 面板中显示的一样
        +   `%O` 将值格式化为可扩展 JavaScript 对象
            
            可用于将 DOM 元素格式化为 JavaScript 对象。

        +   `%c` 将 CSS 样式规则应用到第二个参数指定的输出字符串

            ```js
            console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");
            ```

        +   将 DOM 元素格式化为 JavaScript 对象

            默认情况下，DOM 元素将以其 HTML 的表示的形式记录到控制台中。

            您希望以 JavaScript 对象的形式访问 DOM 元素并检查其属性。为此，您可以使用 `%O` 字符串说明符（参见上文），也可以使用 console.dir 达到同样的效果：

            ```js
            console.dir(document.body.firstElementChild)
            ```

+   测量执行时间

    使用 `console.time(label)` 和 `console.timeEnd(label)` 跟踪代码执行点之间经过的时间。

    ```js
    console.time("Array initialize");
    var array= new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
        array[i] = new Object();
    };
    console.timeEnd("Array initialize");
    ```

+   对语句执行进行计数

    ```js
    function login(user) {
        console.count("Login called for user " + user);
    }

    users = [ // by last name since we have too many Pauls.
        'Irish',
        'Bakaus',
        'Kinlan'
    ];

    users.forEach(function(element, index, array) {
        login(element);
    });

    login(users[0]);
    ```

+   表达式

    +   `$()`: 返回与指定 CSS 选择器匹配的第一个元素。 `document.querySelector()` 的快捷键。
    +   `$$()`: 返回一个与指定 CSS 选择器匹配的所有元素数组。等同于 `document.querySelectorAll()`。
    +   `$x()`: 返回一个与指定 XPath 匹配的元素数组。

        ```js
        $('code') // Returns the first code element in the document.
        $$('figure') // Returns an array of all figure elements in the document.
        $x('html/body/p') // Returns an array of all paragraphs in the document body.
        ```

    +   `$_`: 返回最近评估的表达式的值。

    +   `$0`、`$1`、`$2`、`$3` 和 `$4` 命令用作在 Elements 面板中检查的最后五个 DOM 元素或在 Profiles 面板中选择的最后五个 JavaScript 堆对象的历史参考。

        `$0` 返回最近一次选择的元素或 JavaScript 对象，以此类推。

+   复制到粘贴板

    ```js
    copy(object)
    ```

    `copy(object)` 将指定对象的字符串表示形式复制到剪贴板。

# 源代码面板（Sources）

在源代码面板中设置断点来调试 JavaScript ，或者通过Workspaces（工作区）连接本地文件来使用开发者工具的实时编辑器。

+   格式化混淆代码

    在某些情况下，我们需要对混淆的代码做一定的调试，但这是我们看到的代码是乱成一团，毫无格式可言，

    ![image](https://user-images.githubusercontent.com/5757051/47761078-16f2b000-dcf2-11e8-9643-07d30013d9fd.png)

    那我们可以点击下方的格式化按钮对代码进行格式化：
    
    ![image](https://user-images.githubusercontent.com/5757051/47761157-54efd400-dcf2-11e8-9f03-050bff457676.png)

+   断点调试

    +  代码行断点
        
        当我们知道需要调试的代码的确切位置的时候，使用代码行断点

        DevTools 设置代码行断点：

        1. 点击 Sources 选项卡。
        2. 打开包含您想要调试的代码行的文件。
        3. 找到该代码行。
        4. 点击左边的行号，这样一个蓝色图标就显示在行号上，表明该代码行设置好断点了。

        ![image](https://user-images.githubusercontent.com/5757051/47761554-d5fb9b00-dcf3-11e8-9172-9531214a54db.png)

        当然你也可以在代码中使用 debugger 来设置代码行断点，效果和在 DevTools 中设置是一样的：

        ```js
        console.log('a');
        console.log('b');
        debugger;
        console.log('c');
        ```

+   条件代码行断点
  
    当我们知道需要调试的代码的确切位置且在满足条件下才调试的时候，使用条件代码行断点

    设置条件的代码行断点：

    1. 点击 Sources 选项卡。
    2. 打开包含您想要调试的代码行的文件。
    3. 找到该代码行。
    4. **右键**点击左边的行号。
    5. 选择添加条件断点。代码行下面会显示一个对话框。
    6. 在对话框中输入你的条件。
    7. 按Enter激活断点。行号上出现橙色图标。

+   DOM更改断点

    当您想要更改 DOM 节点或其子节点的代码时，使用 DOM 更改断点

    设置 DOM 更改断点：

    1. 切换到 Elements 面板。
    2. 找到您想设置断点的元素并右键单击该元素。
    3. 将鼠标悬停在 Break on 上，然后选择 subtree modifications，attribute modifications 或 node removal。

+  XHR 断点

    当 XHR 的请求 URL 包含指定字符串时，如果要中断，使用 XHR 断点

    设置 XHR 断点：

    1. 点击 Sources 选项卡。
    2. 展开 XHR Breakpoints 窗格。
    3. 点击添加断点。
    4. 输入你想要打断的字符串。当此字符串出现在XHR的请求URL中的任何位置时，DevTools会暂停。
    5. 按 Enter 或 失去焦点确认。
  
    ![image](https://user-images.githubusercontent.com/5757051/47761731-84074500-dcf4-11e8-85a8-b9d766642912.png)

+   事件监听器断点

    当想要暂停事件侦听器代码时，使用事件侦听器断点

    设置事件监听器断点：

    1. 点击 Sources 选项卡。
    2. 展开 “Event Listener Breakpoints” 窗格。DevTools显示事件类别的列表，例如动画。
    3. 选中这些类别中的一个可以暂停该类别的任何事件，或者展开类别并检查特定事件。

    ![image](https://user-images.githubusercontent.com/5757051/47761753-a4370400-dcf4-11e8-9c9f-ad82fbaee310.png)

+   异常断点

    当您想暂停引发捕获或未捕获异常的代码行时，使用异常断点

    设置异常断点：

    1. 点击 Sources 选项卡
    2. 点击暂停，启用后变成蓝色
    3. 如果除了未捕获的异常外，还想暂停捕获的异常，请选中 “Pause on caught exceptions” 复选框

    ![image](https://user-images.githubusercontent.com/5757051/47761798-dd6f7400-dcf4-11e8-905d-5b8107aeba24.png)

+   功能断点

    调用 `debug(functionName)` 来给函数 `functionName` 进行断点调试：

    ```js
    function sum(a, b) {
      let result = a + b; // DevTools pauses on this line.
      return result;
    }
    debug(sum); // Pass the function object, not a string.
    sum();
    ```

+   查看断点处的变量值

    有三处地方可以查看断点处的变量值

    ![image](https://user-images.githubusercontent.com/5757051/47896795-0b49e980-deaa-11e8-8108-76e5a80e5158.png)

+   查看当前有哪些断点

    ![image](https://user-images.githubusercontent.com/5757051/47896847-477d4a00-deaa-11e8-9992-c43b658cdae4.png)

+   清除/恢复所有断点

    从断点处继续运行代码

    ![image](https://user-images.githubusercontent.com/5757051/47896894-7b586f80-deaa-11e8-82d2-531133c3d257.png)

# 网络面板（Network）

网络面板记录页面上每个网络操作的相关信息，包括详细的耗时数据、HTTP 请求与响应标头和 Cookie等等。

+   捕捉屏幕截图

    Network 面板可以在页面加载期间捕捉屏幕截图。此功能称为幻灯片。

    点击 摄影机 图标可以启用幻灯片。图标为灰色时，幻灯片处于停用状态。如果图标为蓝色，则说明已启用。

    重新加载页面可以捕捉屏幕截图。点击各个截图，可以显示在该截图下的网络传输状态。

    ![image](https://user-images.githubusercontent.com/5757051/47762081-0fcda100-dcf6-11e8-9267-8f534995c32e.png)

    双击屏幕截图可查看放大版本。在屏幕截图处于放大状态时。

    ![image](https://user-images.githubusercontent.com/5757051/47762234-c16cd200-dcf6-11e8-8ae6-9764acf0a995.png)

+   查看 DOMContentLoaded 和 load 事件信息

    Network 面板突出显示两种事件：DOMContentLoaded 和 load。

    解析页面的初始标记时会触发 DOMContentLoaded。 页面完全加载时将触发 load。两个事件将在 Network 面板上的 3 个地方显示：

    1. Overview 窗格中的蓝色竖线和红色竖线表示事件。
    2. Requests Table 中的蓝色竖线和红色竖线也表示事件。
    3. 在 Summary 窗格中，您可以看到事件的确切时间。

    ![image](https://user-images.githubusercontent.com/5757051/47762444-b8303500-dcf7-11e8-8cb3-4b3eb69d3612.png)

+   导航时保留网络日志

    默认情况下，每当您重新加载当前页面或者加载不同的页面时，网络活动记录会被丢弃。启用 Preserve log 复选框可以在这些情况下保存网络日志。 新记录将附加到 Requests Table 的底部。

    ![image](https://user-images.githubusercontent.com/5757051/47762521-06ddcf00-dcf8-11e8-9c68-f9e5327d2d80.png)

+   查看网络耗时

    要查看 Network 面板中给定条目完整的耗时信息，您有三种选择。

    +  将鼠标悬停到条目 waterfall 的耗时图表上。这将呈现一个显示完整耗时数据的弹出窗口。
    +  点击任何条目并打开该条目的 Timing 标签。
    +  使用 Resource Timing API 从 JavaScript 检索原始数据。

    ![image](https://user-images.githubusercontent.com/5757051/47763168-87053400-dcfa-11e8-8401-c13d6aaaaa4c.png)

    下面的代码可以在 DevTools 的 Console 中运行。 它将使用 Network Timing API 检索所有资源。 然后，它将通过查找是否存在名称中包含“style.css”的条目对条目进行过滤。 如果找到，将返回相应条目。

    ![image](https://user-images.githubusercontent.com/5757051/47763181-997f6d80-dcfa-11e8-8a6a-3259a20b2769.png)
    
    下面是一个网络请求的各个环节：

    +   Queuing

        排队的时间花费。如果某个请求正在排队，则指示：

        +   请求已被渲染引擎推迟，因为该请求的优先级被视为低于关键资源（例如脚本/样式）的优先级。 图像经常发生这种情况。
        +   请求已被暂停，以等待将要释放的不可用 TCP 套接字。
        +   请求已被暂停，因为在 HTTP 1 上，浏览器仅允许每个源拥有六个 TCP 连接。
        +   生成磁盘缓存条目所用的时间（通常非常迅速）
        +   服务器不可用

    +   Stalled/Blocking

        从HTTP连接建立到请求能够被发出送出去（真正传输数据）之间的时间花费。 可以是等待 Queueing 中介绍的任何一个原因。此外，包含用于处理代理的时间，如果有已经建立好的连接，这个时间还包括等待已建立连接被复用的时间。 

    +   Proxy Negotiation 

        与代理服务器连接的时间花费。

    +   DNS Lookup

        执行 DNS 查询所用的时间。 页面上的每一个新域都需要完整的往返才能执行 DNS 查询。

    +   Initial Connection / Connecting

        建立连接所用的时间，包括 TCP 握手/重试和协商 SSL 的时间。

    +   SSL

        完成 SSL 握手所用的时间。

    +   Request Sent / Sending

        发出网络请求所用的时间。 通常不到一毫秒。

    +   Waiting (TTFB)

        等待初始响应所用的时间，也称为至第一字节的时间。 此时间将捕捉到服务器往返的延迟时间，以及等待服务器传送响应所用的时间。

    +   Content Download / Downloading

        接收响应数据所用的时间。

+   诊断网络问题

    通过 Network 面板可以发现大量可能的问题。查找这些问题需要很好地了解客户端与服务器如何通信，以及协议施加的限制。

    +   排队
    
        最常见问题是一系列已被加入队列或已被停止的条目。这表明正在从单个网域检索太多的资源。在 HTTP 1.0/1.1 连接上，Chrome 会将每个主机强制设置为最多六个 TCP 连接。如果您一次请求十二个条目，前六个将开始，而后六个将被加入队列。最初的一半完成后，队列中的第一个条目将开始其请求流程。

        ![image](https://user-images.githubusercontent.com/5757051/47763506-f4fe2b00-dcfb-11e8-8f03-902759f54c8c.png)

        要为传统的 HTTP 1 流量解决此问题，您需要实现域分片。也就是在您的应用上设置多个子域，以便提供资源。然后，在子域之间平均分配正在提供的资源。

        HTTP 1 连接的修复结果不会应用到 HTTP 2 连接上。事实上，前者的结果会影响后者。 如果您部署了 HTTP 2，请不要对您的资源进行域分片，因为它与 HTTP 2 的操作方式相反。在 HTTP 2 中，到服务器的单个 TCP 连接作为多路复用连接。这消除了 HTTP 1 中的六个连接限制，并且可以通过单个连接同时传输多个资源。

    +   至第一字节的漫长时间（TTFB）

        又称一大片绿色。

        ![image](https://user-images.githubusercontent.com/5757051/47763575-368ed600-dcfc-11e8-8615-88c546ee4d6a.png)

        等待时间长表示至第一字节的时间 (TTFB) 漫长。建议将此值控制在 200 毫秒以下。长 TTFB 会揭示两个主要问题之一。

        （1）客户端与服务器之间的网络条件较差
        （2）服务器应用的响应慢

        要解决长 TTFB，首先请尽可能缩减网络。理想的情况是将应用托管在本地，然后查看 TTFB 是否仍然很长。如果仍然很长，则需要优化应用的响应速度。可以是优化数据库查询、为特定部分的内容实现缓存，或者修改您的网络服务器配置。很多原因都可能导致后端缓慢。您需要调查您的软件并找出未满足您的性能预算的内容。

        如果本地托管后 TTFB 仍然漫长，那么问题出在您的客户端与服务器之间的网络上。很多事情都可以阻止网络遍历。客户端与服务器之间有许多点，每个点都有其自己的连接限制并可能引发问题。测试时间是否缩短的最简单方法是将您的应用置于其他主机上，并查看 TTFB 是否有所改善。

    +   达到吞吐量能力

        ![image](https://user-images.githubusercontent.com/5757051/47763717-c6348480-dcfc-11e8-85fe-a5b6db470648.png)

        如果您看到 Content Download 阶段花费了大量时间，则提高服务器响应或串联不会有任何帮助。首要的解决办法是减少发送的字节数。

        ![image](https://user-images.githubusercontent.com/5757051/47763851-5b377d80-dcfd-11e8-8218-e0f6b30e4b46.png)

    +   模拟网络连接

        利用网络调节，您可以在不同的网络连接（包括 Edge、3G，甚至离线）下测试网站。这样可以限制出现最大的下载和上传吞吐量（数据传输速率）。延迟时间操控会强制连接往返时间 (RTT) 出现最小延迟。

        可以通过 Network 面板开启网络调节。从下拉菜单中选择要应用网络节流和延迟时间操控的连接。

# 性能面板（Performance）

使用 Chrome DevTools 的 Timeline 面板可以记录和分析您的应用在运行时的所有活动。 这里是开始调查应用中可觉察性能问题的最佳位置。

+   面板概览

    Timeline 面板包含以下窗格：
  
    ![image](https://user-images.githubusercontent.com/5757051/47765861-f84ae400-dd06-11e8-906f-3b7a6bb66f1f.png)

    +  Controls。各种基本配置信息，包括：开始记录页面性能数据、重新运行页面并记录性能数据、清空当前性能数据、加载/导出性能数据文件、是否展示页面截图、是否展示内存使用情况。
        上图中，我们勾选了：“展示截图”、“展示内存使用情况”。
   
    +  更多设置细节
   
        移动设备的 CPU 一般比台式机和笔记本弱很多。分析页面时，可以用 CPU 控制器（CPU Throttling）来模拟移动端设备 CPU。

    +  Overview。 页面性能的高级汇总。更多内容请参见下文。
      
        Overview 窗格包含以下几个图表：
   
        ![image](https://user-images.githubusercontent.com/5757051/47765781-98ecd400-dd06-11e8-926c-03b26563c7e3.png)

        +  FPS。每秒帧数。绿色竖线越高，FPS 越高。 FPS 图表上的红色块表示长时间帧，很可能会出现卡顿。观察 FPS 图表，如果你发现了一个红色的长条，那么就说明这些帧存在严重问题，有可能导致非常差的用户体验。一般来说，绿色的长条越高，说明FPS越高，用户体验越好。
         
            ![image](https://user-images.githubusercontent.com/5757051/47766038-c1c19900-dd07-11e8-9c85-1a7685f2b105.png)

        +  CPU。 CPU 资源。此面积图指示消耗 CPU 资源的事件类型。在 CPU 图表中的各种颜色与Summary 面板里的颜色是相互对应的，Summary 面板就在 Performance 面板的下方。
  
            ![image](https://user-images.githubusercontent.com/5757051/47766051-d6059600-dd07-11e8-8d54-4efec48f0cc9.png)

        +  NET。每条彩色横杠表示一种资源。横杠越长，检索资源所需的时间越长。 每个横杠的浅色部分表示等待时间（从请求资源到第一个字节下载完成的时间）。

            深色部分表示传输时间（下载第一个和最后一个字节之间的时间）。

        +  页面截图。把鼠标移动到 FPS，CPU 或者 NET 图表之上，DevToos 就会展示这个时间点界面的截图。左右移动鼠标，可以重发当时的屏幕录像。这被称为 scrubbing, 他可以用来分析动画的各个细节。

        +  Heap。页面内存使用的变化情况。
  
    +   network。页面加载过程中的网络请求时间线。横轴为时间。在这里可以清晰地看到页面加载时各个资源的加载情况。您可以在火焰图上看到一到三条垂直的虚线。蓝线代表 DOMContentLoaded 事件。 绿线代表首次绘制的时间。 红线代表 load 事件。
    +   Frames。FPS 信息。鼠标移到该框最上部的横条上，会显示该帧的 FPS 数据。
   
        ![image](https://user-images.githubusercontent.com/5757051/47766130-211fa900-dd08-11e8-97a2-e6e681522e5c.png)

        小功能：显示实时FPS面板

        另外一个好用的小工具就是实时FPS面板，它可以实时展示页面的FPS指标

        +  按下 Command+Shift+P（Mac）或者 Control+Shift+P(Windows, Linux) 打开命令菜单
        +  输入 Rendering，点选 Show Rendering
        +  在主面板中新增的 Rendering 面板（就是 console 所在的那一排）里，激活 FPS Meter。FPS 实时面板就出现在页面的右上方。

            ![image](https://user-images.githubusercontent.com/5757051/47766201-7a87d800-dd08-11e8-8a00-97fae3294286.png)

    +   火焰图（Main）。 CPU 堆叠追踪的可视化。您可以在火焰图上看到一到三条垂直的虚线。蓝线代表 DOMContentLoaded 事件。 绿线代表首次绘制的时间。 红线代表 load 事件。
  
        展开 Main 图表，Devtools 展示了主线程运行状况。X 轴代表着时间。每个长条代表着一个 event。长条越长就代表这个 event 花费的时间越长。Y 轴代表了调用栈（call stack）。在栈里，上面的 event 调用了下面的 event。

        ![image](https://user-images.githubusercontent.com/5757051/47766268-d18dad00-dd08-11e8-963f-29c390d77c9b.png)

    +   各个资源加载的变化情况。该框第一排有各种勾选项，展示各个资源的数据变化情况。
    +   运行细节。选择事件后，此窗格会显示与该事件有关的更多信息。 未选择事件时，此窗格会显示选定时间范围的相关信息。

        ![image](https://user-images.githubusercontent.com/5757051/47768519-63021c80-dd13-11e8-8e79-eb3c12a9a1f6.png)

        +   颜色表示

            +  HTML 文件为蓝色
            +  脚本为黄色
            +  样式表为紫色
            +  媒体文件为绿色
            +  其他资源为灰色

+   性能瓶颈分析

    测试页面：https://googlechrome.github.io/devtools-samples/jank/

    在性能报告中，有很多的数据。可以通过双击，拖动等等动作来放大缩小报告范围，从各种时间段来观察分析报告。

    在事件长条的右上角出，如果出现了红色小三角，说明这个事件是存在问题的，需要特别注意。
    
    点击这个带有红色小三角的的事件。在 Summary 面板会看到详细信息。注意 reveal 这个链接，双击它会让高亮触发这个事件的 event。如果点击了 app.js:94 这个链接，就会跳转到对应的代码处。

    +   JavaScript 运行效率
    +   样式计算

        重点关注涉及样式的 Recalculate Style 等事件，排查原因

    +   重排
    +   重绘
    +   合成

# 内存面板（Memory）

该面板主要能做：

+   使用 Chrome 的任务管理器了解您的页面当前正在使用的内存量。
+   使用 Timeline 记录可视化一段时间内的内存使用。
+   使用堆快照确定已分离的 DOM 树（内存泄漏的常见原因）。
+   使用分配时间线记录了解新内存在 JS 堆中的分配时间。

# 应用面板（Application）

该面板主要能做：

+   查看和修改本地存储与会话存储。
+   检查和修改 IndexedDB 数据库。
+   对 Web SQL 数据库执行语句。
+   查看应用缓存和服务工作线程缓存。
+   点击一次按钮即可清除所有存储、数据库、缓存和服务工作线程。

# 安全面板（Security）

该面板主要能做：

+   使用 Security Overview 可以立即查看当前页面是否安全。
+   检查各个源以查看连接和证书详情（安全源）或找出具体哪些请求未受保护（非安全源）。

使用左侧面板可以检查各个安全或非安全源。

点击安全源查看该源的连接和证书详情。

![image](https://user-images.githubusercontent.com/5757051/47764698-4bba3380-dd01-11e8-9648-db99f6364a93.png)

如果您点击非安全源，Security 面板会提供 Network 面板过滤视图的链接。

![image](https://user-images.githubusercontent.com/5757051/47764707-570d5f00-dd01-11e8-8e68-a97d9bd74e2d.png)

点击链接可以查看具体是源的哪些请求通过 HTTP 提供。

![image](https://user-images.githubusercontent.com/5757051/47764742-7e642c00-dd01-11e8-9b68-953babce7bca.png)

# 主菜单（Customize and control DevTools）

+   模拟传感器：地理定位与加速度计

    由于大多数桌面设备都没有 GPS 芯片和加速度计，所以测试它们比较困难。Chrome DevTools 的 Sensors 模拟窗格可以通过模拟常见的移动设备传感器来降低测试的开销。

    +   模拟地理定位坐标以测试地理定位替换值。
    +   模拟设备方向以测试加速度计数据。

    要访问 Chrome DevTools 传感器控件，请执行以下操作：

    +   打开 DevTools 主菜单
    +   在 More Tools 菜单下，点击 Sensors

+  替换地理定位数据

    与桌面设备不同，移动设备通常使用 GPS 硬件检测位置。在 Sensors 窗格中，您可以模拟地理定位坐标，以便与 Geolocation API 结合使用。

    在模拟抽屉式导航栏的 Sensors 窗格中选中 Emulate geolocation coordinates 复选框，启用地理定位模拟。

    ![image](https://user-images.githubusercontent.com/5757051/47764918-853f6e80-dd02-11e8-8e5b-88f7f00bb226.png)

    您可以使用此模拟器替换 navigator.geolocation 的位置值，并在地理定位数据不可用时模拟用例。

+  模拟加速度计（设备方向）

    要测试来自 Orientation API 的加速度计数据，请在 Sensors 窗格中选中 Accelerometer 复选框，启用加速度计模拟器。

    ![image](https://user-images.githubusercontent.com/5757051/47764822-e0249600-dd01-11e8-8088-ecc4ce0ef443.png)

    您可以操作下列方向参数：

    +   α：围绕 Z 轴旋转。
    +   β：左右倾斜。
    +   γ：前后倾斜。

    您也可以点击模型加速度计并将其拖动到所需方向。

# 其他看板之 Coverage

![image](https://user-images.githubusercontent.com/5757051/47767580-3fd56e00-dd0f-11e8-940f-2672a6ef3bc8.png)

打开 coverage 看板，点击 reload 图标，就可以看到该页面各个资源（js/css 等）的代码执行率。

![image](https://user-images.githubusercontent.com/5757051/47767741-f1749f00-dd0f-11e8-9774-4e6452b97b95.png)

![image](https://user-images.githubusercontent.com/5757051/47767777-254fc480-dd10-11e8-8495-5e5c0203c9ff.png)

#  参考资料
+   chrome 开发者工具
    +   https://developers.google.com/web/tools/chrome-devtools/
    +   [前端开发必备之Chrome开发者工具（上篇）](https://www.cnblogs.com/laixiangran/p/8777579.html)
    +   [前端开发必备之Chrome开发者工具（下篇）](https://www.cnblogs.com/laixiangran/p/8834462.html)
    +   [全新Chrome Devtool Performance使用指南](https://zhuanlan.zhihu.com/p/29879682)
    +   [chrome network](http://web.jobbole.com/89106/)
    +   [使用 chrome 开发者工具中的 performance 面板解决性能瓶颈](https://www.cnblogs.com/xiaohuochai/p/9182710.html)
+  页面性能优化
    +   [浏览器渲染性能 - 每帧都做了什么](https://developers.google.com/web/fundamentals/performance/rendering/?hl=zh-cn)
    +   [缩小样式计算的范围并降低其复杂性](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations?hl=zh-cn)
    +   [BEM思想之彻底弄清BEM语法](https://www.w3cplus.com/css/mindbemding-getting-your-head-round-bem-syntax.html)
    +   [优化 JavaScript 执行](https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution?hl=zh-cn)
    +   [避免大型、复杂的布局和布局抖动](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing?hl=zh-cn)
    +   [合成层管理](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count?hl=zh-cn)
    +   [chrome 页面内存管理](https://developers.google.com/web/tools/chrome-devtools/memory-problems/?hl=zh-cn)


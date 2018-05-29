[issue](https://github.com/hoperyy/blog/issues/9)

# 背景

本文基于《jquery技术内幕：深入解析jquery架构设计与实现原理》整理而成。标题最右侧的数字代表在书中的页码。

# 第一部分　总体架构

## 第1章　总体架构 2

+   1.1　设计理念 2
    +   `write less, do more`
    +   核心特性
        +   兼容主流浏览器，并且支持`IE6.0`
        +   独特的链式语法
        +   短小清晰的多功能接口
        +   高效灵活的CSS选择器，并且可对CSS选择器扩展
        +   便捷的插件扩展机制和丰富的插件

+   1.2　总体架构 2
    
    `jQuery`模块分为三个部分：入口模块、底层支持模块、功能模块。

    各个模块的功能在后面的章节中会一一讲到。

    整体的代码结构如下：
        
        (function(window, undefined) {
            // 构造 jQuery 对象
            var jQuery = (function() {
                var jQuery = function(selector, context) {
                    return new jQuery.fn.init(selector, context, rootjQuery);
                };
        
                return jQuery;
            })();
        
            // 工具方法 Utilities
            // 回调函数列表 Callbacks Object
            // 异步队列 Defferred Object
            // 浏览器功能测试 Support
            // 数据缓存 Data
            // 队列 Queue
            // 属性操作 Attributes
            // 事件系统 Events
            // 选择器 Sizzle
            // DOM遍历 Traversing
            // 样式操作 CSS（计算样式、内联样式）
            // 异步请求 Ajax
            // 动画 Effects
            // 坐标 Offset、尺寸 Dimensions
        
            window.jQuery = window.$ = jQuery;
        })(window);

+   1.3　自调用匿名函数 4

        (function(window, undefined) {
            // 构造 jQuery 对象
            var jQuery = ..
        
            // ...
        
            window.jQuery = window.$ = jQuery;
        })(window);

    +   为什么用上面这个自调用匿名函数？
        +   不会受已有变量名称干扰
        +   不会干扰其他代码
    
    +   为什么要为自调用匿名函数设置 `window` 对象，并传入 `window` 对象？
        +   缩短查找作用域链，可以更快地访问 `window` 对象
        +   将`window`作为参数传入，可以在压缩时进行优化
        
            在压缩文件 `jQuery-1.7.1.min.js` 中可以看到下面的代码：
        
                (function(a, b){ ... })(window);
    
    +   为什么要为自调用匿名函数传入参数 `undefined`？
    
        `undefined` 是 `window` 的一个属性：`'undefined' in window // true`
        
        +   缩短查找作用域链
        +   因为 `undefined` 在某些浏览器下可以被重写。这样写就可以确保 `undefined` 值还是 `undefined`
    
    +   自调用匿名函数前面后面最好都有分号
        最好不要省略，如果省略，则：自调用匿名函数的第一对括号会被当做是函数调用
        
            var n = 1
            ( function(){} )()
            // TypeError: number is not a function

+   1.4　总结 6

# 第二部分　构造jquery对象

## 第2章　构造jquery对象 8

+   `jQuery` 对象是一个类数组对象，含有
    
    +   连续的整形属性
    
    +   `length` 属性
    
    +   大量的 `jQuery` 方法

+   2.1　构造函数`jquery()` 8

    `jQuery` 很有意思的一点是，它的方法定义很强大，会根据不同的参数情况执行不同的功能。

    +   2.1.1　`jquery( selector [, context] )` 9

        +   用法
        
            +   如果传入一个字符串参数， `jQuery` 会检查这个字符串是选择器还是 `HTML` 代码
            +   如果是选择器，则遍历文档
                +   如果有匹配的元素，返回匹配的封装了匹配的 `DOM` 元素的 `jQuery` 对象
                +   如果没有匹配的元素，则返回一个空的 `jQuery` 对象

    +   2.1.2　`jquery( html [, ownerdocument] )、jquery( html, props )` 9
        
        +   用法
            +   如果传入的参数看起来像一段 `HTML` 代码，那么`jQuery`会尝试创建新的`DOM`元素，并创建一个封装了此`DOM`元素的`jQuery`对象
            +   第二个参数 `ownerDocument` 用于指定创建新`DOM`对象的文档对象，如果不传入，则默认为当前文档对象
            +   如果`HTML`代码是单独一个标签，那么第二个参数还可以是`props`，是一个包含了属性、事件的普通对象，设置新创建元素的属性、事件

    +   2.1.3　`jquery( element )、jquery( elementarray )` 10
        +   用法
            
            传入一个`DOM`对象或`DOM`数组，然后封装这些`DOM`为`jQuery`对象

    +   2.1.4　`jquery( object )` 10 
        +   用法
        
            +   传入一个普通`JavaScript`对象，把该对象封装到`jQuery`对象并返回
            +   可以方便的实现自定义事件的绑定和触发

    +   2.1.5　`jquery( callback )` 11
        +   用法
        
            `DOM ready`事件的回调函数

    +   2.1.6　`jquery( jquery object )` 11
        +   用法
    
            传入一个`jQuery`对象，则返回该对象的一个副本，这个副本与原`jQuery`对象引用相同的`DOM`元素

    +   2.1.7　`jquery()` 11

        +   用法
        
            +   不传入任何一个参数，则返回一个空的 `jQuery` 对象
            +   可以用来复用 `jQuery` 对象，例如，创建一个空的`jQuery`对象，然后在需要的时候手动修改其中的元素，再调用`jQuery`方法，从而避免重复创建`jQuery`对象

+   2.2　总体结构 11

        (function(window, undefined) {
            // 构造 jQuery 对象
            var jQuery = (function() {
                var jQuery = function(selector, context) {
                    return new jQuery.fn.init(selector, context, rootjQuery);
                };
        
                // 一堆局部变量声明
                // ...
                
                jQuery.fn = jQuery.prototype = {
                    constructor: jQuery,
                    init: function(selector, context, rootjQuery) {
        
                    }
        
                    // 一堆原型属性和方法
                };
        
                jQuery.fn.init.prototype = jQuery.fn;
        
                jQuery.extend = jQuery.fn.extend = function() {};
        
                jQuery.extend({
                    // 一堆静态属性和方法
                });
        
                return jQuery;
            })();
        
            // 工具方法 Utilities
            // 回调函数列表 Callbacks Object
            // 异步队列 Defferred Object
            // 浏览器功能测试 Support
            // 数据缓存 Data
            // 队列 Queue
            // 属性操作 Attributes
            // 事件系统 Events
            // 选择器 Sizzle
            // DOM遍历 Traversing
            // 样式操作 CSS（计算样式、内联样式）
            // 异步请求 Ajax
            // 动画 Effects
            // 坐标 Offset、尺寸 Dimensions
        
            window.jQuery = window.$ = jQuery;
        })(window);

    以上内容，有几个要点：

    +   `jQuery` 的定义部分，为什么要用自调用匿名函数包裹？

        减少与其他模块的耦合，体现高内聚低耦合的思想
    
    +   `jQuery`、`jQuery.fn.init` 这两个方法的 `prototype` 都指向了 `jQuery.prototype`
    
        好处是实例也可以访问构造函数 `jQuery()` 的原型属性和方法。
    +   为什么要在构造函数 `jQuery()` 内部用运算符 `new` 创建并返回另一个构造函数的实例？

        创建一个实例的方式是 `new` 后面跟一个构造函数，如果构造函数有返回值，运算符 `new` 所创建的对象会被丢弃，返回值将作为 `new` 表达式的值

        `jQuery`利用了这一特性，省去了构造函数`jQuery()`之前的运算符`new`

        为了书写方便，为构造函数定义了别名`$`

+   2.3　`jquery.fn.init( selector, context, rootjquery )` 13（未完成）

    构造函数 `jquery.fn.init()` 负责解析参数 `selector` 和 `context` 的类型，并执行相应的逻辑，返回`jquery.fn.init()` 的实例。它有12个有效分支

    +   .2.3.1　12个分支 13（未完成）

    +   2.3.2　源码分析 14（未完成）

    +   2.3.3　小结 21（未完成）

+   2.4　jquery.buildfragment( args, nodes, scripts ) 22（未完成）

    +   2.4.1　实现原理 22

    +   2.4.2　源码分析 22

    +   2.4.3　小结 26

+   2.5　jquery.clean( elems, context, fragment, scripts ) 27（未完成）

    +   2.5.1　实现原理 27

    +   2.5.2　源码分析 27

    +   2.5.3　小结 39

+   2.6　jquery.extend()、jquery.fn.extend() 40（未完成，已复制原代码）

    +   2.6.1　如何使用 40

        +   语法

            `jQuery.extend([deep],target,object1[,objectN])`
        
            `jQuery.fn.extend([deep],target,object1[,objectN])`
    
        +   参数

            +   `deep`
            
                是可选的布尔值，表示是否进行深度合并（即递归合并），默认是不递归的，即后面参数的属性的会覆盖第一个参数的同名属性。如果是`true`，表示进行深度合并，合并过程是递归的。
        
            +   `target`
                
                目标对象

            +   `objectN`

                源对象，所有源对象的属性都会合并到目标对象

            +   如果只有一个参数

                那么参数`target`将被忽略，`jQuery`或`jQuery.fn`被当做目标对象，用这种方式可以在`jQuery`或`jQuery.fn`上添加新的属性和方法

    +   2.6.2　源码分析 40

+   2.7　原型属性和方法 43

    以下属性和方法均在下方代码块中定义

        jQuery.fn = jQuery.prototype = {
            原型属性和方法
        }

    +   2.7.1　`.selector、.jquery、.length、.size()` 44
        +   源码
        
                selector: '',

                // 版本号
                jquery: '1.7.1',
    
                // jQuery 对象中元素的个数，初始化为 0
                length: 0,
    
                // 同 length，不建议使用
                size: function() {
                    return this.length;
                },

            
        +   `selector`
            +   介绍
            
                当前`jQuery`对象的选择器，主要用来调试，与实际选择器不一定匹配
            
            +   源码
    
                    
        +   `jquery`： 当前`jQuery`的版本号
        +   `length`：jQuery 对象中元素的个数，初始化为 0
        +   `size`：同 length，不建议使用，因为有函数调用开销

    +   2.7.2　`.toarray()、.get( [index] )` 45
        +   源码
            
                slice = Array.prototype.slice

                toArray: function() {
                    return slice.call(this, 0);
                }

        +   借鸡下蛋

            利用`Array.prototype.slice`方法将`jQuery`对象转为数组

        

    +   2.7.3　.each( function(index, element) )、jquery.each( collection, callback (indexinarray, valueofelement) ) 46

    +   2.7.4　.map( callback(index, domelement) )、jquery.map( arrayorobject, callback(value, indexorkey) ) 47

    +   2.7.5　.pushstack( elements, name, arguments ) 49

    +   2.7.6　.end() 51

    +   2.7.7　.eq( index )、.first()、.last()、.slice( start [, end] ) 51

    +   2.7.8　.push( value, ... )、.sort( [orderfunc] )、.splice( start,deletecount, value, ... ) 52

    +   2.7.9　小结 53

+   2.8　静态属性和方法 54

    +   2.8.1　jquery.noconflict( [removeall] ) 55

    +   2.8.2　类型检测：jquery.isfunction( obj )、jquery.isarray( obj )、jquery.iswindow( obj )、jquery.isnumeric( value )、jquery.type( obj )、jquery.isplainobject( object )、jquery.isemptyobject( object ) 56

    +   2.8.3　解析json和xml：jquery.parsejson( data )、jquery.parsexml( data ) 60

    +   2.8.4　jquery.globaleval( code ) 65

    +   2.8.5　jquery.camelcase( string ) 65

    +   2.8.6　jquery.nodename( elem, name ) 66

    +   2.8.7　jquery.trim( str ) 67

    +   2.8.8　数组操作方法：jquery.makearray( obj )、jquery.inarray( value, array [, fromindex] )、jquery.merge( first, second )、jquery.grep( array, function(elementofarray, indexinarray) [, invert] ) 68

    +   2.8.9　jquery.guid、jquery.proxy( function, context ) 72

    +   2.8.10　jquery.access( elems, key, value, exec, fn( elem, key, value ), pass ) 74

    +   2.8.11　jquery.error( message )、jquery.noop()、jquery.now() 75

    +   2.8.12　浏览器嗅探：jquery.uamatch( ua )、jquery.browser 76

    +   2.8.13　小结 77

+   2.9　总结 77

# 第三部分　底层支持模块

## 第3章　选择器sizzle 80

+   3.1　总体结构 81

+   3.2　选择器表达式 83

+   3.3　设计思路 84

+   3.4　sizzle( selector, context, results, seed ) 86

+   3.5　正则chunker 94

+   3.6　sizzle.find( expr, context, isxml ) 94

+   3.7　sizzle.filter( expr, set, inplace, not ) 99

+   3.8　sizzle.selectors.relative 103

    +   3.8.1　"+" 105

    +   3.8.2　"]" 106

    +   3.8.3　"" 108

    +   3.8.4　"~" 108

    +   3.8.5　dircheck( dir, cur, donename, checkset, nodecheck, isxml ) 109

    +   3.8.6　dirnodecheck( dir, cur, donename, checkset, nodecheck, isxml ) 111

+   3.9　sizzle.selectors 112

    +   3.9.1　sizzle.selectors.order 112

    +   3.9.2　sizzle.selectors.match/leftmatch 113

    +   3.9.3　sizzle.selectors.find 122

    +   3.9.4　sizzle.selectors.prefilter 123

    +   3.9.5　sizzle.selectors.filters 129

    +   3.9.6　sizzle.selectors.setfilters 132

    +   3.9.7　sizzle.selectors.filter 133

+   3.10　工具方法 140

    +   3.10.1　sizzle.uniquesort( results ) 140

    +   3.10.2　sortorder( a, b ) 141

    +   3.10.3　sizzle.contains( a, b ) 144

    +   3.10.4　sizzle.error( msg ) 145

    +   3.10.5　sizzle.gettext( elem ) 145

+   3.11　便捷方法 146

    +   3.11.1　sizzle.matches( expr, set ) 146

    +   3.11.2　sizzle.matchesselector( node, expr ) 146

+   3.12　jquery扩展 147

    +   3.12.1　暴露sizzle给jquery 147

    +   3.12.2　.find( selector ) 148

    +   3.12.3　.has( target ) 149

    +   3.12.4　.not( selector )、.filter( selector ) 150

    +   3.12.5　.is( selector ) 152

    +   3.12.6　.closest( selectors, context ) 153

    +   3.12.7　.index( elem ) 154

    +   3.12.8　.add( selector, context ) 155

    +   3.12.9　jquery.filter( expr, elems, not ) 156

    +   3.12.10　:animated 157

    +   3.12.11　hidden、:visible 157

+   3.13　总结 158

## 第4章　异步队列deferred object 160

+   4.1　jquery.callbacks( flags ) 161

    +   4.1.1　实现原理和总体结构 162

    +   4.1.2　源码分析 163

    +   4.1.3　小结 174

+   4.2　jquery.deferred( func ) 174

    +   4.2.1　实现原理和总体结构 176

    +   4.2.2　源码分析 177

    +   4.2.3　小结 183

+   4.3　jquery.when( deferreds ) 184

    +   4.3.1　实现原理 185

    +   4.3.2　源码分析 185

+   4.4　异步队列在jquery中的应用 187

+   4.5　总结 188

##第5章　数据缓存data 189

+   5.1　实现原理 189

    +   5.1.1　为dom元素附加数据 189

    +   5.1.2　为javascript对象附加数据 191

+   5.2　总体结构 192

+   5.3　jquery.acceptdata( elem ) 193

+   5.4　jquery.data( elem, name, data, pvt )、jquery._data( elem, name, data, pvt ) 194

    +   5.4.1　如何使用 194

    +   5.4.2　源码分析 194

    +   5.4.3　jquery._data( elem, name, data ) 199

    +   5.4.4　小结 201

+   5.5　.data( key,value ) 201

    +   5.5.1　如何使用 201

    +   5.5.2　源码分析 202

    +   5.5.3　小结 206

+   5.6　jquery.removedata( elem,name,pvt )、.removedata( key ) 207

    +   5.6.1　如何使用 207

    +   5.6.2　源码分析 207

    +   5.6.3　小结 212

+   5.7　.removedata( key ) 213

+   5.8　jquery.cleandata( elems ) 213

    +   5.8.1　应用场景 213

    +   5.8.2　源码分析 214

    +   5.8.3　小结 217

+   5.9　jquery.hasdata( elem ) 217

+   5.10　总结 218

## 第6章　队列queue 219

+   6.1　如何使用 219

    +   6.1.1　ajax队列 220

    +   6.1.2　动画队列+ ajax队列 220

    +   6.1.3　基于javascript对象 221

+   6.2　实现原理 221

+   6.3　总体结构 222

+   6.4　jquery.queue( elem,type,data ) 223

+   6.5　jquery.dequeue( elem,type ) 224

+   6.6　.queue( type,data ) 227

+   6.7　.dequeue( type ) 228

+   6.8　.delay( time,type ) 229

+   6.9　.clearqueue( type ) 230

+   6.10　jquery._mark( elem,type )、jquery._unmark( force,elem,type ) 230

+   6.11　.promise( type,object ) 232

    +   6.11.1　如何使用 232

    +   6.11.2　实现原理 233

    +   6.11.3　源码分析 233

    +   6.11.4　handlequeuemarkdefer( elem,type,src ) 235

+   6.12　总结 237

##第7章　浏览器功能测试support 238

+   7.1　总体结构 238

+   7.2　dom测试（15项） 241

    +   7.2.1　leadingwhitespace 241

    +   7.2.2　tbody 242

    +   7.2.3　htmlserialize 243

    +   7.2.4　hrefnormalized 245

    +   7.2.5　checkon 246

    +   7.2.6　noclonechecked 248

    +   7.2.7　optselected 250

    +   7.2.8　optdisabled 251

    +   7.2.9　getsetattribute 253

    +   7.2.10　deleteexpando 256

    +   7.2.11　enctype 258

    +   7.2.12　html5clone 259

    +   7.2.13　radiovalue 261

    +   7.2.14　checkclone 263

    +   7.2.15　appendchecked 264

+   7.3　样式测试（3项） 266

    +   7.3.1　style 266

    +   7.3.2　opacity 268

    +   7.3.3　cssfloat 272

+   7.4　盒模型测试（10项） 273

    +   7.4.1　reliablemarginright 273

    +   7.4.2　reliablehiddenoffsets 276

    +   7.4.3　boxmodel 278

    +   7.4.4　inlineblockneedslayout 280

    +   7.4.5　shrinkwrapblocks 282

    +   7.4.6　doesnotaddborder、doesaddborderfortableandcells 285

    +   7.4.7　fixedposition 287

    +   7.4.8　subtractsborderforoverflownotvisible 290

    +   7.4.9　doesnotincludemargininbodyoffset 292

+   7.5　事件测试（4项） 294

    +   7.5.1　nocloneevent 294

    +   7.5.2　submitbubbles、changebubbles、focusinbubbles 296

+   7.6　ajax测试（2项） 298

    +   7.6.1　ajax 298

    +   7.6.2　cors 300

+   7.7　总结 301

# 第四部分　功能模块

## 第8章　属性操作attributes 306

+   8.1　总体结构 307

+   8.2　jquery.attr( elem, name, value, pass ) 308

    +   8.2.1　源码分析 308

    +   8.2.2　boolhook 311

    +   8.2.3　nodehook 313

    +   8.2.4　jquery.attrhooks 314

    +   8.2.5　小结 319

+   8.3　.attr( name, value ) 319

+   8.4　jquery.removeattr( elem, value ) 321

    +   8.4.1　源码分析 321

    +   8.4.2　小结 322

+   8.5　.removeattr( name ) 323

+   8.6　jquery.prop( elem, name, value ) 323

    +   8.6.1　源码分析 323

    +   8.6.2　jquery.prophooks 325

    +   8.6.3　小结 326

+   8.7　.prop( name, value ) 327

+   8.8　.removeprop( name ) 327

+   8.9　.addclass( classname ) 328

    +   8.9.1　源码分析 328

    +   8.9.2　小结 330

+   8.10　.removeclass( [classname] ) 330

    +   8.10.1　源码分析 331

    +   8.10.2　小结 333

+   8.11　.toggleclass( [classname][, switch] ) 333

    +   8.11.1　源码分析 334

    +   8.11.2　小结 336

+   8.12　.hasclass( selector ) 336

    +   8.12.1　源码分析 336

    +   8.12.2　小结 337

+   8.13　.val( [value] ) 338

    +   8.13.1　源码分析 338

    +   8.13.2　jquery.valhooks 340

    +   8.13.3　小结 343

+   8.14　总结 344

## 第9章　事件系统events 346

+   9.1　总体结构 346

+   9.2　实现原理 350

+   9.3　jquery 事件对象 353

    +   9.3.1　构造函数jquery.event( src, props ) 355

    +   9.3.2　原型对象jquery.event.prototype 357

    +   9.3.3　事件属性修正方法jquery.event.fix( event ) 360

+   9.4　绑定事件 367

    +   9.4.1　.on( events [, selector] [, data] , handler( eventobject ) ) 367

    +   9.4.2　jquery.event.add( elem, types, handler, data, selector ) 370

+   9.5　移除事件 379

    +   9.5.1　.off( events [, selector] [, handler( eventobject ) ] ) 379

    +   9.5.2　jquery.event.remove( elem, types, handler, selector, mappedtypes ) 382

+   9.6　事件响应 388

    +   9.6.1　主监听函数 388

    +   9.6.2　jquery.event.dispatch( event ) 390

+   9.7　手动触发事件 396

    +   9.7.1　.trigger( eventtype [, extraparameters] )、.triggerhandler( eventtype [, extraparameters] ) 396

    +   9.7.2　jquery.event.trigger( event, data, elem, onlyhandlers ) 397

+   9.8　事件修正和模拟jquery.event.special 406

    +   9.8.1　ready 408

    +   9.8.2　load 408

    +   9.8.3　focus、blur 409

    +   9.8.4　beforeunload 409

    +   9.8.5　mouseenter、mouseleave 410

    +   9.8.6　submit 412

    +   9.8.7　change 413

    +   9.8.8　focusin、focusout 416

    +   9.8.9　jquery.event.simulate( type, elem, event, bubble ) 417

+   9.9　事件便捷方法 418

+   9.10　组合方法 419

    +   9.10.1　.toggle( handler( eventobject ), handler( eventobject ) [, handler( eventobject )] ) 419

    +   9.10.2　.hover( handlerin( eventobject ) [, handlerout( eventobject )] ) 421

+   9.11　ready 事件 421

    +   9.11.1　总体结构 421

    +   9.11.2　.ready( handler ) 424

    +   9.11.3　jquery.bindready() 424

    +   9.11.4　jquery.holdready( hold ) 427

    +   9.11.5　jquery.ready( wait ) 428

+   9.12　总结 430

##第10章　dom遍历traversing 433

+   10.1　总体结构 434

+   10.2　遍历函数 435

+   10.3　工具函数 437

    +   10.3.1　jquery.dir( elem, dir, until ) 437

    +   10.3.2　jquery.nth( cur, result, dir, elem ) 439

    +   10.3.3　jquery.sibling( n, elem ) 440

+   10.4　模板函数 441

+   10.5　总结 443

##第11章　dom操作manipulation 444

+   11.1　总体结构 444

+   11.2　插入元素 445

    +   11.2.1　核心方法.dommanip( args, table, callback ) 445

    +   11.2.2　.append( content [, content] ) 451

    +   11.2.3　.prepend( content [, content] ) 452

    +   11.2.4　.before( content [, content] ) 452

    +   11.2.5　.after( content [, content] ) 452

    +   11.2.6　.appendto( target )、.prependto( target )、.insertbefore( target )、.insertafter( target ) 453

    +   11.2.7　.html( [value] ) 454

    +   11.2.8　.text( [text] ) 458

+   11.3　删除元素 459

    +   11.3.1　.remove( selector, keepdata ) 459

    +   11.3.2　.empty() 460

    +   11.3.3　.detach( selector ) 460

+   11.4　复制元素 461

    +   11.4.1　.clone( dataandevents, deepdataandevents ) 461

    +   11.4.2　jquery.clone( elem, dataandevents, deepdataandevents ) 461

    +   11.4.3　clonefixattributes( src, dest ) 465

+   11.5　替换元素 467

    +   11.5.1　.replacewith( value ) 467

    +   11.5.2　.replaceall( target ) 469

+   11.6　包裹元素 469

    +   11.6.1　.wrapall( html ) 469

    +   11.6.2　.wrapinner( html ) 470

    +   11.6.3　.wrap( html ) 471

    +   11.6.4　.unwrap() 471

+   11.7　总结 472

## 第12章　样式操作css 474

+   12.1　内联样式、计算样式 475

    +   12.1.1　总体结构 475

    +   12.1.2　.css( name, value ) 476

    +   12.1.3　jquery.style( elem, name, value, extra ) 477

    +   12.1.4　jquery.css( elem, name, extra ) 481

    +   12.1.5　curcss( elem, name )、getcomputedstyle( elem, name )、currentstyle( elem, name ) 483

    +   12.1.6　jquery.csshooks 486

+   12.2　坐标offset 492

    +   12.2.1　总体结构 492

    +   12.2.2　.offset( options ) 493

    +   12.2.3　jquery.offset.setoffset( elem, options, i ) 498

    +   12.2.4　jquery.offset.bodyoffset( body ) 500

    +   12.2.5　.position() 501

    +   12.2.6　.offsetparent() 502

    +   12.2.7　.scrollleft( val )、.scrolltop( val ) 503

+   12.3　尺寸dimensions 504

    +   12.3.1　总体结构 504

    +   12.3.2　getwh( elem, name, extra ) 505

    +   12.3.3　.innerheight()、.innerwidth() 508

    +   12.3.4　.outerheight( margin )、.outerwidth( margin ) 509

    +   12.3.5　.height( size )、.width( size ) 509

    +   12.3.6　小结 513

+   12.4　总结 513

## 第13章　异步请求ajax 516

+   13.1　总体结构 517

+   13.2　jquery.ajax( url, options ) 519

+   13.3　前置过滤器、请求发送器的初始化和执行 540

    +   13.3.1　初始化 540

    +   13.3.2　执行 543

    +   13.4　前置过滤器 545

    +   13.4.1　json、jsonp 545

    +   13.4.2　script 548

    +   13.4.3　小结 549

+   13.5　请求发送器 549

    +   13.5.1　script 549

    +   13.5.2　xmlhttprequest 552

    +   13.5.3　小结 560

+   13.6　数据转换器 561

    +   13.6.1　初始化 561

    +   13.6.2　执行 562

    +   13.6.3　小结 566

+   13.7　ajax事件 567

+   13.8　便捷方法 568

    +   13.8.1　jquery.get( url, data, callback, type )、jquery.post( url, data, callback, type ) 569

    +   13.8.2　jquery.getjson( url, data, callback )、jquery.getscript( url, callback ) 569

    +   13.8.3　.load( url, params, callback ) 570

+   13.9　工具方法 573

    +   13.9.1　.serialize() 573

    +   13.9.2　jquery.param( a, traditional ) 574

    +   13.9.3　.serializearray() 577

+   13.10　总结 579

## 第14章　动画effects 582

+   14.1　总体结构 583

+   14.2　动画入口 586

    +   14.2.1　.animate( prop, speed, easing, callback ) 586

    +   14.2.2　jquery.speed( speed, easing, fn ) 588

    +   14.2.3　doanimation() 590

    +   14.2.4　jquery.fx( elem, options, prop ) 595

    +   14.2.5　jquery.fx.prototype.show() 595

    +   14.2.6　jquery.fx.prototype.hide() 596

    +   14.2.7　小结 596

+   14.3　动画执行 597

    +   14.3.1　jquery.fx.prototype.custom( from, to, unit ) 598

    +   14.3.2　jquery.fx.tick() 599

    +   14.3.3　jquery.fx.prototype.step( gotoend ) 600

    +   14.3.4　jquery.easing 604

    +   14.3.5　jquery.fx.prototype.update() 604

    +   14.3.6　jquery.fx.step 605

+   14.4　停止动画.stop( type, clearqueue, gotoend ) 606

+   14.5　便捷方法 609

    +   14.5.1　生成动画样式集genfx( type, num ) 609

    +   14.5.2　显示隐藏.show/hide/toggle() 610

    +   14.5.3　渐显渐隐.fadein/fadeout/fadeto/fadetoggle() 613

    +   14.5.4　滑入滑出.slidedown/slidup/slidetoggle() 614

+   14.6　总结 615
[issue](https://github.com/hoperyy/blog/issues/21)

react 中有一个很值得注意的现象，当兄弟组件发生变化而自身组件没有发生变化时，react 仍然会执行 新旧虚拟 DOM 的 `render` 和 `diff`，这明显存在资源浪费。

## 查看性能细节 —— Perf

Perf 是 react 官方提供的性能分析工具，可以对我们的应用进行整体性能分析，并提供性能数据。

下面是它的 API：

+	`Perf.start()` 开始测量
+	`Perf.stop()` 停止测量
+	`Perf.getLastMeasurements()` 停止测量后调用，用来获取 `measurements`

打印性能数据：

+	`Perf.printInclusive(measurements)` 打印所花费的整体时间
+	`Perf.printExclusive(measurements)` 打印出处理 `props`、`getInitialState`、调用 `componentWillMount` 和 `componentDidMount` 等的时间，这里不包含 `mount` 组件的时间。
+	`Perf.printWasted(measurements)` 打印出测量时段内所浪费的时间。

	这部分信息是分析数据中最有用的部分。我们可以通过这个数据找出时间被浪费在哪儿。浪费一般出现在组件没有渲染任何东西的时候，如上文中提到的，组件在 `render` 出新的虚拟 DOM 和旧的虚拟 DOM 比对后，发现不需要更新组件。最理想的情况这个的返回值是一个空数组。

+	`Perf.printOperations(measurements)` 打印出分析时段内发生的底层 DOM 事件。

## 如何使用 Perf

+	获取
	+	方法1：npm

		```
		import Perf from 'react-addons-perf'; // ES6
		var Perf = require('react-addons-perf'); // ES5
		```

	+	方法2：脚本直接引入

		引入 react 带插件的版本 `react-with-addons.js`。推荐使用较新版本（15.3.2 及以上）

		非生产环境是不能使用 Perf 的。

+	调用

	+	方法1：直接在浏览器里调用

		+	在浏览器控制台输入：`React.addons.Perf.start()`
		+	执行某个动作，如滚动屏幕加载列表
		+	在浏览器控制台输入：

			```
			React.addons.Perf.stop();
			var measurements = React.addons.Perf.getLastMeasurements();
			React.addons.Perf.printWasted(measurements);
			```

	+	方法2：添加到组件代码中

		比如，可以加在 `componentDidUpdate` 方法中调用，这样可以在组件每次发生更新时打印出各个性能数据。

	+	方法3：插件

		首先安装 Perf 的 chrome 插件。

		安装完成后重启浏览器，控制台里会多出一个 Perf tab，切换到该 tab 后，可以看到有个 start 按钮。

		点击 start 按钮，执行某个操作，然后点击 stop 按钮，就可以看到数据了。

		注意：为了能使用这个插件，除了安装 Perf 插件外，还需要把 Perf 挂载到 window 对象上，

		```
		window.Perf = Perf;
		```

## 数据指标分析

通过上文描述的：

+	`Perf.printInclusive(measurements)`
+	`Perf.printExclusive(measurements)` 
+	`Perf.printWasted(measurements)` 

可以打印出优化前后的表格，对比即可

## 性能优化方案

+	拆分组件，结合 `shouldComponentUpdate`，以减少重绘次数。
	
	+	对于静态组件，`shouldComponentUpdate` 返回 `false`。

	+	对于组件存在变化的情况

		+	如果变化的 `props` 或 `state` 不多，可以在 `shouldComponentUpdate(nextProps, nextState)` 里比较新老 `props` 和 `state`，在目标 `props` 或 `state` 发生变化时 `return true`，其余情况都 `return false`。
		+	如果变化的 `props` 或 `state` 多，或者层次深，则最好把组件拆分成变化的和不变化的部分。

	+	具体写法上，基本是：`this.state.xxx === nextState.xxx` 比较这种样子。

+	PureRenderMixin
	
	```
	class Shop extends React.Component {
		constructor(props) {
			super(props);
			this.shouldComponentUpdate = React.addons.PureRenderMixin.shouldComponentUpdate.bind(this);
		}

		render() {
			// code
		}
	}
	```

+	合并 `setState`
+	合并 `dispatch`
+	渐进式渲染


## 准备

[这里](http://www.atool.org/sort.php) 可以查看各个算法的图示

参考讲解
+	http://www.cnblogs.com/xianyulaodi/p/6001122.html
+	http://www.cnblogs.com/chengxiao/p/6194356.html

## 冒泡算法

+	原理
	
	多次循环数组（循环数量为数组的长度），每次循环挑选出队列中数值最大（或最小）的冒泡。

+	效率

	低

+	特点

	虽然每次比较的都是两个数，但形成的效果是：每次两个数比较，都是最后一个数和之前所有数中最大的数比较

+	JS 实现

	```js
	function bubbleSort(arr) {
		for (let i = 0, len = arr.length; i < len; i++) {
			for (let j = 0; j < len - i - 1; j++) {
				if (arr[j] >= arr[j + 1]) {
					arr[j] = arr[j] + arr[j + 1];
					arr[j + 1] = arr[j] - arr[j + 1];
					arr[j] = arr[j] - arr[j + 1];
				}
			}
		}

		return arr;
	}

	const arr = [2, 3, 6, 4, 2, 1, 90, 100, 20, 5];

	console.log(bubbleSort(arr)); // [1, 2, 2, 3, 4, 5, 6, 20, 90, 100];
	```

## 插入排序

+	特点
	
	+	插入排序将排序数分为两组：一组有序的，一组无序的。

	+	有序数组从第一个数开始组建。

	+	循环无序数组，挨个放入有序数组；如果新元素 < 有序数，空出一个位置，有序元素右移；如果新元素 >= 有序数，直接插入之前空出的位置（或有序数组最后的位置）

+	JS 实现(外部版)

	```js
	function insertSort(arr) {
		
		for (var i = 0, len = arr.length; i < len; i++) {

			// 缓存当前元素，当前位置的元素可以被替换了
			var tmp = arr[i];

			// 遍历前面的数组，若 tmp 比循环到的元素大，则停止遍历，记录位置
			for (var j = i - 1; tmp < arr[j]; j--) {
				arr[j + 1] = arr[j];
			}

			arr[j + 1] = tmp;
		}

		return arr;
	}

	var result = insertSort([2, 3, 6, 4, 2, 1, 90, 100, 20, 5]);

	console.log(result); // [1, 2, 2, 3, 4, 5, 6, 20, 90, 100];
	```

+	自己实现版

	```js
	function insertSort(arr) {
		const result = [];

		while(arr.length) {
			const temp = arr.shift();
			let inserted = false;

			for (let i = 0, len = result.length; i < len; i++) {
				if (temp < result[i]) {
					inserted = true;
					result.splice(i, 0, temp);
					break;
				}
			};

			if (!inserted) {
				result.push(temp);
			}
		}

		return result;
	}

	const arr = [2, 3, 6, 4, 2, 1, 90, 100, 20, 5];

	console.log(insertSort(arr));
	```

## 希尔排序

+	特点

	希尔排序是不稳定的：排序中，相同的元素可能在各自的插入排序中移动。

+	JS 实现
	
	```js
	function shellSort(arr) {
	    var gap = Math.floor(arr.length / 2);
	    while(gap > 0) {
	        for(var i = gap; i < arr.length; i++) {
	            temp = arr[i];
	            for(var j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
	                arr[j] = arr[j - gap];
	            }
	            arr[j] = temp;
	        }
	        gap = Math.floor(gap / 2);
	    }
	    return arr;
	}
	var arr = [2, 3, 6, 4, 2, 1, 90, 100, 20, 5];
	console.log(shellSort(arr));  //[1, 2, 2, 3, 4, 5, 6, 20, 90, 100]
	```
	
## 归并排序

+	关键词

	合并两个已排序的数组

	递归

	粒度细化为 1 个元素的数组

+	JS 实现方式：递归

	```js
	// 合并两个已排序的数组
	function merge(left, right) {
		var rt = [];

		while(left.length && right.length) {
			if (left[0] <= right[0]) {
				rt.push(left.shift());
			} else {
				rt.push(right.shift());
			}
		}

		/* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
		return rt.concat(left).concat(right);
	}

	function mergeSort(arr) {
		
		if (arr.length === 1) {
			return arr;
		}

		var midIndex = Math.floor(arr.length / 2);

		var left = arr.slice(0, midIndex);
		var right = arr.slice(midIndex);

		return merge(mergeSort(left), mergeSort(right));
	}
	```

## 快速排序

+	JS 实现

	```js
	function quickSort(arr) {
		
		if (arr.length <= 1) {
			return arr;
		}

		var midIndex = Math.floor(arr.length / 2);
		var midValue = arr.splice(midIndex, 1)[0];

		var left = [];
		var right = [];

		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i] <= midValue) {
				left.push(arr[i]);
			} else {
				right.push(arr[i]);
			}
		}

		return quickSort(left).concat([midValue], quickSort(right));
	}

	var result = quickSort([2, 3, 6, 4, 2, 1, 90, 100, 20, 5]);

	console.log(result); // [1, 2, 2, 3, 4, 5, 6, 20, 90, 100];
	```

## 选择排序

+	排序方式（冒泡排序的另一种形式）

	先隔离要排序的数组中第一个元素

	循环剩下的元素，和第一个元素对比，同时记录最小值的位置和值

	最小值和第一个元素交换

	然后隔离第二个元素，重复上述动作

+	JS 实现

	```js
	function selectSort(arr) {
		
		for (var i = 0, len = arr.length; i < len; i++) {

			// 初始化最小值
			var minIndex = i;
			var minValue = arr[i];

			for (var j = i + 1; j < len; j++) {
				if (arr[j] < minValue) {
					minIndex = j;
					minValue = arr[j];
				}
			}

			// 交换
			arr[minIndex] = arr[i];
			arr[i] = minValue;
		}

		return arr;
	}

	var result = selectSort([2, 3, 6, 4, 2, 1, 90, 100, 20, 5]);

	console.log(result); // [1, 2, 2, 3, 4, 5, 6, 20, 90, 100];
	```

## 奇偶排序

+	JS 实现

	```js
	function isOrdered(arr) {
		for (var i = 0, len = arr.length - 1; i < len; i++) {
			if (arr[i] > arr[i + 1]) {
				return false;
			}
		}

		return true;
	}

	function oddEvenSort(arr) {
		
		var evenOrdered = false;
		var oddOrdered = false;

		var k = 0;

		var limit = 0;

		while(!isOrdered(arr) && limit++ < 20) {

			console.log(k, arr);

			for (var i = k, len = arr.length; i < len - 1; i += 2) {
				if (arr[i] > arr[i + 1]) {
					arr[i] = [arr[i + 1], arr[i + 1] = arr[i]][0];
				}
			}

			k = [1, 0][k];
		}

		return arr;
	}

	var result = oddEvenSort([2, 6, 4, 22, 1, 0, 76, 20, 5]);

	console.log(result); // [0, 1, 2, 4, 5, 6, 20, 22, 76]
	```

## 全排列算法

```js
function perm(str) {
    var result = [];

    if (str.length === 1) {
        result = [str];
    } else if (str.length > 1) {
        var firstStr = str[0];
        var prePerm = perm(str.slice(1));

        for (var i = 0; i < prePerm.length; i++) {
            var curStr = prePerm[i];
            for (var j = 0; j < curStr.length; j++) {
                var tmp = curStr.slice(0, j) + firstStr + curStr.slice(j);

                result.push(tmp);
            }
        }

    }

    return result;
}

console.log(perm('123456'));
```
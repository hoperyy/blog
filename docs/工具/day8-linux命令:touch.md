[issue](https://github.com/hoperyy/blog/issues/77)

# day 8 - linux 命令 : `touch`

`touch` 命令用来：（1）新建一个文件；（2）修改文件时间戳

## 语法

```
touch [选项] 文件……
```

## 选项
    
+   `-f`

    仅负责解决 BSD 版本 `touch` 指令的兼容性问题
    
+   `-r`

    `touch -r a b` 将 `b` 文件的时间戳修改成 `a` 文件的时间戳
    
+   `-t`

    指定时间戳
        
## 实例

+   创建不存在的文件

    `touch a b`
    
+   更新 `log.log` 和 `log2.log` 的时间戳相同
    
    `touch -r log2.log log.log`
    
+   设定文件的时间戳

    `touch -t 201211142234.50 log.log`
    
    格式：
    
    `[[CC]YY]MMDDhhmm[.SS]` 
    



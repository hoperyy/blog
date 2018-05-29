[issue](https://api.github.com/repos/hoperyy/blog/issues/82)

# day 13 - linux 命令 : `head`

`head` 用来显示开头某个数量的文字区块。

## 语法

```
head [选项] 文件……
```

默认显示前 10 行。

## 选项
    
+   `-n <行数>`：显示的行数
+   `-c <字节数>`：显示的字节数
        
## 实例
    
+   显示前 12 行

    `head -n 12 readme.md`
    
+   显示前 12 字节

    `head -c 12 readme.md`
    
    




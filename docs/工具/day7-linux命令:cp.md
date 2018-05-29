[issue](https://github.com/hoperyy/blog/issues/76)

# day 7 - linux 命令 : `cp`

`cp` 命令用来复制文件或目录

## 语法

```
cp [选项] 源文件或目录 目标文件或目录
```

## 选项
    
+   `-f`

    强制
    
+   `-i`

    如果目标文件已经存在时，就会询问是否覆盖
        
## 实例

+   复制文件到目录

    `cp a.js folder`
    
    无论在目录中是否存在该文件，均会覆盖
    
+   交互式复制文件到目录
    
    `cp -i a.js folder`
    
+   复制目录到目录

    `cp folder0 folder`
    
    结果是 `folder` 中多了 `folder0`
    



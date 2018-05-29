[issue](https://github.com/hoperyy/blog/issues/85)

# day 16 - linux 命令 : `whereis`

`whereis` 命令只能用于程序名的搜索。
    
和 `find` 相比，`whereis` 查找速度非常快，因为 `linux` 系统会将系统内的所有文件都记录在一个数据库文件中，`whereis` 和 `locate` 会从数据库中查找数据，而不是像 `find` 一样通过遍历硬盘来寻找，效率自然会更高。

## 语法

```
whereis 程序名
```
        
## 实例
    
+   `whereis git`
+   `whereis svn`

    
    




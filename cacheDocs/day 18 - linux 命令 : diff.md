[issue](https://github.com/hoperyy/blog/issues/87)

# day 18 - linux 命令 : `diff`

`diff` 用于对比文件或文件夹

## 语法

```
diff [选项] 文件/目录 文件/目录
```
        
## 实例
    
+   比较两个文件

    ```
    diff readme.md readme2.md
    ```
    
    对比结果中，
    
    +   `a`: `-add`
    +   `c`: `-change`
    +   `d`: `-delete`

+   并排格式输出

    ```
    diff readme.md readme2.md -y -W 50
    ```
    
+   上下文输出

    ```
    diff readme.md readme2.md -c
    ```
    
+   统一格式输出

    ```
    diff readme.md readme2.md -u
    ```
    
+   比较两个目录

    ```
    diff folder1 folder2
    ```
    
    只会对比文件名相同的文件
    
+   比较两个文件不同，并生产补丁

    ```
    diff readme.md readme2.md >patch.log
    ```
    
    




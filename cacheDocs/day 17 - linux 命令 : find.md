[issue](https://api.github.com/repos/hoperyy/blog/issues/86)

# day 17 - linux 命令 : `find`

Linux 下 `find` 命令在目录结构中搜索文件，并执行指定的操作。Linux 下 `find` 命令提供了相当多的查找条件，功能很强大。即使系统中含有网络文件系统( NFS)，`find` 命令在该文件系统中同样有效，只你具有相应的权限。 在运行一个非常消耗资源的 `find` 命令时，很多人都倾向于把它放在后台执行，因为遍历一个大的文件系统可能会花费很长的时间(这里是指 30G 字节以上的文件系统)。

## 语法

```
find pathname -options 参数 [-print -exec -ok ...]
```
        
## 选项

+   `pathname`

    `find` 命令所查找的目录路径。例如用 `.` 来表示当前目录，用 `/` 来表示系统根目录。
    
+   `-print`

    `find` 命令将匹配的文件输出到标准输出。
    
+   `-exec`

    `find` 命令对匹配的文件执行该参数所给出的 `shell` 命令。
    
+   `-ok`

    和 `-exec` 作用相同，只不过以一种更安全的模式来执行该参数所给出的命令，在执行每一个命令之前，都会给出提示，让用户来确定是否执行。
    
## `-options`

+   `-name`

    按照文件名查找文件
    
    例：`find . -name "*.log"`
    
+   `-atime`

    查找指定时间内修改过的文件
    
    例：`find . -atime -2` 查找 48 小时内修改过的文件
    
+   `-perm`

    按照目录或文件的权限来查找文件
    
    例：`find . -perm 777` 查找目录下权限为 777 的文件
    
+   `-type`

    按类型查找
    
    例：`find . -type -f -name "*.log"` 查找当目录，以 `.log` 结尾的普通文件 
    
+   `sort`

    查找当前所有目录并排序
    
    例：`find . -type d | sort`
    
+   `-size`

    按大小查找文件
    
    例： `find . -size +1000c -print` 查找当前目录大于 1k 的文件
    


    
    




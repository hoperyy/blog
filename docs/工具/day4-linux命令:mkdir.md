[issue](https://github.com/hoperyy/blog/issues/73)

# day 4 - linux 命令 : `mkdir`

`mkdir` 命令用来创建目录

## 语法

+   `-Z`

    设置安全上下文，当使用 SELinux 时有效 
    
+   `-m <目标属性>` 或 `--mode <目标属性>`

    建立目录的同时设置目录的权限
    
+   `-p` 或 `--parents`

     若所要建立目录的上层目录目前尚未建立，则会一并建立上层目录
     
+   `--version` 

    显示版本信息。

## 实例

+   在目录 `/usr/meng` 下建立子目录 `test`，并且只有文件主有读、写和执行权限，其他人无权访问 

    ```
    mkdir -m 700 /usr/meng/test
    ```
    
+   在当前目录中建立 `bin` 和 `bin` 下的 `os_1` 目录，权限设置为文件主可读、写、执行，同组用户可读和执行，其他用户无权访问 

    ```
    mkdir -p-m 750 bin/os_1
    ```









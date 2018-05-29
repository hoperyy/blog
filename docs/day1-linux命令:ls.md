[issue](https://github.com/hoperyy/blog/issues/70)

# day 1 - linux 命令 : `ls`

`ls` 命令用来显示目标列表，在 Linux 中是使用率较高的命令。`ls` 命令的输出信息可以进行彩色加亮显示，以区分不同类型的文件。

## 语法

```
ls (选项) (参数)
```

## 选项

+   `-a`：显示**所有**档案和目录（含 `.` 和 `..`）。
+   `-A`： 显示除隐藏文件 `.` 和 `..` 以外的所有文件列表。
+   `-C`：多列显示输出结果，这是**默认**选项。
+   `-l`：与 `-C` 选项功能相反，所有输出信息用单列格式输出，不输出为多列。
+   `-F`：在每个输出项后追加文件的类型标识符。
    具体含义：`*` 表示具有可执行权限的普通文件，`/` 表示目录，`@` 表示符号链接，`|` 表示命令管道 FIFO，`=` 表示 sockets 套接字。当文件为普通文件时，不输出任何标识符。
+   `-b`：将文件中的不可输出的字符以反斜线 `\` 加字符编码的方式输出。（**待验证**）
+   `-c`：与 `-lt` 选项连用时(`ls -clt`)，按照文件状态时间排序输出目录内容，排序的依据是文件的索引节点中的 `ctime` 字段；与 `-l` 选项连用时(`ls -cl`)，则排序的依据是文件的状态改变时间。
+   `-d` ：仅显示目录名，而不显示目录下的内容列表。显示符号链接文件本身，而不显示其所指向的目录列表。
+   `-f`：此参数的效果和同时指定 `aU` 参数相同，并关闭 `lst` 参数的效果；（**待验证**）。
+   `-i`：显示文件索引节点号（`inode`）。一个索引节点代表一个文件。
+   `--file-type`: 与 `-F` 选项的功能相同，但是不显示 `*`。
+   `-k`：以 KB（千字节）为单位显示文件大小。（**待验证**）。
+   `-l`：以长格式显示目录下的内容列表。输出的信息从左到右依次包括文件名，文件类型、权限模式、硬连接数、所有者、组、文件大小和文件的最后修改时间等。
+   `-m`：用 `,` 号区隔每个文件和目录的名称。
+   `-n`：以用户识别码和群组识别码替代其名称。（**待验证**）
+   `-r`：以文件名反序排列并输出目录内容列表。
+   `-s`：显示文件和目录的大小，以区块为单位。
+   `-t`：用文件和目录的更改时间排序。
+   `-L`：如果遇到性质为符号链接的文件或目录，直接列出该链接所指向的原始文件或目录。
+   `-R`：递归处理，将指定目录下的所有文件及子目录一并处理。
+   `--full-time`：列出完整的日期与时间； --color[=WHEN]：使用不同的颜色高亮显示不同类型的。（**待验证**）
+   `--color[=WHEN]`：使用不同的颜色高亮显示不同类型的。

## 参数

目录：指定要显示列表的目录，也可以是具体的文件。

## 实例

+   显示当前目录下非影藏文件与目录

    ```
    ls
    
    README.md          mock               package.json       stats.json
    build              node_modules       pages              vbuilder.config.js
    ```
    
+   显示当前目录下包括影藏文件在内的所有文件列表

    ```
    ls -a
    
    .                  .gitignore         build              node_modules       pages              vbuilder.config.js
    ..                 README.md          mock               package.json       stats.json
    ```
    
+   输出长格式列表

    ```
    ls -l
    
    total 24
    -rw-r--r--    1 lyy  staff   239  6 22 17:31 README.md
    drwxr-xr-x    3 lyy  staff   102  6 30 11:10 build
    drwxr-xr-x    3 lyy  staff   102  6 27 19:21 mock
    drwxr-xr-x  194 lyy  staff  6596  6 30 11:22 node_modules
    -rw-r--r--    1 lyy  staff   444  6 27 09:54 package.json
    drwxr-xr-x    3 lyy  staff   102  6 22 17:31 pages
    -rw-r--r--    1 lyy  staff     0  6 27 22:19 stats.json
    -rw-r--r--    1 lyy  staff  1338  6 27 10:19 vbuilder.config.js
    ```
    
+   显示文件的 inode 信息

    索引节点（index inode 简称为 “inode”）是 Linux 中一个特殊的概念，具有相同的索引节点号的两个文本本质上是同一个文件（除文件名不同外）。

    ```
    ls -i -l package.json stats.json
    
    34024709 -rw-r--r--  1 lyy  staff  444  6 27 09:54 package.json
    34600588 -rw-r--r--  1 lyy  staff    0  6 27 22:19 stats.json
    ```
    
+   水平输出文件列表

    ```
    ls -m
    
    README.md, build, mock, node_modules, package.json, pages, stats.json, vbuilder.config.js
    ```
    
+   最近修改的文件显示在最上面

    ```
    ls -t 
    
    node_modules       stats.json         vbuilder.config.js README.md
    build              mock               package.json       pages
    ```
    
+   显示递归文件
    
    ```
    ls -R
    ```
    
+   打印文件的 UID 和 GID

    ```
    ls -n
    
    total 24
    -rw-r--r--    1 501  20   239  6 22 17:31 README.md
    drwxr-xr-x    3 501  20   102  6 30 11:10 build
    drwxr-xr-x    3 501  20   102  6 27 19:21 mock
    drwxr-xr-x  194 501  20  6596  6 30 11:22 node_modules
    -rw-r--r--    1 501  20   444  6 27 09:54 package.json
    drwxr-xr-x    3 501  20   102  6 22 17:31 pages
    -rw-r--r--    1 501  20     0  6 27 22:19 stats.json
    -rw-r--r--    1 501  20  1338  6 27 10:19 vbuilder.config.js
    ```
    
+   列出文件和文件夹的详细信息

    ```
    ls -l
    
    total 24
    -rw-r--r--    1 lyy  staff   239  6 22 17:31 README.md
    drwxr-xr-x    3 lyy  staff   102  6 30 11:10 build
    drwxr-xr-x    3 lyy  staff   102  6 27 19:21 mock
    drwxr-xr-x  194 lyy  staff  6596  6 30 11:22 node_modules
    -rw-r--r--    1 lyy  staff   444  6 27 09:54 package.json
    drwxr-xr-x    3 lyy  staff   102  6 22 17:31 pages
    -rw-r--r--    1 lyy  staff     0  6 27 22:19 stats.json
    -rw-r--r--    1 lyy  staff  1338  6 27 10:19 vbuilder.config.js
    ```
    
+   列出可读文件和文件夹详细信息

    ```
    ls -lh
    
    total 24
    -rw-r--r--    1 lyy  staff   239B  6 22 17:31 README.md
    drwxr-xr-x    3 lyy  staff   102B  6 30 11:10 build
    drwxr-xr-x    3 lyy  staff   102B  6 27 19:21 mock
    drwxr-xr-x  194 lyy  staff   6.4K  6 30 11:22 node_modules
    -rw-r--r--    1 lyy  staff   444B  6 27 09:54 package.json
    drwxr-xr-x    3 lyy  staff   102B  6 22 17:31 pages
    -rw-r--r--    1 lyy  staff     0B  6 27 22:19 stats.json
    -rw-r--r--    1 lyy  staff   1.3K  6 27 10:19 vbuilder.config.js
    ```
    
+   显示文件夹信息

    ```
    ls -ld node_modules/
    
    drwxr-xr-x  194 lyy  staff  6596  6 30 11:22 node_modules
    ```

+   按修改时间列出文件和文件夹详细信息

    ```
    ls -ltr
    
    total 24
    drwxr-xr-x    3 lyy  staff   102  6 22 17:31 pages
    -rw-r--r--    1 lyy  staff   239  6 22 17:31 README.md
    -rw-r--r--    1 lyy  staff   444  6 27 09:54 package.json
    -rw-r--r--    1 lyy  staff  1338  6 27 10:19 vbuilder.config.js
    drwxr-xr-x    3 lyy  staff   102  6 27 19:21 mock
    -rw-r--r--    1 lyy  staff     0  6 27 22:19 stats.json
    drwxr-xr-x    3 lyy  staff   102  6 30 11:10 build
    drwxr-xr-x  194 lyy  staff  6596  6 30 11:22 node_modules
    ```

+   按照特殊字符对文件进行分类

    ```
    ls -F
    
    README.md           mock/               package.json        stats.json
    build/              node_modules/       pages/              vbuilder.config.js
    ```


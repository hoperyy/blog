
+ 参考资料
  + [阮一峰 —no-ff参数介绍](http://www.ruanyifeng.com/blog/2012/07/git.html)
  + [git push命令](http://www.open-open.com/lib/view/open1431680242669.html)
+ 回滚版本：git reset —hard HEAD^ 
  + 会修改本地文件
  + 会修改暂存区(add后)
  + 回到指定版本
+ 回退暂存区为线上版本：git reset HEAD file
  + 不会修改本地文件
  + 回退到指定版本（如HEAD）
  + 分支指针不变
+ 切换分支是否会改变本地文件
  + 如果已经commit，则会改变
  + 如果没有commit，则不会改变
+ 查看工作区和版本库里面最新版本的区别：git diff HEAD -- readme.txt
+ 放弃工作区的修改
  + git checkout -- file
  + 让这个文件回到最近一次git commit或git add时的状态
  + 命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令
+ 查看文件内容：cat file
+ 删除文件
  + rm file 删除工作区文件
  + git rm file 删除暂存区文件和工作区（本地）文件
  + 暂存区文件被删除后，git checkout — file 会报错
  + 只是本地文件被删除的话，git checkout — file有效

+ 创建 SSH Key：
  + ssh-keygen -t rsa -C “youremail@example.com"
  + 主目录的.ssh内，有id_rsa和id_rsa.pub，后者是公钥，填进github

+ 查看log 
  + `git log`
  + `git reflog`
  + `git log --graph --pretty=oneline`
  + 查看分支的合并情况：`git log --graph --pretty=oneline --abbrev-commit`
  + 查看分支合并图：`git log --graph`
+ 关联远程仓库： git remote add origin（远程仓库的名字） git@github.com:michaelliao/learngit.git
  + 查看分支：git branc

  + 创建分支：git branch <name>

  + 切换分支：git checkout <name>

  + 创建+切换分支：git checkout -b <name>

  + 合并某分支到当前分支：git merge <name>

  + 删除分支：git branch -d <name>

+ `git push`
  + 完整写法：`git push <远程主机名> <本地分支名>:<远程分支名>`
  + 省略远程分支：`git push origin master`
    + 尝试推送与之存在追踪关系的远程分支，如果该分支不存在，则会被新建
  + 省略本地分支：`git push origin :master`
    + 表示删除该远程分支
  + 如果当前分支只有一个追踪分支，那么主机名都可以省略
    + `git push`
    + 默认推送当前分支
  + 如果有多个远程分支，使用参数`-u`设置默认主机
    + `git push -u origin master`
  + `simple`和`matching`方式
    + `simple`方式只推送当前分支
    + `matching`方式推送所有有对应远程分支的本地分支
    + 设置默认方式：`git config --global push.default matching`、` git config --global push.default simple`
  + 不管是否存在对应的远程分支，均会推送到远程主机，需要增加`—all`选项
    + `git push --all origin`
  + 远程比本地新，会被要求`git pull`，如果一定要推送，使用`—force`选项
    + `git push --force origin`
    + 上面命令使用–force选项，结果导致在远程主机产生一个”非直进式”的合并(non-fast-forward merge)。除非你很确定要这样做，否则应该尽量避免使用–force选项。
  + git push不会推送标签(tag)，除非使用–tags选项
    + ` git push origin —tags`

+ `git clone`
  
  [Git远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
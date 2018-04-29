# 原理

+   `github` 可以生成静态网页
+   每个用户都会自动分配一个域名：`username.github.io`
+   域名与`github`上的项目(`registory`)的关系
    +   域名：`username.github.io` 
        +   访问项目 `username.github.io` 的 `master` 分支的`/index.html` 文件
    +   域名：`username.github.io/folder(自定义)`
        +   如果项目`username.github.io`有`folder`文件夹，则优先访问项目 `username.github.io`的`master`分支下的`/folder/index.html`，如果没有访问到的，显示为404页面
        +   如果项目`username.github.io`没有`folder`文件夹，则访问独立项目 `folder(自定义)` 的 `gh-pages(必须是)`分支 的 `/folder/index.html` 文件
+   `index.html`的格式
    +   可以是正常格式的 `html` 文件
    +   可以是 `jekyll`模板引擎规定的格式文件，`github`会将此格式的源文件解析为静态页面

+   `github`使用 `jekyll` 模板引擎处理你`github`分支上的源文件，生成可访问到静态页面。因此，你项目分支上的源文件是要符合`jekyll`的语法规则，才可以以静态页面的形式访问

# 工具

写`jekyll`格式的源文件比较复杂，这里介绍`hexo`来生成`jekyll`格式文件的方法

[搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)

## hexo 使用方法
+   使用工具
    +   git bash
    +   nodejs
+   安装 hexo
    +   `npm install -g hexo`
+   创建 hexo 文件夹
    +   `hexo init`
+   安装依赖包
    +   `npm install`
+   本地测试
    +   `hexo generator`
    +   `hexo server`
+   `github` 创建 `repository`
    +   `liuyuanyangscript.github.io`
+   部署
    +   编辑_config.yml(在\hexo下)
    
            deploy:
            type: git
            repository: https://github.com/yourname/yourname.github.io.git
            branch: master
    +   完成部署
        
            hexo generate（编译，每次修改文件后都要编译）
            hexo deploy（提交到 github）
+   简单的命令格式

        hexo g == hexo generate
        hexo d == hexo deploy
        hexo s == hexo server
        hexo n == hexo new
+   本地测试
    +   命令
    
            hexo server

    +   本地访问

            localhost:4000
+   博客配置

    +   对站点的配置 `\hexo\_config.yml`

            # Hexo Configuration
            ## Docs: http://zespia.tw/hexo/docs/configure.html
            ## Source: https://github.com/tommy351/hexo/
            
            # Site 这里的配置，哪项配置反映在哪里，可以参考我的博客
            title: Zippera's blog #站点名，站点左上角
            subtitle: Walk steps step by step #副标题，站点左上角
            description: Walk steps step by step #给搜索引擎看的，对站点的描述，可以自定义
            author: zippera #在站点左下角可以看到
            email: #你的联系邮箱
            language: zh-CN #中国人嘛，用中文
            
            # URL #这项暂不配置，绑定域名后，欲创建sitemap.xml需要配置该项
            ## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
            url: http://zipperary.com
            root: /
            permalink: :year/:month/:day/:title/
            tag_dir: tags
            archive_dir: archives
            category_dir: categories
            
            # Writing 文章布局、写作格式的定义，不修改
            new_post_name: :title.md # File name of new posts
            default_layout: post
            auto_spacing: false # Add spaces between asian characters and western characters
            titlecase: false # Transform title into titlecase
            max_open_file: 100
            filename_case: 0
            highlight:
              enable: true
              backtick_code_block: true
              line_number: true
              tab_replace:
            
            # Category & Tag
            default_category: uncategorized
            category_map:
            tag_map:
            
            # Archives 默认值为2，这里都修改为1，相应页面就只会列出标题，而非全文
            ## 2: Enable pagination
            ## 1: Disable pagination
            ## 0: Fully Disable
            archive: 1
            category: 1
            tag: 1
            
            # Server 不修改
            ## Hexo uses Connect as a server
            ## You can customize the logger format as defined in
            ## http://www.senchalabs.org/connect/logger.html
            port: 4000
            logger: false
            logger_format:
            
            # Date / Time format 日期格式，不修改
            ## Hexo uses Moment.js to parse and display date
            ## You can customize the date format as defined in
            ## http://momentjs.com/docs/#/displaying/format/
            date_format: MMM D YYYY
            time_format: H:mm:ss
            
            # Pagination 每页显示文章数，可以自定义，我将10改成了5
            ## Set per_page to 0 to disable pagination
            per_page: 5
            pagination_dir: page
            
            # Disqus Disqus插件，我们会替换成“多说”，不修改
            disqus_shortname:
            
            # Extensions 这里配置站点所用主题和插件，暂默认，后面会介绍怎么修改
            ## Plugins: https://github.com/tommy351/hexo/wiki/Plugins
            ## Themes: https://github.com/tommy351/hexo/wiki/Themes
            theme: light
            exclude_generator:
            plugins:
            - hexo-generator-feed
            - hexo-generator-sitemap
            
            # Deployment 站点部署到github要配置，上一节中已经讲过
            ## Docs: http://zespia.tw/hexo/docs/deploy.html
            deploy:
              type: github
              repository: https://github.com/zippera/zippera.github.io.git
              branch: master

    +   对主题的配置 `\hexo\themes\light_config.yml` (light 是主题名字，可变)

            略

+   复制别人的主题
    
    举例：`git clone https://github.com/wuchong/jacman.git themes/jacman`
    
+   启用主题

    根目录下的`_config.yml`的`theme`属性，设置为：`theme: jacman(例)`

+   更新主题

    举例：`cd themes/jacman + git pull`

    为避免出错，先备份`_config.yml`文件后再升级

+   发表文章
    +   命令
            
            hexo new "my new post"

        生成 `markdown` 文件
    +   生成的 `markdown` 文件的默认格式

            title: my new post #可以改成中文的，如“新文章”
            date: 2013-05-29 07:56:29 #发表日期，一般不改动
            categories: blog #文章文类
            tags: [博客，文章] #文章标签，多于一项时用这种格式
            ---
            markdown 格式的正文

    +   编译

            hexo generate

    +   本地访问

            hexo server

    +   提交到 github

            hexo deploy

+   安装插件

    添加sitemap和feed插件

        $ npm install hexo-generator-sitemap
        $ npm install hexo-generator-feed

    修改_config.yml，增加以下内容

        # Extensions
        Plugins:
        - hexo-generator-feed
        - hexo-generator-sitemap
        
        #Feed Atom
        feed:
          type: atom
          path: atom.xml
          limit: 20
        
        #sitemap
        sitemap:
          path: sitemap.xml
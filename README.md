## TLS-Toolbox 电商导航网站

这是一个基于Hugo框架的电商工具导航网站，集合了各种电商相关的工具、平台和资源链接，方便电商从业者快速访问所需资源。网站名为"驼铃电商百宝箱"，提供了丰富的电商运营工具和资源导航。

### 项目特点

- 基于Hugo静态网站生成器，快速加载，易于部署
- 分类整理的电商工具资源，包括商家软件、电商辅助、直播辅助等
- 内置搜索功能，支持拼音搜索
- 支持亮色/暗色模式切换
- 提供多种实用工具，如补单计算器、千川ROI计算器等
- 响应式设计，适配各种设备

### 项目结构

```
/
├── archetypes/                      # Hugo内容模板目录
│   └── default.md                   # 默认内容模板
├── content/                         # 内容目录
│   ├── about.md                     # "关于"页面内容
│   ├── sub1.md                      # 电商黑科技内容页
│   └── sub2.md                      # 辅助内容页
├── data/                            # 数据目录
│   └── webstack.yml                 # 主页导航网址数据配置
├── layouts/                         # 布局模板目录
│   ├── _default/                    # 默认布局模板
│   │   └── single.html              # 单页布局
│   ├── nav/                         # 导航相关布局模板
│   │   └── single.html              # 导航单页布局
│   ├── index.html                   # 主页布局
│   ├── search.html                  # 搜索页面布局
│   └── 404.html                     # 404错误页面
├── static/                          # 静态资源目录
│   ├── css/                         # CSS样式文件
│   │   ├── bootstrap.css            # Bootstrap框架CSS
│   │   ├── brands.min.css           # 品牌图标CSS
│   │   ├── budan.css                # 补单计算器样式
│   │   ├── font-awesome.min.css     # Font Awesome图标
│   │   ├── nav.css                  # 导航栏样式
│   │   ├── roi.css                  # ROI计算器样式
│   │   ├── social.css               # 社交分享样式
│   │   └── tabs.css                 # 标签页样式
│   ├── js/                          # JavaScript文件
│   │   ├── bootstrap.min.js         # Bootstrap框架JS
│   │   ├── budan.js                 # 补单计算器脚本
│   │   ├── jquery-1.11.1.min.js     # jQuery库
│   │   ├── lazyload.min.js          # 图片懒加载脚本
│   │   ├── local-search.js          # 本地搜索功能
│   │   ├── nav.js                   # 导航功能脚本
│   │   ├── pinyin-pro-3.19.0.min.js # 拼音搜索支持
│   │   ├── roi.js                   # 千川ROI计算器脚本
│   │   ├── social.js                # 社交分享脚本
│   │   ├── tabs.js                  # 标签页切换脚本
│   │   └── TweenMax.min.js          # 动画效果库
│   ├── pages/                       # 静态页面
│   │   ├── budan.html               # 补单计算器页面
│   │   └── roi.html                 # 千川ROI计算器页面
│   ├── webfonts/                    # 网页字体
│   │   ├── fa-brands-400.ttf        # Font Awesome品牌字体
│   │   ├── fa-brands-400.woff2      # Font Awesome品牌字体(woff2)
│   │   ├── fa-regular-400.ttf       # Font Awesome常规字体
│   │   ├── fa-regular-400.woff2     # Font Awesome常规字体(woff2)
│   │   ├── fa-solid-900.ttf         # Font Awesome实心字体
│   │   ├── fa-solid-900.woff2       # Font Awesome实心字体(woff2)
│   │   ├── fa-v4compatibility.ttf   # Font Awesome v4兼容字体
│   │   └── fa-v4compatibility.woff2 # Font Awesome v4兼容字体(woff2)
│   ├── _headers                     # Netlify/Vercel自定义HTTP头
│   ├── _redirects                   # Netlify/Vercel重定向规则
│   └── images/                      # 图片资源目录
│       ├── 图文设计/                # 图文设计工具图标
│       ├── 图标字体/                # 图标字体资源图标
│       ├── 广告投放/                # 广告投放平台图标
│       ├── 快捷导航/                # 主要电商平台图标
│       ├── 数据分析/                # 数据分析工具图标
│       ├── 电商辅助/                # 电商辅助工具图标
│       ├── 视频编辑/                # 视频编辑工具图标
│       ├── 联系我们/                # 联系方式图标
│       ├── 设计软件/                # 设计软件图标
│       ├── 站点图标.png             # 网站图标
│       ├── 驼铃标志.jpg             # 驼铃标志
│       └── 驼铃标志1.jpg            # 驼铃标志(备用)
├── hugo.toml                        # Hugo配置文件
├── LICENSE                          # 许可证文件
└── README.md                        # 项目说明文档
```

### 核心功能

1. **网址导航**: 
   - 通过`data/webstack.yml`配置的分类导航链接
   - 支持多种分类展示，包括常用工具、快捷导航、图文设计等
   - 每个导航项包含标题、图标、链接和描述

2. **实用工具**:
   - **补单计算器**: 帮助电商卖家计算提升店铺各项指标所需的补单数量
   - **千川ROI计算器**: 包含商家ROI、达人佣金和店铺利润三种模式，支持不同平台投放策略计算

3. **搜索功能**: 
   - 支持网站内容快速搜索
   - 集成拼音搜索功能，支持拼音首字母匹配
   - 实时搜索结果展示

4. **主题模式**: 
   - 支持亮色/暗色主题切换，优化不同环境下的浏览体验
   - 可在配置中设置默认主题模式

5. **响应式设计**: 
   - 适配PC端和移动端不同屏幕尺寸
   - 移动端优化的导航和交互体验

### 使用方法

#### 本地开发

1. 安装 [Hugo](https://gohugo.io/getting-started/installing/)
2. 克隆本仓库
3. 在项目根目录运行 `hugo server` 启动本地开发服务器
4. 访问 `http://localhost:1313` 预览网站

#### 部署到Cloudflare Pages

1. 拥有 Cloudflare 账号
2. 已将项目推送到 GitHub 或 GitLab 代码仓库

##### 部署步骤
1. 登录 Cloudflare Dashboard
2. 进入 Pages 服务
3. 点击"创建项目"
4. 选择"连接到 Git"并授权访问你的代码仓库
5. 选择本项目的代码仓库

##### 构建设置
在部署设置页面，配置以下内容：
- **构建命令**：`hugo --gc --minify`
- **构建输出目录**：`public`
- **环境变量**：添加一个环境变量，名称为 `HUGO_VERSION`，值为 `0.128.0`

### 配置选项

在 `hugo.toml` 文件中，你可以修改以下配置：

- `title`: 网站标题，当前为"驼铃电商百宝箱"
- `params.search.enable`: 是否启用搜索功能
- `params.darkmode.enable`: 是否默认使用暗色模式
- `params.pinyin.enable`: 是否启用拼音搜索功能
- `params.edit.enable`: 是否显示在线编辑按钮
- `params.github.enable`: 是否显示GitHub按钮

### 内容管理

网站的主要内容通过 `data/webstack.yml` 文件进行配置，包含了各种分类的网址导航。每个导航项包括：
- `title`: 网站标题
- `logo`: 网站logo图片路径
- `url`: 网站链接
- `description`: 网站描述

### 许可证

本项目基于MIT许可证开源。

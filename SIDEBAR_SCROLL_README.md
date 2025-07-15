# 侧边栏滚动功能实现说明

## 功能概述

为TLS-Toolbox项目的侧边栏菜单添加了上下滑动功能，解决了当菜单项过多时无法滚动查看的问题。

## 实现方案

### 1. CSS样式修改

**文件：`static/css/nav.css`**

- 修改了 `.sidebar-menu.fixed .sidebar-menu-inner` 的 `overflow` 属性
- 从 `overflow: hidden` 改为 `overflow-y: auto; overflow-x: hidden`
- 添加了自定义滚动条样式，适配暗色主题
- 为移动端菜单添加了滚动支持

### 2. Perfect Scrollbar集成

**新增文件：**
- `static/js/perfect-scrollbar.min.js` - Perfect Scrollbar库
- `static/css/perfect-scrollbar.css` - Perfect Scrollbar样式

**修改文件：**
- `layouts/index.html` - 引入Perfect Scrollbar的CSS和JS文件

### 3. JavaScript功能增强

**文件：`static/js/nav.js`**

修改了以下函数：
- `ps_init()` - 初始化Perfect Scrollbar
- `ps_destroy()` - 销毁Perfect Scrollbar实例
- `ps_update()` - 更新Perfect Scrollbar

**主要特性：**
- 支持新版本Perfect Scrollbar API
- 兼容旧版本jQuery插件方式
- 提供原生滚动作为备用方案
- 分别处理桌面端和移动端滚动

### 4. 调试和测试功能

**文件：`layouts/index.html`**

添加了调试功能：
- 控制台日志输出
- `testSidebarScroll()` 函数用于测试滚动状态
- 自动检测滚动容器的高度和滚动状态

## 使用方法

### 桌面端
- 侧边栏内容超出视口高度时自动显示滚动条
- 支持鼠标滚轮滚动
- 支持拖拽滚动条

### 移动端
- 打开移动菜单时自动启用滚动
- 支持触摸滚动
- 菜单关闭时自动销毁滚动实例

### 调试测试
在浏览器控制台中输入以下命令进行测试：
```javascript
testSidebarScroll()
```

## 兼容性

- **现代浏览器**：使用Perfect Scrollbar提供美观的自定义滚动条
- **旧版浏览器**：自动降级到原生滚动条
- **移动设备**：完全支持触摸滚动

## 样式特性

- 自定义滚动条宽度为6px
- 滚动条颜色适配暗色/亮色主题
- 鼠标悬停时滚动条变宽为8px
- 平滑滚动动画效果

## 故障排除

如果滚动功能不正常，请检查：

1. **控制台错误**：查看是否有JavaScript错误
2. **Perfect Scrollbar加载**：确认库文件正确加载
3. **CSS样式**：确认overflow属性设置正确
4. **容器高度**：确认侧边栏容器有固定高度

使用 `testSidebarScroll()` 函数可以快速诊断问题。

## 文件清单

### 新增文件
- `static/js/perfect-scrollbar.min.js`
- `static/css/perfect-scrollbar.css`
- `SIDEBAR_SCROLL_README.md`

### 修改文件
- `static/css/nav.css`
- `static/js/nav.js`
- `layouts/index.html`

## 技术细节

- Perfect Scrollbar版本：1.5.5
- 支持桌面端和移动端
- 自动检测容器状态
- 错误处理和降级方案
- 性能优化的滚动更新机制

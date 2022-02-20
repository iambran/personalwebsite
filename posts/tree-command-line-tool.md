---
title: 'Tree Command Line Tool'
date: '2022-02-21'
description: 'tree command line tool'
isPublished: ''
tags: ['Command Line']
---

在YouTube上学习rust编程语言时发现博主Ryan Levick使用一个命令行工具（Command Line Tool）叫`tree`。执行这个`tree`命令可以清晰的将当前项目的文件夹打印到terminal上面。

这个是cd到我这个博客文件夹里面的`components`目录下执行`tree`返回的结果。

```bash

.
├── GoogleAds.js
├── ProfilePhoto.js
├── ViewCounter.js
├── date.js
├── layout.js
├── layout.module.scss
├── layouts
│   ├── 1.module.scss
│   ├── 2.module.scss
│   ├── 3.module.scss
│   ├── 4.module.scss
│   ├── 5.module.scss
│   └── general.module.scss
└── meta.js

1 directory, 13 files

```

苹果电脑上面安装这个工具可以执行`brew install tree`。
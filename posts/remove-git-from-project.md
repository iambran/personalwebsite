---
title: '移除本地代码仓库中的git'
date: '2022-02-05'
description: '移除本地代码仓库中的git'
isPublished: ''
tags: ['git']
---

刚刚在学习怎么使用Next.js和[Netlify CMS](https://www.netlifycms.org/docs/nextjs/)搭建网站，在最后的几个步骤中需要创建一个`.gitignore`文件，叫git不追踪这些文件（夹）。

```html

.next/
node_modules/
/npm-debug.log
.DS_Store
out/

```

但是发现我发现把`.gitignore`拼错了，写成了`.gitingore`。

```html

touch .gitingore

git init

git add .

```

发现vs code左侧显示有3k+的文件已经添加到git上面，再一看原来是`.gitingore`拼错了，那么需要删除这个工作文件夹里面的git，再重新添加一遍git。可以使用下面这行代码删除git。

```html

rm -rf .git

```
---
title: 'CSS :is 选择器'
date: '2021-10-05'
description: 'CSS :is选择器的概念和使用例子'
tags: ['css']
---

我一个客户的Wordpress网站有3种语言：中文，英语，俄语，他们需要在中文站点中显示顶部菜单(topbar)，而在英语和俄语站点不显示顶部菜单，此时CSS `:is`选择器就会相当好用。

网站html元素在三种语言情况下分别是：

1. 中文：`<html class="html" lang="zh-CN" id="html">`

2. 西班牙语：`<html class="html" lang="en-GB" id="html">`

3. 俄语：`<html class="html" lang="ru-RU" id="html">`

4. 顶部菜单(topbar)：`<div id="top-bar-wrap" class="clr">`

在英语和俄语站点隐藏顶部菜单，通常会这样写CSS代码：
```CSS

html[lang="en-GB"] #top-bar-wrap {
    display: none;
}

html[lang="ru-RU"] #top-bar-wrap {
    display: none;
}

```

用上`:is`这个选择器后，CSS代码可以缩短为：
```CSS

:is(html[lang="en-GB"], html[lang="ru-RU"]) #top-bar-wrap {
    display: none;
}

```


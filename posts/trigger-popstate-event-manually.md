---
title: '手动触发popstate事件'
date: '2022-05-10'
description: 'How to trigger popstate event manually'
isPublished: ''
tags: ['javascript']
---

在写原生Javascript路由（routing）时，有的时候仅仅靠`history.pushState()`并不能触发一个`popstate`事件。那么, 我们可以像下面这样通过`PopStateEvent()`构造函数来手动触发一个`popstate`事件。

```javascript

let state = {
  firstName: 'Brandon',
  lastName: 'Zhang'
}

history.pushState(state, '', url)
window.dispatchEvent(new PopStateEvent('popstate'))

```
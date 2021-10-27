---
title: 'Oxygen Slider元素css代码加载问题'
date: '2021-09-27'
description: 'Oxygen Slider元素css代码加载问题'
---

我最近开始学习使用Oxygen建站，在用slider元素设计首页轮播图时，加载网页或刷新网页会带来一个奇怪的效果，就是刚开始的轮播图不是全屏宽，会有一个左侧的margin，然后经过零点几秒后轮播图恢复正常100%宽度。

开了一个工单询问oxygen的技术支持后，得到的答复是因为在与slider相关的css代码加载完之前，slider的`html`元素已经加载结束了，所以会导致这个营销视觉效果的问题。

解决办法是在slider元素上面增加一个css类“hide-slider“，然后在**Advanced** > **Layout**里面将Visibility设置为"hidden"，接着在页面最前面添加一个Code Block，并在JavaScript项里添加以下代码：

```javascript

window.addEventListener('load', function () {
    document.querySelector(".hide-slider").style.visibility = "visible";
});

```

这个代码的作用是先等到页面加载结束后，再将slider的可见度调为可见，这样我这个问题就可以解决了。
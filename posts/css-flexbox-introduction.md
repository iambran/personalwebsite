---
title: 'CSS flexbox 精讲 #1 - 声明display: flex以及基础的几个属性介绍'
date: '2022-01-22'
description: 'css flexbox教程 #1 - 介绍，当声明display: flex之后，flex容器和flex元素会有哪些变化，新增哪些属性以及这个属性的初始值和基本介绍'
isPublished: ''
tags: ['css']
---

我今天在知乎和b站投稿了我的第一个flexbox精讲视频，想着是同步在我这个博客上面用文字记录下视频里面提到的一些关于flexbox的知识点，这些是我最初开始学习flexbox比较没有搞懂的地方，或者比较容易混淆的概念，才导致后面使用flexbox布局显得捉襟见肘，所以最近又重新看了一遍mdn文档，另外工作上面也使用的比较多，对flexbox有了新的一层认识，所以应该对刚刚接触flexbox的朋友们会有一些帮助。

```HTML

<section class="flex">
  <div class="flex-item">嗨，I'm flex item one.</div>
  <div class="flex-item">嗨，I'm flex item two, with few more words.</div>
</section>

```

```CSS

.flex {
  display: flex;
  outline: 2px dashed grey;
}

.flex-item {
  background-color: var(--flex-item-bg);
}

.flex-item:first-child {
  --flex-item-bg: orange;
}

.flex-item:nth-child(2) {
  --flex-item-bg: DarkSeaGreen;
}

```

添加dislay: flex;前
<section class="no-flex">
  <div class="flex-item">嗨，I'm flex item one.</div>
  <div class="flex-item">嗨，I'm flex item two, with few more words.</div>
</section>

<div class="mt-10vmin"></div>

添加dislay: flex;后
<section class="flex-brandonzhang_cn">
  <div class="flex-item">嗨，I'm flex item one.</div>
  <div class="flex-item">嗨，I'm flex item two, with few more words.</div>
</section>

<style>
.flex-brandonzhang_cn {
  display: flex;
  outline: 2px dashed grey;
}

.flex-item {
  background-color: var(--flex-item-bg);
}

.flex-item:first-child {
  --flex-item-bg: orange;
}

.flex-item:nth-child(2) {
  --flex-item-bg: DarkSeaGreen;
}
</style>


## 1. flex容器（flex container）属性介绍

2px的虚线代表了flex容器，当我们在flex容器上面声明display: flex之后，所有的flex元素（对应flex item，我暂时翻译为flex元素，mdn上面是翻译成flex项，但我读起来不是特别习惯）会按照他们的内容宽度排列在同一行上面。我们此时先不考虑flex元素，现在使用firefox开发者工具看下我们刚刚创建的这个flexbox弹性盒子。打开firefox开发者工具，找到flex容器，然后再右侧Layout标签下面可以看到有一个Flex Container，截图如下。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1642870382/brandonzhang.cn/Screenshot_2022-01-23_at_12.06.30_AM_at9fpd.png" alt="flexbox firefox浏览器截图">

截图中可以看到section.flex-brandonzhang.cn下面有两个值：`row`和`nowrap`，分别对应的是`flex-direction: row`和`flex-wrap: nowrap`。

```css

.flex {
  flex-direction: row; /* flex容器默认值 */
  flex-wrap: nowrap; /* flex容器默认值 */

  /* 
  flex-direction和flex-wrap还可以简写为flex-flow 
  但我总记不牢这些简写属性
  */
  flex-flow: row nowrap;
}

```

那么flex-direction上面还可以有其他3个属性，分别是`row-reverse`, `column`, `column-reverse`，我把这4个属性放在一起比较下。

1. flex-direction: row（默认值）
<section class="flex-brandonzhang_cn" style="margin-bottom: 10vmin;">
  <div class="flex-item">嗨，I'm flex item one.</div>
  <div class="flex-item">嗨，I'm flex item two, with few more words.</div>
</section>

2. flex-direction: row-reverse
<section class="flex-brandonzhang_cn" style="flex-direction: row-reverse; margin-bottom: 10vmin;">
  <div class="flex-item">嗨，I'm flex item one.</div>
  <div class="flex-item">嗨，I'm flex item two, with few more words.</div>
</section>

3. flex-direction: column
<section class="flex-brandonzhang_cn" style="flex-direction: column; margin-bottom: 10vmin;">
  <div class="flex-item">嗨，I'm flex item one.</div>
  <div class="flex-item">嗨，I'm flex item two, with few more words.</div>
</section>

4. flex-direction: column-reverse
<section class="flex-brandonzhang_cn" style="flex-direction: column-reverse; margin-bottom: 10vmin;">
  <div class="flex-item">嗨，I'm flex item one.</div>
  <div class="flex-item">嗨，I'm flex item two, with few more words.</div>
</section>


## 2. flex元素（flex item）属性介绍

当在flex容器上面声明display: flex;之后，所有flex容器的直系子元素（direction children）都会成为flex元素，那么在flex元素上面会有3个属性，分别是`flex-basis`, `flex-grow`, `flex-shrink`。那么我当初在学习flexbox时犯的一个错误是没有搞懂这三个属性的一个默认值，所以我这里必须需要着重介绍下。

目前因为我还没有在flex元素上面添加任何属性，除了之前定义的背景颜色。这种情况打开firefox开发者工具检查CSS是看不到他们的值的，那么我们可以写一些简单的JavaScript代码来帮我们找到答案。

```javascript

// 选中第一个flex元素
let firstItem = document.querySelectorAll('.flex-item')[0];

// 获取第一个flex元素的所有样式属性
let computedStyles = window.getComputedStyle(firstItem);

// 获取所有样式属性中的flex-basis属性值
let flexBasis = computedStyles.getPropertyValue('flex-basis');
// 获取所有样式属性中的flex-grow属性值
let flexGrow = computedStyles.getPropertyValue('flex-grow');
// 获取所有样式属性中的flex-shrink属性值
let flexShrink = computedStyles.getPropertyValue('flex-shrink');

// 将flex-basis, flex-grow, flex-shrink分别打印到控制台
console.log(`flex-basis is ${flexBasis}`);
console.log(`flex-grow is ${flexGrow}`);
console.log(`flex-shrink is ${flexShrink}`);

```

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1642870381/brandonzhang.cn/Screenshot_2022-01-23_at_12.44.02_AM_pusqlv.png" alt="flexbox入门和精讲教程">

那么我们从控制台的截图可以看到，`flex-basis`默认值为`auto`，`flex-grow`默认值为`0`，`flex-shrink`默认值为`1`。
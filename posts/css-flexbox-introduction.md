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
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
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
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>

<div class="mt-10vmin"></div>

添加dislay: flex;后
<section class="flex-brandonzhang_cn">
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>

<style>
.flex-brandonzhang_cn {
  display: flex;
  outline: 2px dashed grey;
}

.flex-item {
  background-color: var(--flex-item-bg);
}

.flex-item:nth-child(odd) {
  --flex-item-bg: orange;
}

.flex-item:nth-child(even) {
  --flex-item-bg: DarkSeaGreen;
}
</style>


## 1. flex容器（flex container）属性介绍

2px的虚线代表了flex容器，当我们在flex容器上面声明display: flex之后，所有的flex元素（对应flex item，我暂时翻译为flex元素，mdn上面是翻译成flex项，但我读起来不是特别习惯）会按照他们的内容宽度排列在同一行上面。我们此时先不考虑flex元素，现在使用firefox开发者工具看下我们刚刚创建的这个flexbox弹性盒子。打开firefox开发者工具，找到flex容器，然后再右侧Layout标签下面可以看到有一个Flex Container，截图如下。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1642870382/brandonzhang.cn/Screenshot_2022-01-23_at_12.06.30_AM_at9fpd.png" alt="flexbox firefox浏览器截图">

截图中可以看到section.flex-brandonzhang.cn下面有两个值：`row`和`nowrap`，分别对应的是`flex-direction: row`和`flex-wrap: nowrap`。

```css

.flex {
  flex-direction: row; /* flexbox默认值 */
  flex-wrap: nowrap; /* flexbox默认值 */

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
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>

2. flex-direction: row-reverse
<section class="flex-brandonzhang_cn" style="flex-direction: row-reverse; margin-bottom: 10vmin;">
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>

3. flex-direction: column
<section class="flex-brandonzhang_cn" style="flex-direction: column; margin-bottom: 10vmin;">
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>

4. flex-direction: column-reverse
<section class="flex-brandonzhang_cn" style="flex-direction: column-reverse; margin-bottom: 10vmin;">
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>


flex-wrap属性则是规定当flex容器宽度不能装下里面的所有flex元素时，出现overflow的那些flex元素会不会跳到新的一行的问题。那么默认情况下`flex-wrap: nowrap;`，当flex容器宽度不够装下所有flex元素时，溢出的flex元素都还会保持在同一行，不会跳到新的一行，也就是下面这种情况。

<section class="flex-brandonzhang_cn">
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>


<div class="mt-10vmin"></div>

那么`flex-wrap: wrap`情况则是：
<section class="flex-brandonzhang_cn" style="flex-wrap: wrap;">
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>


OK，看到这里，刚接触flexbox的朋友（包括当初的我）会觉得很奇怪，为什么这两个属性带来的布局相差这么多。那么这个问题暂时先放一放，等下面我介绍完flex元素上面的属性后再回来解释这里会更容易理解一些。


## 2. flex元素（flex item）属性介绍

当在flex容器上面声明display: flex;之后，所有flex容器的直系子元素（direct children）都会成为flex元素，那么在flex元素上面会有3个属性，分别是`flex-basis`, `flex-grow`, `flex-shrink`。那么我当初在学习flexbox时犯的一个错误是没有搞懂这三个属性的一个默认值，所以我这里必须需要着重介绍下。

目前因为我还没有在flex元素上面添加任何属性，除了之前定义的背景颜色。这种情况打开firefox开发者工具检查CSS是看不到他们的值的，那么我们可以写一些简单的JavaScript代码来帮我们找到答案。当然，我们可以查看文档来了解这些属性的默认值，但是我自己觉得通过JavaScript打印到控制台显得更心安一些，也不知为何。

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

### a) flex-basis属性

flex-basis属性代表flex元素最开始占据的宽度（在受到flex-grow和flex-shrink两个属性影响之前），那么默认值是auto，宽度则是刚刚好装下flex元素里面内容的一个宽度，不多不少，类似于我们在div上面定义一个`width: fit-content;`。

### b) flex-grow属性

flex-grow属性的意思是，当flex容器宽度分配给里面的所有flex元素之后，剩余的空间再按多少比例对应的分配给每个flex元素的概念。flex元素的flex-grow默认值是0，就是说当flex容器还有剩余空间的时候，flex元素不会自动增加他们的宽度以填充整个flex容器剩余的宽度，也就是我们刚开始声明display: flex之后的这个情况。

<section class="flex-brandonzhang_cn">
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>

如果我们想要让flex容器剩余的空间按照1:1的比例分配给这两个flex元素，那么可以增加：

```css

.flex-item {
  flex-grow: 1;
}

/* 或者flex-grow: 200，只要他们两个的数值是一样的，都是按照1:1的比例分配 */
.flex-item {
  flex-grow: 200;
}

```

<section class="flex-brandonzhang_cn">
  <div class="flex-item" style="flex-grow: 1">flex item one.</div>
  <div class="flex-item" style="flex-grow: 1">flex item two...</div>
</section>

可以看到，他们得到的剩余空间的比例是相等的。


<div class="mt-10vmin"></div>
如果说想要第一个flex元素分配到的宽度是第二个flex元素的2倍，css可以改成：

```css

.flex-item:first-child {
  flex-grow: 2;
}

.flex-item:nth-child(2) {
  flex-grow: 1;
}

```

<section class="flex-brandonzhang_cn">
  <div class="flex-item" style="flex-grow: 2">flex item one.</div>
  <div class="flex-item" style="flex-grow: 1">flex item two...</div>
</section>

现在，第一个flex元素分配到的宽度是第二个的2倍。

### c) flex-shrink属性

flex-shrink属性是当flex容器宽度缩小至装不下所有的flex元素时，前面已经说过，flex-shrink默认值是1，那么flex元素会按照比例（类似flex-grow）各自减小自己的宽度让flex容器不出现overflow，那么我们现在再回过去看下我们之前提到的那两个例子。

再次提醒，三个属性默认值是：`flex-basis: auto`, `flex-grow: 0`, `flex-shrink: 1`。

这是我们最开始只在flex容器上面声明display: flex的效果，flex元素的flex-basis等于auto，那么就会按照内容的最大宽度(max-content)，排列在同一行上面。可以想象flex容器为一个公司的办公室，那么这两个flex元素是办公室里面2个员工的办公区域，因为目前办公室够大，所以两个人的办公区域都按照他们各自的需求占据，根据他们办公设备和桌椅的大小划分（也就是flex元素里面的内容）。

<section class="flex-brandonzhang_cn">
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>

<div class="mt-10vmin"></div>

但是因为是初创公司，只能租一个小办公室，当员工增加时，如果办公室不能坐下所有的员工，那么flex-shrink: 1告诉所有这些员工，你们需要缩小各自的办公区域，以保证大家有一个比较舒适的办公区域，此时flex元素的宽度将会从max-content慢慢往下缩小，那么大家同样的按比例减小自己的办公区域，因为所有人的flex-shrink都等于1，也就是下面的这个情况，但是不能小于每个flex元素的最小值min-content。

<section class="flex-brandonzhang_cn">
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>

<div class="mt-10vmin"></div>


那么，当`flex-wrap: wrap`时又是另外一个情况了。此时这个公司可能有着雄厚的资金，有新晋员工时，当前办公室坐不下所有人的话，就再租新的一间办公室来容纳新员工，这样可以保证大家的办公区域足够宽阔，工作氛围好了，才能提高员工的团队凝聚力和产出。即然有新的办公室，那么大家就都不用缩小自己的办公室区域了，还是按照最初的flex-basis: auto来操作。

<section class="flex-brandonzhang_cn" style="flex-wrap: wrap;">
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
</section>

<div class="mt-10vmin"></div>

那么这里面每个新的办公室，也就是新的一个flexbox容器，里面的flex元素仅仅会在他们所在的那行根据自身的flex-basis, flex-grow, flex-shrink进行布局。假设我们最后进公司的是一位总监，需要单独的一个办公室，那么可以给他增加一个`flex-basis: 100%`。

<section class="flex-brandonzhang_cn" style="flex-wrap: wrap;">
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item">flex item two...</div>
  <div class="flex-item">flex item one.</div>
  <div class="flex-item" style="flex-basis: 100%;">flex item two...</div>
</section>

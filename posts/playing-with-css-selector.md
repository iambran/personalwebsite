---
title: 'h1 ~ span:not(h1 ~ span + span)'
date: '2022-01-20'
description: 'h1 ~ span:not(h1 ~ span + span), 通过css相邻兄弟选择器选中第一个元素之后的兄弟元素，但是这个兄弟元素不是紧跟在第一个元素之后'
isPublished: ''
tags: ['CSS']
---

昨天知乎上有一位朋友提了这么一个问题，怎么使用相邻兄弟选择器“+”选中`h1`后面的这个`<span>We are targeting this span element.</span>`元素。

```html

<div class="container">
  <span>This is a span element.</span>
  <span>This is a span element.</span>
  <span>This is a span element.</span>
  <h1>Heading</h1>
  <p>This is a p element</p>
  <span>We are targeting this span element.</span>
  <span>This is a span element.</span>
  <span>This is a span element.</span>
  <span>This is a span element.</span>
  <span>This is a span element.</span>
</div>

```

如果我们的目标`span`元素是紧跟着`h1`，那么`h1 + span`就搞定了，但是`h1`和目标`span`中间多了一个`p`元素，所以需要找其他方法。

```css

h1 + span {
  background-color: orange;
}

```

接下来我们的第一直觉是可能想到`h1 ~ span:nth-of-type(1)`，但是在`h1`前面还有其他`span`元素，所以这个方法也是不行的。

```css

h1 ～ span:nth-of-type(1) {
  background-color: orange;
}

```

## 我的思路

首先找到`h1`后面的所有`span`，但需要排除这里面的第一个`span`。

```css

h1 ～ span + span {
  background-color: orange;
}

```

<!-- <div class="play-width-css-selector1">
  <span>This is a span element.</span>
  <span>This is a span element.</span>
  <span>This is a span element.</span>
  <h1>Heading</h1>
  <p>This is a p element</p>
  <span>We are targeting this span element.</span>
  <span>This is a span element.</span>
  <span>This is a span element.</span>
  <span>This is a span element.</span>
  <span>This is a span element.</span>
</div> -->

<style>
.play-width-css-selector1 {
  display: grid;
  align-items: center;
  justify-items: start;
  margin: 0;
  box-sizing: border-box;
  text-align: left;
}

.play-width-css-selector1 * {
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  margin: 0;
  margin-block: 0.2rem;
  border-radius: 5px;
}

.play-width-css-selector1 h1 {
  font-size: 4rem;
}

.play-width-css-selector1 p {
  font-size: 3rem;
}

.play-width-css-selector1 h1 ～ span + span {
  background-color: orange;
}

</style>

然后利用反选伪类`:not`，找到所有不含第1步里面找到的`span`以外的其他所有`span`。这个选择器选中标题之前的所有`span`和标题之后的所有`span`中的第一个。

```css

:not(h1 ～ span + span) {
  background-color: orange;
}

```

最后前面再用一个通用兄弟选择器“～”，那么就可以选中我们的一个目标`span`元素了。

```css

h1 ~ :not(h1 ～ span + span) {
  background-color: orange;
}

```

## 还有一个思路

```css

:not(h1 ~ span + span):is(h1 ~ span) {
  background-color: orange;
}

```

---
title: 'CSS Only Arrow仅用CSS设计箭头'
date: '2021-10-07'
description: '如何使用纯css设计箭头，上下左右各个方向的箭头'
tags: ['css']
---

我已经在自己网站和客户网站都用css设计过简单的箭头，但是过段时间如果不看之前的代码，直接开始写箭头的css代码，总是会忘记一些细节，所以想通过这篇博客，好好的整理一下自己的思路。

我习惯在`<a></a>`上看增加一个伪元素来设计箭头，我增加一个css类别“has-arrow-left”，html如下：
```html

<a class="has-arrow-left">Back to Products</a>

```

1.先增加这些基础的css代码：
```css

.has-arrow-left {
    /* 需要按钮元素增加position: relative，然后伪元素通过position来移动它的位置 */
    position: relative;
}

.has-arrow-left::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 12px;
    height: 12px;
    /* border这边如果不添加color，默认的颜色就是按钮元素的颜色 */
    border-top: 2px solid;
    border-left: 2px solid;
    /* 备注：top: 50% 和 translateY(-50%) 结合使用可以使箭头垂直居中 */
    transform: translateY(-50%);
}

```

下面是第一步的css代码带来的效果，仔细看的话可以看到箭头是和首字母B重叠的。<br>
<a class="has-arrow-left-1">Back to Products</a>
<style>
.has-arrow-left-1 {
  position: relative;
}
.has-arrow-left-1::before {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  width: 12px;
  height: 12px;
  border-top: 2px solid;
  border-left: 2px solid;
  transform: translateY(-50%);
}
</style>

2.因为我给箭头设置的宽度是`12px`，那么我可以在`a`这边增加一个左侧的padding，比如`20px`：
```css

.has-arrow-left {
    position: relative;

    /* 增加20px左侧padding */
    padding-left: 20px;
}

.has-arrow-left::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 12px;
    height: 12px;
    border-top: 2px solid;
    border-left: 2px solid;
    transform: translateY(-50%);
}

```

增加left padding 20px后效果如下：<br>
<a class="has-arrow-left-2">Back to Products</a>
<style>
.has-arrow-left-2 {
  position: relative;
  padding-left: 20px;
}
.has-arrow-left-2::before {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  width: 12px;
  height: 12px;
  border-top: 2px solid;
  border-left: 2px solid;
  transform: translateY(-50%);
}
</style>

3.旋转箭头，让它指向左，增加`transform: rotate(-45deg)`：
```css

.has-arrow-left {
    position: relative;
    padding-left: 20px;
}

.has-arrow-left::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 12px;
    height: 12px;
    border-top: 2px solid;
    border-left: 2px solid;
    /* 备注：增加rotate(-45deg)使剪头指向左 */
    transform: translateY(-50%) rotate(-45deg);
}

```
增加`transform: rotate(-45deg)`后效果如下：<br>
<a class="has-arrow-left-3">Back to Products</a>
<style>
.has-arrow-left-3 {
  position: relative;
  padding-left: 20px;
}
.has-arrow-left-3::before {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  width: 12px;
  height: 12px;
  border-top: 2px solid;
  border-left: 2px solid;
  transform: translateY(-50%) rotate(-45deg);
}
</style>

只要掌握了这个知识，那么设计向上/向右/向下的箭头就很简单了：


a) **向上箭头** （css类别是has-arrow-up）
```css

.has-arrow-up {
    position: relative;
    padding-left: 20px;
}

.has-arrow-up::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 12px;
    height: 12px;
    border-top: 2px solid;
    border-left: 2px solid;
    /* 45deg */
    transform: translateY(-50%) rotate(45deg);
}

```
<a class="has-arrow-up">回到顶部</a>
<style>
.has-arrow-up {
  position: relative;
  padding-left: 20px;
}
.has-arrow-up::before {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  width: 12px;
  height: 12px;
  border-top: 2px solid;
  border-left: 2px solid;
  transform: translateY(-50%) rotate(45deg);
}
</style>

b) **向右箭头** （css类别是has-arrow-right）

```css

.has-arrow-right {
    position: relative;
    padding-left: 20px;
}

.has-arrow-right::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 12px;
    height: 12px;
    border-top: 2px solid;
    border-left: 2px solid;
    /* 135deg */
    transform: translateY(-50%) rotate(135deg);
}

```

<a class="has-arrow-right">了解更多</a>
<style>
.has-arrow-right {
  position: relative;
  padding-left: 20px;
}
.has-arrow-right::before {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  width: 12px;
  height: 12px;
  border-top: 2px solid;
  border-left: 2px solid;
  transform: translateY(-50%) rotate(135deg);
}
</style>

> 向右的箭头，需要把箭头放到文字右侧，可以将`padding-left`改成`padding-right`，`left: 0`改成`right: 0`:

```css

.has-arrow-right {
    padding-right: 20px;
}

.has-arrow-right::before {
    right: 0;
}

```

<a class="has-arrow-right-2">了解更多</a>
<style>
.has-arrow-right-2 {
  position: relative;
  padding-right: 20px;
}
.has-arrow-right-2::before {
  position: absolute;
  content: "";
  top: 50%;
  right: 0;
  width: 12px;
  height: 12px;
  border-top: 2px solid;
  border-left: 2px solid;
  transform: translateY(-50%) rotate(135deg);
}
</style>

向下的箭头相应调整旋转的角度即可，即`rotate(225deg)`。
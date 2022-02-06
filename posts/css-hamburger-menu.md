---
title: 'CSS构建汉堡包按钮（hamburger menu）'
date: '2022-02-06'
description: 'CSS构建汉堡包按钮（hamburger menu），使用span元素和absolute positiong设计汉堡包按钮（hamburger menu）'
isPublished: ''
tags: ['css']
---

这篇博客介绍使用span元素和absolute positiong构建一个汉堡包按钮(hamburger menu)，并使用transform来设计一个从汉堡包按钮到关闭按钮的一个转换。其实一直以来在心底觉得可以很顺利的设计这样的按钮，但是从没有真正练习过，之前也都是借助fontawesome或者svg图标来实现。

使用开发者工具看互联网企业网站的代码已经成为我的日常，今天看[Netlify](https://www.netlify.com/)网站，有注意到他们在菜单栏上面有使用`details`和`summary`，然后netlify网站的汉堡包按钮（需要将浏览器宽度缩小至移动端宽度才能看到，或者用手机访问netlify.com）是包裹在`summary`元素里面，点击`summary`，`details`元素会增加一个`open`属性，借助这个属性来控制汉堡包按钮svg元素的形状。

我对svg没有那么熟悉，所以就考虑换一种方法来设计汉堡包按钮。同样也需要用到`details`和`summary`元素，例如这样的一个html结构。如果对`details`元素不熟悉的话，可以参考mdn文档上面关于[details](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/details)元素的介绍。

```html

<details class="hamburger-menu-wrap">
  <summary class="hamburger-menu">
    <span class="hamburger-menu__line"></span>
    <span class="hamburger-menu__line"></span>
    <span class="hamburger-menu__line"></span>
  </summary>
</details>

```

我需要增加一些基础的css代码，让这个details元素渲染在前端。

```css

.hamburger-menu {
  list-style: none; /* summary元素默认会有一个三角形箭头，可以使用这个行代码删除箭头 */
  cursor: pointer;
  width: 4rem;
  height: 2.8rem;
  position: relative;
}

.hamburger-menu::-webkit-details-marker {
  display: none;
}

.hamburger-menu__line {
  display: block;
  width: 4rem;
  height: .6rem;
  background-color: #333;
  transition: .5s;
  position: absolute;
}

.hamburger-menu__line:first-child {
  top: 0;
}

.hamburger-menu__line:nth-child(2) {
  top: calc(50% - 0.3rem); 
}

.hamburger-menu__line:last-child {
  bottom: 0;
}

```

添加完上面的css代码后，前端会是下面这样的效果，带有颜色的div代码没有写在上面，我是为了观看体验，另外添加的，请不要被这个误导。目前鼠标点击按钮，三条直线没有任何变化。

<div style="background: var(--dark-theme-underline, #cc99cd); padding: 6rem 2rem; border-radius: 1rem;">
<details class="hamburger-menu-wrap">
  <summary class="hamburger-menu">
    <span class="hamburger-menu__line"></span>
    <span class="hamburger-menu__line"></span>
    <span class="hamburger-menu__line"></span>
  </summary>
</details>
</div>

<style>
.hamburger-menu {
  list-style: none; /* summary元素默认会有一个三角形箭头，可以使用这个行代码删除箭头 */
  cursor: pointer;
  width: 4rem;
  height: 2.8rem;
  position: relative;
  margin: auto;
}

/* 在safari浏览器中隐藏箭头需要增加这行代码 */
.hamburger-menu::-webkit-details-marker {
  display: none;
}

.hamburger-menu__line {
  display: block;
  width: 4rem;
  height: .6rem;
  background-color: #333;
  transition: .5s;
  position: absolute;
}

.hamburger-menu__line:first-child {
  top: 0;
}

.hamburger-menu__line:nth-child(2) {
  top: calc(50% - 0.3rem); 
}

.hamburger-menu__line:last-child {
  bottom: 0;
}
</style>

下一步就是需要鼠标点击汉堡包按钮时，形状变成一个关闭的“x”的图标。最开始提到过，点击`summary`元素，会在`details`元素上面增加一个`open`属性，那么我现在可以增加这些css代码。

```css

/* 隐藏中间那条直线 */
.hamburger-menu-wrap[open] .hamburger-menu__line:nth-child(2) {
  display: none;
}

/* 将上面那条直线移到中间，并旋转-45deg */
.hamburger-menu-wrap[open] .hamburger-menu__line:first-child {
  top: calc(50% - 0.3rem);
  transform: rotate(-45deg);
  transform-origin: center;
}

/* 将下面面那条直线也移到中间，并旋转45deg */
.hamburger-menu-wrap[open] .hamburger-menu__line:last-child {
  top: calc(50% - 0.3rem);
  transform: rotate(45deg);
  transform-origin: center;
}

```

现在，点击汉堡包按钮后，图标形状将会从汉堡包变成“x”关闭按钮形状。

<div style="background: var(--dark-theme-underline, #cc99cd); padding: 6rem 2rem; border-radius: 1rem;">
<details class="hamburger-menu-wrap hamburger-menu-wrap--presentable">
  <summary class="hamburger-menu">
    <span class="hamburger-menu__line"></span>
    <span class="hamburger-menu__line"></span>
    <span class="hamburger-menu__line"></span>
  </summary>
</details>
</div>

<style>
.hamburger-menu {
  list-style: none; /* summary元素默认会有一个三角形箭头，可以使用这个行代码删除箭头 */
  cursor: pointer;
  width: 4rem;
  height: 2.8rem;
  position: relative;
  margin: auto;
}

.hamburger-menu::-webkit-details-marker {
  display: none;
}

.hamburger-menu__line {
  display: block;
  width: 4rem;
  height: .6rem;
  background-color: #333;
  transition: .5s;
  position: absolute;
}

.hamburger-menu__line:first-child {
  top: 0;
}

.hamburger-menu__line:nth-child(2) {
  top: calc(50% - 0.3rem); 
}

.hamburger-menu__line:last-child {
  bottom: 0;
}

.hamburger-menu-wrap--presentable[open] .hamburger-menu__line:nth-child(2) {
  display: none;
}

.hamburger-menu-wrap--presentable[open] .hamburger-menu__line:first-child {
  top: calc(50% - 0.3rem);
  transform: rotate(-45deg);
  transform-origin: center;
}

.hamburger-menu-wrap--presentable[open] .hamburger-menu__line:last-child {
  top: calc(50% - 0.3rem);
  transform: rotate(45deg);
  transform-origin: center;
}

</style>
---
title: 'Intersection Observer API学习笔记'
date: '2022-02-13'
description: 'Intersection Observer API学习笔记'
tags: ['javascript']
published: true
---

Intersection Observer API提供了一个异步检测目标元素和祖先元素或顶级文档视窗(viewport)交叉情况的方法。

## 创建一个 IntersectionObserver 对象和监听元素

使用`IntersectionObserver()`构造函数创建并返回一个`Intersection Observer`对象，在这个构造函数中传入需要触发执行的回调函数和所需参数(options)。找到我们需要观察的目标元素，调用`Intersection Observer`对象当中的`observe()`方法来观察我们的目标元素。

```javascript

// 创建一个IntersectionObserver对象
let observer = new IntersectionObserver(handleIntersect, options);

// 找到我们的监听元素，假设我们需要观察<div id="target-element"></div>
let target = document.querySelector('#target-element');

// 调用IntersectionObserver对象自身的observe()方法，依据options中给定的环境，来观察目标元素
// 如果options中的条件达到，则会触发handleIntersect函数
observer.observe(target);

```

## 创建options对象

`IntersectionObserver()`构造函数所需的`options`对象可以定义3个属性，分别是`root`，`rootMargin`，`threshold`。

```javascript

let options = {
  // 根元素：用来检测目标元素的可见比例，必须是目标元素的祖先元素。
  // 如果未指定或者为null，那么默认为顶级文档视窗(viewport)。
  root: null,

  // 根元素外边距（默认值是"0px 0px 0px 0px"）。
  // 值可以为像素或者百分比
  rootMargin: '0px',

  // 交叉阔值：目标元素在根元素可见比例（默认值为[0]）。
  // 可以是一个具体数值，或是一组0.0到1.0之间的数组。
  // 0.0表示目标元素没有进入根元素
  // 1.0表示目标元素已经完全进入根元素（100%可见）
  threshold: 1.0
}

```

`options`可以省略，如果省略，里面三个属性即是前面提到的默认值。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1644746627/brandonzhang.cn/Screenshot_2022-02-13_at_4.59.31_PM_d8r69d.png" alt="控制台打印entry属性">

## 创建handleIntersect回调函数

每当目标元素在根元素中的可见比例超过threshold阔值时，都会调用`handleIntersect()`回调函数，此回调函数接受两个参数：`entries`和`observer`。

```javascript

function handleIntersect(entries, observer) {
  // 数组，如果是单个目标元素，则entries打印出来是Array(0)
  // entries并不是目标元素可见比例超过阔值才有
  // 加载页面时就会有，只不过此时entry.isIntersecting等于false
  // console.log(entries)
  entries.forEach(entry => {
    // console.log(entry)
    // entry上面有这些属性
    // entry.boundingClientRect
    // entry.intersectionRatio (常用)
    // entry.intersectionRect
    // isIntersecting只有当交叉比例大于阔值时，才会从false变成true。
    // entry.isIntersecting （常用）
    // entry.rootBounds
    // entry.target （常用）
    // entry.time
  });
}

// 假设阔值(threshold)上面的数组为：[0.1, 0.2, 0.3]
// 那么当目标元素可见比例大于0.1时记一次entry，大于0.2时记一次entry，大于0.3时记一次entry

```

将这些结合起来。

```javascript

window.addEventListener('load', createObserver(), false);

function createObserver() {
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8
  }

  let observer = new IntersectionObserver(handleIntersect, options);
  let target = document.querySelector('#target-element');
  observer.observe(target);
}

function handleIntersect() {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // do something here
    }
  });
}

```

`Intersection Observer`对象自身还有另外3个方法。

```javascript

// 终止对所有目标元素可见性变化的观察。
intersectionObserver.disconnect();

// 停止对一个元素的观察。
IntersectionObserver.unobserve(target);

// 返回一个IntersectionObserverEntry对象数组, 每个对象的目标元素都包含每次相交的信息。
intersectionObserverEntries = intersectionObserver.takeRecords();

```
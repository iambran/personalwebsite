---
title: 'html元素字体设置小技巧'
date: '2021-08-25'
---


最近读了[Sara Soueidan](https://www.sarasoueidan.com/)的博客, 我用开发者工具检查了她网站的css代码，发现她在html这里的字体设置使用的是`font-size: calc(15px + 0.25vw)`，然后body使用的字体大小是`1rem`。

`rem`这个单位是基于`html`元素字体大小来计算的，如`html`字体大小为16px，那么`1rem`等于16px，`2rem`等于32px. `vw`是viewport width，`100vw`等于100%的屏幕宽度，那么这里`0.25vw`就是0.25%的屏幕宽度，这样`html`的字体大小就可以跟随屏幕的宽度自适应，比单独使用`font-size: 16px`这种方法更好一些。

```css

html {
    font-size: calc(15px + 0.25vw);
}

body {
    font-size: 1rem; 
}

```

还有另外一个设置responsive字体大小的方法是可以使用clamp这个函数，最近在设计网站时，使用的是Oxygen Page Builder，通常我们使用这类排版工具，都会先设置好大屏的字体大小，比如`h1`设置为`50px`，然后转换到平板端，再将字体调小，最后缩小手机移动端的字体大小，其实这样会加重我们的工作量，恰巧的是Oxygen在设置字体大小时自由度较高，可以插入类似clamp这样的公式。要使用clamp，这个网站非常好用 [Fluid-responsive font-size calculator](https://websemantics.uk/tools/responsive-font-calculator/)。

打开这个网站后，假设我们想让h1在移动端的字体大小为`30px`，移动端的频宽为`320px`，在宽频比如`1920px`电脑上的字体大小为`50px`，那么我们在Range那一栏分别填入`30px`和`50px`，在Viewport那一栏填入`320px`和`1920px`，CSS Method勾选clamp，那么会生成这样的clamp函数，就可以使用在h1或者其他元素上面。

```css

font-size: clamp(30px, calc(1.875rem + ((1vw - 3.2px) * 1.25)), 50px);

```

更多关于clamp函数的介绍，可以阅读 [https://developer.mozilla.org/zh-CN/docs/Web/CSS/clamp()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clamp())
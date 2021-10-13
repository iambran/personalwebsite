---
title: 'CSS min()数学函数的妙用'
date: '2021-10-13'
keywords: 'css min()函数，css min()数学函数，css min() function解释'
description: 'CSS min()数学函数，选取较小的值作为该函数的最终值，可以使我们的css代码更简化，更灵活。'
isPublished: ''
---

在接触CSS `min()`数学函数之前，如果我们需要将下面的container的宽度设置为`70ch`，最大允许宽度不超过`100%`，通常的css写法是：

```css

.container {
    width: 70ch;
    max-width: 100%;
}

```

上面的`width: 70ch`和`max-width: 100%`可以使用数学函数`min()`代替：
```css

.container {
    width: min(70ch, 100%);
}

```

`min()`函数会自动选择`70ch`，`100%`两个值中的小值作为container的宽度。当页面宽度大于`70ch`时，`70ch`小于`100%`，那么`min()`函数就会选择`70ch`作为container的宽度；当页面宽度小于`70ch`时【通常在移动端或者电脑用户缩小浏览器宽度时】，`70ch`大于`100%`，那么`min()`函数则选择`100%`作为container的宽度。

另外，`min()`函数里面也可以接受计算方式，我们可以将`100%`改成`100% - 2rem`，然后增加一个`margin-inline: auto`，这样在宅屏时，container左右两侧各有`1rem`的呼吸空间。
```css

.container {
    width: min(70ch, 100% - 2rem);
    margin-inline: auto;
}

```
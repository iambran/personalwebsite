---
title: 'html元素字体设置小技巧'
date: '2021-08-25'
---


最近读了[Sara Soueidan](https://www.sarasoueidan.com/)的博客, 我用开发者工具检查了她网站的css代码，发现她在html这里的字体设置使用的是 `font-size: calc(15px + 0.25vw)`，然后body使用的字体大小是 `1rem`。

`rem` 这个单位是基于 `html` 元素字体大小来计算的，如 `html` 字体大小为16px，那么 `1rem` 等于16px，`2rem` 等于32px. `vw` 是viewport width，`100vw` 等于100%的屏幕宽度，那么这里 `0.25vw` 就是0.25%的屏幕宽度，这样 `html` 的字体大小就可以跟随屏幕的宽度自适应，比单独使用 `font-size: 16px` 这种方法更好一些。

```css

html {
    font-size: calc(15px + 0.25vw);
}

body {
    font-size: 1rem; 
}

```


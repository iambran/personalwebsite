---
title: 'Oxygen笔记'
date: '2022-04-19'
description: 'Wordpress Oxygen编辑器笔记'
tags: ['wordpress', 'oxygen']
isPublished: ''
---

```html

<section id="section-(random-id)" class="ct-section">
  <div class="ct-section-inner-wrap">

  </div>
</section>

<!-- 对应的样式表 -->
<style>
  .ct-section { /* universal.css */
    width: 100%;
    background-size: cover;
    background-repeat: repeat;
  }
  .ct-section-inner-wrap { /* oxygen.css */
    margin-left: auto;
    margin-right: auto;
    height: 100%;
  }
  .ct-section > .ct-section-inner-wrap { /* universal.css */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  /* Setting -> Global Styles -> Sections & Columns */
  .ct-section-inner-wrap { /* universal.css */
    padding-top: 75px;
    padding-right: 20px;
    padding-bottom: 75px;
    padding-left: 20px;
  }
  /* Setting -> Global Styles -> Widths & Breakpoints */
  /* Page Width - Oxygen默认1170px */
  .ct-section-inner-wrap, .oxy-header-container {
    max-width: 1170px;
  }
  /* Settings -> Page Settings -> Page Width 会覆盖掉上面的数值 */
  div.ct-section-inner-wrap, div.oxy-header-container {
    max-width: 1300px;
  }

  /* Setting -> Global Styles -> Body Text */
  body { /* 默认样式 */
    line-height: 1.6;
    font-size: 16px;
    font-weight: 400;
    color: #404040;
  }

</style>

```

## 1. 设置body基本font-weight, color

Setting -> Global Styles -> Body Text

## 2. 当section里面增加了一个div之后


```html

<section id="section-(random-id)" class="ct-section">
  <div class="ct-section-inner-wrap">
    <div id="div_block-(random-id)" class="ct-div-block">

    </div>
  </div>
</section>

<!-- 对应的样式表 -->
<style>
  .ct-div-block { /* universal.css */
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: flex-start;
  }
</style>

```
## 3. 在section上面添加背景图片将是100%宽度，在section里面添加一个div，因为flexbox默认align-items: flex-start，所以目前这个div渲染尺寸为0x0。此时想要让这个div宽度拉伸至100%，可以在section->primary->

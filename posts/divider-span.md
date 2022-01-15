---
title: '使用span元素设计分割线(divider)并尝试在CSS Grid中使用分割线'
date: '2022-01-15'
description: '使用span元素设计divider，并尝试使用CSS Grid看看能不能带来更好布局控制'
tags: ['css']
---

今天使用谷歌Firebase数据库来储存我这个博客网站的文章浏览数据，并通过组件`<ViewCounter >`渲染在博客标题的下方。但这篇文章并不是介绍如何添加这个文章阅读量的功能，是我在Firebase网站首页看到他们使用`span`元素来设计这个divider，这个是我之前没有接触到的，所以把它记录下来，供自己后面使用。

Firebase首页三个Call To Action按钮：

<div class="homepage-hero__content">
<div class="homepage-hero__ctas">
  <a class="cta-button cta-button--white">
    Get started
    </a>
  <a class="cta-link cta-link--white">
    Try demo
    </a>
  <span class="divider"></span>           
  <a class="cta-link cta-link--white">
    Watch video
  </a>
</div>
</div>

<style>
  .homepage-hero__content {
    background-color: #1967D2;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding-block: 10rem;
  }

  .homepage-hero__ctas {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .cta-button {
    margin-right: 30px;
    color: #1a73e8;
    background-color: #fff;
    text-decoration: none;
    border-radius: 8px;
    padding: 20px 52px;
    font-size: 20px;
    line-height: 16px;
    font-weight: bold;
    display: inline-block;
  }

  .cta-link {
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    letter-spacing: 0.57px;
    padding: 6px 8px;
    color: #fff;
    text-decoration: none;
    display: inline-block;
    border-radius: 8px;
  }

  .cta-link:nth-child(2) {
    margin-right: 20px;
  }

  .cta-link:nth-child(n+3) {
    margin-left: 20px;
  }

  .cta-link:hover {
    background-color: rgba(255,255,255,.2);
  }

  .divider {
    color: #fff;
    display: inline-block;
    height: 30px;
    width: 1px;
    opacity: .6;
    background: #fff;
  }
</style>

```html

<div class="homepage-hero__ctas">
  <a href="#" class="cta-button cta-button--white">
    Get started
    </a>
  <a href="#" class="cta-link cta-link--white">
    Try demo
  </a>
  <span class="divider"></span>           
  <a class="cta-link cta-link--white">
    Watch video
  </a>
</div>

```

```CSS

/* 使用span元素来设计分割线 */
.divider {
  color: #fff;
  display: inline-block;
  height: 30px;
  width: 1px;
  opacity: .6;
  background: #fff;
}

```
<!-- <div class="mt-5vmin"></div> -->

## CSS Grid网格布局中设计分割线。

由此，我想尝试是否可以在CSS Grid网格布局中定义其中的一个网格轨道宽度为1px，并把分割线放置于该网格轨道中。

```html

<div class="example-grid">
  <div class="card"></div>
  <span class="divider"></span>
  <div class="card"></div>
  <span class="divider"></span>
  <div class="card"></div>
</div>

```

```CSS

.example-grid {
  display: grid;
  grid-template-columns: 1fr 2px 1fr 2px 1fr;
  gap: 20px;
}

.example-grid__card {
  background: #ddd;
  border-radius: 8px;
  height: 200px;
}

.example-grid__divider {
  display: inline-block;
  opacity: .6;
  background: #ddd;
}

```

<div class="example-grid mt-5vmin">
  <div class="example-grid__card"></div>
  <span class="example-grid__divider"></span>
  <div class="example-grid__card"></div>
  <span class="example-grid__divider"></span>
  <div class="example-grid__card"></div>
</div>

<style>
  .example-grid {
    display: grid;
    grid-template-columns: 1fr 2px 1fr 2px 1fr;
    gap: 20px;
  }

  .example-grid__card {
    background: #ddd;
    border-radius: 8px;
    height: 200px;
  }

  .example-grid__divider {
    display: inline-block;
    opacity: .6;
    background: #ddd;
  }
</style>

## 引入自定义属性

目前分割线的宽度是2px，高度同卡片高度200px一样，因为网格元素默认是`align-items: stretch`，可以在`.example-grid`网格容器上面添加自定义属性来更好的控制分割线的宽度和高度。

```CSS

.example-grid {
  // 已有代码
  grid-template-columns: 1fr var(--divider-width) 1fr var(--divider-width) 1fr;

  --divider-width: 4px;
  --divider-height: 80%;
}

.example-grid__divider {
  // 已有代码
  height: var(--divider-height);
  align-self: center;
}


```

<div class="example-grid2 mt-5vmin">
  <div class="example-grid2__card"></div>
  <span class="example-grid2__divider"></span>
  <div class="example-grid2__card"></div>
  <span class="example-grid2__divider"></span>
  <div class="example-grid2__card"></div>
</div>

<style>
.example-grid2 {
  display: grid;
  grid-template-columns: 1fr var(--divider-width) 1fr var(--divider-width) 1fr;
  gap: 20px;

  --divider-width: 4px;
  --divider-height: 80%;
}

.example-grid2__card {
  background: #ddd;
  border-radius: 8px;
  height: 200px;
}

.example-grid2__divider {
  display: inline-block;
  opacity: .6;
  background: #ddd;
  height: var(--divider-height);
  align-self: center;
}
</style>


## 增加横向分割线

```html

<div class="example-grid">
  <!-- row 1 -->
  <div class="example-grid__card"></div>
  <span class="example-grid__divider"></span>
  <div class="example-grid__card"></div>
  <span class="example-grid__divider"></span>
  <div class="example-grid__card"></div>
  <!-- row 2 -->
  <span class="example-grid__divider example-grid__divider--horizontal"></span>
  <div></div>
  <span class="example-grid__divider example-grid__divider--horizontal"></span>
  <div></div>
  <span class="example-grid__divider example-grid__divider--horizontal"></span>
  <!-- row 3 -->
  <div class="example-grid__card"></div>
  <span class="example-grid__divider"></span>
  <div class="example-grid__card"></div>
  <span class="example-grid__divider"></span>
  <div class="example-grid__card"></div>
</div>

```

```CSS

.example-grid {
  // 已有代码
  grid-template-columns: 1fr var(--divider-width) 1fr var(--divider-width) 1fr;
  grid-template-rows: 1fr var(--divider-width) 1fr;

  --divider-width: 4px;
  --divider-height: 80%;
}

.example-grid__divider--horizontal {
  height: var(--divider-width);
  width: var(--divider-height);
  justify-self: center;
}

```

<div class="example-grid3 mt-5vmin">
  <!-- row 1 -->
  <div class="example-grid3__card"></div>
  <span class="example-grid3__divider"></span>
  <div class="example-grid3__card"></div>
  <span class="example-grid3__divider"></span>
  <div class="example-grid3__card"></div>
  <!-- row 2 -->
  <span class="example-grid3__divider example-grid3__divider--horizontal"></span>
  <div></div>
  <span class="example-grid3__divider example-grid3__divider--horizontal"></span>
  <div></div>
  <span class="example-grid3__divider example-grid3__divider--horizontal"></span>
  <!-- row 3 -->
  <div class="example-grid3__card"></div>
  <span class="example-grid3__divider"></span>
  <div class="example-grid3__card"></div>
  <span class="example-grid3__divider"></span>
  <div class="example-grid3__card"></div>
</div>

<style>
.example-grid3 {
  display: grid;
  grid-template-columns: 1fr var(--divider-width) 1fr var(--divider-width) 1fr;
  grid-template-rows: 1fr var(--divider-width) 1fr;
  gap: 20px;

  --divider-width: 4px;
  --divider-height: 80%;
}

.example-grid3__card {
  background: #ddd;
  border-radius: 8px;
  height: 200px;
}

.example-grid3__divider {
  display: inline-block;
  opacity: .6;
  background: #ddd;
  height: var(--divider-height);
  align-self: center;
}

.example-grid3__divider--horizontal {
  height: var(--divider-width);
  width: var(--divider-height);
  justify-self: center;
}
</style>

这个仅仅是我在瞎玩，很难想象有谁会在生产网站中使用这个，因为目前的html结构很乱，或许过段时间再回过来看还有些其他的想法。
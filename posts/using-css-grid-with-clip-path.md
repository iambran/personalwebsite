---
title: '使用CSS Grid和clip-path来创建别具一格的排版'
date: '2021-1027'
description: '使用CSS Grid和clip-path来创建一个别具一格的排版，将图片固定到css grid中，然后通过clip-path改变图片的形状，是他们的排版看起来很别致。'
---

今天继续介绍一下`clip-path`的妙用，将结合CSS Grid创建一个别具一格的网页排版。我在另外一篇博客[使用clip-path快速创建箭头](http://localhost:3000/posts/use-css-clip-path-to-create-arrow)，有简单介绍过`clip-path`这个属性。这里的倾斜效果和使用[skew()函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/skew())不一样，`skew()`函数会使图片扭曲，而使用`clip-path`不会扭曲图片，`clip-path`属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1635326136/brandonzhang.cn/Layout-5_svmglq.jpg" alt="css grid和clip-path结合使用的截图展示">

这是最终的效果，左边是三张标准的长方形图片，将他们分别布局到不同的网格当中，然后通过`clip-path`使他们渲染成倾斜的一个效果。

我添加的html结构如下：

```html

<section class="flex">
    <div class="grid">
        <div class="img-wrap">
            <!-- 第1张图片 -->
        </div>
        <div class="img-wrap">
            <!-- 第2张图片 -->
        </div>
        <div class="img-wrap">
            <!-- 第3张图片 -->
        </div>
    </div>

    <div class="content">
        <h2>崇敬西藏之美</h2>
        <p>
            藏傳佛教的渲染力，民宅別具特色的門梁與傳統的絢麗人文，讓西藏往往被視為一個神秘、遙不可及的天堂國度，這些獨特的風土文化卻是西藏人質樸、高雅生活中的一部分，同時也是他們純粹卻豐盛的心靈寄託。
            <br>
            從低海拔的林芝走入西藏，以世界最深的大峽谷著稱於世，一派蒼翠欲滴的森林雲海風光盡在眼前。戈壁湖邊的尼瑪石堆、傳統藝術家的木雕石鍋、隨風飄逸的五色風馬旗，遠眺布達拉宮，洗滌了俗世的塵擾。
        </p>
    </div>
</section>

```

```CSS

.flex {
    display: flex;
    margin-inline: 50px;
    align-items: center;
    min-height: 100vh;
    gap: 50px;
}

.content h2 {
    font-size: 6rem;
    color: #555;
}

.grid {
    display: grid;
    grid-template-columns: repeat(5, 120px);
    /* 使用vh单位让网格总高度占据视窗高度的90% */
    grid-template-rows: 30vh 30vh 30vh;
}

```

我在最外面的`section`那里用的是flexbox，从而使网格和文字垂直居中对齐。添加完css grid之后，在谷歌浏览器或火狐浏览器中，打开开发者工具，找到Layout > Grid overlays，勾选起来就会看到页面中出现了我们在css代码中定义的一个网格，水平方向有5列，网格线从1到6，垂直方向有3行，网格线从1到4。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1635326135/brandonzhang.cn/Layout-5-1_cjcal5.jpg" alt="css grid的网格线展示"> 

接下来把3张图片添加到html文档中。如果你想跟着我的步骤联系，可以到[https://unsplash.com/](https://unsplash.com/)随意找三张图片放入html文档中。

```html

<section class="flex">
    <div class="grid">
        <div class="img-wrap">
            <!-- 第1张图片 -->
            <img src="image1.jpg" alt="">
        </div>
        <div class="img-wrap">
            <!-- 第2张图片 -->
            <img src="image3.jpg" alt="">
        </div>
        <div class="img-wrap">
            <!-- 第3张图片 -->
            <img src="image3.jpg" alt="">
        </div>
    </div>

    <div class="content">
        <!-- ...已有代码 -->
    </div>
</section>

```

添加css代码：

```css

/* 别忘记添加这个代码，让3张图片填充整个img-wrap */
.img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 包裹第一张图片的div置于网格第一行，3/4/5列。*/
.img-wrap:first-child {
    grid-column: 3 / span 3;
}

/* 包裹第二张图片的div置于网格第二行，2/3/4列。*/
.img-wrap:nth-child(2) {
    grid-column: 2 / span 3;
}

/* 包裹第三张图片的div置于网格第三行，1/2/3列。*/
.img-wrap:last-child {
    grid-column: 1 / span 3;
}


```

添加完css代码之后，效果如下截图：

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1635327338/brandonzhang.cn/Layout-5-2_gilqz3.jpg" alt="图片放入网格后的效果">

为了达到最终的一个效果，我就需要把我用黄色线条圈出来的这6个三角形给隐藏掉，也就是说需要隐藏每张图片的左右两个三角形。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1635328153/brandonzhang.cn/Layout-5-3_ge21cy.jpg" alt="图片标记需要隐藏的部分">

那么需要在`clip-path`属性上面添加多角形(polygon)，并调整polygon里面的数值来得到最终的一个可显示区域。我们可以从**长方形**这个多角形开始了解polygon的使用方法。

### 1. 长方形 clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

从左到右，polygon里面的四组数值分别对应元素的左上角(left top)，右上角(right top)，右下角(right bottom)，和左下角(left bottom)，类似padding和margin里面的数值一样。

另外，每组数值里面左边的数值代表x轴(左 -> 右：0 -> 100%)，右边的数值代码y轴(上 -> 下：0 -> 100%)。

<div class="container">
<div class="polygon1">
    <img src="https://res.cloudinary.com/brandonzhang/image/upload/v1635334143/brandonzhang.cn/raimond-klavins-bwjWW8C9rJ4-unsplash_ajhri7.jpg" alt="第一步：利用polygon设置长方形可显示区域">
</div>

```html

<div class="img-container">
    <img src="example.jpg">
</div>

```

```css

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 当使用这个polygon数值时，不会产生裁剪的区域，类似一个标准的长方形。*/
.img-container {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

```

</div>

<style>
    .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
        padding: 1.5ch;
        gap: 2ch;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    @media (max-width: 820px) {
        .container {
            grid-template-columns: 1fr;
        }
    }
    .container img {
        border-radius: 0;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .container .language-css {
        grid-column: span 2;
        margin: 0 !important;
    }
    .container .language-html {
        height: 100%;
        margin: 0 !important;
    }
    .polygon1 {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
    .polygon2 {
        clip-path: polygon(33.33% 0, 100% 0, 100% 100%, 0 100%);
    }
    .polygon3 {
        clip-path: polygon(33.33% 0, 100% 0, 66.67% 100%, 0 100%);
    }
</style>


### 2. 将polygon第一组数值左边的数值修改成33.33%的效果。

<div class="container">
<div class="polygon2">
    <img src="https://res.cloudinary.com/brandonzhang/image/upload/v1635334143/brandonzhang.cn/raimond-klavins-bwjWW8C9rJ4-unsplash_ajhri7.jpg" alt="第一步：利用polygon设置长方形可显示区域">
</div>

```html

<div class="img-container">
    <img src="example.jpg">
</div>

```

```css

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.img-container {
    /* 第一组数值左边的数值改成33.33% */
    clip-path: polygon(33.33% 0, 100% 0, 100% 100%, 0 100%);
}

```

</div>

### 3. 再将polygon第三组数值左边的数值修改成1 - 33.33% = 66.67%的效果。

<div class="container">
<div class="polygon3">
    <img src="https://res.cloudinary.com/brandonzhang/image/upload/v1635334143/brandonzhang.cn/raimond-klavins-bwjWW8C9rJ4-unsplash_ajhri7.jpg" alt="第一步：利用polygon设置长方形可显示区域">
</div>

```html

<div class="img-container">
    <img src="example.jpg">
</div>

```

```css

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.img-container {
    /* 
        第一组数值左边的数值改成33.33% 
        第三组数值左边的数值改成1 - 33.33% = 66.67%
    */
    clip-path: polygon(33.33% 0, 100% 0, 66.67% 100%, 0 100%);
}

```

</div>

可以看到，修改polygon里面的两个数值后就是我们想要的一个效果了。现在再返回到刚开始的那个网格例子的css代码中，在包裹图片的div中添加这段`clip-path`代码后，我们最终的排版就搞定了。

```css

/* 别忘记添加这个代码，让3张图片填充整个img-wrap */
.img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 包裹第一张图片的div置于网格第一行，3/4/5列。*/
.img-wrap:first-child {
    grid-column: 3 / span 3;
}

/* 包裹第二张图片的div置于网格第二行，2/3/4列。*/
.img-wrap:nth-child(2) {
    grid-column: 2 / span 3;
}

/* 包裹第三张图片的div置于网格第三行，1/2/3列。*/
.img-wrap:last-child {
    grid-column: 1 / span 3;
}

/* ### 新增这个代码片段 ### */
.img-wrap {
    clip-path: polygon(33.33% 0, 100% 0, 66.67% 100%, 0 100%);
}


```

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1635338641/brandonzhang.cn/Layout-5-4_sjvcnl.jpg" alt="添加完clip-path代码最终的效果">

> 如果需要不同的倾斜角度，那么可以修改33.33%和66.67%这两个数值，只要保证他们之和等于100%即可。

需要看最终版面，可以访问：[https://brandonzhang.cn/layouts/5](https://brandonzhang.cn/layouts/5)
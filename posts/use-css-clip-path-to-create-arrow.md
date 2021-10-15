---
title: '使用CSS clip-path快速创建箭头'
date: '2021-10-15'
keywords: 'CSS clip-path用法，CSS clip-path箭头，CSS clip-path生成网站'
description: '这篇博客会将大家怎么通过CSS clip-path快速创建箭头，并使用到我们的网站上面。'
isPublished: ''
---

我之前写过另外一篇文章[通过CSS边框创建箭头](https://brandonzhang.cn/posts/css-only-arrow)，今天在看[Stephanie Eckles](https://moderncss.dev/custom-select-styles-with-pure-css/)博客的时候，学习到还可以使用`clip-path`创建箭头，所以准备写点文字和代码在里面总结一下。

假设我的html结构是下面这样，container里面有三个链接，鼠标点击链接分别到各自的产品页面。

```html

<div class="container">
    <a href="" class="container__link">手机</a>
    <a href="" class="container__link">平板</a>
    <a href="" class="container__link">电脑</a>
</div>

```
接着我添加这些基础的CSS代码：

```css

.container {
    background-color: #f1f1f1;
    min-height: 200px;
    border-radius: 5px;
    padding: 20px 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.container__link {
    background-color: white;
    padding: 1em 4em;
    border-radius: 5px;
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    color: #555;
    font-weight: bold;
}

```

添加完基础的CSS代码，这三个链接效果如下：
<div class="container">
    <a href="" class="container__link">手机</a>
    <a href="" class="container__link">平板</a>
    <a href="" class="container__link">电脑</a>
</div>

<style>
    .container {
        background-color: #f1f1f1;
        min-height: 200px;
        border-radius: 5px;
        padding: 20px 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    @media (max-width: 100ch) {
        .container {
            flex-direction: column;
            gap: 2ch;
        }
    }
    .container__link {
        background-color: white;
        padding: 1em 4em;
        border-radius: 5px;
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        color: #555;
        font-weight: bold;
    }
</style>


<div style="height: 10vh;"></div>


接下来开始引入css `clip-path`，Stephanie的网站里面有提到一个非常好用的工具网站[Clippy](https://bennettfeely.com/clippy/)，选中Triangle就是我想要的三角形箭头形状，三角形的三个角可以随意调整，调整成类似向右的箭头。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634278064/brandonzhang.cn/Clippy-_-CSS-clip-path-maker_nnyt2k.png" alt="Clippy向右箭头截图" style="border-radius: 5px;">

那么我们就可以使用底部`clip-path`的数值：
```CSS

clip-path: polygon(0 0, 0% 100%, 100% 50%);

```

再回到之前三个链接按钮的CSS代码中，在`.container__link`上面增加一个`::after`伪元素，并增加这些代码，同时还需要在`.container__link`上面增加一个`display: grid`，否则这个clip-path生成的箭头无法显示：

```css

.container__link {
    // ...之前其他代码，不在重复
    display: grid;
}

.container__link::after {
    content: "";
    width: 0.8em;
    height: 0.8em;
    background-color: #555;
    clip-path: polygon(0 0, 0% 100%, 100% 50%);
}

```
增加完上面的CSS之后，箭头的效果如下：
<div class="container">
    <a href="" class="container1__link">手机</a>
    <a href="" class="container1__link">平板</a>
    <a href="" class="container1__link">电脑</a>
</div>

<style>
    .container1__link {
        background-color: white;
        padding: 1em 4em;
        border-radius: 5px;
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        color: #555;
        font-weight: bold;
        display: grid;
    }

    .container1__link::after {
        content: "";
        width: 0.8em;
        height: 0.8em;
        background-color: #555;
        clip-path: polygon(0 0, 0% 100%, 100% 50%);
    }
</style>

<div style="height: 10vh;"></div>

接着，通过`position: absolute`来调整箭头的位置。
```css

.container__link {
    // ...之前其他代码，不在重复
    position: relative;
}

.container__link,
.container__link::after {
    // ...之前其他代码，不在重复
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
}

```

<div class="container">
    <a href="" class="container2__link">手机</a>
    <a href="" class="container2__link">平板</a>
    <a href="" class="container2__link">电脑</a>
</div>

<style>

    .container2__link {
        background-color: white;
        padding: 1em 4em;
        border-radius: 5px;
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        color: #555;
        font-weight: bold;
        position: relative;
    }

    .container2__link::after {
        content: "";
        width: 0.8em;
        height: 0.8em;
        background-color: #555;
        clip-path: polygon(0 0, 0% 100%, 100% 50%);
        position: absolute;
        right: 1em;
        top: 50%;
        transform: translateY(-50%);
    }
</style>

现在需要把文字往左移动，从箭头的CSS代码看出，箭头离右侧边缘的距离为`1em`，那么文字也就是`container__link`的pading需要修改成左侧`1em`，右侧`7em`【因为原先是左右`4em`，这样修改可以保证方框的长度不变】
```css

.container__link {
    padding-left: 1em;
    padding-right: 7em;
}

```

下面是最终效果（背景改成橙色，以便和之前的其他区分开）
<div class="container">
    <a href="" class="container3__link">手机</a>
    <a href="" class="container3__link">平板</a>
    <a href="" class="container3__link">电脑</a>
</div>

<style>

    .container3__link {
        background-color: orange;
        padding: 1em 4em;
        border-radius: 5px;
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        color: #555;
        font-weight: bold;
        position: relative;
        padding-left: 1em;
        padding-right: 7em;
    }

    .container3__link::after {
        content: "";
        width: 0.8em;
        height: 0.8em;
        background-color: #555;
        clip-path: polygon(0 0, 0% 100%, 100% 50%);
        position: absolute;
        right: 1em;
        top: 50%;
        transform: translateY(-50%);
    }

</style>

<div style="height: 10vh;"></div>

**附加小知识**：因为本文中所有的链接href是空白的，增加这些JS代码可以防止鼠标点击链接刷新页面。

```javascript

window.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('.container a');
    [...links].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        })
    })
});

```

<script>
window.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('.container a');
    [...links].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        })
    })
});
</script>
---
title: 'CSS高级概念 - 使用好calc()函数可以让flexbox省去媒体查询(media query)'
date: '2021-10-28'
description: '在响应式排版中，在flexbox的flex-basis中使用calc()函数可以替代媒体查询，使代码更简洁，更高效，更流畅。'
---

在响应式网页设计中，虽然所有浏览器基本上都已经支持css grid了，但是使用flexbox的时候还是非常多的。

我今天这篇博客提到的方案将会解决我们在使用flexbox中经常会碰到的一个问题。假设我html里面有一个`main`元素，使用的是`display: flex`和`flex-wrap: wrap`，`main`里面有三个`article`子元素的卡片，`article`卡片拥有`flex-basis: 33%`和`flex-grow: 1`，在宽频中，三个卡片都是在同一行，但是当我们开始缩小浏览器宽度后，缩小到某一宽度后(暂时假设800px)，第三个卡片将会自动跳到第二行 -- *因为在父元素上面使用了`flex-wrap: wrap`* -- 但第三个卡片的宽度却变成了100%，这个时候就是前面两个卡片在第一行，宽度各为50%，第三个卡片独自在第二行，占宽100%。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1635508479/brandonzhang.cn/flex-basis-illustration-1_u8jlue.jpg" alt="">

为什么这会是个问题呢？因为刚开始的时候三个卡片在同一行并且宽度相等，给用户的暗示是它们的重要等级是一样的，那么当视口宽度小于800px时，第三个卡片在第二行中占宽100%时，视觉上带来的效果是它的重要等级比前面两个卡片重要，这显然不是我们想要的一个效果。

针对上面的问题，我录制了一个小视频，可以看的更明白一些。

<video controls width="100%">
    <source src="https://res.cloudinary.com/brandonzhang/video/upload/v1635430975/brandonzhang.cn/flex-basis-demo-1_ceppd0.webm" type="video/webm">
    Sorry, your browser doesn't support webm videos.
</video>

CSS代码是这样：

```css

main {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

main > article {
    flex-grow: 1;
    flex-basis: 33%; 
    min-width: 300px;
}

```
此时，想让三个卡片在视口宽度小于800px时各自占一行`100%`的宽度。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1635508479/brandonzhang.cn/flex-basis-illustration-2_g0yg76.jpg" alt="">

我们第一直觉就是会想到使用媒体查询(media query)，虽然媒体查询可以解决我们的问题（很多网站也都是使用的媒体查询），但是媒体查询会破坏我们代码的简洁性，并不是最有效最聪明的解决方案。

更好的则是通过`min-width`，`max-width`，和`calc()`函数三者一起使用来解决我们这个问题。可将`article`里面的代码修改成【最终效果视频在博客最底部】：

```css

main > article {
    flex-grow: 1;

    /* min-width, max-width, 和calc()函数一起使用 */
    min-width: 33%;
    max-width: 100%;
    flex-basis: calc((800px - 100%) * 9999);
}

```

我们将分三步分析上面这段代码：

1.**比较`min-width`和`flex-basis`**

   当`min-width`大于`flex-basis`时，CSS选取`win-width`的数值作为元素的宽度。

   ```css

    /* article宽度为100px */
    article {
        min-width: 100px;
        flex-basis: 90px;
    }

   ```

2.**比较`max-width`和`flex-basis`**

当`max-width`小于`flex-basis`时，CSS选取`max-width`的数值作为元素的宽度。

```css

/* article宽度为200px */
article {
    min-width: 200px;
    flex-basis: 210px;
}

```

3.**calc((800px - 100%) * 800)**

```css

main > article {
    flex-grow: 1;

    /* min-width, max-width, 和calc()函数一起使用 */
    min-width: 33%;
    max-width: 100%;
    flex-basis: calc((800px - 100%) * 9999);
}

```

3.1 当视口宽度大于`800px`，例如`801px`时（此时`min-width: 33%`约等于`265px`），`flex-basis: calc((800px - 100%) * 9999) = -9999px`。
即`min-width`大于`flex-basis`，CSS选取`win-width`的数值`33%`作为元素的宽度，就是三个卡片在同一行的时候。

3.2 当视口宽度小于`800px`，例如`799px`时（此时`max-width: 100%`等于`799px`），`flex-basis: calc((800px - 100%) * 9999) = 9999px`。
即`max-width`小于`flex-basis`，CSS选取`max-width`的数值`100%`作为元素的宽度，就是三个卡片各占一行`100%`的宽度。


<div class="mt-1"></div>

下面的视频是最终的效果。

<video controls width="100%">
    <source src="https://res.cloudinary.com/brandonzhang/video/upload/v1635434853/brandonzhang.cn/flex-basis-demo-2_uszyyh.webm" type="video/webm">
    Sorry, your browser doesn't support webm videos.
</video>
---
title: 'CSS margin-inline的使用'
date: '2021-10-10'
description: 'CSS margin-inline的解释和应用'
---

我刚开始在学习CSS的时候，最容易入手的就是看youtube上面比较热门的CSS视频，但是随着对CSS了解的越来越深入，发现大多数视频所介绍的CSS都是这些博主比较常用的代码，没有介绍那些比较少见但却很好用的属性，当然这也是在情理之中的，肯定是有其他博主上传非常详细非常全面的CSS视频，只是我没有看到过。

我因为想把front end web developer作为自己的职业追求，那么就必须非常全面的掌握CSS，最近在二刷MDN CSS[文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)，今天碰到的一个属性叫[margin-inline](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline)，所以赶紧写一篇记录下。

```html

<section>
    <div class="inner-content">
    </div>
</section>

```
假设我们需要将上面这个`section`里面的`div`水平居中，大部分网站的css会是下面这样。（我增加了一些额外的属性，使它们在后面呈现的时候好看一些。）

```css

section {
    width: 100%;
    background-color: #f4f4f4;
    height: 300px;
}

.inner-content {
    width: 90%;
    background-color: orange; 
    /* 如果上下也需要margin的话，也可以写成 margin: 2rem auto; */
    margin-left: auto;
    margin-right: auto; 
    height: 120px;
}

```
增加了这些css代码后，这个`section`在页面中呈现的效果如下，`div`水平居中。
<section>
    <div class="inner-content">
    </div>
</section>

<style>

    section {
        width: 100%;
        background-color: #f4f4f4;
        border-radius: 5px;
        height: 300px;
    }

    .inner-content {
        width: 90%;
        background-color: orange; 
        margin-left: auto;
        margin-right: auto; 
        height: 120px;
        border-radius: 5px;
    }
</style>

总觉通过`margin-left: auto`和`margin-right: auto`2段代码水平居中一个元素不是最简洁的办法，其实可以直接通过`margin-inline: auto`来实现：
```css

.innter-content {
    margin-inline: auto;
    /* margin-inline是margin-inline-left和margin-inline-right的简写 */
}

```
`margin-left`和`margin-right`是方位型的属性，左就是左，右就是右。`margin-inline`则是逻辑型的属性，会根据元素`writing-mode`的改变而改变。
>当`writing-mode`是`vertical`时，`margin-inline`其实就是竖向的，`margin-inline: auto`就不是水平居中元素了，而是垂直居中元素。

还是同样的html，我在section这里增加了一个“vertical” css类.

```html

<section class="vertical">
    <div class="inner-content">
    </div>
</section>

```

然后通过css将其`writing-mode`设置为`vertical`，其他属性不变。

```css

section.vertical {
    writing-mode: vertical-rl;
    /* 其他属性和之前一样，不再重复 */
}

section.vertical .inner-content {
    margin-inline: auto;
    /* 其他属性和之前一样，不再重复 */
}

```
可以看到，里面的`div`现在是垂直居中了。
<section class="vertical">
    <div class="inner-content">
        这里是一段writing-mode为vertical的文字。
    </div>
</section>

<style>

    section.vertical {
        width: 100%;
        background-color: #f4f4f4;
        border-radius: 5px;
        height: 300px;
        writing-mode: vertical-rl;
    }

    .inner-content {
        width: 90%;
        background-color: orange; 
        margin-inline: auto;
        height: 120px;
        border-radius: 5px;
    }
</style>

我们再进一步探讨：上面的文字是不是太拥挤了？首先第一个直觉会是增加`padding-top`和`padding-bottom`，但是我们的`writing-mode`已经改成`vertical`了，所以就应该是`padding-left`和`padding-right`，但是又和直观上的感觉相反，有点伤脑细胞。此时inline这个属性就非常有帮助了，按照之前的逻辑，就可以使用`padding-inline`。
```css

section.vertical .inner-content {
    margin-inline: auto;
    padding-inline: 1.5rem;
    /* 其他属性和之前一样，不再重复 */
}

```
现在文字上下有了一点呼吸空间了。
<section class="vertical">
    <div class="inner-content add-padding">
        这里是一段writing-mode为vertical的文字。
    </div>
</section>

<style>

    section.vertical {
        width: 100%;
        background-color: #f4f4f4;
        border-radius: 5px;
        height: 300px;
        writing-mode: vertical-rl;
    }

    .inner-content.add-padding {
        width: 90%;
        background-color: orange; 
        margin-inline: auto;
        height: 120px;
        border-radius: 5px;
        padding-inline: 1.5rem;
    }
</style>
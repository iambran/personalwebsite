---
title: 'Pods框架中获取文章摘要'
date: '2021-10-02'
description: '如何在pods插件中通过php代码获取文章摘要'
tags: ['pods']
---


当使用Oxygen Page Builder和Pods Framework建站时，如果主题不支持文章摘要(Post Excerpt)，可以在Oxygen文章列表模板中增加一个Code Block，然后增加以下PHP代码：

我是在Wordpress官方论坛里面找到的这个PHP函数，[原文链接](https://developer.wordpress.org/reference/functions/wp_trim_words/)

```php

<?php

    function my_excerpt_filter ( $content ) {
        return wp_trim_words( $content, 20 );
    }

?>

```
`wp_trim_words` 是Wordpress的一个PHP函数，[参考链接](https://developer.wordpress.org/reference/functions/wp_trim_words/)。

然后在Pods模板中，通过 `{@post_content, my_excerpt_filter}` 来获取文章摘要。

我目前在搭建的网站使用的Pods模板News List如下：

```HTML

<a class="news-card" href="{@permalink}">
    <div class="news-card__img">
        <img src="{@news_featured_image}" alt="{@post_title}">
        <div class="news-card__arrow">&rarr;</div>
    </div>
        
    <div class="news-card__content">
        <small class="news-card__date">{@post_date}</small>
        <h1 class="news-card__title">{@post_title}</h1>
        <div class="news-card__excerpt">
            <!-- 这里是文章摘要 -->
            {@post_content, my_excerpt_filter}
        </div>
    </div>
</a>

```
这里的CSS类别“news-card”， “news-card__img”， “news-card__content” 我用的是[BEM](http://getbem.com/introduction/)命名规范，以后有考虑追求Web前端开发者（Front-End Web Developer）这个职业，我建议可以学习一下这个命名规范，我也是学习了CSS很久才发现这个BEM命名规范，掌握这个知识以后对于命名有非常大的帮助，也使CSS代码更易阅读，同时更好的和团队合作，也是MDN CSS文档建议的命名规范之一，[文档链接](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Organizing)。


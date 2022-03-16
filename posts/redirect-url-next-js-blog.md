---
title: 'Next.js博客如何重定向到站外URL'
date: '2022-03-15'
description: 'Next.js博客如何重定向到站外URL'
isPublished: ''
tags: ['next.js']
---

最近申请了[Cloudways](https://www.cloudways.com/en/?id=783182)的Affiliate Program，对方提供给我的Affilicate链接是：`www.cloudways.com/en/?id=783182`，我想在我自己博客上面增加一个URL重定向，比如用户访问`brandonzhang.cn/cloudways`可以重定向到`www.cloudways.com/en/?id=783182`，这样我就推广的时候可以直接给我自己博客的网址，更方便一些。

Next.js有一个[Redirects API](https://nextjs.org/docs/api-reference/next.config.js/redirects)可以使用。根据文档，我需要在`next.config.js`文件中增加一个`redirects`键，然后将`source`和`destination`各自修改成自己想要的URL就可以了。

```javascript

module.exports = {
  async redirects() {
    return [
      {
        source: '/cloudways', 
        destination: 'https://www.cloudways.com/en/?id=783182',
        permanent: true,
      },
    ]
  },
}

```

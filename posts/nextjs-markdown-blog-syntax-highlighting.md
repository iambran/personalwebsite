---
title: 'Next.js/Markdown博客网站增加语法高亮 (syntax highlighting)'
date: '2021-10-06'
description: '如何在next.js / markdown博客网站中增加语法高亮(syntax highlighting)'
tags: ['next.js']
---

我这个博客网站是跟随着Next.js文档[Create a Next.js App](https://nextjs.org/learn/basics/create-nextjs-app)一步步搭建起来的，这个文档教程最后是将网站部署到Vercel，而我这个是部署到Netlify，因为我之前的另一个网站已经部署到Netlify，比较熟悉，所以也将这个博客网站放到Netlify。

如果你也是跟随着这个教程搭建好一个起步的博客网站，是没有语法高亮(syntax highlighting)的，但因为我的博客我想写一些css/javascript/php相关的一些小知识，所以我需要语法高亮(syntax highlighting)，这样看起来更专业一些。我在谷歌上面搜了很多博客，按照他们的方法尝试都没有成功，可能是不同开发者使用的markdown parser不一样。

最后找到这个博客[https://mxd.codes/articles/syntax-highlighting-with-prism-and-next-js](https://mxd.codes/articles/syntax-highlighting-with-prism-and-next-js)，按照他的方法可以实现语法高亮，太开心了。

1.首先需要装Prism.js：
`npm install prismjs` 或者 `yarn add prismjs`

2.在`layout.js`里面增加以下代码：
```javascript

// 导入react和useEffect
import React, { useEffect } from 'react'
// 导入prism
const prism = require('prismjs')

export default function Layout ({ children, home }) {

    // 在export default function里面增加一个useEffect
    useEffect(() => {
        prism.highlightAll();
    }, []);

    // ...
}

```

这样，所有的代码元素都通过react hook进行语法高亮，不过还需要增加一个prims语法高亮的主题css。

3.找到`_app.js`，然后增加这行代码：
```javascript

import 'prismjs/themes/prism-tomorrow.css'

```

我这个网站用到的就是prism-tomorrow主题，你也可以到[prism网站](https://prismjs.com/download.html)选择其他的语法高亮css主题代码。

到目前这个程度，prism只对默认的语言(html/css/javascript)做语法高亮，我自己这个网站还会有一些php代码，我需要研究下怎么增加php代码的语法高亮，因为max的博客没有提到。

我后来在github上面的一个帖文中找到的方法，在`layout.js`增加两行代码：
```javascript

import React, { useEffect } from 'react'

const prism = require('prismjs')
// 在const prism = require('prismjs')后面增加下面两行代码，其他不变
require('prismjs/components/prism-markup-templating')
require('prismjs/components/prism-php')

export default function Layout ({ children, home }) {

    useEffect(() => {
        prism.highlightAll();
    }, []);

    // ...
}

```
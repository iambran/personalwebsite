---
title: 'Next.js/Markdown博客站外链接在新窗口中打开'
date: '2021-10-09'
---

Next.js官方教程[Create a Next.js App](https://nextjs.org/learn/basics/create-nextjs-app)搭建的markdown博客，链接都是默认在当前窗口中打开，这个对于站内链接是ok的，但是对于站外链接肯定是在新窗口中打开用户体验最好。

我在谷歌上面搜到stackoverflow的这个[帖子](https://stackoverflow.com/questions/4425198/can-i-create-links-with-target-blank-in-markdown)，其中alex的回答是我想要的方案，他说增加以下JavaScript代码：
```javascript

// 找到博客里面所有的超链接
var links = document.links;

for (var i = 0; i < links.length; i++) {

    // 如果是站外链接，给它增加一个属性target="_blank"
    if (links[i].hostname != window.location.hostname) {
       links[i].target = '_blank';
    } 
}

```

接着，我需要把这段代码增加到pages > posts > `[id].js`的useEffect里面:

```javascript

// 别忘记从react中导入useEffect
import { useEffect } from 'react'

export default function Post({ postData }) {

    // 增加useEffect并在里面添加之前的那段javascript代码即可
    useEffect(() => {
        var links = document.links;
        for (var i = 0; i < links.length; i++ ) {
            if (links[i].hostname != window.location.hostname) {
                links[i].target = '_blank';
            }
        }
    }, [])
  
    return (
        ...
    )
}

```
---
title: 'Next.js博客网站添加Google AdSense'
date: '2022-02-05'
description: '使用span元素设计divider，并尝试使用CSS Grid看看能不能带来更好布局控制'
tags: ['next.js']
---

我昨晚给我这个Next.js / Markdown博客网站添加了Google AdSense，因此记录一下。其实我博客刚刚起步就添加广告，绝对是找骂，但是考虑到加入广告可能会激发自己持续写下去的动力，所以也就不想那么多了。

## Google AdSense申请

登录到[Google AdSense](https://www.google.com/adsense/start/)后台，网站 -> 添加网站，填入自己的网站的网址，并保存继续。现在谷歌会要求你将网站关联到AdSense，会生成类似下面这样的一段代码，并将其粘贴到您网站的 HTML 中，放在 `<head>` 和 `</head>` 标记之间。

```html

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9606176765911686" crossorigin="anonymous"></script>

```

那么在Next.js网站中，我是将这段代码添加到./components/meta.js中。

```javascript

import Head from 'next/head'

export const myName = 'Brandon Zhang'
export const siteTitle = 'Brandon Zhang, Front-End Web Developer'


export default function Meta({ pageTitle, keywords, description }) {
  return (
    <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{pageTitle ? pageTitle : siteTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:locale" content="zh-CN"/>
        <meta property="og:type" content="article"/>
        <meta property="og:title" content={pageTitle || siteTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="brandonzhang.cn"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap" rel="stylesheet" />

        // 谷歌要求的Google AdSense代码
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9606176765911686" crossOrigin="anonymous"></script>
    </Head>
  )
}

```

添加代码后，将网站更新到线上服务器，然后回到Google AdSense后台，点击“申请审核”按钮，等待谷歌审核。审核大概需要一周左右时间，通过会以gmail邮件形式告知。

## Google AdSense创建广告单元

审核通过后，再到Google AdSense后台，广告（ads）-> 按广告单元（by units）-> 创建新的广告单元。我是选择“文章内嵌广告”，添加广告单元名称后选择保存并获取代码，谷歌会生成这样的代码片段。

```html

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9606176765911686" crossorigin="anonymous"></script>
<ins class="adsbygoogle"
  style="display:block; text-align:center;"
  data-ad-layout="in-article"
  data-ad-format="fluid"
  data-ad-client="ca-pub-9606176765911686"
  data-ad-slot="1702156411"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```

## Next.js网站中添加AdSense代码

上面那个代码片段中的第一个`script`我刚刚已经添加到meta.js里面了，所以只需要再添加`ins`和第二个`script`即可。我需要到./components中新增一个组件叫“GoogleAds.js”，并添加以下代码。注意：需要将`ins`里面的inline style改成JSX语法。

```javascript

import React, { useEffect } from 'react'

const GoogleAds = () => {
  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <ins 
      className="adsbygoogle"
      style={{display: "block", textAlign: "center"}}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-9606176765911686"
      data-ad-slot="1702156411"
    />
  )
}

export default GoogleAds

```

接下来需要在我的文章/pages/posts/[id].js中添加这个GoogleAds组件。

```javascript

// 其他imports
import GoogleAds from '../../components/GoogleAds'

export default function Post({ postData }) {
  return (
    <Layout>    
      <article className={utilStyles.article}>
          <ul className="tags">
            {postData.tags.map((tag) => (
              <li key={tag} className="tag">
                <Link href={`/posts/tag/${tag}`}>
                  <a>{tag}</a>
                </Link>
              </li>
            ))}
            </ul>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>

          {/* GoogleAds组件 */}
          <GoogleAds />
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

```

广告组件代码添加好之后再推到线上服务器，回到Google AdSense后台提交广告单元，等待结果就可以了。
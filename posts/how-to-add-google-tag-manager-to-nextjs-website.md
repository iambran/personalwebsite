---
title: '如何在Next.js网站上添加Google Tag Manager'
date: '2021-10-19'
description: '如何在Next.js网站上添加Google Tag Manager'
isPublished: ''
tags: ['next.js']
---

我想给我这个Next.js博客网站添加Google Tag Manager，然后通过Google Tag Manager添加谷歌分析(Google Analytics)和百度分析(Baidu Analytics)。


## 1.创建新的Google Tag Manager账号

首先，登录[Google Tag Manager](https://tagmanager.google.com/)，然后Create Account。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634644700/brandonzhang.cn/Google-Tag-Manager-Create-Account_otsjnk.jpg" alt="谷歌分析Google Analytics创建账户">

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634644701/brandonzhang.cn/Google-Tag-Manager-Create-Account2_in8u2a.jpg" alt="谷歌分析Google Analytics创建账户，选择追踪媒体" style="margin-top: 10px;">

## 2.安装react-gtm-module package

打开Next.js网站，在terminal中安装[react-gtm-module](https://www.npmjs.com/package/react-gtm-module)。

```javascript

npm install react-gtm-module --save

```

接下来，打开pages > _app.js文件，在useEffect里面初始化GTM代码。

```javascript

import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
      TagManager.initialize({ gtmId: 'GTM-XXXXX' });
  }, []);
  return <Component {...pageProps}/>
}
export default MyApp

```

GTM-XXXXX需要替换成你的Google Tag Manager的Container ID。

现在Google Tag Manager添加成功，但是有一个问题，Next.js网站是Single Page Application (SPA)，访客在站内访问不同页面是通过Next `<Link>`切换的，不会刷新页面，所以Google Tag Manager的追踪代码只有在访客刚进网站时才执行一次，后面不会再继续追踪。所以当我在Google Tag Manager后台添加完谷歌分析后，我还需要增加一个History Change的Trigger，这样才能追踪访客访问不同页面的一个数据。

在GTM后台，点击Triggers，点击New添加一个Trigger，然后Choose Trigger Type选择History Change。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634644702/brandonzhang.cn/Google-Tag-Manager-History-Trigger_kahrex.jpg" alt="添加History Change Trigger" style="border: 1px solid #ddd;">

添加完History Change Trigger之后，在右上角提交(Submit)这个GTM Container。

## 3.添加百度统计

登录[百度统计](https://tongji.baidu.com/)，**管理** > **网站列表** > **新增网站**, 添加完网站之后复制百度统计的追踪代码.

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634646866/brandonzhang.cn/%E7%99%BE%E5%BA%A6%E7%BB%9F%E8%AE%A1-%E4%BB%A3%E7%A0%81%E8%8E%B7%E5%8F%96_oeyfe6.jpg" alt="百度统计追踪代码" style="border: 1px solid #ddd;">

回到GTM后台, 添加一个新的Tag, Tag类型选择Custom HTML.

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634646865/brandonzhang.cn/Google-Tag-Manager-%E7%99%BE%E5%BA%A6%E7%BB%9F%E8%AE%A1_igxi05.jpg" alt="在Google Tag Manager里面添加百度统计代码" style="border: 1px solid #ddd;">


然后把刚才复制的百度统计追踪代码Copy进来, 在Triggering下面选择All Pages和History Change.

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634646863/brandonzhang.cn/Google-Tag-Manager-%E7%99%BE%E5%BA%A6%E7%BB%9F%E8%AE%A12_vlfwtr.jpg" alt="在Google Tag Manager里面添加Trigger" style="border: 1px solid #ddd;">

添加完百度统计, 最后再提交这个GTM Container就可以了.

最后, 再回到百度统计后台: **代码管理** > **代码安装检查**, 点击"开始检查", 有"页面代码安装状态：代码安装正确"的提示表示百度统计已经成功添加了.

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634649256/brandonzhang.cn/%E7%99%BE%E5%BA%A6%E7%BB%9F%E8%AE%A1-%E4%BB%A3%E7%A0%81%E5%AE%89%E8%A3%85%E6%A3%80%E6%9F%A5_gcl6hf.jpg" alt="百度统计代码检查" style="border: 1px solid #ddd;">
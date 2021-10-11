---
title: 'Next.js Markdown博客增加filter()方法，过滤掉发布状态isPublished为false的文章'
date: '2021-10-11'
keywords: 'Next.js博客，next js markdown博客，next.js filter()方法'
description: 'Next.js Markdown博客增加filter()方法，过滤掉发布状态isPublished为false的文章，使其不在前端加载'
isPublished: ''
---

在我这个Next.js / Markdown博客中，如果我想将一篇文章设为草稿，不在前端加载（目前暂时没有这个功能）。那么我需要在markdown文件顶部增加一个isPublished的属性，然后通过这个属性的true/false值来相应加载或隐藏这篇文章。

>我这个博客是跟随着Next.js文档[Create a Next.js App](https://nextjs.org/learn/basics/create-nextjs-app)搭建起来的，我不能确定我下面的方法是否适用其他的Next.js / Markdown博客。

首先，找到我想要在前端隐藏的markdown文章，在文件顶部增加一个isPublished的属性：

```html
---
// ...其他属性
isPublished: 'false'
---
```

lib > posts.js中的`getSortedPostsData()`这个函数是负责调用所有的博客数据，那么我需要在这个函数里面增加一个`filter()`方法使其过滤掉`isPublished`值为`false`的文章。

```javascript

export function getSortedPostsData() {
  // ...其他代码

  // 添加filter()之前
  // return allPostsData.sort(({ date: a }, { date: b }) => {
  //   if (a < b) {
  //     return 1
  //   } else if (a > b) {
  //     return -1
  //   } else {
  //     return 0
  //   }
  // })

  // 添加filter()之后
  // 在排序sort()之前添加filter()
  return allPostsData.filter(({isPublished}) => isPublished !== 'false')
    .sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

```

在`getSortedPostsData()`中添加这个`filter()`方法是在博客列表中隐藏该文章，但是如果直接访问这篇文章的链接，还是可以访问的，接下来就需要到`pages > posts > [id].js`里面的`post()`函数里面增加一个`if`条件：

```javascript

export default function Post({ postData }) {

  // ...其他代码
  
  // 假如发布状态不是false，正常显示该文章
  if (postData.isPublished !== "false") {
    return (
      <Layout>

        <Meta 
          pageTitle={postData.title}
          keywords={postData.keywords}
          description={postData.description}
        >
        </Meta>
        
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={`${utilStyles.lightText} ${utilStyles.postDate}`}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            <Link href="/">
              <a className={utilStyles.backToBlog}>返回博客列表</a>
            </Link>
        </article>

      </Layout>
    )
  } else { // 假如发布状态是false，给一个页面无法访问的提示，并且提供返回博客列表按钮
    return (
      <article>
        <h1>此链接暂时无法访问，实在抱歉！</h1>
        <Link href="/">
          <a className={utilStyles.backToBlog}>返回博客列表</a>
        </Link>
      </article>
      
    )
  }
}

```
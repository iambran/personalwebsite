---
title: 'Next.js Markdown博客增加filter()方法，过滤掉发布状态isPublished为false的文章'
date: '2021-10-11'
description: 'Next.js Markdown博客增加filter()方法，过滤掉发布状态isPublished为false的文章，使其不在前端加载'
isPublished: ''
tags: ['next.js']
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
markdown文件顶部的front-matter通过[gray-matter](https://github.com/jonschlinkert/gray-matter)解析后，会生成一个JavaScript  Object对象，`isPublished`是其中的一个参数，我们可以在 Pages > Posts > [id].js里面添加`console.log(postData)`来看一下这个Object对象是什么样的。下面是谷歌开发者工具console项目下的这个`postData`的信息，我们可以看到有`isPublished`这个参数。因为我这边文章是要发布的，所以目前`isPublished`的值是空的。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634360498/brandonzhang.cn/console-log-postdata_rgtw7g.jpg" alt="console.log(postdata)截图" style="border: 1px solid #f1f1f1; border-radius: 5px;">


现在有了`{isPublished}`这个参数，那么就可以在后面的`filter()`方法中引用这个参数来过滤掉发布状态为`false`的文章。

<div style="margin-top: 10vh;"></div>

### 第一步：在文章列表中过滤

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

在`getSortedPostsData()`中添加这个`filter()`方法仅仅是在博客列表中隐藏该文章，但是如果用户直接访问这篇文章的链接，还是可以访问的。

<div style="margin-top: 10vh;"></div>

### 第二步：取消该文章的访问权限。

到`pages > posts > [id].js`里面的`post()`函数里面增加一个`if`条件：

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
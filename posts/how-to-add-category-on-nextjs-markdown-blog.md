---
title: '如何给Next.js/Markdown博客增加分类'
date: '2021-12-31'
description: '在Next.js和Markdown博客网站增加博客分类，并且每个类别有各自单独的页面'
isPublished: ''
tags: ['next.js', 'markdown']
---

我如果要给我这个Next.js/Markdown博客网站增加分类，并且点击分类可以跳转到该分类页面。

## 第1步

在markdown文件顶部增加一个`tags`的属性，然后将分类以数组（array）的形式添加到`tags`上面。

```javascript
---
// ...其他属性
tags: ['next.js', 'markdown']
---
```

>我这个博客是跟随着Next.js文档[Create a Next.js App](https://nextjs.org/learn/basics/create-nextjs-app)搭建起来的。

## 第2步

在lib -> posts.js中添加一个`getAllPostTags()`函数：

```javascript

export function getAllPostTags() {
  // 获取/posts目录下所有博客的文件名
  const fileNames = fs.readdirSync(postsDirectory) // 返回一个数组，包含所有的博客文件名

  // 声明一个空白的数组
  const tagArray = []
    
  const allPostsData = fileNames.map(fileName => {
  
    // 读取markdown文件，并转为string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // 使用gray-matter获取markdown文件顶部自定义属性
    const matterResult = matter(fileContents)
  
    // 自定义属性中tags数组使用forEach方法将每个tag添加到tagArray数组上面
    matterResult.data.tags.forEach(tag => tagArray.push(tag) )
  })

  return tagArray
}

```


## 第3步

在pages -> posts里增加一个tag文件夹，再在tag文件夹里添加一个`[tag].js`文件，将`getAllPostTags()`函数导入进来。

```javascript

// 其他imports
import { getAllPostTags } from '../../../lib/posts'

```

再增加一个`getStaticPaths()`函数，并返回一个Next.js需要用到的`paths`属性，这样Next.js在部署的时候就会生成/posts/tag/next.js，/posts/tag/markdown等等分类页面。

```javascript

export async function getStaticPaths() {
  const allTags = getAllPostTags()

  return {
    fallback: false,
    paths: allTags.map(tag => ({
      params: {
        tag: tag
      }
    }))
  }
}

```


## 第4步

再到lib -> posts中增加一个`getAllPostsByTag()`函数。


```javascript

export function getAllPostsByTag(slug) {

  const fileNames = fs.readdirSync(postsDirectory) 
    
  const allPostsData = fileNames.map(fileName => {

  const id = fileName.replace(/\.md$/, '')

  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data
    }
  })

  // 只返回有当前分类的所有博客，并按发布日期排列
  return allPostsData.filter( ({tags}) => tags.includes(slug) )
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

## 第5步

返回`[tag].js`文件，将`getAllPostsByTag()`函数也导入进来。

```javascript

// 其他imports
import { getAllPostTags, getAllPostsByTags } from '../../../lib/posts'

```

然后增加一个`getStaticProps()`函数：

```javascript

export async function getStaticProps({ params }) {
  const allPostsData = getAllPostsByTag(params.tag);
  return {
    props: {
      allPostsData,
      // 导出params，后面的PostsByTags()函数需要用到
      params
    }
  }
}

```

再增加一个`PostsByTags()`函数来渲染当前分类下面的博客列表。

```javascript

export default function PostsByTags({ allPostsData, params }) {
  return (
    <Layout home>
      <Meta></Meta>

      <section className="blog-list">
      <h1 className="blog-list__help">Posts related to <span>{params.tag}</span></h1>
        <ul className="blog-list__list">
          {allPostsData.map(({id, date, title, tags}) => (
            <li className="blog-list__item" key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <div className="postDetails isPostList">
                <ul className="tags">
                {tags.map((tag) => (
                  <li key={tag} className="tag">
                    <Link href={`/posts/tag/${tag}`}>
                      <a>{tag}</a>
                    </Link>
                  </li>
                ))}
                </ul>
                <Date dateString={date} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

```

## 第6步

需要将分类标签增加到首页的博客列表中，将pages -> index.js中的`Home()`函数修改成：

```javascript

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Meta></Meta>

      <section className="blog-list">
        <ul className="blog-list__list">
          // 增加了tags
          {allPostsData.map(({id, date, title, tags}) => (
            <li className="blog-list__item" key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <div className="postDetails isPostList">
                <ul className="tags">
                // 渲染tags标签
                {tags.map((tag) => (
                  <li key={tag} className="tag">
                    // 点击跳转到该分类页面
                    <Link href={`/posts/tag/${tag}`}>
                      <a>{tag}</a>
                    </Link>
                  </li>
                ))}
                </ul>
                <Date dateString={date} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

```

## 第7步

最好还需要到具体的博客页面pages -> posts -> [id].js，将tags标签添加进来。

```javascript

export default function Post({ postData }) {

  useEffect(() => {
    var links = document.links;
    for (var i = 0; i < links.length; i++ ) {
      if (links[i].hostname != window.location.hostname) {
        links[i].target = '_blank';
      }
    }
  
  if (postData.isPublished !== "false") {
    return (
      <Layout>

        <Meta 
          pageTitle={postData.title}
          description={postData.description}
        >
        </Meta>
        
        <article className={utilStyles.article}>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className="postDetails">
              // 增加tags标签ul列表
              <ul className="tags">
              {postData.tags.map((tag) => (
                <li key={tag} className="tag">
                  <Link href={`/posts/tag/${tag}`}>
                    <a>{tag}</a>
                  </Link>
                </li>
              ))}
              </ul>
              <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            <Link href="/">
              <a className={utilStyles.backToBlog}>返回博客列表</a>
            </Link>
            <div className={utilStyles.progress}></div>
        </article>
      </Layout>
    )
  } else {
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
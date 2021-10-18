---
title: 'Next.js + Wordpress REST API 建站教程'
date: '2021-10-17'
keywords: 'next.js建站教程，next.js结合Wordpress建站教程，next.js前端Wordpress REST API，Headless Wordpress网站建站教程'
description: 'Next.js + Wordpress REST API 建站教程'
isPublished: ''
---

## Wordpress后端准备

Wordpress严格意义上讲不是一个真正的内容管理系统(CMS)，最初就是一个博客系统。Wordpress自带的两个内容类型，页面(PAGE)和文章(POST)无法满足很多网站的需求。所以这次的教程里面我需要安装一个可以创建自定义内容类型(Custom Content Types)的插件[Pods Framework](https://cn.wordpress.org/plugins/pods/)。

### 1. 创建自定义内容类型

前两天想了好久不知道这个教程要搭建一个什么样的网站，想来想去也没有好的方案，刚好中午在看美食杰网站上面的菜谱，索性就尝试一个比较简单的菜谱网站 -- 也适合爱做饭的我 :)

安装且启用Pods插件后，在后台找到 **Pods Admin** > **Add New**后，会有两个选项：

- **Create New**: 创建一个全新的自定义内容类型。
- **Extend Existing**: 拓展现有的内容类型，指在Wordpress自带的内容类型**页面**，**文章**，**分类**，**标签**等上面增加额外的字段(custom field)。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634451028/brandonzhang.cn/%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E5%86%85%E5%AE%B9%E7%B1%BB%E5%9E%8B_x7y9uo.jpg" alt="使用Pods插件创建自定义内容类型">

那么，这次的菜谱网站，我使用**Create New**，点击后就会进入到下面的创建自定义内容类型的页面。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634451768/brandonzhang.cn/%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E5%86%85%E5%AE%B9%E7%B1%BB%E5%9E%8B-%E5%88%9B%E5%BB%BA%E8%8F%9C%E8%B0%B1pods_elaiwv.jpg" alt="在pods插件中创建一个菜谱内容类型">

- Content Type(内容类型): 选择默认的Custom Post Type即可。
- Singular Label(单数标签): 填写“菜谱”
- Plural Label(复数标签): 填写“菜谱”
- Advanced(高级)：Pods Name这里需要填写一个英文的名称，那么我这里菜谱的英文翻译是“recipe”，这里最好是要填写英文的，因为Pods模板和PHP代码中都会使用到这个名称。

确认无误后，点击Next Step创建这个菜谱内容类型。

### 2. 添加字段（Custom Field）

点击Next Step会进入下面这样的界面，在这里我们开始添加与菜谱有关的一些自定义字段(Custom Field)，点击**Add Field**添加字段。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634452707/brandonzhang.cn/%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E5%86%85%E5%AE%B9%E7%B1%BB%E5%9E%8B-%E6%B7%BB%E5%8A%A0%E5%AD%97%E6%AE%B5_td3mdt.jpg" alt="PODS插件中添加字段">

#### 添加字段：制作工艺

- Label(标签): 填写“制作工艺”，这个标签会在菜谱内容类型里面显示。
- Name(名称)：填写“recipe_type”，或者其他你认为更合理的名称，这个是会储存在mysql数据库表格中，所以建议单词间使用“_”隔开。
- Description(描述)：这个表述是针对“制作工艺”这个字段的补充介绍，比如：“请输入此菜谱的制作工艺，比如：炒，煮，炖等”，可以提升用户体验。我这里就省略了。
- Field Type(字段类型)：选择Plain Text【下拉选项中有很多选择，选择适合这个字段的类型】
- Required(必选)：如果勾选这个选项，在添加菜谱时则这个字段是必选的，根据实际情况进行勾选，我这里就不勾选了。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634453451/brandonzhang.cn/%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E5%86%85%E5%AE%B9%E7%B1%BB%E5%9E%8B-%E6%B7%BB%E5%8A%A0%E5%AD%97%E6%AE%B5-%E5%B7%A5%E8%89%BA_clzsx9.jpg" alt="添加字段：制作工艺">

重复上面的步骤，我添加完另外的3个字段：口味（recipe_flavor）、时间（recipe_time）【时间字段类型选择：Plain Number】、难度（recipe_difficulty）、图片（recipe_photo）【图片字段类型选择：File / Image / Video】。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634456843/brandonzhang.cn/%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E5%86%85%E5%AE%B9%E7%B1%BB%E5%9E%8B-%E6%B7%BB%E5%8A%A0%E5%AD%97%E6%AE%B5%E7%BB%93%E6%9D%9F_uaxaaz.jpg" alt="添加字段结束">

>小贴士：添加字段的前后顺序不重要的，添加完字段后可以上下拉动调整字段的前后顺序。

**添加所有字段要点击右上角“Save Pod”保存。**

### 3. 添加菜谱

和添加页面和文章一样，我们打开**菜谱**，点击Add New添加菜谱，首先添加标题和菜谱介绍。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634456495/brandonzhang.cn/%E6%B7%BB%E5%8A%A0%E8%8F%9C%E8%B0%B1-1_ozwdmh.jpg" alt="添加菜谱标题和介绍">

底部就是我们刚刚添加的自定义字段，添加一张菜谱照片同时把其他信息都填写完整。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634456602/brandonzhang.cn/%E6%B7%BB%E5%8A%A0%E8%8F%9C%E8%B0%B1-2_ahtqze.jpg" alt="添加自定义字段内容">


我另外添加3款菜谱：水果沙拉、披萨、培根。

### 4. 开启Pods插件API

在 Pods Admin > Edit Pods > 编辑菜谱，点击REST API项目，勾选(Enable)，然后再勾选Show All Fields (read-only)。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634457813/brandonzhang.cn/%E5%BC%80%E5%90%AFPODS%E6%8F%92%E4%BB%B6API_mnkltk.jpg" alt="开启PODS插件API功能">

开启API后，可以在当前这个Wordpress域名后面增加/wp-json/wp/v2/recipe，既可以这个菜谱的JSON数据。我这里是本地服务器，我的API访问链接是：http://pods.local/wp-json/wp/v2/recipe

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634458552/brandonzhang.cn/PODS%E6%8F%92%E4%BB%B6API%E6%95%B0%E6%8D%AE_wqne10.jpg" alt="API数据显示" style="border: 1px solid #ddd;">

>你需要安装一个谷歌浏览器拓展工具[JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa/related?hl=en)，才能有这个美化了的JSON数据显示。

## Next.js前端准备


### 1. 安装Next.js

首先打开terminal，我这里是CD到D盘Projects文件夹，然后通过安装Next.js到nextjs-wordpress-site文件夹。

```javascript

npx create-next-app@latest nextjs-wordpress-site

```

然后通过Visual Studio Code打开nextjs-wordpress-site文件夹。

```javascript

code nextjs-wordpress-site

```

在VS Code顶部菜单**Terminal** > **New Terminal**打开一个Terminal，然后启动本地开发服务器。

```javascript

npm run dev

```

打开http://localhost:3000/应该可以看到Next.js默认的欢迎页面。

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634533028/brandonzhang.cn/Create-Next-App_onxzwq.jpg" alt="next.js网站默认欢迎页面" style="border: 1px solid #ddd;">


### 2. 获取Wordpress数据

在根目录上面新建一个**lib**文件夹，然后在里面添加一个**recipes.js**文件并增加以下代码：

```javascript

export async function getAllRecipes() {

    // 从我本地安装的Wordpress网站REST API获取数据
    const res = await fetch('http://pods.local/wp-json/wp/v2/recipe')
  
    // 将获取的数据转化成JSON对象
    const recipes = await res.json()
  
    // 如果错误没有数据，给一个404错误
    if (!recipes) {
        return {
            notFound: true,
        }
    }
  
    return {
        allRecipes
    }
}

```


因为做示范，我这里就把首页作为呈现菜谱列表的一个页面，并提供链接跳转到相应的菜谱详情页面。现在，打开 **Pages** > **index.js**，在文件顶部导入`getAllRecipes()`，再增加一个`getStaticProps()`函数。

```javascript

// ...已有的其他import

// 导入getAllRecipes()
import { getAllRecipes } from '../lib/recipes';

// 增加getStaticProps()
export async function getStaticProps() {

  // 声明一个常量allRecipes，等于getAllRecipes()函数中导出的所有菜谱
  const allRecipes = await getAllRecipes();

  // 从getStaticsProps()中导出allRecipes，allRecipes就可以作为属性(prop)被上面的Home()函数接收。
  return {
    props: {
      allRecipes
    }
  }

}

```

在前端刷新页面，如果没有错误提示，那么应该我们成功的获取了所有的菜谱数据。

还是在`index.js`，在`Home()`函数中接收allRecipes，并在里面增加`console.log(allRecipes)`来看看allRecipes返回的数据。

```javascript

// 接收allRecipes
export default function Home({ allRecipes }) {

    // 可以在terminal或者前端打开console看下allRecipes返回的数据
    // 没出错肯定是和我们之前访问http://pods.local/wp-json/wp/v2/recipe
    // 看到的数据是一样的
    console.log(allRecipes)

    return (
        // ...已有代码
    )
}

```

### 3. Render菜谱列表

还是在`index.js`，接着，我们需要在`Home()`函数return里面把allRecipes通过`map()`方法，将菜谱图片、名称、制作工艺、口味、时间和难度render在前端。

在`return`里面增加以下代码(如果你是跟着我的这个步骤，可以把复制return里面的代码到你的index.js里面)：

```javascript

export default function Home({ allRecipes }) {

  return (
    <div className={styles.container}>
        <Head>
            <title>Brandon's Recipes</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <h1 className={styles.title}>
                // 我修改了标题
                Brandon's Recipes
            </h1>

        <div className={styles.grid}>

            {allRecipes.allRecipes.map(( recipe ) => (

              // 链接到菜谱的详情页，这个暂时不修改，后来再回来修改
                <a href="https://nextjs.org/docs" className={styles.card} key={ recipe.id }>

                    // 菜谱图片
                    <div className={styles.recipePhoto}>
                        <img src={recipe.recipe_photo.guid} >
                    </div>

                    // 菜谱名称
                    <h2>{ recipe.title.rendered }</h2>

                    <div className={styles.info}>
                    
                        // 制作工艺
                        <div className={styles.info__item}>
                            <p>制作工艺：<strong>{recipe.recipe_type}</strong></p>
                        </div>

                        // 口味
                        <div className={styles.info__item}>
                            <p>口味：<strong>{recipe.recipe_flavor}</strong></p>
                        </div>

                        // 时间
                        <div className={styles.info__item}>
                            <p>时间：<strong>{recipe.recipe_time}</strong></p>
                        </div>

                        // 难度
                        <div className={styles.info__item}>
                            <p>难度：<strong>{recipe.recipe_difficulty}</strong></p>
                        </div>
                    </div>
                </a>
            ))}

        </div>
      </main>
    </div>
  )
}

```

因为删除且新增了一些CSS类，所以你可以把 `styles > globals.css` 里面的内容全部删除，然后Copy下面这些代码进去：

```CSS

.container {
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main {
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title a {
  color: #0070f3;
  text-decoration: none;
}

.title a:hover,
.title a:focus,
.title a:active {
  text-decoration: underline;
}

.title {
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
}

.title {
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: min(1400px, 90vw);
  margin-top: 3rem;
}

.card {
  margin: 1rem;
  padding: 1rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.card:hover,
.card:focus,
.card:active {
  color: #0070f3;
  border-color: #0070f3;
}

.card h2 {
  margin: 1rem 0 1rem 0;
  font-size: 1.5rem;
}

.card p {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
}

.recipePhoto img {
  max-width: 100%;
}

.info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.info p {
  font-size: 0.8rem;
  padding: 0.5em 0.8em;
  background-color: #f1f1f1;
  color: #555;
  
}

.info p strong {
  font-size: 0.9rem;
}

```

现在保存所有文件，前端刷新后会是下面这样的效果：

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634481612/brandonzhang.cn/Brandon-s-Recipes_t4g4gr.jpg" alt="菜谱列表" style="border: 1px solid #ddd;">

### 4. Render菜谱详情页面

回到`lib > recipes.js`中，增加`getAllRecipeIds()`和`getSingleRecipe()`函数：

```javascript

export async function getAllRecipeIds() {

    const res = await fetch('http://pods.local/wp-json/wp/v2/recipe')
    const recipes = await res.json()

    // 获取每个菜谱的id，在下面getSingleRecipe()会用到
    return allRecipes.map((recipe) => {
        return {
            params: { id: recipe.id.toString() }
        }
    })
}


export async function getSingleRecipe(id) {

    // 获取单个菜谱的数据
    const res = await fetch(`http://pods.local/wp-json/wp/v2/recipe/${id}`)
    const recipe = await res.json()

    // 如果错误没有数据，给一个404错误
    if (!recipe) {
        return {
            notFound: true,
        }
    }

    return {
        recipe,
    }
}

```

接下来到Pages文件夹里新建一个文件夹recipes，紧接着在里面新增一个文件`[id].js`。

导入`getAllRecipeIds`和`getSingleRecipe`，然后增加`getStaticProps()`和`getStaticPaths()`函数获取单个菜谱数据和菜谱ID。

```javascript

// 导入getAllRecipeIds和getSingleRecipe
import { getAllRecipeIds, getSingleRecipe } from "../../lib/recipes"

// 获取单个菜谱数据
export async function getStaticProps({ params }) {

    const recipeData = await getSingleRecipe(params.id)

    return {
        props: {
            recipeData
        }
    }
}

// 增加getStaticPaths()，导出每个菜谱详细页面网址id
// 例如：http://localhost:3000/recipes/25
// 最后的ID是25
export async function getStaticPaths() {

    const paths = await getAllRecipeIds()

    return {
        paths,
        fallback: false
    }

}

```

继续，再增加一个export default function Recipe()，并接收上面getStaticProps导出的属性recipeData:

```javascript

// ...已有代码

export default function Recipe({ recipeData }) {

    // 可以console看一下这个recipeData返回的数据
    // 具体数据看下面的截图
    console.log(recipeData)

    // 这里暂时添加一个return null，暂时不呈现具体的菜单数据
    // 如果漏掉这个return null，前端会出现错误
    return null
}

```

`console.log(recipeData`返回的数据截图：

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634528465/brandonzhang.cn/%E5%8D%95%E4%B8%AA%E8%8F%9C%E8%B0%B1%E6%95%B0%E6%8D%AErecipeData_iypyma.jpg" alt="单个菜谱console.log返回的数据" style="border: 1px solid #ddd;">

现在，在文件顶部导入这些内容：

```javascript

// ...已有的代码
import Head from 'next/head'
import styles from '../../styles/Recipe.module.css'
import Link from 'next/link'

```

然后，将return null替换成下面的代码：

```javascript

export default function Recipe({ recipeData }) {

  console.log({recipeData})
  return (
    <div className={styles.container}>
      <Head>
        <title>Brandon's Recipes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.recipePhoto}>
            <img src={recipeData.recipe.recipe_photo.guid} ></img>
          </div>

          <div className={styles.recipeContent}>

            <h1 className={styles.title}>
                {recipeData.recipe.title.rendered}
            </h1>
                        
            <div className={styles.info}>
                <div className={styles.info__item}>
                  <p>制作工艺：<strong>{recipeData.recipe.recipe_type}</strong></p>
                </div>
                <div className={styles.info__item}>
                  <p>口味：<strong>{recipeData.recipe.recipe_flavor}</strong></p>
                </div>
                <div className={styles.info__item}>
                    <p>时间：<strong>{recipeData.recipe.recipe_time}</strong></p>
                </div>
                <div className={styles.info__item}>
                  <p>难度：<strong>{recipeData.recipe.recipe_difficulty}</strong></p>
                </div>
            </div>

            <div 
              className={styles.recipeDescription}
              dangerouslySetInnerHTML={{ __html: recipeData.recipe.content.rendered }} 
            />

            <Link href="/">
              <a className={styles.backToRecipes}>返回菜谱列表</a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

```

现在如果保存后前端访问单个菜谱页面（比如：http://localhost:3000/recipes/25），前端会抱怨找不到**Recipe.module.css**这个文件，接下来就要去添加这个文件。在styles目录里面新增一个文件Recipe.module.css，然后将下面的CSS代码copy进去，我这里是直接借用了Home.module.css里面的代码，然后修改了一些。

```CSS

.container {
    min-height: 100vh;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
.main {
    padding: 5rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
  
.title a {
    color: #0070f3;
    text-decoration: none;
}
  
.title a:hover,
.title a:focus,
.title a:active {
    text-decoration: underline;
}
  
.title {
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
}
  
  
.grid {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 2rem;
    width: min(1000px, 90vw);
    margin-top: 3rem;
}
  
.card {
    margin: 1rem;
    padding: 1rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
}
  
.card:hover,
.card:focus,
.card:active {
    color: #0070f3;
    border-color: #0070f3;
  }
  
.card h2 {
    margin: 1rem 0 1rem 0;
    font-size: 1.5rem;
}
  
.card p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
}
  

.recipeContent > * + * {
      margin-top: 3rem;
  }
.recipePhoto img {
    max-width: 100%;
    border-radius: 10px;
}
  
.info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
}
  
.info p {
    font-size: 0.8rem;
    padding: 2em;
    background-color: #f1f1f1;
    color: #555;
    border-radius: 10px;
    margin: 0; 
}
  
.info p strong {
    font-size: 0.9rem;
}

.backToRecipes {
    display: block;
    text-decoration: underline;
}

```

现在保存文件，再刷新以下前端，可以看到单个菜谱页面效果如下：

<img src="https://res.cloudinary.com/brandonzhang/image/upload/v1634529311/brandonzhang.cn/%E5%8D%95%E4%B8%AA%E8%8F%9C%E8%B0%B1%E8%AF%A6%E6%83%85%E9%A1%B5%E9%9D%A2_qw3ld5.jpg" alt="单个菜谱详情页面" style="border: 1px solid #ddd;">


### 5. 修改首页链接

现在还差一步，就是首页上面的菜谱卡片，链接href还是默认的Next.js的地址，我们需要修改成一个动态地址，点击菜谱卡片链接到各自的详情页面。

打开**pages** > **index.js**，然后再顶部导入next/link:

```javascript

// ...已有代码
import Link from 'next/link'

```

然后在Home()函数的return里面，用`<Link></Link>`包裹住菜谱卡片的a元素，然后在`<Link></Link>`添加一个动态href。

```javascript

export default function Home({ allRecipes }) {

  console.log({ allRecipes });
  return (
    <div className={styles.container}>
      <Head>
        <title>Brandon's Recipes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Brandon's Recipes
        </h1>

        <div className={styles.grid}>

          {allRecipes.allRecipes.map(( recipe ) => (

            // 在Link上面增加href属性
            <Link href={`/recipes/${recipe.id}`}>

              // 取消下面a元素上面的href属性
              <a className={styles.card} key={ recipe.id }>
                <div className={styles.recipePhoto}>
                  <img src={recipe.recipe_photo.guid} ></img>
                </div>
                <h2>{ recipe.title.rendered }</h2>
                <div className={styles.info}>
                  <div className={styles.info__item}>
                    <p>制作工艺：<strong>{recipe.recipe_type}</strong></p>
                  </div>
                  <div className={styles.info__item}>
                    <p>口味：<strong>{recipe.recipe_flavor}</strong></p>
                  </div>
                  <div className={styles.info__item}>
                    <p>时间：<strong>{recipe.recipe_time}</strong></p>
                  </div>
                  <div className={styles.info__item}>
                    <p>难度：<strong>{recipe.recipe_difficulty}</strong></p>
                  </div>
                </div>
              </a>
              </Link>
            ))}

        </div>
      </main>
    </div>
  )
}

```

保存完，刷新一下首页，鼠标悬停每个菜谱卡片上面，应该可以看到浏览器左下角的固定连接最后已经是显示各自菜谱的id了，那么这个教程到这里就结束了。

我还发现一个问题是，首页打开console以后，有一个错误警告：“Warning: Each child in a list should have a unique "key" prop.”。那么就需要对我们的JSX结构进行修改，改成下面这样：

```javascript

export default function Home({ allRecipes }) {

  console.log({ allRecipes });
  return (
    <div className={styles.container}>
      <Head>
        <title>Brandon's Recipes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Brandon's Recipes
        </h1>

        // 修改1：将原先的div改成ul
        <ul className={styles.grid}>

          {allRecipes.allRecipes.map(( recipe ) => (

            // 修改2：在Link上一级增加一个li元素，并把a元素的class移上来
            // 另外，增加一个唯一的key
            <li className={styles.card} key={ recipe.id }>
            <Link href={`/recipes/${recipe.id}`} >
              <a>
                <div className={styles.recipePhoto}>
                  <img src={recipe.recipe_photo.guid} ></img>
                </div>
                <h2>{ recipe.title.rendered }</h2>
                <div className={styles.info}>
                  <div className={styles.info__item}>
                    <p>制作工艺：<strong>{recipe.recipe_type}</strong></p>
                  </div>
                  <div className={styles.info__item}>
                    <p>口味：<strong>{recipe.recipe_flavor}</strong></p>
                  </div>
                  <div className={styles.info__item}>
                    <p>时间：<strong>{recipe.recipe_time}</strong></p>
                  </div>
                  <div className={styles.info__item}>
                    <p>难度：<strong>{recipe.recipe_difficulty}</strong></p>
                  </div>
                </div>
              </a>
              </Link>
            </li>
            ))}

        </ul>
      </main>
    </div>
  )
}

```

因为`<li className={styles.card} key={ recipe.id }>`这里现在是li元素，需要到Home.module.css里面.card上面增加:

```CSS

.card {
  // ...已有代码
  list-style: none;
}

```

如果你是跟着我的步骤一步步下来的，后面还可以做的就是优化下CSS文件，我都是借用了Next.js自带的Home.module.css进行修改，没有重新写CSS代码，因为这个教程的重点不是讲CSS。


**总结**：这个教程比较简单，很多细节没有cover到，不过还是希望对看这个教程的你有所帮助。学会Next.js会给我们的建站带来很多可能性，除了使用Headless Wordpress CMS，还可以搭配许许多多的CMS系统使用，希望后面还可以带来更多的Next.js教程。能忍耐我这文字水平看到最后都是非常热爱前端的小伙伴，感谢！

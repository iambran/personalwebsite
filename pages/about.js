import Layout, {siteTitle} from '../components/layout'
import Meta from '../components/meta'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <Layout>
      <Meta></Meta>
      <section className="my">

        <h1>嗨，你好，我是Brandon。</h1>
        <p>
          我是一名前端开发者（Remote Front-end Developer），之前兼职做过freelancer，有设计开发过几个b2b企业网站。工作之余，会录制前端教学视频，发布在b站和知乎上面。
        </p>
        <p>兴趣爱好：摄影，听音乐（有一把martin吉他，但已布满灰尘），爬山，看过无数部美剧（以sitcom/crime为主）。尝试并在努力坚持科技极简主义。</p>
        <p>在国外旧书网买过很多本英文书籍，设计/营销类，欢迎借阅（已借出几本）。</p>
        
        {/* <p>
          我自学前端的经历：最开始是在youtube上面接触到Wordpress的相关视频，引起了我的兴趣，后来又学习了域名dns，服务器搭建以及Wordpress建站相关知识。在熟悉Wordpress的基础上看了很多HTML/CSS/JavaScript的教程视频，绝大多数来自YouTube上面的Traversy Media频道，Brad的教学风格很接地气，也是目前认可度最高的频道之一，强烈推荐。当我有了一定的HTML/CSS/JavaScript基础之后，随后了解了一些CSS框架/库和JavaScript框架/库，但后面发现自己的基础并不是特别好，又返回去把mdn上面关于HTML/CSS/JavaScript的文档重新看一遍，第二次看和第一次有着截然不同的感觉和收获。
        </p> */}

        <div className="links">
          <a href="https://github.com/iambran" target="_blank" rel="noreferrer">Github</a>
          <a href="https://codepen.io/brandonzhang" target="_blank" rel="noreferrer">CodePen</a>
          <a href="https://space.bilibili.com/386350896/video" target="_blank" rel="noreferrer">bilibili</a>
          <a href="https://www.zhihu.com/people/iambran/zvideos" target="_blank" rel="noreferrer">知乎</a>
        </div>

      </section>

    </Layout>
  )
}
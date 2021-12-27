import Layout, {siteTitle} from '../components/layout'
import Meta from '../components/meta'
import Image from 'next/image'
import Link from 'next/link'

export default function LayoutIdeas() {
  return (
    <Layout>
      <Meta></Meta>
      <section className="my">

        <h1>CSS Grid 网格布局</h1>
        <p>
            学习CSS Grid时，在网络上面找了一些杂志图片，使用CSS Grid尝试些类似杂志的网格布局，很多代码还有待完善。
        </p>
          

        <div className="links">
            <Link href="/layouts/1">
                <a>Layout #1</a>
            </Link>
            <Link href="/layouts/2">
                <a>Layout #2</a>
            </Link>
            <Link href="/layouts/3">
                <a>Layout #3</a>
            </Link>
            <Link href="/layouts/4">
                <a>Layout #4</a>
            </Link>
            <Link href="/layouts/5">
                <a>Layout #5</a>
            </Link>
        </div>

      </section>

    </Layout>
  )
}
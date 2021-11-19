import Meta from '../components/meta'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import Image from 'next/image'



// Note that here is async not default
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Meta></Meta>

      <section className={`${utilStyles.blogListWrap}`}>
        <h1 className={utilStyles.headingXl}>博客</h1>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}

          {/* {allPostsData.filter(({isPublished}) => isPublished !== 'false')
            .map(({id, date, title}) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
          ))} */}
        </ul>
      </section>
    </Layout>
  )
}

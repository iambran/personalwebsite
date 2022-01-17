import Meta from '../components/meta'
import Layout, {siteTitle} from '../components/layout'
// import utilStyles from '../styles/utils.module.scss'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import Image from 'next/image'
import ProfilePhoto from '../components/ProfilePhoto'



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

      <section className="blog-list">
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

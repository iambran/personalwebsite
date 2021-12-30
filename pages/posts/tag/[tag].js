import Meta from '../../../components/meta'
import Layout, {siteTitle} from '../../../components/layout'
// import utilStyles from '../styles/utils.module.scss'
import { getAllPostsByTag, getAllPostTags } from '../../../lib/posts'
import Link from 'next/link'
import Date from '../../../components/date'
import Image from 'next/image'



// Note that here is async not default
export async function getStaticProps({ params }) {
  const allPostsData = getAllPostsByTag(params.tag);
  return {
    props: {
      allPostsData,
      // return params so PostsByTags() can receive this
      params
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostTags()
  return {
    fallback: false,
    paths: paths.map(tag => ({
      params: {
        tag: tag
      }
    }))
  }

}

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

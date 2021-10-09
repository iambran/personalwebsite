import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.scss'
import Link from 'next/link'
import { useEffect } from 'react'

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {

  useEffect(() => {
    var links = document.links;
    for (var i = 0; i < links.length; i++ ) {
      if (links[i].hostname != window.location.hostname) {
        links[i].target = '_blank';
      }
    }
  }, [])
  
    return (
      <Layout>

        <Head>
            <title>{postData.title}</title>
        </Head>

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
}
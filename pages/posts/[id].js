import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import Meta from '../../components/meta'
import utilStyles from '../../styles/utils.module.scss'
import Link from 'next/link'
import { useEffect } from 'react'
import ViewCounter from '../../components/ViewCounter'
import ProfilePhoto from '../../components/ProfilePhoto'
import GoogleAds from '../../components/GoogleAds'

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
    // window.addEventListener('scroll', () => {
    //   let scrollTop = window.scrollY;
    //   let windowHeight = window.innerHeight;
    //   let documentHeight = document.body.offsetHeight;
    //   let scrollPercentage = scrollTop / (documentHeight - windowHeight);
    //   console.log(scrollPercentage);
    //   document.querySelector('body').style.setProperty('--scroll', scrollPercentage);
    // });
  }, [])
  
  if (postData.isPublished !== "false") {
    // console.log(postData);
    return (
      <Layout>

        <Meta 
          pageTitle={postData.title}
          description={postData.description}
        >
        </Meta>
        
        <article className={utilStyles.article}>
            <ul className="tags">
              {postData.tags.map((tag) => (
                <li key={tag} className="tag">
                  <Link href={`/posts/tag/${tag}`}>
                    <a>{tag}</a>
                  </Link>
                </li>
              ))}
              </ul>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className="postDetails">
                <ProfilePhoto />
                <div>
                  <div className="name">Brandon Zhang</div>
                  <Date dateString={postData.date} /> — <ViewCounter slug={postData.id} />
                </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            <GoogleAds />
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
import Head from 'next/head'

export const myName = 'Brandon Zhang'
export const siteTitle = 'Brandon Zhang, Front-End Web Developer'


export default function Meta({ pageTitle, keywords, description }) {
    return (

        <Head>
            <link rel="icon" href="/favicon.ico" />
            <title>{pageTitle ? pageTitle : siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:locale" content="zh-CN"/>
            <meta property="og:type" content="article"/>
            <meta property="og:title" content={pageTitle || siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content="brandonzhang.cn"/>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9606176765911686"
     crossOrigin="anonymous"></script>
        </Head>
    )
}

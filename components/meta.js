import Head from 'next/head'

export const myName = 'Brandon Zhang'
export const siteTitle = 'Brandon Zhang, Front-End Web Developer'


export default function Meta({ pageTitle, keywords, description }) {
    return (

        <Head>
            <link rel="icon" href="/favicon.ico" />
            <title>{pageTitle ? pageTitle : siteTitle}</title>
            <meta name="description" content={description} />
            <meta property="og:locale" content="zh-CN"/>
            <meta property="og:type" content="article"/>
            <meta property="og:title" content={pageTitle || siteTitle} />
            <meta property="og:description" content={description} />
            {/* <meta property="og:url" content={window.location}/> */}
            <meta property="og:site_name" content="brandonzhang.cn"/>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap" rel="stylesheet" />
            
        </Head>
    )
}

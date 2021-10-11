import Head from 'next/head'

export const myName = 'Brandon Zhang'
export const siteTitle = 'Brandon Zhang, Junior Front End Web Developer'


export default function Meta({ pageTitle, keywords, description }) {
    return (

        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta 
                name="description"
                content={description}
            />
            <meta
                name="keywords"
                content={keywords}
            />
            <meta name="og:title" content={siteTitle} />
            <title>{pageTitle} - {siteTitle}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap" rel="stylesheet" />
            
        </Head>
    )
}

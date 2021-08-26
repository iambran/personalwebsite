import Head from 'next/head'

export const myName = 'Brandon Zhang'
export const siteTitle = 'Brandon Zhang, Junior Front End Web Developer'


export default function Meta({ pageTitle }) {
    return (

        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta 
                name="description"
                content="Brandon Zhang - Front-End Web Developer"
            />
            <meta name="og:title" content={siteTitle} />
            <title>{pageTitle} - {siteTitle}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap" rel="stylesheet" />
            
        </Head>
    )
}

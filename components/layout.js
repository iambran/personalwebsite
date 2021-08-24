import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.scss'
import Link from 'next/link'

const name = 'Brandon Zhang'
export const siteTitle = 'Brandon Zhang - Front-End Web Developer'




export default function Layout ({ children, home }) {
    return (
        <div className={styles.grid}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta 
                    name="description"
                    content="Brandon Zhang - Front-End Web Developer"
                />
                <meta name="og:title" content={siteTitle} />
            </Head>

            <header className={styles.header}>
                menu goes here
            </header>

            <main>{children}</main>

            <footer className={styles.footer}>
                This site is built with <a href="https://nextjs.org/" className={styles.underline}>Next.js</a> and CSS Grid,
                hosted on <a href="https://www.netlify.com/" className={styles.underline}>Netlify</a>.
                The source code is available on <a href="https://github.com/iambran/personalwebsite" className={styles.underline}>Github</a>.
            </footer>
        </div>
    )
}
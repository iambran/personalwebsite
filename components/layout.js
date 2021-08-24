import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.scss'
import utilStyles from '../styles/utils.module.scss'
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
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/brandon-zhang.jpg"
                            className={utilStyles.profile}
                            width="612"
                            height="300"
                            alt={name}
                        />
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <Image
                                    priority
                                    src="/images/brandon-zhang.jpg"
                                    className={utilStyles.borderCircle}
                                    height={108}
                                    width={108}
                                    alt={name}
                                />
                            </a>
                        </Link>

                        <h2 className={utilStyles.headingLg}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>{name}</a>
                            </Link>
                        </h2>
                    </>
                )
                }
            </header>

            <main>{children}</main>
            {!home && (
                <div className={styles.backHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}

            <footer className={styles.footer}>
                This site is built with <a href="https://nextjs.org/" className={styles.underline}>Next.js</a> and CSS Grid,
                hosted on <a href="https://www.netlify.com/" className={styles.underline}>Netlify</a>.
                The source code is available on <a href="https://github.com/iambran/personalwebsite" className={styles.underline}>Github</a>.
            </footer>
        </div>
    )
}
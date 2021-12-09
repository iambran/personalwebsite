import React, { useEffect } from 'react'
import Meta from './meta'
import Image from 'next/image'
import styles from './layout.module.scss'
import Link from 'next/link'


const prism = require('prismjs')
require('prismjs/components/prism-markup-templating')
require('prismjs/components/prism-php')

const name = 'Brandon Zhang'




export default function Layout ({ children, home }) {
    useEffect(() => {
        prism.highlightAll();
    }, []);

    return (
        <div className={styles.grid}>
            {/* <Meta>
                <meta 
                    name="description"
                    content="Brandon Zhang - Front-End Web Developer"
                />       
            </Meta> */}

            <header className={styles.header}>

                <Link href="/">
                    <a>博客</a>
                </Link>
                <Link href="/photography">
                    <a>摄影</a>
                </Link>
            </header>

            <main>{children}</main>

            <footer className={styles.footer}>
            © Brandon Zhang. 特别感谢 <a href="https://nextjs.org/" className={styles.underline}>Next.js</a> / <a href="https://www.netlify.com/" className={styles.underline}>Netlify</a> / <a href="https://github.com/iambran/personalwebsite" className={styles.underline}>Github</a> 
            </footer>
        </div>
    )
}
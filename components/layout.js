import React, { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.scss'
import Link from 'next/link'

const prism = require('prismjs')

const name = 'Brandon Zhang'
export const siteTitle = 'Brandon Zhang - Front-End Web Developer'




export default function Layout ({ children, home }) {
    useEffect(() => {
        prism.highlightAll();
    }, []);

    return (
        <div className={styles.grid}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta 
                    name="description"
                    content="Brandon Zhang - Front-End Web Developer"
                />
                <meta name="og:title" content={siteTitle} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap" rel="stylesheet" />
                
            </Head>

            <header className={styles.header}>
                
            </header>

            <main>{children}</main>

            <footer className={styles.footer}>
                本站使用 <a href="https://nextjs.org/" className={styles.underline}>Next.js</a> 搭建，
                感谢 <a href="https://www.netlify.com/" className={styles.underline}>Netlify</a> 提供的免费服务器，
                和 <a href="https://github.com/iambran/personalwebsite" className={styles.underline}>Github</a> 自动代码部署服务。
            </footer>
        </div>
    )
}
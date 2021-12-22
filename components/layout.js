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

    function toggleMode(e) {
        
        if (e.target.classList.contains('darkTheme')) {
            document.querySelector('div[class^="layout_grid"]').style.removeProperty('--dark-theme-bg', '#000');
            e.target.firstElementChild.style.transform = 'translateX(0)';
            e.target.classList.remove('darkTheme');
            e.target.style.background = '#ddd';
        } else {
            document.querySelector('div[class^="layout_grid"]').style.setProperty('--dark-theme-bg', '#000');
            e.target.firstElementChild.style.transform = 'translateX(35px)';
            e.target.classList.add('darkTheme');
            e.target.style.background = '#2B4160';
        }
    }

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
                <Link href="/about">
                    <a>个人简介</a>
                </Link>
                <div className={styles.themeSwitch}>
                    <p>🌞</p>
                    <div className={styles.toggler} onClick={toggleMode}>
                        <div className={styles.circle}></div>
                    </div>
                    <p>🌑</p>
                    
                </div>
            </header>

            <main>{children}</main>

            <footer className={styles.footer}>
            © Brandon Zhang. 特别感谢 <a href="https://nextjs.org/" className={styles.underline}>Next.js</a> / <a href="https://www.netlify.com/" className={styles.underline}>Netlify</a> / <a href="https://github.com/" className={styles.underline}>Github</a> 
            </footer>
        </div>
    )
}
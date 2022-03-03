import React, { useEffect } from 'react'
import Meta from './meta'
import Image from 'next/image'
// import styles from './layout.module.scss'
import Link from 'next/link'


const prism = require('prismjs')
require('prismjs/components/prism-markup-templating')
require('prismjs/components/prism-php')
require('prismjs/components/prism-bash')

const name = 'Brandon Zhang'




export default function Layout ({ children, home }) {
    useEffect(() => {
        prism.highlightAll();
    }, []);

    function toggleMode(e) {
        if (document.body.classList.contains('darkTheme')) {
            document.body.classList.remove('darkTheme');
            // e.target.style.background = '#ddd';
        } else {
            document.body.classList.add('darkTheme');
            // e.target.style.background = '#2B4160';
        }
    }

    return (
        <div className="grid">
            {/* <Meta>
                <meta 
                    name="description"
                    content="Brandon Zhang - Front-End Web Developer"
                />       
            </Meta> */}

            <header className="header">
                <nav>
                    <Link href="/">
                        <a>博客</a>
                    </Link>
                    <Link href="/layouts">
                        <a>网格布局</a>
                    </Link>
                    <Link href="/photography">
                        <a>摄影</a>
                    </Link>
                    <Link href="/about">
                        <a>作者</a>
                    </Link>
                </nav>
                <div className="themeSwitch">
                    <div className="toggler" onClick={toggleMode}>
                        <div className="circle"></div>
                    </div> 
                </div>
            </header>

            <main>{children}</main>

            <footer className="footer">
            © Brandon Zhang. 特别感谢 <a href="https://nextjs.org/" className="underline">Next.js</a> / <a href="https://www.netlify.com/" className="underline">Netlify</a> / <a href="https://github.com/" className="underline">Github</a> 
            </footer>
        </div>
    )
}
import Image from 'next/image'
import Meta from '../../components/meta'
import Link from 'next/link'
import layoutStyle from '../../components/layouts/1.module.scss'
import generalStyle from '../../components/layouts/general.module.scss'


export default function Layout(){

    const pageTitle = 'Layout #1'
    return (
        <>
            <Meta pageTitle={pageTitle}>
            </Meta>

            <main className={layoutStyle.grid}>
                <div className={layoutStyle.rectangle}>
                    <h1>Lorem ipsum</h1>
                </div>
                <div className={layoutStyle.title}>
                    <h2>Modern Design</h2>
                    <p>Magazine</p>
                </div>
                <div className={layoutStyle.imageContainer}>
                    <Image
                        priority
                        src="https://images.unsplash.com/photo-1629997047282-41f678126175?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                        layout="fill"
                        alt="An image from Unsplash"
                    />
                </div>
                <div className={layoutStyle.firstP}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor sodales velit ut tincidunt. In suscipit faucibus iaculis. Vivamus sed elit nec tellus aliquam interdum eget sit amet augue. Sed tempor turpis ac sem tincidunt sodales.</p>
                </div>
                <div className={layoutStyle.secondP}>
                    <p>Nulla mollis eleifend risus. In non facilisis nibh. Duis aliquet neque et nisl euismod, non efficitur velit viverra. Praesent eleifend diam magna, ac scelerisque dui tincidunt eget. Fusce quis nulla in arcu convallis vehicula.</p>
                </div>
            </main>

            <Link href="/layouts">
                <a className={generalStyle.back}>Go back</a>
            </Link>

        </>
    )
}
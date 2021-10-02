import Link from 'next/link'
import Image from 'next/image'
import Meta from '../../components/meta'
import layoutStyle from '../../components/layouts/4.module.scss'
import generalStyle from '../../components/layouts/general.module.scss'

export default function Layout() {
    const pageTitle = 'Layout #4'

    return (
        <>
            <Meta pageTitle={pageTitle}></Meta>

            <section className={layoutStyle.grid}>
                <div>
                    <h1>1925</h1>
                </div>
                <h1 className={layoutStyle.typographie}>Typographie</h1>
                <h2 className={layoutStyle.jan}><p>Jan</p>Tchichold publishes</h2>
                <h3 className={layoutStyle.die}>Die Neue</h3>
                <p className={layoutStyle.forever}>forever changing</p>
                <h2 className={layoutStyle.graphic}>Graphic Design</h2>
                <div className={layoutStyle.rightbox}></div>



            </section>

            <Link href="/layouts">
                <a className={generalStyle.back}>Go back</a>
            </Link>
        </>
    )
}
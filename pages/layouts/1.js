import Head from 'next/head'
import Meta, {siteTitle} from '../../components/meta'
import Link from 'next/link'
import layoutStyle from '../../components/layouts/1.module.scss'
import generalStyle from '../../components/layouts/general.module.scss'


export default function() {

    const pageTitle = 'My first layout'
    return (
        <>
            <Meta pageTitle={pageTitle}>
            </Meta>

            <section className={layoutStyle.grid}>
                Hello from 1.js page.
            </section>

            <Link href="/layouts">
                <a className={generalStyle.back}>Go back</a>
            </Link>

        </>
    )
}
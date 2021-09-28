import Link from 'next/link'
import Meta from '../../components/meta'
import layoutStyle from '../../components/layouts/autofill.module.scss'

export default function Layout() {
    const pageTitle = 'CSS Grid auto-fill'
    
    return (
        <>

            <Meta pageTitle={pageTitle}></Meta>
            <section className={layoutStyle.grid}>
                <div>One</div>
                <div>Two</div>
                <div>Three</div>
                <div>Four</div>
                <div>Five</div>
                <div>Six</div>

            </section>

        </>
    )
}
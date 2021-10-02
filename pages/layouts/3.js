import Link from 'next/link'
import Image from 'next/image'
import Meta from '../../components/meta'
import layoutStyle from '../../components/layouts/3.module.scss'
import generalStyle from '../../components/layouts/general.module.scss'

export default function Layout() {
    const pageTitle = 'Layout #3'

    return (
        <>
            <Meta pageTitle={pageTitle}></Meta>
            <section className={layoutStyle.grid}>
                <div className={layoutStyle.heading}>
                    <h1>Hikers on W Trek</h1>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique eu nibh ut maximus.</p>
                </div>
                <div className={layoutStyle.relative}>
                    <Image 
                        src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                        layout="fill"
                        alt="hiking"

                    />
                </div>

                <div className={layoutStyle.quote}>
                <span>&#8220;</span><p>In tellus nisi, condimentum at lacinia ut, aliquam et tellus. In tempor accumsan felis, quis aliquet augue congue at.</p>
                </div>

                <div>
                    <p className={layoutStyle.drop}><span>S</span>ed pharetra ipsum ac egestas laoreet. Integer feugiat lacus risus, eget aliquam turpis bibendum quis.</p>
                    <p>Integer eu viverra est. Fusce malesuada, neque id consequat iaculis, lorem lacus pharetra nibh, in sollicitudin elit quam non tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras lobortis diam metus, vitae laoreet purus laoreet non. Donec condimentum neque et ligula convallis, ut dignissim metus dignissim. Morbi et velit nisl. Ut scelerisque finibus felis eu tempus.</p>
                </div>

                <div className={layoutStyle.relative}>
                    <Image 
                    src="https://images.unsplash.com/photo-1587221703223-181d78a8fc4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1506&q=80"
                    layout="fill"
                    alt="hiking"
                    />
                </div>

                <div>
                    <p>Donec vel turpis pulvinar, laoreet purus in, luctus urna.</p>
                    <p>Nulla arcu quam, interdum in condimentum ut, euismod sit amet velit. Aenean sit amet nunc vitae felis rhoncus lacinia vitae condimentum sem. Vestibulum volutpat sem est. Vestibulum facilisis sit amet lectus vel bibendum.</p>
                    <p>Phasellus et ante lacus. Praesent sem lectus, convallis tempor luctus sit amet, imperdiet vitae lectus. Vivamus congue enim at turpis lacinia viverra. Duis commodo libero enim, quis lobortis urna egestas a.</p>
                </div>

            </section>

            <Link href="/layouts">
                <a className={generalStyle.back}>Go back</a>
            </Link>

        </>
    )
}
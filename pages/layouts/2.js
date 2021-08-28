import Image from 'next/image'
import Link from 'next/link'
import Meta from '../../components/meta'
import generalStyle from '../../components/layouts/general.module.scss'
import layoutStyle from '../../components/layouts/2.module.scss'
import { styles } from 'ansi-colors'
import { layout } from 'platform'

export default function Layout() {
    const pageTitle = 'Layout #2'
    return (
        <>
            <Meta pageTitle={pageTitle}></Meta>

            <main className={layoutStyle.grid}>
                <div>
                    <h1 className={layoutStyle.uppercase}>Drawing Rooms</h1>
                    <p>Suspendisse tempor sodales velit ut tincidunt.</p>
                </div>
                <div className={layoutStyle.relative}>
                    <Image 
                    src="https://images.unsplash.com/photo-1488654715439-fbf461f0eb8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    layout="fill"    
                    alt="an image from Unsplash"
                    />
                </div>

                <div>
                    <h1 className={layoutStyle.uppercase}>Sole Mate</h1>
                    <p>Sed tempor turpis ac sem tincidunt sodales.</p>
                </div>
                <div className={layoutStyle.relative}>
                    <Image 
                    src="https://images.unsplash.com/photo-1629910036733-5632b57da4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80"
                    layout="fill"
                    alt="an image from Unsplash"
                    />
                </div>
                
                <div>
                    <h1 className={layoutStyle.uppercase}>Changing Of The Avant-Garde</h1>
                    <p>Fusce efficitur porttitor placerat.</p>
                </div>
                <div className={layoutStyle.relative}>
                    <Image 
                    src="https://images.unsplash.com/photo-1504600770771-fb03a6961d33?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1102&q=80" 
                    layout="fill"
                    alt="an image from Unsplash"
                    />
                </div>
                

                <div>
                    <h1 className={layoutStyle.uppercase}>Multiple Exposure</h1>
                    <p>Duis aliquet neque et nisl euismod, non efficitur velit viverra.</p>
                </div>
                <div className={layoutStyle.relative}>
                    <Image 
                    src="https://images.unsplash.com/photo-1596520093084-e527c9c388ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2689&q=80" 
                    layout="fill"
                    alt="an image from Unsplash"
                    />
                </div>


            </main>

            <Link href="/layouts">
                <a className={generalStyle.back}>Go back</a>
            </Link>
        </>
    )
}
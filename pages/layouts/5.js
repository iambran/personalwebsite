import Link from 'next/link'
import layoutStyles from '../../components/layouts/5.module.scss'
import Meta from '../../components/meta'
import Image from 'next/image'

export default function Layout() {
    const pageTitle = 'Layout #5'

    return (
        <>
            <Meta pageTitle={pageTitle}></Meta>

            <section className={layoutStyles.flex}>
                <div className={layoutStyles.grid}>
                    <div>
                        <Image 
                            src="https://images.unsplash.com/photo-1617529475703-f4acce51be68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
                            alt="an tibet image from unsplash.com"
                            layout="fill"
                        />
                    </div>
                    <div>
                        <Image 
                            src="https://images.unsplash.com/photo-1619896132143-2c1788704029?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1674&q=80"
                            alt="an tibet image from unsplash.com"
                            layout="fill"
                        />
                    </div>
                    <div>
                        <Image 
                            src="https://images.unsplash.com/photo-1615753378837-1058f253556b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
                            alt="an tibet image from unsplash.com"
                            layout="fill"
                        />
                    </div>
                    
                </div>

                <div className={layoutStyles.content}>
                    <h1>崇敬西藏之美</h1>
                    <p>藏傳佛教的渲染力，民宅別具特色的門梁與傳統的絢麗人文，讓西藏往往被視為一個神秘、遙不可及的天堂國度，這些獨特的風土文化卻是西藏人質樸、高雅生活中的一部分，同時也是他們純粹卻豐盛的心靈寄託。</p>
                    <p>從低海拔的林芝走入西藏，以世界最深的大峽谷著稱於世，一派蒼翠欲滴的森林雲海風光盡在眼前。戈壁湖邊的尼瑪石堆、傳統藝術家的木雕石鍋、隨風飄逸的五色風馬旗，遠眺布達拉宮，洗滌了俗世的塵擾。</p>

                    <small>文字摘自<a href="https://www.natgeomedia.com/travel/article/content-2421.html" target="_blank">国家地理网站</a></small>

                    {/* <Link href="/layouts">
                        <a className={layoutStyles.back}>返回</a>
                    </Link> */}
                </div>



            </section>
        </>
    )
}
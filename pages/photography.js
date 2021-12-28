import Layout, {siteTitle} from '../components/layout'
import Meta from '../components/meta'
import utilStyles from '../styles/utils.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Photography() {
  return (
    <Layout>
      <Meta></Meta>
      <section className="photo_grid">

      <figure>
        <Image 
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061683/Photography/1_biuczo.jpg"
          alt="boy resting on a recked ship"
          width={615}
          height={615}
        />
        <figcaption>躺在废弃的渔船上的小男孩<small>雅加达</small></figcaption>
      </figure>

      <figure>
        <Image 
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061707/Photography/2_ip9sxj.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>码头工人<small>雅加达</small></figcaption>
      </figure>

      <figure>
        <Image 
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061682/Photography/5_qbim1m.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>为人民服务<small>福州</small></figcaption>
      </figure>
        {/* End of first row */}

      <figure className="protrait">
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061660/Photography/3_rxvx68.jpg"
          alt=""
          width={615}
          height={921}
        />
        <figcaption>出差期间周末遇到印尼国庆，小巷子里孩子们在玩各种我从来没见过的游戏，欢度国庆<small>雅加达</small></figcaption>
      </figure>

      <figure className="landscape">
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061754/Photography/10_w5l0vg.jpg"
          alt=""
          width={1239}
          height={921}
        />
        <figcaption>涂鸦公园里的小兄妹<small>曼谷</small></figcaption>
      </figure>
        {/* End of second row */}

      <figure>
        <Image 
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061685/Photography/6_sow1vw.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>武功山<small>江西萍乡</small></figcaption>
      </figure>

      <figure>
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061665/Photography/7_yibslj.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>曾经无数次幻想过这样的体验<small>武汉</small></figcaption>
      </figure>

      <figure>
        <Image 
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061689/Photography/8_j2qvwm.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>童年<small>呼和浩特</small></figcaption>
      </figure>

        {/* End of 3 row */}

      <figure className="landscape">
        <img
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061721/Photography/14_i5adw0.jpg"
          alt=""
          width={1239}
          height={921}
        />
        <figcaption>涂鸦公园里用脚踢的排球<small>曼谷</small></figcaption>
      </figure>

      <figure className="protrait">
        <Image  
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061774/Photography/17_wtfykf.jpg"
          alt=""
          width={615}
          height={921}
        />
        <figcaption>退休在家学习各种乐器的大爷<small>江西吉安</small></figcaption>
      </figure>
        {/* End of 4 row */}

      <figure>
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061695/Photography/9_paxxsx.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>小时候的味道<small>武汉</small></figcaption>
      </figure>

      <figure>
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061723/Photography/11_ptcrqk.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>从县城到老家小镇的大巴车<small>屏南</small></figcaption>
      </figure>

      <figure>
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061731/Photography/12_bn2yhj.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>"咦，我有一个一模一样的相机！"<small>江西吉安</small></figcaption>
      </figure>

      <figure className="protrait">
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061771/Photography/15_jnqapt.jpg"
          alt=""
          width={615}
          height={921}
        />
        <figcaption>街头卖唱艺人<small>福州</small></figcaption>
      </figure>

      <figure className="protrait">
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061722/Photography/13_hyjz21.jpg"
          alt=""
          width={615}
          height={921}
        />
        <figcaption>非常懂事的小兄妹<small>福州</small></figcaption>
      </figure>

      <figure className="protrait">
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061640/Photography/4_zxopip.jpg"
          alt=""
          width={615}
          height={921}
        />
        <figcaption>旧城墙上卖小吃的大爷<small>马尼拉</small></figcaption>
      </figure>

      <figure>
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061733/Photography/16_weogvd.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>音乐与自由<small>福州</small></figcaption>
      </figure>

      <figure>
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639145692/Photography/18_uxif8c.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>沙滩上玩游戏的小孩<small>科伦坡</small></figcaption>
      </figure>

      <figure>
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639145691/Photography/19_dzdnql.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>花亭街卖草药的大妈<small>屏南</small></figcaption>
      </figure>

      <figure>
        <Image
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639145694/Photography/20_wrpwfm.jpg"
          alt=""
          width={615}
          height={615}
        />
        <figcaption>餐厅服务员<small>福州</small></figcaption>
      </figure>


      </section>

    </Layout>
  )
}
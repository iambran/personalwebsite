import Layout, {siteTitle} from '../components/layout'
import Meta from '../components/meta'
import utilStyles from '../styles/utils.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Photography() {
  return (
    <Layout>
      <Meta></Meta>
      <section className={utilStyles.photo_grid}>
        <img 
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061683/Photography/1_biuczo.jpg"
          alt="boy resting on a recked ship"
        />

        <img 
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061707/Photography/2_ip9sxj.jpg"
          alt=""
        />

        <img 
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061682/Photography/5_qbim1m.jpg"
          alt=""
        />

        {/* End of first row */}

        <img
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061660/Photography/3_rxvx68.jpg"
          alt=""
          className={utilStyles.protrait}
        />

        <img
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061754/Photography/10_w5l0vg.jpg"
          alt=""
          className={utilStyles.landscape}
        />

        {/* End of second row */}

        <img 
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061685/Photography/6_sow1vw.jpg"
          alt=""
        />

        <img 
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061665/Photography/7_yibslj.jpg"
          alt=""
        />

        <img  
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061689/Photography/8_j2qvwm.jpg"
          alt=""
        />

        {/* End of 3 row */}

        <img
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061721/Photography/14_i5adw0.jpg"
          alt=""
          className={utilStyles.landscape}
        />

        <img  
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061774/Photography/17_wtfykf.jpg"
          alt=""
          className={utilStyles.protrait}
        />
        {/* End of 4 row */}

        <img
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061695/Photography/9_paxxsx.jpg"
          alt=""
        />

        <img  
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061723/Photography/11_ptcrqk.jpg"
          alt=""
        />

        <img
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061731/Photography/12_bn2yhj.jpg"
          alt=""
        />

        <img
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061771/Photography/15_jnqapt.jpg"
          alt=""
          className={utilStyles.protrait}
        />

        <img
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061722/Photography/13_hyjz21.jpg"
          alt=""
          className={utilStyles.protrait}
        />

        <img
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061640/Photography/4_zxopip.jpg"
          alt=""
          className={utilStyles.protrait}
        />

        <img
          src="https://res.cloudinary.com/brandonzhang/image/upload/v1639061733/Photography/16_weogvd.jpg"
          alt=""
        />


      </section>

    </Layout>
  )
}
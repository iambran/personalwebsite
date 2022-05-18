import Layout, {siteTitle} from '../components/layout'
import Meta from '../components/meta'
import Link from 'next/link'

export default function Resume() {
  return (
    <Layout>
      <Meta></Meta>
      <div className="my resume">
        <h1>Personal Resume</h1>
        <p>Hi, I'm Brandon. I'm a self-taught front end developer based in Fuzhou, China. I'm constantly trying to sharpen my skills in JavaScript, mainly in web components. I have a pretty good CSS skills. Passionate about clean codes.<br />(Email: 51451911@qq.com)</p>
        <h2>Word Experience</h2>
        <section>
          <div>Front-End Developer | awe.media (🇦🇺)</div>
          <small>1 November 2021 - Present (Remote)</small>
          <ul>
            <li>Modular web development using HTML, CSS and JavaScript</li>
            <li>Implementing complex user flows</li>
            <li>Working collaboratively with other team members via multiple communications channels</li>
            <li>Testing at both code and user interface level</li>
          </ul>
        </section>
        <section>
          <div>Freelance Wordpress Developer | squarestudio.cn</div>
          <small>March 1 2021 - 31 October 2021</small>
          <ul>
            <li>Cold-emailing manufacturers in B2B field</li>
            <li>Wordpress Development, working with Oxygen/Gutenberg editor</li>
          </ul>
        </section>
        <section>
          <div>Sales Representitive | hailinpower.com</div>
          <small>6 May 2015 - 1 March 2021 (Fuzhou, China)</small>
          <ul>
            <li>Export Diesel Engines, Portable Diesel Generators, and Diesel Water Pumps</li>
            <li>Attend Canton Fair & International Trade Shows to Find New Prospects and Build Better Connection with Exising Clients</li>
            <li>Travel Overseas to Visit Clients and Distributors to Establish Healthy Business Partnership</li>
          </ul>
        </section>
        <section>
          <div>Real Estate Salesperson | Yango Group</div>
          <small>4 September 2012 - 17 April 2015 (Fuzhou, China)</small>
        </section>
        <h2>Education</h2>
        <section>
          <div>Jimei University | Major: HVAC | Bachelor's Degree</div>
          <small>2008 - 2012</small>
        </section>
        <h2>Skills</h2>
        <section>
          <div>Web Development</div>
          <small>HTML, CSS, JavaScript, Web Components, React (basic), Next.js (basic), Wordpress, Git</small>
          <div style={{marginTop: '1rem'}}>General</div>
          <small>Photoshop, Inkscape, Video Editing</small>
        </section>
      </div>
    </Layout>
  )
}

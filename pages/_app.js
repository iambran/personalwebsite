import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import '../styles/globals.scss'
// import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/themes/prism-solarizedlight.css'


function App({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-546BJPD' });
  }, []);
  return <Component {...pageProps} />
}

export default App

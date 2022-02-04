import React, { useEffect } from 'react'

const GoogleAds = () => {
  useEffect(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <ins 
      className="adsbygoogle"
      style={{display: "block"}, {textAlign: "center"}}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-9606176765911686"
      data-ad-slot="1702156411"
    />
  )
}

export default GoogleAds
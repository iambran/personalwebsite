import Image from 'next/image'
import Photo from '../public/images/brandon-zhang.JPG'

export default function ProfilePhoto() {
  return (
      <Image 
        src={Photo} 
        alt="Brandon Zhang - Front-End Web Developer 前端开发"
        width={40}
        height={40}
        className="ProfilePhoto"
      />
  )
}
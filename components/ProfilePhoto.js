import Image from 'next/image'
export default function ProfilePhoto() {
  return (
      <Image 
        src="https://res.cloudinary.com/brandonzhang/image/upload/v1643121170/brandonzhang.cn/brandon-zhang_7.32.56_PM_cgljob.jpg" 
        alt="Brandon Zhang - Front-End Web Developer 前端开发"
        width={40}
        height={40}
        className="ProfilePhoto"
      />
  )
}
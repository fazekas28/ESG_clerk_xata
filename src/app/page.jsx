import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <div className='flex w-full h-full items-center justify-center pl-16 pt-52 lg:pr-20 lg:pt-20'>
        <Image src={'/gif-esg.gif'} alt='ESG' width={700} height={700}></Image>
      </div>
    </div>
  )
}
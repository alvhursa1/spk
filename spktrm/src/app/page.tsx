import Hder from '../components/Hder'
import BannerWithText from '@/components/BannerWithText'
import Htext1 from '@/components/Htext1'
import GaleryMans from '@/components/GaleryMans'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <BannerWithText />
      <div className="absolute top-0 left-0 w-full z-10">
        <Hder />
      </div>
      <div className="relative z-20">
        <Htext1 />
      </div>
      <div className="min-h-screen relative">
      {}
      <GaleryMans />
    </div>
    </div>
  )
}
import Hder from '../components/Hder'
import BannerWithText from '@/components/BannerWithText'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <BannerWithText />
      <div className="absolute top-0 left-0 w-full z-10">
        <Hder />
      </div>
      <div className="relative z-20 mt-10">
{/* {        <table className="w-full text-left">
          <tbody>
            {Array.from({ length: 20 }, (_, index) => (
              <tr key={index} className="shadow-md shadow-gray-300/50">
                <td className="p-4">Texto {index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>} */}
      </div>
    </div>
  )
}
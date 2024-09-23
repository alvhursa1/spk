'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import localFont from 'next/font/local'

const satoshiLight = localFont({ src: '../app/fonts/Satoshi-Light.otf' })

export default function BannerWithText() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const bannerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (textRef.current) {
      observer.observe(textRef.current)
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current)
      }
    }
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (bannerRef.current) {
      const rect = bannerRef.current.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      
      // Limitar el movimiento a un máximo de 20px en cada dirección
      const moveX = (x - 0.5) * 40
      const moveY = (y - 0.5) * 40
      setImagePosition({ x: moveX, y: moveY })
    }
  }

  const handleMouseLeave = () => {
    setImagePosition({ x: 0, y: 0 })
  }

  return (
    <div className="relative w-full">
      <div 
        ref={bannerRef}
        className="relative w-full overflow-hidden" 
        style={{ paddingTop: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src="/bannerspektrumhome.png"
          alt="Banner de Spektrum"
          fill
          style={{ 
            objectFit: 'cover', 
            objectPosition: 'center top',
            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
          priority
        />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pt-[17.7rem] pl-[12rem]">
          <h1 className="font-marcellus text-[75px] text-white leading-tight"
              style={{
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
              }}>
            ‎ ‎ Specialized in art licensing<br />
            and book illustration.
          </h1>
        </div>
        <div className={`absolute top-[16.8rem] right-[3%] ${satoshiLight.className}`}>
          <p className="text-[16px] text-white leading-tight text-left">
            Effortless art<br />
            creation<br />
            with adaptable<br />
            payments<br />
            and no legal<br /> 
            headaches<br />
          </p>
        </div>
        <div 
          className="absolute top-[38rem] left-[3%] flex items-center pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="font-broone text-[24px] text-white mr-2">
            Request a discovery session
          </span>
          <div className="relative w-[23px] h-[7px]">
            <Image
              src="/vectormeetourartists.svg"
              alt=""
              width={23}
              height={7}
              className={`transition-transform duration-500 ease-in-out ${
                isHovered ? 'translate-x-full' : ''
              }`}
            />
          </div>
        </div>
        <div 
          ref={textRef}
          className="absolute top-[44rem] left-[3%] font-marcellus text-[2rem] text-white text-left"
          style={{
            transition: 'word-spacing 1s ease-out',
            wordSpacing: isVisible ? '3em' : 'normal',
          }}
        >
          So, be part of the
        </div>
        <div 
          className="absolute top-[49rem] left-0 w-full px-[0%] transition-all duration-300 ease-in-out pointer-events-auto"
          style={{
            transform: isLogoHovered ? 'translateY(10px)' : 'translateY(0)',
            transition: isLogoHovered ? 'transform 0.3s ease-in-out' : 'transform 0.2s ease-in-out'
          }}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <Image
            src="/logo-spektrum.svg"
            alt="Logo de Spektrum"
            width={100}
            height={20}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  )
}
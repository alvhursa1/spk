'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface ImageData {
  src: string
  alt: string
  text: string
}

const images: ImageData[] = [
  { src: '/images/juana1.png', alt: 'Juana Vargas', text: 'Juana Vargas' },
  { src: '/images/ana1.png', alt: 'Ana María Alarcón', text: 'Ana María Alarcón' },
  { src: '/images/jorge1.png', alt: 'Jorge Callejas', text: 'Jorge Callejas' },
  { src: '/images/tomas1.png', alt: 'Tomás Hinestroza', text: 'Tomás Hinestroza' },
  { src: '/images/gabriel1.png', alt: 'Gabriel Casas', text: 'Gabriel Casas' },
  { src: '/images/sebastian1.png', alt: 'Sebastián Vargas', text: 'Sebastián Vargas' },
  { src: '/images/Jeronimo.png', alt: 'Jerónimo Arbelaez', text: 'Jerónimo Arbelaez' },
  { src: '/images/laura1.png', alt: 'Laura Urrutia', text: 'Laura Urrutia' },
  { src: '/images/santiago1.png', alt: 'Santiago Carmona', text: 'Santiago Carmona' },
  { src: '/images/sofia1.png', alt: 'Sofía Martínez', text: 'Sofía Martínez' },
  { src: '/images/juan1.png', alt: 'Juan Diego Reyes', text: 'Juan Diego Reyes' },
  { src: '/images/alejandro1.png', alt: 'Alejandro Torres', text: 'Alejandro Torres' },
  { src: '/images/emilio1.png', alt: 'Emilio García', text: 'Emilio García' },
]

const GaleryMans: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<{ [key: number]: { top: string; left: string } }>({})

  useEffect(() => {
    const newPositions: { [key: number]: { top: string; left: string } } = {}
    images.forEach((_, index) => {
      newPositions[index] = getRandomPosition()
    })
    setPositions(newPositions)
  }, [])

  const handleWheel = (e: React.WheelEvent) => {
    if (galleryRef.current) {
      galleryRef.current.scrollLeft += e.deltaY
    }
  }

  const getRandomPosition = () => {
    return {
      top: `${Math.random() * 60}%`,
      left: `${Math.random() * 200}%`,
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div
        ref={galleryRef}
        className="flex h-full w-[300vw] overflow-x-scroll"
        onWheel={handleWheel}
      >
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="absolute transition-all duration-1000 ease-out"
              style={{
                top: positions[index]?.top,
                left: positions[index]?.left,
                width: `${30 + Math.random() * 20}vw`,
                height: `${40 + Math.random() * 40}vh`,
              }}
            >
              <div className="relative w-full h-full group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                  onClick={() => setSelectedImage(image)}
                />
                <p className="absolute bottom-2 right-2 text-white font-marcellus text-[1.25rem] z-10">
                  {image.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[80vw] h-[80vh]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default GaleryMans
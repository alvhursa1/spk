'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

interface ImageData {
    src: string
    alt: string
    width: number
    height: number
    effect: string
}

const images: ImageData[] = [
    { src: '/images/juana1.png', alt: 'Juana Vargas', width: 0, height: 0, effect: 'Zoom In' },
    { src: '/images/ana1.png', alt: 'Ana María Alarcón', width: 0, height: 0, effect: 'Rotate' },
    { src: '/images/jorge1.png', alt: 'Jorge Callejas', width: 0, height: 0, effect: 'Grayscale' },
    { src: '/images/tomas1.png', alt: 'Tomás Hinestroza', width: 0, height: 0, effect: 'Sepia' },
    { src: '/images/gabriel1.png', alt: 'Gabriel Casas', width: 0, height: 0, effect: 'Brightness' },
    { src: '/images/sebastian1.png', alt: 'Sebastián Vargas', width: 0, height: 0, effect: 'Contrast' },
    { src: '/images/Jeronimo.png', alt: 'Jerónimo Arbelaez', width: 0, height: 0, effect: 'Hue Rotate' },
    { src: '/images/laura1.png', alt: 'Laura Urrutia', width: 0, height: 0, effect: 'Invert' },
    { src: '/images/santiago1.png', alt: 'Santiago Carmona', width: 0, height: 0, effect: 'Blur' },
    { src: '/images/sofia1.png', alt: 'Sofía Martínez', width: 0, height: 0, effect: 'Saturate' },
    { src: '/images/juan1.png', alt: 'Juan Diego Reyes', width: 0, height: 0, effect: 'Opacity' },
    { src: '/images/alejandro1.png', alt: 'Alejandro Torres', width: 0, height: 0, effect: 'Shadow' },
    { src: '/images/emilio1.png', alt: 'Emilio García', width: 0, height: 0, effect: 'Skew' },
]

const GaleryMans: React.FC = () => {
    const [loadedImages, setLoadedImages] = useState<ImageData[]>([])
    const [columns, setColumns] = useState<ImageData[][]>([[], [], []])
    const galleryRef = useRef<HTMLDivElement>(null)
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    useEffect(() => {
        const loadImage = (image: ImageData): Promise<ImageData> => {
            return new Promise((resolve) => {
                const img = new window.Image()
                img.onload = () => {
                    resolve({
                        ...image,
                        width: img.width,
                        height: img.height,
                    })
                }
                img.src = image.src
            })
        }

        Promise.all(images.map(loadImage)).then(setLoadedImages)
    }, [])

    useEffect(() => {
        if (loadedImages.length > 0 && galleryRef.current) {
            const galleryWidth = galleryRef.current.offsetWidth
            const columnWidth = galleryWidth / 3

            const newColumns: ImageData[][] = [[], [], []]
            const columnHeights = [0, 0, 0] // Cambiado a const

            loadedImages.forEach((image) => {
                const scaleFactor = columnWidth / image.width
                const scaledHeight = image.height * scaleFactor

                const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
                newColumns[shortestColumnIndex].push(image)
                columnHeights[shortestColumnIndex] += scaledHeight
            })

            setColumns(newColumns)
        }
    }, [loadedImages])

    const getEffectClass = (effect: string) => {
        switch (effect) {
            case 'Zoom In':
                return 'group-hover:scale-110'
            case 'Rotate':
                return 'group-hover:rotate-6'
            case 'Grayscale':
                return 'group-hover:grayscale'
            case 'Sepia':
                return 'group-hover:sepia'
            case 'Brightness':
                return 'group-hover:brightness-125'
            case 'Contrast':
                return 'group-hover:contrast-125'
            case 'Hue Rotate':
                return 'group-hover:hue-rotate-60'
            case 'Invert':
                return 'group-hover:invert'
            case 'Blur':
                return 'group-hover:blur-sm'
            case 'Saturate':
                return 'group-hover:saturate-150'
            case 'Opacity':
                return 'group-hover:opacity-50'
            case 'Shadow':
                return 'group-hover:shadow-2xl'
            case 'Skew':
                return 'group-hover:skew-y-6'
            default:
                return ''
        }
    }

    return (
        <div ref={ref} className="w-full">
            <div ref={galleryRef} className="flex justify-between">
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="w-[32%]">
                        {column.map((image, imageIndex) => (
                            <div
                                key={imageIndex}
                                className={`mb-4 transition-opacity duration-500 ease-in-out ${
                                    inView ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{ transitionDelay: `${(columnIndex * column.length + imageIndex) * 100}ms` }}
                            >
                                <div className="relative overflow-hidden rounded-lg shadow-lg group">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        width={image.width}
                                        height={image.height}
                                        layout="responsive"
                                        className={`transition-all duration-300 ease-in-out ${getEffectClass(image.effect)}`}
                                    />
                                </div>
                                <p className="mt-2 text-center font-marcellus text-lg text-gray-800">{image.alt}</p>
                                <p className="text-center text-sm text-gray-600">Efecto: {image.effect}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GaleryMans
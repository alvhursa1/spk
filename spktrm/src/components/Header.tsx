'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    const [isStoreHovered, setIsStoreHovered] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isArtistsHovered, setIsArtistsHovered] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isStoreHovered) {
            timer = setTimeout(() => {
                setIsStoreHovered(false)
            }, 2000)
        }
        return () => clearTimeout(timer)
    }, [isStoreHovered])

    const handleStoreClick = () => {
        if (window.innerWidth < 768) {
            setIsMobileMenuOpen(true)
        }
    }

    return (
        <header className="absolute top-0 left-0 w-full px-7 py-6 flex justify-between items-center text-white font-broone z-50">
            <div className="relative">
                <div
                    className="relative w-[4.313rem] h-[4.313rem] rounded-full border-2 border-white bg-black cursor-pointer transition-all duration-500 ease-in-out group"
                    onMouseEnter={() => setIsStoreHovered(true)}
                    onMouseLeave={() => setIsStoreHovered(false)}
                    onClick={handleStoreClick}
                >
                    <div 
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2.125rem] h-[2.125rem] rounded-full border-2 border-white transition-all duration-500 ease-in-out ${
                            isStoreHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                        }`} 
                    />
                    <Link href="/store" className="hidden md:block">
                        <span 
                            className={`absolute left-full ml-4 whitespace-nowrap text-[1.5rem] top-1/2 transform -translate-y-1/2 font-broone transition-all duration-500 ease-in-out ${
                                isStoreHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                            }`}
                        >
                            Visit our store
                        </span>
                    </Link>
                </div>
            </div>

            <button
                className="text-[2.25rem] font-broone"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                Menu
            </button>

            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 flex items-center justify-center animate-slideDown z-50">
                    <button
                        className="absolute top-6 right-7 text-[2.25rem] font-broone"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Close
                    </button>
                </div>
            )}

            <div className="relative">
                <div
                    className="text-[1.5rem] cursor-pointer font-broone"
                    onMouseEnter={() => setIsArtistsHovered(true)}
                    onMouseLeave={() => setIsArtistsHovered(false)}
                >
                    Meet our artists
                </div>
                {/* Uncomment and adjust the Image component if needed */}
                {/* <Image
                    src="/vectormeetourartists.svg"
                    alt="Meet our artists"
                    width={23}
                    height={7}
                    className={`absolute bottom-[-10px] right-0 transition-transform duration-500 ease-in-out ${
                        isArtistsHovered ? 'translate-x-full' : ''
                    }`}
                /> */}
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="fixed top-0 left-0 w-64 h-screen bg-white text-black flex flex-col items-start justify-start p-6 animate-slideRight md:hidden z-50">
                    <button
                        className="self-end text-2xl mb-6 text-black"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        &times;
                    </button>
                    <Link href="/store" className="text-xl mb-4 font-broone text-black">
                        Store
                    </Link>
                </div>
            )}
        </header>
    )
}
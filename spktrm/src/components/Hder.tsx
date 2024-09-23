'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hder() {
    const [isStoreHovered, setIsStoreHovered] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isArtistsHovered, setIsArtistsHovered] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [isScrolled, setIsScrolled] = useState(false)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                const currentScrollY = window.scrollY

                if (currentScrollY > lastScrollY.current) {
                    // Scrolling down
                    setIsVisible(false)
                } else {
                    // Scrolling up
                    setIsVisible(true)
                    setIsScrolled(currentScrollY > 0)
                }

                lastScrollY.current = currentScrollY
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar)

            return () => {
                window.removeEventListener('scroll', controlNavbar)
            }
        }
    }, [])

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
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setIsMobileMenuOpen(true)
        }
    }

    return (
        <div 
            className={`fixed w-full px-7 py-6 flex justify-between items-center text-white font-broone transition-all duration-300 z-50 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            } ${isScrolled ? 'bg-black' : 'bg-transparent'}`}
        >
            <div className="relative flex-1">
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

            <div 
                className="flex items-center cursor-pointer pr-[2%] flex-1 justify-end"
                onMouseEnter={() => setIsArtistsHovered(true)}
                onMouseLeave={() => setIsArtistsHovered(false)}
            >
                <span className="text-[1.5rem] mr-2">Meet our artists</span>
                <div className="relative w-[23px] h-[7px]">
                    <Image
                        src="/vectormeetourartists.svg"
                        alt=""
                        width={23}
                        height={7}
                        className={`transition-transform duration-500 ease-in-out ${
                            isArtistsHovered ? 'translate-x-full' : ''
                        }`}
                    />
                </div>
            </div>

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
        </div>
    )
}
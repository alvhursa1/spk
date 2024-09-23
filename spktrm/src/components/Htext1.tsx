'use client'

import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const Htext1: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([])

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const lines = [
    { text: 'Representing top', className: 'font-marcellus text-[3rem] pl-[2.5%]' },
    { text: 'illustrators', className: 'font-broone text-[3.75rem] pl-[15%]' },
    { text: 'who produce captivating', className: 'font-marcellus text-[3rem] pl-[10%]' },
    { text: "children's, decorative", className: 'font-broone text-[3.75rem] pl-[10%]' },
    { text: '& advertising works', className: 'font-broone text-[3.75rem] pl-[25%]' },
    { text: 'on comission or license', className: 'font-marcellus text-[3rem] pl-[26%]' },
  ]

  const paragraph2Lines = [
    'We are driven by',
    'creativity, authenticity',
    'and a deep commitment',
    'to our artists and clients.',
  ]

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (inView) {
      const showNextLine = (index: number) => {
        if (index < lines.length + paragraph2Lines.length) {
          setVisibleLines(prev => [...prev, index])
          timeout = setTimeout(() => showNextLine(index + 1), 600)
        }
      }
      showNextLine(0)
    } else {
      setVisibleLines([])
    }
    return () => clearTimeout(timeout)
  }, [inView])

  return (
    <div ref={ref} className="relative">
      <div className="mt-[-15rem]">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`${line.className} ${
              visibleLines.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } transition-all duration-1000 ease-out`}
          >
            {line.text}
          </div>
        ))}
      </div>
      <div className="mt-[0rem] pl-[74%] pr-[3%] text-left">
        {paragraph2Lines.map((line, index) => {
          const globalIndex = index + lines.length
          return (
            <div
              key={index}
              className={`font-satoshi-light text-[1.5rem] ${
                visibleLines.includes(globalIndex) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } transition-all duration-1000 ease-out`}
            >
              {index === 1 ? (
                <span className="font-bold">{line}</span>
              ) : index === 2 ? (
                <span>
                  and a <span className="font-bold">deep commitment</span>
                </span>
              ) : (
                line
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Htext1
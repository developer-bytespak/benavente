'use client'

import { useRef, useEffect, useState } from 'react'
import Button from '@/components/ui/Button'

const videos = ['/images/hero/video-1.mov', '/images/hero/video-2.mov']

export default function Hero() {
  const [active, setActive] = useState(0)
  const ref0 = useRef<HTMLVideoElement>(null)
  const ref1 = useRef<HTMLVideoElement>(null)
  const refs = [ref0, ref1]

  // Start first video on mount
  useEffect(() => {
    const vid = refs[0].current
    if (vid) {
      vid.playbackRate = 2
      vid.play().catch(() => {})
    }
  }, [])

  // When active changes, play the new one and pause the old
  useEffect(() => {
    refs.forEach((ref, i) => {
      const vid = ref.current
      if (!vid) return
      vid.playbackRate = 2
      if (i === active) {
        vid.currentTime = 0
        vid.play().catch(() => {})
      }
    })
  }, [active])

  const handleEnded = (index: number) => {
    if (index === active) {
      setActive((active + 1) % videos.length)
    }
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Two videos — always mounted, crossfade via opacity */}
      {videos.map((src, i) => (
        <video
          key={src}
          ref={refs[i]}
          src={src}
          muted
          playsInline
          onEnded={() => handleEnded(i)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
        />
      ))}

      {/* Subtle gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

      {/* Content — centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-[4.5%]">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="w-[26px] h-px bg-gold" />
          <span className="text-gold text-[11px] tracking-[0.25em] uppercase font-sans font-medium">
            Hawai&#8216;i &amp; Pacific Islands
          </span>
          <span className="w-[26px] h-px bg-gold" />
        </div>

        <h1 className="font-serif font-medium text-[clamp(48px,6vw,84px)] leading-[1.05] text-white">
          Real Estate<br />
          <span className="italic text-gold-light">Valuation</span><br />
          &amp; Advisory
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button href="/contact" variant="gold">Request a Consultation</Button>
          <Button href="/gallery" variant="outline-light">View Our Work</Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-[4.5%] z-10 flex items-center gap-3">
        <span className="w-px h-[40px] bg-gold/40" />
        <span className="text-white/30 text-[9px] uppercase tracking-[0.25em] font-sans">
          Scroll to explore
        </span>
      </div>
    </section>
  )
}

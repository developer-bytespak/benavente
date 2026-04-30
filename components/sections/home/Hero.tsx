'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'

const videos = [
  'https://res.cloudinary.com/djqmhkla6/video/upload/video-1_b1dhpi.mp4',
  'https://res.cloudinary.com/djqmhkla6/video/upload/video-3_pficky.mp4',
  'https://res.cloudinary.com/djqmhkla6/video/upload/video-4_nlyktc.mp4',
  'https://res.cloudinary.com/djqmhkla6/video/upload/video-2_u7oohe.mp4',
]

function getPlaybackRate(src: string) {
  if (src.includes('video-3')) return 1
  if (src.includes('video-4')) return 1
  return 2
}

function getSkipDuration(): number {
  return 5000
}

export default function Hero() {
  const [active, setActive] = useState(0)
  const ref0 = useRef<HTMLVideoElement>(null)
  const ref1 = useRef<HTMLVideoElement>(null)
  const ref2 = useRef<HTMLVideoElement>(null)
  const ref3 = useRef<HTMLVideoElement>(null)
  const refs = [ref0, ref1, ref2, ref3]

  const next = (active + 1) % videos.length

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % videos.length)
  }, [])

  useEffect(() => {
    const vid = refs[active].current
    if (!vid) return

    vid.playbackRate = getPlaybackRate(videos[active])
    try { vid.currentTime = 0 } catch {}

    const tryPlay = () => {
      const p = vid.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    tryPlay()
    if (vid.readyState < 3) {
      vid.addEventListener('canplay', tryPlay, { once: true })
      vid.addEventListener('loadeddata', tryPlay, { once: true })
    }

    const timer = setTimeout(advance, getSkipDuration())

    const nextVid = refs[next].current
    if (nextVid) {
      nextVid.preload = 'auto'
      try { nextVid.load() } catch {}
    }

    return () => {
      clearTimeout(timer)
      vid.removeEventListener('canplay', tryPlay)
      vid.removeEventListener('loadeddata', tryPlay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, advance])

  const handleEnded = (index: number) => {
    if (index === active) {
      advance()
    }
  }

  return (
    <section className="relative h-screen overflow-hidden bg-navy">
      {/* Poster fallback — shown beneath videos on iOS while frames decode */}
      <div className="absolute inset-0">
        <Image
          src="/images/regions/oahu-skyline.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Videos — all mounted with src so iOS can preload; crossfade via opacity */}
      {videos.map((src, i) => (
        <video
          key={src}
          ref={refs[i]}
          preload={i === active || i === next ? 'auto' : 'metadata'}
          muted
          autoPlay
          playsInline
          {...({ 'webkit-playsinline': 'true' } as Record<string, string>)}
          poster="/images/regions/oahu-skyline.webp"
          onEnded={() => handleEnded(i)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

      {/* Subtle gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

      {/* Content — centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-[4.5%]">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="font-serif font-medium text-[clamp(48px,6vw,84px)] leading-[1.05] text-white"
        >
          Real Estate <span className="italic text-ocean-light">Valuation</span><br />
          &amp; Consultancy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <Button href="/about" variant="ocean">Who We Are</Button>
          <Button href="/gallery" variant="outline-light">View Our Work</Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-[4.5%] z-10 flex items-center gap-3">
        <span className="w-px h-[40px] bg-gold/40" />
        <span className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-serif">
          Scroll to explore
        </span>
      </div>
    </section>
  )
}

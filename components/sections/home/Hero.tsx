'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const videos = [
  'https://06muo7mgariygms2.public.blob.vercel-storage.com/video-1.mp4',
  'https://06muo7mgariygms2.public.blob.vercel-storage.com/video-3.mp4',
  'https://06muo7mgariygms2.public.blob.vercel-storage.com/video-4.mp4',
  'https://06muo7mgariygms2.public.blob.vercel-storage.com/video-2.mp4',
]

function getPlaybackRate(src: string) {
  if (src.includes('video-3')) return 1.5
  if (src.includes('video-4')) return 1.5
  return 2
}

function getSkipDuration(): number {
  return 5000
}

export default function Hero() {
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)
  const ref0 = useRef<HTMLVideoElement>(null)
  const ref1 = useRef<HTMLVideoElement>(null)
  const ref2 = useRef<HTMLVideoElement>(null)
  const ref3 = useRef<HTMLVideoElement>(null)
  const refs = [ref0, ref1, ref2, ref3]

  const next = (active + 1) % videos.length

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % videos.length)
  }, [])

  // When active changes, play current + preload next
  useEffect(() => {
    let timer: NodeJS.Timeout
    const vid = refs[active].current
    if (!vid) return

    vid.playbackRate = getPlaybackRate(videos[active])
    vid.currentTime = 0

    const play = () => {
      vid.play().catch(() => {})
      setReady(true)
      timer = setTimeout(advance, getSkipDuration())
    }

    // If enough data is buffered, play immediately; otherwise wait
    if (vid.readyState >= 3) {
      play()
    } else {
      vid.addEventListener('canplay', play, { once: true })
    }

    // Preload the next video
    const nextVid = refs[next].current
    if (nextVid) {
      nextVid.preload = 'auto'
      nextVid.load()
    }

    return () => {
      clearTimeout(timer)
      vid.removeEventListener('canplay', play)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, advance])

  const handleEnded = (index: number) => {
    if (index === active) {
      advance()
    }
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Videos — only active and next have src loaded, crossfade via opacity */}
      {videos.map((src, i) => {
        const shouldLoad = i === active || i === next
        return (
          <video
            key={src}
            ref={refs[i]}
            src={shouldLoad ? src : undefined}
            preload={i === active ? 'auto' : i === next ? 'auto' : 'none'}
            muted
            playsInline
            onEnded={() => handleEnded(i)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === active && ready ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
            }}
          />
        )
      })}

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

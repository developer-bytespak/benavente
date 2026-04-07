'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const videos = [
  'https://06muo7mgariygms2.public.blob.vercel-storage.com/video-1.mp4',
  'https://06muo7mgariygms2.public.blob.vercel-storage.com/video-3.mp4',
  'https://06muo7mgariygms2.public.blob.vercel-storage.com/video-4.mp4',
  'https://06muo7mgariygms2.public.blob.vercel-storage.com/video-2.mp4',
]

export default function Hero() {
  const [active, setActive] = useState(0)
  const ref0 = useRef<HTMLVideoElement>(null)
  const ref1 = useRef<HTMLVideoElement>(null)
  const ref2 = useRef<HTMLVideoElement>(null)
  const ref3 = useRef<HTMLVideoElement>(null)
  const refs = [ref0, ref1, ref2, ref3]

  // Start first video on mount
  useEffect(() => {
    const vid = refs[0].current
    if (vid) {
      vid.playbackRate = 3
      vid.play().catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // When active changes, play the new one
  useEffect(() => {
    let timer: NodeJS.Timeout
    refs.forEach((ref, i) => {
      const vid = ref.current
      if (!vid) return
      const src = videos[i]
      vid.playbackRate = src.includes('video-1') ? 2.5 : (src.includes('video-3') || src.includes('video-4')) ? 1.5 : 1
      if (i === active) {
        vid.currentTime = 0
        vid.play().catch(() => {})
        // Skip video-1 after 15 seconds, video-2 after 3 seconds
        if (src.includes('video-1')) {
          timer = setTimeout(() => {
            setActive((active + 1) % videos.length)
          }, 4000)
        } else if (src.includes('video-2')) {
          timer = setTimeout(() => {
            setActive((active + 1) % videos.length)
          }, 3000)
        }
      }
    })
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="font-serif font-medium text-[clamp(48px,6vw,84px)] leading-[1.05] text-white"
        >
          Real Estate <span className="italic text-gold-light">Valuation</span><br />
          &amp; Consultancy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <Button href="/about" variant="gold">Who We Are</Button>
          <Button href="/gallery" variant="outline-light">View Our Work</Button>
        </motion.div>
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

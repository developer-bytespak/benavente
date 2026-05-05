'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'

interface Props {
  videos: string[]
  headline: string | null
  subhead?: string | null
}

const SKIP_MS = 5000

function getPlaybackRate(src: string) {
  if (src.includes('video-3')) return 1
  if (src.includes('video-4')) return 1
  return 2
}

// Renders a multi-line headline. Newlines become <br>; segments wrapped in
// _underscores_ render italic + ocean-light (the original "Valuation" accent).
function renderHeadline(text: string) {
  const lines = text.split('\n')
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(_[^_]+_)/g)
    return (
      <span key={lineIdx}>
        {parts.map((part, partIdx) => {
          if (part.length > 2 && part.startsWith('_') && part.endsWith('_')) {
            return (
              <span key={partIdx} className="italic text-ocean-light">
                {part.slice(1, -1)}
              </span>
            )
          }
          return <span key={partIdx}>{part}</span>
        })}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    )
  })
}

export default function Hero({ videos, headline, subhead }: Props) {
  const safeVideos = videos.length > 0 ? videos : []
  const count = safeVideos.length

  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLVideoElement | null)[]>([])
  const setRef = (i: number) => (el: HTMLVideoElement | null) => {
    refs.current[i] = el
  }

  const next = count ? (active + 1) % count : 0

  const advance = useCallback(() => {
    if (!count) return
    setActive((prev) => (prev + 1) % count)
  }, [count])

  useEffect(() => {
    if (!count) return
    const vid = refs.current[active]
    if (!vid) return

    vid.playbackRate = getPlaybackRate(safeVideos[active])
    try {
      vid.currentTime = 0
    } catch {}

    const tryPlay = () => {
      const p = vid.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    tryPlay()
    if (vid.readyState < 3) {
      vid.addEventListener('canplay', tryPlay, { once: true })
      vid.addEventListener('loadeddata', tryPlay, { once: true })
    }

    const timer = setTimeout(advance, SKIP_MS)

    const nextVid = refs.current[next]
    if (nextVid) {
      nextVid.preload = 'auto'
      try {
        nextVid.load()
      } catch {}
    }

    return () => {
      clearTimeout(timer)
      vid.removeEventListener('canplay', tryPlay)
      vid.removeEventListener('loadeddata', tryPlay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, advance, count])

  const handleEnded = (index: number) => {
    if (index === active) advance()
  }

  const headingText = headline?.trim() || 'Real Estate Valuation & Consultancy'

  return (
    <section className="relative h-screen overflow-hidden bg-navy">
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

      {safeVideos.map((src, i) => (
        <video
          key={src + i}
          ref={setRef(i)}
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-[4.5%]">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="font-serif font-medium text-[clamp(48px,6vw,84px)] leading-[1.05] text-white"
        >
          {renderHeadline(headingText)}
        </motion.h1>

        {subhead && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            className="text-white/70 text-[18px] font-light mt-5 max-w-[640px] leading-relaxed"
          >
            {subhead}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <Button href="/about" variant="ocean">
            Who We Are
          </Button>
          <Button href="/gallery" variant="outline-light">
            View Our Work
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-[4.5%] z-10 flex items-center gap-3">
        <span className="w-px h-[40px] bg-gold/40" />
        <span className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-serif">
          Scroll to explore
        </span>
      </div>
    </section>
  )
}

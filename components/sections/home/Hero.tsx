'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { optimizeCldVideoUrl } from '@/lib/cloudinary/client'

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
  const [subheadExpanded, setSubheadExpanded] = useState(false)
  const [subheadFading, setSubheadFading] = useState(false)
  const subheadTimer = useRef<ReturnType<typeof setTimeout>>()
  // Tracks which videos have actually been requested. We only attach a <source>
  // for videos in this set, so a visitor who bounces after a few seconds never
  // downloads the clips they didn't see — the main bandwidth saving.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]))
  const refs = useRef<(HTMLVideoElement | null)[]>([])
  const setRef = (i: number) => (el: HTMLVideoElement | null) => {
    refs.current[i] = el
  }

  const next = count ? (active + 1) % count : 0

  const advance = useCallback(() => {
    if (!count) return
    setActive((prev) => (prev + 1) % count)
  }, [count])

  // Mark the current and upcoming clip as loaded so their <source> is rendered.
  useEffect(() => {
    if (!count) return
    setLoaded((prev) => {
      if (prev.has(active) && prev.has(next)) return prev
      const updated = new Set(prev)
      updated.add(active)
      updated.add(next)
      return updated
    })
  }, [active, next, count])

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

  useEffect(() => () => clearTimeout(subheadTimer.current), [])

  // text-align can't animate, so the text fades out, changes alignment and size
  // while hidden, and fades back in as the panel finishes resizing.
  const toggleSubhead = () => {
    clearTimeout(subheadTimer.current)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSubheadExpanded((open) => !open)
      return
    }
    setSubheadFading(true)
    subheadTimer.current = setTimeout(() => {
      setSubheadExpanded((open) => !open)
      subheadTimer.current = setTimeout(() => setSubheadFading(false), 200)
    }, 150)
  }

  const handleEnded = (index: number) => {
    if (index === active) advance()
  }

  const headingText = headline?.trim() || 'Real Estate Valuation & Consultancy'
  // Phones lead with the first sentence in larger text; "Read more" reveals the
  // rest at the desktop size. Wider screens always show the full paragraph.
  const subheadLead = subhead?.match(/^[\s\S]+?[.!?](?=\s|$)/)?.[0] ?? subhead ?? ''
  const subheadRest = subhead?.slice(subheadLead.length) ?? ''

  return (
    <section className="relative min-h-screen sm:h-screen overflow-hidden bg-navy">
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

      {safeVideos.map((src, i) => {
        // Only attach the source for clips that are active, queued next, or
        // already seen — everything else stays unloaded until needed.
        const shouldLoad = i === active || i === next || loaded.has(i)
        return (
          <video
            key={src + i}
            ref={setRef(i)}
            preload={i === active || i === next ? 'auto' : 'none'}
            muted
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
            {shouldLoad && (
              <source src={optimizeCldVideoUrl(src)} type="video/mp4" />
            )}
          </video>
        )
      })}

      <div className="absolute inset-0 bg-black/25" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(11,31,58,0.55) 0%, rgba(11,31,58,0.25) 60%, transparent 100%)',
        }}
      />

      <div className="relative z-10 min-h-screen sm:min-h-0 sm:h-full flex flex-col items-center justify-center text-center px-[4.5%] pt-[116px] pb-20 sm:py-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="font-serif font-medium text-[clamp(48px,6vw,84px)] leading-[1.05] text-white"
          style={{
            textShadow:
              '0 2px 4px rgba(11,31,58,0.6), 0 4px 28px rgba(11,31,58,0.55)',
          }}
        >
          {renderHeadline(headingText)}
        </motion.h1>

        {subhead && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            className={`${
              subheadExpanded ? 'text-[18px] leading-[1.6] text-left' : 'text-[21px] leading-[1.4] text-center'
            } sm:text-[18px] sm:leading-[1.6] sm:text-left font-semibold mt-5 max-w-[600px] px-5 sm:px-6 py-4 rounded-[12px] backdrop-blur-[12px] transition-[font-size,line-height] duration-500 ease-out motion-reduce:transition-none`}
            style={{
              // Liquid glass: a barely-there white tint doing the refraction
              // work via backdrop-blur rather than opacity, so the footage
              // stays visible through the panel.
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.25)',
              // Outer drop for lift off the video, plus an inset top highlight
              // — the catch of light along the top edge that reads as glass
              // rather than a flat translucent box.
              boxShadow:
                '0 8px 32px rgba(11,31,58,0.28), inset 0 1px 0 rgba(255,255,255,0.35)',
              color: '#FFFFFF',
              // With the tint down to 0.08 the halo carries most of the
              // contrast; the blur still flattens the backdrop behind it.
              textShadow:
                '0 1px 2px rgba(11,31,58,0.62), 0 0 16px rgba(11,31,58,0.48)',
            }}
          >
            <span
              className={`block sm:!opacity-100 transition-opacity duration-200 motion-reduce:transition-none ${
                subheadFading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {subheadLead}
              {subheadRest && (
                <>
                  {/* Animating a grid row from 0fr to 1fr transitions to the text's natural height.
                    Collapsed by height only, not display or visibility, so the full
                    text stays in the HTML and the rendered page for crawlers. */}
                  <span
                    id="hero-subhead-more"
                    className={`grid sm:inline transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
                      subheadExpanded
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0 sm:opacity-100'
                    }`}
                  >
                    <span className="min-h-0 min-w-0 overflow-hidden sm:overflow-visible">
                      {subheadRest}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={toggleSubhead}
                    aria-expanded={subheadExpanded}
                    aria-controls="hero-subhead-more"
                    className={`sm:hidden ${subheadExpanded ? 'mr-auto' : 'mx-auto'} mt-1 -mb-2 flex min-h-[44px] items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.14em] text-white`}
                  >
                    {subheadExpanded ? 'Read less' : 'Read more'}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className={`w-3.5 h-3.5 transition-transform duration-500 ${subheadExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </>
              )}
            </span>
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

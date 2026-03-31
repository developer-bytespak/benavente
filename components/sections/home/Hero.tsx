'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

const slides = [
  {
    video: '/images/hero/video-1.mov',
    eyebrow: 'Hawai\u2018i & Pacific Islands',
    heading: (
      <>
        Real Estate<br />
        <span className="italic text-gold-light">Valuation</span><br />
        &amp; Advisory
      </>
    ),
  },
  {
    video: '/images/hero/video-2.mov',
    eyebrow: 'Trusted Across the Pacific',
    heading: (
      <>
        Expert <span className="italic text-gold-light">Appraisal</span><br />
        &amp; Consulting
      </>
    ),
  },
]

const textVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: [0.42, 0, 1, 1] as const } },
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const videoRef0 = useRef<HTMLVideoElement>(null)
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRefs = [videoRef0, videoRef1]

  const handleVideoEnd = useCallback(() => {
    const next = (current + 1) % slides.length
    setCurrent(next)
  }, [current])

  // Play the current video at 2x speed when slide changes
  useEffect(() => {
    videoRefs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.playbackRate = 2
        if (i === current) {
          ref.current.currentTime = 0
          ref.current.play().catch(() => {})
        } else {
          ref.current.pause()
        }
      }
    })
  }, [current])

  const slide = slides[current]

  return (
    <section className="relative min-h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Video backgrounds — both always mounted, opacity toggles */}
      {slides.map((s, i) => (
        <video
          key={i}
          ref={videoRefs[i]}
          src={s.video}
          muted
          playsInline
          onEnded={i === current ? handleVideoEnd : undefined}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Subtle bottom gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

      {/* Content — centered */}
      <div className="relative z-10 text-center px-[4.5%]">
        {/* Text that changes per slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.div variants={textVariants} className="flex items-center justify-center gap-2.5 mb-6">
              <span className="w-[26px] h-px bg-gold" />
              <span className="text-gold text-[11px] tracking-[0.25em] uppercase font-sans font-medium">
                {slide.eyebrow}
              </span>
              <span className="w-[26px] h-px bg-gold" />
            </motion.div>

            <motion.h1
              variants={textVariants}
              className="font-serif font-light text-[clamp(48px,6vw,84px)] leading-[1.05] text-white"
            >
              {slide.heading}
            </motion.h1>
          </motion.div>
        </AnimatePresence>

        {/* Buttons — static, never swipe */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button href="/contact" variant="gold">Request a Consultation</Button>
          <Button href="/gallery" variant="outline-light">View Our Work</Button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-8 h-[2px] rounded-full transition-all duration-500 ${
              i === current ? 'bg-gold w-12' : 'bg-white/30'
            }`}
          />
        ))}
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

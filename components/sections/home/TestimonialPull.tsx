'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { testimonials } from '@/lib/data/testimonials'

const ROTATION_MS = 6000

export default function TestimonialPull() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % testimonials.length),
      ROTATION_MS
    )
    return () => clearTimeout(t)
  }, [index, paused])

  const goPrev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const goNext = () => setIndex((i) => (i + 1) % testimonials.length)

  return (
    <section
      className="bg-cream border-y border-gold/12 py-[90px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <RevealOnScroll>
        <div className="max-w-[920px] mx-auto text-center px-[4.5%]">
          <div className="font-serif text-[100px] text-gold/20 leading-none select-none">
            &ldquo;
          </div>

          <div className="-mt-[30px] min-h-[180px] sm:min-h-[160px] flex items-start justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="font-serif italic text-[clamp(18px,2.2vw,24px)] text-navy leading-[1.6]"
              >
                {testimonials[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="w-9 h-px bg-gold mx-auto mt-8 mb-6" />

          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={goPrev}
              className="text-navy/50 hover:text-gold transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="font-serif italic text-navy/60 text-[13px] tracking-wider tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={goNext}
              className="text-navy/50 hover:text-gold transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}

'use client'

import { useState } from 'react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import type { TestimonialRow } from '@/lib/supabase/types'

interface Props {
  testimonials: TestimonialRow[]
}

function Card({ t }: { t: TestimonialRow }) {
  return (
    <div className="shrink-0 w-[clamp(320px,80vw,520px)] mx-8 flex flex-col items-start">
      <span className="font-serif text-[56px] text-gold/30 leading-none select-none">
        &ldquo;
      </span>
      <p className="font-serif italic text-[clamp(16px,1.6vw,20px)] text-navy leading-[1.6] -mt-2">
        {t.quote}
      </p>
      {(t.author || t.company) && (
        <p className="text-slate text-[12px] font-serif mt-3 tracking-[0.05em]">
          — {[t.author, t.company].filter(Boolean).join(', ')}
        </p>
      )}
    </div>
  )
}

export default function TestimonialPull({ testimonials }: Props) {
  const [paused, setPaused] = useState(false)

  if (testimonials.length === 0) return null

  const duration = Math.max(testimonials.length * 10, 30)

  return (
    <section
      className="bg-cream border-y border-gold/12 py-[90px] overflow-hidden relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <RevealOnScroll>
        <div className="relative">
          <div
            className="track flex w-max"
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
          >
            {testimonials.map((t) => (
              <Card key={t.id} t={t} />
            ))}
            {testimonials.map((t) => (
              <Card key={`${t.id}-dup`} t={t} />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-cream to-transparent" />
        </div>
      </RevealOnScroll>

      {/* Mobile / touch-device control. Hidden on lg+ where mouse hover handles pause. */}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Resume testimonials' : 'Pause testimonials'}
        className="lg:hidden absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/85 hover:bg-white border border-gold/20 text-navy flex items-center justify-center shadow-sm backdrop-blur transition-colors"
      >
        {paused ? (
          <svg
            className="w-4 h-4 ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        )}
      </button>

      <style jsx>{`
        @keyframes testimonials-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .track {
          animation: testimonials-marquee ${duration}s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  )
}

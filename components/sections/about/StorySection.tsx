'use client'

import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import CountUp from '@/components/ui/CountUp'
import type { StatItem } from '@/lib/supabase/types'

interface Props {
  heading: string | null
  paragraphs: string[]
  stats: StatItem[]
}

// _word_ → italic + gold accent. \n → <br/>.
function renderMultiline(text: string) {
  const lines = text.split('\n')
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(_[^_]+_)/g)
    return (
      <span key={lineIdx}>
        {parts.map((part, partIdx) => {
          if (part.length > 2 && part.startsWith('_') && part.endsWith('_')) {
            return (
              <span key={partIdx} className="italic text-gold">
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

export default function StorySection({ heading, paragraphs, stats }: Props) {
  if (!heading && paragraphs.length === 0) return null

  return (
    <section className="bg-white min-h-screen flex items-center py-16 px-[4.5%]">
      <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <RevealOnScroll className="self-stretch">
          <div className="relative h-full min-h-[420px] lg:min-h-[600px] rounded-[2px] overflow-hidden">
            <Image
              src="/images/regions/maui.webp"
              alt="Maui coastline with West Maui mountains"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="self-center">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            {heading && (
              <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
                {renderMultiline(heading)}
              </h2>
            )}
            {paragraphs.map((p, i) => (
              <p key={i} className="text-navy text-[17px] font-light leading-[1.75] mt-4">
                {p}
              </p>
            ))}

            {stats.length > 0 && (
              <div className="flex gap-8 mt-6 flex-wrap">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-gold pl-4">
                    <div className="font-serif text-[28px] text-navy font-light leading-none">
                      <CountUp target={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-[13px] text-slate uppercase tracking-[0.15em] font-serif mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              <MicroCTA href="/contact">Work With Us</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

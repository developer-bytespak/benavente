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

export default function IntroSplit({ heading, paragraphs, stats }: Props) {
  const hasContent = heading || paragraphs.length > 0
  if (!hasContent) return null

  // Show first three stats here; the full set is rendered later in StatsRow.
  const introStats = stats.slice(0, 3)
  const yearsStat = stats.find((s) => /year/i.test(s.label)) ?? stats[0]

  return (
    <section className="bg-white min-h-screen flex items-center py-16 px-[4.5%]">
      <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <RevealOnScroll className="self-stretch">
          <div className="relative h-full min-h-[420px] lg:min-h-[600px]">
            <div className="relative h-full rounded-[2px] overflow-hidden">
              <Image
                src="/images/regions/oahu-lanikai.webp"
                alt="Lanikai coastline, Oahu"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            {yearsStat && (
              <div className="absolute -top-5 -right-5 bg-navy rounded-full w-[120px] h-[120px] flex flex-col items-center justify-center shadow-xl shadow-navy/25">
                <CountUp
                  target={yearsStat.number}
                  suffix={yearsStat.suffix}
                  className="text-white font-serif text-[32px] font-light leading-none"
                />
                <span className="text-gold text-[10px] uppercase tracking-[0.15em] font-serif mt-1">
                  Years of Trust
                </span>
              </div>
            )}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="self-center">
          <div>
            <SectionLabel>About the Firm</SectionLabel>
            {heading && (
              <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
                {heading}
              </h2>
            )}
            {paragraphs.map((p, i) => (
              <p key={i} className="text-navy text-[17px] font-light leading-[1.75] mt-4 first:mt-4">
                {p}
              </p>
            ))}

            {introStats.length > 0 && (
              <div className="flex gap-8 mt-6 flex-wrap">
                {introStats.map((stat) => (
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

            <div className="flex flex-col gap-3 mt-6">
              <MicroCTA href="/about">Discover Our Approach</MicroCTA>
              <MicroCTA href="/gallery">View Our Work</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

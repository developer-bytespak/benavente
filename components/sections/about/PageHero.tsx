'use client'

import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

interface Props {
  bannerUrl: string | null
  headline: string | null
  subtitle: string | null
}

// _word_ → italic + gold-light accent. \n → <br/>.
function renderMultiline(text: string) {
  const lines = text.split('\n')
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(_[^_]+_)/g)
    return (
      <span key={lineIdx}>
        {parts.map((part, partIdx) => {
          if (part.length > 2 && part.startsWith('_') && part.endsWith('_')) {
            return (
              <span key={partIdx} className="italic text-gold-light">
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

export default function PageHero({ bannerUrl, headline, subtitle }: Props) {
  const banner = bannerUrl || '/images/regions/oahu-lanikai.webp'
  const heading = headline?.trim() || 'Experts Rooted in Hawai‘i & the Pacific'

  return (
    <section className="relative bg-navy min-h-screen flex items-center pt-[120px] pb-[60px] px-[4.5%] overflow-hidden">
      <Image
        src={banner}
        alt="About banner"
        fill
        sizes="100vw"
        priority
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />

      <RevealOnScroll>
        <div className="relative max-w-[1280px] mx-auto">
          <SectionLabel variant="light">Hawaii Commercial Appraisal Firm</SectionLabel>
          <h1 className="font-serif text-[clamp(44px,6vw,72px)] text-white leading-[1.08]">
            {renderMultiline(heading)}
          </h1>
          {subtitle && (
            <p className="text-white/[0.58] text-[18px] font-light leading-[1.85] max-w-[560px] mt-5">
              {subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-5 mt-7">
            <MicroCTA href="/contact" variant="light">Contact Us</MicroCTA>
            <MicroCTA href="/gallery" variant="light">View Our Work</MicroCTA>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}

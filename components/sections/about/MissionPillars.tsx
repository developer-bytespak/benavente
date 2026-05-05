'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import type { CoreValueItem } from '@/lib/supabase/types'

interface Props {
  missionHeadline: string | null
  missionText: string | null
  values: CoreValueItem[]
}

function renderMultiline(text: string) {
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ))
}

export default function MissionPillars({ missionHeadline, missionText, values }: Props) {
  return (
    <section className="bg-cream border-y border-gold/12 py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <RevealOnScroll>
          <div>
            <SectionLabel>Our Mission</SectionLabel>
            {missionHeadline && (
              <p className="font-serif font-light italic text-[clamp(28px,3.5vw,40px)] text-navy leading-[1.35]">
                {renderMultiline(missionHeadline)}
              </p>
            )}
            {missionText && (
              <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-5">{missionText}</p>
            )}
            <div className="mt-8">
              <MicroCTA href="/contact">Discover Our Approach</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>

        {values.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((pillar, i) => (
              <RevealOnScroll key={pillar.number || pillar.name} delay={i * 0.08}>
                <div className="bg-white border border-gold/15 p-7 rounded-[2px] h-full">
                  <span className="text-gold font-serif text-[12px] tracking-[0.2em]">
                    {pillar.number}
                  </span>
                  <h3 className="font-serif text-[22px] text-navy mt-3">{pillar.name}</h3>
                  <p className="font-serif font-light text-[17px] text-navy mt-2 leading-[1.7]">
                    {pillar.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

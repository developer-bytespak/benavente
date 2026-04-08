'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { regions } from '@/lib/data/regions'

export default function RegionsCoverage() {
  return (
    <section className="bg-white border-t border-gold/12 py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto">
        <RevealOnScroll>
          <SectionLabel>Coverage</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
            Serving <span className="italic text-gold">Hawai&#8216;i</span> &amp; the Pacific
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-12">
            {regions.map((region, i) => (
              <div
                key={region.name}
                className={`px-5 py-4 ${i < regions.length - 1 ? 'lg:border-r border-gold/15' : ''} ${i < regions.length - 2 ? 'border-b lg:border-b-0 border-gold/15' : ''}`}
              >
                <div className="font-serif text-[20px] text-navy">{region.name}</div>
                <div className="font-serif font-light text-[17px] text-navy mt-1">{region.note}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

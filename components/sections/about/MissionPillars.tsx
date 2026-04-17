'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const pillars = [
  { number: '01', name: 'Accuracy', desc: 'Every valuation is grounded in rigorous analysis, defensible methodology, and deep local market expertise.' },
  { number: '02', name: 'Integrity', desc: 'We provide independent, unbiased assessments that clients and courts can rely on without reservation.' },
  { number: '03', name: 'Timeliness', desc: 'Our process is built to deliver thorough, court-ready reports on schedule — every time.' },
  { number: '04', name: 'Local Knowledge', desc: 'Deep roots in Hawai\u2018i and the Pacific give us market insight no mainland firm can replicate.' },
]

export default function MissionPillars() {
  return (
    <section className="bg-cream border-y border-gold/12 py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <RevealOnScroll>
          <div>
            <SectionLabel>Our Mission</SectionLabel>
            <p className="font-serif font-light italic text-[clamp(28px,3.5vw,40px)] text-navy leading-[1.35]">
              Credible Solutions.<br />Timely Results.
            </p>
            <div className="mt-8">
              <MicroCTA href="/contact">Discover Our Approach</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar, i) => (
            <RevealOnScroll key={pillar.number} delay={i * 0.08}>
              <div className="bg-white border border-gold/15 p-7 rounded-[2px] h-full">
                <span className="text-gold font-serif text-[12px] tracking-[0.2em]">{pillar.number}</span>
                <h3 className="font-serif text-[22px] text-navy mt-3">{pillar.name}</h3>
                <p className="font-serif font-light text-[17px] text-navy mt-2 leading-[1.7]">{pillar.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

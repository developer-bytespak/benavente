'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import CountUp from '@/components/ui/CountUp'

const stats = [
  { number: 50, suffix: '+', label: 'Yrs. Experience' },
  { number: 500, suffix: '+', label: 'Assignments' },
  { number: 6, suffix: '', label: 'Pacific Regions' },
]

export default function StorySection() {
  return (
    <section className="bg-white py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <RevealOnScroll>
          <div className="aspect-[3/4] bg-gradient-to-br from-cream-deeper to-cream-dark rounded-[2px]" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
              Built on Integrity,<br />
              <span className="italic text-gold">Driven by Expertise</span>
            </h2>
            <p className="text-slate text-[14.5px] font-light leading-[1.85] mt-5">
              The Benavente Group was founded to bring professional-grade real estate economics and valuation services to Hawai&#8216;i and the broader Pacific region. Our principals bring decades of hands-on experience across all major property types — from Class A office buildings to luxury resort properties, from industrial subdivisions to Pacific island hospitality assets.
            </p>
            <p className="text-slate text-[14.5px] font-light leading-[1.85] mt-4">
              We understand that our clients — attorneys, lenders, developers, and government agencies — depend on defensible, accurate valuations delivered on schedule. That trust drives everything we do.
            </p>

            <div className="flex gap-8 mt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-gold pl-4">
                  <div className="font-serif text-[28px] text-navy font-light leading-none"><CountUp target={stat.number} suffix={stat.suffix} /></div>
                  <div className="text-[10px] text-slate uppercase tracking-[0.15em] font-sans mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <MicroCTA href="/contact">Work With Us</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

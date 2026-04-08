'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import CountUp from '@/components/ui/CountUp'

const miniStats = [
  { number: 50, suffix: '+', label: 'Yrs. Experience' },
  { number: 6, suffix: '', label: 'Pacific Regions' },
  { number: 500, suffix: '+', label: 'Assignments' },
]

export default function IntroSplit() {
  return (
    <section className="bg-white py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-20">
        {/* Left — Image */}
        <RevealOnScroll>
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-cream-deeper to-cream-dark rounded-[2px] overflow-hidden" />
            <div className="absolute -bottom-[18px] -right-[18px] w-[55%] h-[55%] border border-gold/30 -z-[1]" />
            <div className="absolute -top-4 -right-4 bg-navy rounded-full w-[110px] h-[110px] flex flex-col items-center justify-center">
              <CountUp target={50} suffix="+" className="text-white font-serif text-[30px] font-light leading-none" />
              <span className="text-gold text-[10px] uppercase tracking-[0.15em] font-serif mt-1">Years of Trust</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Right — Text */}
        <RevealOnScroll delay={0.15}>
          <div>
            <SectionLabel>About the Firm</SectionLabel>
            <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
              A Trusted Name in <span className="italic text-gold">Pacific Real Estate</span>
            </h2>
            <p className="text-navy text-[18px] font-light leading-[1.85] mt-5">
              The Benavente Group is a team of professionals specializing in real estate economics, valuation, and market analysis. We make it our business to understand the dynamics of market movements, motivations of buyers and sellers, and the specific needs of our clients.
            </p>
            <p className="text-navy text-[18px] font-light leading-[1.85] mt-4">
              With over 50 years of combined experience, we offer the professionalism, valuation expertise, and technical skills necessary to deliver credible solutions across Hawai&#8216;i, Guam, Saipan, the Marshall Islands, and beyond.
            </p>

            {/* Mini Stats */}
            <div className="flex gap-8 mt-8">
              {miniStats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-gold pl-4">
                  <div className="font-serif text-[28px] text-navy font-light leading-none"><CountUp target={stat.number} suffix={stat.suffix} /></div>
                  <div className="text-[13px] text-slate uppercase tracking-[0.15em] font-serif mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Micro CTAs */}
            <div className="flex flex-col gap-3 mt-8">
              <MicroCTA href="/about">Discover Our Approach</MicroCTA>
              <MicroCTA href="/gallery">View Our Work</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function PageHero() {
  return (
    <section className="bg-cream border-b border-gold/15 pt-[160px] pb-[80px] px-[4.5%]">
      <RevealOnScroll>
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel>About the Firm</SectionLabel>
          <h1 className="font-serif text-[clamp(44px,6vw,72px)] text-navy leading-[1.08]">
            Experts Rooted in<br />
            <span className="italic text-gold">Hawai&#8216;i &amp; the Pacific</span>
          </h1>
          <p className="text-slate text-[16px] font-light leading-[1.85] max-w-[560px] mt-5">
            A team of credentialed professionals with over 50 years of combined experience in real estate economics, valuation, and market analysis.
          </p>
          <div className="flex flex-wrap gap-5 mt-7">
            <MicroCTA href="/contact">Request Consultation</MicroCTA>
            <MicroCTA href="/gallery">View Our Work</MicroCTA>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}

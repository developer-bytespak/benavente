'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function PageHero() {
  return (
    <section className="bg-navy pt-[160px] pb-[80px] px-[4.5%]">
      <RevealOnScroll>
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel variant="light">About the Firm</SectionLabel>
          <h1 className="font-serif text-[clamp(44px,6vw,72px)] text-white leading-[1.08]">
            Experts Rooted in<br />
            <span className="italic text-gold-light">Hawai&#8216;i &amp; the Pacific</span>
          </h1>
          <p className="text-white/[0.58] text-[16px] font-light leading-[1.85] max-w-[560px] mt-5">
            A team of credentialed professionals with over 50 years of combined experience in real estate economics, valuation, and market analysis.
          </p>
          <div className="flex flex-wrap gap-5 mt-7">
            <MicroCTA href="/contact" variant="light">Request Consultation</MicroCTA>
            <MicroCTA href="/gallery" variant="light">View Our Work</MicroCTA>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}

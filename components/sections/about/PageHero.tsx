'use client'

import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function PageHero() {
  return (
    <section className="relative bg-navy pt-[160px] pb-[80px] px-[4.5%] overflow-hidden">
      {/* Background image with overlay */}
      <Image
        src="/images/regions/oahu-lanikai.webp"
        alt="Aerial view of Oahu coastline"
        fill
        sizes="100vw"
        priority
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />

      <RevealOnScroll>
        <div className="relative max-w-[1280px] mx-auto">
          <SectionLabel variant="light">About the Firm</SectionLabel>
          <h1 className="font-serif text-[clamp(44px,6vw,72px)] text-white leading-[1.08]">
            Experts Rooted in<br />
            <span className="italic text-gold-light">Hawai&#8216;i &amp; the Pacific</span>
          </h1>
          <p className="text-white/[0.58] text-[18px] font-light leading-[1.85] max-w-[560px] mt-5">
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

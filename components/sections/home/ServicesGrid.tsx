'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { services } from '@/lib/data/services'

export default function ServicesGrid() {
  return (
    <section className="bg-cream py-[108px] px-[4.5%]">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gold/20 pb-5 mb-10 gap-4">
        <div>
          <SectionLabel>Our Services</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
            Expert Real Estate <span className="italic text-gold">Services</span>
          </h2>
        </div>
        <MicroCTA href="/contact">Explore Services</MicroCTA>
      </div>

      {/* Grid */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/15">
        {services.map((service, index) => (
          <RevealOnScroll key={service.id} delay={index * 0.08}>
            <div className="group bg-white hover:bg-cream p-[44px_36px] relative transition-colors duration-300 overflow-hidden">
              {/* Hover border */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

              <span className="text-gold font-serif text-[11px] tracking-[0.2em]">{service.number}</span>

              {/* Icon placeholder */}
              <div className="w-10 h-10 border border-gold/20 rounded-full flex items-center justify-center mt-4 mb-5">
                <span className="w-2 h-2 rounded-full bg-gold/40" />
              </div>

              <h3 className="font-serif text-[22px] text-navy">{service.name}</h3>
              <p className="font-sans font-light text-[13px] text-slate mt-2 leading-[1.7]">{service.shortDesc}</p>
              <div className="mt-5">
                <MicroCTA href="/contact">Learn More</MicroCTA>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

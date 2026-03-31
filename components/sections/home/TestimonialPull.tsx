'use client'

import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function TestimonialPull() {
  return (
    <section className="bg-cream border-y border-gold/12 py-[90px]">
      <RevealOnScroll>
        <div className="max-w-[800px] mx-auto text-center px-[4.5%]">
          <div className="font-serif text-[100px] text-gold/20 leading-none select-none">&ldquo;</div>
          <p className="font-serif italic text-[clamp(20px,2.5vw,26px)] text-navy leading-[1.55] -mt-[30px]">
            The Benavente Group provided an exceptionally thorough valuation report that withstood intense scrutiny during litigation proceedings. Their market expertise is unmatched in Hawaii.
          </p>
          <div className="w-9 h-px bg-gold mx-auto mt-8 mb-6" />
          <div className="font-sans font-medium text-[12px] tracking-[0.14em] uppercase text-navy">
            DAVID K. MATSUMOTO
          </div>
          <div className="font-sans font-light text-[12px] text-slate-light mt-1">
            Real Estate Attorney, Honolulu
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}

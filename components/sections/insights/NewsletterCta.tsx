'use client'

import MicroCTA from '@/components/ui/MicroCTA'
import Button from '@/components/ui/Button'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function NewsletterCta() {
  return (
    <section className="bg-navy py-[80px] px-[4.5%]">
      <RevealOnScroll>
        <div className="max-w-[520px] mx-auto text-center">
          <h2 className="font-serif text-[clamp(30px,4vw,42px)] text-white leading-[1.15]">
            Get the Latest Market <span className="italic text-gold">Insights</span>
          </h2>
          <p className="text-white/[0.52] text-[18px] font-light mt-4">
            Subscribe for periodic analysis on Hawai&#8216;i and Pacific real estate markets.
          </p>
          <form className="flex gap-3 mt-8" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/15 focus:border-gold focus:outline-none px-4 py-3 text-[15px] font-serif text-white placeholder:text-white/30 rounded-[2px]"
            />
            <Button variant="gold" type="submit">Subscribe</Button>
          </form>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <MicroCTA href="/contact" variant="light">Contact Us</MicroCTA>
            <MicroCTA href="/gallery" variant="light">View Our Work</MicroCTA>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}

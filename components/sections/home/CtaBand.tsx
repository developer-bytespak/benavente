'use client'

import MicroCTA from '@/components/ui/MicroCTA'
import Button from '@/components/ui/Button'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function CtaBand() {
  return (
    <section className="bg-navy py-[100px] px-[4.5%]">
      <RevealOnScroll>
        <div className="max-w-[620px] mx-auto text-center">
          <h2 className="font-serif text-[clamp(34px,4.5vw,50px)] text-white leading-[1.15]">
            Ready for <span className="italic text-gold">Credible,</span><br />
            Timely Results?
          </h2>
          <p className="text-white/[0.52] text-[16px] font-light leading-[1.8] mt-5">
            Whether you need a commercial appraisal, litigation support, or market analysis, our team is ready to deliver the expertise your project demands.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button href="/contact" variant="gold">Request a Consultation</Button>
            <Button href="/gallery" variant="outline-light">View Our Work</Button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <MicroCTA href="/about" variant="light">Discover Our Approach</MicroCTA>
            <MicroCTA href="/blog" variant="light">Read Blogs</MicroCTA>
            <MicroCTA href="/gallery" variant="light">See Full Portfolio</MicroCTA>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}

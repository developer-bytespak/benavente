import Image from 'next/image'
import Button from '@/components/ui/Button'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import Accent from './Accent'

interface Props {
  heading?: string
  text?: string
  image?: string
  ctaLabel?: string
}

export default function ServiceCta({
  heading = 'Discuss Your\n_Assignment_ With Us',
  text = 'Tell us about the property, the purpose and your timeline. We will respond promptly with scope, approach and next steps.',
  image = '/images/regions/oahu-valley.webp',
  ctaLabel = 'Discuss Your Assignment',
}: Props) {
  return (
    <section className="relative bg-navy py-[110px] px-[4.5%] overflow-hidden">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-[0.12]" />
      <RevealOnScroll>
        <div className="relative max-w-[680px] mx-auto text-center">
          <span className="block w-px h-12 bg-gold/50 mx-auto mb-8" aria-hidden="true" />
          <h2 className="font-serif text-[clamp(34px,4.5vw,52px)] text-white leading-[1.15]">
            <Accent text={heading} accentClass="italic text-gold" />
          </h2>
          <p className="text-white/[0.55] text-[18px] font-light leading-[1.8] mt-5">{text}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-9">
            <Button href="/contact" variant="ocean">
              {ctaLabel}
            </Button>
            <Button href="/gallery" variant="outline-light">
              View Our Work
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <MicroCTA href="/about" variant="light">Meet the Team</MicroCTA>
            <MicroCTA href="/services" variant="light">All Services</MicroCTA>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}

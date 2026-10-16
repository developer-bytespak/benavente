import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import Accent from './Accent'
import ServiceInquiryForm from './ServiceInquiryForm'

export const INQUIRY_ANCHOR = 'inquiry'

interface Props {
  service: string
  heading: string
  text: string
  image: string
}

// Closing section of each service landing page: the full inquiry form.
export default function ServiceInquiry({ service, heading, text, image }: Props) {
  return (
    <section id={INQUIRY_ANCHOR} className="relative bg-navy py-[100px] lg:py-[120px] px-[4.5%] overflow-hidden scroll-mt-20">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-[0.1]" />
      <div className="relative max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
        <RevealOnScroll className="lg:sticky lg:top-28">
          <SectionLabel variant="light">Request a Proposal</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4.2vw,52px)] text-white leading-[1.15]">
            <Accent text={heading} accentClass="italic text-gold-light" />
          </h2>
          <p className="text-white/[0.6] text-[17px] font-light leading-[1.85] mt-6 max-w-[460px]">{text}</p>
          <p className="text-white/[0.6] text-[16px] font-light leading-[1.8] mt-6">
            Prefer to talk?{' '}
            <a href="tel:+18087844320" className="text-gold-light hover:text-white transition-colors duration-300">
              Call (808) 784-4320
            </a>
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-10">
            <MicroCTA href="/gallery" variant="light">View Our Work</MicroCTA>
            <MicroCTA href="/services" variant="light">All Services</MicroCTA>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <div className="bg-white rounded-[2px] p-6 sm:p-10 shadow-2xl shadow-black/20">
            <ServiceInquiryForm service={service} variant="full" />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

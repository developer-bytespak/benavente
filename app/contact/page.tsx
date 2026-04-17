import { Metadata } from 'next'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import ContactForm from '@/components/sections/contact/ContactForm'
import ContactInfo from '@/components/sections/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Request a consultation with The Benavente Group for real estate appraisal, valuation, and consulting services across Hawaii and the Pacific.',
}

export default function ContactPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-navy min-h-screen flex items-center pt-[120px] pb-[60px] px-[4.5%] overflow-hidden">
        <Image
          src="/images/regions/oahu-valley.webp"
          alt="Oahu landscape"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />
        <RevealOnScroll>
          <div className="relative max-w-[1280px] mx-auto">
            <SectionLabel variant="light">Get in Touch</SectionLabel>
            <h1 className="font-serif text-[clamp(44px,6vw,72px)] text-white leading-[1.08]">
              Request a <span className="italic text-gold-light">Consultation</span>
            </h1>
            <p className="text-white/[0.58] text-[18px] font-light leading-[1.85] max-w-[560px] mt-5">
              Our team is ready to discuss your real estate appraisal, valuation, or consulting needs. Let&apos;s talk.
            </p>
            <div className="flex flex-wrap gap-5 mt-7">
              <MicroCTA href="/about" variant="light">About Our Team</MicroCTA>
              <MicroCTA href="/gallery" variant="light">View Our Work</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Contact Main */}
      <section className="bg-white py-16 px-[4.5%]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <RevealOnScroll>
            <ContactForm />
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <ContactInfo />
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}

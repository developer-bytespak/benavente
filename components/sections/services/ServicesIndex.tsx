import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { services, serviceHref } from '@/lib/services'
import GoldRule from './GoldRule'

// Editorial numbered rows. On hover the number turns gold, a gold rule draws
// across the row and a property image slides into view (desktop only).
export default function ServicesIndex() {
  return (
    <section id="services-index" className="bg-white py-[108px] px-[4.5%] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
          <div>
            <SectionLabel>Core Services</SectionLabel>
            <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
              Eight Disciplines, <span className="italic text-gold">One Standard</span>
            </h2>
          </div>
          <p className="text-navy/70 text-[16px] font-light leading-[1.8] max-w-[420px]">
            Each service is delivered by designated appraisers and analysts who know Hawai‘i and Pacific markets first-hand.
          </p>
        </div>
        <GoldRule className="opacity-40" />

        <ol>
          {services.map((service, i) => (
            <li key={service.slug}>
              <RevealOnScroll delay={i * 0.06}>
                <Link
                  href={serviceHref(service.slug)}
                  className="group relative grid grid-cols-[auto_1fr_auto] lg:grid-cols-[140px_1fr_260px_48px] items-center gap-x-5 sm:gap-x-8 py-8 lg:py-10 border-b border-gold/20"
                >
                  <span className="self-start lg:self-center font-serif font-light text-[44px] sm:text-[64px] lg:text-[88px] leading-none text-navy/15 group-hover:text-gold transition-colors duration-500">
                    {service.number}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-serif text-[24px] sm:text-[30px] lg:text-[36px] text-navy leading-[1.15] group-hover:text-navy-light transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-slate text-[15px] sm:text-[16px] font-light leading-[1.7] mt-2 max-w-[560px]">
                      {service.summary}
                    </p>
                  </div>

                  <div className="hidden lg:block relative h-[150px] overflow-hidden rounded-[2px]">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="260px"
                      className="object-cover grayscale-[60%] opacity-60 scale-105 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-smooth"
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="self-center text-[22px] text-gold translate-x-0 group-hover:translate-x-2 transition-transform duration-300"
                  >
                    &rarr;
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute left-0 -bottom-px h-px w-full bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-smooth"
                  />
                </Link>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

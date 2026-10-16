import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { getService, serviceHref, type Service } from '@/lib/services'

export default function RelatedServices({
  service,
  plainTitles = false,
}: {
  service: Service
  // Render card titles as text, not headings, where a page's brief rules out
  // other services' names as headings.
  plainTitles?: boolean
}) {
  const related = service.related.map(getService).filter((s): s is Service => Boolean(s))
  if (related.length === 0) return null
  const TitleTag = plainTitles ? 'p' : 'h3'

  return (
    <section className="bg-cream border-t border-gold/12 py-[96px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gold/20 pb-5 mb-10 gap-4">
          <div>
            <SectionLabel>Related Services</SectionLabel>
            <h2 className="font-serif text-[clamp(30px,3.6vw,44px)] text-navy leading-[1.15]">
              Often Engaged <span className="italic text-gold">Alongside</span>
            </h2>
          </div>
          <MicroCTA href="/services">All Services</MicroCTA>
        </div>
        <div
          className={`grid grid-cols-1 gap-2 ${related.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}
        >
          {related.map((r, i) => (
            <RevealOnScroll key={r.slug} delay={i * 0.08}>
              <Link
                href={serviceHref(r.slug)}
                className="group relative block overflow-hidden rounded-[2px] min-h-[280px] lg:min-h-[340px]"
              >
                <Image
                  src={r.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10 group-hover:from-navy/95 transition-colors duration-500 flex flex-col justify-end p-7">
                  <span className="text-gold-light font-serif text-[13px] tracking-[0.2em]">{r.number}</span>
                  <TitleTag className="text-white font-serif text-[24px] leading-[1.2] mt-2">{r.title}</TitleTag>
                  <span className="text-white/70 group-hover:text-gold-light text-[13px] font-serif tracking-[0.1em] uppercase mt-4 inline-flex items-center gap-2 transition-colors duration-300">
                    Learn More
                    <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

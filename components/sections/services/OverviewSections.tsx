import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import GoldRule from './GoldRule'

export function ServicesIntro() {
  return (
    <section className="bg-cream border-b border-gold/12 py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20">
        <RevealOnScroll>
          <SectionLabel>Our Approach</SectionLabel>
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] text-navy leading-[1.15]">
            Independent Analysis for <span className="italic text-gold">Consequential</span> Decisions
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <p className="font-serif font-light italic text-[clamp(22px,2.4vw,28px)] text-navy leading-[1.5]">
            Real estate decisions in island markets are rarely routine. Data is thinner, property rights are more complex and local conditions matter.
          </p>
          <p className="text-navy text-[17px] font-light leading-[1.8] mt-6">
            The Benavente Group provides appraisal, valuation and market research services built for that reality. Whether the question is what a property is worth, what happened to its value, or what the market will support next, we deliver a clearly reasoned answer you can rely on and defend.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}

const audiences = [
  { title: 'Attorneys', desc: 'Litigation, condemnation, estate and family law matters that turn on property value.' },
  { title: 'Lenders', desc: 'Banks and private lenders underwriting commercial real estate loans.' },
  { title: 'Developers', desc: 'Sponsors testing sites, product types and market support for new projects.' },
  { title: 'Owners & Investors', desc: 'Private owners, family offices and institutions managing real estate holdings.' },
  { title: 'Public Agencies', desc: 'State, county and federal agencies acquiring property and planning projects.' },
  { title: 'Fiduciaries', desc: 'Trustees, executors and advisors who need independent, documented value.' },
]

export function WhoWeServe() {
  return (
    <section className="bg-white py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto">
        <RevealOnScroll>
          <div className="max-w-[640px]">
            <SectionLabel>Who We Serve</SectionLabel>
            <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
              Trusted by the People Who <span className="italic text-gold">Rely on Value</span>
            </h2>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-14 border-t border-gold/20">
          {audiences.map((a, i) => (
            <RevealOnScroll key={a.title} delay={(i % 3) * 0.08}>
              <div className="h-full py-9 sm:pr-8 lg:pr-10 border-b border-gold/20">
                <span className="text-gold font-serif text-[12px] tracking-[0.2em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-[26px] text-navy mt-3">{a.title}</h3>
                <p className="text-navy/75 text-[16px] font-light leading-[1.75] mt-2">{a.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

const markets = ['O‘ahu', 'Maui', 'Kaua‘i', 'Hawai‘i Island', 'Guam', 'Saipan', 'Marshall Islands']

export function PacificMarkets() {
  return (
    <section className="bg-navy py-[108px] px-[4.5%] overflow-hidden">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <RevealOnScroll>
          <div className="grid grid-cols-2 grid-rows-[200px_200px] sm:grid-rows-[240px_240px] gap-2">
            <div className="relative row-span-2 overflow-hidden rounded-[2px]">
              <Image
                src="/images/regions/oahu-lanikai.webp"
                alt="Lanikai coastline, O‘ahu"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-[2px]">
              <Image
                src="/images/regions/maui.webp"
                alt="Maui coastline"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-[2px]">
              <Image
                src="/images/regions/guam.webp"
                alt="Guam coastline"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <SectionLabel variant="light">Hawai‘i &amp; Pacific Expertise</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-white leading-[1.15]">
            Island Markets Are <span className="italic text-gold-light">Different.</span> We Know Them.
          </h2>
          <p className="text-white/[0.58] text-[17px] font-light leading-[1.85] mt-6">
            Thin comparable data, leasehold interests, constrained land supply and buyer motivations that differ sharply from the mainland all shape value here. Our team works across every major Hawai‘i island and in Pacific markets, so local context is part of every assignment.
          </p>
          <GoldRule className="opacity-50 mt-9" />
          <ul className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
            {markets.map((m) => (
              <li key={m} className="text-white/75 text-[14px] font-serif tracking-[0.12em] uppercase flex items-center gap-6">
                {m}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <MicroCTA href="/about" variant="light">Our Coverage Areas</MicroCTA>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

const trustPoints = [
  { figure: '2017', label: 'Serving Hawai‘i since' },
  { figure: '50+', label: 'Years of combined experience' },
  { figure: 'MAI · SRA', label: 'Designated appraisers' },
]

const principles = [
  {
    title: 'Independent',
    desc: 'Our opinions are our own. We are engaged for analysis, not outcomes.',
  },
  {
    title: 'Documented',
    desc: 'Reports set out data, assumptions and reasoning so they can be reviewed and tested.',
  },
  {
    title: 'Standards-Based',
    desc: 'Appraisals are prepared in conformance with the Uniform Standards of Professional Appraisal Practice.',
  },
]

export function TrustSection() {
  return (
    <section className="bg-white py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20">
        <RevealOnScroll>
          <SectionLabel>Experience &amp; Credentials</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
            Credibility Earned <span className="italic text-gold">Assignment by Assignment</span>
          </h2>
          <div className="flex flex-wrap gap-x-10 gap-y-6 mt-10">
            {trustPoints.map((p) => (
              <div key={p.label} className="border-l-2 border-gold pl-4">
                <div className="font-serif text-[32px] text-navy font-light leading-none">{p.figure}</div>
                <div className="text-[13px] text-slate uppercase tracking-[0.15em] font-serif mt-2">{p.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <MicroCTA href="/about">Meet the Team</MicroCTA>
          </div>
        </RevealOnScroll>

        <div className="border-t border-gold/20">
          {principles.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.08}>
              <div className="grid grid-cols-[48px_1fr] gap-4 py-8 border-b border-gold/20">
                <span className="text-gold font-serif text-[13px] tracking-[0.2em] pt-2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif text-[26px] text-navy">{p.title}</h3>
                  <p className="text-navy/75 text-[16px] font-light leading-[1.75] mt-1">{p.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

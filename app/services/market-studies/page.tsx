import type { Metadata } from 'next'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import ServiceHero from '@/components/sections/services/ServiceHero'
import RelatedServices from '@/components/sections/services/RelatedServices'
import ServiceInquiry from '@/components/sections/services/ServiceInquiry'
import StickyInquiryButton from '@/components/sections/services/StickyInquiryButton'
import FaqList from '@/components/sections/services/FaqList'
import GoldRule from '@/components/sections/services/GoldRule'
import JsonLd, { absoluteUrl, breadcrumbSchema, providerSchema } from '@/components/sections/services/JsonLd'
import {
  Section,
  SectionHeader,
  Prose,
  TextLink,
  EditorialTable,
  ProcessSteps,
  Checklist,
  Quote,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getService } from '@/lib/services'

const SLUG = 'market-studies'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Hawaii Commercial Real Estate Market Studies | Market Analysis'
const META_DESCRIPTION =
  'Market studies, market rent studies and market analysis for Hawaiʻi and Pacific commercial real estate: demand, supply, absorption and rent, from MAI appraisers.'
const HERO_IMAGE = '/images/gallery/residential-developments/dji_0406.webp'

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESCRIPTION,
  alternates: {
    canonical: URL_PATH,
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: URL_PATH,
    images: [{ url: HERO_IMAGE }],
  },
}

const guide = (slug: string) => `/blog/${slug}`

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Market Studies', href: URL_PATH },
]

const clientGroups = [
  { title: 'Developers', desc: 'Demand evidence before land acquisition or design.' },
  { title: 'Lenders', desc: 'Independent market support for a loan committee.' },
  { title: 'Institutional investors', desc: 'Submarket depth before entering a new island market.' },
  { title: 'Government agencies', desc: 'Demand for housing, commercial and public-private projects.' },
]

const exampleQuestions = [
  'Is there room in a submarket for another warehouse development?',
  'What rent will a new medical office building achieve?',
  'How long will a new rental project take to lease up?',
  'Can a resort area support another hotel?',
  'What will retail tenants pay at a new mixed-use project?',
]

const components = [
  ['Demand analysis', 'Who are the buyers or tenants, and how many are there?'],
  ['Supply pipeline', 'What is built, approved and proposed in the trade area?'],
  ['Absorption', 'How quickly will new space lease up or sell?'],
  ['Vacancy and market rent', 'What will tenants pay, and how much space sits empty?'],
  ['Market saturation', 'Can the market support one more project of this type?'],
  ['Rent comparability', "How do the subject's rents compare with the market?"],
  ['Capture rate', 'What share of demand can this project realistically win?'],
]

const sectors = [
  ['Office', 'Inventory and vacancy by submarket, tenant demand by industry, sublease space, rent and concession trends'],
  ['Retail', 'Trade area population and spending, visitor spending, existing centers, anchor tenant demand'],
  ['Industrial', 'Warehouse and distribution demand, port and airport proximity, land availability, rent and vacancy trends'],
  ['Hospitality', 'Visitor arrivals, occupancy, average daily rate and RevPAR, new supply, competitive set'],
  ['Multifamily', 'Household growth, income levels, rent levels, pipeline of new units, absorption of recent projects'],
]

const islands = [
  {
    name: 'Oʻahu',
    image: '/images/regions/oahu-skyline.webp',
    text: 'Oʻahu has the depth and data of a mid-sized metro, with distinct submarkets from downtown Honolulu to Kapolei.',
  },
  {
    name: 'Maui',
    image: '/images/regions/maui.webp',
    text: "Maui's economy is closely tied to visitor spending and has been reshaped by recovery after the 2023 wildfires.",
  },
  {
    name: 'Hawaiʻi Island',
    image: '/images/regions/big-island.webp',
    text: 'Hawaiʻi Island splits between Hilo and Kona, with very different demand drivers.',
  },
  {
    name: 'Kauaʻi',
    image: '/images/regions/kauai.webp',
    text: 'Kauaʻi is small, supply-constrained and highly sensitive to new projects.',
  },
  {
    name: 'Guam',
    image: '/images/regions/guam.webp',
    text: "Guam's market is shaped by military investment and visitor arrivals.",
  },
]

const includes = [
  'An executive summary of conclusions on demand, supply, rent or price, and absorption',
  'A definition of the trade area and the reasoning behind it',
  'Economic and demographic drivers for the trade area',
  'An inventory of competitive supply, with occupancy and rents',
  'The development pipeline, including projects under construction, approved and proposed',
  'Demand estimates and capture rate analysis',
  'Absorption projections and recommended rent or price positioning',
  'Assumptions, limitations and data sources',
]

const faqs: FaqItem[] = [
  {
    q: 'How is a market study different from an appraisal?',
    text: 'An appraisal concludes a value for a specific property. A market study analyzes demand and supply for a property type in a market, often before the property exists.',
    a: (
      <>
        An appraisal concludes a value for a specific property. A market study analyzes demand and supply for a property
        type in a market, often before the property exists.
      </>
    ),
  },
  {
    q: 'How long does a market study take?',
    text: 'It depends on scope and geography. We set the delivery date at engagement.',
    a: <>It depends on scope and geography. We set the delivery date at engagement.</>,
  },
  {
    q: 'Can a market study be used for financing?',
    text: 'Yes. Lenders often require independent market support for construction and acquisition loans.',
    a: <>Yes. Lenders often require independent market support for construction and acquisition loans.</>,
  },
  {
    q: 'Do you prepare studies outside Hawaiʻi?',
    text: 'Yes. We prepare studies in Guam, Saipan, the Marshall Islands and other Pacific islands.',
    a: <>Yes. We prepare studies in Guam, Saipan, the Marshall Islands and other Pacific islands.</>,
  },
  {
    q: 'What is a market rent study?',
    text: 'A study that concludes the rent a willing tenant would pay for a specific space on typical terms, supported by comparable lease evidence.',
    a: (
      <>
        A study that concludes the rent a willing tenant would pay for a specific space on typical terms, supported by
        comparable lease evidence.
      </>
    ),
  },
  {
    q: 'What is absorption, and why does it matter?',
    text: 'Absorption is the rate at which space is leased or sold in a market. It drives how long a new project takes to stabilize, which affects financing and returns. Our absorption rate guide explains it.',
    a: (
      <>
        Absorption is the rate at which space is leased or sold in a market. It drives how long a new project takes to
        stabilize, which affects financing and returns. Our{' '}
        <TextLink href={guide('what-is-absorption-rate-in-real-estate')}>absorption rate guide</TextLink> explains it.
      </>
    ),
  },
  {
    q: 'Can you tell me if a market is oversupplied?',
    text: 'Yes. A market saturation analysis compares demand with existing and planned supply to show whether another project can be supported.',
    a: (
      <>
        Yes. A market saturation analysis compares demand with existing and planned supply to show whether another
        project can be supported.
      </>
    ),
  },
  {
    q: 'Will the study be confidential?',
    text: 'Yes. All inquiries and engagements are treated with strict confidentiality, and studies are prepared only for the client and intended users named in the engagement.',
    a: (
      <>
        Yes. All inquiries and engagements are treated with strict confidentiality, and studies are prepared only for the
        client and intended users named in the engagement.
      </>
    ),
  },
]

// Demand set against supply resolves to one of three market conditions.
function MarketBalance() {
  const states = ['Undersupplied', 'Balanced', 'Saturated']
  return (
    <figure aria-label="Market conditions: undersupplied, balanced or saturated">
      <div className="relative">
        <div className="h-px w-full bg-gold/30" />
        <GoldRule className="absolute inset-x-0 top-0" delay={0.2} />
        <div className="absolute inset-x-0 -top-[6px] flex justify-between">
          {states.map((s) => (
            <span key={s} aria-hidden="true" className="w-[13px] h-[13px] rounded-full border border-gold bg-cream" />
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-5">
        {states.map((s, i) => (
          <span
            key={s}
            className={`font-serif text-[15px] sm:text-[18px] text-navy ${
              i === 0 ? 'text-left' : i === 1 ? 'text-center' : 'text-right'
            }`}
          >
            {s}
          </span>
        ))}
      </div>
    </figure>
  )
}

export default function MarketStudiesPage() {
  const service = getService(SLUG)!

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([...crumbs.slice(0, 2), { label: 'Market Analysis & Market Studies', href: URL_PATH }])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Commercial Real Estate Market Studies',
          serviceType: 'Real estate market study and market analysis',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Market Analysis & Market Studies"
        heading={'Commercial Real Estate\nMarket Studies for\n_Hawaiʻi & the Pacific_'}
        subhead="Before a project is designed, financed or priced, someone has to answer the market question: who will rent or buy this, at what price, and how fast? The Benavente Group prepares commercial real estate market studies and market rent studies for developers, lenders, institutions and government agencies across Hawaiʻi and the Pacific."
        image={HERO_IMAGE}
        imageAlt="Tower crane over a high-rise development site in Honolulu"
        breadcrumb={crumbs}
        number="05"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Discuss a Study"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Team */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="order-2 lg:order-1">
            <SectionLabel>Appraisers & Market Analysts</SectionLabel>
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              Our studies are prepared by the same team of appraisers and market analysts that values Hawaiʻi commercial
              property. That gives them a direct line to transaction data, lease terms and on-the-ground knowledge that
              desk-based research cannot reach.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15} className="order-1 lg:order-2 self-stretch">
            <div className="relative h-full min-h-[320px] lg:min-h-[420px]">
              <div className="relative h-full min-h-[320px] lg:min-h-[420px] rounded-[2px] overflow-hidden">
                <Image
                  src="/images/gallery/cbd/dji_0340.webp"
                  alt="Downtown Honolulu commercial district from above"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -left-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Who */}
      <Section tone="cream">
        <SectionHeader label="Who We Work With" title={'Evidence for Decisions\n_Made Early_'} className="max-w-[760px]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12 border-t border-gold/25">
          {clientGroups.map((c, i) => (
            <RevealOnScroll key={c.title} delay={i * 0.08}>
              <div
                className={`h-full py-7 lg:px-7 border-b lg:border-b-0 border-gold/25 ${
                  i > 0 ? 'lg:border-l' : 'lg:pl-0'
                } ${i % 2 === 1 ? 'sm:pl-7' : 'sm:pr-7'}`}
              >
                <h3 className="font-serif text-[24px] text-navy leading-[1.2]">{c.title}</h3>
                <p className="text-navy/75 text-[16px] font-light leading-[1.75] mt-3">{c.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll className="mt-14">
          <p className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium">
            Examples of questions a market study answers
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 mt-4 border-t border-gold/25">
            {exampleQuestions.map((q) => (
              <li key={q} className="py-5 border-b border-gold/25 font-serif italic text-[20px] text-navy leading-[1.4]">
                {q}
              </li>
            ))}
          </ul>
          <Prose className="mt-8">
            <p>Each question needs a different trade area, data set and method.</p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Components */}
      <Section>
        <SectionHeader label="Study Components" title={'The Questions a\n_Market Study_ Answers'} className="mb-12" />
        <EditorialTable
          caption="Market study components and the question each answers"
          columns={['Study component', 'The question it answers']}
          rows={components}
        />
      </Section>

      {/* Market rent studies */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20">
          <div>
            <SectionHeader tone="navy" label="Rent Evidence" title={'Market Rent\n_Studies_'} />
            <RevealOnScroll delay={0.1}>
              <p className="font-serif italic text-[clamp(22px,2.4vw,28px)] text-gold-light leading-[1.45] mt-8 max-w-[480px]">
                What would a willing tenant pay for this space, today, on typical terms?
              </p>
              <GoldRule className="w-24 mt-8 opacity-70" delay={0.3} />
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15} className="self-end">
            <Prose tone="navy">
              <p>
                A market rent study answers one focused question: what would a willing tenant pay for this space, today,
                on typical terms? Owners use it to set asking rents and prepare for lease renewals. Lenders use it to test
                a borrower&apos;s projections. Ground lessors and lessees use it ahead of a rent reopening.
              </p>
              <p>
                In Hawaiʻi, where lease terms vary widely and published rent data is thin, a study built on verified lease
                evidence is often the only defensible answer. Our{' '}
                <TextLink tone="navy" href={guide('what-is-a-rent-comparability-study')}>
                  rent comparability guide
                </TextLink>{' '}
                explains a related type of study.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Sectors */}
      <Section>
        <SectionHeader label="Property Sectors" title={'Market Studies for Every\n_Commercial Sector_'} className="mb-12" />
        <EditorialTable caption="Market study coverage by commercial sector" columns={['Sector', 'What we analyze']} rows={sectors} />
        <RevealOnScroll>
          <Prose className="mt-10">
            <p>Studies can cover a single submarket or several islands.</p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Method */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-14">
          <SectionHeader label="Our Method" title={'How We Measure\na _Market_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>Every study rests on two sides of the same equation.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealOnScroll>
            <div className="h-full bg-white border border-gold/20 rounded-[2px] p-8 sm:p-10">
              <span className="text-gold font-serif text-[12px] tracking-[0.25em] uppercase">Side one</span>
              <h3 className="font-serif text-[30px] text-navy leading-[1.2] mt-2">Demand</h3>
              <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-4">
                We identify who will occupy, rent or buy the space, and how many of them there are. For an apartment
                project, that means household formation, income and renter share. For retail, it means trade area
                population, visitor counts and spending. For office and industrial, it means employment by sector and the
                space each worker or business needs.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="h-full bg-white border border-gold/20 rounded-[2px] p-8 sm:p-10">
              <span className="text-gold font-serif text-[12px] tracking-[0.25em] uppercase">Side two</span>
              <h3 className="font-serif text-[30px] text-navy leading-[1.2] mt-2">Supply</h3>
              <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-4">
                We inventory the existing competitive space, then track everything in the pipeline: projects under
                construction, approved, and proposed. In island markets, the pipeline is often small but concentrated.
                One large project can absorb years of demand.
              </p>
            </div>
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 mt-14 items-center">
          <RevealOnScroll>
            <Prose>
              <p>
                Comparing the two shows whether the market is undersupplied, balanced or saturated. It also shows how
                quickly a new project can be absorbed, and what rent or price it can command. Our guides to{' '}
                <TextLink href={guide('what-is-a-supply-and-demand-analysis-in-real-estate')}>
                  supply and demand analysis
                </TextLink>{' '}
                and vacancy rate explain these measures in more depth.
              </p>
            </Prose>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="px-2">
            <MarketBalance />
          </RevealOnScroll>
        </div>
      </Section>

      {/* Island markets */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 mb-16">
          <SectionHeader tone="navy" label="Island Economies" title={'Small Markets,\n_Big Consequences_'} />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                In island economies, a single new project can shift a submarket. Demand is driven by tourism, military
                spending and a small resident base, while land and entitlements limit supply. National data sets rarely
                capture these dynamics at the island or district level.
              </p>
              <p>
                Our market analysts build studies from local sources: county permits and records, interviews with brokers
                and owners, lease data, and on-the-ground observation. In Guam, Saipan and the Marshall Islands, that local
                knowledge is often the most reliable data there is.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <RevealOnScroll>
          <h3 className="font-serif text-[28px] text-white leading-[1.2]">Island-by-island differences</h3>
          <p className="text-white/[0.62] text-[17px] font-light leading-[1.85] mt-3">
            Each island is effectively its own market.
          </p>
        </RevealOnScroll>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-10">
          {islands.map((isl, i) => (
            <li key={isl.name}>
              <RevealOnScroll delay={i * 0.08} className="group h-full">
                <div className="h-full border border-white/12 rounded-[2px] overflow-hidden bg-navy-light/40">
                  <div className="relative h-[150px] overflow-hidden">
                    <Image
                      src={isl.image}
                      alt={`${isl.name} landscape`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-smooth"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-serif text-[22px] text-gold-light leading-[1.2]">{isl.name}</p>
                    <p className="text-white/[0.62] text-[15px] font-light leading-[1.7] mt-2">{isl.text}</p>
                  </div>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ul>
        <RevealOnScroll>
          <p className="text-white/[0.62] text-[17px] font-light leading-[1.85] mt-10">
            A study that treats the state as a single market misses all of this.
          </p>
        </RevealOnScroll>
      </Section>

      {/* Includes + what comes next */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20">
          <div>
            <SectionHeader label="Deliverables" title={'What a Market\nStudy _Includes_'} className="mb-8" />
            <Checklist items={includes} />
          </div>
          <div className="lg:pt-2">
            <RevealOnScroll delay={0.1}>
              <div className="bg-cream border border-gold/20 p-8 sm:p-10 rounded-[2px]">
                <SectionLabel>The Project Lifecycle</SectionLabel>
                <h2 className="font-serif text-[clamp(28px,3vw,38px)] text-navy leading-[1.2]">
                  How a Study Leads to What Comes Next
                </h2>
                <Prose className="mt-5 !text-[16px]">
                  <p>
                    A market study often comes at the start of a project&apos;s life. The same evidence later supports the
                    highest and best use analysis, the{' '}
                    <TextLink href={guide('what-is-a-construction-loan-appraisal')}>construction loan appraisal</TextLink>{' '}
                    and, eventually, the stabilized valuation. Working with one firm across those stages keeps the
                    assumptions consistent.
                  </p>
                </Prose>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section tone="cream">
        <SectionHeader label="Our Process" title={'From Question\nto _Conclusion_'} className="mb-14" />
        <ProcessSteps
          steps={[
            {
              title: 'Define the question',
              body: 'Property type, trade area, time horizon and the decision the study must inform.',
            },
            {
              title: 'Gather evidence',
              body: 'Supply inventory, pipeline, rents, sales and demand drivers.',
            },
            {
              title: 'Analyze',
              body: 'Demand, supply and absorption modeled under clearly stated assumptions.',
            },
            {
              title: 'Report',
              body: 'A written study with conclusions a lender, board or agency can rely on.',
            },
          ]}
        />
      </Section>

      {/* Updates */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Ongoing Coverage" title={'Market\n_Updates_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                Clients tracking a market over time, such as lenders monitoring collateral or owners with properties on
                several islands, can discuss periodic updates covering rents, vacancy, new supply and sales. Our{' '}
                <TextLink href={guide('hawaii-commercial-cap-rate-trends-2025')}>cap rate trends and outlook</TextLink>{' '}
                article shows the kind of market commentary we provide.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="Thank you for submitting the draft appraisal report. It is truly one of the best written drafts I have reviewed with data support and rationale behind the assumptions."
      />

      {/* FAQ */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.5fr] gap-10 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader label="FAQ" title={'Frequently Asked\n_Questions_'} />
          </div>
          <FaqList items={faqs} />
        </div>
      </Section>

      <RelatedServices service={service} />
      <ServiceInquiry
        service={SLUG}
        heading={'Discuss a\n_Study_ With Us'}
        text="Tell us about the property type, the trade area and the decision the study must inform. We will respond promptly with scope, timing and next steps."
        image="/images/gallery/cbd/dji_0340.webp"
      />
      <StickyInquiryButton />
    </>
  )
}

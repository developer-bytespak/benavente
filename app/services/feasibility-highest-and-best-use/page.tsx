import type { Metadata } from 'next'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import ServiceHero from '@/components/sections/services/ServiceHero'
import RelatedServices from '@/components/sections/services/RelatedServices'
import ServiceInquiry from '@/components/sections/services/ServiceInquiry'
import StickyInquiryButton from '@/components/sections/services/StickyInquiryButton'
import FaqList from '@/components/sections/services/FaqList'
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

const SLUG = 'feasibility-highest-and-best-use'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Highest and Best Use Analysis & Feasibility Studies in Hawaii'
const META_DESCRIPTION =
  'Highest and best use studies and market and financial feasibility analysis for Hawaiʻi land and development. Decide what to build before capital is committed.'
const HERO_IMAGE = '/images/gallery/vacant-land/dji_0515-large.webp'

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
  { label: 'Feasibility & HBU', href: URL_PATH },
]

const clientGroups = [
  { title: 'Developers', desc: 'Choosing between product types, densities and phasing.' },
  { title: 'Landowners and trusts', desc: 'Deciding whether to sell, ground lease, joint venture or hold.' },
  { title: 'Lenders and investors', desc: "Testing a sponsor's plan before funding." },
  {
    title: 'Government and nonprofit landowners',
    desc: 'Evaluating public land for housing or mixed-use.',
  },
]

const decisions = [
  'Whether to buy a site and at what price',
  'Whether to build rental or for-sale housing',
  'How many units or how much floor area the market and zoning will support',
  'Whether to renovate an older building or redevelop the site',
  'Whether to ground lease land or sell it',
  'How a public parcel is best used',
]

const tests = [
  {
    title: 'Legally permissible',
    desc: 'Allowed under zoning, State land use districts, special management area rules and covenants.',
  },
  {
    title: 'Physically possible',
    desc: "Suited to the site's size, shape, slope, soils, access and utilities.",
  },
  {
    title: 'Financially feasible',
    desc: 'Producing enough value or income to justify the cost to develop.',
  },
  {
    title: 'Maximally productive',
    desc: 'The feasible use that produces the highest value.',
  },
]
// Each test narrows the field, so each band is narrower than the last.
const testWidths = ['lg:w-full', 'lg:w-[90%]', 'lg:w-[80%]', 'lg:w-[70%]']

const modelInputs = [
  {
    title: 'Revenue',
    desc: 'Achievable rents or sale prices, absorption pace and stabilized occupancy, drawn from market evidence.',
  },
  {
    title: 'Development costs',
    desc: 'Hard costs, site work, soft costs, financing, impact fees and contingency, using Hawaiʻi cost data.',
  },
  {
    title: 'Timeline',
    desc: 'Entitlement, design, construction and lease-up periods, each of which carries cost.',
  },
  {
    title: 'Return',
    desc: 'Developer profit or internal rate of return expectations, set against market benchmarks.',
  },
]

const deliverables = [
  ['Highest and best use study', 'The use that maximizes value for the site'],
  ['Financial feasibility study', 'Whether projected value or income covers development cost and required return'],
  ['Residual land value', 'What a developer can afford to pay for the land'],
  ['Development scenario comparison', 'Side-by-side returns for alternative product types or densities'],
  ['Entitlement risk review', 'How zoning and approvals affect timing, cost and value'],
]

const receive = [
  'A clear recommendation on the highest and best use, with the reasoning behind it',
  'A summary of zoning, land use designations and entitlement requirements',
  'Physical site analysis, including size, shape, topography, access and utilities',
  'Market inputs for each candidate use, including rents, prices and absorption',
  'Development cost estimates and a financial model for each scenario',
  'Residual land value and sensitivity analysis',
  'Assumptions, limitations and data sources',
]

const faqs: FaqItem[] = [
  {
    q: 'Is a feasibility study the same as an appraisal?',
    text: 'No. An appraisal concludes a value. A feasibility study tests whether a specific project makes financial sense. Highest and best use analysis sits inside every appraisal, but can also be commissioned on its own.',
    a: (
      <>
        No. An appraisal concludes a value. A feasibility study tests whether a specific project makes financial sense.
        Highest and best use analysis sits inside every appraisal, but can also be commissioned on its own.
      </>
    ),
  },
  {
    q: 'When should I commission one?',
    text: 'Before land acquisition or design commitments, when changing course is still inexpensive. Our guide to feasibility studies in real estate explains the timing.',
    a: (
      <>
        Before land acquisition or design commitments, when changing course is still inexpensive. Our guide to{' '}
        <TextLink href={guide('what-is-a-feasibility-study-in-real-estate')}>feasibility studies in real estate</TextLink>{' '}
        explains the timing.
      </>
    ),
  },
  {
    q: 'Can you analyze an existing building?',
    text: 'Yes. We test whether the current use, a renovation, a conversion or redevelopment produces the highest value.',
    a: <>Yes. We test whether the current use, a renovation, a conversion or redevelopment produces the highest value.</>,
  },
  {
    q: 'Will lenders accept your analysis?',
    text: 'Our work is prepared to professional standards by MAI-designated appraisers, the credential lenders look for.',
    a: <>Our work is prepared to professional standards by MAI-designated appraisers, the credential lenders look for.</>,
  },
  {
    q: 'Do you work on neighbor island and Pacific sites?',
    text: 'Yes. We analyze sites across Hawaiʻi and in Guam, Saipan and the Marshall Islands, where construction costs and logistics make feasibility testing especially important.',
    a: (
      <>
        Yes. We analyze sites across Hawaiʻi and in Guam, Saipan and the Marshall Islands, where construction costs and
        logistics make feasibility testing especially important.
      </>
    ),
  },
  {
    q: 'Can you help us decide between several sites?',
    text: "Yes. We can compare candidate sites on the same basis, testing each against the uses you're considering.",
    a: <>Yes. We can compare candidate sites on the same basis, testing each against the uses you&apos;re considering.</>,
  },
  {
    q: 'How is highest and best use used in an appraisal?',
    text: 'Every appraisal includes a highest and best use conclusion, because value depends on the use a buyer would make of the property. A standalone analysis goes further, modeling alternatives in detail. Our highest and best use guide explains the concept.',
    a: (
      <>
        Every appraisal includes a highest and best use conclusion, because value depends on the use a buyer would make of
        the property. A standalone analysis goes further, modeling alternatives in detail. Our{' '}
        <TextLink href={guide('highest-and-best-use-in-real-estate')}>highest and best use guide</TextLink> explains the
        concept.
      </>
    ),
  },
  {
    q: 'What if the conclusion is not to build?',
    text: 'Then the analysis has done its job. Knowing a project does not work before land is bought or design fees are spent is one of the most valuable outcomes.',
    a: (
      <>
        Then the analysis has done its job. Knowing a project does not work before land is bought or design fees are
        spent is one of the most valuable outcomes.
      </>
    ),
  },
]

// What a developer can pay for land: value less costs less profit.
function ResidualEquation() {
  const rows = [
    { op: '', label: 'Completed project value', note: 'Or the income the project produces, capitalized' },
    { op: '−', label: 'All other development costs', note: 'Hard, soft, financing, fees and contingency' },
    { op: '−', label: 'A reasonable developer profit', note: 'The return the market requires' },
  ]
  return (
    <figure aria-label="Residual land value equals completed value less development costs less developer profit">
      <ol className="space-y-3">
        {rows.map((r, i) => (
          <li key={r.label}>
            <RevealOnScroll delay={i * 0.12}>
              <div className="grid grid-cols-[32px_1fr] items-center gap-3 bg-white border border-gold/20 rounded-[2px] px-5 py-4">
                <span aria-hidden="true" className="font-serif text-[28px] leading-none text-gold-dark text-center">
                  {r.op}
                </span>
                <div>
                  <p className="font-serif text-[20px] text-navy leading-[1.25]">{r.label}</p>
                  <p className="text-slate text-[14px] font-light leading-[1.6]">{r.note}</p>
                </div>
              </div>
            </RevealOnScroll>
          </li>
        ))}
        <li>
          <RevealOnScroll delay={0.4}>
            <div className="grid grid-cols-[32px_1fr] items-center gap-3 bg-navy border border-gold rounded-[2px] px-5 py-5">
              <span aria-hidden="true" className="font-serif text-[28px] leading-none text-gold-light text-center">
                =
              </span>
              <p className="font-serif text-[24px] text-gold-light leading-[1.2]">Residual land value</p>
            </div>
          </RevealOnScroll>
        </li>
      </ol>
    </figure>
  )
}

export default function FeasibilityPage() {
  const service = getService(SLUG)!

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([...crumbs.slice(0, 2), { label: 'Feasibility & Highest and Best Use', href: URL_PATH }])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Highest and Best Use Analysis & Feasibility Studies',
          serviceType: 'Highest and best use analysis and real estate feasibility study',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Feasibility & Highest and Best Use"
        heading={'Highest and Best Use Analysis\nin Hawaiʻi, _Before Capital_\n_Is Committed_'}
        subhead="The most expensive mistake in development is building the wrong thing on the right site. The Benavente Group's highest and best use analysis and feasibility studies tell developers, landowners and lenders in Hawaiʻi what a site should become, and whether that project will pencil, before design fees and land deposits are spent."
        image={HERO_IMAGE}
        imageAlt="Drone view of graded development land with new streets on Oʻahu"
        breadcrumb={crumbs}
        number="06"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Discuss Your Site"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Decision-point consulting */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden">
                <Image
                  src="/images/gallery/residential-developments/dji_0949.webp"
                  alt="Drone view of a new townhome development on Maui"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <SectionLabel>Consulting at the Decision Point</SectionLabel>
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              This is consulting work at the decision point. Instead of certifying a project&apos;s value after the plans
              are drawn, we help decide what the plans should be. Our MAI-designated appraisers and market analysts bring
              the same discipline to a feasibility question that they bring to a lender&apos;s appraisal. Every assumption
              is stated, every input is sourced, and the conclusion is one a lender, board or investment committee can
              rely on.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Who + decisions */}
      <Section tone="cream">
        <SectionHeader
          label="Who We Work With"
          title={'For the Decision Point,\n_Not After It_'}
          className="max-w-[760px]"
        />
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
            Decisions we help with
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 mt-4 border-t border-gold/25">
            {decisions.map((d) => (
              <li key={d} className="flex items-start gap-4 py-4 border-b border-gold/25 font-serif text-[19px] text-navy leading-[1.4]">
                <span aria-hidden="true" className="mt-[11px] w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </Section>

      {/* Four tests */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-14">
          <SectionHeader label="The Four Tests" title={'What Should Be Built,\n_Tested Four Ways_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>Highest and best use is the use that is:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <ol className="space-y-3">
          {tests.map((t, i) => (
            <li key={t.title} className={`${testWidths[i]} mx-auto`}>
              <RevealOnScroll delay={i * 0.12}>
                <div
                  className={`grid grid-cols-[44px_1fr] md:grid-cols-[56px_0.8fr_1.2fr] items-center gap-x-4 md:gap-x-8 gap-y-1 rounded-[2px] px-5 md:px-8 py-5 md:py-6 ${
                    i === tests.length - 1 ? 'bg-navy border border-gold' : 'bg-cream border border-gold/20'
                  }`}
                >
                  <span
                    className={`font-serif text-[13px] tracking-[0.2em] ${
                      i === tests.length - 1 ? 'text-gold-light' : 'text-gold'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className={`font-serif text-[22px] md:text-[26px] leading-[1.2] ${
                      i === tests.length - 1 ? 'text-gold-light' : 'text-navy'
                    }`}
                  >
                    {t.title}
                  </h3>
                  <p
                    className={`col-start-2 md:col-start-3 text-[15px] md:text-[16px] font-light leading-[1.7] ${
                      i === tests.length - 1 ? 'text-white/70' : 'text-navy/80'
                    }`}
                  >
                    {t.desc}
                  </p>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
        <RevealOnScroll>
          <Prose className="mt-12 max-w-[900px]">
            <p>
              The tests are applied in order, and each narrows the field. A use that zoning prohibits is excluded however
              profitable it might be. A use that is legal but physically impractical on the site is excluded next. Among
              the uses that remain, we test which are financially feasible. Then we identify the one that produces the
              highest land value. That use is the highest and best use, and it becomes the foundation for valuation and for
              the development decision.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Financial feasibility */}
      <Section tone="navy">
        <div className="mb-14">
          <SectionHeader
            tone="navy"
            label="Financial Feasibility"
            title={'Market and Financial Feasibility Analysis:\n_Does the Project Pencil?_'}
          />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy" className="mt-6 max-w-[880px]">
              <p>
                A project is financially feasible when its completed value, or the income it produces, covers all costs of
                development plus the return a developer or investor requires. To test that, we model:
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {modelInputs.map((m, i) => (
            <li key={m.title} className="bg-navy">
              <RevealOnScroll delay={i * 0.08} className="h-full">
                <div className="h-full p-7">
                  <span className="font-serif text-[13px] tracking-[0.2em] text-gold-light">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-[24px] text-white leading-[1.2] mt-3">{m.title}</h3>
                  <p className="text-white/[0.62] text-[15.5px] font-light leading-[1.75] mt-3">{m.desc}</p>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
        <RevealOnScroll>
          <Prose tone="navy" className="mt-12 max-w-[880px]">
            <p>
              The result shows whether the project works, how sensitive it is to changes in rent, cost or timing, and what
              the land can support. Where demand evidence is needed first, we draw on a{' '}
              <TextLink tone="navy" href="/services/market-studies">
                Hawaiʻi commercial real estate market study
              </TextLink>{' '}
              for the same site.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Residual land value */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <SectionHeader label="Land Value" title={'Residual\n_Land Value_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  One of the most useful outputs is the residual land value: the amount a developer can afford to pay for
                  the land after accounting for all other costs and a reasonable profit. For landowners, it shows what a
                  site is worth to a buyer intending to build. For developers, it sets the ceiling on what to offer.
                </p>
                <p>
                  Comparing residual land value across alternative uses is often the clearest way to identify the highest
                  and best use.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <ResidualEquation />
        </div>
      </Section>

      {/* Deliverables table */}
      <Section>
        <SectionHeader label="Deliverables" title={'Advisory Work That\n_Shapes the Project_'} className="mb-12" />
        <EditorialTable
          caption="Feasibility and highest and best use deliverables"
          columns={['Deliverable', 'What it tells you']}
          rows={deliverables}
        />
      </Section>

      {/* Existing buildings */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader tone="navy" label="Existing Buildings" title={'Keep, Renovate, Convert\nor _Redevelop_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose tone="navy">
              <p>For a site with an existing building, highest and best use is analyzed twice.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <RevealOnScroll className="bg-navy">
            <div className="h-full p-8 sm:p-10">
              <span className="text-gold-light text-[11px] tracking-[0.25em] uppercase font-serif font-medium">
                First analysis
              </span>
              <h3 className="font-serif text-[30px] text-white leading-[1.2] mt-2">As vacant</h3>
              <p className="text-white/[0.62] text-[16px] font-light leading-[1.8] mt-4">
                We ask what the ideal use of the land would be if it were empty.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="bg-navy-light">
            <div className="h-full p-8 sm:p-10">
              <span className="text-gold-light text-[11px] tracking-[0.25em] uppercase font-serif font-medium">
                Second analysis
              </span>
              <h3 className="font-serif text-[30px] text-white leading-[1.2] mt-2">As improved</h3>
              <p className="text-white/[0.62] text-[16px] font-light leading-[1.8] mt-4">
                We ask whether the existing building should be kept as is, renovated, converted to another use or
                demolished.
              </p>
            </div>
          </RevealOnScroll>
        </div>
        <RevealOnScroll>
          <Prose tone="navy" className="mt-12 max-w-[900px]">
            <p>
              When the land as vacant is worth more than the property as improved, the building is a candidate for
              redevelopment. This analysis matters for owners of aging commercial buildings in Honolulu&apos;s urban core,
              where zoning may allow more density than existing structures use.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Entitlements and cost */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Hawaiʻi Constraints" title={'Entitlements and Cost\n_Decide the Answer_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                In Hawaiʻi, what is legally permissible often decides the outcome before the numbers do. State land use
                districts, county zoning, special management areas and long approval timelines all affect what can be
                built and when. Construction costs on the islands, and higher still on neighbor islands and in the
                Pacific, make the feasibility test far less forgiving than on the mainland.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          <RevealOnScroll>
            <div className="relative h-full bg-cream border border-gold/20 rounded-[2px] p-8 sm:p-10">
              <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
              <h3 className="font-serif text-[26px] text-navy leading-[1.2]">Entitlement risk</h3>
              <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-4">
                The path from land use designation to building permit can be long and uncertain. A site may need a State
                land use boundary change, a county zoning change, a special management area permit or environmental
                review, each adding time and cost. Projects that look feasible on an assumption of quick approvals can
                fail when realistic timelines are used. We build entitlement timing into the analysis and, where it is
                uncertain, show the result under several scenarios. Our{' '}
                <TextLink href={guide('what-is-an-entitlement-risk-analysis')}>entitlement risk analysis guide</TextLink>{' '}
                covers the issue in more depth.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="relative h-full bg-cream border border-gold/20 rounded-[2px] p-8 sm:p-10">
              <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
              <h3 className="font-serif text-[26px] text-navy leading-[1.2]">Leasehold and land tenure</h3>
              <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-4">
                Much of Hawaiʻi&apos;s developable land is held by large landowners and trusts who ground lease rather
                than sell. A project on leased land faces ground rent and a finite term that a fee simple project does
                not. We test feasibility under the actual tenure, not an assumed one.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Process */}
      <Section tone="cream">
        <SectionHeader label="Our Process" title={'From Site to\n_Recommendation_'} className="mb-14" />
        <ProcessSteps
          steps={[
            {
              title: 'Site and entitlements',
              body: 'Inspection, zoning and land use review, and physical constraints.',
            },
            {
              title: 'Market inputs',
              body: 'Rents, prices, absorption and costs for each candidate use.',
            },
            {
              title: 'Scenario testing',
              body: 'Financial modeling of alternatives against the four tests.',
            },
            {
              title: 'Recommendation',
              body: 'A clear conclusion on use, density and land value, with the assumptions shown.',
            },
          ]}
        />
      </Section>

      {/* What you receive */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
          <SectionHeader label="Deliverables" title={'What You\n_Receive_'} />
          <Checklist items={receive} />
        </div>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="As part of this assignment, TBG was able to uncover material use restrictions associated with this property that were appropriately treated in the valuation. As a result, our company was able to appropriately respond to the ground lessor's ground lease renegotiation offer."
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

      <RelatedServices service={service} plainTitles />
      <ServiceInquiry
        service={SLUG}
        heading={'Discuss Your\n_Site_ With Us'}
        text="Tell us about the site, the decision you are facing and your timeline. We will respond promptly with scope, approach and next steps."
        image="/images/gallery/residential-developments/dji_0949.webp"
      />
      <StickyInquiryButton />
    </>
  )
}

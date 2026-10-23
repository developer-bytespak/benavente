import type { Metadata } from 'next'
import Image from 'next/image'
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
  NumberedItems,
  ProcessSteps,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getService } from '@/lib/services'

const SLUG = 'portfolio-valuation'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Commercial Portfolio Valuation in Hawaii & the Pacific'
const META_DESCRIPTION =
  'Portfolio valuation services for lenders, institutions and landowners holding multiple properties across Hawaiʻi, Guam, Saipan and the Pacific. One team, one method.'
const HERO_IMAGE = '/images/gallery/cbd/dji_0344.webp'

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
  { label: 'Portfolio Valuation', href: URL_PATH },
]

const clientGroups = [
  {
    title: 'Banks and lenders',
    desc: 'Loan portfolio reviews, note sales, collateral revaluation and workout strategy.',
  },
  {
    title: 'Institutional investors and funds',
    desc: 'Acquisitions, dispositions and periodic fund reporting.',
  },
  { title: 'Landowners and trusts', desc: 'Land and ground lease holdings across several islands.' },
  {
    title: 'Government agencies',
    desc: 'Valuation of public real estate holdings for planning and reporting.',
  },
]

const assignments = [
  ['Bulk portfolio valuation', 'Acquisition or disposition of a group of assets'],
  ['Lender collateral valuation', 'Revaluing loan collateral for credit review or regulators'],
  ['Note sale support', 'Values behind a sale of a commercial loan pool'],
  ['Fund and financial reporting', 'Periodic values for investors and auditors'],
  ['Ground lease portfolios', "Leased fee values across a landowner's holdings"],
  ['Mixed-asset portfolios', 'Office, retail, industrial, hotel and land in one engagement'],
]

const portfolioTypes = [
  ['Lender collateral', 'Office, retail, industrial, multifamily and hotel loans across the islands'],
  ['Retail and mixed-use', 'Shopping centers, street retail and ground-floor commercial'],
  ['Industrial', 'Warehouses and distribution facilities on Oʻahu and neighbor islands'],
  ['Hospitality', 'Hotels and resort assets in Hawaiʻi and the Pacific'],
  ['Land and ground lease', 'Leased fee land, agricultural land and development parcels'],
  ['Public facilities', 'Government-owned land, buildings and leased sites'],
]

const methodPoints = [
  {
    title: 'Consistent method',
    desc: 'The same market assumptions, cap rate logic and report format across every property, so values can be compared and aggregated.',
  },
  {
    title: 'Single point of contact',
    desc: 'One project lead coordinates scheduling, data requests and delivery.',
  },
  { title: 'Phased delivery', desc: 'A rollout schedule that delivers priority assets first.' },
  {
    title: 'Pacific reach',
    desc: 'Field inspections across Hawaiʻi, Guam, Saipan and the Marshall Islands.',
  },
]

const deliverables = [
  'Individual appraisal reports',
  'A portfolio summary schedule in a spreadsheet format the client can work with',
  'An executive summary of key findings across the holdings',
]

const faqs: FaqItem[] = [
  {
    q: 'How many properties can you value in one engagement?',
    text: 'Portfolios range from a handful of assets to many. We scope staffing and the delivery schedule to the portfolio once we have reviewed the asset list.',
    a: (
      <>
        Portfolios range from a handful of assets to many. We scope staffing and the delivery schedule to the portfolio
        once we have reviewed the asset list.
      </>
    ),
  },
  {
    q: 'Can you value properties outside Hawaiʻi in the same portfolio?',
    text: 'Yes. We value assets in Guam, Saipan, the Marshall Islands and other Pacific islands alongside Hawaiʻi properties.',
    a: (
      <>
        Yes. We value assets in Guam, Saipan, the Marshall Islands and other Pacific islands alongside Hawaiʻi
        properties.
      </>
    ),
  },
  {
    q: 'Do you provide a summary across the portfolio?',
    text: 'Yes. Along with individual reports, we provide a summary schedule so values can be reviewed together.',
    a: <>Yes. Along with individual reports, we provide a summary schedule so values can be reviewed together.</>,
  },
  {
    q: 'Can individual properties be delivered first?',
    text: 'Yes. We agree on a phased schedule so priority assets arrive first.',
    a: <>Yes. We agree on a phased schedule so priority assets arrive first.</>,
  },
  {
    q: 'Can you update a portfolio valuation later?',
    text: 'Yes. Updates can follow the same method as the original valuation, so changes reflect the market.',
    a: <>Yes. Updates can follow the same method as the original valuation, so changes reflect the market.</>,
  },
  {
    q: 'How do you keep values consistent across different appraisers?',
    text: 'Through shared market assumptions, a common report template and coordinated review before delivery.',
    a: <>Through shared market assumptions, a common report template and coordinated review before delivery.</>,
  },
  {
    q: 'Do you handle confidential data securely?',
    text: 'Yes. All engagements are treated with strict confidentiality, and we agree on secure data-sharing arrangements at the outset.',
    a: (
      <>
        Yes. All engagements are treated with strict confidentiality, and we agree on secure data-sharing arrangements at
        the outset.
      </>
    ),
  },
  {
    q: 'What does a portfolio engagement cost?',
    text: 'Fees depend on the number and types of properties, their locations, the report format and the schedule. We provide a full proposal once we have reviewed the asset list.',
    a: (
      <>
        Fees depend on the number and types of properties, their locations, the report format and the schedule. We
        provide a full proposal once we have reviewed the asset list.
      </>
    ),
  },
]

// Sum of the individual values vs the portfolio sold together.
function PortfolioComparison() {
  const bars = [
    { label: 'Portfolio premium', note: 'Scale attracts institutional buyers', width: 'w-[100%]', tone: 'bg-gold' },
    { label: 'Sum of the parts', note: 'Each property valued individually', width: 'w-[86%]', tone: 'bg-navy' },
    { label: 'Portfolio discount', note: 'Weaker assets or a thin buyer pool', width: 'w-[72%]', tone: 'bg-slate-light' },
  ]
  return (
    <figure aria-label="A portfolio can sell at a premium or a discount to the sum of its individual values">
      <div className="space-y-6">
        {bars.map((b, i) => (
          <RevealOnScroll key={b.label} delay={i * 0.12}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4">
              <p className="font-serif text-[20px] text-navy">{b.label}</p>
              <p className="text-slate text-[14px] font-light sm:text-right">{b.note}</p>
            </div>
            <div className="mt-2 h-3 bg-cream-dark rounded-[1px] overflow-hidden">
              <div className={`h-full ${b.width} ${b.tone}`} />
            </div>
          </RevealOnScroll>
        ))}
      </div>
      <figcaption className="text-slate text-[13px] font-light mt-6">Illustrative only.</figcaption>
    </figure>
  )
}

export default function PortfolioValuationPage() {
  const service = getService(SLUG)!

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Commercial Portfolio Valuation',
          serviceType: 'Commercial real estate portfolio valuation',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Portfolio Valuation"
        heading={'Commercial Portfolio Valuation\nAcross _Hawaiʻi & the Pacific_'}
        subhead="When a lender, institution or landowner needs values for many properties at once, consistency matters as much as accuracy. The Benavente Group provides portfolio valuation services for multi-property holdings across Hawaiʻi, Guam, Saipan, the Marshall Islands and the wider Pacific, with one team, one methodology and one point of contact."
        image={HERO_IMAGE}
        imageAlt="Downtown Honolulu towers beside ʻIolani Palace and the Hawaiʻi State Capitol"
        breadcrumb={crumbs}
        number="08"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Discuss a Portfolio"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* One team */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="order-2 lg:order-1">
            <IntroHeading label="One Team, One Methodology" title={'Many Properties,\n_One Standard_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              Valuing ten or fifty properties is not ten or fifty separate appraisals stapled together. The values must
              be comparable, the assumptions must be consistent, and the delivery must be coordinated so the client can act
              on the whole. Our principals, Certified General Appraisers and market analysts work as one team under a
              single project lead, with knowledge of every island market in the portfolio.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15} className="order-1 lg:order-2">
            <div className="grid grid-cols-2 grid-rows-[180px_180px] sm:grid-rows-[210px_210px] gap-2">
              <div className="group relative row-span-2 overflow-hidden rounded-[2px]">
                <Image
                  src="/images/gallery/hotel-hospitality/dji_0061.webp"
                  alt="Resort hotel in Hawaiʻi"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div className="group relative overflow-hidden rounded-[2px]">
                <Image
                  src="/images/gallery/industrial/dji_0153.webp"
                  alt="Industrial warehouse on Hawaiʻi Island"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div className="group relative overflow-hidden rounded-[2px]">
                <Image
                  src="/images/gallery/retail/dji_0106.webp"
                  alt="Mixed-use commercial corridor on Maui"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Who */}
      <Section tone="cream">
        <SectionHeader
          label="Who We Work With"
          title={'Institutions That Hold\n_More Than One Asset_'}
          className="max-w-[760px]"
        />
        <div className="mt-12">
          <EditorialTable
            caption="Who we work with and how we help"
            columns={['Client', 'How we help']}
            rows={clientGroups.map((c) => [c.title, c.desc])}
            numbered
          />
        </div>
        <RevealOnScroll>
          <div className="relative bg-white border border-gold/25 rounded-[2px] p-8 sm:p-10 mt-12">
            <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
            <h3 className="font-serif text-[26px] text-navy leading-[1.2]">The value of a local team</h3>
            <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-3 max-w-[900px]">
              Hawaiʻi and Pacific assets are hard to value from a distance. A team based in Honolulu can inspect
              efficiently across the islands, verify sales with local market participants, and recognize when a Honolulu
              ground lease, a resort covenant or a Guam government lease changes the answer.
            </p>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Assignments */}
      <Section>
        <SectionHeader label="Assignments" title={'Portfolio Assignments\n_We Handle_'} className="mb-12" />
        <EditorialTable caption="Portfolio valuation assignments and their purpose" columns={['Assignment', 'Purpose']} rows={assignments} />
      </Section>

      {/* Why */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.3fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader tone="navy" label="Purposes" title={'Why Institutions\nCommission _Portfolio_\n_Valuations_'} />
          </div>
          <NumberedItems
            tone="navy"
            layout="rows"
            items={[
              {
                title: 'Acquisitions and dispositions',
                body: (
                  <p>
                    Buyers and sellers of multiple properties need values for each asset and for the portfolio as a
                    whole, to price the deal and plan financing. Our guide to{' '}
                    <TextLink tone="navy" href={guide('what-is-a-bulk-portfolio-valuation')}>
                      bulk portfolio valuation
                    </TextLink>{' '}
                    explains how the portfolio value can differ from the sum of the individual values.
                  </p>
                ),
              },
              {
                title: 'Credit risk and regulatory review',
                body: (
                  <p>
                    Lenders periodically revalue collateral across their commercial real estate book, especially when
                    markets shift, loans approach maturity or examiners require it. A consistent approach across the
                    portfolio lets credit officers compare loans fairly and spot concentrations of risk.
                  </p>
                ),
              },
              {
                title: 'Loan sales and workouts',
                body: (
                  <p>
                    When a lender sells a pool of commercial loans, buyers and sellers need values for the underlying
                    collateral. When loans become troubled, workout teams need current values to set strategy. See our
                    guides to{' '}
                    <TextLink tone="navy" href={guide('what-is-a-note-sale-appraisal')}>
                      note sale appraisals
                    </TextLink>{' '}
                    and{' '}
                    <TextLink tone="navy" href={guide('what-is-a-workout-appraisal')}>
                      workout appraisals
                    </TextLink>
                    .
                  </p>
                ),
              },
              {
                title: 'Fund and financial reporting',
                body: (
                  <p>
                    Investment funds and family offices often report the value of their real estate holdings to investors
                    and auditors on a regular cycle. Values on a consistent basis mean changes reflect the market rather
                    than a change in method.
                  </p>
                ),
              },
              {
                title: 'Landowner and trust holdings',
                body: (
                  <p>
                    Hawaiʻi landowners and trusts often hold extensive land and ground lease portfolios. Values support
                    lease renegotiations, strategic planning, sales and reporting to beneficiaries.
                  </p>
                ),
              },
              {
                title: 'Public holdings',
                body: (
                  <p>
                    Government agencies hold portfolios of land and facilities. Valuations support asset management,
                    leasing, disposition decisions and financial reporting.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      {/* Method */}
      <Section tone="cream">
        <SectionHeader label="Our Approach" title={'One Methodology\n_Across Every Island_'} className="mb-12" />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {methodPoints.map((m, i) => (
            <li key={m.title}>
              <RevealOnScroll delay={i * 0.08} className="group h-full">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-[13px] tracking-[0.2em] text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-px flex-1 bg-gold/30 group-hover:bg-gold transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-[24px] text-navy leading-[1.2] mt-5">{m.title}</h3>
                <p className="text-navy/75 text-[16px] font-light leading-[1.75] mt-3">{m.desc}</p>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
      </Section>

      {/* Premium / discount */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <SectionHeader label="Portfolio Premium or Discount" title={'When the Whole Differs\nFrom the _Sum of the Parts_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  A portfolio sold together may not be worth exactly the sum of its individual property values. A large,
                  well-diversified portfolio can attract institutional buyers willing to pay a premium for scale.
                  Conversely, a portfolio that includes weaker assets, or that is too large for the local buyer pool, may
                  sell at a discount. Selling every property one by one also takes time and carries cost.
                </p>
                <p>
                  Where the assignment calls for it, we value each property individually and then analyze whether a
                  portfolio premium or discount applies, with the market evidence to support it.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15}>
            <div className="bg-cream border border-gold/20 rounded-[2px] p-8 sm:p-10">
              <PortfolioComparison />
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Data and delivery */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
          <div>
            <SectionHeader tone="navy" label="Organization" title={'Data and\n_Delivery_'} />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-6">
                <p>
                  Portfolio assignments succeed or fail on organization. At the outset, we agree on a data request
                  covering rent rolls, leases, operating statements, capital plans and prior appraisals, and a secure way
                  to share it. We track each asset&apos;s status and report progress on a regular schedule.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15} className="self-center">
            <p className="text-gold-light text-[12px] tracking-[0.2em] uppercase font-serif font-medium mb-5">
              Final deliverables can include
            </p>
            <ol className="space-y-3">
              {deliverables.map((d, i) => (
                <li
                  key={d}
                  className="grid grid-cols-[40px_1fr] items-center gap-3 border border-white/15 rounded-[2px] px-5 py-4"
                >
                  <span className="font-serif text-[13px] tracking-[0.2em] text-gold-light">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-[19px] text-white leading-[1.4]">{d}</span>
                </li>
              ))}
            </ol>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Process */}
      <Section tone="cream">
        <SectionHeader label="Our Process" title={'From Asset List to\n_Final Delivery_'} className="mb-14" />
        <ProcessSteps
          steps={[
            {
              title: 'Portfolio review',
              body: 'We review the asset list, data available and the use of the values.',
            },
            {
              title: 'Plan and schedule',
              body: 'Scope by asset, inspection plan, and a phased delivery calendar.',
            },
            {
              title: 'Execute',
              body: 'Inspections, research and valuation under a shared framework.',
            },
            {
              title: 'Deliver and reconcile',
              body: 'Individual reports plus a portfolio summary that ties out across assets.',
            },
          ]}
        />
      </Section>

      {/* Property types */}
      <Section>
        <SectionHeader label="Property Types" title={'Property Types in\n_Portfolio Assignments_'} className="mb-12" />
        <EditorialTable
          caption="Portfolio types and typical assets"
          columns={['Portfolio type', 'Typical assets']}
          rows={portfolioTypes}
        />
      </Section>

      {/* Reporting */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="USPAP Reporting" title={'Reporting\n_Options_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                Depending on the client&apos;s needs, each property can be reported in a full Appraisal Report or a
                Restricted Appraisal Report under USPAP. Lenders and regulators typically need full reports. Internal
                portfolio monitoring may be well served by a restricted format.
              </p>
              <p>
                We recommend the right mix at the outset, so the engagement delivers what each intended user requires
                without unnecessary cost.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="Indeed, we thank you very much for your hard work. Want to thank you for taking this on, the attached is perfect and I look forward to working with you on the others as well."
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
        heading={'Discuss a\n_Portfolio_ With Us'}
        text="Tell us about the holdings, their locations, the purpose of the values and your schedule. We will review the asset list and respond with a full proposal."
        image="/images/gallery/cbd/dji_0344.webp"
      />
      <StickyInquiryButton />
    </>
  )
}

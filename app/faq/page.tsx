import type { Metadata } from 'next'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import ServiceHero from '@/components/sections/services/ServiceHero'
import ServiceInquiry from '@/components/sections/services/ServiceInquiry'
import StickyInquiryButton from '@/components/sections/services/StickyInquiryButton'
import FaqList from '@/components/sections/services/FaqList'
import JsonLd, { breadcrumbSchema } from '@/components/sections/services/JsonLd'
import {
  Section,
  SectionHeader,
  TextLink,
  faqSchema,
  type FaqItem,
  type Tone,
} from '@/components/sections/services/Blocks'
import { serviceHref } from '@/lib/services'

const FORM_KEY = 'faq'
const URL_PATH = '/faq'
const META_TITLE = 'Real Estate Appraisal FAQ'
const META_DESCRIPTION =
  'Straight answers on appraisals in Hawaiʻi: what MAI and SRA mean, cost and timing, report types, leasehold vs fee simple, and how to order one.'
const HERO_IMAGE = '/images/regions/oahu-valley.webp'

export const metadata: Metadata = {
  title: META_TITLE,
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

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'FAQ', href: URL_PATH },
]

// An answer with no links: the visible answer and the structured-data text match.
const plain = (q: string, text: string): FaqItem => ({ q, text, a: <>{text}</> })

interface Topic {
  id: string
  title: string
  heading: string
  jumpTo: string
  items: FaqItem[]
}

const topics: Topic[] = [
  {
    id: 'basics',
    title: 'Appraisal basics',
    heading: 'Appraisal\n_Basics_',
    jumpTo: 'What an appraisal is, MAI and SRA, USPAP, approaches to value',
    items: [
      plain(
        'What is a real estate appraisal?',
        'An appraisal is an independent, written opinion of a property’s value, prepared by a licensed or certified appraiser for a stated purpose and as of a stated date. It explains the evidence and reasoning behind the number, so a lender, court, agency or the IRS can test it rather than take it on trust.'
      ),
      plain(
        'What does MAI mean, and how is it different from SRA?',
        'Both are designations awarded by the Appraisal Institute after advanced coursework, exams and a demonstration of experience. The MAI is for commercial and income-producing property; the SRA is for residential property. Each of our principals holds both, so one senior team can value an office building, a ground-leased parcel and a family home on a consistent basis.'
      ),
      plain(
        'How is an appraisal different from a broker’s opinion of value?',
        'An appraisal is prepared by a credentialed appraiser with no stake in the sale, under professional standards, and can be relied on by lenders and courts. A broker’s opinion is a pricing estimate from a licensee who may be marketing the property. Both have uses, but only an appraisal is built to withstand review.'
      ),
      plain(
        'What is USPAP?',
        'The Uniform Standards of Professional Appraisal Practice are the ethical and performance standards U.S. appraisers follow. They govern independence, competence, the scope of work and what a report must disclose. Lenders, courts and agencies expect a USPAP-compliant appraisal, and some add their own standards on top, such as the Yellow Book for federal land acquisitions.'
      ),
      plain(
        'What is market value?',
        'Market value is the most probable price a property would bring in a competitive, open market, between a willing buyer and seller who are both informed and acting in their own interest, as of a specific date. It is not the asking price, the assessed value or what the owner paid, though each can be evidence of it.'
      ),
      plain(
        'What are the three approaches to value?',
        'The sales comparison approach compares the property with recent sales. The income approach converts the income an investor can expect into value. The cost approach estimates the cost to replace the buildings, less depreciation, plus land value. We develop every approach the property supports and explain why one carries more weight.'
      ),
    ],
  },
  {
    id: 'ordering',
    title: 'Ordering an appraisal',
    heading: 'Ordering an\n_Appraisal_',
    jumpTo: 'Who orders it, cost, timing, documents, inspections',
    items: [
      {
        q: 'Who can order an appraisal?',
        text: 'Anyone can order a private appraisal: an owner, buyer, attorney, executor or agency. For a loan from a federally regulated lender, though, the lender must engage the appraiser. If you need an appraisal for financing, ask your lender to contact us so the report is addressed to them. See for lenders.',
        a: (
          <>
            Anyone can order a private appraisal: an owner, buyer, attorney, executor or agency. For a loan from a federally
            regulated lender, though, the lender must engage the appraiser. If you need an appraisal for financing, ask your
            lender to contact us so the report is addressed to them. See <TextLink href="/clients/lenders">for lenders</TextLink>.
          </>
        ),
      },
      plain(
        'How much does an appraisal cost?',
        'It depends on the property type and size, the number of leases, the interest being valued, the report type and the location. A single-tenant building costs less to appraise than a multi-tenant center on a ground lease. We quote a fixed fee and delivery date in writing before any work begins.'
      ),
      plain(
        'How long does an appraisal take?',
        'Most single-property commercial appraisals take a few weeks from engagement, depending on complexity and how quickly leases and operating statements arrive. Litigation, portfolio and Yellow Book assignments take longer. We set the delivery date in the engagement letter, so you know before you commit.'
      ),
      {
        q: 'What information should I send?',
        text: 'For income property: the rent roll and leases, three years of operating statements, any ground lease, site and floor plans, recent capital work, and title documents. For a home: a list of improvements with dates, any surveys or permits, and the lease if the land is leasehold. Our process page lists everything in one table.',
        a: (
          <>
            For income property: the rent roll and leases, three years of operating statements, any ground lease, site and floor
            plans, recent capital work, and title documents. For a home: a list of improvements with dates, any surveys or
            permits, and the lease if the land is leasehold. Our <TextLink href="/process">process page</TextLink> lists
            everything in one table.
          </>
        ),
      },
      plain(
        'Do you need to inspect the property?',
        'Yes, wherever possible. We inspect every property in person, photograph it, by drone where useful, and check county records. If a property has changed or been sold since the date of value, we reconstruct its earlier condition from photographs, permits and records.'
      ),
      {
        q: 'Can you appraise a property as of a past date?',
        text: 'Yes. A retrospective appraisal values a property as of a past date, using only the market evidence available then. It is routine for estates, divorces, litigation and tax appeals. See estate and trust appraisal and litigation support.',
        a: (
          <>
            Yes. A retrospective appraisal values a property as of a past date, using only the market evidence available then. It
            is routine for estates, divorces, litigation and tax appeals. See{' '}
            <TextLink href={serviceHref('estate-trust-appraisal')}>estate and trust appraisal</TextLink> and{' '}
            <TextLink href={serviceHref('litigation-support-expert-testimony')}>litigation support</TextLink>.
          </>
        ),
      },
    ],
  },
  {
    id: 'reports',
    title: 'Reports',
    heading: '_Reports_',
    jumpTo: 'Report types, who can rely on it, how long it stays current',
    items: [
      plain(
        'What is the difference between an Appraisal Report and a Restricted Appraisal Report?',
        'Both are USPAP report options. An Appraisal Report sets out the analysis in full and suits lenders, courts, agencies and other third parties. A Restricted Appraisal Report is shorter, for the client’s own use only, and suits internal decisions. We recommend the type that fits your purpose.'
      ),
      plain(
        'Can I share the report with someone else?',
        'A report can be relied on only by the client and the intended users named in it. If a lender, partner or court will rely on the value, tell us at the start so they can be named. Sharing it with someone who isn’t named doesn’t make them an intended user.'
      ),
      plain(
        'How long is an appraisal valid?',
        'An appraisal speaks to value as of its effective date and doesn’t expire, but markets move. Lenders and agencies often set their own limits on how old a report can be. If you need a current value for the same property, an update can often build on the original work at lower cost.'
      ),
      plain(
        'What if I disagree with the value?',
        'Tell us. If a fact is wrong, such as square footage, a lease term or a sale we missed, we correct it and reconsider. We don’t change an independent opinion because a client wants a different number. That independence is what makes the report useful to lenders, courts and boards.'
      ),
    ],
  },
  {
    id: 'hawaii',
    title: 'Hawaiʻi property',
    heading: 'Hawaiʻi\n_Property_',
    jumpTo: 'Leasehold and fee simple, island markets, lenders',
    items: [
      {
        q: 'What is the difference between leasehold and fee simple?',
        text: 'Fee simple is full ownership of the land and buildings. Leasehold is the right to use property for the remaining term of a ground lease, while the landowner holds the leased fee. Ground leases are far more common in Hawaiʻi than on the mainland. See ground lease and leased fee valuation.',
        a: (
          <>
            Fee simple is full ownership of the land and buildings. Leasehold is the right to use property for the remaining term
            of a ground lease, while the landowner holds the leased fee. Ground leases are far more common in Hawaiʻi than on the
            mainland. See{' '}
            <TextLink href={serviceHref('ground-lease-valuation')}>ground lease and leased fee valuation</TextLink>.
          </>
        ),
      },
      plain(
        'Why are Hawaiʻi appraisals different from mainland ones?',
        'Island markets have few comparable sales, many properties sit on leased land, and construction and operating costs run higher. County rules, appeal deadlines and land use districts also differ from island to island. An appraisal built on mainland assumptions can miss all of these, which is why local evidence matters.'
      ),
      plain(
        'Do Hawaiʻi lenders use appraisal management companies?',
        'Less than before. Hawaiʻi stopped licensing appraisal management companies on June 30, 2023, which limits which ones can handle federally related loans here. Many lenders now engage appraisers directly. We work with lenders either way.'
      ),
      plain(
        'Do you work outside Oʻahu?',
        'Yes. We appraise property in all four Hawaiʻi counties and in Guam, Saipan and the Marshall Islands. Travel time for neighbor-island and Pacific inspections is built into the delivery date at engagement.'
      ),
    ],
  },
  {
    id: 'working-with-us',
    title: 'Working with us',
    heading: 'Working\n_With Us_',
    jumpTo: 'Independence, testimony, mortgages, getting started',
    items: [
      plain(
        'Are you independent?',
        'Yes. Our fee never depends on the value we reach, and we have no interest in the properties we appraise. Before accepting any matter in dispute, we run a conflict check on the parties and the property, and we disclose any prior involvement before we start.'
      ),
      {
        q: 'Do you provide expert testimony?',
        text: 'Yes. Our MAI-designated appraisers prepare court-ready reports and testify at deposition, trial, hearing and arbitration. See litigation support and expert testimony and our page for attorneys.',
        a: (
          <>
            Yes. Our MAI-designated appraisers prepare court-ready reports and testify at deposition, trial, hearing and
            arbitration. See{' '}
            <TextLink href={serviceHref('litigation-support-expert-testimony')}>litigation support and expert testimony</TextLink>{' '}
            and our <TextLink href="/clients/attorneys">page for attorneys</TextLink>.
          </>
        ),
      },
      {
        q: 'Do you do mortgage appraisals for homes?',
        text: 'No. Home mortgage and refinance appraisals are ordered by your lender through its own panel. We prepare private, non-lending appraisals of high-value homes for estates, divorce, tax appeals and sales. See luxury home appraisal.',
        a: (
          <>
            No. Home mortgage and refinance appraisals are ordered by your lender through its own panel. We prepare private,
            non-lending appraisals of high-value homes for estates, divorce, tax appeals and sales. See{' '}
            <TextLink href={serviceHref('luxury-home-appraisal')}>luxury home appraisal</TextLink>.
          </>
        ),
      },
      {
        q: 'How do I get started?',
        text: 'Tell us four things: the property, what the appraisal is for, who will rely on it and when you need it. We’ll run a conflict check, recommend the right scope and report type, and confirm the fee and delivery date in writing. All our services are listed on the services page.',
        a: (
          <>
            Tell us four things: the property, what the appraisal is for, who will rely on it and when you need it. We’ll run a
            conflict check, recommend the right scope and report type, and confirm the fee and delivery date in writing. All our
            services are listed on the <TextLink href="/services">services page</TextLink>.
          </>
        ),
      },
    ],
  },
]

const tones: Tone[] = ['cream', 'white']

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(topics.flatMap((t) => t.items))} />

      <ServiceHero
        compact
        eyebrow="FAQ"
        heading={'Real Estate Appraisal\n_Questions, Answered_'}
        subhead="These are the questions clients ask us most before ordering an appraisal in Hawaiʻi: what the credentials mean, what an appraisal costs and how long it takes, which report you need, and how Hawaiʻi’s leasehold system affects value. For questions about a specific service, follow the link in each answer."
        image={HERO_IMAGE}
        imageAlt="Green valley and ridgelines on Oʻahu"
        breadcrumb={crumbs}
        formService={FORM_KEY}
        primaryLabel="Ask an Appraiser"
        primaryHref="#inquiry"
        secondaryCta={{ label: 'Call (808) 784-4320', href: 'tel:+18087844320' }}
      />

      {/* Topic index */}
      <Section>
        <RevealOnScroll>
          <ol className="border-t border-gold/20">
            <li className="hidden md:grid grid-cols-[44px_minmax(220px,0.8fr)_1.6fr] gap-x-6 py-4 border-b border-gold/40">
              <span />
              <span className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium">Topic</span>
              <span className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium">Jump to</span>
            </li>
            {topics.map((t, i) => (
              <li key={t.id} className="border-b border-gold/20">
                <a
                  href={`#${t.id}`}
                  className="group grid grid-cols-[44px_1fr] md:grid-cols-[44px_minmax(220px,0.8fr)_1.6fr] gap-x-6 gap-y-1 items-baseline py-5 transition-colors duration-300 hover:bg-gold/[0.05]"
                >
                  <span className="font-serif text-[13px] tracking-[0.2em] text-gold pl-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-[22px] text-navy leading-[1.3] transition-colors duration-300 group-hover:text-gold-dark">
                    {t.title}
                  </span>
                  <span className="col-start-2 md:col-start-3 text-[16px] font-light leading-[1.7] text-navy/75">{t.jumpTo}</span>
                </a>
              </li>
            ))}
          </ol>
        </RevealOnScroll>
      </Section>

      {topics.map((t, i) => (
        <Section key={t.id} tone={tones[i % 2]} id={t.id} className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.5fr] gap-10 lg:gap-20">
            <div className="lg:sticky lg:top-28 self-start">
              <SectionHeader label={`Topic ${String(i + 1).padStart(2, '0')}`} title={t.heading} />
            </div>
            <FaqList items={t.items} />
          </div>
        </Section>
      ))}

      <ServiceInquiry
        service={FORM_KEY}
        heading={'Still Have\n_a Question?_'}
        text="If your question isn't here, ask us directly. A short call is usually enough to tell you what kind of appraisal you need, what it will cost and how long it will take, with no obligation."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

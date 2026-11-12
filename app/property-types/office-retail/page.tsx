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
  EditorialTable,
  EditorialPlaceholder,
  NumberedItems,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'

const FORM_KEY = 'office-retail'
const URL_PATH = '/property-types/office-retail'
const META_TITLE = 'Office & Retail Property Appraisal in Honolulu | Benavente'
const META_DESCRIPTION =
  'Valuation of Honolulu CBD office towers, shopping centers and mixed-use retail, with lease-by-lease income analysis and current cap rate evidence.'
const HERO_IMAGE = '/images/gallery/retail/dji_0947-large.webp'

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

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Office & Retail', href: URL_PATH },
]

const cbdIssues = [
  ['Vacancy and concessions', 'Tenants consolidating or relocating, and landlords offering free rent and higher tenant improvement allowances'],
  ['Older building stock', 'Capital needs for systems, elevators and seismic or energy upgrades'],
  ['Conversion potential', 'Interest in converting older office to residential or mixed-use'],
  ['Ground leases', "Some towers sit on leased land, which changes the owner's interest"],
]

const retailTypes = [
  ['Regional and community centers', 'Anchor tenants, sales performance, co-tenancy clauses'],
  ['Neighborhood centers', 'Grocery anchors, daily-needs tenants, parking'],
  ['Waikīkī and resort retail', 'Visitor counts, international spending, percentage rent'],
  ['Street and urban retail', 'Foot traffic, frontage, ground-floor use in mixed-use buildings'],
  ['Single-tenant net lease', 'Tenant credit, remaining term, lease structure'],
]

const submarkets = [
  ['Downtown Honolulu and Bishop Street', 'Class A and B towers, professional and financial tenants, some ground-leased sites'],
  ['Kakaʻako and Ala Moana', 'Mixed-use towers with ground-floor retail, medical office, regional shopping'],
  ['Waikīkī', 'Visitor-driven street and center retail, percentage rent leases'],
  ['Kapolei and West Oʻahu', 'Newer suburban office, government tenants, community and power centers'],
  ['Windward and East Oʻahu', 'Neighborhood centers and medical office in Kailua, Kāneʻohe and Hawaiʻi Kai'],
  ['Central Oʻahu', 'Neighborhood and community retail in Mililani, Pearl City and Waipahu'],
  ['Maui', 'Kahului regional retail, resort retail in Lahaina, Kāʻanapali and Wailea, and Kīhei centers'],
  ['Hawaiʻi Island', 'Kailua-Kona and Hilo community retail and professional office'],
  ['Kauaʻi', 'Līhuʻe, Kapaʻa and Poʻipū centers'],
]

const faqs: FaqItem[] = [
  {
    q: 'How is an office building appraised?',
    text: 'Mainly with the income approach: analyzing each lease against market rent, projecting vacancy, expenses and leasing costs, then converting income to value with a cap rate or discounted cash flow. Comparable sales provide a cross-check.',
    a: (
      <>
        Mainly with the income approach: analyzing each lease against market rent, projecting vacancy, expenses and leasing
        costs, then converting income to value with a cap rate or discounted cash flow. Comparable sales provide a
        cross-check.
      </>
    ),
  },
  {
    q: 'How does vacancy affect office value?',
    text: 'Higher vacancy reduces income and adds leasing cost and risk, which lowers value. The appraisal estimates how long it will take to lease the space and what concessions will be needed.',
    a: (
      <>
        Higher vacancy reduces income and adds leasing cost and risk, which lowers value. The appraisal estimates how long it
        will take to lease the space and what concessions will be needed.
      </>
    ),
  },
  {
    q: 'What is percentage rent?',
    text: "Rent based on a share of a retail tenant's sales above a set breakpoint, paid in addition to base rent. It is common in Waikīkī and shopping center leases.",
    a: (
      <>
        Rent based on a share of a retail tenant&apos;s sales above a set breakpoint, paid in addition to base rent. It is
        common in Waikīkī and shopping center leases.
      </>
    ),
  },
  {
    q: 'Do you appraise mixed-use buildings in Kakaʻako?',
    text: 'Yes. We value mixed-use properties component by component, such as ground-floor retail with residential or office above, and reconcile the whole.',
    a: (
      <>
        Yes. We value mixed-use properties component by component, such as ground-floor retail with residential or office
        above, and reconcile the whole.
      </>
    ),
  },
  {
    q: 'Do you appraise Bishop Street office towers?',
    text: 'Yes. We appraise downtown Honolulu office buildings, including leased fee and leasehold interests in towers on ground-leased land.',
    a: (
      <>
        Yes. We appraise downtown Honolulu office buildings, including leased fee and leasehold interests in towers on
        ground-leased land.
      </>
    ),
  },
  {
    q: 'Do you appraise shopping centers on Maui and the Big Island?',
    text: 'Yes. We appraise retail and office property on all islands and in Guam, Saipan and the Marshall Islands.',
    a: <>Yes. We appraise retail and office property on all islands and in Guam, Saipan and the Marshall Islands.</>,
  },
]

export default function OfficeRetailPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Office and Retail Property Appraisal',
          serviceType: 'Office, retail and mixed-use property appraisal',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Office & Retail"
        heading={'Office and Retail Property\nAppraisal in _Honolulu_'}
        subhead="An office or retail appraisal values a property mainly through its leases. The appraiser analyzes each tenant's rent, term and expense terms against the market, then converts the income to value with a cap rate or discounted cash flow. In Honolulu, office vacancy, ground leases and retail percentage rent make lease-by-lease analysis essential."
        image={HERO_IMAGE}
        imageAlt="Aerial view of a two-story retail and office center and its parking lot, with green ridges behind"
        breadcrumb={crumbs}
        formService={FORM_KEY}
        primaryHref="#inquiry"
        primaryLabel="Discuss an Office or Retail Property"
        secondaryCta={{ label: 'View CBD Projects', href: '/gallery?cat=cbd' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/cbd/dji_0345.webp"
                  alt="Downtown Honolulu office towers above the Capitol District"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="Central Business District" title={'Our Own Office Is on\n_Fort Street Mall_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group appraises downtown office towers, suburban office, shopping centers, street retail and
              mixed-use buildings across Honolulu, the neighbor islands and the Pacific. Our own office is on Fort Street Mall in
              the central business district, and CBD property is one of the core categories in our portfolio.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* CBD office */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Office" title={'Downtown and\n_CBD Office_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>
                Honolulu&apos;s central business district, centered on Bishop Street and Fort Street Mall, holds most of the
                state&apos;s multi-tenant Class A and Class B office space. Valuing it today means dealing with:
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Issues involved in valuing downtown and CBD office today"
          columns={['Issue', 'What it involves']}
          rows={cbdIssues}
        />
      </Section>

      {/* Retail */}
      <Section>
        <SectionHeader label="Retail" title={'Shopping Centers\nand _Street Retail_'} className="mb-12" />
        <EditorialTable
          caption="Retail types and their key value drivers"
          columns={['Retail type', 'Key value drivers']}
          rows={retailTypes}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Retail value depends on tenant sales as well as rents. Where leases include percentage rent, we analyze sales
              history and breakpoints, because a tenant&apos;s sales can raise or lower income.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Lease by lease */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.3fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader tone="navy" label="Income Analysis" title={'Lease-by-Lease\n_Income Analysis_'} />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-6">
                <p>For multi-tenant office and retail, the rent roll is the property. We analyze each lease for:</p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <NumberedItems
              tone="navy"
              layout="rows"
              items={[
                {
                  title: 'Contract rent vs market rent',
                  body: <p>Leases above or below market change both income and risk.</p>,
                },
                {
                  title: 'Term and rollover',
                  body: <p>When space comes back to the market, and how much at once.</p>,
                },
                {
                  title: 'Expense structure',
                  body: <p>Gross, modified gross or triple net, and how CAM, taxes and insurance are recovered.</p>,
                },
                {
                  title: 'Leasing costs',
                  body: <p>Tenant improvements, leasing commissions and free rent on renewal or re-leasing.</p>,
                },
                {
                  title: 'Options and rights',
                  body: <p>Renewals, terminations, expansions and co-tenancy clauses.</p>,
                },
              ]}
            />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-10">
                <p>
                  For larger or less stable properties, a discounted cash flow analysis captures rollover and leasing costs
                  year by year. For stable properties, direct capitalization of stabilized income may be enough. We explain
                  which we rely on and why.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* Market conditions */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Market Evidence" title={'Office and Retail\n_Market Conditions_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                Cap rates, vacancy and rents move with interest rates and tenant demand. Our analysis draws on current
                transaction evidence, investor surveys and the leases we review across Honolulu. Each report includes a current
                market overview for the property&apos;s submarket.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Submarkets */}
      <Section tone="cream">
        <SectionHeader label="Submarkets" title={'Office and Retail Submarkets\n_Across the Islands_'} className="mb-12" />
        <EditorialTable
          caption="Office and retail submarkets across the islands and their character"
          columns={['Submarket', 'Character']}
          rows={submarkets}
        />
      </Section>

      {/* Selected assignments */}
      <Section>
        <SectionHeader label="Experience" title={'Selected Office and\n_Retail Assignments_'} className="mb-10" />
        <EditorialPlaceholder note="Add two or more projects from /gallery?cat=cbd and any retail work. For each: property type, location, assignment purpose, one line on the valuation issue. Name a property only with client permission. Remove this note before publishing." />
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

      <RelatedServices
        slugs={[
          'commercial-real-estate-appraisal',
          'ground-lease-valuation',
          'property-tax-appeal',
          'portfolio-valuation',
        ]}
        plainTitles
      />
      <ServiceInquiry
        service={FORM_KEY}
        heading={'Ready for Credible,\n_Timely Results?_'}
        text="Send the rent roll, operating statements and purpose, and we'll confirm scope, fee and delivery date."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

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
  NumberedItems,
  ImageRows,
  ProcessSteps,
  Checklist,
  Quote,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getService } from '@/lib/services'

const SLUG = 'commercial-real-estate-appraisal'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Commercial Real Estate Appraiser in Honolulu | MAI Appraisals'
const META_DESCRIPTION =
  'MAI and SRA designated commercial real estate appraisers in Honolulu. Office, retail, industrial, hotel, land and leasehold appraisals across Hawaiʻi.'

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
    images: [{ url: '/images/gallery/cbd/dji_0345.webp' }],
  },
}

const guide = (slug: string) => `/blog/${slug}`

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Commercial Appraisal', href: URL_PATH },
]

const clientGroups = [
  {
    title: 'Lenders and credit officers',
    desc: 'Commercial appraisals for acquisition, refinance and construction financing, prepared to the standards bank reviewers expect.',
  },
  {
    title: 'Owners and investors',
    desc: 'Values to buy, sell, hold, settle partnership buyouts and prepare for ground lease rent reopenings.',
  },
  {
    title: 'Attorneys',
    desc: 'Valuation support for transactions, written to be read closely by the other side.',
  },
  {
    title: 'Government agencies',
    desc: 'Acquisition, disposition and leasing decisions on public land and facilities.',
  },
]

const purposes = [
  'Acquisition and disposition',
  'Refinance and construction lending',
  'Partnership buyouts and dissolutions',
  'Ground lease rent reopenings',
  'Insurance replacement cost',
  'Financial reporting',
  'Internal asset management',
  'Pre-listing pricing',
]

const propertyTypes = [
  ['Office', 'Multi-tenant, medical and owner-occupied office buildings, CBD and suburban'],
  ['Retail', 'Shopping centers, street retail, neighborhood centers, single-tenant net lease'],
  ['Industrial', 'Warehouses, distribution and flex space, industrial land'],
  ['Hotel & hospitality', 'Resort and select-service hotels, Pacific island hospitality assets'],
  ['Mixed-use & multifamily', 'Ground-floor commercial with residential above, apartment buildings'],
  ['Land & agriculture', 'Development land, agricultural land, leased fee land under ground lease'],
  ['Special purpose', 'Limited-market properties that need a tailored approach'],
]

const interests = [
  [
    'Fee simple',
    'Full ownership, unencumbered by leases',
    'Owner-users, lenders on vacant or owner-occupied property',
  ],
  [
    'Leased fee',
    "The landlord's interest, subject to existing leases or a ground lease",
    'Landowners, trusts, ground lessors, investors buying income',
  ],
  [
    'Leasehold',
    "The tenant's interest under a lease, including the right to occupy and any rent advantage",
    'Ground lessees, building owners on leased land, their lenders',
  ],
]

const deliverables = [
  'A clear statement of the value conclusion, the interest appraised and the effective date',
  'A description of the property, site, zoning and improvements, with photographs and drone imagery',
  'A market overview for the island and submarket',
  'A highest and best use conclusion supporting the valuation',
  'Each approach to value developed, with comparable data and adjustment grids',
  'A reconciliation explaining how the final value was reached',
  "Assumptions, limiting conditions and the appraiser's USPAP certification",
]

const faqs: FaqItem[] = [
  {
    q: 'How long does a commercial appraisal take in Hawaiʻi?',
    text: "It depends on the property's complexity and how quickly leases and operating data arrive. We confirm a delivery date in the engagement letter before work begins. Our guide on how long a commercial real estate appraisal takes explains what drives the timeline.",
    a: (
      <>
        It depends on the property&apos;s complexity and how quickly leases and operating data arrive. We confirm a
        delivery date in the engagement letter before work begins. Our guide on{' '}
        <TextLink href={guide('how-long-does-a-commercial-real-estate-appraisal-take')}>
          how long a commercial real estate appraisal takes
        </TextLink>{' '}
        explains what drives the timeline.
      </>
    ),
  },
  {
    q: 'What does an MAI designation mean?',
    text: "MAI is the Appraisal Institute's designation for appraisers experienced in commercial and income-producing property. Lenders, courts and government agencies often require or prefer MAI appraisers. Our three principals hold both the MAI and SRA designations.",
    a: (
      <>
        MAI is the Appraisal Institute&apos;s designation for appraisers experienced in commercial and income-producing
        property. Lenders, courts and government agencies often require or prefer MAI appraisers. Our three principals
        hold both the MAI and SRA designations.
      </>
    ),
  },
  {
    q: 'Can you appraise a leasehold or leased fee interest?',
    text: 'Yes. Ground lease interests are routine in Honolulu, and we value the leased fee, the leasehold, or both, as the assignment requires.',
    a: (
      <>
        Yes. Ground lease interests are routine in Honolulu, and we value the leased fee, the leasehold, or both, as the
        assignment requires.
      </>
    ),
  },
  {
    q: 'What documents should I prepare?',
    text: 'Current rent roll and leases, three years of operating statements, any recent capital improvements, site plans, and prior appraisals if available.',
    a: (
      <>
        Current rent roll and leases, three years of operating statements, any recent capital improvements, site plans,
        and prior appraisals if available.
      </>
    ),
  },
  {
    q: 'Do you work outside Oʻahu?',
    text: 'Yes. We appraise commercial property in all four Hawaiʻi counties, Guam, Saipan, the Marshall Islands and other Pacific islands.',
    a: (
      <>
        Yes. We appraise commercial property in all four Hawaiʻi counties, Guam, Saipan, the Marshall Islands and other
        Pacific islands.
      </>
    ),
  },
  {
    q: 'Will my lender accept your appraisal?',
    text: 'Lenders generally order commercial appraisals directly or through their own approved panels. If your lender needs to engage us, we work with their requirements and engagement letter. Ask your lender before ordering, so the report is addressed to the right intended user.',
    a: (
      <>
        Lenders generally order commercial appraisals directly or through their own approved panels. If your lender needs
        to engage us, we work with their requirements and engagement letter. Ask your lender before ordering, so the
        report is addressed to the right intended user.
      </>
    ),
  },
  {
    q: 'Do you appraise properties with vacancy or deferred maintenance?',
    text: 'Yes. We value properties as is and, where requested, prospectively upon stabilization or completion of repairs, so the client can see both the current and expected value.',
    a: (
      <>
        Yes. We value properties as is and, where requested, prospectively upon stabilization or completion of repairs,
        so the client can see both the current and expected value.
      </>
    ),
  },
  {
    q: 'What is the difference between an appraisal and a broker opinion of value?',
    text: 'An appraisal is an independent, USPAP-compliant opinion prepared by a credentialed appraiser with no stake in the transaction. A broker opinion is a pricing estimate from a licensee who may be marketing the property. Read our comparison of a broker opinion of value vs an appraisal.',
    a: (
      <>
        An appraisal is an independent, USPAP-compliant opinion prepared by a credentialed appraiser with no stake in the
        transaction. A broker opinion is a pricing estimate from a licensee who may be marketing the property. Read our
        comparison of a{' '}
        <TextLink href={guide('broker-opinion-of-value-vs-appraisal')}>broker opinion of value vs an appraisal</TextLink>.
      </>
    ),
  },
  {
    q: 'Can you appraise the land only?',
    text: 'Yes. We value vacant and underutilized land, including land under ground lease. See our guide on how to value vacant land.',
    a: (
      <>
        Yes. We value vacant and underutilized land, including land under ground lease. See our guide on{' '}
        <TextLink href={guide('how-to-value-vacant-land')}>how to value vacant land</TextLink>.
      </>
    ),
  },
]

export default function CommercialAppraisalPage() {
  const service = getService(SLUG)!

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          ...crumbs.slice(0, 2),
          { label: 'Commercial Real Estate Appraisal', href: URL_PATH },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Commercial Real Estate Appraisal',
          serviceType: 'Commercial real estate appraisal',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Commercial Real Estate Appraisal"
        heading={'Commercial Real Estate Appraisal\nin _Honolulu_ & Across Hawaiʻi'}
        subhead="As a commercial real estate appraiser in Honolulu, The Benavente Group values office, retail, industrial and hospitality properties for lenders, owners, attorneys and government agencies. Our MAI and SRA designated appraisers deliver defensible, USPAP-compliant reports built on island-market evidence, not mainland assumptions."
        image="/images/gallery/cbd/dji_0345.webp"
        imageAlt="Downtown Honolulu office towers above the Capitol District"
        breadcrumb={crumbs}
        number="01"
        formService={SLUG}
        primaryHref="#inquiry"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Local depth */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[480px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[480px] rounded-[2px] overflow-hidden">
                <Image
                  src="/images/gallery/office/dji_0124.webp"
                  alt="Drone photograph of a multi-story commercial office building in Honolulu"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <SectionLabel>Island-Market Depth Since 2017</SectionLabel>
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              Since 2017, our team has served commercial property owners, lenders and attorneys on Oʻahu, Maui, Kauaʻi and
              Hawaiʻi Island, and in Guam, Saipan and the Marshall Islands. Our appraisers know these markets first-hand:
              which sales were arm&apos;s-length, which leases carry unusual terms, and where county records tell a
              different story from the listing. That local depth is why clients return to us assignment after assignment.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Who relies on it */}
      <Section tone="cream">
        <SectionHeader
          label="Who We Work With"
          title={'Valuations Relied On by\n_Lenders, Owners_ and Counsel'}
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
        <div className="mt-16">
          <RevealOnScroll>
            <Prose className="max-w-[900px]">
              <p>
                Commercial appraisals serve many purposes, and the purpose shapes the work. A financing appraisal must
                satisfy the lender&apos;s engagement requirements and federal regulations. An acquisition appraisal must
                test the price a buyer is about to pay. A ground lease rent reopening needs a defensible land value and
                market rent. We confirm the intended use at the outset, so the report answers the question you actually
                need answered and holds up to the person who will read it.
              </p>
            </Prose>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-12">
            <p className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium">
              Common purposes include
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 mt-4 border-t border-gold/25">
              {purposes.map((p) => (
                <li key={p} className="flex items-center gap-4 py-4 border-b border-gold/25 font-serif text-[19px] text-navy">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Property types */}
      <Section>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <SectionHeader label="Property Types" title={'Every Major Commercial\n_Property Type_ in the Islands'} />
        </div>
        <EditorialTable
          caption="Commercial property types we appraise"
          columns={['Property type', 'What we value']}
          rows={propertyTypes}
        />
        <RevealOnScroll>
          <Prose className="max-w-[820px] mt-10">
            <p>
              Each assignment is scoped to its purpose: the interest valued (fee simple, leased fee or leasehold), the date
              of value, and the report type the intended user needs. Not sure which report you need? Read our guide to the{' '}
              <TextLink href={guide('types-of-appraisal-reports-in-real-estate')}>types of appraisal reports</TextLink>.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Approaches to value */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-16">
          <SectionHeader tone="navy" label="Approaches to Value" title={'How We Arrive at a\n_Defensible_ Value'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose tone="navy">
              <p>
                Every commercial appraisal considers three recognized approaches to value. We develop each one the property
                and its market can support, then reconcile them into a single conclusion. The report explains why one
                approach carries more weight than another.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <NumberedItems
          tone="navy"
          items={[
            {
              title: 'Income capitalization approach',
              body: (
                <p>
                  Value follows the income an investor can expect. We test the rent roll against market rent, estimate
                  vacancy and expenses, and arrive at{' '}
                  <TextLink tone="navy" href={guide('what-is-net-operating-income-in-real-estate')}>
                    net operating income
                  </TextLink>
                  , capitalized at a cap rate from Hawaiʻi transactions or projected in a discounted cash flow. Ground
                  rent, common area maintenance and percentage rent are modeled explicitly.
                </p>
              ),
            },
            {
              title: 'Sales comparison approach',
              body: (
                <p>
                  We compare the property with recent sales of similar properties, adjusting for location, size, age,
                  condition, tenancy and property rights. Island markets rarely offer a deep set of perfect comparables,
                  so we widen the search across time and submarkets, verify sales where possible, and explain every
                  adjustment so a reviewer can trace it.
                </p>
              ),
            },
            {
              title: 'Cost approach',
              body: (
                <p>
                  For newer buildings, special-purpose property and insurance replacement cost, we estimate the cost to
                  replace the improvements, deduct depreciation and add land value. Construction costs in Hawaiʻi run
                  well above mainland averages, higher still on neighbor islands, so local data matters. See our guide
                  to the{' '}
                  <TextLink tone="navy" href={guide('what-is-the-cost-approach-in-real-estate')}>
                    cost approach
                  </TextLink>
                  .
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* Interests */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Property Rights Appraised" title={'Fee Simple, Leased Fee\nand _Leasehold_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>
                The same building can have very different values depending on which interest is being appraised. In
                Hawaiʻi, this distinction comes up more often than almost anywhere else in the country.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Property interests and who typically needs each appraised"
          columns={['Interest', 'What it means', 'Typical client']}
          rows={interests}
        />
        <RevealOnScroll>
          <Prose className="max-w-[820px] mt-10">
            <p>
              Where a building sits on ground leased land, we analyze the remaining lease term, rent reopening dates,
              surrender clauses and reversion. These terms can move value significantly in either direction. Our guide to{' '}
              <TextLink href={guide('free-simple-vs-leasehold')}>fee simple vs leasehold</TextLink> covers the basics.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Hawaii-specific issues */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20">
          <div>
            <SectionHeader label="Island-Market Expertise" title={'What Mainland Models\n_Miss_ in Hawaiʻi'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>Commercial property in Hawaiʻi doesn&apos;t value like the mainland. Three issues come up in almost every assignment.</p>
              </Prose>
              <div className="relative hidden lg:block h-[340px] mt-10 rounded-[2px] overflow-hidden">
                <Image
                  src="/images/gallery/vacant-land/dji_0025.webp"
                  alt="Drone view of land parcels and a roadway above a Maui coastal community"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
            </RevealOnScroll>
          </div>
          <NumberedItems
            layout="rows"
            items={[
              {
                title: 'Thin comparable data',
                body: (
                  <p>
                    Few sales trade on each island in a given year. We extend searches across time and submarkets,
                    reconcile carefully, and explain every adjustment so a reviewer can follow it.
                  </p>
                ),
              },
              {
                title: 'Leasehold and ground leases',
                body: (
                  <p>
                    Much of Honolulu&apos;s commercial land is held under long-term ground leases. Valuing the leased fee or
                    leasehold interest correctly, including rent resets and reversion, changes the answer materially.
                  </p>
                ),
              },
              {
                title: 'Site-level surprises',
                body: (
                  <p>
                    Use restrictions, easements and county records often only surface on the ground. Our team inspects in
                    person, photographs by drone, and checks with county departments before we conclude a value.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      {/* Geography */}
      <Section tone="navy">
        <SectionHeader
          tone="navy"
          label="Coverage"
          title={'Commercial Appraisal\nAcross _Every Island_'}
          className="mb-12"
        />
        <ImageRows
          items={[
            {
              title: 'City and County of Honolulu',
              image: '/images/regions/oahu-skyline.webp',
              imageAlt: 'Honolulu high-rises with Diamond Head',
              body: 'Downtown and Kakaʻako office and mixed-use, Waikīkī hotels and street retail, Kapolei and Central Oʻahu industrial and commercial property, and agricultural land.',
            },
            {
              title: 'Maui County',
              image: '/images/regions/maui.webp',
              imageAlt: 'Maui coastline',
              body: "Resort and visitor-oriented commercial property in West and South Maui, and Kahului's industrial and retail core.",
            },
            {
              title: 'Hawaiʻi Island',
              image: '/images/regions/big-island.webp',
              imageAlt: 'Hawaiʻi Island landscape',
              body: 'Hilo and Kona commercial districts, resort-area retail, and agricultural and ranch land.',
            },
            {
              title: 'Kauaʻi',
              image: '/images/regions/kauai.webp',
              imageAlt: 'Kauaʻi coastline',
              body: 'Līhuʻe commercial and industrial property, visitor-oriented retail and hospitality, and land.',
            },
            {
              title: 'Guam, Saipan and the Marshall Islands',
              image: '/images/regions/guam.webp',
              imageAlt: 'Guam coastline',
              body: 'Hospitality, retail and leased property, where local data is scarce and on-site inspection matters.',
            },
          ]}
        />
      </Section>

      {/* Report types */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Report Types" title={'The Right Report for\nthe _Intended Use_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                USPAP recognizes two written report options: an Appraisal Report and a{' '}
                <TextLink href={guide('what-is-a-restricted-appraisal-report')}>Restricted Appraisal Report</TextLink>.
                Lenders, courts and agencies generally require the full narrative Appraisal Report. A restricted report can
                suit internal decisions where the client is the only intended user. We also prepare{' '}
                <TextLink href={guide('what-is-an-update-appraisal')}>updates</TextLink> of our own earlier appraisals and{' '}
                <TextLink href={guide('what-is-an-appraisal-review')}>reviews of appraisals</TextLink> prepared by others.
                We&apos;ll recommend the report type that fits your purpose, without overbuilding the assignment or leaving
                out what a reviewer will expect.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Process */}
      <Section tone="cream">
        <SectionHeader label="Our Process" title={'From Engagement to\n_Final Report_'} className="mb-14" />
        <ProcessSteps
          steps={[
            {
              title: 'Scope',
              body: 'We confirm the purpose, intended use, interest appraised and date of value, then issue an engagement letter with fee and delivery date.',
            },
            {
              title: 'Inspect and research',
              body: 'Site inspection, drone photography, lease and operating-statement review, and county records research.',
            },
            {
              title: 'Analyze',
              body: 'We apply the income, sales comparison and cost approaches as the property warrants, with reconciled support for each.',
            },
            {
              title: 'Deliver',
              body: 'A clear, USPAP-compliant report on the agreed date, with the appraiser available to answer reviewer questions.',
            },
          ]}
        />
      </Section>

      {/* Deliverables + fees */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20">
          <div>
            <SectionHeader label="Deliverables" title={'What You _Receive_'} className="mb-8" />
            <Checklist items={deliverables} />
          </div>
          <div className="lg:pt-2">
            <RevealOnScroll delay={0.1}>
              <div className="bg-cream border border-gold/20 p-8 sm:p-10 rounded-[2px]">
                <SectionLabel>Fees &amp; Timing</SectionLabel>
                <h2 className="font-serif text-[clamp(28px,3vw,38px)] text-navy leading-[1.2]">
                  What Affects Fee and Timing
                </h2>
                <Prose className="mt-5 !text-[16px]">
                  <p>
                    Fees and delivery dates depend on the property type, size and complexity. The number of tenants and
                    leases, the interests being valued, the report type and the location all play a part. A single-tenant
                    net lease building on Oʻahu is a very different assignment from a multi-tenant shopping center under a
                    ground lease on a neighbor island. We provide a written fee and delivery date in every engagement
                    letter.
                  </p>
                </Prose>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="My review is completed. Firstly, I would like to state that the report format and the substance & content of this report is one of the best I've seen in 30+ years of appraisal reviews."
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
        heading={'Discuss Your\n_Assignment_ With Us'}
        text="Tell us about the property, the purpose and your timeline. We will respond promptly with scope, approach and next steps."
        image="/images/gallery/office/dji_0124.webp"
      />
      <StickyInquiryButton />
    </>
  )
}

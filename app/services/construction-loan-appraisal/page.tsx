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
  EditorialTable,
  NumberedItems,
  ImageRows,
  Checklist,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getAnyService } from '@/lib/services'

const SLUG = 'construction-loan-appraisal'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Construction Loan Appraisal in Hawaii | Benavente Group'
const META_DESCRIPTION =
  'As-is, as-complete and as-stabilized values for Honolulu and Hawaiʻi construction loans, prepared under FIRREA, USPAP and interagency guidelines.'
const HERO_IMAGE = '/images/gallery/residential-developments/dji_0761.webp'

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
  { label: 'Construction Loan Appraisal', href: URL_PATH },
]

const values = [
  ['As-is', 'Today', 'What the land, or the partly built property, is worth now'],
  ['As-complete', 'Expected completion date', 'What the finished project is worth before it is fully leased or sold'],
  ['As-stabilized', 'Expected end of lease-up', 'What the project is worth once occupancy reaches a stable level'],
]

const projectReview = [
  ['Plans and specifications', 'Building size, unit mix, quality and site layout'],
  ['The construction budget', 'Hard costs, site work, soft costs, contingency and financing costs'],
  ['Entitlement status', 'Zoning, permits and any outstanding approvals'],
  ['The schedule', 'Construction period and expected completion'],
]

const leaseUp = [
  'How long the project will take to reach stabilized occupancy',
  'Rent levels and concessions during lease-up',
  'Leasing commissions, tenant improvements and carrying costs',
  'Absorption evidence from comparable recent projects in the same submarket',
]

const reviewerChecks = [
  { title: 'Each value clearly labelled', body: 'With its own effective date and the assumptions it depends on.' },
  { title: 'Cost support', body: 'That reconciles the budget with market evidence.' },
  { title: 'Absorption and lease-up support', body: 'Drawn from comparable projects.' },
  { title: 'Market rent and cap rate support', body: 'For the stabilized value.' },
  { title: 'Highest and best use', body: 'Analysis of the site and the proposed project.' },
  { title: 'A clear scope of work', body: "Matching the lender's engagement letter." },
]

const islands = [
  {
    title: 'Honolulu and Oʻahu',
    image: '/images/regions/oahu-skyline.webp',
    imageAlt: 'Honolulu high-rises with Diamond Head',
    body: 'High-rise and mid-rise residential and mixed-use towers in Kakaʻako, Ala Moana and downtown, industrial and distribution buildings in Kapolei and Campbell Industrial Park, and master-planned growth in ʻEwa and Central Oʻahu.',
  },
  {
    title: 'Maui',
    image: '/images/regions/maui.webp',
    imageAlt: 'Maui coastline',
    body: 'Rebuilding and new construction in West Maui, residential and commercial projects in Kahului, Kīhei and Wailea.',
  },
  {
    title: 'Hawaiʻi Island',
    image: '/images/regions/big-island.webp',
    imageAlt: 'Hawaiʻi Island landscape',
    body: 'Residential, commercial and resort projects in Kailua-Kona, Waikoloa and Hilo.',
  },
  {
    title: 'Kauaʻi',
    image: '/images/regions/kauai.webp',
    imageAlt: 'Kauaʻi coastline',
    body: 'Residential and visitor-related projects around Līhuʻe, Kapaʻa and Poʻipū.',
  },
  {
    title: 'Guam, Saipan and the Marshall Islands',
    image: '/images/regions/guam.webp',
    imageAlt: 'Guam coastline',
    body: 'Commercial, residential and hospitality projects where shipping, labor and schedule risk weigh heavily on cost.',
  },
]

const documents = [
  'Plans and specifications, or the latest design set',
  'Detailed construction budget and schedule',
  'Entitlement and permit status',
  'Pre-leasing or pre-sales agreements, if any',
  'Pro forma rents and operating expenses',
  'Purchase agreement for the land, if recent',
]

const faqs: FaqItem[] = [
  {
    q: 'What is an as-complete appraisal?',
    text: 'An appraisal of a proposed or partly built project as of its expected completion date, assuming it is built as planned. It is a prospective value, so it is based on the market expected at completion.',
    a: (
      <>
        An appraisal of a proposed or partly built project as of its expected completion date, assuming it is built as
        planned. It is a prospective value, so it is based on the market expected at completion.
      </>
    ),
  },
  {
    q: 'What is the difference between as-complete and as-stabilized value?',
    text: 'As-complete is the value when construction ends. As-stabilized is the value once the property has leased or sold to a stable occupancy. The difference reflects lease-up time, cost and risk.',
    a: (
      <>
        As-complete is the value when construction ends. As-stabilized is the value once the property has leased or sold
        to a stable occupancy. The difference reflects lease-up time, cost and risk.
      </>
    ),
  },
  {
    q: 'Do you appraise for-sale condominium projects in Honolulu?',
    text: 'Yes. We value proposed for-sale projects, including sellout pace and pricing, and the bulk value of unsold units where the lender requires it.',
    a: (
      <>
        Yes. We value proposed for-sale projects, including sellout pace and pricing, and the bulk value of unsold units
        where the lender requires it.
      </>
    ),
  },
  {
    q: 'Do you review the construction budget?',
    text: 'We compare the budget with market cost data and flag items that look unsupported. We are not cost estimators, so for a detailed cost review, lenders may also use a construction consultant.',
    a: (
      <>
        We compare the budget with market cost data and flag items that look unsupported. We are not cost estimators, so
        for a detailed cost review, lenders may also use a construction consultant.
      </>
    ),
  },
  {
    q: 'Can the borrower order the appraisal?',
    text: 'Federally regulated lenders generally must engage the appraiser themselves. If you are a borrower, ask your lender to contact us.',
    a: (
      <>
        Federally regulated lenders generally must engage the appraiser themselves. If you are a borrower, ask your lender
        to contact us.
      </>
    ),
  },
  {
    q: 'Do you appraise construction projects on Maui and the Big Island?',
    text: 'Yes. We appraise construction projects across all four Hawaiʻi counties and in Guam, Saipan and the Marshall Islands.',
    a: (
      <>
        Yes. We appraise construction projects across all four Hawaiʻi counties and in Guam, Saipan and the Marshall
        Islands.
      </>
    ),
  },
]

export default function ConstructionLoanAppraisalPage() {
  const service = getAnyService(SLUG)!

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Construction Loan Appraisal',
          serviceType: 'Construction and development loan appraisal',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Construction Loan Appraisal"
        heading={'Construction Loan\nAppraisals in _Hawaiʻi_'}
        subhead="A construction loan appraisal values a project that doesn't exist yet. It gives the lender up to three values: the site or property as it is today (as-is), the project when construction is finished (as-complete), and the project once it is leased or sold to stable occupancy (as-stabilized). Lenders size and monitor the loan against those values."
        image={HERO_IMAGE}
        imageAlt="Drone view of a Honolulu high-rise under construction beside a tower crane, with the ocean beyond"
        breadcrumb={crumbs}
        number="10"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Discuss a Construction Loan"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/residential-developments/dji_0949.webp"
                  alt="Aerial view of a row of newly built two-story homes in a Hawaiʻi neighborhood"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI Designated" title={'We Test the Assumptions\n_Under Every Value_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group prepares construction and development loan appraisals from our Honolulu office for
              banks, credit unions, private lenders and developers across Oʻahu, Maui, Hawaiʻi Island, Kauaʻi and the
              Pacific. Our MAI-designated appraisers test the plans, the budget and the market behind each prospective
              value, because a construction appraisal is only as reliable as the assumptions under it.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Three values */}
      <Section tone="cream">
        <SectionHeader label="Three Values" title={'As-Is, As-Complete and\n_As-Stabilized_ Values'} className="mb-12" />
        <EditorialTable
          caption="The three values in a construction loan appraisal, their dates of value and what each answers"
          columns={['Value', 'Date of value', 'What it answers']}
          rows={values}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 mt-14">
          <RevealOnScroll>
            <p className="font-serif italic text-[clamp(22px,2.4vw,28px)] text-gold-dark leading-[1.45] max-w-[480px]">
              Our report states those assumptions plainly, so a reviewer knows exactly what each value depends on.
            </p>
            <GoldRule className="w-24 mt-8 opacity-70" delay={0.3} />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                The as-complete and as-stabilized values are <strong className="font-medium">prospective market values</strong>:
                opinions of value as of a future date, based on what the market is expected to support then. They rest
                on stated assumptions, such as the project being built as designed, on budget and on time. Our report
                states those assumptions plainly, so a reviewer knows exactly what each value depends on.
              </p>
              <p>
                For for-sale projects such as condominiums or subdivisions, the appraisal also considers the pace and
                pricing of sales, and may conclude a bulk value for unsold units.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Plans, budgets, cost */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Cost Support" title={'Plans, Budgets and\n_Cost Support_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>A prospective value starts with the project itself. We review:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="What we review in the project plans, budget, entitlements and schedule"
          columns={['We review', 'Covering']}
          rows={projectReview}
          numbered
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 mt-14">
          <RevealOnScroll>
            <p className="font-serif italic text-[clamp(22px,2.4vw,28px)] text-gold-dark leading-[1.45] max-w-[480px]">
              A budget that would be realistic in Phoenix can be badly short in Kona.
            </p>
            <GoldRule className="w-24 mt-8 opacity-70" delay={0.3} />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                We compare the budget with cost data for similar Hawaiʻi projects and flag line items that look light.
                Construction costs in the islands run well above mainland averages, and higher again on neighbor islands
                and in the Pacific, where materials and labor must be shipped in. A budget that would be realistic in
                Phoenix can be badly short in Kona. The cost approach in the report gives the lender a separate check on
                whether the completed value supports what is being spent.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Lease-up */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader tone="navy" label="Stabilization" title={'Lease-Up and\n_Absorption_'} />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-6">
                <p>The gap between as-complete and as-stabilized value is the cost and risk of lease-up. We estimate:</p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <Checklist items={leaseUp} tone="navy" />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-10">
                <p>
                  In small island markets, absorption can vary sharply with a single competing project. We look at what
                  is actually in the pipeline in the project&apos;s own submarket, not national averages.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* Reviewer checks */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.3fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader label="Review Standards" title={'What Lender\nReviewers _Check_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  Construction appraisals for federally regulated lenders are prepared under Title XI of FIRREA, USPAP
                  and the Interagency Appraisal and Evaluation Guidelines. Reviewers typically look for:
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <NumberedItems layout="rows" items={reviewerChecks.map((c) => ({ title: c.title, body: <p>{c.body}</p> }))} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-10">
                <p>
                  We build reports around these points so the review moves quickly. Lenders ordering through an
                  appraisal panel can engage us directly under their own engagement letter.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* Islands */}
      <Section tone="navy">
        <SectionHeader tone="navy" label="Markets" title={'Construction Appraisals\n_Across the Islands_'} className="mb-12" />
        <ImageRows items={islands} />
        <RevealOnScroll delay={0.1}>
          <Prose tone="navy" className="mt-10 max-w-[760px]">
            <p>
              Each market has its own cost premium, absorption pace and buyer pool, and we analyze the project within
              its own submarket.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Timing and documents */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          <div>
            <SectionHeader label="Timing" title={'Timing and Lender\n_Communication_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  Construction loans run to tight closing schedules. We confirm the delivery date in the engagement
                  letter before work begins, keep the lender and borrower informed of any missing documents, and flag
                  issues early, such as a budget gap or an entitlement question, rather than at delivery. Timing depends
                  on project size, the completeness of plans and budget, and location.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <RevealOnScroll>
              <SectionLabel>Before We Begin</SectionLabel>
              <h3 className="font-serif text-[clamp(26px,3vw,36px)] text-navy leading-[1.15] mb-8">
                Documents That Speed Up <span className="italic text-gold">the Appraisal</span>
              </h3>
            </RevealOnScroll>
            <Checklist items={documents} />
          </div>
        </div>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="I've seen lots of appraisals and this is best I've reviewed. Lots of detail and I learned a lot from it. Thank you."
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
        heading={'Ready for Credible,\n_Timely Results?_'}
        text="Send the plans, budget and closing date, and we'll confirm scope, fee and delivery date."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

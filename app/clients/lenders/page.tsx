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
  NumberedItems,
  ImageRows,
  Checklist,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'

const FORM_KEY = 'lenders'
const URL_PATH = '/clients/lenders'
const META_TITLE = 'Lender Appraisal Services in Hawaii | FIRREA-Compliant'
const META_DESCRIPTION =
  'Commercial, construction, workout and REO appraisals for Honolulu, Hawaiʻi and Pacific lenders, prepared under FIRREA, USPAP and interagency guidelines.'
const HERO_IMAGE = '/images/gallery/office/dji_0625.webp'

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
  { label: 'For Lenders', href: URL_PATH },
]

const assignments = [
  ['Acquisition and refinance appraisals', 'Origination'],
  ['Construction and development appraisals', 'As-is, as-complete and as-stabilized values'],
  ['Leasehold collateral', 'Loans on ground-leased property'],
  ['Portfolio and collateral reviews', 'Revaluing a group of loans'],
  ['Update appraisals', 'Refreshing an earlier value'],
  ['Appraisal reviews', 'A second look at a third-party report'],
  ['Workout, REO and foreclosure', 'Troubled loans and owned property'],
]

const communication = [
  'Confirm fee and delivery date in writing before work begins',
  'Request documents up front and follow up on anything missing',
  'Flag issues early, such as a lease term, a zoning question or a use restriction, rather than at delivery',
  'Respond to review comments promptly and clearly',
]

const distressed = [
  ['Workout appraisals', 'Values to support loan modification, restructuring and reserve decisions'],
  ['Foreclosure appraisals', 'Values for foreclosure proceedings and bidding strategy'],
  ['REO appraisals', 'Values for owned real estate held for sale'],
  ['Note sale support', 'Collateral values behind a sale of loans'],
]

const coverage = [
  {
    title: 'Honolulu and Oʻahu',
    image: '/images/regions/oahu-skyline.webp',
    imageAlt: 'Honolulu high-rises with Diamond Head',
    body: 'Downtown and Kakaʻako office, Waikīkī hotels and retail, Kalihi, Māpunapuna and Kapolei industrial, and neighborhood retail and medical office across Windward, Central and West Oʻahu.',
  },
  {
    title: 'Maui',
    image: '/images/regions/maui.webp',
    imageAlt: 'Maui coastline',
    body: 'Commercial and resort-area collateral in Kahului, Kīhei, Wailea and West Maui.',
  },
  {
    title: 'Hawaiʻi Island',
    image: '/images/regions/big-island.webp',
    imageAlt: 'Hawaiʻi Island landscape',
    body: 'Commercial and industrial collateral in Hilo and Kailua-Kona.',
  },
  {
    title: 'Kauaʻi',
    image: '/images/regions/kauai.webp',
    imageAlt: 'Kauaʻi coastline',
    body: 'Commercial collateral in Līhuʻe, Kapaʻa and Poʻipū.',
  },
  {
    title: 'Guam, Saipan and the Marshall Islands',
    image: '/images/regions/guam.webp',
    imageAlt: 'Guam coastline',
    body: 'Commercial, hospitality and leasehold collateral, where few appraisers can field an inspection.',
  },
]

const faqs: FaqItem[] = [
  {
    q: 'Are your appraisals FIRREA compliant?',
    text: "Yes. Our appraisals for federally regulated lenders are prepared under Title XI of FIRREA, the agencies' appraisal regulations, USPAP and the Interagency Appraisal and Evaluation Guidelines.",
    a: (
      <>
        Yes. Our appraisals for federally regulated lenders are prepared under Title XI of FIRREA, the agencies&apos;
        appraisal regulations, USPAP and the Interagency Appraisal and Evaluation Guidelines.
      </>
    ),
  },
  {
    q: 'Can a borrower order the appraisal and give it to the bank?',
    text: 'For federally related transactions, the lender generally must engage the appraiser. Borrowers should ask their lender to contact us.',
    a: (
      <>
        For federally related transactions, the lender generally must engage the appraiser. Borrowers should ask their
        lender to contact us.
      </>
    ),
  },
  {
    q: 'Do you appraise collateral in Guam, Saipan and the Marshall Islands?',
    text: 'Yes. We appraise commercial collateral across the Pacific, alongside all four Hawaiʻi counties.',
    a: <>Yes. We appraise commercial collateral across the Pacific, alongside all four Hawaiʻi counties.</>,
  },
  {
    q: 'Do you appraise leasehold collateral?',
    text: 'Yes. Ground-leased collateral is common in Hawaiʻi, and we report leasehold value and remaining term clearly for underwriting.',
    a: (
      <>
        Yes. Ground-leased collateral is common in Hawaiʻi, and we report leasehold value and remaining term clearly for
        underwriting.
      </>
    ),
  },
  {
    q: 'Can you update an appraisal we already have?',
    text: 'Yes, where we prepared the original, or by scoping a new assignment.',
    a: <>Yes, where we prepared the original, or by scoping a new assignment.</>,
  },
  {
    q: 'Do you work with Hawaiʻi credit unions and private lenders?',
    text: 'Yes. We work with banks, credit unions and private lenders.',
    a: <>Yes. We work with banks, credit unions and private lenders.</>,
  },
]

export default function ForLendersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([crumbs[0], { label: 'For Lenders & Financial Institutions', href: URL_PATH }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Lender Appraisal Services',
          serviceType: 'Commercial real estate appraisal for lenders and financial institutions',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="For Lenders & Financial Institutions"
        heading={'Commercial Appraisals for Hawaiʻi\nand _Pacific Lenders_'}
        subhead="Banks and credit unions making commercial real estate loans need appraisals prepared to federal standards: Title XI of FIRREA, USPAP and the Interagency Appraisal and Evaluation Guidelines. A lender-ready appraisal is engaged by the lender, states the right value premise and date, and is supported well enough to pass the bank's review without rework."
        image={HERO_IMAGE}
        imageAlt="Aerial view of a two-story commercial office building at a busy intersection"
        breadcrumb={crumbs}
        formService={FORM_KEY}
        primaryHref="#inquiry"
        primaryLabel="Add Us to Your Panel"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/office/dji_0916.webp"
                  alt="Aerial view of a commercial building with rooftop solar panels among neighboring office buildings"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI Designated" title={'We Know\n_Island Collateral_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group provides commercial appraisals from our Honolulu office to banks, credit unions and
              private lenders with collateral across Oʻahu, Maui, Hawaiʻi Island, Kauaʻi, Guam, Saipan and the Marshall
              Islands. Our principals hold the MAI designation, and our staff includes Certified General Appraisers and
              market analysts. We know island collateral: ground leases, thin comparable data and the site-level issues
              that only show up in person.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Assignment types */}
      <Section tone="cream">
        <SectionHeader label="Assignments" title={'Assignment Types\n_for Lenders_'} className="mb-12" />
        <EditorialTable
          caption="Assignment types for lenders and their typical use"
          columns={['Assignment', 'Typical use']}
          rows={assignments}
          numbered
        />
      </Section>

      {/* FIRREA */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.3fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader label="Compliance" title={'FIRREA and Interagency\n_Compliance_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  Appraisals for federally regulated lenders must meet Title XI of FIRREA, the agencies&apos; appraisal
                  regulations and USPAP. The Interagency Appraisal and Evaluation Guidelines add expectations on
                  independence, engagement and review (OCC summary). In practice, that means:
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <NumberedItems
              layout="rows"
              items={[
                {
                  title: 'Independence',
                  body: <p>The lender engages the appraiser, and the appraiser has no interest in the loan or the property.</p>,
                },
                {
                  title: 'A clear engagement',
                  body: <p>Scope, intended use and intended users stated in the lender&apos;s engagement letter.</p>,
                },
                {
                  title: 'The right value premises',
                  body: <p>As-is, prospective or both, each with its own effective date.</p>,
                },
                {
                  title: 'Support',
                  body: <p>Market data, verified comparables and reconciled approaches to value.</p>,
                },
                {
                  title: 'Reviewability',
                  body: <p>A report structured so the bank&apos;s review appraiser can confirm it efficiently.</p>,
                },
              ]}
            />
            <RevealOnScroll>
              <div className="relative bg-cream border border-gold/25 rounded-[2px] p-8 sm:p-10 mt-12">
                <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
                <h3 className="font-serif text-[26px] text-navy leading-[1.2]">
                  A Note on Appraisal Management Companies in Hawaiʻi
                </h3>
                <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-3">
                  Hawaiʻi stopped licensing appraisal management companies on June 30, 2023. The Appraisal Subcommittee now
                  treats Hawaiʻi as a non-participating state for AMCs, which limits which AMCs may handle federally
                  related transactions here (ASC notice). Many lenders now engage appraisers directly. We work either way.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* Timing */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader tone="navy" label="Communication" title={'Timing and\n_Communication_'} />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-6">
                <p>Loan officers need to know where an assignment stands. We:</p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <Checklist items={communication} tone="navy" />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-10">
                <p>
                  Delivery depends on property type, complexity and location, and is set in the engagement letter. Because
                  we are based in downtown Honolulu, Oʻahu inspections can be scheduled quickly, and we travel regularly to
                  the neighbor islands and the Pacific.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* Workout */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Troubled Loans" title={'Workout, REO and\n_Note Sales_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>When a loan runs into trouble, the lender needs a current, credible value fast.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Appraisals and support we provide for troubled loans"
          columns={['Assignment', 'What it supports']}
          rows={distressed}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Distressed assignments often involve vacant, damaged or partly built property, and limited access to records.
              Our on-site inspection and county research are built for exactly those conditions.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Coverage */}
      <Section tone="navy">
        <SectionHeader tone="navy" label="Markets" title={'Collateral Coverage Across\n_Hawaiʻi and the Pacific_'} className="mb-12" />
        <ImageRows items={coverage} />
        <RevealOnScroll delay={0.1}>
          <Prose tone="navy" className="mt-10 max-w-[760px]">
            <p>Mainland lenders and loan participants with Hawaiʻi or Pacific collateral can engage us under their existing terms.</p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Panel */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Approved Panels" title={'Getting on Our Panel,\nor _Adding Us to Yours_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                To add The Benavente Group to your approved appraiser panel, contact us for our qualifications package:
                designations, licenses, property-type experience, coverage area and sample report pages. We&apos;ll complete
                your bank&apos;s vendor forms on request.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="I do need to commend Mr. Benavente's staff's research skills. While our organization takes pride in conducting thorough pre-flight research, by coincidence, matters that are unknown until a physical visit to the property and/or county departments have beleaguered several of our engagements with The Benavente Group."
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
          'portfolio-valuation',
          'ground-lease-valuation',
          'market-studies',
        ]}
        plainTitles
      />
      <ServiceInquiry
        service={FORM_KEY}
        heading={'Ready for Credible,\n_Timely Results?_'}
        text="Send the property, the loan purpose and your engagement letter, and we'll confirm the fee and delivery date."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

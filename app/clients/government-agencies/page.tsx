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
  Checklist,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'

const FORM_KEY = 'government-agencies'
const URL_PATH = '/clients/government-agencies'
const META_TITLE = 'Government & Public Agency Appraisals in Hawaii | Benavente'
const META_DESCRIPTION =
  'Yellow Book, acquisition, disposition, easement and lease rent appraisals for Hawaiʻi state, county and federal agencies, with procurement-ready files.'
const HERO_IMAGE = '/images/gallery/special-use/dji_0462.webp'

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
  { label: 'For Government Agencies', href: URL_PATH },
]

const assignments = [
  ['Acquisitions', 'Land for roads, utilities, parks, schools and facilities'],
  ['Dispositions', 'Sale or exchange of surplus public land'],
  ['Remnants', 'Leftover parcels after a project'],
  ['Easements', <><TextLink href="/services/eminent-domain-condemnation">Permanent and temporary easements</TextLink>, utility and access rights</>],
  ['Public land lease rents', 'Rent for new leases and lease rent reopenings on state and county land'],
  ['Market studies', 'Demand and rent evidence for public-private projects'],
  ['Appraisal reviews', 'Independent review of appraisals prepared by others'],
  ['Litigation support', 'Valuation and testimony when an acquisition is contested'],
]

const yellowBook = [
  ['Project influence', 'The appraiser generally disregards any change in value caused by the government project itself'],
  ['Larger parcel', 'Defined by specific tests of unity of ownership, use and contiguity'],
  [<><TextLink href="/services/feasibility-highest-and-best-use">Highest and best use</TextLink></>, 'Must be economically supported and reasonably probable, not speculative'],
  ['Jurisdictional exception', 'Applied to USPAP where the Yellow Book requires a different approach'],
  ['Review', 'Federal review appraisers examine reports closely against these rules'],
]

const procurementFiles = [
  'A current capability statement (PDF) with designations, licenses, coverage, assignment types and contacts',
  'Completed statements of qualifications for agencies that request them each fiscal year',
  'Sample report pages and references, where permitted',
]

const agencies = [
  ['State of Hawaiʻi', 'Land, transportation, housing and development agencies, and the Department of the Attorney General'],
  ['City and County of Honolulu', 'Acquisitions, dispositions and leases across Oʻahu, from downtown to Kapolei and the North Shore'],
  ['County of Maui', 'Maui, Molokaʻi and Lānaʻi'],
  ['County of Hawaiʻi', 'Hilo, Kona and rural districts'],
  ['County of Kauaʻi', 'Līhuʻe and island-wide projects'],
  [
    'Federal agencies',
    'Including the U.S. Army Corps of Engineers Honolulu District and other agencies with land in Hawaiʻi, Guam and the Northern Mariana Islands',
  ],
  ['Pacific governments', 'Public land in Guam, Saipan and the Marshall Islands'],
]

const faqs: FaqItem[] = [
  {
    q: 'How do Hawaiʻi agencies select appraisers?',
    text: 'State and county agencies generally select appraisers through professional-services procurement under HRS §103D-304. They publish annual notices, collect statements of qualifications, and choose from a list of qualified firms based on competence and qualifications.',
    a: (
      <>
        State and county agencies generally select appraisers through professional-services procurement under HRS
        §103D-304. They publish annual notices, collect statements of qualifications, and choose from a list of <TextLink href="/about">qualified firms</TextLink> based on competence and qualifications.
      </>
    ),
  },
  {
    q: 'What is a Yellow Book appraisal?',
    text: 'An appraisal under the Uniform Appraisal Standards for Federal Land Acquisitions, required for many federal acquisitions. It applies rules on project influence, the larger parcel and highest and best use that differ from standard practice.',
    a: (
      <>
        An appraisal under the Uniform Appraisal Standards for Federal Land Acquisitions, required for many federal
        acquisitions. It applies rules on project influence, the larger parcel and highest and best use that differ from
        standard practice.
      </>
    ),
  },
  {
    q: 'Do you work for county agencies on Maui, Kauaʻi and Hawaiʻi Island?',
    text: 'Yes. We appraise public land in all four counties, as well as for State and federal agencies.',
    a: <>Yes. We appraise public land in all four counties, as well as for State and federal agencies.</>,
  },
  {
    q: 'Do you appraise property in Guam and the Northern Mariana Islands?',
    text: 'Yes. We appraise property in Guam, Saipan and the Marshall Islands.',
    a: <>Yes. We appraise property in Guam, Saipan and the Marshall Islands.</>,
  },
  {
    q: 'Can you appraise easements and remnants?',
    text: 'Yes. Easements, remnants and partial acquisitions are standard public-agency assignments.',
    a: <>Yes. Easements, remnants and partial acquisitions are standard public-agency assignments.</>,
  },
  {
    q: 'Can we get your capability statement?',
    text: "Yes. Request it through our inquiry form, and we'll send the current version.",
    a: (
      <>
        Yes. Request it through our inquiry form, and we&apos;ll send the current
        version.
      </>
    ),
  },
]

export default function ForGovernmentAgenciesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Appraisal Services for Government Agencies',
          serviceType: 'Real estate appraisal for state, county and federal agencies',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="For Government Agencies"
        heading={'Appraisal Services for Hawaiʻi State, _County and Federal Agencies_'}
        subhead="Government agencies need appraisals to buy, sell, lease and manage public land. In Hawaiʻi, state and county agencies select appraisers through professional-services procurement under HRS §103D-304, usually from an annual statement of qualifications. Federal agencies generally require appraisals under the Uniform Appraisal Standards for Federal Land Acquisitions, known as the Yellow Book."
        image={HERO_IMAGE}
        imageAlt="Aerial view of a small boat harbor with moored vessels and a waterfront building"
        breadcrumb={crumbs}
        formService={FORM_KEY}
        primaryHref="#inquiry"
        primaryLabel="Request Our Capability Statement"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/broll/oahu/dji_0959-large.webp"
                  alt="Large public park with open lawns, with high-rises and the ocean beyond"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI Designated" title={'Ready for the Agency’s\n_Review Appraiser_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group counts government agencies among its clients, alongside <TextLink href="/clients/attorneys">attorneys</TextLink>, lenders and
              developers. From our office in downtown Honolulu, our MAI-designated principals and Certified General
              Appraisers prepare appraisals for public land across Oʻahu, Maui, Hawaiʻi Island, Kauaʻi, Guam, Saipan and
              the Marshall Islands. Each is written to the standard the agency requires and ready for its review
              appraiser.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Assignment types */}
      <Section tone="cream">
        <SectionHeader label="Assignments" title={'Assignment\n_Types_'} className="mb-12" />
        <EditorialTable
          caption="Assignment types and their typical agency use"
          columns={['Assignment', 'Typical agency use']}
          rows={assignments}
          numbered
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              These categories mirror those agencies list when soliciting appraisal services. The Department of Land and
              Natural Resources, for example, asks for experience with acquisitions, land valuations, lease rent
              reopenings, remnants, easements and market studies (DLNR notice).
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Yellow Book */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Federal Standards" title={'Yellow Book and\n_UASFLA Standards_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                Federal acquisitions, and many projects with federal funding, require appraisals under the{' '}
                <strong className="font-medium">Uniform Appraisal Standards for Federal Land Acquisitions (UASFLA)</strong>.
                The Yellow Book differs from standard USPAP practice in important ways:
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="How the Yellow Book differs from standard USPAP practice"
          columns={['Area', 'What the Yellow Book requires']}
          rows={yellowBook}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Federal agencies in the Pacific, including the U.S. Army Corps of Engineers Honolulu District, procure Yellow
              Book appraisals for assignments across Hawaiʻi, Guam and the Northern Mariana Islands.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Procurement */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <div>
            <SectionHeader tone="navy" label="HRS §103D-304" title={'Procurement: Statements _of Qualifications_'} />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-6">
                <p>
                  Under HRS §103D-304, professional services are awarded on demonstrated competence and qualification, at
                  fair and reasonable prices. Before each fiscal year, purchasing agencies publish notices inviting
                  professionals to submit statements of qualifications and expressions of interest. Qualified firms are
                  placed on a list for selection as needs arise.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <RevealOnScroll>
              <p className="text-gold-light text-[12px] tracking-[0.2em] uppercase font-serif font-medium mb-5">
                To make procurement easier, we keep:
              </p>
            </RevealOnScroll>
            <Checklist items={procurementFiles} tone="navy" />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-10">
                <p>
                  Procurement officers can request any of these through our inquiry form.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* Public lease rent */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Public Land" title={'Public Lease Rent\n_and Reopenings_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                The State and counties lease land for agriculture, commercial, industrial, resort and renewable energy uses.
                Each new lease and <TextLink href="/services/ground-rent-arbitration">each rent reopening</TextLink> needs a supportable market rent or land value. We value public land
                leases on the terms the lease or the statute sets: the permitted use, the term, and the method for rent.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Agencies */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Coverage" title={'Serving Agencies Across\n_Hawaiʻi and the Pacific_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>Agencies that procure appraisal services in the region include:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Agencies that procure appraisal services in the region"
          columns={['Agency', 'Covering']}
          rows={agencies}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Our Honolulu office keeps us close to state and City and County offices, and we travel to the neighbor islands
              and the Pacific for inspections.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="My preliminary review of the two appraisals you prepared showed that you were thorough and complete with your analysis, and I am happy with your work. If asked for a referral I would not hesitate to recommend you and I will not hesitate to use your services again if necessary. Thanks again."
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
          'eminent-domain-condemnation',
          'market-studies',
          'litigation-support-expert-testimony',
          'commercial-real-estate-appraisal',
        ]}
        plainTitles
      />
      <ServiceInquiry
        service={FORM_KEY}
        heading={'Ready for Credible,\n_Timely Results?_'}
        text="Send the project, the parcel and the standard required, and we'll confirm scope and schedule."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

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
  ImageRows,
  Checklist,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getAnyService } from '@/lib/services'

const SLUG = 'real-estate-consulting'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Real Estate Consulting & Advisory in Honolulu | Benavente'
const META_DESCRIPTION =
  'Independent advice for Honolulu and Hawaiʻi property decisions that need less than a full appraisal: appraisal reviews, lease abstracts, acquisition analysis.'
const HERO_IMAGE = '/images/gallery/cbd/dji_0341.webp'

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
  { label: 'Real Estate Consulting', href: URL_PATH },
]

const reviewReasons = [
  ["A value that doesn't look right", 'To a buyer, seller, owner or board'],
  ['Lender quality control', 'A second look before a credit decision'],
  ['An investment committee or fiduciary', 'Confirming an appraisal before acting on it'],
  ['An older appraisal', 'Checking whether it still reflects the market'],
]

const abstractFields = [
  ['Parties and premises', 'Tenant, guarantor, suite, area'],
  ['Term', 'Start and expiry, renewal options and notice dates'],
  ['Rent', 'Base rent schedule, increases, percentage rent'],
  ['Expenses', 'Recovery method, CAM, taxes, insurance, caps'],
  ['Rights', 'Assignment, subletting, termination, expansion, rights of first refusal'],
  ['Obligations', 'Repairs, alterations, use restrictions, surrender'],
  ['Ground lease terms', <>Ground rent, <TextLink href="/services/ground-rent-arbitration">reopening dates</TextLink>, reversion, where applicable</>],
]

const advice = [
  ['Pricing guidance', 'A supported view of value range before an offer or listing'],
  ['Due diligence support', 'Lease abstracts, rent roll and operating statement review, and county records research'],
  ['Risk review', 'Use restrictions, ground lease terms, easements and zoning issues that affect value'],
  ['Hold or sell analysis', <>The property&apos;s likely value against the <TextLink href="/services/feasibility-highest-and-best-use">owner&apos;s alternatives</TextLink></>],
]

const markets = [
  {
    title: 'Downtown Honolulu, Kakaʻako and Ala Moana',
    image: '/images/gallery/office/img_5409_1.webp',
    imageAlt: 'Concrete office building behind palms on a downtown street, with towers beyond',
    body: 'Office, retail and mixed-use buildings, often with complex lease rolls.',
  },
  {
    title: 'Waikīkī',
    image: '/images/gallery/hotel-hospitality/dji_0445-large.webp',
    imageAlt: 'Drone view of a Waikīkī high-rise among hotel and condominium towers',
    body: 'Hotel, retail and leasehold condominium properties.',
  },
  {
    title: 'Kapolei, Kalihi and Māpunapuna',
    image: '/images/gallery/industrial/dji_0787.webp',
    imageAlt: 'Mid-rise building with rooftop solar panels among low-rise warehouses',
    body: 'Industrial and warehouse properties, many on ground-leased land.',
  },
  {
    title: 'Windward and Central Oʻahu',
    image: '/images/regions/oahu-lanikai.webp',
    imageAlt: 'Lanikai coastline, Oʻahu',
    body: 'Neighborhood retail, medical office and small commercial buildings.',
  },
  {
    title: 'Maui, Hawaiʻi Island and Kauaʻi',
    image: '/images/regions/maui.webp',
    imageAlt: 'Maui coastline',
    body: 'Resort-area commercial, retail and land holdings.',
  },
  {
    title: 'Guam, Saipan and the Marshall Islands',
    image: '/images/regions/guam.webp',
    imageAlt: 'Guam coastline',
    body: 'Commercial and hospitality property for Pacific owners and lenders.',
  },
]

const appraisalNeeded = [
  'A lender, court, government agency or the IRS will rely on the value',
  'The value will be used in a transaction between related parties',
  'A fiduciary, such as an executor or trustee, must document fair market value',
  'The value may be challenged by another party',
]

const faqs: FaqItem[] = [
  {
    q: 'What does a real estate consultant do?',
    text: 'A real estate consultant gives independent, expert advice on a property decision, such as whether an appraisal is reliable, what a set of leases means for value, or whether a purchase price is supportable. It is narrower and faster than a full appraisal.',
    a: (
      <>
        A real estate consultant gives independent, expert advice on a property decision, such as whether an appraisal is
        reliable, what a set of leases means for value, or whether a <TextLink href="/clients/developers-investors">purchase price</TextLink> is supportable. It is narrower and
        faster than a full appraisal.
      </>
    ),
  },
  {
    q: 'Is a consulting report the same as an appraisal?',
    text: "No. A consulting assignment answers a specific question. An appraisal concludes a market value under USPAP for an intended use. We'll recommend which you need.",
    a: (
      <>
        No. A consulting assignment answers a specific question. An appraisal concludes a market value under USPAP for an
        intended use. We&apos;ll recommend which you need.
      </>
    ),
  },
  {
    q: 'How much does an appraisal review cost compared with a new appraisal?',
    text: 'A review is usually narrower in scope than a new appraisal. We quote each assignment once we know the report and the question.',
    a: (
      <>
        A review is usually narrower in scope than a new appraisal. We quote each assignment once we know the report and
        the question.
      </>
    ),
  },
  {
    q: 'Can you abstract leases for a whole portfolio?',
    text: 'Yes. We prepare consistent abstracts across multiple properties, so leases can be compared side by side.',
    a: 'Yes. We prepare consistent abstracts across multiple properties, so leases can be compared side by side.',
  },
  {
    q: 'Do you advise buyers as well as owners?',
    text: 'Yes. We advise buyers, sellers, owners and lenders, after a conflict check.',
    a: <>Yes. We advise buyers, sellers, owners and lenders, after a conflict check.</>,
  },
  {
    q: 'Do you consult on property outside Honolulu?',
    text: 'Yes. We consult on property across Oʻahu, Maui, Hawaiʻi Island and Kauaʻi, and in Guam, Saipan and the Marshall Islands.',
    a: (
      <>
        Yes. We consult on property across Oʻahu, Maui, Hawaiʻi Island and Kauaʻi, and in Guam, Saipan and the Marshall
        Islands.
      </>
    ),
  },
]

export default function RealEstateConsultingPage() {
  const service = getAnyService(SLUG)!

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Real Estate Consulting',
          serviceType: 'Independent real estate consulting and advisory',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Real Estate Consulting"
        heading={'Independent Real Estate\nConsulting in _Honolulu_'}
        subhead="Real estate consulting gives an independent, expert answer to a property question that doesn't need a full appraisal. Typical assignments include reviewing someone else's appraisal, abstracting leases so an owner or buyer knows exactly what they hold, and analyzing an acquisition or sale before a decision is made. The work is advisory, but done to professional appraisal standards."
        image={HERO_IMAGE}
        imageAlt="Downtown Honolulu office towers beyond a tree-lined avenue and green park"
        breadcrumb={crumbs}
        number="13"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Discuss a Question"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/office/img_7702-large.webp"
                  alt="Glass office tower at a downtown intersection, with high-rises along the street behind it"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI & SRA Designated" title={'An Experienced,\n_Independent View_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group is a firm of real estate appraisers and consultants based on Fort Street Mall in downtown
              Honolulu. Owners, buyers, <TextLink href="/clients/lenders">lenders</TextLink> and fiduciaries across Oʻahu, Maui, Hawaiʻi Island, Kauaʻi and the Pacific
              come to us when they need an experienced, independent view, and when a full appraisal would be more than the
              decision needs. Our MAI and SRA designated principals bring the same discipline to a consulting question that
              they bring to a court-ready report.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Appraisal reviews */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="USPAP Standard 3" title={'Appraisal\n_Reviews_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                An appraisal review is an independent assessment of another appraiser&apos;s work. It answers a simple
                question: can this report be relied on for its intended use?
              </p>
              <p>
                Under USPAP Standard 3, we test whether the report&apos;s data, analysis and conclusions are credible and
                appropriate. Common reasons to order a review include:
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Common reasons to order an appraisal review"
          columns={['Common reason', 'In practice']}
          rows={reviewReasons}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              A review can stop at whether the report is credible, or include our own opinion of value. For Hawaiʻi
              property, reviews often turn on local issues a mainland appraiser may miss: <TextLink href="/services/ground-lease-valuation">ground lease terms</TextLink>, thin
              comparable data, or a sale that wasn&apos;t arm&apos;s-length.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Lease abstracts */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Lease Review" title={'Lease Abstracts\n_and Analysis_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                A commercial lease can run a hundred pages, and the terms that matter most are often buried. A lease
                abstract condenses each lease into a short, consistent summary an owner, buyer or lender can act on.
              </p>
              <p className="font-medium">What a lease abstract typically captures:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="What a lease abstract typically captures"
          columns={['Category', 'Examples']}
          rows={abstractFields}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Beyond the summary, we analyze what the leases mean for value: rents above or below market, rollover risk,
              expense recovery gaps, and options that limit a buyer&apos;s flexibility.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Acquisition advice */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Before a Decision" title={'Acquisition and\n_Disposition_ Advice'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>
                Before a purchase or sale, an independent view can save a costly mistake. Our consulting on acquisitions
                and dispositions can include:
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="What our acquisition and disposition consulting can include"
          columns={['Advice', 'What it covers']}
          rows={advice}
          numbered
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Owners considering a sale and reinvestment, such as a 1031 exchange, often need a value for planning. Your
              tax advisor handles the exchange itself.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Markets */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader tone="navy" label="Markets" title={'Consulting Across Honolulu _and the Islands_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose tone="navy">
              <p>Our clients are based across Hawaiʻi and beyond, and so are their properties.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <ImageRows items={markets} />
        <RevealOnScroll delay={0.1}>
          <Prose tone="navy" className="mt-10 max-w-[760px]">
            <p>
              Mainland owners and investors with Hawaiʻi property often need a local view before a decision. We work with
              them directly.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* When an appraisal is needed */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader label="Choosing the Right Tool" title={'When You Need an\n_Appraisal Instead_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>Consulting is the right tool for many decisions, but not all. You need a full appraisal when:</p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <Checklist items={appraisalNeeded} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-10">
                <p>
                  In those cases, we&apos;ll tell you so at the outset and <TextLink href="/services/commercial-real-estate-appraisal">scope an appraisal</TextLink> instead. A broker opinion of
                  value is another alternative, with different limits: it comes from a licensee who may be marketing the
                  property, not an independent appraiser.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="Outstanding… collaboration is how we get this done. If it were easy, we would not be doing what we do for a living… Kudos…"
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
        text="Tell us the decision in front of you, and we'll recommend the right scope."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

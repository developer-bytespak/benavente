import type { Metadata } from 'next'
import Image from 'next/image'
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
  NumberedItems,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getAnyService } from '@/lib/services'

const SLUG = 'luxury-home-appraisal'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Luxury Home Appraiser in Hawaii | SRA-Designated'
const META_DESCRIPTION =
  'Private, non-lending appraisals of oceanfront and high-value Hawaiʻi homes for estates, divorce, tax appeals and sales, by SRA-designated appraisers.'
const HERO_IMAGE = '/images/gallery/luxury-residential/dji_20260411115211_0058_d.webp'

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
  { label: 'Luxury Residential Valuation', href: URL_PATH },
]

const purposes = [
  ['Estate and trust', <><TextLink href="/services/estate-trust-appraisal">Date of death or trust-date value</TextLink>, supporting tax filings and stepped-up basis</>],
  ['Divorce', 'Current or retrospective value for property division'],
  ['Property tax appeal', "Evidence the county's assessment exceeds market value"],
  ['Private sale or purchase', 'An independent value before pricing or making an offer, especially off-market'],
  ['Gifting and planning', 'Value for gifts, family transfers and estate planning'],
  ['Partnership and co-ownership', 'Value when co-owners buy each other out'],
  ['Insurance and records', "A documented value and description for the owner's records"],
]

const thinData = [
  ['Wider, verified searches', 'Across time and comparable neighborhoods, confirmed with brokers and parties where possible'],
  ['Paired-sale and market analysis', 'To support adjustments for view, frontage and lot size, rather than rules of thumb'],
  ['Land value analysis', 'Because in prime locations the land often carries most of the value'],
  ['Clear reasoning', 'Every adjustment explained, so an attorney, executor or Board of Review can follow it'],
]

const neighborhoods = [
  [
    'Oʻahu: Honolulu',
    'Kahala, Diamond Head, Black Point, Portlock, Hawaiʻi Loa Ridge, Waialae Iki, Kakaʻako and Waikīkī luxury condominiums',
  ],
  ['Oʻahu: Windward and North Shore', 'Lanikai, Kailua beachfront, Kāneʻohe Bay, North Shore oceanfront'],
  ['Maui', 'Wailea, Makena, Kapalua, Kāʻanapali, upcountry estates'],
  ['Hawaiʻi Island', 'Kohala Coast resort communities, Kailua-Kona oceanfront, Waimea ranch estates'],
  ['Kauaʻi', 'Princeville, Hanalei, Poʻipū, Kīlauea'],
]

const faqs: FaqItem[] = [
  {
    q: 'Can you do my mortgage appraisal?',
    text: 'No. Mortgage and refinance appraisals are ordered by your lender through its own panel. Our luxury home appraisals are private, non-lending assignments for estates, divorce, tax appeals, sales and planning.',
    a: (
      <>
        No. Mortgage and refinance appraisals are ordered by your lender through its own panel. Our luxury home appraisals
        are private, non-lending assignments for estates, divorce, <TextLink href="/services/property-tax-appeal">tax appeals</TextLink>, sales and planning.
      </>
    ),
  },
  {
    q: 'What does SRA mean?',
    text: "The SRA is the Appraisal Institute's designation for appraisers experienced in residential property. Our principals hold both the SRA and the MAI.",
    a: (
      <>
        The SRA is the Appraisal Institute&apos;s designation for appraisers experienced in residential property. Our
        principals hold both the SRA and the MAI.
      </>
    ),
  },
  {
    q: 'How do you value a home with no close comparables?',
    text: 'By widening the search carefully, verifying each sale, supporting adjustments with market evidence, and separating land value from the improvements. The report explains every step.',
    a: (
      <>
        By widening the search carefully, verifying each sale, supporting adjustments with market evidence, and separating
        land value from the improvements. The report explains every step.
      </>
    ),
  },
  {
    q: 'Can you appraise a home as of a past date?',
    text: 'Yes. Retrospective appraisals are common for estates and divorce, valued as of the date of death or separation.',
    a: (
      <>
        Yes. Retrospective appraisals are common for estates and divorce, valued as of the date of death or separation.
      </>
    ),
  },
  {
    q: 'Do you appraise luxury homes in Kahala, Lanikai and Diamond Head?',
    text: 'Yes. We appraise high-value homes across Honolulu and Windward Oʻahu, including Kahala, Diamond Head, Black Point, Portlock, Lanikai and Kailua.',
    a: (
      <>
        Yes. We appraise high-value homes across Honolulu and Windward Oʻahu, including Kahala, Diamond Head, Black Point,
        Portlock, Lanikai and Kailua.
      </>
    ),
  },
  {
    q: 'Do you appraise homes on Maui, Kauaʻi and the Big Island?',
    text: 'Yes, including Wailea, Kapalua, the Kohala Coast, Princeville and Poʻipū.',
    a: <>Yes, including Wailea, Kapalua, the Kohala Coast, Princeville and Poʻipū.</>,
  },
  {
    q: 'Is the appraisal confidential?',
    text: 'Yes. Reports go only to the client and the intended users named in the engagement.',
    a: <>Yes. Reports go only to the client and the intended users named in the engagement.</>,
  },
]

export default function LuxuryHomeAppraisalPage() {
  const service = getAnyService(SLUG)!

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Luxury Home Appraisal',
          serviceType: 'Private, non-lending appraisal of high-value residential property',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Luxury Residential Valuation"
        heading={'Luxury and High-Value\nHome Appraisals in _Hawaiʻi_'}
        subhead="A luxury home appraisal is a private, independent valuation of a high-value residence, ordered by the owner, an attorney or an executor rather than a mortgage lender. It's used for estates, divorce, tax appeals, private sales and planning. In Hawaiʻi, where few comparable homes sell each year, it needs an experienced residential appraiser who can support value with limited data."
        image={HERO_IMAGE}
        imageAlt="Aerial view of oceanfront homes on a rocky point, with a residential coastline and green ridges beyond"
        breadcrumb={crumbs}
        number="12"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Request a Private Appraisal"
        secondaryCta={{ label: 'View Our Work', href: '/gallery?cat=luxury-residential' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/luxury-residential/dji_0958-large.webp"
                  alt="Estate homes among mature trees at the foot of a dry volcanic slope"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="SRA & MAI Designated" title={'Commercial-Grade Analysis\n_for High-Value Homes_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group appraises oceanfront, view and estate homes for private clients and their advisors, from
              Kahala and Diamond Head to Wailea and the Kohala Coast. <TextLink href="/about">Our principals</TextLink> hold the SRA designation, the Appraisal
              Institute&apos;s credential for residential appraisal, alongside the MAI. We bring commercial-grade analysis
              to homes where a standard form appraisal isn&apos;t enough.
            </p>
            <div className="relative bg-cream border border-gold/25 rounded-[2px] p-6 sm:p-7 mt-8">
              <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
              <p className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium">Please note</p>
              <p className="text-navy/80 text-[16px] font-light leading-[1.75] mt-2">
                This service is for private, non-lending purposes. If you need an appraisal for a mortgage or refinance,
                your lender will order it through its own panel.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Purposes */}
      <Section tone="cream">
        <SectionHeader label="Private Purposes" title={'When a Private Appraisal\n_Is Needed_'} className="mb-12" />
        <EditorialTable
          caption="Purposes for a private appraisal and what the appraisal provides for each"
          columns={['Purpose', 'What the appraisal provides']}
          rows={purposes}
          numbered
        />
        <RevealOnScroll delay={0.1}>
          <div className="mt-14 max-w-[860px]">
            <p className="font-serif italic text-[clamp(22px,2.4vw,28px)] text-gold-dark leading-[1.45]">
              A lending appraisal answers one question for one bank.
            </p>
            <GoldRule className="w-24 mt-6 opacity-70" delay={0.3} />
            <Prose className="mt-6">
              <p>
                A private appraisal is written for your purpose and your advisors, with the depth the property and the
                decision require.
              </p>
            </Prose>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Few comparables */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Thin Data" title={'Why Few Comparables\n_Exist_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                High-value homes in Hawaiʻi trade rarely, and no two are alike. In a given year, an oceanfront neighborhood
                may record only a handful of sales, each with a different lot, frontage, view, age and finish. Many trade
                privately or through trusts and entities, so details are hard to confirm.
              </p>
              <p>We handle that the way we handle <TextLink href="/services/commercial-real-estate-appraisal">complex commercial property</TextLink>:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="How we support value when few comparable sales exist"
          columns={['Our approach', 'Why it matters']}
          rows={thinData}
        />
      </Section>

      {/* Premiums */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-14">
          <SectionHeader tone="navy" label="Value Drivers" title={'View, Shoreline and\n_Land-Tenure_ Premiums'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose tone="navy">
              <p>The features that drive Hawaiʻi luxury values are often the hardest to measure.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <NumberedItems
          tone="navy"
          items={[
            {
              title: 'View',
              body: (
                <p>
                  An unobstructed ocean or Diamond Head view can command a large premium over a partial view. We analyze
                  the quality, permanence and breadth of the view, including the risk of it being blocked by future
                  building.
                </p>
              ),
            },
            {
              title: 'Shoreline and frontage',
              body: (
                <p>
                  Oceanfront property carries the highest premiums, and the greatest constraints. Shoreline setbacks,
                  erosion, seawall permitting and flood zones can all limit what an owner may build, repair or rebuild. We
                  consider each one, because a buyer will.
                </p>
              ),
            },
            {
              title: 'Land tenure',
              body: (
                <p>
                  Some high-end homes sit on <TextLink tone="navy" href="/services/ground-lease-valuation">leasehold land</TextLink>. A leasehold residence is worth less than the same home in fee
                  simple, and the gap widens as the lease shortens.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* Neighborhoods */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Neighborhoods" title={'Luxury Neighborhoods\n_We Appraise_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>
                Each of Hawaiʻi&apos;s high-end neighborhoods behaves as its own market, with its own buyers, lot sizes and
                premiums. We analyze them separately rather than averaging across an island.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Luxury neighborhoods we appraise, by island"
          columns={['Island', 'Neighborhoods']}
          rows={neighborhoods}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-20 items-center mt-16">
          <RevealOnScroll>
            <Prose>
              <p>
                Luxury condominiums are valued differently from homes. Floor level, view corridor, unit size and building
                amenities drive the premium, and building-level issues such as reserves and special assessments matter too.
              </p>
            </Prose>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <div className="group relative h-[280px] lg:h-[320px] rounded-[2px] overflow-hidden">
              <Image
                src="/images/gallery/luxury-residential/img_6725.webp"
                alt="High-rise condominium tower rising behind palms and street trees"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
              />
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Discretion */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader tone="navy" label="Confidentiality" title={'Discretion and\n_Confidentiality_'} />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                High-value appraisals often involve private family matters: an estate, <TextLink tone="navy" href="/services/litigation-support-expert-testimony">a separation</TextLink>, a sale not yet public.
                We treat every engagement with strict confidentiality. We schedule inspections around the household, keep
                the number of people involved to a minimum, and share the report only with the client and the intended
                users named in the engagement letter.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Process */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.3fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader label="How It Works" title={'Our\n_Process_'} />
          </div>
          <NumberedItems
            layout="rows"
            items={[
              {
                title: 'Confidential consultation',
                body: <p>We confirm the purpose, the date of value and who will rely on the report.</p>,
              },
              { title: 'Engagement', body: <p>A letter setting out scope, fee and delivery date.</p> },
              {
                title: 'Inspection',
                body: <p>An interior and exterior inspection, with drone photography where useful.</p>,
              },
              {
                title: 'Research and analysis',
                body: <p>Verified sales, land value and analysis of view, frontage and tenure.</p>,
              },
              { title: 'Report', body: <p>A USPAP-compliant <TextLink href="/process">narrative report</TextLink> written for your purpose.</p> },
            ]}
          />
        </div>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="It's a pleasure working with you and your team!! High quality appraisals, easy to work with, thorough… we're very fortunate."
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
        text="Tell us the property, the purpose and the date of value. Every enquiry is confidential."
        image="/images/gallery/luxury-residential/dji_0523.webp"
      />
      <StickyInquiryButton />
    </>
  )
}

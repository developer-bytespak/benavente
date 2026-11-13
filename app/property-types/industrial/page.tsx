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
  PhotoRow,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'

const FORM_KEY = 'industrial'
const URL_PATH = '/property-types/industrial'
const META_TITLE = 'Industrial & Warehouse Appraisal on Oahu | Benavente Group'
const META_DESCRIPTION =
  'Valuation of Oʻahu warehouses, distribution buildings and industrial land in Kapolei, Kalihi, Māpunapuna and beyond, including ground-leased sites.'
const HERO_IMAGE = '/images/gallery/industrial/dji_20260331103116_0007_d-large.webp'

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
  { label: 'Industrial & Warehouse', href: URL_PATH },
]

const submarkets = [
  ['Kalihi and Iwilei', 'Older, close-in warehouses near Honolulu Harbor and downtown; strong demand for last-mile distribution'],
  ['Māpunapuna and the airport area', 'Airport-adjacent warehouses and service industrial, much of it on ground-leased land'],
  ['Sand Island', 'Harbor-related industrial, often on State-leased land'],
  ['Hālawa and Pearl City', 'Central locations along the H-1 and H-201 corridors'],
  ['Campbell Industrial Park and Kapolei', 'Larger sites, heavy industrial and newer distribution buildings in West Oʻahu'],
  ['Waipahu and Central Oʻahu', "Smaller industrial and flex space serving the island's growth areas"],
  ['Maui', 'Kahului and Wailuku industrial areas near Kahului Harbor and the airport, plus Kīhei light industrial'],
  ['Hawaiʻi Island', 'Hilo near the harbor, and Kailua-Kona industrial areas'],
  ['Kauaʻi', 'Līhuʻe and Nāwiliwili harbor-area industrial'],
]

const scarcity = [
  ['Geography', 'Limited flat land, much of it already developed or held for other uses'],
  ['Zoning and land use', 'Few areas zoned for industrial use, and conversion pressure from residential and mixed-use development in close-in districts'],
  ['Land tenure', 'Large landowners holding industrial land for lease rather than sale'],
  ['Infrastructure', 'Dependence on Honolulu Harbor, which handles most goods imported to the state, and on airport and highway access'],
]

const valueDrivers = [
  ['Clear height', 'Higher clear heights allow more storage and modern racking'],
  ['Loading', 'Dock-high doors, grade-level doors and truck court depth'],
  ['Yard and parking', 'Outdoor storage and trailer parking are scarce and valuable on Oʻahu'],
  ['Power and utilities', 'For manufacturing and cold storage users'],
  ['Office ratio', 'Too much office space can reduce value for warehouse users'],
  ['Building age and condition', 'Older Kalihi buildings vs newer Kapolei distribution space'],
]

const faqs: FaqItem[] = [
  {
    q: 'What is an industrial property appraisal?',
    text: 'An independent valuation of a warehouse, distribution building, flex space or industrial land, usually using the income and sales comparison approaches. It accounts for location, building function and land tenure.',
    a: (
      <>
        An independent valuation of a warehouse, distribution building, flex space or industrial land, usually using the
        income and sales comparison approaches. It accounts for location, building function and land tenure.
      </>
    ),
  },
  {
    q: 'Why are Oʻahu industrial values so high?',
    text: 'Industrial land is scarce. Limited flat land, few industrial-zoned areas and conversion pressure keep supply tight, while demand from distribution and harbor-related users remains steady.',
    a: (
      <>
        Industrial land is scarce. Limited flat land, few industrial-zoned areas and conversion pressure keep supply tight,
        while demand from distribution and harbor-related users remains steady.
      </>
    ),
  },
  {
    q: "Does a ground lease lower an industrial property's value?",
    text: 'Usually, for the building owner. A leasehold is worth less than fee simple, and value falls as the remaining term shortens. Ground rent and reopening dates also matter.',
    a: (
      <>
        Usually, for the building owner. A leasehold is worth less than fee simple, and value falls as the remaining term
        shortens. Ground rent and reopening dates also matter.
      </>
    ),
  },
  {
    q: 'Do you appraise warehouses in Kalihi, Māpunapuna and Kapolei?',
    text: "Yes. We appraise industrial property across Oʻahu's submarkets, from Kalihi, Iwilei and Sand Island to Māpunapuna, Hālawa, Waipahu, Kapolei and Campbell Industrial Park.",
    a: (
      <>
        Yes. We appraise industrial property across Oʻahu&apos;s submarkets, from Kalihi, Iwilei and Sand Island to
        Māpunapuna, Hālawa, Waipahu, Kapolei and Campbell Industrial Park.
      </>
    ),
  },
  {
    q: 'Do you appraise industrial land without buildings?',
    text: 'Yes. We value vacant and underused industrial land, including land under ground lease.',
    a: <>Yes. We value vacant and underused industrial land, including land under ground lease.</>,
  },
  {
    q: 'Do you appraise industrial property on the neighbor islands?',
    text: 'Yes. We appraise industrial property in Kahului, Hilo, Kona and Līhuʻe, and in Guam, Saipan and the Marshall Islands.',
    a: (
      <>
        Yes. We appraise industrial property in Kahului, Hilo, Kona and Līhuʻe, and in Guam, Saipan and the Marshall
        Islands.
      </>
    ),
  },
]

export default function IndustrialPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Industrial and Warehouse Property Appraisal',
          serviceType: 'Industrial, warehouse and industrial land appraisal',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Industrial & Warehouse"
        heading={'Industrial and Warehouse\nProperty Appraisal on _Oʻahu_'}
        subhead="An industrial appraisal values warehouses, distribution buildings, flex space and industrial land. On Oʻahu, value is driven by an extreme shortage of industrial land, a market where much of it is ground leased, and location relative to Honolulu Harbor, the airport and the H-1. Building features such as clear height, loading and yard space matter as much as size."
        image={HERO_IMAGE}
        imageAlt="Aerial view of warehouses with rooftop solar panels and loading yards in an industrial district"
        breadcrumb={crumbs}
        formService={FORM_KEY}
        primaryHref="#inquiry"
        primaryLabel="Discuss an Industrial Property"
        secondaryCta={{ label: 'View Industrial Projects', href: '/gallery?cat=industrial' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/industrial/dji_0889.webp"
                  alt="Single-story warehouse with roll-up loading doors and parking along a curving street"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI Designated" title={'We Know How Each\n_Submarket Behaves_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group appraises industrial property from Kalihi and Māpunapuna to Kapolei and Campbell Industrial
              Park, and on the neighbor islands and across the Pacific, for lenders, owners, investors, attorneys and
              government agencies. Industrial is one of the core categories in our portfolio, and our MAI-designated
              appraisers know how each submarket behaves.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Submarkets */}
      <Section tone="cream">
        <SectionHeader label="Submarkets" title={'Industrial Submarkets\n_We Cover_'} className="mb-12" />
        <EditorialTable
          caption="Industrial submarkets we cover and their character"
          columns={['Submarket', 'Character']}
          rows={submarkets}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Each submarket has its own rents, land values and tenant base. We analyze the property within its submarket
              rather than against island-wide averages.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Scarcity */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Supply" title={'Why Industrial Land\n_Is So Scarce_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>
                Oʻahu&apos;s industrial market has long been among the tightest in the country. Several factors limit supply:
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Factors that limit the supply of industrial land on Oʻahu"
          columns={['Factor', 'How it limits supply']}
          rows={scarcity}
          numbered
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Scarcity shows up in high land values, low vacancy and rents that rival or exceed many mainland markets. It also
              means few sales, so we support value with careful lease analysis, verified land sales and income capitalization.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Value drivers */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader tone="navy" label="Building Function" title={'What Drives\n_Industrial Value_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose tone="navy">
              <p>Beyond location, buyers and tenants pay for function:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          tone="navy"
          caption="Building features that drive industrial value"
          columns={['Feature', 'Why it matters']}
          rows={valueDrivers}
        />
        <RevealOnScroll delay={0.1}>
          <Prose tone="navy" className="mt-12 max-w-[860px]">
            <p>
              We inspect each property in person and photograph it by drone, because loading, yard and access are easier to
              judge on site than from plans.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Land tenure */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Land Tenure" title={'Fee Simple vs _Ground-Leased_ Industrial'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                Much of Oʻahu&apos;s industrial property sits on ground-leased land, including large areas around Māpunapuna,
                the airport and the harbor. For an owner of a building on leased land, value depends on the remaining lease
                term, the ground rent and its reopening dates, and what happens to the building when the lease ends.
              </p>
              <p>
                A ground-leased warehouse is worth less than the same building in fee simple, and the gap widens as the lease
                shortens. We value the leasehold, the leased fee or both, and model ground rent through each reopening.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Selected assignments */}
      <Section>
        <SectionHeader label="Experience" title={'Selected Industrial\n_Assignments_'} className="mb-10" />
        <PhotoRow
          photos={[
            { src: '/images/gallery/industrial/dji_0196.webp', alt: 'Aerial view of a pier warehouse in a harbor' },
            { src: '/images/gallery/industrial/dji_0993.webp', alt: 'Aerial view of a multi-building industrial park' },
            { src: '/images/gallery/industrial/dji_0412.webp', alt: 'Aerial view of a metal warehouse with loading doors and a truck yard' },
          ]}
        />
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="Man. Your drone pictures are so professional. Love it!… some awesome pictures! Thanks!"
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
          'market-studies',
        ]}
        plainTitles
      />
      <ServiceInquiry
        service={FORM_KEY}
        heading={'Ready for Credible,\n_Timely Results?_'}
        text="Send the property address, rent roll and purpose, and we'll confirm scope, fee and delivery date."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

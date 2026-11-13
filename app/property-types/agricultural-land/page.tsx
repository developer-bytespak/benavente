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

const FORM_KEY = 'agricultural-land'
const URL_PATH = '/property-types/agricultural-land'
const META_TITLE = 'Agricultural & Conservation Land Appraisal in Hawaii'
const META_DESCRIPTION =
  'Farm, ranch and conservation land appraisals across Oʻahu, Maui, the Big Island and Kauaʻi, including conservation easements and water access.'
const HERO_IMAGE = '/images/gallery/agriculture/dji_0750-large.webp'

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
  { label: 'Agricultural & Conservation Land', href: URL_PATH },
]

const landTypes = [
  ['Diversified farmland', 'Soil quality, water supply, slope, access, proximity to markets'],
  ['Pasture and ranch land', 'Carrying capacity, rainfall, fencing, water systems, scale'],
  ['Orchards and specialty crops', 'Established plantings, irrigation, crop history'],
  ['Former plantation land', 'Size, infrastructure, irrigation ditches, future use potential'],
  ['Gentleman farms and estates', 'Views, privacy, farm dwelling rights, lot size'],
  ['Conservation district land', 'Highly restricted use; value often driven by recreation, preservation or easement potential'],
]

const waterAndAccess = [
  ['Water source and reliability', 'County water, private wells, ditch or irrigation system allocations'],
  ['Water rights and agreements', 'Any rights that run with the land, and how secure they are'],
  ['Physical access', 'Legal and practical road access, easements and their condition'],
  ['Utilities', 'Power availability, which affects farm operations and dwelling potential'],
]

const restrictions = [
  ['Important Agricultural Lands', 'A State designation intended to keep productive land in agriculture, which can limit future reclassification'],
  ['County agricultural dedication', 'A lower property tax assessment in exchange for keeping land in agricultural use for a set term, with penalties for breaking the dedication'],
  ['Subdivision and dwelling limits', 'Limits on lot size and the number of farm dwellings'],
  ['Recorded covenants and easements', 'Including existing conservation easements'],
]

const ruralMarkets = [
  ['Oʻahu', 'North Shore and Waialua farmland, Kunia and Central Oʻahu agricultural land, Waimānalo farm lots, Windward valley parcels'],
  ['Hawaiʻi Island', 'Waimea and Kohala ranch land, Kona coffee farms, Hāmākua and Hilo former sugar land, Puna and Kaʻū rural acreage'],
  ['Maui', 'Upcountry Kula and Makawao farm and ranch land, central Maui former plantation land, East Maui parcels'],
  ['Kauaʻi', 'Kīlauea and North Shore farm lots, Kapaʻa and westside former plantation land'],
  ['Molokaʻi and Lānaʻi', 'Large rural holdings with limited sales data'],
]

const faqs: FaqItem[] = [
  {
    q: 'How is agricultural land valued in Hawaiʻi?',
    text: 'Mostly by comparison with sales of similar land, adjusted for water, soils, topography, access, size and land use district. Where land produces income, such as ranch or farm leases, an income analysis supports the value.',
    a: (
      <>
        Mostly by comparison with sales of similar land, adjusted for water, soils, topography, access, size and land use
        district. Where land produces income, such as ranch or farm leases, an income analysis supports the value.
      </>
    ),
  },
  {
    q: 'Why does water matter so much?',
    text: "Without a reliable water source, much agricultural land can't be farmed intensively. Water access can change the value of otherwise similar parcels several times over.",
    a: (
      <>
        Without a reliable water source, much agricultural land can&apos;t be farmed intensively. Water access can change the
        value of otherwise similar parcels several times over.
      </>
    ),
  },
  {
    q: 'What is a conservation easement worth?',
    text: "The difference between the land's market value before the easement and its value after the restrictions take effect, measured with the before-and-after method.",
    a: (
      <>
        The difference between the land&apos;s market value before the easement and its value after the restrictions take
        effect, measured with the before-and-after method.
      </>
    ),
  },
  {
    q: 'Do I need a qualified appraisal for an easement donation?',
    text: 'For a federal tax deduction, the IRS requires a qualified appraisal prepared by a qualified appraiser. Your tax advisor will confirm the filing requirements.',
    a: (
      <>
        For a federal tax deduction, the IRS requires a qualified appraisal prepared by a qualified appraiser. Your tax
        advisor will confirm the filing requirements.
      </>
    ),
  },
  {
    q: 'Do you appraise ranch land in Waimea and Kona coffee farms?',
    text: 'Yes. We appraise ranch, farm and rural land across Hawaiʻi Island, including Waimea, Kohala and Kona.',
    a: <>Yes. We appraise ranch, farm and rural land across Hawaiʻi Island, including Waimea, Kohala and Kona.</>,
  },
  {
    q: "Do you appraise farmland on Oʻahu's North Shore and upcountry Maui?",
    text: 'Yes. We appraise agricultural land across Oʻahu, Maui, Kauaʻi, Molokaʻi and Lānaʻi.',
    a: <>Yes. We appraise agricultural land across Oʻahu, Maui, Kauaʻi, Molokaʻi and Lānaʻi.</>,
  },
]

// Before value minus after value equals the easement's value. No figures: the
// brief describes the method only.
function BeforeAfterDiagram() {
  const parts = [
    { label: 'Before', note: "The land's market value before the easement" },
    { label: 'After', note: "Its value after the easement's restrictions" },
  ]
  return (
    <figure aria-label="A conservation easement's value is the land's value before the easement minus its value after">
      <div className="grid grid-cols-2 gap-3">
        {parts.map((p, i) => (
          <RevealOnScroll key={p.label} delay={i * 0.12}>
            <div className="h-full bg-white border border-gold/25 rounded-[2px] px-5 py-6">
              <p className="font-serif text-[22px] text-navy leading-[1.2]">{p.label}</p>
              <p className="text-slate text-[14px] font-light mt-1">{p.note}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
      <RevealOnScroll delay={0.25}>
        <div aria-hidden="true" className="flex justify-center py-4">
          <span className="w-px h-10 bg-gold/60" />
        </div>
        <div className="bg-navy rounded-[2px] px-6 py-7 text-center">
          <p className="text-gold-light text-[11px] tracking-[0.25em] uppercase font-serif font-medium">The difference</p>
          <p className="font-serif text-[26px] text-white leading-[1.2] mt-2">The easement&apos;s value</p>
        </div>
      </RevealOnScroll>
    </figure>
  )
}

export default function AgriculturalLandPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Agricultural, Ranch and Conservation Land Appraisal',
          serviceType: 'Agricultural, ranch and conservation land appraisal',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Agricultural & Conservation Land"
        heading={'Agricultural, Ranch and Conservation Land Appraisal in _Hawaiʻi_'}
        subhead="An agricultural land appraisal values farms, ranches, orchards and other rural land. In Hawaiʻi, value depends heavily on the State land use district, access to water, topography and soils, and any restrictions such as conservation easements or Important Agricultural Lands designation. Large parcels trade rarely, so each sale must be verified and adjusted with care."
        image={HERO_IMAGE}
        imageAlt="Aerial view of orderly farm fields and red dirt roads running down toward the coast"
        breadcrumb={crumbs}
        formService={FORM_KEY}
        primaryHref="#inquiry"
        primaryLabel="Discuss a Land Appraisal"
        secondaryCta={{ label: 'View Agricultural Projects', href: '/gallery?cat=agriculture' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/agriculture/dji_0306.webp"
                  alt="Orchard, farm buildings and green pasture seen from above"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI Designated" title={'We Walk\n_the Land_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group appraises agricultural, ranch and conservation land from the North Shore of Oʻahu to Waimea,
              Kona, upcountry Maui and Kauaʻi, for landowners, trusts, lenders, attorneys, land trusts and government agencies.
              Agriculture is one of the core categories in our portfolio. Our MAI-designated appraisers walk the land,
              photograph it by drone and research the records that decide what it can be used for.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Land types */}
      <Section tone="cream">
        <SectionHeader label="Land Types" title={'Agricultural and\n_Conservation Land Types_'} className="mb-12" />
        <EditorialTable
          caption="Agricultural and conservation land types and their typical value drivers"
          columns={['Land type', 'Typical value drivers']}
          rows={landTypes}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Purposes include sale and purchase, financing, estates and trusts, partition among family owners, government
              acquisition, lease rents on public agricultural land, and conservation easements.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Water */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Site Factors" title={'Water and\n_Access_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                On agricultural land, water often decides value more than acreage does. Two parcels of the same size can differ
                several-fold in value depending on whether they have a reliable irrigation source, a county water meter, well
                rights or access to a ditch system. We document:
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="What we document about water, access and utilities"
          columns={['We document', 'Covering']}
          rows={waterAndAccess}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Where water rights are central, we coordinate with the client&apos;s attorney on their legal status and value only
              what the records support.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Land use */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader tone="navy" label="HRS Chapter 205" title={'Land Use Districts\n_and Restrictions_'} />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                Every parcel in Hawaiʻi falls into one of four State land use districts: Urban, Rural, Agricultural or
                Conservation, under HRS Chapter 205. The district sets the outer limits on use before county zoning applies. For
                agricultural and conservation land, that classification is often the single biggest influence on value.
              </p>
              <p>Other restrictions can apply:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          tone="navy"
          caption="Other restrictions that can apply to agricultural and conservation land"
          columns={['Restriction', 'What it means']}
          rows={restrictions}
        />
        <RevealOnScroll delay={0.1}>
          <Prose tone="navy" className="mt-12 max-w-[860px]">
            <p>We research each one, because a restriction that a buyer would discover in due diligence must be reflected in the value.</p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Conservation easements */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-center">
          <div>
            <SectionHeader label="Before and After" title={'Conservation\n_Easement Valuation_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  A conservation easement permanently restricts development on land to protect its natural, agricultural or
                  scenic value. Landowners often donate or sell easements to land trusts or government programs, and the value
                  of the easement can support a federal income tax deduction or a purchase price.
                </p>
                <p>
                  Conservation easements are valued with the <strong className="font-medium">before-and-after method</strong>:
                  the land&apos;s market value before the easement, minus its value after the easement&apos;s restrictions. The
                  difference is the easement&apos;s value. The &quot;before&quot; value depends heavily on highest and best use,
                  and is closely scrutinized.
                </p>
                <p>
                  For donated easements claimed as a tax deduction, the IRS requires a qualified appraisal by a qualified
                  appraiser, and these deductions draw close IRS attention. The appraisal must be thoroughly supported.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15}>
            <div className="bg-white/60 border border-gold/20 rounded-[2px] p-8 sm:p-10">
              <BeforeAfterDiagram />
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Rural markets */}
      <Section>
        <SectionHeader label="Markets" title={'Rural Land Markets\n_Across the Islands_'} className="mb-12" />
        <EditorialTable
          caption="Typical rural land by island"
          columns={['Island', 'Typical rural land']}
          rows={ruralMarkets}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Rural land values vary sharply between and within islands, driven by rainfall, water, access and the buyer pool.
              We analyze each parcel against sales from its own region.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Selected assignments */}
      <Section tone="cream">
        <SectionHeader label="Experience" title={'Selected Agricultural\n_Assignments_'} className="mb-10" />
        <PhotoRow
          photos={[
            { src: '/images/gallery/agriculture/dji_0306.webp', alt: 'Aerial view of an orchard farm with farm buildings' },
            { src: '/images/gallery/agriculture/dji_0750-large.webp', alt: 'Aerial view of crop fields running down to the coast' },
            { src: '/images/gallery/agriculture/dji_0771.webp', alt: 'Aerial view of agricultural ponds near the shoreline' },
          ]}
        />
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="Thank you for your research diligence and being a great partner in resolving yet another challenging assignment."
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
          'estate-trust-appraisal',
          'eminent-domain-condemnation',
          'feasibility-highest-and-best-use',
          'commercial-real-estate-appraisal',
        ]}
        plainTitles
      />
      <ServiceInquiry
        service={FORM_KEY}
        heading={'Ready for Credible,\n_Timely Results?_'}
        text="Send the tax map key, acreage and purpose, and we'll confirm scope, fee and delivery date."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

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
  TextLink,
  EditorialTable,
  NumberedItems,
  Checklist,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getService } from '@/lib/services'

const SLUG = 'ground-lease-valuation'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Ground Lease & Leased Fee Valuation in Hawaii | Benavente'
const META_DESCRIPTION =
  'Leased fee and leasehold valuation for Honolulu and Hawaiʻi ground leases: purchases, sales, lease-to-fee conversions and lender underwriting.'
const HERO_IMAGE = '/images/gallery/hotel-hospitality/dji_0445-large.webp'

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

const guide = (slug: string) => `/blog/${slug}`

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Ground Lease Valuation', href: URL_PATH },
]

const interests = [
  ['Fee simple', 'Land and buildings, unencumbered', 'Market rent, market cap rates, highest and best use'],
  [
    'Leased fee',
    'Ground rent for the remaining term, plus the reversion at lease end',
    'Contract ground rent, reopening dates, remaining term, value of the reversion',
  ],
  [
    'Leasehold',
    'Use of the land and ownership of improvements for the term',
    'Remaining term, rent advantage or disadvantage, surrender terms',
  ],
]

const documents = [
  'The full ground lease and every amendment',
  'Rent schedule, reopening dates and the reopening method',
  'Permitted and prohibited uses',
  'Surrender, reversion and improvement ownership clauses',
  'Assignment and subletting provisions',
  'Any recorded covenants, easements or use restrictions',
]

const islands = [
  [
    'Honolulu and Oʻahu',
    'Leasehold commercial buildings downtown and in Kakaʻako, Waikīkī hotels and condominiums on leased land, industrial ground leases around Māpunapuna, the airport and Sand Island, and leasehold homes in Windward and East Oʻahu neighborhoods',
  ],
  ['Maui', 'Resort and commercial ground leases in Kāʻanapali, Wailea and Kahului'],
  ['Hawaiʻi Island', 'Commercial and resort ground leases in Kailua-Kona, Waikoloa and Hilo, including State-leased land'],
  ['Kauaʻi', 'Commercial and resort ground leases around Līhuʻe and Poʻipū'],
  [
    'Guam, Saipan and the Marshall Islands',
    'Long-term leases of private and government land, which are the norm in Saipan and the Marshall Islands, where land ownership is restricted',
  ],
]

const clientGroups = [
  { title: 'Landowners and trusts', desc: 'Leased fee values for sales, reporting and portfolio planning.' },
  { title: 'Lessees and building owners', desc: 'Leasehold values for purchases, sales and refinancing.' },
  { title: 'Buyers of either interest', desc: 'Acquisition values before an offer.' },
  { title: 'Lenders', desc: 'Collateral values that reflect the remaining term and ground rent.' },
  { title: 'Associations of apartment owners', desc: 'Leased fee values ahead of a conversion.' },
]

const faqs: FaqItem[] = [
  {
    q: 'What is the difference between leasehold and fee simple?',
    text: 'Fee simple is full ownership of land and buildings. Leasehold is the right to use land and its improvements for a set term under a ground lease, while someone else owns the land.',
    a: (
      <>
        Fee simple is full ownership of land and buildings. Leasehold is the right to use land and its improvements for a
        set term under a ground lease, while someone else owns the land. Our guide to{' '}
        <TextLink href={guide('free-simple-vs-leasehold')}>fee simple vs leasehold</TextLink> explains more.
      </>
    ),
  },
  {
    q: 'Why is a leasehold worth less as the lease gets shorter?',
    text: 'The lessee has fewer years of use left, and when the lease ends the land, and often the building, returns to the landowner. Buyers and lenders also become cautious about short remaining terms, which narrows the market.',
    a: (
      <>
        The lessee has fewer years of use left, and when the lease ends the land, and often the building, returns to the
        landowner. Buyers and lenders also become cautious about short remaining terms, which narrows the market.
      </>
    ),
  },
  {
    q: 'Is a leased fee interest worth the same as the land?',
    text: "Rarely. A leased fee is worth the present value of the ground rent plus the reversion. If the ground rent is below market, or the reversion is decades away, the leased fee can be worth well below the land's fee simple value.",
    a: (
      <>
        Rarely. A leased fee is worth the present value of the ground rent plus the reversion. If the ground rent is below
        market, or the reversion is decades away, the leased fee can be worth well below the land&apos;s fee simple value.
      </>
    ),
  },
  {
    q: 'Do lenders accept leasehold appraisals?',
    text: 'Yes. Lenders need the leasehold value, and they look closely at the remaining term against the loan term. We report both clearly.',
    a: (
      <>
        Yes. Lenders need the leasehold value, and they look closely at the remaining term against the loan term. We report
        both clearly.
      </>
    ),
  },
  {
    q: 'How is a lease-to-fee price set?',
    text: 'Usually by negotiation, informed by an appraisal of the leased fee interest. Both sides often commission their own appraisal.',
    a: (
      <>
        Usually by negotiation, informed by an appraisal of the leased fee interest. Both sides often commission their own
        appraisal.
      </>
    ),
  },
  {
    q: 'Do you value leasehold condominiums in Waikīkī and Honolulu?',
    text: 'Yes. We value leasehold and leased fee interests in Honolulu condominiums, including allocations across units for a conversion.',
    a: (
      <>
        Yes. We value leasehold and leased fee interests in Honolulu condominiums, including allocations across units for a
        conversion.
      </>
    ),
  },
  {
    q: 'Do you value ground leases outside Oʻahu?',
    text: 'Yes. We value ground lease interests on Maui, Hawaiʻi Island and Kauaʻi, and in Guam, Saipan and the Marshall Islands.',
    a: (
      <>
        Yes. We value ground lease interests on Maui, Hawaiʻi Island and Kauaʻi, and in Guam, Saipan and the Marshall
        Islands.
      </>
    ),
  },
]

// Leased fee + leasehold merge into fee simple; the gap is the value a conversion creates.
function ConversionDiagram() {
  const parts = [
    { label: 'Leased fee', note: "The landowner's interest" },
    { label: 'Leasehold', note: "The lessee's interest" },
  ]
  return (
    <figure aria-label="In a lease-to-fee conversion the leased fee and leasehold merge into fee simple">
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
          <p className="text-gold-light text-[11px] tracking-[0.25em] uppercase font-serif font-medium">Merged</p>
          <p className="font-serif text-[26px] text-white leading-[1.2] mt-2">Fee simple</p>
        </div>
      </RevealOnScroll>
      <figcaption className="text-slate text-[13px] font-light mt-6">
        The difference between the leased fee value and the merged fee simple value is the value the conversion creates.
      </figcaption>
    </figure>
  )
}

export default function GroundLeaseValuationPage() {
  const service = getService(SLUG)!

  return (
    <>
      <JsonLd data={breadcrumbSchema([...crumbs.slice(0, 2), { label: 'Ground Lease & Leased Fee Valuation', href: URL_PATH }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Ground Lease & Leased Fee Valuation',
          serviceType: 'Leased fee, leasehold and ground lease appraisal',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Ground Lease & Leased Fee Valuation"
        heading={'Ground Lease, Leased Fee and\nLeasehold Valuation in _Hawaiʻi_'}
        subhead="A leased fee valuation measures what a landowner's interest in ground-leased land is worth: the right to collect ground rent for the rest of the lease, plus the land and any improvements when the lease ends. A leasehold valuation measures the tenant's side. In Honolulu and across Hawaiʻi, where much commercial land is ground leased, both values often differ sharply from fee simple."
        image={HERO_IMAGE}
        imageAlt="Drone view of a Waikīkī high-rise among hotel and condominium towers"
        breadcrumb={crumbs}
        number="09"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Discuss a Ground Lease"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/cbd/dji_0348.webp"
                  alt="Downtown Honolulu office towers beyond Aliʻiōlani Hale and the King Kamehameha statue"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI & SRA Designated" title={'We Read _the Lease_\nFirst'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group values leased fee, leasehold and fee simple interests from our Honolulu office for
              landowners, trusts, lessees, buyers and lenders across Oʻahu, Maui, Hawaiʻi Island, Kauaʻi and the Pacific.
              Our MAI and SRA designated appraisers read the lease first, because in a ground lease the document decides
              the value as much as the land does.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Why Hawaii */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader tone="navy" label="Land Tenure" title={'Why Hawaiʻi Has So Much\n_Leasehold Land_'} />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                For generations, large tracts of land in Hawaiʻi have been held by a small number of landowners, including
                trusts and estates that lease land rather than sell it. Commercial districts, industrial areas, resorts,
                condominiums and homes have all been built on ground-leased land. The result is a market where buyers
                routinely pay for a building they own on land they rent, and where landowners hold income streams that
                last decades.
              </p>
              <p>
                That structure makes Hawaiʻi different from almost every mainland market. A mainland appraiser can value a
                building assuming fee simple ownership. In Hawaiʻi, assuming fee simple when the property is leasehold can
                overstate value badly, and assuming the wrong lease terms can misstate it in either direction.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Interests */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Property Interests" title={'Valuing the Leased Fee\nand the _Leasehold_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>One property can hold several interests, each with its own value.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Fee simple, leased fee and leasehold interests: what each owner holds and what drives its value"
          columns={['Interest', 'What the owner holds', 'What drives its value']}
          rows={interests}
        />
        <div className="mt-16">
          <NumberedItems
            items={[
              {
                title: 'The leased fee',
                body: (
                  <p>
                    We value the landowner&apos;s interest by projecting the contract ground rent through each fixed period
                    and reopening, then adding the present value of the reversion: the land, and often the improvements,
                    returning to the owner when the lease ends. The discount rate reflects the security of the rent and the
                    length of the wait.
                  </p>
                ),
              },
              {
                title: 'The leasehold',
                body: (
                  <p>
                    We value the lessee&apos;s interest by measuring the income the property earns after ground rent, over
                    the remaining term. As the term shortens, leasehold value falls, often steeply in the final years,
                    because buyers and lenders shy away from short remaining terms.
                  </p>
                ),
              },
              {
                title: 'Contract rent vs market rent',
                body: (
                  <p>
                    When a ground rent sits below market, value shifts toward the lessee. When it sits above the market,
                    value shifts toward the landowner. Measuring that gap is central to both sides.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      {/* Documents */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
          <RevealOnScroll>
            <SectionLabel>Before We Begin</SectionLabel>
            <h3 className="font-serif text-[clamp(30px,3.6vw,44px)] text-navy leading-[1.15]">
              What We Need <span className="italic text-gold">to See</span>
            </h3>
          </RevealOnScroll>
          <Checklist items={documents} />
        </div>
      </Section>

      {/* Reopenings */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader tone="navy" label="Rent Reopenings" title={'Ground Lease\n_Rent Reopenings_'} />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                Many Hawaiʻi ground leases reset rent at fixed dates, often based on the land&apos;s fair market value and
                a rate of return. A reopening changes both the leased fee and the leasehold value, so it belongs in any
                valuation done within a few years of the date.
              </p>
              <p>
                Under HRS §519-1, when a lease of private land ties renegotiated rent to the land&apos;s fair market value
                or highest and best use, that value is calculated on the use the lease restricts the land to. We build that
                rule into every leased fee and leasehold value we prepare near a reopening.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Conversions */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-center">
          <div>
            <SectionHeader label="Lease-to-Fee" title={'Lease-to-Fee\n_Conversions_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  A lease-to-fee conversion happens when the lessee buys the land underneath, merging the two interests
                  into fee simple. The price is usually negotiated around the value of the leased fee interest.
                </p>
                <p>
                  Hawaiʻi has used several conversion frameworks over the years. Chapter 516 of the Hawaiʻi Revised
                  Statutes created a process for single-family residential leaseholds. For condominiums and cooperatives,
                  Chapter 514C gives associations a right of first refusal when the leased fee is sold. Today most
                  commercial and many residential conversions are negotiated sales between owner and lessees.
                </p>
                <p>
                  In each case, both sides need an independent answer to the same question: what is the leased fee worth
                  to the landowner, and what is the merged fee simple worth? The difference between the two is the value
                  the conversion creates. For a condominium, the appraisal may also need to allocate the leased fee price
                  across individual units.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15}>
            <div className="bg-cream border border-gold/20 rounded-[2px] p-8 sm:p-10">
              <ConversionDiagram />
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Use restrictions */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
          <div>
            <SectionHeader label="Use Restrictions" title={'Use Restrictions That\n_Change Value_'} />
            <RevealOnScroll delay={0.1}>
              <p className="font-serif italic text-[clamp(22px,2.4vw,28px)] text-gold-dark leading-[1.45] mt-8 max-w-[480px]">
                A missed restriction is one of the most expensive errors in leasehold valuation.
              </p>
              <GoldRule className="w-24 mt-8 opacity-70" delay={0.3} />
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15}>
            <Prose>
              <p>
                Ground leases often limit what a property can be used for: a specific business, a building type, a maximum
                density, or a use that made sense decades ago. Those restrictions bind the value. A parcel that could
                support a high-rise under zoning may be worth far less if the lease limits it to a low-rise retail center
                for another thirty years.
              </p>
              <p>
                We read the lease, the recorded documents and the county records before concluding a value, because a
                missed restriction is one of the most expensive errors in leasehold valuation.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Islands */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Markets" title={'Ground Lease Valuation\n_Across the Islands_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>Ground leases appear in every Hawaiʻi market, and each island has its own pattern.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Ground lease markets across Hawaiʻi and the Pacific"
          columns={['Market', 'Typical ground leases']}
          rows={islands}
        />
      </Section>

      {/* Who */}
      <Section tone="cream">
        <SectionHeader
          label="Who We Work With"
          title={'Both Sides of\nthe _Ground Lease_'}
          className="max-w-[760px]"
        />
        <div className="mt-12">
          <EditorialTable
            caption="Who we work with and how we help"
            columns={['Client', 'How we help']}
            rows={clientGroups.map((c) => [c.title, c.desc])}
            numbered
          />
        </div>
      </Section>

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
        text="Send us the ground lease and tell us which interest you need valued. We'll confirm the scope, fee and delivery date."
        image="/images/gallery/cbd/dji_0348.webp"
      />
      <StickyInquiryButton />
    </>
  )
}

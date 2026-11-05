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
  ProcessSteps,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getAnyService } from '@/lib/services'

const SLUG = 'ground-rent-arbitration'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Ground Rent Arbitration & Rent Reset Appraisal in Hawaii'
const META_DESCRIPTION =
  'Party appraiser support for Honolulu and Hawaiʻi ground lease rent reopenings and arbitrations, with land value and rate of return that hold up.'
const HERO_IMAGE = '/images/gallery/cbd/dji_0340.webp'

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
  { label: 'Ground Rent Arbitration', href: URL_PATH },
]

const clauseTerms = [
  ['What is valued', "Often the land as if vacant, sometimes subject to the lease's use restrictions"],
  ['How rent is set', 'Commonly land value multiplied by a rate of return, or fair market rent directly'],
  ['The process', 'A negotiation window, then appraisal or arbitration if no agreement is reached'],
  ['The panel', 'Usually each side appoints an appraiser and the two choose a third, neutral appraiser'],
  ['Deadlines', 'For appointments, reports and the award'],
]

const roles = [
  [
    'Party appraiser',
    'Lessor or lessee',
    "Prepare and present a supportable land value and rent conclusion for the appointing party, and test the other side's",
  ],
  ['Neutral (third) appraiser', "The two party appraisers, or the lease's procedure", 'Weigh both positions and help decide the rent'],
]

const islands = [
  [
    'Honolulu and Oʻahu',
    'Commercial ground leases downtown and in Kakaʻako, hotel and retail land in Waikīkī, industrial ground leases around Māpunapuna, the airport and Sand Island, and leasehold land in Kapolei',
  ],
  ['Maui', 'Resort and commercial ground leases in Kāʻanapali, Wailea and Kahului'],
  ['Hawaiʻi Island', 'Resort and commercial land in Kailua-Kona, Waikoloa and the Kohala Coast, and State-leased land in Hilo'],
  ['Kauaʻi', 'Commercial and resort ground leases around Līhuʻe and Poʻipū'],
  ['State and county land', <>Agricultural, industrial and commercial <TextLink href="/clients/government-agencies">leases on public land</TextLink>, which reopen on their own schedules</>],
  ['Guam, Saipan and the Marshall Islands', 'Long-term leases of private and government land'],
]

const faqs: FaqItem[] = [
  {
    q: 'How is ground rent set at a reopening in Hawaiʻi?',
    text: "Usually by the method in the lease, most often the land's fair market value multiplied by a rate of return. If the parties can't agree, the lease generally provides for appraisal or arbitration by a panel.",
    a: (
      <>
        Usually by the method in the lease, most often <TextLink href="/services/commercial-real-estate-appraisal">the land&apos;s fair market value</TextLink> multiplied by a rate of return.
        If the parties can&apos;t agree, the lease generally provides for appraisal or arbitration by a panel.
      </>
    ),
  },
  {
    q: 'Is the land valued at its highest and best use?',
    text: "Under HRS §519-1, when renegotiated rent depends on the land's value, that value is calculated on the use the lease restricts the land to. The lease language also matters, so read it closely before the reopening.",
    a: (
      <>
        Under HRS §519-1, when renegotiated rent depends on the land&apos;s value, that value is calculated on the use the
        lease restricts the land to. The lease language also matters, so read it closely before the reopening.
      </>
    ),
  },
  {
    q: 'What does a party appraiser do?',
    text: "Prepares an independent appraisal of land value and rent for the side that appointed them, presents it to the panel, and reviews the other side's appraisal.",
    a: (
      <>
        Prepares an independent appraisal of land value and rent for the side that appointed them, presents it to the
        panel, and reviews the other side&apos;s appraisal.
      </>
    ),
  },
  {
    q: 'When should we start preparing?',
    text: 'Ideally a year or more before the reopening date. That leaves time to read the lease, understand the likely range and negotiate before deadlines apply.',
    a: (
      <>
        Ideally a year or more before the reopening date. That leaves time to read the lease, understand the likely range
        and negotiate before deadlines apply.
      </>
    ),
  },
  {
    q: 'Can a reopening be settled without arbitration?',
    text: 'Yes. Many settle once both sides see supported values. A consulting appraisal can help set a negotiating position first.',
    a: (
      <>
        Yes. Many settle once both sides see supported values. A consulting appraisal can help set a negotiating position
        first.
      </>
    ),
  },
  {
    q: 'Do you handle reopenings on Maui, Kauaʻi and the Big Island?',
    text: 'Yes. We support rent reopenings across all four Hawaiʻi counties, as well as in Guam, Saipan and the Marshall Islands.',
    a: (
      <>
        Yes. We support rent reopenings across all four Hawaiʻi counties, as well as in Guam, Saipan and the Marshall
        Islands.
      </>
    ),
  },
  {
    q: 'Do you work for lessors or lessees?',
    text: 'Both, on separate matters after a conflict check.',
    a: 'Both, on separate matters after a conflict check.',
  },
]

export default function GroundRentArbitrationPage() {
  const service = getAnyService(SLUG)!

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([...crumbs.slice(0, 2), { label: 'Ground Rent Arbitration & Rent Reset', href: URL_PATH }])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Ground Rent Arbitration & Rent Reset Appraisal',
          serviceType: 'Ground lease rent reopening and arbitration appraisal',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Ground Rent Arbitration & Rent Reset"
        heading={'Ground Rent Arbitration and Rent Reset Appraisals in _Hawaiʻi_'}
        subhead="A ground rent reopening resets the rent under a long-term ground lease, usually by multiplying the land's fair market value by a rate of return. If lessor and lessee can't agree, many Hawaiʻi leases send the dispute to a panel of appraisers. The party appraiser's job is to support a defensible land value and rate, and to hold that position in front of the panel."
        image={HERO_IMAGE}
        imageAlt="Downtown Honolulu office towers rising behind the trees and grounds of ʻIolani Palace"
        breadcrumb={crumbs}
        number="11"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Discuss a Reopening"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/vacant-land/dji_0635-large.webp"
                  alt="Aerial view of a cleared site with heavy equipment, surrounded by buildings near the coast"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI Designated" title={'We Start With\n_the Lease Language_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group supports lessors and lessees through ground lease rent reopenings, renegotiations and
              arbitrations from our Honolulu office, across Oʻahu, Maui, Hawaiʻi Island, Kauaʻi and the Pacific. Our
              MAI-designated appraisers start with the lease language, because in a rent reset the definition of value
              written decades ago usually decides more than the market does.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* How arbitrations work */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="The Reopening Clause" title={'How Hawaiʻi Rent\n_Arbitrations Work_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>
                Many Hawaiʻi <TextLink href="/services/ground-lease-valuation">ground leases</TextLink> fix rent for set periods, then reopen it at dates written into the lease. The
                reopening clause typically defines:
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="What a Hawaiʻi ground lease reopening clause typically defines"
          columns={['The clause defines', 'Typically']}
          rows={clauseTerms}
        />
        <RevealOnScroll>
          <div className="relative bg-white border border-gold/25 rounded-[2px] p-8 sm:p-10 mt-12">
            <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
            <p className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium">HRS §519-1</p>
            <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-3 max-w-[900px]">
              A Hawaiʻi statute shapes many of these valuations. Under HRS §519-1, when a lease of private land bases
              renegotiated rent on the land&apos;s fair market value or highest and best use, that value is calculated on{' '}
              <strong className="font-medium text-navy">the use to which the lease restricts the land</strong>, not on its
              best possible use under zoning. Residential leases fall under further rules in HRS §519-2.
            </p>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Party vs neutral */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="The Panel" title={'Party Appraiser vs\n_Neutral Appraiser_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>The two roles carry different duties.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Party and neutral appraisers: who appoints each and what each does"
          columns={['Role', 'Appointed by', 'Job']}
          rows={roles}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Even as a party appraiser, the opinion must be independent and USPAP-compliant. An appraisal that stretches
              toward one side tends to lose credibility with the neutral, and with it <TextLink href="/services/litigation-support-expert-testimony">the arbitration</TextLink>. We prepare
              positions we can defend line by line.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Land value and rate */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-14">
          <SectionHeader tone="navy" label="The Contested Numbers" title={'Land Value and\n_Rate of Return_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose tone="navy">
              <p>Most reopening disputes turn on two numbers.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <NumberedItems
          tone="navy"
          items={[
            {
              title: 'Land value',
              body: (
                <p>
                  We value the land as the lease defines it: as vacant or as restricted, at the reopening date, with the
                  {' '}<TextLink tone="navy" href="/services/feasibility-highest-and-best-use">highest and best use</TextLink> limited as the lease and HRS §519-1 require. In Hawaiʻi&apos;s thin land markets,
                  that means careful selection and verification of land sales, and clear adjustments for size, zoning,
                  location and use.
                </p>
              ),
            },
            {
              title: 'Rate of return',
              body: (
                <p>
                  The rate converts land value into annual rent. We support it from market evidence: rates in other
                  ground lease reopenings and new ground leases where available, investor return expectations for land,
                  and the risk profile of the specific lease. The rate is often the most contested number in the room, so
                  it needs the most support.
                </p>
              ),
            },
            {
              title: 'Fair market rent directly',
              body: (
                <p>
                  Some leases set rent by comparison with rents on similar land. Then we analyze comparable ground rents,
                  adjusting for term, use and lease conditions.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* Preparing */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-14">
          <SectionHeader label="Early Work" title={'Preparing Before the\n_Reopening Date_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>The best-prepared side usually starts a year or more before the reopening date. Early work lets you:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <ProcessSteps
          steps={[
            { title: 'Read the lease closely', body: 'Confirm the valuation definition, assumptions and deadlines.' },
            { title: 'Understand the range', body: 'A preliminary value shows where a fair rent is likely to land.' },
            { title: 'Negotiate from evidence', body: 'Many reopenings settle once both sides see supported numbers.' },
            { title: 'Avoid surprises', body: 'Use restrictions, easements and title issues found early, not at the hearing.' },
          ]}
        />
        <RevealOnScroll delay={0.1}>
          <div className="mt-16 max-w-[860px]">
            <p className="font-serif italic text-[clamp(22px,2.4vw,28px)] text-gold-dark leading-[1.45]">
              Use restrictions are the most common surprise.
            </p>
            <GoldRule className="w-24 mt-6 opacity-70" delay={0.3} />
            <Prose className="mt-6">
              <p>A restriction that limits the land&apos;s use also limits its value, and with it the rent.</p>
            </Prose>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Mediation */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader tone="navy" label="Resolving It Early" title={'Mediation and\n_Settlement_'} />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                Not every reopening needs a full arbitration. A well-supported appraisal often brings both parties to
                agreement in negotiation or mediation, at a fraction of the cost of a contested hearing. We can prepare a
                {' '}<TextLink tone="navy" href="/services/real-estate-consulting">consulting value</TextLink> for negotiation first, then a full report if the matter goes to the panel.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Islands */}
      <Section>
        <SectionHeader label="Markets" title={'Rent Reopenings\n_Across the Islands_'} className="mb-12" />
        <EditorialTable
          caption="Ground rent reopening markets across Hawaiʻi and the Pacific"
          columns={['Market', 'Typical leases']}
          rows={islands}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Land values and rates of return differ by island and submarket, so we support each reopening with evidence
              from its own market.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="As part of this assignment, TBG was able to uncover material use restrictions associated with this property that were appropriately treated in the valuation. As a result, our company was able to appropriately respond to the ground lessor's ground lease renegotiation offer."
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
        text="Send us the lease and the reopening date, and we'll confirm availability after a conflict check."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

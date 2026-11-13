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
  NumberedItems,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'

const FORM_KEY = 'hotel-hospitality'
const URL_PATH = '/property-types/hotel-hospitality'
const META_TITLE = 'Hotel & Resort Appraisal in Hawaii | Benavente Group'
const META_DESCRIPTION =
  'Hotel and resort valuations in Waikīkī, Maui, the Kohala Coast and the Pacific that separate real estate from FF&E and business value.'
const HERO_IMAGE = '/images/gallery/hotel-hospitality/dji_0861-large.webp'

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
  { label: 'Hotel & Hospitality', href: URL_PATH },
]

const hotelTypes = [
  ['Full-service and resort hotels', 'Multiple revenue streams: rooms, food and beverage, spa, parking, resort fees'],
  ['Select-service hotels', 'Room revenue dominates; leaner operations'],
  ['Condo-hotels', 'Units individually owned, pooled in a rental program; value depends on the program terms'],
  ['Ground-leased resort hotels', 'Building and operations on leased land; remaining term and ground rent drive value'],
  ['Pacific island hotels', 'Guam and Saipan markets driven by Asian visitor arrivals and airlift'],
]

const marketAnalysis = [
  ['Occupancy, ADR and RevPAR', "The property's history against its competitive set"],
  ['Visitor arrivals and spending', 'By island and source market, including international visitors'],
  ['Airlift and seasonality', 'Flight capacity and the shape of the year'],
  ['New supply', 'Hotels and vacation rentals entering the market'],
  ['Operating expenses', 'Labor, energy and costs that run higher in the islands'],
  ['Taxes and fees', "Including Hawaiʻi's transient accommodations tax and resort fees, which affect net revenue and guest pricing"],
]

const resortMarkets = [
  ['Waikīkī', "The state's largest hotel concentration; high-rise hotels, condo-hotels and ground-leased sites"],
  ['Ko Olina and West Oʻahu', 'Master-planned resort with luxury and timeshare-style product'],
  ['North Shore Oʻahu', 'Limited resort supply and strong rate premiums'],
  ['West Maui: Kāʻanapali and Kapalua', 'Established resort districts, condo-hotel product and ground-leased land'],
  ['South Maui: Wailea and Makena', 'Luxury resort market with high ADRs'],
  ['Kohala Coast and Kailua-Kona', 'Large luxury resorts and select-service hotels on Hawaiʻi Island'],
  ['Kauaʻi: Poʻipū, Princeville and Līhuʻe', 'Smaller resort markets sensitive to new supply'],
  ['Guam: Tumon Bay', 'Hotel district driven by visitors from Japan, Korea and Taiwan'],
  ['Saipan: Garapan', 'Resort market dependent on regional airlift'],
]

const faqs: FaqItem[] = [
  {
    q: 'How is a hotel appraised differently from an office building?',
    text: 'A hotel earns nightly income from guests rather than rent from long-term tenants, so the appraisal forecasts occupancy, room rates and operating costs. It also separates real estate value from FF&E and business value.',
    a: (
      <>
        A hotel earns nightly income from guests rather than rent from long-term tenants, so the appraisal forecasts
        occupancy, room rates and operating costs. It also separates real estate value from FF&amp;E and business value.
      </>
    ),
  },
  {
    q: 'What is RevPAR?',
    text: "Revenue per available room: room revenue divided by available rooms. It combines occupancy and average daily rate into one measure of a hotel's performance against its competitors.",
    a: (
      <>
        Revenue per available room: room revenue divided by available rooms. It combines occupancy and average daily rate
        into one measure of a hotel&apos;s performance against its competitors.
      </>
    ),
  },
  {
    q: 'Do you appraise condo-hotels in Waikīkī and Maui?',
    text: 'Yes. Condo-hotel valuation depends on the rental program terms and unit ownership structure, which we analyze for each assignment.',
    a: (
      <>
        Yes. Condo-hotel valuation depends on the rental program terms and unit ownership structure, which we analyze for
        each assignment.
      </>
    ),
  },
  {
    q: "Can a hotel's property tax assessment include business value?",
    text: "It shouldn't. A real property assessment should reflect real property. Separating business value is a common issue in hotel tax appeals.",
    a: (
      <>
        It shouldn&apos;t. A real property assessment should reflect real property. Separating business value is a common
        issue in hotel tax appeals.
      </>
    ),
  },
  {
    q: 'Do you appraise resorts on the Kohala Coast and Kauaʻi?',
    text: 'Yes. We appraise hotels and resorts across all four Hawaiʻi counties.',
    a: <>Yes. We appraise hotels and resorts across all four Hawaiʻi counties.</>,
  },
  {
    q: 'Do you appraise hotels in Guam and Saipan?',
    text: 'Yes. We appraise hospitality assets in Guam, Saipan and the Marshall Islands, as well as across Hawaiʻi.',
    a: <>Yes. We appraise hospitality assets in Guam, Saipan and the Marshall Islands, as well as across Hawaiʻi.</>,
  },
]

export default function HotelHospitalityPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Hotel and Resort Appraisal',
          serviceType: 'Hotel, resort and hospitality property appraisal',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Hotel & Hospitality"
        heading={'Hotel and Resort\nAppraisal in _Hawaiʻi_'}
        subhead="A hotel appraisal values a property whose income comes from nightly room rates, not long-term leases. That makes it part real estate, part operating business. A credible Hawaiʻi hotel appraisal forecasts occupancy and room rates against the visitor market, then separates the value of the real estate from furniture and equipment (FF&E) and from business value tied to the brand and management."
        image={HERO_IMAGE}
        imageAlt="High-rise hotels at a palm-lined street corner, with green ridges beyond"
        breadcrumb={crumbs}
        formService={FORM_KEY}
        primaryHref="#inquiry"
        primaryLabel="Discuss a Hotel Assignment"
        secondaryCta={{ label: 'View Hospitality Projects', href: '/gallery?cat=hotel-hospitality' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/hotel-hospitality/kbh-aerial-mauka-view.webp"
                  alt="Aerial view of a beachfront resort hotel around a pool and gardens, with a golf course and mountains behind"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI Designated" title={'From Waikīkī to\n_the Kohala Coast_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group appraises hotels and resorts from Waikīkī to the Kohala Coast, and across Guam and the
              Pacific, for lenders, owners, investors, attorneys and government agencies. Hospitality is one of the core
              categories in our portfolio. Our MAI-designated appraisers understand how island visitor markets, ground leases
              and management agreements shape what a hotel is worth.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Hotel types */}
      <Section tone="cream">
        <SectionHeader label="Property Types" title={'Hotels, Resorts\nand _Condo-Hotels_'} className="mb-12" />
        <EditorialTable
          caption="Hotel property types and what makes each different"
          columns={['Property type', 'What makes it different']}
          rows={hotelTypes}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Assignments include financing, acquisition and sale, property tax appeals, litigation and ground lease matters.
              Each needs a different emphasis, so we confirm the intended use before scoping the work.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Allocation */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-14">
          <SectionHeader label="Allocation" title={'Separating Real Estate,\n_FF&E and Business Value_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>A hotel&apos;s total value includes more than land and buildings. It typically breaks into:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <NumberedItems
          items={[
            { title: 'Real property', body: <p>The land and improvements.</p> },
            { title: 'FF&E', body: <p>Furniture, fixtures and equipment, from beds to kitchen equipment.</p> },
            {
              title: 'Business value',
              body: (
                <p>
                  Sometimes called business enterprise value: the part of value from the brand, management, reservation
                  systems and the operation itself.
                </p>
              ),
            },
          ]}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-14 max-w-[860px]">
            <p>
              The split matters. A lender may lend on real property only. A property tax assessment should reflect real
              property, not business value. A purchase price allocation needs each component identified. We explain the
              method we use to separate them and why, because the allocation is often where a hotel valuation is challenged.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* RevPAR */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader tone="navy" label="Market Analysis" title={'RevPAR and\n_Visitor-Market Analysis_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose tone="navy">
              <p>Hotel value follows hotel income, and hotel income follows the visitor market. Our analysis covers:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          tone="navy"
          caption="What our hotel market analysis covers"
          columns={['Factor', 'What we look at']}
          rows={marketAnalysis}
        />
        <RevealOnScroll delay={0.1}>
          <Prose tone="navy" className="mt-12 max-w-[860px]">
            <p>
              We then build a forecast of revenue and expenses to a stabilized year, apply a capitalization rate or discount
              rate supported by hotel transactions and investor surveys, and reconcile with sales of comparable hotels where
              they exist. In island markets, comparable hotel sales are few, so the income analysis usually carries the most
              weight.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Ground lease */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Land Tenure" title={'Ground-Leased\n_Resort Land_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                Many Hawaiʻi resort hotels sit on ground-leased land. The hotel owner&apos;s interest is then a leasehold,
                worth less than the same hotel in fee simple, and the gap widens as the lease shortens. Ground rent reopenings
                can also change the hotel&apos;s income sharply. We value the leasehold, the leased fee or both, and model
                ground rent through each reopening.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Markets */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Markets" title={'Hawaiʻi and Pacific\n_Resort Markets_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>Each resort area is its own market, with its own competitive set, visitor mix and rate structure.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Hawaiʻi and Pacific resort markets and their character"
          columns={['Market', 'Character']}
          rows={resortMarkets}
        />
      </Section>

      {/* Selected assignments */}
      <Section>
        <SectionHeader label="Experience" title={'Selected Hospitality\n_Assignments_'} className="mb-10" />
        <PhotoRow
          photos={[
            { src: '/images/gallery/hotel-hospitality/dji_0061.webp', alt: 'Aerial view of an oceanfront resort hotel on a lava-rock shoreline' },
            { src: '/images/gallery/hotel-hospitality/dji_0875-large.webp', alt: 'Aerial view of high-rise hotel towers near the beach' },
            { src: '/images/gallery/hotel-hospitality/dji_0436.webp', alt: 'Aerial view of a beachfront resort beside a swimming lagoon' },
          ]}
        />
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="I again extend my appreciation for the excellent client service that I have experienced with our TBG relationship as well as for the preeminent market knowledge and appraisal expertise that you bring to every assignment!"
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
        text="Send the operating history and the purpose of the appraisal, and we'll confirm scope, fee and delivery date."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

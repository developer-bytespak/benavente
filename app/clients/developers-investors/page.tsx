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
  ImageRows,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'

const FORM_KEY = 'developers-investors'
const URL_PATH = '/clients/developers-investors'
const META_TITLE = 'Appraisal & Advisory for Hawaii Developers & Investors'
const META_DESCRIPTION =
  'Acquisition appraisals, highest and best use, market evidence and construction values for Hawaiʻi developers and investors, before capital is committed.'
const HERO_IMAGE = '/images/gallery/residential-developments/dji_0069.webp'

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
  { label: 'For Developers & Investors', href: URL_PATH },
]

const beforeBuying = [
  ['Appraise the acquisition', 'A supported market value for the property as it is today'],
  ['Test highest and best use', 'Whether the current use, a renovation, a conversion or redevelopment produces the most value'],
  ['Find the residual land value', 'What a site is worth to a buyer intending to build'],
  ['Flag value risks', 'Ground lease terms, use restrictions, easements, zoning limits and entitlement timing'],
]

const beforeBuilding = [
  ['Market demand', 'Who will rent or buy, at what price, and how fast'],
  ['Revenue and cost', 'Achievable rents or prices against a Hawaiʻi construction budget'],
  ['Returns', 'Developer profit and IRR against the risk of the project'],
  ['Scenarios', 'Alternative product types, densities and phasing side by side'],
]

const beforeSelling = [
  ['Set the asking price', 'Supported by current sales, rents and cap rates'],
  ['Test buyer offers', 'Whether a bid reflects market value'],
  ['Plan a 1031 exchange', 'A value for planning the sale and reinvestment, with your tax advisor'],
  ['Report to investors', 'Values for fund partners at sale or recapitalization'],
]

const markets = [
  {
    title: 'Kakaʻako, Ala Moana and downtown Honolulu',
    image: '/images/regions/oahu-skyline.webp',
    imageAlt: 'Honolulu high-rises with Diamond Head',
    body: 'High-rise residential and mixed-use, conversions of older office buildings, and transit-oriented sites.',
  },
  {
    title: 'Kapolei, ʻEwa and West Oʻahu',
    image: '/images/gallery/residential-developments/img_7673.webp',
    imageAlt: 'Row of newly built two-story homes along a residential street',
    body: 'Master-planned residential, industrial and distribution land, and commercial sites serving a growing population.',
  },
  {
    title: 'Central Oʻahu',
    image: '/images/regions/oahu-valley.webp',
    imageAlt: 'Oʻahu valley landscape',
    body: 'Residential and commercial growth along the H-2 corridor.',
  },
  {
    title: 'Windward Oʻahu',
    image: '/images/regions/oahu-lanikai.webp',
    imageAlt: 'Lanikai coastline, Oʻahu',
    body: 'Infill and small commercial projects with tight land supply.',
  },
  {
    title: 'Maui',
    image: '/images/regions/maui.webp',
    imageAlt: 'Maui coastline',
    body: 'Residential and commercial projects in Kahului, Wailuku and Kīhei, resort-area development in Wailea and West Maui, and rebuilding in Lahaina.',
  },
  {
    title: 'Hawaiʻi Island',
    image: '/images/regions/big-island.webp',
    imageAlt: 'Hawaiʻi Island landscape',
    body: 'Residential, commercial and resort land in Kailua-Kona, Waikoloa and Hilo.',
  },
  {
    title: 'Kauaʻi',
    image: '/images/regions/kauai.webp',
    imageAlt: 'Kauaʻi coastline',
    body: 'Limited-supply residential and visitor projects around Līhuʻe, Kapaʻa and Poʻipū.',
  },
  {
    title: 'Guam and Saipan',
    image: '/images/regions/guam.webp',
    imageAlt: 'Guam coastline',
    body: 'Commercial, residential and hospitality development tied to military and visitor demand.',
  },
]

const projectLife = [
  ['Buy', 'Is the price right?', 'Land value and highest and best use carry forward'],
  ['Entitle', 'How long and how risky?', 'Entitlement timing is built into every later value'],
  ['Build', 'Does it pencil?', 'Market rents and costs stay consistent'],
  ['Borrow', 'What will the lender lend?', 'Prospective values match the earlier work'],
  ['Lease up', 'How fast?', 'Absorption evidence is already assembled'],
  ['Sell', 'What is it worth now?', 'Exit value is tested against the original plan'],
]

const faqs: FaqItem[] = [
  {
    q: 'When should a developer bring in an appraiser?',
    text: 'Before committing to land or design. Early analysis of highest and best use, entitlement risk and market demand costs little compared with a wrong decision.',
    a: (
      <>
        Before committing to land or design. Early analysis of highest and best use, entitlement risk and market demand
        costs little compared with a wrong decision.
      </>
    ),
  },
  {
    q: "Can you value a site we don't own yet?",
    text: 'Yes. Acquisition appraisals and highest and best use analyses are often done while a site is under contract or before an offer.',
    a: (
      <>
        Yes. Acquisition appraisals and highest and best use analyses are often done while a site is under contract or
        before an offer.
      </>
    ),
  },
  {
    q: 'Do you work with out-of-state investors?',
    text: 'Yes. Many investors in Hawaiʻi and Pacific property are based on the mainland or overseas, and we work with them directly.',
    a: (
      <>
        Yes. Many investors in Hawaiʻi and Pacific property are based on the mainland or overseas, and we work with them
        directly.
      </>
    ),
  },
  {
    q: 'Will a lender accept your construction appraisal?',
    text: 'Federally regulated lenders must engage the appraiser themselves. Ask your lender to contact us so the report is addressed to them.',
    a: (
      <>
        Federally regulated lenders must engage the appraiser themselves. Ask your lender to contact us so the report is
        addressed to them.
      </>
    ),
  },
  {
    q: 'What is the residual land value?',
    text: 'The amount a developer can afford to pay for land after allowing for all development costs and a reasonable profit. It is often the clearest way to compare sites or uses.',
    a: (
      <>
        The amount a developer can afford to pay for land after allowing for all development costs and a reasonable profit.
        It is often the clearest way to compare sites or uses.
      </>
    ),
  },
  {
    q: 'Do you work on projects in Kapolei, Kakaʻako and the neighboring islands?',
    text: 'Yes. We work across all four Hawaiʻi counties, including Kakaʻako, Kapolei and ʻEwa on Oʻahu, and in Guam, Saipan and the Marshall Islands.',
    a: (
      <>
        Yes. We work across all four Hawaiʻi counties, including Kakaʻako, Kapolei and ʻEwa on Oʻahu, and in Guam, Saipan and
        the Marshall Islands.
      </>
    ),
  },
]

export default function ForDevelopersInvestorsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Valuation and Advisory Services for Developers and Investors',
          serviceType: 'Real estate appraisal and advisory for developers and investors',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="For Developers & Investors"
        heading={'Valuation and Advisory Services for\n_Hawaiʻi Developers and Investors_'}
        subhead="Developers and investors use appraisers at four points: before buying, to test the price and the site's best use; before building, to test whether the project pencils; before borrowing, to give the lender as-complete and as-stabilized values; and before selling, to set an exit price. Using one firm across those stages keeps the assumptions consistent from purchase to exit."
        image={HERO_IMAGE}
        imageAlt="Aerial view of new multi-story residential buildings above a golf course, with the ocean beyond"
        breadcrumb={crumbs}
        formService={FORM_KEY}
        primaryHref="#inquiry"
        primaryLabel="Discuss a Project"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/vacant-land/dji_0111-large.webp"
                  alt="Aerial view of vacant land between residential neighborhoods, with the ocean on the horizon"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI Designated" title={'Advice Before\n_the Capital Is Spent_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group works from Honolulu with developers, funds, family offices and private investors across
              Oʻahu, Maui, Hawaiʻi Island, Kauaʻi and the Pacific. Our MAI-designated appraisers and market analysts help
              clients make decisions while changing course is still inexpensive, rather than certifying a number after the
              capital is spent.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Before you buy */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Buy" title={'Before You Buy: Acquisition\nand _Highest and Best Use_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>The price you pay for land or a building fixes the return you can earn. Before an offer, we can:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="What we can do before an offer"
          columns={['We can', 'What it tells you']}
          rows={beforeBuying}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              In Hawaiʻi, entitlement risk often decides the deal. A site that needs a State land use boundary change, a
              county zoning change or a special management area permit carries years of uncertainty, and the price should
              reflect it.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Before you build */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Build" title={'Before You Build: Testing\nWhether the _Project Works_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>Once the site is under control, the question becomes what to build and whether it works. We test:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="What we test before a project is built"
          columns={['We test', 'What we look at']}
          rows={beforeBuilding}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Construction costs in the islands, and the time entitlements take, make this test far less forgiving than on
              the mainland. A pro forma built on mainland assumptions can look profitable on paper and fail on site.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Before you borrow */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader tone="navy" label="Borrow" title={'Before You Borrow:\n_Construction Appraisals_'} />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                Construction lenders size loans against prospective values: as-complete when the building is finished and
                as-stabilized once it is leased or sold. When the same team that tested the market and the project prepares,
                or informs, those values, the lender sees consistent assumptions from acquisition to stabilization.
              </p>
              <p>For federally regulated loans, the lender must engage the appraiser. If you are a borrower, ask your lender to contact us.</p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Before you sell */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Sell" title={'Before You Sell: Exit Value\nand _Disposition_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>At exit, an independent appraisal helps:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="How an independent appraisal helps at exit"
          columns={['It helps', 'How']}
          rows={beforeSelling}
        />
      </Section>

      {/* Markets */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader tone="navy" label="Markets" title={'Development Markets\n_Across the Islands_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose tone="navy">
              <p>Each growth area has its own land values, entitlement path and buyer pool.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <ImageRows items={markets} />
      </Section>

      {/* One firm */}
      <Section>
        <SectionHeader label="Consistency" title={'Why One Firm Across\nthe _Project Life_'} className="mb-12" />
        <EditorialTable
          caption="What changes at each project stage if the firm stays the same"
          columns={['Stage', 'Question', 'What changes if the firm stays the same']}
          rows={projectLife}
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Consistency doesn&apos;t mean the numbers never change. It means each change is explained by the market, not by
              a new set of assumptions.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="Indeed, we thank you very much for your hard work. Want to thank you for taking this on, the attached is perfect and I look forward to working with you on the others as well."
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
          'feasibility-highest-and-best-use',
          'market-studies',
          'commercial-real-estate-appraisal',
          'ground-lease-valuation',
        ]}
        plainTitles
      />
      <ServiceInquiry
        service={FORM_KEY}
        heading={'Ready for Credible,\n_Timely Results?_'}
        text="Tell us the site, the stage and the decision ahead, and we'll recommend the right scope."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

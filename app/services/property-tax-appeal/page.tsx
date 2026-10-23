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
  DotList,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getService } from '@/lib/services'

const SLUG = 'property-tax-appeal'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Property Tax Appeal Appraisal in Hawaii | Board of Review'
const META_DESCRIPTION =
  'Over-assessed? MAI appraisals for Hawaiʻi real property tax appeals before the Board of Review and Tax Appeal Court. Act before your county deadline.'
const HERO_IMAGE = '/images/gallery/retail/dji_0106.webp'
const PHONE_DISPLAY = '(808) 784-4320'
const PHONE_HREF = 'tel:+18087844320'

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
  { label: 'Property Tax Appeal', href: URL_PATH },
]

const deadlines = [
  ['Kauaʻi', 'Around November 30', 'December 31'],
  ['City & County of Honolulu', 'By December 15', 'January 15'],
  ['Maui', 'By March 15', 'April 9'],
  ['Hawaiʻi County', 'By March 15', 'April 9'],
]

// Honolulu calendar, drawn from the deadline table and FAQ on this page.
const honoluluTimeline = [
  { date: 'October 1', label: 'Assessment date for the following tax year' },
  { date: 'Autumn', label: 'Contact us, before the notice arrives' },
  { date: 'By December 15', label: 'Notices of assessment mailed' },
  { date: 'January 15', label: 'Appeal deadline, with no extension' },
]

const owners = [
  {
    title: 'Commercial property owners',
    desc: 'Office, retail, industrial and hotel assets where a modest over-assessment costs real money each year.',
  },
  {
    title: 'Tax attorneys and CPAs',
    desc: 'Appraisal evidence to support an appeal they are presenting.',
  },
  {
    title: 'High-value residential owners',
    desc: 'Luxury and estate properties where assessments often overshoot the market.',
  },
]

const situations = [
  'Buildings needing major repairs or capital work',
  'Properties whose market rents or occupancy have fallen',
  'Hotels where market performance has not reached the level the county assumes',
  'Land limited by easements, slopes or flood zones',
  'Properties where county records misstate size or condition',
]

const faqs: FaqItem[] = [
  {
    q: 'Is my property worth appealing?',
    text: "If the assessment is meaningfully above what the property would sell for, it may be. In Honolulu, one ground for appeal is an assessment exceeding market value by more than 10 percent. We'll give you a frank view before you commit.",
    a: (
      <>
        If the assessment is meaningfully above what the property would sell for, it may be. In Honolulu, one ground for
        appeal is an assessment exceeding market value by more than 10 percent. We&apos;ll give you a frank view before
        you commit.
      </>
    ),
  },
  {
    q: 'What is the valuation date for an appeal?',
    text: "It's the county's assessment date, not today. Honolulu, for example, assesses as of October 1 for the following tax year.",
    a: (
      <>
        It&apos;s the county&apos;s assessment date, not today. Honolulu, for example, assesses as of October 1 for the
        following tax year.
      </>
    ),
  },
  {
    q: 'Board of Review or Tax Appeal Court?',
    text: 'Owners can generally appeal to either. The Board of Review is the more common first step; the Tax Appeal Court suits larger or more complex disputes. Your attorney or tax advisor can advise on the forum.',
    a: (
      <>
        Owners can generally appeal to either. The Board of Review is the more common first step; the Tax Appeal Court
        suits larger or more complex disputes. Your attorney or tax advisor can advise on the forum.
      </>
    ),
  },
  {
    q: 'What if I miss the deadline?',
    text: "The appeal generally waits until the next assessment year, so plan early. In Honolulu, if last year's appeal is still pending and the new value is unchanged, an appeal is carried forward automatically.",
    a: (
      <>
        The appeal generally waits until the next assessment year, so plan early. In Honolulu, if last year&apos;s appeal
        is still pending and the new value is unchanged, an appeal is carried forward automatically.
      </>
    ),
  },
  {
    q: 'Do you guarantee a reduction?',
    text: 'No appraiser should. We provide an independent value. The Board decides.',
    a: <>No appraiser should. We provide an independent value. The Board decides.</>,
  },
  {
    q: 'Is an appeal worth it for a smaller property?',
    text: "It depends on how far the assessment is above market, and on the tax rate for your class. We'll give you a frank view of whether the potential savings justify the appraisal fee before you commit.",
    a: (
      <>
        It depends on how far the assessment is above market, and on the tax rate for your class. We&apos;ll give you a
        frank view of whether the potential savings justify the appraisal fee before you commit.
      </>
    ),
  },
  {
    q: 'Can I appeal every year?',
    text: "Yes. Each year's assessment can be appealed on its own.",
    a: <>Yes. Each year&apos;s assessment can be appealed on its own.</>,
  },
  {
    q: 'Do you appraise residential property for appeals?',
    text: 'Yes, particularly higher-value and luxury homes, where mass appraisal models are least reliable.',
    a: <>Yes, particularly higher-value and luxury homes, where mass appraisal models are least reliable.</>,
  },
  {
    q: 'Does a recent purchase price help?',
    text: 'A recent arm\'s-length purchase is strong evidence of market value. If you bought near the assessment date for less than the assessed value, tell us when you first call.',
    a: (
      <>
        A recent arm&apos;s-length purchase is strong evidence of market value. If you bought near the assessment date
        for less than the assessed value, tell us when you first call.
      </>
    ),
  },
]

export default function PropertyTaxAppealPage() {
  const service = getService(SLUG)!

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Property Tax Appeal Appraisal',
          serviceType: 'Real property tax appeal appraisal',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: { ...providerSchema, telephone: '+1-808-784-4320' },
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Property Tax Appeal"
        heading={'Property Tax Appeal\nAppraisals in Hawaiʻi,\n_Before the Deadline_ Passes'}
        subhead="If your county assessment is above what your property would sell for, an independent appraisal is the evidence that moves a Board of Review. The Benavente Group prepares property tax appeal appraisals for commercial and high-value owners across Hawaiʻi, built on numbers that can be cross-examined and survive."
        image={HERO_IMAGE}
        imageAlt="Drone view of a mixed-use commercial and residential corridor on Maui"
        breadcrumb={crumbs}
        number="03"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Start Your Appeal"
        secondaryCta={{ label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF }}
      />

      {/* Why assessments miss */}
      <section className="bg-white py-16 lg:py-20 px-[4.5%]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[0.6fr_1.4fr] gap-6 lg:gap-20 items-start">
          <RevealOnScroll>
            <IntroHeading label="Mass Appraisal vs Your Property" title={'Why Assessments\n_Miss the Details_'} />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              Counties assess thousands of properties each year using mass appraisal models. Those models often miss the
              specifics that drive an individual property&apos;s market value: deferred maintenance, functional problems,
              site constraints such as easements or flood zones, or errors in county records. An appraisal focused on your
              property puts those facts in front of the Board, supported by market evidence.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Deadlines */}
      <Section tone="cream" id="deadlines">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Appeal Deadlines" title={'Hawaiʻi Appeal Deadlines\nAre _Fixed_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>
                Each county runs its own calendar, and late appeals are not accepted. Contact us well before your
                deadline, because a supportable appraisal takes time to prepare.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Hawaiʻi real property tax appeal deadlines by county"
          columns={['County', 'Notices mailed', 'Appeal deadline']}
          rows={deadlines}
          emphasisColumn={2}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 mt-12">
          <RevealOnScroll>
            <Prose className="!text-[16px]">
              <p>
                In Honolulu, the January 15 deadline cannot be extended even when it falls on a weekend or holiday.
                Deadlines and filing deposits are set by each county, so confirm the current year with the county&apos;s
                real property office.
              </p>
            </Prose>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="relative bg-white border border-gold/25 rounded-[2px] p-8 sm:p-10">
              <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
              <h3 className="font-serif text-[26px] text-navy leading-[1.2]">Plan backwards from the deadline</h3>
              <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-4">
                A commercial appraisal for an appeal typically needs several weeks for inspection, income and expense
                review, and market research. Honolulu owners who wait for the December 15 notice have about a month,
                which includes the holiday season. If you suspect your property is over-assessed, contact us in the
                autumn, before the notice arrives, so the report is ready when the window opens.
              </p>
              <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-serif font-medium mt-8">
                The Honolulu calendar
              </p>
              <div className="relative mt-5">
                <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-gold/30" />
                <ol className="space-y-5 pl-7">
                  {honoluluTimeline.map((t, i) => (
                    <li key={t.date} className="relative">
                      <RevealOnScroll delay={0.1 + i * 0.1}>
                        <span
                          aria-hidden="true"
                          className={`absolute -left-7 top-[7px] w-[11px] h-[11px] rounded-full border border-gold ${
                            i === honoluluTimeline.length - 1 ? 'bg-gold' : 'bg-white'
                          }`}
                        />
                        <span className="block font-serif text-[20px] text-navy leading-[1.2]">{t.date}</span>
                        <span className="block text-navy/70 text-[15px] font-light leading-[1.6]">{t.label}</span>
                      </RevealOnScroll>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Grounds */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.25fr] gap-12 lg:gap-20">
          <div>
            <SectionHeader label="Grounds for Appeal" title={'What You Can Appeal\nin _Honolulu_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  In the City and County of Honolulu, an owner may appeal the assessed value, the property&apos;s
                  classification, or the amount of an exemption. The ordinance sets out four grounds for appeal:
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <NumberedItems
              layout="rows"
              items={[
                {
                  title: 'Over-assessment',
                  body: <p>The assessment exceeds the property&apos;s market value by more than 10 percent.</p>,
                },
                {
                  title: 'Lack of uniformity or inequality',
                  body: (
                    <p>
                      Caused by illegal assessment methods, or by an error in applying the methods to the property.
                    </p>
                  ),
                },
                {
                  title: 'Denial of an exemption',
                  body: <p>Denial of an exemption the owner is entitled to and has qualified for.</p>,
                },
                {
                  title: 'Illegality',
                  body: <p>Illegality under federal, state or city law.</p>,
                },
              ]}
            />
            <RevealOnScroll>
              <Prose className="mt-8">
                <p>
                  An appraisal is the core evidence for an over-assessment appeal, and often supports a uniformity
                  argument too. Exemption and classification issues turn mainly on use and ownership facts, which your
                  attorney or tax advisor can address. Maui, Hawaiʻi and Kauaʻi counties set their own grounds, which we
                  review with you at the start.
                </p>
              </Prose>
              <p className="text-slate text-[14px] font-light leading-[1.7] mt-6">
                This page is general information, not legal or tax advice.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* Burden of proof */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
          <div>
            <SectionHeader tone="navy" label="Burden of Proof" title={'The Assessment Is\n_Presumed Correct_'} />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-6">
                <p>
                  This is the most important rule in any appeal. The county&apos;s assessment is presumed correct, so the
                  owner must prove it wrong. Without enough evidence, the Board of Review must side with the assessor.
                  That is why a well-supported, independent appraisal matters.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15}>
            <p className="text-white/[0.62] text-[17px] font-light leading-[1.85]">
              The county also limits what counts as good evidence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 mt-6">
              <div className="bg-navy p-7">
                <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase font-serif font-medium">
                  Usually not accepted
                </p>
                <ul className="mt-4 space-y-4">
                  <li className="text-white/70 text-[16px] font-light leading-[1.7]">
                    Sales between relatives, friends or close business associates
                  </li>
                  <li className="text-white/70 text-[16px] font-light leading-[1.7]">
                    A neighboring property&apos;s lower assessment, on its own
                  </li>
                </ul>
              </div>
              <div className="bg-navy-light p-7">
                <p className="text-gold-light text-[11px] tracking-[0.25em] uppercase font-serif font-medium">
                  Strong evidence
                </p>
                <ul className="mt-4 space-y-4">
                  <li className="text-white text-[16px] font-light leading-[1.7]">Comparable fee simple market sales</li>
                  <li className="text-white text-[16px] font-light leading-[1.7]">
                    Contractor estimates for repairing deficient items
                  </li>
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Who */}
      <Section>
        <SectionHeader
          label="Who We Work With"
          title={'Owners, Their Counsel\nand _Tax Advisors_'}
          className="max-w-[760px]"
        />
        <div className="mt-12">
          <EditorialTable
            caption="Who we work with and how we help"
            columns={['Client', 'How we help']}
            rows={owners.map((c) => [c.title, c.desc])}
            numbered
          />
        </div>
        <DotList label="Situations where an appeal is often worth exploring" items={situations} className="mt-14" />

      </Section>

      {/* Evidence quality */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-16">
          <SectionHeader label="Evidence That Persuades" title={'Quantitative Support,\n_Not Anecdotes_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>
                In our experience across hundreds of appeal engagements, three factors separate successful appeals from
                routine denials.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <NumberedItems
          items={[
            {
              title: 'Comparable sales evidence',
              body: <p>Recent arm&apos;s-length sales of truly comparable properties.</p>,
            },
            {
              title: 'Income capitalization support',
              body: <p>Market rents, vacancy and expenses that show what an investor would actually pay.</p>,
            },
            {
              title: 'Professional presentation',
              body: (
                <p>A USPAP-compliant appraisal presented clearly to the Board of Review or the Tax Appeal Court.</p>
              ),
            },
          ]}
        />
        <RevealOnScroll>
          <Prose className="mt-12">
            <p>
              For background, read our guide to{' '}
              <TextLink href="/blog/assessed-value-vs-market-value">assessed value vs market value</TextLink>.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Common errors */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20">
          <div>
            <SectionHeader label="Assessment Review" title={'Where County\nValues _Go Wrong_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>We see the same issues repeatedly when reviewing commercial assessments:</p>
              </Prose>
              <div className="relative hidden lg:block h-[360px] mt-10 rounded-[2px] overflow-hidden">
                <Image
                  src="/images/gallery/industrial/dji_0153.webp"
                  alt="Drone view of an industrial warehouse building on Hawaiʻi Island"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
            </RevealOnScroll>
          </div>
          <div>
            <NumberedItems
              layout="rows"
              items={[
                {
                  title: 'Income assumptions above the market',
                  body: <p>Mass models may apply rents or occupancy the market does not support.</p>,
                },
                {
                  title: 'Out-of-date physical data',
                  body: (
                    <p>Square footage, building condition or demolished improvements not reflected in county records.</p>
                  ),
                },
                {
                  title: 'Excess land or unusable area',
                  body: <p>Steep slopes, flood zones, easements and setbacks that reduce the usable site.</p>,
                },
                {
                  title: 'Deferred maintenance and repairs',
                  body: <p>Condition problems the model does not see, which contractor estimates can document.</p>,
                },
                {
                  title: 'Hotel and special-purpose property',
                  body: <p>Assessments that capture business value rather than real property value alone.</p>,
                },
              ]}
            />
            <RevealOnScroll>
              <div className="bg-cream border border-gold/20 rounded-[2px] p-7 mt-8">
                <p className="text-navy/85 text-[16px] font-light leading-[1.8]">
                  Note that Honolulu assesses every property on its fee simple value, as if unencumbered by leases. So a
                  below-market ground lease or lease is generally not a basis for appeal there.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* How it differs */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 items-center">
          <SectionHeader tone="navy" label="Appeal Appraisals" title={'How an Appeal\nAppraisal _Differs_'} />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                An appraisal for a tax appeal is valued as of the county&apos;s assessment date, not today. It addresses
                the specific ground for appeal. And it is written to be examined by assessors and Board members who know
                the market. We present the analysis clearly and anticipate the questions the Real Property Assessment
                Division is likely to raise, so the evidence holds up at hearing.
              </p>
            </Prose>
            <GoldRule className="w-24 mt-8 opacity-70" delay={0.2} />
          </RevealOnScroll>
        </div>
      </Section>

      {/* Process */}
      <Section tone="cream">
        <SectionHeader label="Our Process" title={'From Assessment Notice\nto _Hearing_'} className="mb-14" />
        <ProcessSteps
          steps={[
            {
              title: 'Quick review',
              body: 'Send us the notice of assessment. We tell you honestly whether an appeal is worth pursuing.',
            },
            {
              title: 'Engagement',
              body: 'We set the scope and the delivery date ahead of your deadline and hearing.',
            },
            {
              title: 'Appraisal',
              body: "Inspection, market research and a report as of the county's assessment date.",
            },
            {
              title: 'Hearing support',
              body: 'We work with you or your counsel to present the evidence.',
            },
          ]}
        />
      </Section>

      {/* Board of Review */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="The Hearing" title={'What to Expect at the\n_Board of Review_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                After you file, the county schedules a hearing before its Board of Review, an independent body that hears
                disputes between taxpayers and the assessment division. Submitting evidence with the appeal, or shortly
                after, helps the county&apos;s appraiser review the case and can shorten the wait for a hearing.
              </p>
              <p>
                The Board can sustain, lower or raise the assessment, so a well-supported appeal matters. A Board
                decision can be taken further to the Tax Appeal Court, and owners can also appeal directly to the Tax
                Appeal Court. Your attorney can advise which forum suits your property.
              </p>
            </Prose>
            <div className="relative bg-cream border border-gold/20 rounded-[2px] p-7 mt-8">
              <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
              <p className="text-navy text-[16px] font-light leading-[1.8]">
                While an appeal is pending, taxes must still be paid by their due dates to avoid penalties. If the appeal
                succeeds, any overpayment is adjusted.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="Thanks so much for understanding our urgent need and your excellent customer service."
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
        heading={'Start Your Appeal\n_Before the Deadline_'}
        text="Send us the details of your assessment and we will tell you honestly whether an appeal is worth pursuing."
        image="/images/gallery/industrial/dji_0153.webp"
      />
      <StickyInquiryButton />
    </>
  )
}

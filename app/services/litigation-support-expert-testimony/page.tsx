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
  Checklist,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getService } from '@/lib/services'

const SLUG = 'litigation-support-expert-testimony'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Litigation Support Appraiser in Hawaii | Expert Testimony'
const META_DESCRIPTION =
  'MAI-designated real estate expert witnesses in Hawaiʻi. Court-ready appraisal reports, rebuttal reviews, arbitration support and testimony for attorneys.'
const HERO_IMAGE = '/images/gallery/cbd/dji_0348.webp'

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
  { label: 'Litigation Support', href: URL_PATH },
]

const disputes = [
  ['Partition actions', 'Value of the whole and of fractional interests among co-owners'],
  ['Divorce and marital dissolution', 'Retrospective or current values for property division'],
  [
    'Diminution in value and real estate damages',
    'Before-and-after values for construction defects, contamination, nuisance or breach',
  ],
  ['Lease and ground lease disputes', 'Market rent at reopening, renewal or arbitration'],
  ['Business and partnership disputes', 'Real estate values inside buyouts and dissolutions'],
  ['Lender and foreclosure matters', 'Retrospective values, workout and deficiency support'],
  ['Arbitration and mediation', 'Valuation support for rent and value arbitrations'],
]

const services = [
  {
    title: 'Early case consultation',
    desc: 'Before scope is fixed, we frame what a credible valuation argument looks like for the matter.',
  },
  {
    title: 'Court-ready appraisal reports',
    desc: 'Every sale, adjustment and assumption traceable to source evidence.',
  },
  {
    title: 'Appraisal review and rebuttal',
    desc: 'A USPAP review of the opposing report, identifying errors and unsupported conclusions.',
  },
  {
    title: 'Expert disclosure support',
    desc: 'Reports and opinions prepared to meet disclosure deadlines.',
  },
  {
    title: 'Deposition and trial testimony',
    desc: 'Clear explanation of method, prepared for the questions opposing counsel will ask.',
  },
]

const reviewFindings = [
  'Comparable sales that are not truly comparable, or that were not verified',
  'Adjustments without market support',
  'The wrong property interest, such as fee simple when the subject is leased fee',
  'An effective date that does not match the legal question',
  'Highest and best use conclusions that ignore zoning or physical limits',
  'Income assumptions that contradict the actual leases',
]

const faqs: FaqItem[] = [
  {
    q: 'When should we bring in an appraiser?',
    text: 'As early as possible, ideally before the scope of work is fixed and before discovery closes. Early input shapes what evidence to gather. Our article on what attorneys need from appraisers explains why.',
    a: (
      <>
        As early as possible, ideally before the scope of work is fixed and before discovery closes. Early input shapes
        what evidence to gather. Our article on{' '}
        <TextLink href={guide('litigation-support-what-attorneys-need')}>what attorneys need from appraisers</TextLink>{' '}
        explains why.
      </>
    ),
  },
  {
    q: "Can you review the other side's appraisal?",
    text: "Yes. We prepare USPAP-compliant appraisal reviews that test the opposing report's data, method and conclusions, with or without our own opinion of value.",
    a: (
      <>
        Yes. We prepare USPAP-compliant appraisal reviews that test the opposing report&apos;s data, method and
        conclusions, with or without our own opinion of value.
      </>
    ),
  },
  {
    q: 'Can you value a property as of a past date?',
    text: 'Yes. Retrospective appraisals are common in litigation, for example as of a date of separation, breach or loss.',
    a: (
      <>
        Yes. Retrospective appraisals are common in litigation, for example as of a date of separation, breach or loss.
      </>
    ),
  },
  {
    q: 'Do you work on matters outside Oʻahu?',
    text: 'Yes, across the Hawaiʻi counties and in the Pacific regions we serve: Guam, Saipan and the Marshall Islands.',
    a: <>Yes, across the Hawaiʻi counties and in the Pacific regions we serve: Guam, Saipan and the Marshall Islands.</>,
  },
  {
    q: 'Are you independent of the party that retains you?',
    text: 'Yes. Our opinion is our own, and retaining counsel gets an honest assessment, including where the case is weak.',
    a: (
      <>
        Yes. Our opinion is our own, and retaining counsel gets an honest assessment, including where the case is weak.
      </>
    ),
  },
  {
    q: 'How are litigation engagements billed?',
    text: 'We explain our rates and provide an estimate at engagement, covering consultation, analysis, report preparation and testimony.',
    a: (
      <>
        We explain our rates and provide an estimate at engagement, covering consultation, analysis, report preparation
        and testimony.
      </>
    ),
  },
  {
    q: 'Can you meet our expert disclosure deadline?',
    text: 'Tell us the disclosure date when you first call. We confirm before engagement whether we can deliver a complete report in time. See our guide to expert witness disclosure.',
    a: (
      <>
        Tell us the disclosure date when you first call. We confirm before engagement whether we can deliver a complete
        report in time. See our guide to{' '}
        <TextLink href={guide('what-is-expert-witness-disclosure-in-litigation')}>expert witness disclosure</TextLink>.
      </>
    ),
  },
  {
    q: 'Do you handle residential disputes as well as commercial?',
    text: 'Yes. Our SRA-designated principals value residential property, including luxury homes, alongside commercial and land.',
    a: (
      <>
        Yes. Our SRA-designated principals value residential property, including luxury homes, alongside commercial and
        land.
      </>
    ),
  },
  {
    q: 'What is a court-appointed appraiser?',
    text: 'An appraiser selected by the court, or agreed by the parties, to give a neutral opinion of value. Read our guide to court-appointed appraisers.',
    a: (
      <>
        An appraiser selected by the court, or agreed by the parties, to give a neutral opinion of value. Read our guide
        to <TextLink href={guide('what-is-a-court-appointed-appraiser')}>court-appointed appraisers</TextLink>.
      </>
    ),
  },
]

// Appraisal panel used in Hawaiʻi lease rent arbitrations: one appraiser per
// side, and the two select a third.
function ArbitrationPanel() {
  const node = (num: string, title: string, desc: string) => (
    <div className="relative z-[1] bg-white border border-gold/30 rounded-[2px] p-5 sm:p-6 h-full">
      <span className="text-gold font-serif text-[12px] tracking-[0.2em]">{num}</span>
      <p className="font-serif text-[20px] sm:text-[22px] text-navy leading-[1.25] mt-2">{title}</p>
      <p className="text-navy/70 text-[15px] font-light leading-[1.6] mt-1">{desc}</p>
    </div>
  )
  return (
    <figure aria-label="Lease rent arbitration appraisal panel">
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <RevealOnScroll>{node('01', "Lessor's appraiser", 'Appointed by the landlord')}</RevealOnScroll>
        <RevealOnScroll delay={0.1}>{node('02', "Lessee's appraiser", 'Appointed by the tenant')}</RevealOnScroll>
      </div>
      {/* Connector: two drops joined by a rule, then one line down to the third appraiser. */}
      <div aria-hidden="true" className="relative h-14">
        <span className="absolute left-1/4 top-0 h-7 w-px bg-gold/50" />
        <span className="absolute left-3/4 top-0 h-7 w-px bg-gold/50" />
        <GoldRule className="absolute left-1/4 right-1/4 top-7 opacity-60" delay={0.2} />
        <span className="absolute left-1/2 top-7 h-7 w-px bg-gold/50" />
      </div>
      <RevealOnScroll delay={0.25} className="w-full sm:w-1/2 mx-auto">
        {node('03', 'Third appraiser', 'Selected by the two appointed appraisers')}
      </RevealOnScroll>
    </figure>
  )
}

export default function LitigationSupportPage() {
  const service = getService(SLUG)!

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([...crumbs.slice(0, 2), { label: 'Litigation Support & Expert Testimony', href: URL_PATH }])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Litigation Support & Expert Testimony',
          serviceType: 'Real estate litigation support and expert witness testimony',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Litigation Support & Expert Testimony"
        heading={'Litigation Support Appraisers &\n_Real Estate Expert Witnesses_\nin Hawaiʻi'}
        subhead="When property value is the question in dispute, attorneys need an appraiser whose work holds up under cross-examination. The Benavente Group provides litigation support across Hawaiʻi and the Pacific: court-ready reports, reviews of the opposing appraisal, arbitration support and expert testimony from MAI-designated appraisers."
        image={HERO_IMAGE}
        imageAlt="Aliʻiōlani Hale and the downtown Honolulu skyline"
        breadcrumb={crumbs}
        number="02"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Discuss a Matter"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Credibility */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="order-2 lg:order-1">
            <IntroHeading label="Expert Credibility" title={'Credibility That\n_Holds Up_ in Court'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              Attorneys vet experts carefully before they ever call, and they should. A valuation expert&apos;s credibility
              can carry a case or sink it. Our principals hold the MAI and SRA designations, write reports intended to be
              read line by line by the opposing side, and approach every matter with the documentation discipline that
              cross-examination demands.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15} className="order-1 lg:order-2 self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[440px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[440px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/cbd/dji_0341.webp"
                  alt="Downtown Honolulu office towers above the Capitol District"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -left-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Who we work for + consulting vs testifying */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20">
          <div>
            <SectionHeader label="Who We Work With" title={'Built for Attorneys and\nthe _Clients They Represent_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-8">
                <p>
                  We work with attorneys and the parties they represent. Our role is the same in every case: an
                  independent, supportable opinion of value that a judge, jury or arbitrator can follow.
                </p>
                <p>
                  Some matters need a full appraisal and testimony. Others need only a confidential consulting opinion to
                  help counsel decide whether to settle. We scope the engagement to the matter.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15} className="self-end">
            <div className="relative bg-white border border-gold/25 rounded-[2px] p-8 sm:p-10">
              <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
              <h3 className="font-serif text-[26px] text-navy leading-[1.2]">Consulting vs testifying roles</h3>
              <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-4">
                Counsel sometimes retains an appraiser first as a non-testifying consultant, to test the strength of a
                valuation position privately. If the case proceeds, the same appraiser may be designated to testify, or
                counsel may bring in a separate testifying expert. We discuss the role clearly at engagement, so privilege
                and disclosure obligations are handled correctly from the start.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Matters */}
      <Section>
        <SectionHeader
          label="Matters We Support"
          title={'Real Estate Disputes Where\n_Value Decides_ the Outcome'}
          className="mb-12"
        />
        <EditorialTable caption="Real estate disputes and the valuation support we provide" columns={['Matter', 'What we provide']} rows={disputes} />
        <RevealOnScroll>
          <Prose className="max-w-[820px] mt-10">
            <p>
              Condemnation cases have their own page:{' '}
              <TextLink href="/services/eminent-domain-condemnation">eminent domain appraisal</TextLink>. Assessment
              disputes are covered under{' '}
              <TextLink href="/services/property-tax-appeal">property tax appeal appraisal</TextLink>.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Valuation questions */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.3fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader tone="navy" label="Valuation Questions" title={'The Questions Courts\n_Ask About Value_'} />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-6">
                <p>
                  Most real estate disputes come down to a handful of valuation questions. Each needs a specific,
                  defensible method.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <NumberedItems
            tone="navy"
            layout="rows"
            items={[
              {
                title: 'What was the property worth on a specific past date?',
                body: (
                  <p>
                    Retrospective appraisals rely on market evidence available as of that date, not hindsight. We document
                    the information a buyer and seller would have known at the time.
                  </p>
                ),
              },
              {
                title: 'How much value was lost?',
                body: (
                  <p>
                    Diminution in value claims compare the property&apos;s value before and after an event, such as a
                    construction defect, contamination or a neighboring use. We isolate the loss caused by the event from
                    general market movement. See our guide to{' '}
                    <TextLink tone="navy" href={guide('what-is-a-diminution-in-value-claim-in-real-estate')}>
                      diminution in value claims
                    </TextLink>
                    .
                  </p>
                ),
              },
              {
                title: 'What is a fractional interest worth?',
                body: (
                  <p>
                    A 25 percent share in a property is rarely worth 25 percent of the whole. Lack of control and limited
                    marketability matter, and in partition actions, so does the cost of dividing the property. Our{' '}
                    <TextLink tone="navy" href={guide('what-is-a-partition-action-appraisal')}>
                      partition action guide
                    </TextLink>{' '}
                    explains the issues.
                  </p>
                ),
              },
              {
                title: 'What is market rent?',
                body: (
                  <p>
                    Ground lease reopenings and lease disputes turn on the rent a willing tenant would pay at the reset
                    date, a question with large long-term consequences in Hawaiʻi.
                  </p>
                ),
              },
              {
                title: 'Is the opposing appraisal reliable?',
                body: (
                  <p>
                    A focused review can reveal weak comparables, unsupported adjustments, the wrong property interest or
                    the wrong effective date.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      {/* Arbitration */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-center">
          <div>
            <SectionHeader label="Arbitration Support" title={'Lease Rent Arbitration\nand _Mediation_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  Many Hawaiʻi ground leases and commercial leases set rent through an appraisal panel, with each side
                  appointing an appraiser and the two selecting a third. Arbitration support is one of our core services.
                </p>
                <p>
                  In every arbitration, we follow the lease language precisely, because the definition of value, the
                  assumptions required and the timeline for decisions often differ from a standard appraisal. Read more in
                  our guide to <TextLink href={guide('what-is-real-estate-arbitration')}>real estate arbitration</TextLink>.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div className="bg-cream border border-gold/15 rounded-[2px] p-6 sm:p-10">
            <ArbitrationPanel />
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section tone="cream">
        <SectionHeader label="Litigation Services" title={'From Early Consultation\nto the _Witness Stand_'} className="mb-14" />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
          {services.map((s, i) => (
            <li key={s.title}>
              <RevealOnScroll delay={i * 0.08} className="group h-full">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-[13px] tracking-[0.2em] text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-px flex-1 bg-gold/30 group-hover:bg-gold transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-[24px] text-navy leading-[1.2] mt-5">{s.title}</h3>
                <p className="text-navy/75 text-[16px] font-light leading-[1.75] mt-3">{s.desc}</p>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
      </Section>

      {/* Documentation */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20">
          <div>
            <SectionHeader label="Report Standards" title={'Documentation Discipline\nUnder _Cross-Examination_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  Gaps in the audit trail are where opposing experts find purchase. We build reports so the answer to the
                  obvious challenge is already on the page. Before testimony, we walk through the weak points with
                  retaining counsel and identify where the other side is likely to press.
                </p>
                <p>
                  In island markets, that discipline matters more. With thin comparable data, every sale chosen and every
                  adjustment made will be questioned. We show our reasoning rather than ask the court to trust it.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15} className="self-center">
            <p className="text-navy text-[17px] font-light leading-[1.75]">Our reports are built in layers.</p>
            <div className="mt-6 space-y-3">
              <div className="border border-gold/30 bg-cream rounded-[2px] p-7">
                <span className="text-gold text-[11px] tracking-[0.25em] uppercase font-serif font-medium">Layer 01</span>
                <h3 className="font-serif text-[24px] text-navy mt-2">Summary</h3>
                <p className="text-navy/80 text-[16px] font-light leading-[1.75] mt-2">
                  A clear summary states the conclusion and the reasons for it in plain language a judge or jury can
                  follow.
                </p>
              </div>
              <div className="border border-gold/30 bg-white rounded-[2px] p-7 sm:ml-8">
                <span className="text-gold text-[11px] tracking-[0.25em] uppercase font-serif font-medium">Layer 02</span>
                <h3 className="font-serif text-[24px] text-navy mt-2">Full analysis</h3>
                <p className="text-navy/80 text-[16px] font-light leading-[1.75] mt-2">
                  Behind the summary sits the full analysis: every comparable verified, every adjustment explained, every
                  assumption sourced.
                </p>
              </div>
            </div>
            <p className="text-navy text-[17px] font-light leading-[1.75] mt-6">
              We aim to leave no gaps, and to say so plainly when the evidence is limited.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Appraisal review */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
          <div>
            <SectionHeader tone="navy" label="Appraisal Review & Rebuttal" title={"Testing the Other\nSide's _Appraisal_"} />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-6">
                <p>
                  Often the most valuable early step is a review of the opposing appraisal. Under USPAP Standard 3, we
                  assess whether the report&apos;s data, analysis and conclusions are credible and appropriate for its
                  intended use.
                </p>
                <p>
                  A review can be a standalone deliverable, or can support our own opinion of value and rebuttal testimony.
                  See our guide to{' '}
                  <TextLink tone="navy" href={guide('what-is-an-appraisal-review')}>
                    what an appraisal review is
                  </TextLink>
                  .
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <RevealOnScroll>
              <p className="text-gold-light text-[12px] tracking-[0.2em] uppercase font-serif font-medium mb-4">
                Common findings include
              </p>
            </RevealOnScroll>
            <Checklist tone="navy" items={reviewFindings} />
          </div>
        </div>
      </Section>

      {/* Engagement process */}
      <Section tone="cream">
        <SectionHeader label="Our Process" title={'How a Litigation\n_Engagement Runs_'} className="mb-14" />
        <ProcessSteps
          steps={[
            {
              title: 'Conflict check and consultation',
              body: 'We confirm independence, then discuss the issues, dates and the question of value.',
            },
            {
              title: 'Scope and engagement',
              body: 'Intended use, date of value (often retrospective), and the deliverables discovery requires.',
            },
            {
              title: 'Analysis and report',
              body: 'Inspection, research and a report written for a lay fact-finder as well as an expert reviewer.',
            },
            {
              title: 'Testimony',
              body: 'Preparation with counsel, then deposition, hearing or trial.',
            },
          ]}
        />
      </Section>

      {/* Testimony */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[320px] lg:min-h-[440px] rounded-[2px] overflow-hidden">
              <Image
                src="/images/gallery/cbd/dji_0337.webp"
                alt="Hawaiʻi State Capitol and downtown Honolulu"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </RevealOnScroll>
          <div>
            <SectionHeader label="Expert Testimony" title={'Clear, Composed,\n_Prepared_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  Good testimony is prepared well before the courtroom. Before deposition or trial, we review the report
                  with retaining counsel, identify the points opposing counsel is likely to press, and make sure exhibits
                  are clear enough for a lay fact-finder.
                </p>
                <p>
                  On the stand, our aim is simple: explain the method in plain language, concede what should be conceded,
                  and hold firm where the evidence supports the conclusion. Our guide on{' '}
                  <TextLink href={guide('what-is-a-deposition-in-real-estate-valuation-cases')}>
                    depositions in real estate valuation cases
                  </TextLink>{' '}
                  explains what to expect.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
        </div>
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

      <RelatedServices service={service} />
      <ServiceInquiry
        service={SLUG}
        heading={'Discuss a\n_Matter_ With Us'}
        text="Tell us about the dispute, the key dates and any disclosure deadlines. We will confirm independence and respond promptly with scope and next steps."
        image="/images/gallery/cbd/dji_0341.webp"
      />
      <StickyInquiryButton />
    </>
  )
}

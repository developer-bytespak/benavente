import type { Metadata } from 'next'
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
  EditorialPlaceholder,
  ImageRows,
  Checklist,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'

const FORM_KEY = 'process'
const URL_PATH = '/process'
const META_TITLE = 'Our Appraisal Process: What to Expect | Benavente Group'
const META_DESCRIPTION =
  'From conflict check and scope of work to inspection, draft review and final report: how a Honolulu appraisal with The Benavente Group runs.'
const HERO_IMAGE = '/images/gallery/vacant-land/dji_0996.webp'

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
  { label: 'Our Process', href: URL_PATH },
]

const steps = [
  { id: 'enquiry', label: 'Enquiry and Conflict Check' },
  { id: 'scope', label: 'Scope of Work and Fee' },
  { id: 'documents', label: 'Documents We Need' },
  { id: 'inspection', label: 'Inspection and Research' },
  { id: 'analysis', label: 'Analysis, Draft and Review' },
  { id: 'report', label: 'Final Report and Testimony' },
]

const enquiryAsks = [
  ['The property', 'Type and location'],
  ['The purpose', 'What the appraisal will be used for, and by whom'],
  ['The date of value', 'Today, a past date, or a future date'],
  ['The deadline', 'When you need the report'],
]

const engagementLetter = [
  'Client and intended users',
  'Intended use and effective date',
  'Interest appraised and report type',
  'Fee, any retainer, and delivery date',
]

const documents = [
  ['Rent roll and leases', 'Income, term and tenant risk'],
  ['Operating statements (three years)', 'Expenses and net operating income'],
  ['Ground lease, if any', 'Interest valued, ground rent, reopenings'],
  ['Site plans, floor plans, building areas', 'Size and layout'],
  ['Recent capital work and budgets', 'Condition and future costs'],
  ['Prior appraisals and purchase documents', 'History and context'],
  ['Title report, easements, CC&Rs', 'Restrictions that affect value'],
  ['Tax map key (TMK)', 'Locates the parcel in county records'],
]

const islands = [
  {
    title: 'Honolulu and Oʻahu',
    image: '/images/regions/oahu-skyline.webp',
    imageAlt: 'Honolulu high-rises with Diamond Head',
    body: 'Inspections scheduled from our downtown Honolulu office, from Kapolei and the North Shore to Kailua and Hawaiʻi Kai.',
  },
  {
    title: 'Maui, Molokaʻi and Lānaʻi',
    image: '/images/regions/maui.webp',
    imageAlt: 'Maui coastline',
    body: 'Inspections grouped where possible to keep travel efficient.',
  },
  {
    title: 'Hawaiʻi Island',
    image: '/images/regions/big-island.webp',
    imageAlt: 'Hawaiʻi Island landscape',
    body: 'Inspections in Hilo, Kona, Waimea and rural districts, often over more than one day for large land.',
  },
  {
    title: 'Kauaʻi',
    image: '/images/regions/kauai.webp',
    imageAlt: 'Kauaʻi coastline',
    body: 'Inspections from Līhuʻe to the North and South Shores.',
  },
  {
    title: 'Guam, Saipan and the Marshall Islands',
    image: '/images/regions/guam.webp',
    imageAlt: 'Guam coastline',
    body: 'Travel planned at engagement, with local records research arranged in advance.',
  },
]

const timelineFactors = [
  ['Property complexity', 'A single-tenant building vs a multi-tenant center or hotel'],
  ['Location', 'Oʻahu, a neighbor island, or a Pacific island requiring travel'],
  ['Documents', 'How quickly leases and statements arrive'],
  ['Report type', 'A full Appraisal Report vs a Restricted Appraisal Report'],
  ['Special standards', 'Yellow Book, litigation or tax filing requirements'],
]

const faqs: FaqItem[] = [
  {
    q: 'What is the scope of work?',
    text: 'The plan for an appraisal: what interest is valued, which approaches are used, how much research and inspection are done, and what type of report is delivered. It follows from the intended use.',
    a: (
      <>
        The plan for an appraisal: what interest is valued, which approaches are used, how much research and inspection are
        done, and what type of report is delivered. It follows from the intended use.
      </>
    ),
  },
  {
    q: 'Why do you need to know the purpose of the appraisal?',
    text: 'The purpose determines the scope, the value definition, the effective date and the report type. A tax appeal, a loan and a lawsuit each need a different appraisal.',
    a: (
      <>
        The purpose determines the scope, the value definition, the effective date and the report type. A tax appeal, a loan
        and a lawsuit each need a different appraisal.
      </>
    ),
  },
  {
    q: 'What is an engagement letter?',
    text: "A written agreement setting out the client, intended users, intended use, property interest, fee and delivery date. Work starts once it's signed.",
    a: (
      <>
        A written agreement setting out the client, intended users, intended use, property interest, fee and delivery date.
        Work starts once it&apos;s signed.
      </>
    ),
  },
  {
    q: 'Will I see a draft before the final report?',
    text: 'On many assignments, yes, for factual review. The value conclusion remains our independent opinion.',
    a: <>On many assignments, yes, for factual review. The value conclusion remains our independent opinion.</>,
  },
  {
    q: 'Do you charge more for neighbor island properties?',
    text: 'Travel to the neighbor islands and the Pacific is included in the fee quoted in the engagement letter, so you know the full cost before work begins.',
    a: (
      <>
        Travel to the neighbor islands and the Pacific is included in the fee quoted in the engagement letter, so you know the
        full cost before work begins.
      </>
    ),
  },
  {
    q: 'Can you appraise a property as of a past date?',
    text: 'Yes. Retrospective appraisals are common for estates, litigation and tax appeals.',
    a: <>Yes. Retrospective appraisals are common for estates, litigation and tax appeals.</>,
  },
]

export default function OurProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'How a Benavente Group Appraisal Works',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          publisher: providerSchema,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Our Process"
        heading={'How a Benavente Group\n_Appraisal Works_'}
        subhead="A commercial appraisal follows six steps: an enquiry and conflict check, an agreed scope of work and fee, collection of documents, inspection and research, analysis and draft review, and the final report, plus testimony if needed. Knowing the steps, and sending the right documents early, is the simplest way to get a reliable report on time."
        image={HERO_IMAGE}
        imageAlt="Aerial view of green coastal hills and sea cliffs above deep blue water"
        breadcrumb={crumbs}
        formService={FORM_KEY}
        primaryHref="#inquiry"
        secondaryCta={{ label: 'Explore Services', href: '/services' }}
      />

      {/* Intro with step index */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
          <RevealOnScroll>
            <IntroHeading label="MAI & SRA Designated" title={'The Same Disciplined\n_Process_ Every Time'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              Every assignment at The Benavente Group, from a single-tenant building in Honolulu to a ranch on Hawaiʻi Island or
              a hotel in Guam, follows the same disciplined process. It&apos;s how our MAI and SRA designated appraisers deliver
              credible solutions and timely results across Hawaiʻi and the Pacific.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <ol className="border-t border-gold/20">
              {steps.map((step, i) => (
                <li key={step.id} className="border-b border-gold/20">
                  <a
                    href={`#${step.id}`}
                    className="group grid grid-cols-[44px_1fr] items-baseline py-4 transition-colors duration-300 hover:bg-gold/[0.05]"
                  >
                    <span className="font-serif text-[13px] tracking-[0.2em] text-gold pl-2">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-[21px] text-navy leading-[1.3] transition-colors duration-300 group-hover:text-gold-dark">
                      {step.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Step 1 */}
      <Section tone="cream" id="enquiry" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Step 01" title={'1. Enquiry and\n_Conflict Check_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>It starts with a short conversation or our enquiry form. We ask four things:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable caption="The four things we ask at the start" columns={['We ask about', 'Meaning']} rows={enquiryAsks} />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Before discussing the substance of any dispute, we run a conflict check on the parties and the property.
              Independence is the foundation of a credible appraisal, so we confirm it first.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Step 2 */}
      <Section id="scope" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          <div>
            <SectionHeader label="Step 02" title={'2. Scope of Work\n_and Fee_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  The scope of work defines what the appraisal will do: the property interest valued, the approaches developed,
                  the extent of research and inspection, and the type of report. It flows from the intended use. A lender&apos;s
                  appraisal, a tax appeal and a litigation report each need a different scope.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <RevealOnScroll>
              <p className="text-navy text-[17px] font-light leading-[1.85] mb-5">
                We then send an <strong className="font-medium">engagement letter</strong> setting out:
              </p>
            </RevealOnScroll>
            <Checklist items={engagementLetter} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-8">
                <p>Work begins once the engagement letter is signed.</p>
              </Prose>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* Step 3 */}
      <Section tone="cream" id="documents" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Step 03" title={'3. Documents\n_We Need_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>What we need depends on the property, but most commercial assignments call for:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Documents we need and why each matters"
          columns={['Document', 'Why it matters']}
          rows={documents}
          numbered
        />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              For construction projects, add plans, the budget and the schedule. Missing documents are the most common cause of
              delay, so we request them at the start and follow up early.
            </p>
          </Prose>
        </RevealOnScroll>
        <EditorialPlaceholder className="mt-8 max-w-[860px]" note="Link the downloadable checklist here." />
      </Section>

      {/* Step 4 */}
      <Section tone="navy" id="inspection" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader tone="navy" label="Step 04" title={'4. Inspection\n_and Research_'} />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                We inspect every property in person, inside and out, and photograph it by drone where useful. We research zoning,
                permits, State land use districts and county records, and verify comparable sales and leases with parties to the
                transactions where possible.
              </p>
              <p>
                This is the step where many valuation issues surface: an unrecorded use restriction, a discrepancy in county
                records, an easement that limits development. Finding them now protects the value later.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Step 5 */}
      <Section id="analysis" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Step 05" title={'5. Analysis, Draft\n_and Review_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                We develop the approaches to value the property and its market can support (income capitalization, sales
                comparison and cost) and reconcile them into a conclusion. For many assignments, we share a draft for factual
                review, so the client can confirm the property data before the report is final. A draft review is a check on
                facts, not an invitation to change the value. The opinion remains independent.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Step 6 */}
      <Section tone="cream" id="report" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Step 06" title={'6. Final Report\n_and Testimony_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                The final report is delivered on the agreed date. It is USPAP-compliant and written so its intended user can
                follow every step from evidence to conclusion.
              </p>
              <p>
                After delivery, we answer reviewer questions. If the matter goes to a hearing, deposition, arbitration or trial,
                we prepare with counsel and testify to our conclusions.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Islands */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader tone="navy" label="Logistics" title={'Appraisals on Oʻahu, the Neighbor _Islands and the Pacific_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose tone="navy">
              <p>Where the property sits shapes the logistics, not the standard of the work.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <ImageRows items={islands} />
        <RevealOnScroll delay={0.1}>
          <Prose tone="navy" className="mt-10 max-w-[760px]">
            <p>
              Neighbor island and Pacific travel is built into the fee and delivery date in the engagement letter, so there are no
              surprises.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Timelines */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Timing" title={'Typical\n_Timelines_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>Timelines depend on:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable caption="What appraisal timelines depend on" columns={['Factor', 'What varies']} rows={timelineFactors} />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>We confirm the delivery date in the engagement letter before work begins.</p>
          </Prose>
        </RevealOnScroll>
        <EditorialPlaceholder className="mt-8 max-w-[860px]" note="Add typical ranges once the firm confirms them." />
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

      <RelatedServices
        slugs={[
          'commercial-real-estate-appraisal',
          'litigation-support-expert-testimony',
          'market-studies',
          'portfolio-valuation',
        ]}
        plainTitles
      />
      <ServiceInquiry
        service={FORM_KEY}
        heading={'Ready for Credible,\n_Timely Results?_'}
        text="Tell us the property, the purpose, the date of value and the deadline."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

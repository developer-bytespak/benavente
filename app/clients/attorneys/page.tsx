import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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
  TextLink,
  EditorialTable,
  NumberedItems,
  Checklist,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'

const FORM_KEY = 'attorneys'
const URL_PATH = '/clients/attorneys'
const META_TITLE = 'Real Estate Appraisal Experts for Hawaii Attorneys'
const META_DESCRIPTION =
  'Court-ready appraisals for Honolulu and Hawaiʻi litigation, condemnation, estate and divorce matters, with expert disclosure support and MAI testimony.'
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

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'For Attorneys', href: URL_PATH },
]

const matters = [
  ['Real estate disputes, partition, divorce, damages', 'Appraisal, rebuttal review, testimony'],
  ['Condemnation and inverse condemnation', 'Just compensation, severance damages, testimony'],
  ['Probate, estate and trust', 'Date of death and trust-date values'],
  ['Ground lease rent reopenings', 'Land value and rate of return for the panel'],
  ['Property tax disputes', 'Over-assessment evidence for the Board of Review or Tax Appeal Court'],
  ['Luxury residential matters', <>Private, <TextLink href="/services/luxury-home-appraisal">retrospective home values</TextLink></>],
]

const preparation = [
  'Review the report with retaining counsel and identify the points the other side is likely to press',
  'Prepare clear exhibits for a lay fact-finder',
  'Review the opposing appraisal and prepare rebuttal where needed',
]

const venues = [
  ['First Circuit (Oʻahu)', 'Honolulu, Kapolei and the Windward and Central Oʻahu districts'],
  ['Second Circuit (Maui County)', 'Maui, Molokaʻi and Lānaʻi'],
  ['Third Circuit (Hawaiʻi Island)', 'Hilo and Kona'],
  ['Fifth Circuit (Kauaʻi)', 'Līhuʻe'],
  ['Federal court', 'The U.S. District Court for the District of Hawaiʻi'],
  ['Tax Appeal Court and county Boards of Review', <><TextLink href="/services/property-tax-appeal">Assessment disputes</TextLink></>],
  ['Arbitration and mediation', 'Lease rent panels and private dispute resolution'],
  ['Guam and the Northern Mariana Islands', 'Matters involving Pacific property'],
]

const appraisers = [
  { name: 'Fernando Benavente, MAI, SRA', role: 'Manager' },
  { name: 'Brian S. Goto, MAI, SRA', role: 'Appraiser Consultant' },
  { name: 'Randolph K. Flores, MAI, SRA', role: 'Appraiser Consultant' },
]

const faqs: FaqItem[] = [
  {
    q: 'When should I bring in a real estate appraiser?',
    text: 'As early as possible, ideally before the scope of work is fixed and before discovery closes. Early input shapes what evidence to gather and how the valuation question is framed.',
    a: (
      <>
        As early as possible, ideally before the scope of work is fixed and before discovery closes. Early input shapes
        what evidence to gather and how the valuation question is framed.
      </>
    ),
  },
  {
    q: 'Can you value a property as of a past date?',
    text: 'Yes. Retrospective appraisals are routine in litigation, for example as of a date of death, separation, breach, taking or loss.',
    a: (
      <>
        Yes. Retrospective appraisals are routine in litigation, for example as of a date of death, separation, breach,
        taking or loss.
      </>
    ),
  },
  {
    q: 'Can you review the opposing appraisal?',
    text: 'Yes. We prepare USPAP Standard 3 reviews, with or without our own opinion of value.',
    a: <>Yes. We prepare USPAP Standard 3 reviews, with or without our own opinion of value.</>,
  },
  {
    q: 'Do you work for plaintiffs and defendants?',
    text: 'We accept matters case by case after a conflict check. Our opinion is independent of the side that retains us.',
    a: <>We accept matters case by case after a conflict check. Our opinion is independent of the side that retains us.</>,
  },
  {
    q: 'Do you work on matters on Maui, Kauaʻi and the Big Island?',
    text: 'Yes. We support counsel across all four Hawaiʻi circuits, and in Guam, Saipan and the Marshall Islands.',
    a: <>Yes. We support counsel across all four Hawaiʻi circuits, and in Guam, Saipan and the Marshall Islands.</>,
  },
  {
    q: 'Do you work with mainland law firms?',
    text: 'Yes. Matters involving Hawaiʻi property are often handled by counsel outside the state, and we work with them directly.',
    a: (
      <>
        Yes. Matters involving Hawaiʻi property are often handled by counsel outside the state, and we work with them
        directly.
      </>
    ),
  },
]

export default function ForAttorneysPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Real Estate Appraisal and Expert Testimony for Attorneys',
          serviceType: 'Real estate appraisal and valuation support for attorneys',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="For Attorneys"
        heading={'Real Estate Appraisal and Expert\nTestimony for _Hawaiʻi Attorneys_'}
        subhead="Attorneys retain a real estate appraiser when property value is part of a case: a dispute, a condemnation, an estate, a divorce or a lease arbitration. The appraiser provides an independent, court-ready opinion of value, reviews the other side's appraisal, and testifies if needed. The firm's credentials, documentation and composure under cross-examination matter as much as the number."
        image={HERO_IMAGE}
        imageAlt="Downtown Honolulu office towers beyond Aliʻiōlani Hale and the King Kamehameha statue"
        breadcrumb={crumbs}
        formService={FORM_KEY}
        primaryHref="#inquiry"
        primaryLabel="Start a Conflict Check"
        secondaryCta={{ label: 'Download Our CVs', href: '/about' }}
      />

      {/* Intro */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/cbd/dji_0344.webp"
                  alt="Downtown Honolulu towers beside ʻIolani Palace and the Hawaiʻi State Capitol"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI & SRA Designated" title={'Written to Be Read\n_Line by Line_'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              The Benavente Group works with attorneys from our office on Fort Street Mall in downtown Honolulu, a short
              walk from the Bishop Street law firms and the courts, and with counsel across Maui, Hawaiʻi Island, Kauaʻi,
              the Pacific and the mainland. Our three principals hold the MAI and SRA designations from the Appraisal
              Institute, and our reports are written knowing they will be read line by line by opposing counsel.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Matter types */}
      <Section tone="cream">
        <SectionHeader label="Matters" title={'Matter Types\n_We Support_'} className="mb-12" />
        <EditorialTable
          caption="Matter types we support and our role in each"
          columns={['Matter', 'Our role']}
          rows={matters}
          numbered
        />
      </Section>

      {/* Defensible */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.3fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader label="The Audit Trail" title={'What Makes a Report _Defensible_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  Opposing experts look for gaps in the audit trail. A defensible appraisal leaves as few as possible. Our
                  reports are built to:
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <NumberedItems
              layout="rows"
              items={[
                {
                  title: 'Answer the legal question',
                  body: <p>The right property interest, the right effective date, the right definition of value for the matter.</p>,
                },
                {
                  title: 'Trace every input',
                  body: <p>Each sale, lease and adjustment linked to its source and verified where possible.</p>,
                },
                {
                  title: 'Explain, not assert',
                  body: <p>A reasoned path from evidence to conclusion that a judge or jury can follow.</p>,
                },
                {
                  title: 'Acknowledge limits',
                  body: <p>Stating plainly where data is thin, rather than leaving opposing counsel to find it.</p>,
                },
                {
                  title: 'Withstand review',
                  body: <p>Prepared to USPAP, and ready for a <TextLink href="/services/real-estate-consulting">Standard 3 review</TextLink> by the other side.</p>,
                },
              ]}
            />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-10">
                <p>
                  In Hawaiʻi&apos;s island markets, with few comparable sales, this discipline matters more than on the
                  mainland. Every comparable choice will be questioned. We show our reasoning.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* Testimony */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <div>
            <SectionHeader tone="navy" label="Testimony" title={'Testimony and\n_Deposition Preparation_'} />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-6">
                <p>Good testimony starts long before the courtroom. Before a deposition, hearing or trial, we:</p>
              </Prose>
            </RevealOnScroll>
          </div>
          <div>
            <Checklist items={preparation} tone="navy" />
            <RevealOnScroll delay={0.1}>
              <Prose tone="navy" className="mt-10">
                <p>
                  <TextLink tone="navy" href="/services/litigation-support-expert-testimony">On the stand</TextLink>, our aim is to explain the method plainly, concede what should be conceded, and hold firm
                  where the evidence supports the conclusion.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
        </div>
        <RevealOnScroll>
          <div className="relative border border-white/15 rounded-[2px] p-8 sm:p-10 mt-14">
            <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
            <h3 className="font-serif text-[26px] text-white leading-[1.2]">Expert Disclosure</h3>
            <p className="text-white/[0.62] text-[16px] font-light leading-[1.8] mt-3 max-w-[900px]">
              Tell us the disclosure date at the first call. We confirm before engagement whether we can deliver a complete
              report in time for disclosure under Rule 26 and the court&apos;s scheduling order. Drafts and communications
              are handled as retaining counsel directs.
            </p>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Courts */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Venues" title={'Courts and Venues Across _Hawaiʻi and the Pacific_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>We support counsel on matters venued across the islands and the region:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable caption="Courts and venues where we support counsel" columns={['Venue', 'Covering']} rows={venues} />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-12 max-w-[860px]">
            <p>
              Mainland law firms handling matters with Hawaiʻi property work with us directly. We provide local market
              knowledge, on-site inspection and county records research that are hard to obtain from a distance.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Conflicts and engagement */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.3fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader label="Working Together" title={'Conflicts, Engagement _and Fees_'} />
          </div>
          <div>
            <NumberedItems
              layout="rows"
              items={[
                {
                  title: 'Conflict check',
                  body: <p>Send the parties, the property and the matter type. We confirm we have no conflict before discussing substance.</p>,
                },
                {
                  title: 'Consultation',
                  body: <p>We discuss the valuation issues and the dates, and whether you need a consulting or a testifying expert.</p>,
                },
                {
                  title: 'Engagement letter',
                  body: <p>Scope, rates, retainer and deliverables are set out in writing.</p>,
                },
                {
                  title: 'Work and reporting',
                  body: <p>Inspection, research and a report timed to your schedule.</p>,
                },
                {
                  title: 'Testimony',
                  body: <p>Preparation with counsel, then deposition, hearing or trial.</p>,
                },
              ]}
            />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-10">
                <p>
                  We can be retained first as a consulting expert to test a valuation position privately, then designated
                  to testify if the case proceeds. Rates and an estimate are given at engagement.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* CVs */}
      <Section>
        <SectionHeader label="Credentials" title={"Our Appraisers'\n_CVs_"} className="mb-12" />
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {appraisers.map((person, i) => (
            <li key={person.name}>
              <RevealOnScroll delay={i * 0.08} className="h-full">
                <Link
                  href="/about"
                  className="group block h-full bg-cream border border-gold/25 hover:border-gold rounded-[2px] p-7 transition-colors duration-300"
                >
                  <span className="block font-serif text-[24px] text-navy leading-[1.2] group-hover:text-gold-dark transition-colors duration-300">
                    {person.name}
                  </span>
                  <span className="block text-slate text-[15px] font-light mt-2">{person.role}</span>
                  <span className="block text-gold-dark text-[13px] font-serif tracking-[0.1em] uppercase mt-5">
                    View CV <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </RevealOnScroll>
            </li>
          ))}
        </ul>
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-10 max-w-[860px]">
            <p>
              Each principal&apos;s <TextLink href="/about">bio page</TextLink> includes a downloadable CV with designations, licenses, education,
              property-type experience and testimony history. Attorneys check this before they call.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="Please extend a heartfelt thank you to your staff. It seems to be a constant baptism by fire with our assignments."
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
          'litigation-support-expert-testimony',
          'eminent-domain-condemnation',
          'estate-trust-appraisal',
          'property-tax-appeal',
        ]}
        plainTitles
      />
      <ServiceInquiry
        service={FORM_KEY}
        heading={'Ready for Credible,\n_Timely Results?_'}
        text="Send the parties, the property and the key dates for a conflict check."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

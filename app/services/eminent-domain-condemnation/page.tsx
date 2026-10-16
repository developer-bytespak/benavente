import type { Metadata } from 'next'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
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
  ProcessSteps,
  Quote,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getService } from '@/lib/services'

const SLUG = 'eminent-domain-condemnation'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Eminent Domain Appraiser in Hawaii | Condemnation Appraisal'
const META_DESCRIPTION =
  'MAI-designated eminent domain and condemnation appraisals in Hawaiʻi: just compensation, partial takings, right-of-way, easements and Yellow Book assignments.'
const HERO_IMAGE = '/images/gallery/vacant-land/dji_0025.webp'

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
  { label: 'Eminent Domain', href: URL_PATH },
]

const clientGroups = [
  {
    title: 'State and county agencies',
    desc: 'Acquisitions for roads, transit, utilities, parks and public facilities.',
  },
  {
    title: 'Federal agencies and contractors',
    desc: 'Acquisitions requiring Yellow Book (UASFLA) standards.',
  },
  {
    title: 'Property owners and their attorneys',
    desc: "Independent analysis of the condemning authority's offer.",
  },
]

const projects = [
  'Highway widening and new interchanges',
  'Transit alignments and stations',
  'Water, sewer and drainage improvements',
  'Utility corridors',
  'Harbor and airport expansion',
  'School and park sites',
  'Shoreline protection',
]

const assignments = [
  ['Whole taking', 'Market value of the entire property as of the valuation date'],
  ['Partial taking', 'Value of the part taken plus damage to the remainder, using the before-and-after method'],
  ['Severance damages', 'Loss in value to the remaining property caused by the taking'],
  ['Special benefits', "Any increase in the remainder's value from the public project"],
  ['Right-of-way and easement appraisal', 'Value of permanent and temporary easements and access changes'],
  ['Inverse condemnation', 'Value lost when government action effectively takes property without formal proceedings'],
  ['Appraisal review', 'Review of the opposing or agency appraisal'],
  ['Testimony', 'Deposition and trial testimony in condemnation proceedings'],
]

const beforeAfter = [
  {
    title: 'Before value',
    desc: 'The market value of the larger parcel as a whole, as of the date of summons, before the taking.',
  },
  {
    title: 'After value',
    desc: 'The market value of the remainder after the taking, considering the project as proposed.',
  },
  {
    title: 'The difference',
    desc: 'The loss in value, which includes the part taken and any damage to the remainder.',
  },
]

const faqs: FaqItem[] = [
  {
    q: 'What is just compensation?',
    text: 'Generally, the market value of the property taken plus any damage to the remainder. Our guide to just compensation in eminent domain covers it in depth.',
    a: (
      <>
        Generally, the market value of the property taken plus any damage to the remainder. Our guide to{' '}
        <TextLink href={guide('what-is-just-compensation-in-eminent-domain')}>
          just compensation in eminent domain
        </TextLink>{' '}
        covers it in depth.
      </>
    ),
  },
  {
    q: 'What date is the property valued as of?',
    text: 'In Hawaiʻi condemnation actions, the date of summons, under HRS §101-24.',
    a: <>In Hawaiʻi condemnation actions, the date of summons, under HRS §101-24.</>,
  },
  {
    q: 'Do you work for property owners or agencies?',
    text: 'Both, on separate matters after a conflict check.',
    a: <>Both, on separate matters after a conflict check.</>,
  },
  {
    q: 'What is a Yellow Book appraisal?',
    text: 'An appraisal under the Uniform Appraisal Standards for Federal Land Acquisitions, required for many federal acquisitions. See our Yellow Book guide.',
    a: (
      <>
        An appraisal under the Uniform Appraisal Standards for Federal Land Acquisitions, required for many federal
        acquisitions. See our <TextLink href={guide('what-is-a-yellow-book-appraisal')}>Yellow Book guide</TextLink>.
      </>
    ),
  },
  {
    q: 'The agency made an offer. Should I get my own appraisal?',
    text: 'An independent appraisal shows whether the offer reflects market value and any severance damages. Your attorney can advise on timing.',
    a: (
      <>
        An independent appraisal shows whether the offer reflects market value and any severance damages. Your attorney
        can advise on timing.
      </>
    ),
  },
  {
    q: 'What is a quick take?',
    text: 'A procedure allowing the condemning authority to take possession before compensation is finally decided, usually after depositing estimated compensation with the court. See our guide to quick take in eminent domain.',
    a: (
      <>
        A procedure allowing the condemning authority to take possession before compensation is finally decided, usually
        after depositing estimated compensation with the court. See our guide to{' '}
        <TextLink href={guide('what-is-a-quick-take-in-eminent-domain')}>quick take in eminent domain</TextLink>.
      </>
    ),
  },
  {
    q: 'What is inverse condemnation?',
    text: 'A claim by an owner that government action has effectively taken or damaged property without formal condemnation. We value the loss as in any taking. See our inverse condemnation guide.',
    a: (
      <>
        A claim by an owner that government action has effectively taken or damaged property without formal
        condemnation. We value the loss as in any taking. See our{' '}
        <TextLink href={guide('what-is-inverse-condemnation-in-real-estate')}>inverse condemnation guide</TextLink>.
      </>
    ),
  },
  {
    q: 'Are temporary construction easements compensated?',
    text: 'Generally, yes. Value is usually measured as a rental value for the land used over the term of the easement, plus any lasting damage.',
    a: (
      <>
        Generally, yes. Value is usually measured as a rental value for the land used over the term of the easement,
        plus any lasting damage.
      </>
    ),
  },
  {
    q: 'Is a jury or a judge deciding the value?',
    text: 'It depends on the proceeding. Our guide to bench trials vs jury trials in eminent domain explains the difference.',
    a: (
      <>
        It depends on the proceeding. Our guide to{' '}
        <TextLink href={guide('what-is-a-bench-trial-vs-jury-trial-in-eminent-domain')}>
          bench trials vs jury trials in eminent domain
        </TextLink>{' '}
        explains the difference.
      </>
    ),
  },
]

// Two adjoining lots under common ownership and unified use, measured together
// as the larger parcel, with a frontage strip taken for the project.
function LargerParcelDiagram() {
  return (
    <figure>
      <svg
        viewBox="0 0 400 270"
        role="img"
        aria-labelledby="larger-parcel-title"
        className="w-full h-auto font-serif"
      >
        <title id="larger-parcel-title">
          Two adjoining lots with separate tax map keys measured together as the larger parcel, with a strip along the
          road frontage taken for a public project
        </title>
        {/* Larger parcel outline */}
        <rect x="12" y="12" width="376" height="186" fill="none" stroke="#B8935A" strokeWidth="1.5" strokeDasharray="6 5" />
        <text x="24" y="32" fontSize="11" letterSpacing="2" fill="#9A7840">LARGER PARCEL</text>
        {/* Lots */}
        <rect x="28" y="44" width="166" height="140" fill="#FDFBF8" stroke="#0B1F3A" strokeOpacity="0.45" />
        <rect x="206" y="44" width="166" height="140" fill="#FDFBF8" stroke="#0B1F3A" strokeOpacity="0.45" />
        <text x="111" y="96" fontSize="15" textAnchor="middle" fill="#0B1F3A">TMK A</text>
        <text x="289" y="96" fontSize="15" textAnchor="middle" fill="#0B1F3A">TMK B</text>
        <text x="111" y="118" fontSize="12" textAnchor="middle" fill="#5C6478">Remainder</text>
        <text x="289" y="118" fontSize="12" textAnchor="middle" fill="#5C6478">Remainder</text>
        {/* Part taken along the frontage */}
        <rect x="28" y="160" width="344" height="24" fill="#E6D5B8" stroke="#B8935A" />
        <text x="200" y="176" fontSize="11" letterSpacing="2" textAnchor="middle" fill="#0B1F3A">PART TAKEN</text>
        {/* Road */}
        <rect x="0" y="214" width="400" height="38" fill="#0B1F3A" />
        <line x1="0" y1="233" x2="400" y2="233" stroke="#CFA96E" strokeWidth="1.5" strokeDasharray="14 10" />
        <text x="200" y="266" fontSize="11" letterSpacing="2" textAnchor="middle" fill="#5C6478">
          PUBLIC ROAD PROJECT
        </text>
      </svg>
    </figure>
  )
}

export default function EminentDomainPage() {
  const service = getService(SLUG)!

  return (
    <>
      <JsonLd data={breadcrumbSchema([...crumbs.slice(0, 2), { label: 'Eminent Domain & Condemnation', href: URL_PATH }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Eminent Domain & Condemnation Appraisal',
          serviceType: 'Eminent domain and condemnation appraisal',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Eminent Domain & Condemnation"
        heading={'Eminent Domain Appraisal for\n_Just Compensation_ in Hawaiʻi'}
        subhead="When public projects require private land, the value of what is taken, and what is left, must be measured precisely. The Benavente Group provides eminent domain and condemnation appraisals across Hawaiʻi and the Pacific for government agencies, property owners and the attorneys who represent them."
        image={HERO_IMAGE}
        imageAlt="Roadway through open land above a coastal community on Maui"
        breadcrumb={crumbs}
        number="04"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Discuss an Acquisition"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Stakes */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden">
                <Image
                  src="/images/regions/oahu-valley.webp"
                  alt="Oʻahu valley land and surrounding development"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <SectionLabel>Condemnation Valuation</SectionLabel>
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              Few appraisal assignments carry higher stakes or closer scrutiny. Condemnation valuation follows its own
              legal rules: a fixed valuation date, the larger parcel concept, severance damages and special benefits.
              Mainland experience doesn&apos;t automatically translate to Hawaiʻi. Our MAI-designated appraisers combine
              that legal framework with deep knowledge of island land, leasehold interests and the thin sales data that
              make Hawaiʻi takings so difficult to value.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Clients and projects */}
      <Section tone="cream">
        <SectionHeader
          label="Who We Work With"
          title={'Agencies, Owners and\n_Condemnation Counsel_'}
          className="max-w-[760px]"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 mt-12 border-t border-gold/25">
          {clientGroups.map((c, i) => (
            <RevealOnScroll key={c.title} delay={i * 0.08}>
              <div
                className={`h-full py-7 md:px-7 border-b md:border-b-0 border-gold/25 ${
                  i > 0 ? 'md:border-l' : 'md:pl-0'
                }`}
              >
                <h3 className="font-serif text-[24px] text-navy leading-[1.2]">{c.title}</h3>
                <p className="text-navy/75 text-[16px] font-light leading-[1.75] mt-3">{c.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll>
          <div className="relative bg-white border border-gold/25 rounded-[2px] px-8 py-6 mt-10">
            <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              We accept assignments matter by matter after a conflict check, so our independence is never in question.
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll className="mt-14">
          <p className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium">
            Projects that commonly require acquisitions
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 mt-4 border-t border-gold/25">
            {projects.map((p) => (
              <li key={p} className="flex items-start gap-4 py-4 border-b border-gold/25 font-serif text-[19px] text-navy leading-[1.4]">
                <span aria-hidden="true" className="mt-[11px] w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {p}
              </li>
            ))}
          </ul>
          <Prose className="mt-8">
            <p>Each raises different questions about access, utility and the remainder&apos;s value.</p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Assignment types */}
      <Section>
        <SectionHeader label="Assignments" title={'Valuation for Every\n_Stage_ of a Taking'} className="mb-12" />
        <EditorialTable
          caption="Eminent domain appraisal assignments and what each answers"
          columns={['Assignment', 'What it answers']}
          rows={assignments}
        />
      </Section>

      {/* Partial takings */}
      <Section tone="navy">
        <div className="mb-14">
          <SectionHeader
            tone="navy"
            label="Before-and-After Method"
            title={'Partial Takings: Measuring What Is\nTaken and _What Is Left_'}
          />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy" className="mt-6 max-w-[880px]">
              <p>
                Most acquisitions take only part of a property: a strip along a frontage, a corner for an intersection,
                or an easement for a utility line. The value of the part taken is only half the question. The other half
                is what happens to the remainder.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <RevealOnScroll>
          <p className="text-gold-light text-[12px] tracking-[0.2em] uppercase font-serif font-medium mb-6">
            We use the before-and-after method
          </p>
        </RevealOnScroll>
        <ol className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-4 lg:gap-6">
          {beforeAfter.map((step, i) => (
            <li key={step.title} className="contents">
              <RevealOnScroll delay={i * 0.15} className="h-full">
                <div
                  className={`h-full border rounded-[2px] p-7 ${
                    i === 2 ? 'border-gold bg-navy-light' : 'border-white/15 bg-navy'
                  }`}
                >
                  <h3 className={`font-serif text-[26px] leading-[1.2] ${i === 2 ? 'text-gold-light' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  <p className="text-white/[0.62] text-[16px] font-light leading-[1.75] mt-3">{step.desc}</p>
                </div>
              </RevealOnScroll>
              {i < beforeAfter.length - 1 && (
                <span
                  aria-hidden="true"
                  className="self-center justify-self-center font-serif font-light text-[44px] leading-none text-gold-light"
                >
                  {i === 0 ? '−' : '='}
                </span>
              )}
            </li>
          ))}
        </ol>
        <RevealOnScroll>
          <Prose tone="navy" className="mt-12 max-w-[880px]">
            <p>
              Where the project changes access, parking, visibility, building setbacks or the usable shape of the site,
              the remainder can lose value well beyond the land taken. Equally, a project can benefit a remainder, for
              example through new frontage or better access. Hawaiʻi law addresses how special benefits are treated. Our
              guide to{' '}
              <TextLink tone="navy" href={guide('what-is-a-special-benefit-in-eminent-domain')}>
                special benefits in eminent domain
              </TextLink>{' '}
              explains the issue.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Larger parcel */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <SectionHeader label="The First Question" title={'The Larger\n_Parcel_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  Identifying the larger parcel is often the first contested question. It is the property against which
                  the taking is measured, and may include adjoining lots under common ownership and unified use, even if
                  they have separate tax map keys. Defining it correctly can change the result significantly, and we
                  address it explicitly in every report.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15}>
            <div className="bg-white border border-gold/20 rounded-[2px] p-6 sm:p-8">
              <LargerParcelDiagram />
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Hawaii rules */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Hawaiʻi Law" title={"Hawaiʻi's Rules Shape\nthe _Valuation_"} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                Under HRS §101-24, compensation and damages are measured as of the date of summons, and improvements added
                after the summons is served are excluded. A value dated even weeks from that date can be challenged. We tie
                every analysis to the correct date from the start.
              </p>
              <p>
                Island conditions add more. Takings often involve leasehold interests, agricultural or conservation land,
                and remainders whose access or utility changes sharply. Thin sales data means every adjustment for size,
                shape and access must be explained, not assumed.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          <RevealOnScroll>
            <div className="relative h-full bg-cream border border-gold/20 rounded-[2px] p-8 sm:p-10">
              <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
              <h3 className="font-serif text-[26px] text-navy leading-[1.2]">Leasehold and multiple interests</h3>
              <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-4">
                When land under a ground lease is taken, compensation may need to be divided among the fee owner, the
                lessee and any sublessees. Hawaiʻi courts have applied the undivided fee rule in some cases, valuing the
                property as a whole before apportionment. We value the property and analyze the interests as the legal
                framework requires, working closely with counsel.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="relative h-full bg-cream border border-gold/20 rounded-[2px] p-8 sm:p-10">
              <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
              <h3 className="font-serif text-[26px] text-navy leading-[1.2]">Blight of summons</h3>
              <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-4">
                Where a property&apos;s use or value is affected between the date of summons and payment, Hawaiʻi law may
                provide for blight of summons damages. We work with counsel on the valuation evidence these claims
                require.
              </p>
            </div>
          </RevealOnScroll>
        </div>
        <RevealOnScroll>
          <p className="text-slate text-[14px] font-light leading-[1.7] mt-8">
            This page is general information, not legal advice.
          </p>
        </RevealOnScroll>
      </Section>

      {/* Yellow Book */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader tone="navy" label="Federal Acquisitions" title={'Yellow Book Appraisal\nand the _Uniform Act_'} />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                Acquisitions by federal agencies generally require appraisals under the Uniform Appraisal Standards for
                Federal Land Acquisitions (UASFLA, or the Yellow Book). The Yellow Book differs from USPAP in important
                ways. It treats the larger parcel, project influence and highest and best use in its own way, and
                generally requires the appraiser to disregard the project&apos;s influence on value.
              </p>
              <p>
                Many state and county projects funded with federal money must also follow the Uniform Relocation
                Assistance and Real Property Acquisition Policies Act. We prepare reports that meet the standard the
                acquiring agency requires.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Process */}
      <Section tone="cream">
        <SectionHeader label="Our Process" title={'From Project Plans to\n_Final Compensation_'} className="mb-14" />
        <ProcessSteps
          steps={[
            {
              title: 'Review the taking',
              body: 'Right-of-way plans, legal descriptions, and the before and after condition of the property.',
            },
            {
              title: 'Inspect and research',
              body: 'Site inspection with the owner where appropriate, county records, zoning and comparable sales.',
            },
            {
              title: 'Value before and after',
              body: 'Market value of the larger parcel, the part taken and the remainder, with damages and benefits identified.',
            },
            {
              title: 'Report and testify',
              body: 'A report that meets state, federal or Yellow Book standards as required, with testimony if the case proceeds.',
            },
          ]}
        />
      </Section>

      {/* Owners and agencies */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevealOnScroll>
            <div className="h-full border border-gold/25 rounded-[2px] p-8 sm:p-12">
              <SectionLabel>For Property Owners</SectionLabel>
              <h2 className="font-serif text-[clamp(30px,3.2vw,40px)] text-navy leading-[1.2]">
                When the Government Wants <span className="italic text-gold">Your Property</span>
              </h2>
              <Prose className="mt-6">
                <p>
                  If you&apos;ve received a notice of intent to acquire or an offer from an agency, an independent appraisal
                  is the clearest way to test it. The agency&apos;s appraisal may undervalue the remainder damages, use the
                  wrong larger parcel, or overlook a higher and better use.
                </p>
                <p>
                  We value the property independently and explain our findings to you and your attorney in plain terms. If
                  the matter goes to trial, we testify to our conclusions. Our guide to{' '}
                  <TextLink href={guide('what-is-eminent-domain-in-real-estate')}>eminent domain in real estate</TextLink>{' '}
                  is a helpful starting point.
                </p>
              </Prose>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="h-full bg-navy rounded-[2px] p-8 sm:p-12">
              <SectionLabel variant="light">For Acquiring Agencies</SectionLabel>
              <h2 className="font-serif text-[clamp(30px,3.2vw,40px)] text-white leading-[1.2]">
                Supportable Offers, <span className="italic text-gold-light">Fewer Disputes</span>
              </h2>
              <Prose tone="navy" className="mt-6">
                <p>
                  For acquiring agencies, a well-supported appraisal leads to offers that owners are more likely to accept
                  and that hold up if challenged.
                </p>
                <p>
                  We deliver reports to fit project timelines, coordinate with right-of-way staff and review appraisers,
                  and prepare clear exhibits for negotiations and hearings. Our{' '}
                  <TextLink tone="navy" href={guide('what-is-a-right-of-way-appraisal')}>
                    right-of-way appraisal guide
                  </TextLink>{' '}
                  covers the process in more depth.
                </p>
              </Prose>
            </div>
          </RevealOnScroll>
        </div>
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

      <RelatedServices service={service} plainTitles />
      <ServiceInquiry
        service={SLUG}
        heading={'Discuss an\n_Acquisition_'}
        text="Tell us about the project, the property and the key dates, including any date of summons. We will run a conflict check and respond promptly with scope and next steps."
        image="/images/regions/oahu-valley.webp"
      />
      <StickyInquiryButton />
    </>
  )
}

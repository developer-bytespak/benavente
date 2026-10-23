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
  ProcessSteps,
  Checklist,
  Quote,
  IntroHeading,
  faqSchema,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { getService } from '@/lib/services'

const SLUG = 'estate-trust-appraisal'
const URL_PATH = `/services/${SLUG}`
const META_TITLE = 'Date of Death Appraisal in Hawaii | Estate & Trust Appraisals'
const META_DESCRIPTION =
  'Date of death, probate, estate and trust appraisals for Hawaiʻi executors, trustees and estate attorneys. MAI and SRA designated, USPAP-compliant reports.'
const HERO_IMAGE = '/images/gallery/luxury-residential/dji_0858.webp'

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
  { label: 'Estate & Trust', href: URL_PATH },
]

const clientGroups = [
  { title: 'Estate and trust attorneys', desc: 'Appraisals timed to filing deadlines, delivered to counsel.' },
  {
    title: 'Executors and personal representatives',
    desc: 'Clear values for the estate inventory, administration and distribution.',
  },
  { title: 'Trustees', desc: 'Valuations for trust funding, distribution, division and periodic reporting.' },
  { title: 'CPAs and family offices', desc: 'Support for estate and gift tax returns and basis records.' },
]

const assignments = [
  ['Date of death appraisal', "Retrospective value as of the decedent's death, for estate tax and basis"],
  ['Probate appraisal', 'Fair market value for the estate inventory and court administration'],
  ['Alternate valuation date', 'Value six months after death, when the estate elects it'],
  ['Trust funding and distribution', 'Values when property moves into or out of a trust'],
  ['Gift appraisal', 'Value of real property gifted during life'],
  ['Fractional interest appraisal', 'Value of a partial or undivided interest, such as a share in family land'],
]

const propertyKinds = [
  'Family homes and condominiums, including luxury and oceanfront residences',
  'Rental property, from single-family rentals to apartment buildings',
  'Commercial property, including office, retail and industrial buildings held by a family or trust',
  'Leasehold and leased fee interests, including homes on leased land and land held under ground lease',
  'Agricultural and ranch land on any island',
  'Undivided family land, including kuleana parcels shared among many heirs',
  'Property in Guam, Saipan and other Pacific islands held by Hawaiʻi residents',
]

const consequences = [
  { title: 'Federal estate tax', desc: 'The date of death value sets any federal estate tax owed.' },
  { title: 'Hawaiʻi estate tax', desc: 'Hawaiʻi imposes its own estate tax separately.' },
  { title: 'Stepped-up basis', desc: 'It establishes the basis heirs will use when they later sell.' },
]

const receive = [
  'The market value conclusion as of the date of death (and alternate valuation date if requested)',
  'The interest appraised, whether fee simple, leased fee, leasehold or a fractional interest',
  'A description of the property and its condition as of the valuation date, with photographs',
  'The market evidence and analysis supporting the value',
  "The appraiser's qualifications and USPAP certification",
  'A report format suitable for the estate inventory and for estate and gift tax returns',
]

// Key dates after a death, drawn from the copy on this page.
const timeline = [
  { when: 'Date of death', what: 'The valuation date for the estate' },
  { when: 'Within 3 months', what: 'Estate inventory, after the personal representative is appointed (HRS §560:3-706)' },
  { when: '6 months', what: 'Alternate valuation date, if the estate elects it' },
  { when: '9 months', what: 'Federal estate tax return (Form 706) generally due, unless extended' },
]

const faqs: FaqItem[] = [
  {
    q: 'Can you appraise a property as of a date in the past?',
    text: 'Yes. Date of death appraisals are retrospective by nature. We value the property using market evidence as it stood on that date.',
    a: (
      <>
        Yes. Date of death appraisals are retrospective by nature. We value the property using market evidence as it
        stood on that date.
      </>
    ),
  },
  {
    q: 'Does a Hawaiʻi probate require an appraisal?',
    text: 'The personal representative must list each asset at its date of death fair market value on the estate inventory, and may employ a qualified and disinterested appraiser where value is in reasonable doubt. Your attorney will advise whether an appraisal is needed for your estate.',
    a: (
      <>
        The personal representative must list each asset at its date of death fair market value on the estate inventory,
        and may employ a qualified and disinterested appraiser where value is in reasonable doubt. Your attorney will
        advise whether an appraisal is needed for your estate.
      </>
    ),
  },
  {
    q: 'Do you appraise homes as well as commercial property?',
    text: 'Yes. Our SRA-designated appraisers handle residential estates, including luxury property, alongside commercial and land holdings.',
    a: (
      <>
        Yes. Our SRA-designated appraisers handle residential estates, including luxury property, alongside commercial
        and land holdings.
      </>
    ),
  },
  {
    q: 'What if the estate is disputed?',
    text: 'If heirs or parties disagree on value, see our litigation support appraiser services.',
    a: (
      <>
        If heirs or parties disagree on value, see our{' '}
        <TextLink href="/services/litigation-support-expert-testimony">litigation support appraiser services</TextLink>.
      </>
    ),
  },
  {
    q: 'Is an appraisal required for estate tax?',
    text: 'If an estate tax return is filed, real property must be reported at fair market value, and a qualified appraisal is the accepted way to support it. Your attorney or CPA will advise on filing requirements.',
    a: (
      <>
        If an estate tax return is filed, real property must be reported at fair market value, and a qualified appraisal
        is the accepted way to support it. Your attorney or CPA will advise on filing requirements.
      </>
    ),
  },
  {
    q: 'What does a trust appraisal involve?',
    text: 'The same rigor as a date of death appraisal, at the date the trust event occurs, such as funding, distribution or division.',
    a: (
      <>
        The same rigor as a date of death appraisal, at the date the trust event occurs, such as funding, distribution or
        division.
      </>
    ),
  },
  {
    q: 'Can you appraise a property years after the death?',
    text: 'Yes. Retrospective appraisals can be prepared long after the date of value, using the market evidence available at that time.',
    a: (
      <>
        Yes. Retrospective appraisals can be prepared long after the date of value, using the market evidence available
        at that time.
      </>
    ),
  },
  {
    q: 'Do you need to inspect the property?',
    text: 'We inspect wherever possible. If the property has changed or been sold since the date of death, we rely on records, photographs and interviews to document its earlier condition.',
    a: (
      <>
        We inspect wherever possible. If the property has changed or been sold since the date of death, we rely on
        records, photographs and interviews to document its earlier condition.
      </>
    ),
  },
  {
    q: 'Can you appraise a gift of real property?',
    text: 'Yes. Gifts of real estate during life need a value as of the date of the gift for gift tax reporting, and we prepare these to the same standard.',
    a: (
      <>
        Yes. Gifts of real estate during life need a value as of the date of the gift for gift tax reporting, and we
        prepare these to the same standard.
      </>
    ),
  },
  {
    q: 'How quickly can you deliver?',
    text: 'We set a delivery date at engagement based on the filing deadline. Tell us the deadline when you first call.',
    a: <>We set a delivery date at engagement based on the filing deadline. Tell us the deadline when you first call.</>,
  },
  {
    q: 'Do you work with attorneys outside Hawaiʻi?',
    text: 'Yes. Estates administered elsewhere often include Hawaiʻi property, and we work with counsel wherever they are based.',
    a: (
      <>
        Yes. Estates administered elsewhere often include Hawaiʻi property, and we work with counsel wherever they are
        based.
      </>
    ),
  },
]

export default function EstateTrustPage() {
  const service = getService(SLUG)!

  return (
    <>
      <JsonLd data={breadcrumbSchema([...crumbs.slice(0, 2), { label: 'Estate & Trust Appraisal', href: URL_PATH }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Estate & Trust Appraisal',
          serviceType: 'Date of death, probate, estate and trust appraisal',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          provider: providerSchema,
          areaServed: providerSchema.areaServed,
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ServiceHero
        compact
        eyebrow="Estate & Trust Appraisal"
        heading={'Date of Death Appraisals\nfor _Hawaiʻi Estates & Trusts_'}
        subhead="When an estate or trust holds real property, its value as of the date of death sets any tax owed, the beneficiaries' new basis and how assets are divided. The Benavente Group prepares date of death, probate, estate and trust appraisals for executors, trustees and estate attorneys across Hawaiʻi, written to stand up to IRS and Department of Taxation review."
        image={HERO_IMAGE}
        imageAlt="Oceanfront residence on Oʻahu's North Shore"
        breadcrumb={crumbs}
        number="07"
        formService={SLUG}
        primaryHref="#inquiry"
        primaryLabel="Discuss an Estate"
        secondaryCta={{ label: 'View Our Work', href: '/gallery' }}
      />

      {/* Families + one team */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <RevealOnScroll className="self-stretch">
            <div className="relative h-full min-h-[340px] lg:min-h-[460px]">
              <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-[2px] overflow-hidden group">
                <Image
                  src="/images/gallery/luxury-residential/dji_0514.webp"
                  alt="Drone view of a residence beside a golf course on Hawaiʻi Island"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-[18px] -right-[18px] w-[45%] h-[45%] border border-gold/30 -z-[1]" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <IntroHeading label="MAI & SRA Designated" title={'One Team for _Every Asset_\nin the Estate'} />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              We understand that estate work comes at a difficult time for families. Our role is to make one part of it
              straightforward: a clear, well-supported value, delivered on schedule to the attorney or representative
              handling the estate. Our principals hold both the MAI designation for commercial property and the SRA
              designation for residential property. So an estate holding a family home, a rental building and a parcel of
              land can be valued by one team, on one consistent basis.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Who */}
      <Section tone="cream">
        <SectionHeader
          label="Who We Work With"
          title={'Executors, Trustees\nand _Estate Counsel_'}
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
        <RevealOnScroll>
          <div className="relative bg-white border border-gold/25 rounded-[2px] px-8 py-7 mt-12">
            <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
            <p className="text-navy text-[17px] font-light leading-[1.75]">
              Estate attorneys work to statutory deadlines and need an appraiser they can rely on. We keep communication
              with counsel direct and timely. We flag issues early, such as a lease that affects value, an unrecorded
              easement or a fractional interest. And we deliver a report counsel can file with confidence.
            </p>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Assignments */}
      <Section>
        <SectionHeader label="Assignments" title={'Appraisals for Every\n_Stage of an Estate_'} className="mb-12" />
        <EditorialTable
          caption="Estate and trust appraisal assignments and when each is needed"
          columns={['Assignment', "When it's needed"]}
          rows={assignments}
        />
      </Section>

      {/* Probate */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader
            tone="navy"
            label="Hawaiʻi Probate"
            title={'Probate Appraisal and the\n_Hawaiʻi Estate Inventory_'}
          />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                Under HRS §560:3-706, a personal representative must prepare an inventory of the decedent&apos;s property
                within three months of appointment. Each item is listed at its fair market value as of the date of death.
                Real estate is often the largest and hardest item to value.
              </p>
              <p>
                HRS §560:3-707 allows the personal representative to employ a qualified and disinterested appraiser for
                any asset whose value may be in reasonable doubt, and the appraiser&apos;s name and address appear on the
                inventory. As independent, credentialed appraisers, we provide that support for estates holding Hawaiʻi
                real property. Our guide to{' '}
                <TextLink tone="navy" href={guide('what-is-a-probate-real-estate-appraisal')}>
                  probate real estate appraisal
                </TextLink>{' '}
                explains the process.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Property kinds */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
          <SectionHeader label="Property Types" title={'Every Kind of Property\nan _Estate May Hold_'} />
          <Checklist items={propertyKinds} />
        </div>
      </Section>

      {/* Retrospective */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
          <div>
            <SectionHeader label="Retrospective Appraisal" title={'Market Value as of\nthe _Date of Death_'} />
            <RevealOnScroll delay={0.1}>
              <p className="font-serif italic text-[clamp(22px,2.4vw,28px)] text-gold-dark leading-[1.45] mt-8 max-w-[480px]">
                Not what the property is worth today, but what it would have sold for on the day the decedent died.
              </p>
              <GoldRule className="w-24 mt-8 opacity-70" delay={0.3} />
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15}>
            <Prose>
              <p>
                A date of death appraisal is a retrospective appraisal. The question is not what the property is worth
                today, but what it would have sold for on the day the decedent died. Sometimes the appraisal is ordered
                months after the death, or even years later when an estate is reopened. So we use only market evidence
                that would have been known on that date. Sales, listings and market conditions after the date of death are
                generally excluded, unless they shed light on value at the date of death itself.
              </p>
              <p>
                We also document the property&apos;s condition as of the date of death. If the property has been
                renovated, damaged or cleared since, we rely on photographs, records and interviews to reconstruct its
                earlier condition. That documentation is essential if the value is later questioned.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* One value, several consequences */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Why It Matters" title={'One Value, Several\n_Consequences_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>The date of death value does several jobs at once.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/20 border border-gold/20">
          {consequences.map((c, i) => (
            <li key={c.title} className="group bg-white transition-colors duration-500 hover:bg-cream">
              <RevealOnScroll delay={i * 0.1} className="h-full">
                <div className="h-full p-8 transition-transform duration-500 ease-smooth group-hover:-translate-y-1">
                  <span className="font-serif text-[13px] tracking-[0.2em] text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-serif text-[24px] text-navy leading-[1.2] mt-3 transition-colors duration-500 group-hover:text-gold-dark">{c.title}</h3>
                  <p className="text-navy/75 text-[16px] font-light leading-[1.75] mt-2">{c.desc}</p>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
        <RevealOnScroll>
          <Prose className="mt-10 max-w-[900px]">
            <p>
              A value that is too high costs the estate now; one that is too low can cost heirs later and invite IRS
              scrutiny.
            </p>
            <p>
              In Hawaiʻi, estates frequently hold leasehold interests, kuleana and family land in undivided shares, and
              properties on several islands. Each needs careful treatment to arrive at a supportable value.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Basis */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader tone="navy" label="Stepped-Up Basis" title={'Why the Value Matters\n_Even Without Estate Tax_'} />
          <RevealOnScroll delay={0.1}>
            <Prose tone="navy">
              <p>
                Many estates owe no estate tax at all, yet still need a date of death appraisal. The reason is basis.
                Inherited property generally takes a basis equal to its fair market value at the date of death, often
                called a stepped-up basis. When heirs later sell, capital gain is measured from that value.
              </p>
              <p>
                Without a supportable appraisal, heirs may struggle to prove their basis years later, when records are
                harder to reconstruct. An appraisal at the time of death is inexpensive insurance against that problem.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Fractional */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Fractional Interests" title={'When the Estate\n_Owns Only Part_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                Estates frequently hold a share in a property rather than the whole: a half interest with a surviving
                spouse, a share in family land, or a minority interest in a property held with others. A fractional
                interest is usually worth less than its proportional share of the whole, because the owner cannot control
                the property or sell it easily.
              </p>
              <p>
                We value the property as a whole, then analyze the market evidence for the interest held. Where an entity
                holds the real estate, we coordinate with the business valuer on the entity-level analysis. Our{' '}
                <TextLink href={guide('what-is-a-partial-interest-appraisal')}>partial interest appraisal guide</TextLink>{' '}
                explains the issues.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Filing dates */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20">
          <div>
            <SectionHeader label="Deadlines" title={'Built Around Your\n_Filing Date_'} />
            <RevealOnScroll delay={0.1}>
              <Prose className="mt-6">
                <p>
                  The federal estate tax return (Form 706) is generally due nine months after the date of death, unless
                  extended. If the alternate valuation date is under consideration, values may be needed at both dates. We
                  set delivery dates at engagement so counsel has time to review before filing.
                </p>
              </Prose>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15}>
            <div className="bg-white border border-gold/25 rounded-[2px] p-8 sm:p-10">
              <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-serif font-medium">
                Key dates after a death
              </p>
              <div className="relative mt-6">
                <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-gold/30" />
                <ol className="space-y-5 pl-7">
                  {timeline.map((t, i) => (
                    <li key={t.when} className="relative">
                      <RevealOnScroll delay={0.1 + i * 0.1}>
                        <span
                          aria-hidden="true"
                          className={`absolute -left-7 top-[7px] w-[11px] h-[11px] rounded-full border border-gold ${
                            i === 0 ? 'bg-gold' : 'bg-white'
                          }`}
                        />
                        <span className="block font-serif text-[20px] text-navy leading-[1.2]">{t.when}</span>
                        <span className="block text-navy/70 text-[15px] font-light leading-[1.6]">{t.what}</span>
                      </RevealOnScroll>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          <RevealOnScroll>
            <div className="relative h-full bg-white border border-gold/20 rounded-[2px] p-8 sm:p-10">
              <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
              <h3 className="font-serif text-[26px] text-navy leading-[1.2]">Alternate valuation date</h3>
              <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-4">
                An executor may elect to value the estate&apos;s assets six months after the date of death instead of at
                death, when that election reduces both the value of the gross estate and the tax owed. If counsel is
                considering the election, we can value the property as of both dates in the same engagement.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="relative h-full bg-white border border-gold/20 rounded-[2px] p-8 sm:p-10">
              <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-gold" />
              <h3 className="font-serif text-[26px] text-navy leading-[1.2]">Hawaiʻi estate tax</h3>
              <p className="text-navy/80 text-[16px] font-light leading-[1.8] mt-4">
                Hawaiʻi imposes its own estate tax, with an exemption amount and rules that differ from the federal tax. A
                Hawaiʻi estate may need a state filing even when no federal return is required. Your attorney or CPA will
                confirm the requirements for the estate. Our guide to{' '}
                <TextLink href={guide('what-is-an-estate-appraisal-for-tax-purposes')}>
                  estate appraisal for tax purposes
                </TextLink>{' '}
                covers the basics.
              </p>
            </div>
          </RevealOnScroll>
        </div>
        <RevealOnScroll>
          <p className="text-slate text-[14px] font-light leading-[1.7] mt-8">
            This page is general information, not legal or tax advice.
          </p>
        </RevealOnScroll>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeader label="Our Process" title={'Respectful, Thorough,\n_On Schedule_'} className="mb-14" />
        <ProcessSteps
          steps={[
            {
              title: 'Engagement with counsel',
              body: 'We confirm the date of value, the interest appraised and the filing deadline.',
            },
            {
              title: 'Inspection',
              body: 'We inspect the property, coordinating access sensitively with the family or representative.',
            },
            {
              title: 'Retrospective analysis',
              body: 'Market evidence as of the date of death, not today.',
            },
            {
              title: 'Report',
              body: 'A USPAP-compliant report prepared by a qualified appraiser, with support for every conclusion.',
            },
          ]}
        />
      </Section>

      {/* Receive + trust administration */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20">
          <div>
            <SectionHeader label="Deliverables" title={'What You\n_Receive_'} className="mb-8" />
            <Checklist items={receive} />
          </div>
          <div className="lg:pt-2">
            <RevealOnScroll delay={0.1}>
              <div className="bg-white border border-gold/20 p-8 sm:p-10 rounded-[2px]">
                <SectionLabel>For Trustees</SectionLabel>
                <h2 className="font-serif text-[clamp(28px,3vw,38px)] text-navy leading-[1.2]">Trust Administration</h2>
                <Prose className="mt-5 !text-[16px]">
                  <p>
                    Trustees need values at many points in a trust&apos;s life: when the trust is funded, when assets are
                    distributed or divided among beneficiaries, when a sub-trust is created at the first spouse&apos;s
                    death, and for periodic reporting.
                  </p>
                  <p>
                    Each valuation follows the same rigor as a date of death appraisal, at the date the trust instrument or
                    the event requires. For trusts holding several properties, we can schedule valuations together to keep
                    the method consistent.
                  </p>
                </Prose>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="My preliminary review of the two appraisals you prepared showed that you were thorough and complete with your analysis, and I am happy with your work."
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
        heading={'Discuss an\n_Estate_ With Us'}
        text="Tell us about the property, the date of death or valuation date, and any filing deadline. We will respond promptly and with care."
        image="/images/gallery/luxury-residential/dji_0514.webp"
      />
      <StickyInquiryButton />
    </>
  )
}

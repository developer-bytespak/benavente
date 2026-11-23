import type { Metadata } from 'next'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import ServiceHero from '@/components/sections/services/ServiceHero'
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
  Quote,
  type FaqItem,
} from '@/components/sections/services/Blocks'
import { clientPages, propertyTypePages, serviceHref, services, unlinkedServices } from '@/lib/services'

const FORM_KEY = 'services'
const URL_PATH = '/services'
const META_TITLE = 'Real Estate Appraisal Services in Hawaii'
const META_DESCRIPTION =
  'Every appraisal and consulting service from The Benavente Group in one place: commercial, litigation, tax appeal, ground lease, estate and more, by MAI and SRA appraisers.'
const HERO_IMAGE = '/images/regions/oahu-skyline.webp'
const PHONE_HREF = 'tel:+18087844320'

export const metadata: Metadata = {
  title: META_TITLE,
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
  { label: 'Services', href: URL_PATH },
]

// Each row links out with the anchor text of the page it points to, so the
// service pages, not this hub, rank for their own terms.
const link = (slug: string, label: string, tone?: 'navy') => (
  <TextLink href={serviceHref(slug)} tone={tone}>
    {label}
  </TextLink>
)

const coreServices = [
  [link('commercial-real-estate-appraisal', 'Commercial real estate appraisal'), 'What is this office, retail, industrial or hotel property worth?', 'Lenders, owners, investors'],
  [link('litigation-support-expert-testimony', 'Litigation support and expert testimony'), 'What value will hold up in court or arbitration?', 'Attorneys, parties to disputes'],
  [link('property-tax-appeal', 'Property tax appeal appraisal'), "Is the county's assessment above market value?", 'Commercial and high-value owners'],
  [link('eminent-domain-condemnation', 'Eminent domain and condemnation'), 'What is just compensation for land taken by a public project?', 'Agencies, owners, condemnation counsel'],
  [link('market-studies', 'Market studies'), 'Who will rent or buy, at what price, and how fast?', 'Developers, lenders, institutions'],
  [link('feasibility-highest-and-best-use', 'Highest and best use and feasibility'), 'What should be built here, and will it pencil?', 'Developers, landowners, trusts'],
  [link('estate-trust-appraisal', 'Estate and trust appraisal'), 'What was the property worth on the date of death?', 'Executors, trustees, estate attorneys'],
  [link('portfolio-valuation', 'Portfolio valuation'), 'What are many properties worth, on one consistent basis?', 'Banks, funds, landowners'],
]

const specialistServices = [
  [link('ground-lease-valuation', 'Ground lease and leased fee valuation'), "What are the landowner's and the lessee's interests each worth?", 'Ground lessors, lessees, their lenders'],
  [link('construction-loan-appraisal', 'Construction loan appraisal'), 'What will this project be worth when complete and stabilized?', 'Construction lenders'],
  [link('ground-rent-arbitration', 'Ground rent arbitration and rent reset'), 'What should the new ground rent be at reopening?', 'Landowners, lessees, counsel'],
  [link('luxury-home-appraisal', 'Luxury home appraisal'), 'What is this high-value home worth, outside a mortgage?', 'Owners, executors, family-law attorneys'],
  [link('real-estate-consulting', 'Real estate consulting'), 'Is this appraisal, lease set or price reliable?', 'Buyers, owners, fiduciaries'],
]

const clientHref = (label: string) => clientPages.find((p) => p.label === label)!.href
const propertyHref = (label: string) => propertyTypePages.find((p) => p.label === label)!.href

const byRole = [
  ['An attorney', 'Independence, defensible reports, testimony experience', <TextLink key="a" href={clientHref('For Attorneys')}>For attorneys</TextLink>],
  ['A lender or credit officer', 'FIRREA and USPAP compliance, reports that pass review', <TextLink key="l" href={clientHref('For Lenders and Financial Institutions')}>For lenders</TextLink>],
  ['A developer or investor', 'Evidence before capital is committed', <TextLink key="d" href={clientHref('For Developers and Investors')}>For developers and investors</TextLink>],
  ['A government agency', 'Yellow Book standards, procurement-ready files', <TextLink key="g" href={clientHref('For Government Agencies')}>For government agencies</TextLink>],
]

const byProperty = [
  ['Hotels and resorts', 'Occupancy, room rate, and separating real estate from business value', <TextLink key="h" tone="navy" href={propertyHref('Hotel & Hospitality')}>Hotel and hospitality appraisal</TextLink>],
  ['Industrial and warehouse', 'Land scarcity, function, and ground lease terms', <TextLink key="i" tone="navy" href={propertyHref('Industrial & Warehouse')}>Industrial property appraisal</TextLink>],
  ['Agricultural and conservation land', 'Land use district, water, access and restrictions', <TextLink key="a" tone="navy" href={propertyHref('Agricultural & Conservation Land')}>Agricultural land appraisal</TextLink>],
  ['Office and retail', 'Leases, rollover and tenant risk', <TextLink key="o" tone="navy" href={propertyHref('Office & Retail')}>Office and retail appraisal</TextLink>],
]

const situations = [
  ['Your bank needs a value for a loan', <>Ask the bank to engage us; see <TextLink href={clientHref('For Lenders and Financial Institutions')}>for lenders</TextLink></>],
  ['You received a county assessment that looks too high', <>{link('property-tax-appeal', 'Property tax appeal')}, and act before your county deadline</>],
  ['A family member has passed away and the estate holds property', link('estate-trust-appraisal', 'Estate and trust appraisal')],
  ["You are in a dispute over a property's value", link('litigation-support-expert-testimony', 'Litigation support')],
  ['Your ground lease rent is about to reopen', link('ground-rent-arbitration', 'Ground rent arbitration')],
  ['A government project needs part of your land', link('eminent-domain-condemnation', 'Eminent domain')],
  ['You are deciding what to build on a site', link('feasibility-highest-and-best-use', 'Highest and best use and feasibility')],
  ['You already have an appraisal and doubt it', <>{link('real-estate-consulting', 'Real estate consulting')} (appraisal review)</>],
]

const commonGround = [
  {
    title: 'Credentialed appraisers',
    body: 'Each of our principals holds both the MAI and SRA designations from the Appraisal Institute, so commercial and residential questions are answered by the same senior team.',
  },
  {
    title: 'Independence',
    body: 'Our fee never depends on the value we conclude, and we run a conflict check before accepting any matter in dispute.',
  },
  {
    title: 'USPAP compliance',
    body: 'Every appraisal is prepared under the Uniform Standards of Professional Appraisal Practice, plus any lender, court or agency standard that applies.',
  },
  {
    title: 'Local evidence',
    body: 'We inspect in person and verify comparable sales and leases with the parties where possible, because island markets have thin data and unusual leases.',
  },
]

const appraisers = [
  ['Fernando Benavente', 'MAI, SRA', 'Manager'],
  ['Brian S. Goto', 'MAI, SRA', 'Appraiser Consultant'],
  ['Randolph K. Flores', 'MAI, SRA', 'Appraiser Consultant'],
]

const finders = [
  { id: 'by-need', label: 'Find a Service by What You Need' },
  { id: 'by-role', label: 'Find a Service by Who You Are' },
  { id: 'by-property', label: 'Find a Service by What You Own' },
  { id: 'not-sure', label: 'Not Sure Which Service You Need?' },
]

const faqs: FaqItem[] = [
  {
    q: 'What is the difference between an appraisal and a consulting assignment?',
    text: 'An appraisal concludes a market value under USPAP for a stated intended use. A consulting assignment answers a narrower question, such as whether an existing appraisal is reliable. More general questions are answered on our FAQ page.',
    a: (
      <>
        An appraisal concludes a market value under USPAP for a stated intended use. A consulting assignment answers a narrower
        question, such as whether an existing appraisal is reliable. More general questions are answered on our{' '}
        <TextLink href="/faq">FAQ page</TextLink>.
      </>
    ),
  },
  {
    q: 'Do you appraise residential property as well as commercial?',
    text: 'Yes. Our principals hold the SRA designation for residential property alongside the MAI, and we focus on high-value homes and estate, divorce and tax work rather than mortgage appraisals.',
    a: (
      <>
        Yes. Our principals hold the SRA designation for residential property alongside the MAI, and we focus on high-value homes
        and estate, divorce and tax work rather than mortgage appraisals.
      </>
    ),
  },
  {
    q: 'Can one engagement cover several services?',
    text: 'Yes. A ground lease dispute, for example, may need a leased fee valuation, a rent analysis and testimony. We scope the work as one engagement so the assumptions stay consistent.',
    a: (
      <>
        Yes. A ground lease dispute, for example, may need a leased fee valuation, a rent analysis and testimony. We scope the work
        as one engagement so the assumptions stay consistent.
      </>
    ),
  },
  {
    q: 'How do I get a quote?',
    text: 'Tell us the property, what the appraisal is for, who will rely on it and your deadline. We reply with scope, fee and a delivery date.',
    a: (
      <>
        Tell us the property, what the appraisal is for, who will rely on it and your deadline. We reply with scope, fee and a
        delivery date.
      </>
    ),
  },
]

const allServices = [...services, ...unlinkedServices]

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Real Estate Appraisal and Consulting Services in Hawaiʻi',
          description: META_DESCRIPTION,
          url: absoluteUrl(URL_PATH),
          publisher: { ...providerSchema, telephone: '+1-808-784-4320' },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: allServices.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: s.title,
              url: absoluteUrl(serviceHref(s.slug)),
            })),
          },
        }}
      />

      <ServiceHero
        compact
        eyebrow="Services"
        heading={'Real Estate Appraisal and\n_Consulting Services in Hawaiʻi_'}
        subhead="The Benavente Group provides real estate appraisal and consulting services across Hawaiʻi and the Pacific. Our MAI and SRA designated appraisers value commercial, residential, leasehold and special-purpose property for lenders, attorneys, owners, developers and government agencies. Find your service below by what you need, who you are or what you own."
        image={HERO_IMAGE}
        imageAlt="Aerial view of Honolulu high-rises with Diamond Head in the distance"
        breadcrumb={crumbs}
        formService={FORM_KEY}
        primaryLabel="Tell Us What You Need"
        primaryHref="#inquiry"
        secondaryCta={{ label: 'Call (808) 784-4320', href: PHONE_HREF }}
      />

      {/* Intro with an index of the four ways to find a service */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
          <RevealOnScroll>
            <p className="font-serif text-navy text-[clamp(24px,2.4vw,30px)] leading-[1.45]">
              Most people who call us know they need an appraisal but not yet which kind. The right report depends on three
              things: what the value will be used for, who will rely on it, and the date it must speak to. This page sorts every
              service we offer along those lines, so you can go straight to the one that fits.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <ol className="border-t border-gold/20">
              {finders.map((f, i) => (
                <li key={f.id} className="border-b border-gold/20">
                  <a
                    href={`#${f.id}`}
                    className="group grid grid-cols-[44px_1fr] items-baseline py-4 transition-colors duration-300 hover:bg-gold/[0.05]"
                  >
                    <span className="font-serif text-[13px] tracking-[0.2em] text-gold pl-2">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-[21px] text-navy leading-[1.3] transition-colors duration-300 group-hover:text-gold-dark">
                      {f.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </RevealOnScroll>
        </div>
      </Section>

      {/* By need */}
      <Section tone="cream" id="by-need" className="scroll-mt-20">
        <SectionHeader label="By Need" title={'Find a Service by\n_What You Need_'} className="mb-14" />
        <RevealOnScroll>
          <h3 className="font-serif text-[28px] text-navy mb-6">Core Appraisal Services</h3>
        </RevealOnScroll>
        <EditorialTable
          caption="Core appraisal services, the question each answers and who uses it most"
          columns={['Service', 'The question it answers', 'Most often used by']}
          rows={coreServices}
        />
        <RevealOnScroll>
          <h3 className="font-serif text-[28px] text-navy mt-16 mb-6">Specialist Services</h3>
        </RevealOnScroll>
        <EditorialTable
          caption="Specialist services, the question each answers and who uses it most"
          columns={['Service', 'The question it answers', 'Most often used by']}
          rows={specialistServices}
        />
      </Section>

      {/* By role */}
      <Section id="by-role" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="By Client" title={'Find a Service by\n_Who You Are_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>
                The same firm serves very different clients, and each buys an appraisal for a different reason. These pages are
                written for your role.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Client pages by role"
          columns={['You are', 'What matters most to you', 'Your page']}
          rows={byRole}
        />
      </Section>

      {/* By property */}
      <Section tone="navy" id="by-property" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader tone="navy" label="By Property" title={'Find a Service by\n_What You Own_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose tone="navy">
              <p>Some valuation problems belong to the property itself. These pages explain how we value each type.</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          tone="navy"
          caption="Property type pages and what drives each type's value"
          columns={['Property type', 'What drives its value', 'Page']}
          rows={byProperty}
        />
      </Section>

      {/* Not sure */}
      <Section tone="cream" id="not-sure" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-12">
          <SectionHeader label="Where to Start" title={'Not Sure Which\n_Service You Need?_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>
                Start from your situation. If yours isn&apos;t listed, call us and we&apos;ll point you to the right scope, even
                when it isn&apos;t us.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
        <EditorialTable
          caption="Where to start, by situation"
          columns={['Your situation', 'Where to start']}
          rows={situations}
        />
      </Section>

      {/* Common ground */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 mb-14">
          <SectionHeader label="Every Engagement" title={'What Every Engagement\n_Has in Common_'} />
          <RevealOnScroll delay={0.1} className="self-end">
            <Prose>
              <p>Whatever the service, four things stay the same:</p>
            </Prose>
          </RevealOnScroll>
        </div>
        <NumberedItems items={commonGround} />
        <RevealOnScroll delay={0.1}>
          <Prose className="mt-14">
            <p>
              See <TextLink href="/process">how an engagement works</TextLink>, step by step.
            </p>
          </Prose>
        </RevealOnScroll>
      </Section>

      {/* Appraisers */}
      <Section tone="navy">
        <SectionHeader tone="navy" label="Our Team" title={'Meet the\n_Appraisers_'} className="mb-12" />
        <EditorialTable
          tone="navy"
          caption="Our appraisers, their designations and roles"
          columns={['Appraiser', 'Designations', 'Role']}
          rows={appraisers}
        />
      </Section>

      {/* Where we work */}
      <Section tone="cream">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20">
          <SectionHeader label="Coverage" title={'Where We\n_Work_'} />
          <RevealOnScroll delay={0.1}>
            <Prose>
              <p>
                We are based in downtown Honolulu and appraise property across all four Hawaiʻi counties, as well as in Guam,
                Saipan and the Marshall Islands. Each service page explains the local rules that apply to it, from county appeal
                deadlines to ground lease statutes.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      <Quote
        heading="What Our Clients Say"
        quote="It's a pleasure working with you and your team!! High quality appraisals, easy to work with, thorough… we're very fortunate."
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

      <ServiceInquiry
        service={FORM_KEY}
        heading={'Find the Right Appraisal\n_for Your Property_'}
        text="Tell us what you're trying to decide and who will rely on the value. We'll recommend the right service and report type, and confirm fee and delivery date in writing before any work begins."
        image={HERO_IMAGE}
      />
      <StickyInquiryButton />
    </>
  )
}

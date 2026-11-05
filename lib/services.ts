// Shared index of the /services section. Each service's page lives in its own
// route folder under app/services, built from that service's SEO content brief;
// this list feeds navigation, the footer, the sitemap, the services overview and
// related-service links.

export interface Service {
  slug: string
  number: string
  title: string
  // Used where the full title would wrap awkwardly (overview hero, breadcrumbs).
  shortTitle: string
  summary: string
  image: string
  related: string[]
}

export const services: Service[] = [
  {
    slug: 'commercial-real-estate-appraisal',
    number: '01',
    title: 'Commercial Real Estate Appraisal',
    shortTitle: 'Commercial Appraisal',
    summary:
      'Office, retail, industrial, hotel, land and leasehold appraisals for lenders, owners, attorneys and government agencies across Hawaiʻi and the Pacific.',
    image: '/images/gallery/cbd/dji_0345.webp',
    related: ['litigation-support-expert-testimony', 'property-tax-appeal', 'eminent-domain-condemnation', 'market-studies'],
  },
  {
    slug: 'litigation-support-expert-testimony',
    number: '02',
    title: 'Litigation Support & Expert Testimony',
    shortTitle: 'Litigation Support',
    summary:
      'Court-ready appraisal reports, rebuttal reviews, arbitration support and expert testimony for attorneys in real estate disputes.',
    image: '/images/gallery/cbd/dji_0337.webp',
    related: ['commercial-real-estate-appraisal', 'eminent-domain-condemnation', 'property-tax-appeal', 'market-studies'],
  },
  {
    slug: 'property-tax-appeal',
    number: '03',
    title: 'Property Tax Appeal',
    shortTitle: 'Property Tax Appeal',
    summary:
      'Independent appraisals for Hawaiʻi real property tax appeals before the Board of Review and Tax Appeal Court, prepared ahead of your county deadline.',
    image: '/images/gallery/retail/dji_0106.webp',
    related: [
      'commercial-real-estate-appraisal',
      'litigation-support-expert-testimony',
      'eminent-domain-condemnation',
      'market-studies',
    ],
  },
  {
    slug: 'eminent-domain-condemnation',
    number: '04',
    title: 'Eminent Domain & Condemnation',
    shortTitle: 'Eminent Domain',
    summary:
      'Just compensation, partial takings, right-of-way, easements and Yellow Book appraisals for agencies, property owners and condemnation counsel.',
    image: '/images/gallery/vacant-land/dji_0025.webp',
    related: [
      'commercial-real-estate-appraisal',
      'litigation-support-expert-testimony',
      'property-tax-appeal',
      'market-studies',
    ],
  },
  {
    slug: 'market-studies',
    number: '05',
    title: 'Market Analysis & Market Studies',
    shortTitle: 'Market Studies',
    summary:
      'Demand, supply, absorption and market rent studies for developers, lenders, institutions and agencies across Hawaiʻi and the Pacific.',
    image: '/images/gallery/residential-developments/dji_0406.webp',
    related: [
      'commercial-real-estate-appraisal',
      'feasibility-highest-and-best-use',
      'property-tax-appeal',
      'eminent-domain-condemnation',
    ],
  },
  {
    slug: 'feasibility-highest-and-best-use',
    number: '06',
    title: 'Feasibility & Highest and Best Use',
    shortTitle: 'Feasibility & HBU',
    summary:
      'Highest and best use studies and financial feasibility analysis that test what a Hawaiʻi site should become before capital is committed.',
    image: '/images/gallery/vacant-land/dji_0515-large.webp',
    related: [
      'market-studies',
      'commercial-real-estate-appraisal',
      'eminent-domain-condemnation',
      'property-tax-appeal',
    ],
  },
  {
    slug: 'estate-trust-appraisal',
    number: '07',
    title: 'Estate & Trust Appraisal',
    shortTitle: 'Estate & Trust',
    summary:
      'Date of death, probate, estate and trust appraisals for Hawaiʻi executors, trustees and estate attorneys, delivered on schedule for filing.',
    image: '/images/gallery/luxury-residential/dji_0858.webp',
    related: [
      'commercial-real-estate-appraisal',
      'property-tax-appeal',
      'feasibility-highest-and-best-use',
      'market-studies',
    ],
  },
  {
    slug: 'portfolio-valuation',
    number: '08',
    title: 'Portfolio Valuation',
    shortTitle: 'Portfolio Valuation',
    summary:
      'Consistent valuations for lenders, institutions and landowners holding multiple properties across Hawaiʻi and the Pacific. One team, one method.',
    image: '/images/gallery/cbd/dji_0344.webp',
    related: [
      'commercial-real-estate-appraisal',
      'market-studies',
      'feasibility-highest-and-best-use',
      'property-tax-appeal',
    ],
  },
  {
    slug: 'ground-lease-valuation',
    number: '09',
    title: 'Ground Lease & Leased Fee Valuation',
    shortTitle: 'Ground Lease',
    summary:
      'Leased fee and leasehold valuation for Honolulu and Hawaiʻi ground leases: purchases, sales, lease-to-fee conversions and lender underwriting.',
    image: '/images/gallery/hotel-hospitality/dji_0445-large.webp',
    related: [
      'commercial-real-estate-appraisal',
      'portfolio-valuation',
      'estate-trust-appraisal',
      'litigation-support-expert-testimony',
    ],
  },
]

// The navbar's "Specialist Services" pane. Services listed here leave the main
// Services dropdown so they don't appear twice.
export const specialistPages: { label: string; href: string }[] = [
  { label: 'Ground Lease and Leased Fee Valuation', href: '/services/ground-lease-valuation' },
  { label: 'Construction Loan Appraisal', href: '/services/construction-loan-appraisal' },
  { label: 'Ground Rent Arbitration', href: '/services/ground-rent-arbitration' },
  { label: 'Luxury Residential Valuation', href: '/services/luxury-home-appraisal' },
  { label: 'Real Estate Consulting', href: '/services/real-estate-consulting' },
]

// The navbar's "Client Type Pages" pane.
export const clientPages: { label: string; href: string }[] = [
  { label: 'For Attorneys', href: '/clients/attorneys' },
  { label: 'For Lenders and Financial Institutions', href: '/clients/lenders' },
  { label: 'For Developers and Investors', href: '/clients/developers-investors' },
  { label: 'For Government Agencies', href: '/clients/government-agencies' },
]

// Service pages linked only from "Specialist Services" in the navbar and listed
// in the sitemap. They are kept out of `services` on purpose, so the footer and
// services overview still show the core nine.
export const unlinkedServices: Service[] = [
  {
    slug: 'construction-loan-appraisal',
    number: '10',
    title: 'Construction Loan Appraisal',
    shortTitle: 'Construction Loan',
    summary:
      'As-is, as-complete and as-stabilized values for Honolulu and Hawaiʻi construction loans, prepared under FIRREA, USPAP and interagency guidelines.',
    image: '/images/gallery/residential-developments/dji_0761.webp',
    related: [
      'commercial-real-estate-appraisal',
      'feasibility-highest-and-best-use',
      'market-studies',
      'portfolio-valuation',
    ],
  },
  {
    slug: 'ground-rent-arbitration',
    number: '11',
    title: 'Ground Rent Arbitration & Rent Reset',
    shortTitle: 'Ground Rent Arbitration',
    summary:
      'Party appraiser support for Honolulu and Hawaiʻi ground lease rent reopenings and arbitrations, with land value and rate of return that hold up.',
    image: '/images/gallery/cbd/dji_0340.webp',
    related: [
      'ground-lease-valuation',
      'litigation-support-expert-testimony',
      'commercial-real-estate-appraisal',
      'feasibility-highest-and-best-use',
    ],
  },
  {
    slug: 'luxury-home-appraisal',
    number: '12',
    title: 'Luxury Residential Valuation',
    shortTitle: 'Luxury Residential',
    summary:
      'Private, non-lending appraisals of oceanfront and high-value Hawaiʻi homes for estates, divorce, tax appeals and sales, by SRA-designated appraisers.',
    image: '/images/gallery/luxury-residential/dji_20260411115211_0058_d.webp',
    related: [
      'estate-trust-appraisal',
      'property-tax-appeal',
      'litigation-support-expert-testimony',
      'ground-lease-valuation',
    ],
  },
  {
    slug: 'real-estate-consulting',
    number: '13',
    title: 'Real Estate Consulting',
    shortTitle: 'Consulting',
    summary:
      'Independent advice for Honolulu and Hawaiʻi property decisions that need less than a full appraisal: appraisal reviews, lease abstracts, acquisition analysis.',
    image: '/images/gallery/cbd/dji_0341.webp',
    related: [
      'commercial-real-estate-appraisal',
      'ground-lease-valuation',
      'litigation-support-expert-testimony',
      'portfolio-valuation',
    ],
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

// Looks up linked and unlinked services alike (for the unlinked pages' own use).
export function getAnyService(slug: string): Service | undefined {
  return getService(slug) ?? unlinkedServices.find((s) => s.slug === slug)
}

export function serviceHref(slug: string): string {
  return `/services/${slug}`
}

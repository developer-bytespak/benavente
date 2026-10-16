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
      'litigation-support-expert-testimony',
      'property-tax-appeal',
      'eminent-domain-condemnation',
    ],
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function serviceHref(slug: string): string {
  return `/services/${slug}`
}

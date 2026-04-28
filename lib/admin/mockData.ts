export * from './operationsData'

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed-won' | 'closed-lost'

export const STATUS_LABEL: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  'closed-won': 'Closed · Won',
  'closed-lost': 'Closed · Lost',
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  service: string
  propertyType: string
  location: string
  message: string
  status: LeadStatus
  assignedTo: string | null
  createdAt: string
  source: 'Contact Form' | 'Phone' | 'Email' | 'Referral'
}

export const TEAM_NAMES = [
  'Fernando Benavente',
  'Brian S. Goto',
  'Randolph K. Flores',
  'Matthew Flores',
  'Jared Miyashiro',
  'Kanae Bamba',
] as const

export const mockLeads: Lead[] = [
  {
    id: 'L-2042',
    name: 'David K. Matsumoto',
    email: 'd.matsumoto@matsumoto-law.com',
    phone: '(808) 521-7894',
    service: 'Litigation Support',
    propertyType: 'Office',
    location: 'Downtown Honolulu, O‘ahu',
    message: 'Need expert testimony for a commercial lease dispute involving Class A office building. Trial in 6 weeks.',
    status: 'new',
    assignedTo: null,
    createdAt: '2026-04-28T09:14:00Z',
    source: 'Contact Form',
  },
  {
    id: 'L-2041',
    name: 'Sarah L. Chen',
    email: 'schen@pacificholdings.com',
    phone: '(808) 555-0182',
    service: 'Commercial Appraisal',
    propertyType: 'Hotel & Hospitality',
    location: 'Wailea, Maui',
    message: 'Proposed luxury resort condominium project. Need appraisal for construction financing through First Hawaiian.',
    status: 'contacted',
    assignedTo: 'Fernando Benavente',
    createdAt: '2026-04-27T14:22:00Z',
    source: 'Contact Form',
  },
  {
    id: 'L-2040',
    name: 'James R. Nakamura',
    email: 'j.nakamura@fhb.com',
    phone: '(808) 525-7000',
    service: 'Commercial Appraisal',
    propertyType: 'Retail',
    location: 'Kapolei, O‘ahu',
    message: 'Strip mall acquisition financing. Portfolio of 3 properties, total ~$48M.',
    status: 'qualified',
    assignedTo: 'Brian S. Goto',
    createdAt: '2026-04-26T11:05:00Z',
    source: 'Referral',
  },
  {
    id: 'L-2039',
    name: 'Keoni Kalama',
    email: 'keoni.kalama@gmail.com',
    phone: '(808) 781-3344',
    service: 'Property Tax Appeal',
    propertyType: 'Residential',
    location: 'Kahala, O‘ahu',
    message: 'Real property tax assessment seems too high after 2025 reassessment. Looking for second opinion.',
    status: 'new',
    assignedTo: null,
    createdAt: '2026-04-26T08:48:00Z',
    source: 'Contact Form',
  },
  {
    id: 'L-2038',
    name: 'Lisa Tanaka',
    email: 'l.tanaka@kamehameha-realty.com',
    phone: '(808) 956-2200',
    service: 'Residential Valuation',
    propertyType: 'Luxury Residential',
    location: 'Diamond Head, O‘ahu',
    message: 'Estate appraisal for oceanfront property. Family is finalizing trust documents.',
    status: 'contacted',
    assignedTo: 'Randolph K. Flores',
    createdAt: '2026-04-25T16:33:00Z',
    source: 'Phone',
  },
  {
    id: 'L-2037',
    name: 'Christopher Silva',
    email: 'csilva@cnmi-dev.com',
    phone: '(670) 234-9821',
    service: 'Pacific Region',
    propertyType: 'Hotel & Hospitality',
    location: 'Saipan, CNMI',
    message: 'Limited service hotel valuation, 142 rooms. Looking for due diligence support.',
    status: 'qualified',
    assignedTo: 'Fernando Benavente',
    createdAt: '2026-04-24T10:17:00Z',
    source: 'Email',
  },
  {
    id: 'L-2036',
    name: 'Amanda Iaukea',
    email: 'aiaukea@hihousing.org',
    phone: '(808) 832-6020',
    service: 'Market Analysis',
    propertyType: 'Multi-Family',
    location: 'Kalihi, O‘ahu',
    message: 'LIHTC affordable housing project, 84 units. Need market study for state application.',
    status: 'closed-won',
    assignedTo: 'Matthew Flores',
    createdAt: '2026-04-22T13:44:00Z',
    source: 'Contact Form',
  },
  {
    id: 'L-2035',
    name: 'Ryan Tagaloa',
    email: 'r.tagaloa@guam-realty.gu',
    phone: '(671) 477-2200',
    service: 'Pacific Region',
    propertyType: 'Industrial',
    location: 'Tamuning, Guam',
    message: 'Industrial lot subdivision feasibility study. 18-acre parcel near Won Pat International.',
    status: 'contacted',
    assignedTo: 'Fernando Benavente',
    createdAt: '2026-04-21T09:55:00Z',
    source: 'Contact Form',
  },
  {
    id: 'L-2034',
    name: 'Brandon Akaka',
    email: 'brandon@akaka-construction.com',
    phone: '(808) 671-9988',
    service: 'Consulting',
    propertyType: 'Vacant Land',
    location: 'Kona, Hawai‘i Island',
    message: 'Strategic advisory for 240-acre agricultural-to-resort rezoning. Investor presentation in 8 weeks.',
    status: 'new',
    assignedTo: null,
    createdAt: '2026-04-20T15:11:00Z',
    source: 'Referral',
  },
  {
    id: 'L-2033',
    name: 'Jennifer Park',
    email: 'jpark@hokulei-development.com',
    phone: '(808) 944-5566',
    service: 'Market Analysis',
    propertyType: 'Multi-Family',
    location: 'Kahului, Maui',
    message: 'Workforce housing feasibility — 120 units. Need rent comp study and absorption forecast.',
    status: 'qualified',
    assignedTo: 'Jared Miyashiro',
    createdAt: '2026-04-18T11:28:00Z',
    source: 'Contact Form',
  },
  {
    id: 'L-2032',
    name: 'Robert Yamamoto',
    email: 'r.yamamoto@yamamoto-cpa.com',
    phone: '(808) 521-0090',
    service: 'Litigation Support',
    propertyType: 'Special Use',
    location: 'Hilo, Hawai‘i Island',
    message: 'Divorce proceedings — closely held auto dealership real estate. Need appraisal + testimony.',
    status: 'contacted',
    assignedTo: 'Brian S. Goto',
    createdAt: '2026-04-17T14:50:00Z',
    source: 'Phone',
  },
  {
    id: 'L-2031',
    name: 'Michael Wong',
    email: 'mwong@centralpacific.com',
    phone: '(808) 544-0500',
    service: 'Commercial Appraisal',
    propertyType: 'Office',
    location: 'Bishop Street, Honolulu',
    message: 'Refinance appraisal — 14-story Class B office, ~180k sq ft.',
    status: 'closed-won',
    assignedTo: 'Fernando Benavente',
    createdAt: '2026-04-15T10:00:00Z',
    source: 'Email',
  },
  {
    id: 'L-2030',
    name: 'Aulani Nakamura',
    email: 'aulani.n@aol.com',
    phone: '(808) 778-2410',
    service: 'Residential Valuation',
    propertyType: 'Residential',
    location: 'Lanikai, O‘ahu',
    message: 'Probate appraisal for inherited beachfront residence. Date of death 03/12/2026.',
    status: 'qualified',
    assignedTo: 'Kanae Bamba',
    createdAt: '2026-04-14T08:39:00Z',
    source: 'Contact Form',
  },
  {
    id: 'L-2029',
    name: 'Trevor Apana',
    email: 't.apana@dhhl.hawaii.gov',
    phone: '(808) 620-9500',
    service: 'Consulting',
    propertyType: 'Residential Developments',
    location: 'Waimanalo, O‘ahu',
    message: 'Department of Hawaiian Home Lands — strategic land use consultation, 60-acre parcel.',
    status: 'closed-lost',
    assignedTo: 'Fernando Benavente',
    createdAt: '2026-04-10T13:20:00Z',
    source: 'Referral',
  },
  {
    id: 'L-2028',
    name: 'Kaipo Lindsey',
    email: 'klindsey@maui-attys.com',
    phone: '(808) 244-2700',
    service: 'Litigation Support',
    propertyType: 'Vacant Land',
    location: 'Lahaina, Maui',
    message: 'Eminent domain — agricultural parcel along proposed bypass extension.',
    status: 'closed-won',
    assignedTo: 'Randolph K. Flores',
    createdAt: '2026-04-08T12:15:00Z',
    source: 'Contact Form',
  },
]

export interface Subscriber {
  id: string
  email: string
  name: string
  signedUpAt: string
  source: string
}

export const mockSubscribers: Subscriber[] = [
  { id: 'S-0234', email: 'rena.tanaka@gmail.com', name: 'Rena Tanaka', signedUpAt: '2026-04-28T07:30:00Z', source: 'Blog · Footer' },
  { id: 'S-0233', email: 'kainoa@kainoarealty.com', name: 'Kainoa Akamine', signedUpAt: '2026-04-27T19:12:00Z', source: 'Insights Page' },
  { id: 'S-0232', email: 'mleung@deloitte.com', name: 'Marcus Leung', signedUpAt: '2026-04-26T11:45:00Z', source: 'Insights Page' },
  { id: 'S-0231', email: 'sarahp@firsthawaiian.com', name: 'Sarah Park', signedUpAt: '2026-04-25T14:22:00Z', source: 'Blog Post · Cap Rates' },
  { id: 'S-0230', email: 'kalei.fernandez@yahoo.com', name: 'Kalei Fernandez', signedUpAt: '2026-04-24T08:50:00Z', source: 'Blog · Footer' },
  { id: 'S-0229', email: 'd.morimoto@morimoto-law.com', name: 'Daniel Morimoto', signedUpAt: '2026-04-23T16:18:00Z', source: 'Insights Page' },
  { id: 'S-0228', email: 'pakela@bishopst-cap.com', name: 'Patrick Akela', signedUpAt: '2026-04-22T09:33:00Z', source: 'Blog Post · Litigation' },
  { id: 'S-0227', email: 'jenchang@aha.org', name: 'Jen Chang', signedUpAt: '2026-04-21T13:07:00Z', source: 'Blog · Footer' },
  { id: 'S-0226', email: 'ryan.alapai@gmail.com', name: 'Ryan Alapai', signedUpAt: '2026-04-20T11:55:00Z', source: 'Insights Page' },
  { id: 'S-0225', email: 't.smith@kpmg.com', name: 'Tessa Smith', signedUpAt: '2026-04-19T15:40:00Z', source: 'Blog Post · Pacific' },
  { id: 'S-0224', email: 'noelani@hawaiilife.com', name: 'Noelani Paʻakaula', signedUpAt: '2026-04-18T10:02:00Z', source: 'Blog · Footer' },
  { id: 'S-0223', email: 'k.silva@cushwake.com', name: 'Kainoa Silva', signedUpAt: '2026-04-17T17:28:00Z', source: 'Insights Page' },
  { id: 'S-0222', email: 'akipona@gmail.com', name: 'Anthony Kipona', signedUpAt: '2026-04-16T08:14:00Z', source: 'Blog · Footer' },
  { id: 'S-0221', email: 'lkam@kameaina-bank.com', name: 'Leilani Kam', signedUpAt: '2026-04-15T12:50:00Z', source: 'Blog Post · Cap Rates' },
  { id: 'S-0220', email: 'mason.r@cbre.com', name: 'Mason Reyes', signedUpAt: '2026-04-13T09:25:00Z', source: 'Insights Page' },
]

export interface ActivityEntry {
  id: string
  type: 'lead' | 'subscriber' | 'blog' | 'team' | 'gallery' | 'cms' | 'status'
  title: string
  detail: string
  timestamp: string
}

export const mockActivity: ActivityEntry[] = [
  { id: 'A-1', type: 'lead', title: 'New lead inquiry', detail: 'David K. Matsumoto · Litigation Support · Honolulu', timestamp: '2026-04-28T09:14:00Z' },
  { id: 'A-2', type: 'subscriber', title: 'Newsletter signup', detail: 'rena.tanaka@gmail.com from Blog footer', timestamp: '2026-04-28T07:30:00Z' },
  { id: 'A-3', type: 'status', title: 'Lead status updated', detail: 'Sarah L. Chen moved to Contacted by Fernando', timestamp: '2026-04-27T16:08:00Z' },
  { id: 'A-4', type: 'blog', title: 'Blog post published', detail: '“Hawai‘i Commercial Cap Rate Trends · 2025 Outlook”', timestamp: '2026-04-27T11:30:00Z' },
  { id: 'A-5', type: 'gallery', title: 'Gallery image added', detail: '3 photos uploaded to “Retail” category', timestamp: '2026-04-26T15:45:00Z' },
  { id: 'A-6', type: 'team', title: 'Team CV replaced', detail: 'Fernando Benavente · updated bio + 2026 CV', timestamp: '2026-04-25T10:22:00Z' },
  { id: 'A-7', type: 'cms', title: 'Hero section updated', detail: 'New video added to homepage rotation', timestamp: '2026-04-24T14:11:00Z' },
  { id: 'A-8', type: 'lead', title: 'Lead converted', detail: 'Michael Wong · Closed Won · $14,500 fee', timestamp: '2026-04-23T16:55:00Z' },
  { id: 'A-9', type: 'cms', title: 'Testimonial added', detail: 'New quote from James R. Nakamura, First Hawaiian Bank', timestamp: '2026-04-22T09:18:00Z' },
  { id: 'A-10', type: 'subscriber', title: 'Newsletter signup', detail: 'kainoa@kainoarealty.com from Insights Page', timestamp: '2026-04-21T19:12:00Z' },
]

export const leadsByMonth: { month: string; count: number }[] = [
  { month: 'Nov', count: 5 },
  { month: 'Dec', count: 7 },
  { month: 'Jan', count: 9 },
  { month: 'Feb', count: 12 },
  { month: 'Mar', count: 10 },
  { month: 'Apr', count: 14 },
]

export const pipelineCounts: { status: LeadStatus; count: number }[] = [
  { status: 'new', count: 8 },
  { status: 'contacted', count: 5 },
  { status: 'qualified', count: 3 },
  { status: 'closed-won', count: 12 },
  { status: 'closed-lost', count: 4 },
]

export const kpiData = {
  newLeadsThisMonth: 14,
  totalLeads: 47,
  newsletterSubscribers: 234,
  publishedPosts: 6,
}

export const trends = {
  newLeads: { value: 16.7, direction: 'up' as const, label: 'vs last month' },
  totalLeads: { value: 8.2, direction: 'up' as const, label: 'last 90 days' },
  subscribers: { value: 22.4, direction: 'up' as const, label: 'vs last month' },
  posts: { value: 1, direction: 'up' as const, label: 'this month' },
}

export const blogPostsAdmin = [
  { id: 'B-1', title: 'Hawai‘i Commercial Real Estate: Cap Rate Trends & 2025 Outlook', category: 'Market Analysis', author: 'Benavente Group', publishedAt: '2026-03-15', status: 'Published', featured: true, views: 1240 },
  { id: 'B-2', title: 'Understanding Property Tax Appeals in Hawai‘i', category: 'Litigation', author: 'Benavente Group', publishedAt: '2026-02-20', status: 'Published', featured: false, views: 980 },
  { id: 'B-3', title: 'Pacific Island Markets: Valuation Challenges & Opportunities', category: 'Pacific Region', author: 'Benavente Group', publishedAt: '2026-01-12', status: 'Published', featured: false, views: 1530 },
  { id: 'B-4', title: 'Litigation Support: What Attorneys Need from Appraisers', category: 'Litigation', author: 'Benavente Group', publishedAt: '2025-12-08', status: 'Published', featured: false, views: 720 },
  { id: 'B-5', title: 'Guam Real Estate: Emerging Market Dynamics', category: 'Pacific Region', author: 'Benavente Group', publishedAt: '2025-11-22', status: 'Published', featured: false, views: 2104 },
  { id: 'B-6', title: 'What is a Cap Rate and Why Does It Matter?', category: 'Education', author: 'Benavente Group', publishedAt: '2025-10-30', status: 'Published', featured: false, views: 3210 },
  { id: 'B-7', title: 'Maui Resort Recovery: Post-Wildfire Market Indicators', category: 'Market Analysis', author: 'Fernando Benavente', publishedAt: '', status: 'Draft', featured: false, views: 0 },
]

export const teamAdmin = [
  { id: 'T-1', name: 'Fernando Benavente, MAI, SRA', role: 'Manager', image: '/images/team/fernando.webp', cv: '/cv/fernando-benavente.pdf', visible: true },
  { id: 'T-2', name: 'Brian S. Goto, MAI, SRA', role: 'Appraiser Consultant', image: '/images/team/brian.webp', cv: '/cv/brian-goto.pdf', visible: true },
  { id: 'T-3', name: 'Randolph K. Flores, MAI, SRA', role: 'Appraiser Consultant', image: '/images/team/randy.webp', cv: '/cv/randolph-flores.pdf', visible: true },
  { id: 'T-4', name: 'Matthew Flores', role: 'Associate', image: '/images/team/matt.webp', cv: '/cv/matthew-flores.pdf', visible: true },
  { id: 'T-5', name: 'Jared Miyashiro', role: 'Certified General Appraiser', image: '/images/team/jared.webp', cv: '/cv/jared-miyashiro.pdf', visible: true },
  { id: 'T-6', name: 'Kanae Bamba', role: 'Certified General Appraiser', image: '/images/team/kanae.webp', cv: '/cv/kanae-bamba.pdf', visible: true },
  { id: 'T-7', name: 'Kamugisha Pearl', role: 'Senior Market Analyst', image: '/images/team/pearl.webp', cv: '/cv/kamugisha-pearl.pdf', visible: true },
  { id: 'T-8', name: 'Asiimwe Miriam', role: 'Administrative Assistant', image: '/images/team/miriam.webp', cv: '/cv/asiimwe-miriam.pdf', visible: true },
  { id: 'T-9', name: 'Anthony Chang', role: 'Market Analyst', image: '/images/team/anthony.webp', cv: '/cv/AC.pdf', visible: true },
]

export const galleryAdmin = [
  { slug: 'agriculture', label: 'Agriculture', count: 3, cover: '/images/gallery/agriculture/dji_0306.webp' },
  { slug: 'cbd', label: 'CBD', count: 6, cover: '/images/gallery/cbd/dji_0337.webp' },
  { slug: 'hotel-hospitality', label: 'Hotel & Hospitality', count: 20, cover: '/images/gallery/hotel-hospitality/dji_0861-large.webp' },
  { slug: 'industrial', label: 'Industrial', count: 20, cover: '/images/gallery/industrial/dji_0889.webp' },
  { slug: 'luxury-residential', label: 'Luxury Residential', count: 7, cover: '/images/gallery/luxury-residential/dji_0858.webp' },
  { slug: 'multi-family', label: 'Multi-Family', count: 15, cover: '/images/gallery/multi-family/dji_0823-large.webp' },
  { slug: 'office', label: 'Office', count: 13, cover: '/images/gallery/office/dji_0912.webp' },
  { slug: 'residential-developments', label: 'Residential Developments', count: 7, cover: '/images/gallery/residential-developments/dji_0761.webp' },
  { slug: 'retail', label: 'Retail', count: 33, cover: '/images/gallery/retail/dji_0083-large.webp' },
  { slug: 'special-use', label: 'Special Use', count: 16, cover: '/images/gallery/special-use/dji_0675-large.webp' },
  { slug: 'vacant-land', label: 'Vacant / Development Land', count: 23, cover: '/images/gallery/vacant-land/dji_0111-large.webp' },
]

export const servicesAdmin = [
  { id: 1, number: '01', name: 'Commercial Appraisal', shortDesc: 'Valuations for office buildings, retail centers, industrial facilities, and mixed-use developments across Hawai‘i and the Pacific.', visible: true },
  { id: 2, number: '02', name: 'Market Analysis', shortDesc: 'In-depth market research and feasibility studies that illuminate property values, investment opportunities, and emerging trends.', visible: true },
  { id: 3, number: '03', name: 'Litigation Support', shortDesc: 'Expert testimony, property tax appeals, condemnation proceedings, divorce, estate, bankruptcy, and dispute resolution.', visible: true },
  { id: 4, number: '04', name: 'Consulting', shortDesc: 'Strategic advisory for developers, lenders, and government agencies requiring authoritative real estate economics expertise.', visible: true },
  { id: 5, number: '05', name: 'Residential Valuation', shortDesc: 'Precise valuations for luxury homes, condominiums, multi-family properties, and land throughout the Hawaiian Islands.', visible: true },
  { id: 6, number: '06', name: 'Pacific Region', shortDesc: 'Specialized expertise across Guam, Saipan, the Marshall Islands, and other Pacific territories with unique regulatory environments.', visible: true },
]

export const testimonialsAdmin = [
  { id: 'TS-1', quote: 'The Benavente Group provided an exceptionally thorough valuation report that withstood intense scrutiny during litigation proceedings. Their market expertise is unmatched in Hawaii.', author: 'David K. Matsumoto', role: 'Real Estate Attorney, Honolulu', visible: true, featured: true },
  { id: 'TS-2', quote: 'Their deep understanding of Pacific island markets gave us the confidence to move forward with our development project. Thoroughly professional from start to finish.', author: 'Sarah L. Chen', role: 'Development Director, Pacific Holdings', visible: true, featured: false },
  { id: 'TS-3', quote: 'We’ve relied on The Benavente Group for commercial appraisals across multiple Hawaiian islands. Their consistency, accuracy, and turnaround time are exceptional.', author: 'James R. Nakamura', role: 'Senior VP, First Hawaiian Bank', visible: true, featured: false },
]

export function relativeTime(iso: string, now: Date = new Date('2026-04-28T10:00:00Z')): string {
  const t = new Date(iso).getTime()
  const diff = now.getTime() - t
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'just now'
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  const day = Math.floor(hr / 24)
  if (day < 7) return `${day}d ago`
  const wk = Math.floor(day / 7)
  if (wk < 5) return `${wk}w ago`
  const mo = Math.floor(day / 30)
  return `${mo}mo ago`
}

export function formatDate(iso: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

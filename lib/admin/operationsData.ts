// ============================================================
// Assignments — full project lifecycle tracker
// ============================================================

export type AssignmentStage =
  | 'engaged'
  | 'site-visit'
  | 'research'
  | 'drafting'
  | 'peer-review'
  | 'delivered'
  | 'invoiced'

export const STAGE_LABEL: Record<AssignmentStage, string> = {
  engaged: 'Engaged',
  'site-visit': 'Site Visit',
  research: 'Research',
  drafting: 'Drafting',
  'peer-review': 'Peer Review',
  delivered: 'Delivered',
  invoiced: 'Invoiced',
}

export const STAGE_PROGRESS: Record<AssignmentStage, number> = {
  engaged: 10,
  'site-visit': 25,
  research: 45,
  drafting: 65,
  'peer-review': 85,
  delivered: 95,
  invoiced: 100,
}

export interface AssignmentDoc {
  name: string
  type: 'engagement' | 'photos' | 'comps' | 'draft' | 'final' | 'invoice' | 'workfile'
  size: string
  uploadedAt: string
  uploadedBy: string
}

export interface PeerComment {
  reviewer: string
  comment: string
  status: 'pending' | 'addressed' | 'approved'
  timestamp: string
}

export interface Assignment {
  id: string
  client: string
  property: string
  location: string
  propertyType: string
  serviceType: string
  fee: number
  feeStatus: 'quoted' | 'engaged' | 'invoiced' | 'paid'
  stage: AssignmentStage
  assignedAppraiser: string
  peerReviewer: string | null
  startDate: string
  dueDate: string
  notes: string
  documents: AssignmentDoc[]
  peerComments: PeerComment[]
  daysToDeadline: number
}

export const mockAssignments: Assignment[] = [
  {
    id: 'A-3082',
    client: 'First Hawaiian Bank',
    property: 'Pacific Tower · Class B Office, 14 floors',
    location: 'Bishop Street, Honolulu',
    propertyType: 'Office',
    serviceType: 'Refinance Appraisal',
    fee: 14500,
    feeStatus: 'engaged',
    stage: 'drafting',
    assignedAppraiser: 'Fernando Benavente',
    peerReviewer: 'Brian S. Goto',
    startDate: '2026-04-08',
    dueDate: '2026-05-06',
    daysToDeadline: 7,
    notes: 'Urgent — board approval depends on this. NOI needs careful tenant-by-tenant review.',
    documents: [
      { name: 'engagement-letter-3082.pdf', type: 'engagement', size: '184 KB', uploadedAt: '2026-04-08T14:20:00Z', uploadedBy: 'Asiimwe Miriam' },
      { name: 'site-photos-bishop.zip', type: 'photos', size: '24.6 MB', uploadedAt: '2026-04-12T16:45:00Z', uploadedBy: 'Fernando Benavente' },
      { name: 'rent-roll-2026Q1.xlsx', type: 'workfile', size: '92 KB', uploadedAt: '2026-04-15T11:10:00Z', uploadedBy: 'Anthony Chang' },
      { name: 'comparable-sales-cbd-office.pdf', type: 'comps', size: '1.2 MB', uploadedAt: '2026-04-18T09:33:00Z', uploadedBy: 'Kamugisha Pearl' },
      { name: 'draft-v1-pacific-tower.pdf', type: 'draft', size: '4.8 MB', uploadedAt: '2026-04-26T17:50:00Z', uploadedBy: 'Fernando Benavente' },
    ],
    peerComments: [],
  },
  {
    id: 'A-3081',
    client: 'Pacific Holdings LLC',
    property: 'Wailea Resort Condominium · Proposed 124 units',
    location: 'Wailea, Maui',
    propertyType: 'Hotel & Hospitality',
    serviceType: 'Construction Loan Appraisal',
    fee: 22500,
    feeStatus: 'engaged',
    stage: 'site-visit',
    assignedAppraiser: 'Brian S. Goto',
    peerReviewer: 'Fernando Benavente',
    startDate: '2026-04-22',
    dueDate: '2026-05-20',
    daysToDeadline: 21,
    notes: 'Inter-island travel scheduled May 2. Need preliminary feasibility from Pearl by then.',
    documents: [
      { name: 'engagement-letter-3081.pdf', type: 'engagement', size: '198 KB', uploadedAt: '2026-04-22T11:00:00Z', uploadedBy: 'Asiimwe Miriam' },
    ],
    peerComments: [],
  },
  {
    id: 'A-3080',
    client: 'Matsumoto Law Group',
    property: '4140 Kalanianaole Hwy · Class A Office',
    location: 'Diamond Head, O‘ahu',
    propertyType: 'Office',
    serviceType: 'Litigation Support',
    fee: 18000,
    feeStatus: 'engaged',
    stage: 'peer-review',
    assignedAppraiser: 'Randolph K. Flores',
    peerReviewer: 'Fernando Benavente',
    startDate: '2026-03-25',
    dueDate: '2026-05-02',
    daysToDeadline: 3,
    notes: 'Trial date June 12 — report needed for expert disclosure deadline May 5.',
    documents: [
      { name: 'engagement-letter-3080.pdf', type: 'engagement', size: '210 KB', uploadedAt: '2026-03-25T10:00:00Z', uploadedBy: 'Asiimwe Miriam' },
      { name: 'site-photos-kalanianaole.zip', type: 'photos', size: '18.4 MB', uploadedAt: '2026-04-02T15:00:00Z', uploadedBy: 'Randolph K. Flores' },
      { name: 'comps-diamond-head.pdf', type: 'comps', size: '880 KB', uploadedAt: '2026-04-10T14:20:00Z', uploadedBy: 'Anthony Chang' },
      { name: 'draft-v2-kalanianaole.pdf', type: 'draft', size: '5.2 MB', uploadedAt: '2026-04-24T18:00:00Z', uploadedBy: 'Randolph K. Flores' },
    ],
    peerComments: [
      { reviewer: 'Fernando Benavente', comment: 'Sale #3 (Page 47) — confirm financing terms; the cap rate seems low for the period.', status: 'pending', timestamp: '2026-04-27T09:30:00Z' },
      { reviewer: 'Fernando Benavente', comment: 'Highest & best use analysis is solid. Suggest expanding the demand drivers paragraph.', status: 'addressed', timestamp: '2026-04-26T16:15:00Z' },
    ],
  },
  {
    id: 'A-3079',
    client: 'Hawaii Housing Authority',
    property: 'Kalihi Workforce Housing · 84 LIHTC units',
    location: 'Kalihi, O‘ahu',
    propertyType: 'Multi-Family',
    serviceType: 'Market Study',
    fee: 9800,
    feeStatus: 'engaged',
    stage: 'research',
    assignedAppraiser: 'Matthew Flores',
    peerReviewer: 'Brian S. Goto',
    startDate: '2026-04-15',
    dueDate: '2026-05-30',
    daysToDeadline: 31,
    notes: 'State HFDC application deadline July 1 — buffer time included.',
    documents: [
      { name: 'engagement-letter-3079.pdf', type: 'engagement', size: '174 KB', uploadedAt: '2026-04-15T13:00:00Z', uploadedBy: 'Asiimwe Miriam' },
      { name: 'kalihi-rent-comps.xlsx', type: 'comps', size: '128 KB', uploadedAt: '2026-04-23T11:45:00Z', uploadedBy: 'Anthony Chang' },
    ],
    peerComments: [],
  },
  {
    id: 'A-3078',
    client: 'Akela Development',
    property: '240-acre Ag-to-Resort Rezoning Parcel',
    location: 'Kona, Hawai‘i Island',
    propertyType: 'Vacant Land',
    serviceType: 'Strategic Consulting',
    fee: 32000,
    feeStatus: 'engaged',
    stage: 'engaged',
    assignedAppraiser: 'Fernando Benavente',
    peerReviewer: 'Randolph K. Flores',
    startDate: '2026-04-26',
    dueDate: '2026-06-25',
    daysToDeadline: 57,
    notes: 'Investor pitch deck deadline June 20. Phased deliverable schedule.',
    documents: [
      { name: 'engagement-letter-3078.pdf', type: 'engagement', size: '224 KB', uploadedAt: '2026-04-26T15:30:00Z', uploadedBy: 'Asiimwe Miriam' },
    ],
    peerComments: [],
  },
  {
    id: 'A-3077',
    client: 'CNMI Development Corp',
    property: 'Saipan Limited Service Hotel · 142 rooms',
    location: 'Garapan, Saipan',
    propertyType: 'Hotel & Hospitality',
    serviceType: 'Due Diligence Appraisal',
    fee: 28500,
    feeStatus: 'engaged',
    stage: 'drafting',
    assignedAppraiser: 'Fernando Benavente',
    peerReviewer: 'Brian S. Goto',
    startDate: '2026-04-01',
    dueDate: '2026-05-15',
    daysToDeadline: 16,
    notes: 'Buyer needs report for closing. Tourism recovery data critical to value conclusion.',
    documents: [
      { name: 'engagement-letter-3077.pdf', type: 'engagement', size: '212 KB', uploadedAt: '2026-04-01T09:00:00Z', uploadedBy: 'Asiimwe Miriam' },
      { name: 'site-inspection-saipan.zip', type: 'photos', size: '32.1 MB', uploadedAt: '2026-04-09T20:00:00Z', uploadedBy: 'Fernando Benavente' },
      { name: 'cnmi-tourism-stats.xlsx', type: 'workfile', size: '184 KB', uploadedAt: '2026-04-14T10:30:00Z', uploadedBy: 'Kamugisha Pearl' },
      { name: 'pacific-hotel-comps.pdf', type: 'comps', size: '1.6 MB', uploadedAt: '2026-04-19T14:00:00Z', uploadedBy: 'Kamugisha Pearl' },
      { name: 'draft-v1-saipan-hotel.pdf', type: 'draft', size: '6.4 MB', uploadedAt: '2026-04-27T19:30:00Z', uploadedBy: 'Fernando Benavente' },
    ],
    peerComments: [],
  },
  {
    id: 'A-3076',
    client: 'Yamamoto CPA',
    property: 'Hilo Auto Dealership · Closely held real estate',
    location: 'Hilo, Hawai‘i Island',
    propertyType: 'Special Use',
    serviceType: 'Litigation Support · Divorce',
    fee: 12000,
    feeStatus: 'invoiced',
    stage: 'delivered',
    assignedAppraiser: 'Brian S. Goto',
    peerReviewer: 'Fernando Benavente',
    startDate: '2026-03-10',
    dueDate: '2026-04-20',
    daysToDeadline: -9,
    notes: 'Delivered on schedule. Deposition tentatively scheduled June 3.',
    documents: [
      { name: 'final-report-hilo-dealership.pdf', type: 'final', size: '7.2 MB', uploadedAt: '2026-04-19T16:00:00Z', uploadedBy: 'Brian S. Goto' },
      { name: 'invoice-3076.pdf', type: 'invoice', size: '94 KB', uploadedAt: '2026-04-19T17:00:00Z', uploadedBy: 'Asiimwe Miriam' },
    ],
    peerComments: [],
  },
  {
    id: 'A-3075',
    client: 'Akamine Estate Trust',
    property: 'Lanikai Beachfront Residence',
    location: 'Lanikai, O‘ahu',
    propertyType: 'Luxury Residential',
    serviceType: 'Probate Appraisal',
    fee: 4800,
    feeStatus: 'paid',
    stage: 'invoiced',
    assignedAppraiser: 'Kanae Bamba',
    peerReviewer: 'Randolph K. Flores',
    startDate: '2026-03-18',
    dueDate: '2026-04-15',
    daysToDeadline: -14,
    notes: 'Paid 04/22. Trustee was happy with turnaround.',
    documents: [
      { name: 'final-report-lanikai.pdf', type: 'final', size: '4.8 MB', uploadedAt: '2026-04-14T15:30:00Z', uploadedBy: 'Kanae Bamba' },
      { name: 'invoice-3075.pdf', type: 'invoice', size: '88 KB', uploadedAt: '2026-04-14T16:30:00Z', uploadedBy: 'Asiimwe Miriam' },
    ],
    peerComments: [],
  },
  {
    id: 'A-3074',
    client: 'Hokulei Development',
    property: 'Kahului Workforce Housing · 120 units',
    location: 'Kahului, Maui',
    propertyType: 'Multi-Family',
    serviceType: 'Feasibility Study',
    fee: 11500,
    feeStatus: 'engaged',
    stage: 'research',
    assignedAppraiser: 'Jared Miyashiro',
    peerReviewer: 'Matthew Flores',
    startDate: '2026-04-19',
    dueDate: '2026-06-04',
    daysToDeadline: 36,
    notes: 'Rent comp study underway. Absorption forecast next.',
    documents: [
      { name: 'engagement-letter-3074.pdf', type: 'engagement', size: '186 KB', uploadedAt: '2026-04-19T10:30:00Z', uploadedBy: 'Asiimwe Miriam' },
    ],
    peerComments: [],
  },
  {
    id: 'A-3073',
    client: 'Tagaloa Realty',
    property: '18-acre Industrial Subdivision Parcel',
    location: 'Tamuning, Guam',
    propertyType: 'Industrial',
    serviceType: 'Feasibility Study',
    fee: 16500,
    feeStatus: 'engaged',
    stage: 'site-visit',
    assignedAppraiser: 'Fernando Benavente',
    peerReviewer: 'Brian S. Goto',
    startDate: '2026-04-23',
    dueDate: '2026-06-10',
    daysToDeadline: 42,
    notes: 'Coordinated with local zoning office. Aerial drone planned.',
    documents: [
      { name: 'engagement-letter-3073.pdf', type: 'engagement', size: '192 KB', uploadedAt: '2026-04-23T13:00:00Z', uploadedBy: 'Asiimwe Miriam' },
    ],
    peerComments: [],
  },
  {
    id: 'A-3072',
    client: 'Maui Attys LLP',
    property: 'Lahaina Bypass Agricultural Parcel',
    location: 'Lahaina, Maui',
    propertyType: 'Vacant Land',
    serviceType: 'Eminent Domain',
    fee: 19500,
    feeStatus: 'paid',
    stage: 'invoiced',
    assignedAppraiser: 'Randolph K. Flores',
    peerReviewer: 'Fernando Benavente',
    startDate: '2026-03-01',
    dueDate: '2026-04-12',
    daysToDeadline: -17,
    notes: 'Paid 04/16. Settled out of court — favorable result.',
    documents: [
      { name: 'final-report-lahaina-bypass.pdf', type: 'final', size: '8.4 MB', uploadedAt: '2026-04-11T17:00:00Z', uploadedBy: 'Randolph K. Flores' },
      { name: 'invoice-3072.pdf', type: 'invoice', size: '92 KB', uploadedAt: '2026-04-11T17:30:00Z', uploadedBy: 'Asiimwe Miriam' },
    ],
    peerComments: [],
  },
  {
    id: 'A-3071',
    client: 'Central Pacific Bank',
    property: 'Kapolei Strip Mall · 3-property portfolio',
    location: 'Kapolei, O‘ahu',
    propertyType: 'Retail',
    serviceType: 'Acquisition Financing',
    fee: 21000,
    feeStatus: 'engaged',
    stage: 'drafting',
    assignedAppraiser: 'Brian S. Goto',
    peerReviewer: 'Fernando Benavente',
    startDate: '2026-04-04',
    dueDate: '2026-05-12',
    daysToDeadline: 13,
    notes: 'Three-property package — synthesis section drafted.',
    documents: [
      { name: 'engagement-letter-3071.pdf', type: 'engagement', size: '218 KB', uploadedAt: '2026-04-04T11:00:00Z', uploadedBy: 'Asiimwe Miriam' },
      { name: 'kapolei-portfolio-photos.zip', type: 'photos', size: '40.2 MB', uploadedAt: '2026-04-09T18:30:00Z', uploadedBy: 'Brian S. Goto' },
      { name: 'retail-comps-leeward-oahu.pdf', type: 'comps', size: '1.4 MB', uploadedAt: '2026-04-16T13:00:00Z', uploadedBy: 'Anthony Chang' },
      { name: 'draft-kapolei-portfolio.pdf', type: 'draft', size: '5.6 MB', uploadedAt: '2026-04-25T20:15:00Z', uploadedBy: 'Brian S. Goto' },
    ],
    peerComments: [],
  },
]

export interface WorkloadEntry {
  appraiser: string
  initials: string
  role: string
  active: number
  hours: number  // estimated
  capacity: number
  overdue: number
}

export const workloadHeatmap: WorkloadEntry[] = [
  { appraiser: 'Fernando Benavente', initials: 'FB', role: 'Manager', active: 4, hours: 72, capacity: 80, overdue: 0 },
  { appraiser: 'Brian S. Goto', initials: 'BG', role: 'Appraiser Consultant', active: 3, hours: 64, capacity: 80, overdue: 0 },
  { appraiser: 'Randolph K. Flores', initials: 'RF', role: 'Appraiser Consultant', active: 2, hours: 48, capacity: 80, overdue: 0 },
  { appraiser: 'Matthew Flores', initials: 'MF', role: 'Associate', active: 1, hours: 32, capacity: 80, overdue: 0 },
  { appraiser: 'Jared Miyashiro', initials: 'JM', role: 'Certified General', active: 1, hours: 28, capacity: 80, overdue: 0 },
  { appraiser: 'Kanae Bamba', initials: 'KB', role: 'Certified General', active: 0, hours: 8, capacity: 80, overdue: 0 },
  { appraiser: 'Kamugisha Pearl', initials: 'KP', role: 'Senior Market Analyst', active: 5, hours: 56, capacity: 80, overdue: 0 },
  { appraiser: 'Anthony Chang', initials: 'AC', role: 'Market Analyst', active: 4, hours: 48, capacity: 80, overdue: 0 },
]

export const revenuePipeline = [
  { label: 'Awaiting Engagement', count: 4, value: 47000, accent: 'bg-ocean' },
  { label: 'In Progress', count: 6, value: 121800, accent: 'bg-gold' },
  { label: 'Peer Review', count: 1, value: 18000, accent: 'bg-emerald-500' },
  { label: 'Delivered · Awaiting Pay', count: 2, value: 30000, accent: 'bg-emerald-700' },
]

// ============================================================
// Comparable Sales Library
// ============================================================

export interface Comp {
  id: string
  saleDate: string
  propertyType: string
  subtype: string
  address: string
  submarket: string
  region: string
  salePrice: number
  buildingSize: number
  pricePerSqft: number
  capRate: number | null
  yearBuilt: number
  buyer: string
  seller: string
  source: string
  usedInCount: number
  verified: boolean
}

export const mockComps: Comp[] = [
  { id: 'C-1041', saleDate: '2026-03-18', propertyType: 'Office', subtype: 'Class B', address: '700 Bishop St', submarket: 'Honolulu CBD', region: 'O‘ahu', salePrice: 84500000, buildingSize: 178000, pricePerSqft: 475, capRate: 6.4, yearBuilt: 1986, buyer: 'Pacific REIT Capital', seller: '700 Bishop LLC', source: 'Confirmed Sale', usedInCount: 4, verified: true },
  { id: 'C-1040', saleDate: '2026-02-22', propertyType: 'Retail', subtype: 'Strip Center', address: '94-300 Farrington Hwy', submarket: 'Leeward O‘ahu', region: 'O‘ahu', salePrice: 18200000, buildingSize: 42000, pricePerSqft: 433, capRate: 6.8, yearBuilt: 2002, buyer: 'Kapolei Realty Trust', seller: 'Akamine Holdings', source: 'Confirmed Sale', usedInCount: 3, verified: true },
  { id: 'C-1039', saleDate: '2026-02-08', propertyType: 'Hotel', subtype: 'Limited Service', address: '270 Lewers St', submarket: 'Waikiki', region: 'O‘ahu', salePrice: 142000000, buildingSize: 220000, pricePerSqft: 645, capRate: 7.2, yearBuilt: 1991, buyer: 'Pacific Holdings LLC', seller: 'Lewers Hotel Group', source: 'Bureau of Conveyances', usedInCount: 2, verified: true },
  { id: 'C-1038', saleDate: '2026-01-30', propertyType: 'Industrial', subtype: 'Warehouse', address: '94-105 Hanua St', submarket: 'Campbell', region: 'O‘ahu', salePrice: 22500000, buildingSize: 88000, pricePerSqft: 256, capRate: 6.1, yearBuilt: 2014, buyer: 'Hanua Logistics', seller: 'Campbell Industrial Trust', source: 'Confirmed Sale', usedInCount: 5, verified: true },
  { id: 'C-1037', saleDate: '2026-01-12', propertyType: 'Multi-Family', subtype: 'Garden Apartment', address: '1234 Pensacola St', submarket: 'Honolulu', region: 'O‘ahu', salePrice: 31200000, buildingSize: 64000, pricePerSqft: 487, capRate: 5.4, yearBuilt: 1978, buyer: 'Hawaii Capital Partners', seller: 'Pensacola Holdings', source: 'Confirmed Sale', usedInCount: 2, verified: true },
  { id: 'C-1036', saleDate: '2025-12-19', propertyType: 'Office', subtype: 'Class A', address: '1099 Alakea St', submarket: 'Honolulu CBD', region: 'O‘ahu', salePrice: 168000000, buildingSize: 285000, pricePerSqft: 589, capRate: 5.9, yearBuilt: 2003, buyer: 'Trans-Pacific Office REIT', seller: 'Alakea Plaza LLC', source: 'Confirmed Sale', usedInCount: 6, verified: true },
  { id: 'C-1035', saleDate: '2025-12-04', propertyType: 'Retail', subtype: 'Power Center', address: '4569 Kapolei Pkwy', submarket: 'Kapolei', region: 'O‘ahu', salePrice: 41000000, buildingSize: 96000, pricePerSqft: 427, capRate: 6.6, yearBuilt: 2010, buyer: 'Kapolei Retail Partners', seller: 'Hokulei Development', source: 'Confirmed Sale', usedInCount: 3, verified: true },
  { id: 'C-1034', saleDate: '2025-11-21', propertyType: 'Hotel', subtype: 'Resort', address: '3850 Wailea Alanui Dr', submarket: 'Wailea', region: 'Maui', salePrice: 245000000, buildingSize: 310000, pricePerSqft: 790, capRate: 7.8, yearBuilt: 1999, buyer: 'Wailea Resort Holdings', seller: 'Pacific Resort Trust', source: 'Bureau of Conveyances', usedInCount: 2, verified: true },
  { id: 'C-1033', saleDate: '2025-11-08', propertyType: 'Vacant Land', subtype: 'Development', address: 'TMK 3-4-001:042', submarket: 'Kona', region: 'Hawai‘i Island', salePrice: 8400000, buildingSize: 0, pricePerSqft: 0, capRate: null, yearBuilt: 0, buyer: 'Akela Development', seller: 'Kona Ag Holdings LLC', source: 'Confirmed Sale', usedInCount: 1, verified: true },
  { id: 'C-1032', saleDate: '2025-10-27', propertyType: 'Industrial', subtype: 'Manufacturing', address: '99-880 Iwaena St', submarket: 'Aiea', region: 'O‘ahu', salePrice: 14200000, buildingSize: 52000, pricePerSqft: 273, capRate: 6.3, yearBuilt: 1996, buyer: 'Iwaena Industrial LLC', seller: 'Aiea Manufacturing', source: 'Confirmed Sale', usedInCount: 3, verified: true },
  { id: 'C-1031', saleDate: '2025-10-15', propertyType: 'Office', subtype: 'Medical', address: '1380 Lusitana St', submarket: 'Punchbowl', region: 'O‘ahu', salePrice: 9800000, buildingSize: 22000, pricePerSqft: 445, capRate: 6.1, yearBuilt: 2008, buyer: 'Hawaii Medical Properties', seller: 'Lusitana Medical Plaza', source: 'Confirmed Sale', usedInCount: 2, verified: true },
  { id: 'C-1030', saleDate: '2025-09-22', propertyType: 'Multi-Family', subtype: 'High-Rise', address: '1551 Ala Wai Blvd', submarket: 'Waikiki', region: 'O‘ahu', salePrice: 58400000, buildingSize: 102000, pricePerSqft: 573, capRate: 5.2, yearBuilt: 1985, buyer: 'Ala Wai Residential', seller: 'Waikiki Residential LLC', source: 'Confirmed Sale', usedInCount: 4, verified: true },
  { id: 'C-1029', saleDate: '2025-09-04', propertyType: 'Retail', subtype: 'Neighborhood Center', address: '46-005 Kamehameha Hwy', submarket: 'Kaneohe', region: 'O‘ahu', salePrice: 16800000, buildingSize: 38000, pricePerSqft: 442, capRate: 6.9, yearBuilt: 1988, buyer: 'Windward Retail LLC', seller: 'Kaneohe Properties', source: 'Confirmed Sale', usedInCount: 2, verified: true },
  { id: 'C-1028', saleDate: '2025-08-19', propertyType: 'Hotel', subtype: 'Limited Service', address: 'Tumon Bay Rd', submarket: 'Tumon', region: 'Guam', salePrice: 38000000, buildingSize: 85000, pricePerSqft: 447, capRate: 8.4, yearBuilt: 2005, buyer: 'Pacific Lodging Trust', seller: 'Tumon Bay Hotel LLC', source: 'Confirmed Sale', usedInCount: 3, verified: true },
  { id: 'C-1027', saleDate: '2025-08-02', propertyType: 'Office', subtype: 'Class B', address: '737 Bishop St', submarket: 'Honolulu CBD', region: 'O‘ahu', salePrice: 76000000, buildingSize: 168000, pricePerSqft: 452, capRate: 6.5, yearBuilt: 1981, buyer: 'CBD Office Trust', seller: '737 Bishop LLC', source: 'Bureau of Conveyances', usedInCount: 5, verified: true },
  { id: 'C-1026', saleDate: '2025-07-18', propertyType: 'Special Use', subtype: 'Auto Dealership', address: '777 Kapiolani Blvd', submarket: 'Kakaako', region: 'O‘ahu', salePrice: 28500000, buildingSize: 45000, pricePerSqft: 633, capRate: 6.8, yearBuilt: 1997, buyer: 'Kapiolani Auto Holdings', seller: 'Pacific Motors RE', source: 'Confirmed Sale', usedInCount: 1, verified: true },
  { id: 'C-1025', saleDate: '2025-07-04', propertyType: 'Multi-Family', subtype: 'Mid-Rise', address: '801 South King St', submarket: 'Honolulu', region: 'O‘ahu', salePrice: 24200000, buildingSize: 56000, pricePerSqft: 432, capRate: 5.6, yearBuilt: 2001, buyer: 'King Street Residences', seller: 'South King Holdings', source: 'Confirmed Sale', usedInCount: 3, verified: true },
  { id: 'C-1024', saleDate: '2025-06-22', propertyType: 'Industrial', subtype: 'Warehouse', address: '91-225 Kalaeloa Blvd', submarket: 'Kapolei', region: 'O‘ahu', salePrice: 19800000, buildingSize: 78000, pricePerSqft: 254, capRate: 6.2, yearBuilt: 2012, buyer: 'Kalaeloa Logistics', seller: 'Pacific Distribution LLC', source: 'Confirmed Sale', usedInCount: 4, verified: true },
  { id: 'C-1023', saleDate: '2025-06-08', propertyType: 'Vacant Land', subtype: 'Resort', address: '69-1801 Waikoloa Beach Dr', submarket: 'Waikoloa', region: 'Hawai‘i Island', salePrice: 12500000, buildingSize: 0, pricePerSqft: 0, capRate: null, yearBuilt: 0, buyer: 'Waikoloa Resort Holdings', seller: 'Big Island Land Trust', source: 'Confirmed Sale', usedInCount: 2, verified: false },
  { id: 'C-1022', saleDate: '2025-05-26', propertyType: 'Office', subtype: 'Class A', address: 'Marine Corps Dr', submarket: 'Tamuning', region: 'Guam', salePrice: 42000000, buildingSize: 88000, pricePerSqft: 477, capRate: 8.1, yearBuilt: 2007, buyer: 'Guam Office REIT', seller: 'Tamuning Tower LLC', source: 'Confirmed Sale', usedInCount: 2, verified: true },
]

// ============================================================
// Litigation Cases — expert witness tracker
// ============================================================

export type CaseStatus = 'Active' | 'Deposition Scheduled' | 'Trial Scheduled' | 'Settled' | 'Closed'

export interface LitigationCase {
  id: string
  caseName: string
  client: string
  caseType: string
  court: string
  expert: string
  depositionDate: string | null
  trialDate: string | null
  status: CaseStatus
  feeQuoted: number
  hoursLogged: number
  exhibitsReady: boolean
  reportDelivered: boolean
}

export const mockCases: LitigationCase[] = [
  { id: 'CASE-2418', caseName: 'Matsumoto v. Pacific Office Holdings', client: 'Matsumoto Law Group', caseType: 'Commercial Lease Dispute', court: 'First Circuit Court · Honolulu', expert: 'Fernando Benavente', depositionDate: '2026-05-22', trialDate: '2026-06-12', status: 'Trial Scheduled', feeQuoted: 18000, hoursLogged: 47, exhibitsReady: true, reportDelivered: true },
  { id: 'CASE-2417', caseName: 'In Re: Lahaina Bypass Condemnation', client: 'Maui Attys LLP', caseType: 'Eminent Domain', court: 'Second Circuit Court · Maui', expert: 'Randolph K. Flores', depositionDate: null, trialDate: null, status: 'Settled', feeQuoted: 19500, hoursLogged: 38, exhibitsReady: true, reportDelivered: true },
  { id: 'CASE-2416', caseName: 'Yamamoto Auto v. Yamamoto', client: 'Yamamoto CPA', caseType: 'Divorce · Closely Held Business', court: 'Family Court · Hilo', expert: 'Brian S. Goto', depositionDate: '2026-06-03', trialDate: '2026-07-15', status: 'Deposition Scheduled', feeQuoted: 12000, hoursLogged: 24, exhibitsReady: false, reportDelivered: true },
  { id: 'CASE-2415', caseName: 'Kalama Estate Property Tax Appeal', client: 'Self-Represented · Keoni Kalama', caseType: 'Property Tax Appeal', court: 'Tax Appeal Court · O‘ahu', expert: 'Kanae Bamba', depositionDate: null, trialDate: '2026-08-20', status: 'Trial Scheduled', feeQuoted: 6500, hoursLogged: 12, exhibitsReady: false, reportDelivered: false },
  { id: 'CASE-2414', caseName: 'In Re: Akamine Trust', client: 'Bishop & Akela LLP', caseType: 'Estate Valuation Dispute', court: 'Probate Court · O‘ahu', expert: 'Kanae Bamba', depositionDate: '2026-05-15', trialDate: null, status: 'Deposition Scheduled', feeQuoted: 8400, hoursLogged: 18, exhibitsReady: true, reportDelivered: true },
  { id: 'CASE-2413', caseName: 'Pacific Resort Holdings Bankruptcy', client: 'Damon Key Leong', caseType: 'Bankruptcy · Asset Valuation', court: 'US Bankruptcy Court · Hawaii', expert: 'Fernando Benavente', depositionDate: null, trialDate: null, status: 'Active', feeQuoted: 32500, hoursLogged: 8, exhibitsReady: false, reportDelivered: false },
  { id: 'CASE-2412', caseName: 'Tagaloa v. CNMI Zoning Board', client: 'Tagaloa Realty (CNMI counsel)', caseType: 'Zoning Dispute', court: 'CNMI Superior Court · Saipan', expert: 'Fernando Benavente', depositionDate: null, trialDate: '2026-09-04', status: 'Active', feeQuoted: 22000, hoursLogged: 4, exhibitsReady: false, reportDelivered: false },
]

// ============================================================
// Engagement Letters
// ============================================================

export interface EngagementLetter {
  id: string
  client: string
  property: string
  scope: string
  fee: number
  template: string
  createdAt: string
  status: 'Draft' | 'Sent' | 'Signed' | 'Declined'
  sentTo: string | null
}

export const mockLetters: EngagementLetter[] = [
  { id: 'EL-1142', client: 'First Hawaiian Bank', property: 'Pacific Tower · Bishop Street', scope: 'Class B office refinance appraisal', fee: 14500, template: 'Commercial Refinance', createdAt: '2026-04-08', status: 'Signed', sentTo: 'j.nakamura@fhb.com' },
  { id: 'EL-1143', client: 'Pacific Holdings LLC', property: 'Wailea Resort Condominium', scope: 'Construction loan appraisal — proposed 124-unit resort', fee: 22500, template: 'Construction Loan', createdAt: '2026-04-22', status: 'Signed', sentTo: 'schen@pacificholdings.com' },
  { id: 'EL-1144', client: 'Akela Development', property: 'Kona Ag-to-Resort Parcel', scope: 'Strategic consulting · 240-acre rezoning', fee: 32000, template: 'Consulting Engagement', createdAt: '2026-04-26', status: 'Sent', sentTo: 'brandon@akaka-construction.com' },
  { id: 'EL-1145', client: 'Hokulei Development', property: 'Kahului Workforce Housing', scope: 'Feasibility & rent comp study · 120 units', fee: 11500, template: 'Market Study', createdAt: '2026-04-18', status: 'Signed', sentTo: 'jpark@hokulei-development.com' },
  { id: 'EL-1146', client: 'Department of Hawaiian Home Lands', property: 'Waimanalo 60-acre parcel', scope: 'Strategic land use consulting', fee: 18000, template: 'Government Engagement', createdAt: '2026-04-10', status: 'Declined', sentTo: 't.apana@dhhl.hawaii.gov' },
  { id: 'EL-1147', client: 'Tagaloa Realty', property: '18-acre Industrial Subdivision · Tamuning', scope: 'Feasibility study · Pacific region', fee: 16500, template: 'Pacific Region', createdAt: '2026-04-23', status: 'Signed', sentTo: 'r.tagaloa@guam-realty.gu' },
  { id: 'EL-1148', client: 'Hawaii Housing Authority', property: 'Kalihi LIHTC Workforce Housing', scope: 'Market study for HFDC application', fee: 9800, template: 'Market Study', createdAt: '2026-04-15', status: 'Signed', sentTo: 'aiaukea@hihousing.org' },
  { id: 'EL-1149', client: 'Central Pacific Bank', property: 'Kapolei Strip Mall Portfolio', scope: 'Acquisition financing · 3-property package', fee: 21000, template: 'Acquisition Financing', createdAt: '2026-04-04', status: 'Signed', sentTo: 'mwong@centralpacific.com' },
  { id: 'EL-1150', client: 'Iaukea Family Trust', property: 'Kahala oceanfront residence', scope: 'Probate & estate planning appraisal', fee: 5200, template: 'Residential Probate', createdAt: '2026-04-29', status: 'Draft', sentTo: null },
  { id: 'EL-1151', client: 'Bishop Street Capital', property: 'Mixed-use Kakaako parcel', scope: 'Investment due diligence', fee: 13500, template: 'Investment Due Diligence', createdAt: '2026-04-29', status: 'Draft', sentTo: null },
]

export const ENGAGEMENT_TEMPLATES = [
  'Commercial Refinance',
  'Construction Loan',
  'Acquisition Financing',
  'Litigation Support',
  'Property Tax Appeal',
  'Eminent Domain',
  'Probate / Estate',
  'Residential Probate',
  'Market Study',
  'Feasibility Study',
  'Investment Due Diligence',
  'Consulting Engagement',
  'Government Engagement',
  'Pacific Region',
]

// ============================================================
// Invoices
// ============================================================

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue'

export interface Invoice {
  id: string
  assignmentId: string
  client: string
  service: string
  amount: number
  issueDate: string
  dueDate: string
  paidDate: string | null
  status: InvoiceStatus
  daysOutstanding: number
}

export const mockInvoices: Invoice[] = [
  { id: 'INV-2026-0142', assignmentId: 'A-3075', client: 'Akamine Estate Trust', service: 'Probate Appraisal · Lanikai', amount: 4800, issueDate: '2026-04-14', dueDate: '2026-05-14', paidDate: '2026-04-22', status: 'Paid', daysOutstanding: 8 },
  { id: 'INV-2026-0141', assignmentId: 'A-3072', client: 'Maui Attys LLP', service: 'Eminent Domain · Lahaina', amount: 19500, issueDate: '2026-04-11', dueDate: '2026-05-11', paidDate: '2026-04-16', status: 'Paid', daysOutstanding: 5 },
  { id: 'INV-2026-0140', assignmentId: 'A-3076', client: 'Yamamoto CPA', service: 'Litigation Support · Hilo', amount: 12000, issueDate: '2026-04-19', dueDate: '2026-05-19', paidDate: null, status: 'Sent', daysOutstanding: 10 },
  { id: 'INV-2026-0139', assignmentId: 'A-3068', client: 'Hawaiian Trust Co', service: 'Estate Appraisal · Kahala', amount: 6200, issueDate: '2026-03-28', dueDate: '2026-04-27', paidDate: null, status: 'Overdue', daysOutstanding: 32 },
  { id: 'INV-2026-0138', assignmentId: 'A-3066', client: 'Bank of Hawaii', service: 'Refinance · Kapahulu Office', amount: 9500, issueDate: '2026-03-22', dueDate: '2026-04-21', paidDate: '2026-04-04', status: 'Paid', daysOutstanding: 13 },
  { id: 'INV-2026-0137', assignmentId: 'A-3065', client: 'Bishop Capital Partners', service: 'Mixed-use Due Diligence', amount: 14200, issueDate: '2026-03-18', dueDate: '2026-04-17', paidDate: '2026-04-08', status: 'Paid', daysOutstanding: 21 },
  { id: 'INV-2026-0136', assignmentId: 'A-3063', client: 'Maui Land Trust', service: 'Vacant Land · West Maui', amount: 7800, issueDate: '2026-03-12', dueDate: '2026-04-11', paidDate: null, status: 'Overdue', daysOutstanding: 48 },
  { id: 'INV-2026-0135', assignmentId: 'A-3062', client: 'KGT Architects', service: 'Feasibility · Kakaako', amount: 11800, issueDate: '2026-03-08', dueDate: '2026-04-07', paidDate: '2026-03-30', status: 'Paid', daysOutstanding: 22 },
  { id: 'INV-2026-0134', assignmentId: 'A-3060', client: 'Pacific Resort Holdings', service: 'Resort Valuation · Maui', amount: 26500, issueDate: '2026-03-02', dueDate: '2026-04-01', paidDate: '2026-03-25', status: 'Paid', daysOutstanding: 23 },
  { id: 'INV-2026-0133', assignmentId: 'A-3059', client: 'Honolulu Star-Advertiser', service: 'Real Estate Section · Editorial Consulting', amount: 3500, issueDate: '2026-02-26', dueDate: '2026-03-28', paidDate: '2026-03-12', status: 'Paid', daysOutstanding: 14 },
]

// ============================================================
// Submarket Market Data
// ============================================================

export interface Submarket {
  id: string
  name: string
  region: string
  propertyType: string
  metric: 'Cap Rate %' | 'Vacancy %' | 'Asking Rent $/sqft' | 'Sales Volume $M'
  sixMonth: number[]
  current: number
  delta: number
  trend: 'up' | 'down' | 'flat'
  lastUpdated: string
  updatedBy: string
}

export const mockSubmarkets: Submarket[] = [
  { id: 'SM-1', name: 'Honolulu CBD', region: 'O‘ahu', propertyType: 'Class A Office', metric: 'Cap Rate %', sixMonth: [5.6, 5.7, 5.8, 5.9, 5.9, 6.0], current: 6.0, delta: 0.4, trend: 'up', lastUpdated: '2026-04-15', updatedBy: 'Kamugisha Pearl' },
  { id: 'SM-2', name: 'Honolulu CBD', region: 'O‘ahu', propertyType: 'Class A Office', metric: 'Vacancy %', sixMonth: [12.4, 12.6, 13.1, 13.3, 13.5, 13.4], current: 13.4, delta: 1.0, trend: 'up', lastUpdated: '2026-04-15', updatedBy: 'Kamugisha Pearl' },
  { id: 'SM-3', name: 'Wailea', region: 'Maui', propertyType: 'Resort Hotel', metric: 'Cap Rate %', sixMonth: [7.5, 7.6, 7.6, 7.7, 7.8, 7.8], current: 7.8, delta: 0.3, trend: 'up', lastUpdated: '2026-04-12', updatedBy: 'Anthony Chang' },
  { id: 'SM-4', name: 'Waikiki', region: 'O‘ahu', propertyType: 'Limited Service Hotel', metric: 'Cap Rate %', sixMonth: [7.0, 7.1, 7.1, 7.2, 7.2, 7.3], current: 7.3, delta: 0.3, trend: 'up', lastUpdated: '2026-04-10', updatedBy: 'Kamugisha Pearl' },
  { id: 'SM-5', name: 'Kapolei', region: 'O‘ahu', propertyType: 'Industrial Warehouse', metric: 'Asking Rent $/sqft', sixMonth: [1.92, 1.95, 1.98, 2.02, 2.05, 2.08], current: 2.08, delta: 0.16, trend: 'up', lastUpdated: '2026-04-18', updatedBy: 'Anthony Chang' },
  { id: 'SM-6', name: 'Kona', region: 'Hawai‘i Island', propertyType: 'Retail', metric: 'Vacancy %', sixMonth: [8.2, 8.4, 8.6, 8.7, 8.9, 9.1], current: 9.1, delta: 0.9, trend: 'up', lastUpdated: '2026-04-08', updatedBy: 'Anthony Chang' },
  { id: 'SM-7', name: 'Tamuning', region: 'Guam', propertyType: 'Office', metric: 'Cap Rate %', sixMonth: [8.0, 8.1, 8.1, 8.2, 8.1, 8.1], current: 8.1, delta: 0.1, trend: 'flat', lastUpdated: '2026-04-20', updatedBy: 'Kamugisha Pearl' },
  { id: 'SM-8', name: 'Honolulu', region: 'O‘ahu', propertyType: 'Multi-Family', metric: 'Sales Volume $M', sixMonth: [142, 168, 185, 168, 192, 218], current: 218, delta: 76, trend: 'up', lastUpdated: '2026-04-22', updatedBy: 'Kamugisha Pearl' },
]

export interface MarketReport {
  id: string
  title: string
  quarter: string
  region: string
  status: 'Draft' | 'Published'
  publishedAt: string | null
  sectionsComplete: number
  sectionsTotal: number
  author: string
}

export const mockMarketReports: MarketReport[] = [
  { id: 'MR-2026-Q1', title: 'Hawai‘i Commercial Real Estate · Q1 2026 Outlook', quarter: 'Q1 2026', region: 'Hawai‘i Statewide', status: 'Published', publishedAt: '2026-04-15', sectionsComplete: 8, sectionsTotal: 8, author: 'Kamugisha Pearl' },
  { id: 'MR-2026-PAC-Q1', title: 'Pacific Region Commercial Markets · Q1 2026', quarter: 'Q1 2026', region: 'Guam · Saipan · CNMI', status: 'Published', publishedAt: '2026-04-08', sectionsComplete: 6, sectionsTotal: 6, author: 'Anthony Chang' },
  { id: 'MR-2026-MAUI-Q1', title: 'Maui Resort Recovery · Q1 2026 Special Report', quarter: 'Q1 2026', region: 'Maui', status: 'Published', publishedAt: '2026-03-28', sectionsComplete: 5, sectionsTotal: 5, author: 'Kamugisha Pearl' },
  { id: 'MR-2026-Q2', title: 'Hawai‘i Commercial Real Estate · Q2 2026 Mid-Year', quarter: 'Q2 2026', region: 'Hawai‘i Statewide', status: 'Draft', publishedAt: null, sectionsComplete: 3, sectionsTotal: 8, author: 'Kamugisha Pearl' },
  { id: 'MR-2026-OAHU-IND', title: 'O‘ahu Industrial Submarket Deep Dive', quarter: 'Q2 2026', region: 'O‘ahu', status: 'Draft', publishedAt: null, sectionsComplete: 2, sectionsTotal: 6, author: 'Anthony Chang' },
]

// ============================================================
// CV Download Analytics
// ============================================================

export interface CvDownload {
  teamMember: string
  initials: string
  role: string
  downloadsLast30: number
  downloadsAllTime: number
  lastDownloadAt: string
  topSourcePage: string
}

export const mockCvDownloads: CvDownload[] = [
  { teamMember: 'Fernando Benavente', initials: 'FB', role: 'Manager · MAI/SRA', downloadsLast30: 47, downloadsAllTime: 412, lastDownloadAt: '2026-04-29T08:42:00Z', topSourcePage: '/about · referral from Matsumoto Law' },
  { teamMember: 'Brian S. Goto', initials: 'BG', role: 'MAI/SRA', downloadsLast30: 34, downloadsAllTime: 318, lastDownloadAt: '2026-04-28T14:18:00Z', topSourcePage: '/about · litigation referral pages' },
  { teamMember: 'Randolph K. Flores', initials: 'RF', role: 'MAI/SRA', downloadsLast30: 28, downloadsAllTime: 264, lastDownloadAt: '2026-04-28T11:05:00Z', topSourcePage: '/about · eminent domain blog post' },
  { teamMember: 'Kamugisha Pearl', initials: 'KP', role: 'Senior Market Analyst', downloadsLast30: 22, downloadsAllTime: 178, lastDownloadAt: '2026-04-27T16:30:00Z', topSourcePage: '/blog · Cap Rate Trends' },
  { teamMember: 'Jared Miyashiro', initials: 'JM', role: 'Certified General', downloadsLast30: 14, downloadsAllTime: 124, lastDownloadAt: '2026-04-26T09:55:00Z', topSourcePage: '/about' },
  { teamMember: 'Matthew Flores', initials: 'MF', role: 'Associate', downloadsLast30: 11, downloadsAllTime: 86, lastDownloadAt: '2026-04-24T13:22:00Z', topSourcePage: '/about' },
  { teamMember: 'Kanae Bamba', initials: 'KB', role: 'Certified General', downloadsLast30: 9, downloadsAllTime: 72, lastDownloadAt: '2026-04-23T10:10:00Z', topSourcePage: '/about' },
  { teamMember: 'Anthony Chang', initials: 'AC', role: 'Market Analyst', downloadsLast30: 7, downloadsAllTime: 58, lastDownloadAt: '2026-04-22T18:45:00Z', topSourcePage: '/about' },
  { teamMember: 'Asiimwe Miriam', initials: 'AM', role: 'Administrative', downloadsLast30: 2, downloadsAllTime: 12, lastDownloadAt: '2026-04-15T11:00:00Z', topSourcePage: '/about' },
]

// ============================================================
// Lead-to-Revenue Funnel
// ============================================================

export const leadFunnel = [
  { stage: 'Inquiries Received', count: 47, value: 0, hint: 'all sources, last 90 days' },
  { stage: 'Qualified Leads', count: 23, value: 0, hint: 'budget + timeline confirmed' },
  { stage: 'Engagement Letters Sent', count: 16, value: 312500, hint: 'fees quoted' },
  { stage: 'Engaged · Active', count: 12, value: 218300, hint: 'contracts signed' },
  { stage: 'Delivered', count: 9, value: 142800, hint: 'final reports issued' },
  { stage: 'Paid', count: 7, value: 102000, hint: 'invoices collected' },
]

// ============================================================
// License & CE Tracker
// ============================================================

export type LicenseStatus = 'Active' | 'Expiring Soon' | 'Renewal Due' | 'Expired'

export interface License {
  teamMember: string
  initials: string
  state: string
  licenseType: string
  licenseNumber: string
  issuedAt: string
  expiresAt: string
  ceRequired: number
  ceCompleted: number
  status: LicenseStatus
  daysToExpiry: number
}

export const mockLicenses: License[] = [
  { teamMember: 'Fernando Benavente', initials: 'FB', state: 'Hawai‘i', licenseType: 'Certified General Real Estate Appraiser', licenseNumber: 'CGA-1142', issuedAt: '2018-09-12', expiresAt: '2026-09-12', ceRequired: 28, ceCompleted: 24, status: 'Active', daysToExpiry: 136 },
  { teamMember: 'Brian S. Goto', initials: 'BG', state: 'Hawai‘i', licenseType: 'Certified General Real Estate Appraiser', licenseNumber: 'CGA-0894', issuedAt: '2014-06-30', expiresAt: '2026-06-30', ceRequired: 28, ceCompleted: 28, status: 'Expiring Soon', daysToExpiry: 62 },
  { teamMember: 'Randolph K. Flores', initials: 'RF', state: 'Hawai‘i', licenseType: 'Certified General Real Estate Appraiser', licenseNumber: 'CGA-1067', issuedAt: '2017-11-04', expiresAt: '2027-11-04', ceRequired: 28, ceCompleted: 18, status: 'Active', daysToExpiry: 554 },
  { teamMember: 'Matthew Flores', initials: 'MF', state: 'Hawai‘i', licenseType: 'Apprentice Real Estate Appraiser', licenseNumber: 'TRN-2204', issuedAt: '2024-03-15', expiresAt: '2026-03-15', ceRequired: 14, ceCompleted: 12, status: 'Renewal Due', daysToExpiry: -45 },
  { teamMember: 'Jared Miyashiro', initials: 'JM', state: 'Hawai‘i', licenseType: 'Certified General Real Estate Appraiser', licenseNumber: 'CGA-1218', issuedAt: '2020-04-22', expiresAt: '2028-04-22', ceRequired: 28, ceCompleted: 22, status: 'Active', daysToExpiry: 723 },
  { teamMember: 'Kanae Bamba', initials: 'KB', state: 'Hawai‘i', licenseType: 'Certified General Real Estate Appraiser', licenseNumber: 'CGA-1244', issuedAt: '2021-08-10', expiresAt: '2027-08-10', ceRequired: 28, ceCompleted: 14, status: 'Active', daysToExpiry: 468 },
  { teamMember: 'Fernando Benavente', initials: 'FB', state: 'Guam', licenseType: 'Certified General Real Estate Appraiser', licenseNumber: 'GU-CGA-088', issuedAt: '2019-05-14', expiresAt: '2027-05-14', ceRequired: 24, ceCompleted: 16, status: 'Active', daysToExpiry: 380 },
  { teamMember: 'Brian S. Goto', initials: 'BG', state: 'CNMI', licenseType: 'Certified General Real Estate Appraiser', licenseNumber: 'CN-CGA-042', issuedAt: '2020-02-22', expiresAt: '2026-05-22', ceRequired: 24, ceCompleted: 24, status: 'Expiring Soon', daysToExpiry: 23 },
]

export interface SourceAttribution {
  source: string
  count: number
  pctOfLeads: number
  conversionRate: number
  avgFee: number
}

export const sourceAttribution: SourceAttribution[] = [
  { source: 'Matsumoto Law Group', count: 9, pctOfLeads: 19.1, conversionRate: 67, avgFee: 16500 },
  { source: 'First Hawaiian Bank', count: 7, pctOfLeads: 14.9, conversionRate: 71, avgFee: 18800 },
  { source: 'Direct · Contact Form', count: 12, pctOfLeads: 25.5, conversionRate: 33, avgFee: 8200 },
  { source: 'Akaka Construction Network', count: 4, pctOfLeads: 8.5, conversionRate: 50, avgFee: 24000 },
  { source: 'Bishop & Akela LLP', count: 5, pctOfLeads: 10.6, conversionRate: 60, avgFee: 12400 },
  { source: 'Damon Key Leong', count: 3, pctOfLeads: 6.4, conversionRate: 100, avgFee: 22000 },
  { source: 'Pacific Holdings LLC (repeat)', count: 4, pctOfLeads: 8.5, conversionRate: 75, avgFee: 19800 },
  { source: 'Other / Word of Mouth', count: 3, pctOfLeads: 6.5, conversionRate: 33, avgFee: 9400 },
]

// Service-specific inquiry fields for the /services landing pages. Shared by the
// form (client) and /api/contact (server), so validation always matches what
// the form shows.

export interface ServiceField {
  name: string
  label: string
  type: 'select' | 'text' | 'date' | 'radio'
  options?: string[]
  required?: boolean
  placeholder?: string
  // Shown in the compact hero form as well as the full form. Every required
  // field must be quick, or the compact form could never be submitted.
  quick?: boolean
  // Helper text shown under a select once an option is chosen.
  hints?: Record<string, string>
}

export interface ServiceFormConfig {
  // Label stored with each submission and shown in the admin panel.
  label: string
  // Label for the optional property field (address / TMK).
  propertyLabel: string
  fields: ServiceField[]
  note?: string
}

const PROPERTY_TYPES = [
  'Office',
  'Retail',
  'Industrial',
  'Hotel & hospitality',
  'Mixed-use & multifamily',
  'Land & agriculture',
  'Special purpose',
]

export const serviceForms: Record<string, ServiceFormConfig> = {
  'commercial-real-estate-appraisal': {
    label: 'Commercial Real Estate Appraisal',
    propertyLabel: 'Property address or TMK',
    fields: [
      { name: 'property_type', label: 'Property type', type: 'select', options: PROPERTY_TYPES, required: true, quick: true },
      {
        name: 'purpose',
        label: 'Purpose of the appraisal',
        type: 'select',
        options: [
          'Acquisition or disposition',
          'Refinance or construction lending',
          'Partnership buyout or dissolution',
          'Ground lease rent reopening',
          'Insurance replacement cost',
          'Financial reporting',
          'Internal asset management',
          'Pre-listing pricing',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'interest',
        label: 'Interest to be appraised',
        type: 'select',
        options: ['Fee simple', 'Leased fee', 'Leasehold', 'Not sure'],
      },
      { name: 'needed_by', label: 'Report needed by', type: 'date' },
    ],
  },
  'litigation-support-expert-testimony': {
    label: 'Litigation Support & Expert Testimony',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'matter_type',
        label: 'Type of matter',
        type: 'select',
        options: [
          'Partition action',
          'Divorce or marital dissolution',
          'Diminution in value or damages',
          'Lease or ground lease dispute',
          'Business or partnership dispute',
          'Lender or foreclosure matter',
          'Arbitration or mediation',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'parties',
        label: 'Parties involved (for our conflict check)',
        type: 'text',
        required: true,
        quick: true,
        placeholder: 'e.g. Smith v. Jones',
      },
      {
        name: 'key_dates',
        label: 'Key dates',
        type: 'text',
        placeholder: 'Disclosure deadline, trial date',
      },
      { name: 'date_of_value', label: 'Date of value, if known', type: 'date' },
    ],
    note: 'Please share only the names we need for a conflict check. All inquiries are treated with strict confidentiality.',
  },
  'property-tax-appeal': {
    label: 'Property Tax Appeal',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'county',
        label: 'County',
        type: 'select',
        options: ['City & County of Honolulu', 'Maui', 'Hawaiʻi County', 'Kauaʻi'],
        // Mirrors the deadline table on the property tax appeal page.
        hints: {
          'City & County of Honolulu': 'Appeal deadline: January 15 (no extension).',
          Maui: 'Appeal deadline: April 9.',
          'Hawaiʻi County': 'Appeal deadline: April 9.',
          'Kauaʻi': 'Appeal deadline: December 31.',
        },
        required: true,
        quick: true,
      },
      {
        name: 'property_type',
        label: 'Property type',
        type: 'select',
        options: [...PROPERTY_TYPES, 'High-value residential'],
        required: true,
        quick: true,
      },
      {
        name: 'notice_received',
        label: 'Have you received your notice of assessment?',
        type: 'radio',
        options: ['Yes', 'Not yet'],
        required: true,
        quick: true,
      },
      { name: 'assessed_value', label: 'Assessed value, if known', type: 'text', placeholder: 'e.g. $4,200,000' },
    ],
  },
  'eminent-domain-condemnation': {
    label: 'Eminent Domain & Condemnation',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'client_role',
        label: 'You are',
        type: 'select',
        options: ['A state or county agency', 'A federal agency or contractor', 'A property owner', 'An attorney'],
        required: true,
        quick: true,
      },
      {
        name: 'taking_type',
        label: 'Type of acquisition',
        type: 'select',
        options: ['Whole taking', 'Partial taking', 'Easement', 'Inverse condemnation', 'Not sure'],
        required: true,
        quick: true,
      },
      { name: 'project', label: 'Project name or description', type: 'text' },
      { name: 'date_of_summons', label: 'Date of summons, if known', type: 'date' },
      {
        name: 'yellow_book',
        label: 'Yellow Book (UASFLA) report required?',
        type: 'radio',
        options: ['Yes', 'No', 'Not sure'],
      },
    ],
  },
  'market-studies': {
    label: 'Market Analysis & Market Studies',
    propertyLabel: 'Property or site, if any',
    fields: [
      {
        name: 'sector',
        label: 'Property sector',
        type: 'select',
        options: ['Office', 'Retail', 'Industrial', 'Hospitality', 'Multifamily', 'Mixed-use', 'Other'],
        required: true,
        quick: true,
      },
      {
        name: 'location',
        label: 'Island or trade area',
        type: 'text',
        required: true,
        quick: true,
        placeholder: 'e.g. Kapolei, Oʻahu',
      },
      {
        name: 'decision',
        label: 'The study will inform',
        type: 'select',
        options: [
          'Land acquisition or development',
          'Financing',
          'An investment acquisition',
          'Leasing or rent setting',
          'Public planning',
          'Other',
        ],
        required: true,
        quick: true,
      },
      { name: 'timeline', label: 'Timeline', type: 'text', placeholder: 'When do you need the study?' },
    ],
  },
  'feasibility-highest-and-best-use': {
    label: 'Feasibility & Highest and Best Use',
    propertyLabel: 'Site address or TMK',
    fields: [
      {
        name: 'client_role',
        label: 'You are',
        type: 'select',
        options: [
          'A developer',
          'A landowner or trust',
          'A lender or investor',
          'A government or nonprofit landowner',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'decision',
        label: 'The decision you are facing',
        type: 'select',
        options: [
          'Whether to buy a site, and at what price',
          'Rental or for-sale housing',
          'How many units or how much floor area',
          'Renovate or redevelop an existing building',
          'Ground lease or sell land',
          'Best use of a public parcel',
          'Comparing several sites',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'site_status',
        label: 'The site is',
        type: 'radio',
        options: ['Vacant land', 'Improved with a building'],
      },
      { name: 'zoning', label: 'Current zoning, if known', type: 'text', placeholder: 'e.g. BMX-3, A-2' },
      { name: 'timeline', label: 'Timeline', type: 'text', placeholder: 'When do you need the analysis?' },
    ],
  },
  'estate-trust-appraisal': {
    label: 'Estate & Trust Appraisal',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'client_role',
        label: 'You are',
        type: 'select',
        options: [
          'An estate or trust attorney',
          'An executor or personal representative',
          'A trustee',
          'A CPA or family office',
          'A family member',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'appraisal_type',
        label: 'Type of appraisal',
        type: 'select',
        options: [
          'Date of death',
          'Probate / estate inventory',
          'Alternate valuation date',
          'Trust funding or distribution',
          'Gift',
          'Fractional interest',
          'Not sure',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'property_type',
        label: 'Property type',
        type: 'select',
        options: [
          'Home or condominium',
          'Rental property',
          'Commercial property',
          'Leasehold or leased fee interest',
          'Agricultural or ranch land',
          'Undivided family land',
          'Several properties',
        ],
      },
      { name: 'date_of_value', label: 'Date of death or valuation date', type: 'date' },
      { name: 'filing_deadline', label: 'Filing deadline, if known', type: 'date' },
    ],
    note: 'We understand estate work comes at a difficult time. All inquiries are treated with strict confidentiality.',
  },
  'portfolio-valuation': {
    label: 'Portfolio Valuation',
    propertyLabel: 'Main locations of the portfolio',
    fields: [
      {
        name: 'client_role',
        label: 'You are',
        type: 'select',
        options: [
          'A bank or lender',
          'An institutional investor or fund',
          'A landowner or trust',
          'A government agency',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'purpose',
        label: 'Purpose of the valuation',
        type: 'select',
        options: [
          'Acquisition or disposition',
          'Lender collateral review',
          'Note sale or workout',
          'Fund or financial reporting',
          'Ground lease portfolio',
          'Public holdings',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'property_count',
        label: 'Number of properties',
        type: 'select',
        options: ['2–5', '6–15', '16–50', 'More than 50'],
        required: true,
        quick: true,
      },
      {
        name: 'report_format',
        label: 'Report format',
        type: 'select',
        options: ['Full Appraisal Reports', 'Restricted Appraisal Reports', 'A mix', 'Not sure'],
      },
      { name: 'timeline', label: 'Timeline', type: 'text', placeholder: 'When do you need the values?' },
    ],
    note: 'All engagements are treated with strict confidentiality. We agree on secure data sharing at the outset.',
  },
  'ground-lease-valuation': {
    label: 'Ground Lease & Leased Fee Valuation',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'client_role',
        label: 'You are',
        type: 'select',
        options: [
          'A landowner or trust',
          'A lessee or building owner',
          'A buyer',
          'A lender',
          'An association of apartment owners',
          'An attorney',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'interest',
        label: 'Interest to be valued',
        type: 'select',
        options: ['Leased fee', 'Leasehold', 'Both leased fee and leasehold', 'Fee simple', 'Not sure'],
        required: true,
        quick: true,
      },
      {
        name: 'purpose',
        label: 'Purpose of the valuation',
        type: 'select',
        options: [
          'Purchase',
          'Sale',
          'Lease-to-fee conversion',
          'Financing',
          'Reporting or portfolio planning',
          'Other',
        ],
      },
      {
        name: 'property_type',
        label: 'Property type',
        type: 'select',
        options: [
          'Commercial building',
          'Industrial',
          'Hotel or resort',
          'Condominium',
          'Single-family home',
          'Land',
        ],
      },
      { name: 'lease_expiry', label: 'Lease expiration, if known', type: 'text', placeholder: 'e.g. 2055' },
    ],
  },
  'construction-loan-appraisal': {
    label: 'Construction Loan Appraisal',
    propertyLabel: 'Project address or TMK',
    fields: [
      {
        name: 'client_role',
        label: 'You are',
        type: 'select',
        options: ['A bank or credit union', 'A private lender', 'A developer or borrower', 'Other'],
        required: true,
        quick: true,
      },
      {
        name: 'project_type',
        label: 'Project type',
        type: 'select',
        options: [
          'For-sale condominium or subdivision',
          'Rental residential',
          'Mixed-use',
          'Industrial or distribution',
          'Hotel or hospitality',
          'Commercial',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'values_needed',
        label: 'Values needed',
        type: 'select',
        options: ['As-is, as-complete and as-stabilized', 'As-complete and as-stabilized', 'As-is only', 'Not sure'],
      },
      {
        name: 'project_stage',
        label: 'Project stage',
        type: 'select',
        options: ['Proposed, not yet entitled', 'Entitled, not yet started', 'Under construction'],
      },
      { name: 'closing_date', label: 'Target closing date', type: 'date' },
    ],
    note: 'Federally regulated lenders generally must engage the appraiser themselves. If you are a borrower, ask your lender to contact us. All inquiries are treated with strict confidentiality.',
  },
  'ground-rent-arbitration': {
    label: 'Ground Rent Arbitration & Rent Reset',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'client_role',
        label: 'You are',
        type: 'select',
        options: ['A lessor', 'A lessee', 'An attorney', 'Other'],
        required: true,
        quick: true,
      },
      {
        name: 'stage',
        label: 'Where things stand',
        type: 'select',
        options: [
          'Preparing before the reopening date',
          'In negotiation',
          'In mediation',
          'Going to appraisal or arbitration',
          'Not sure',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'support_needed',
        label: 'Support needed',
        type: 'select',
        options: ['Consulting value for negotiation', 'Party appraiser', 'Not sure'],
      },
      { name: 'reopening_date', label: 'Reopening date', type: 'date' },
      {
        name: 'parties',
        label: 'Lessor and lessee (for our conflict check)',
        type: 'text',
      },
    ],
    note: 'We work for lessors and lessees on separate matters, after a conflict check. All inquiries are treated with strict confidentiality.',
  },
  'luxury-home-appraisal': {
    label: 'Luxury Residential Valuation',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'purpose',
        label: 'Purpose of the appraisal',
        type: 'select',
        options: [
          'Estate and trust',
          'Divorce',
          'Property tax appeal',
          'Private sale or purchase',
          'Gifting and planning',
          'Partnership and co-ownership',
          'Insurance and records',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'island',
        label: 'Island',
        type: 'select',
        options: ['Oʻahu', 'Maui', 'Hawaiʻi Island', 'Kauaʻi'],
        required: true,
        quick: true,
      },
      {
        name: 'property_kind',
        label: 'Property',
        type: 'select',
        options: ['Oceanfront home', 'View or estate home', 'Luxury condominium', 'Leasehold residence', 'Other'],
      },
      { name: 'date_of_value', label: 'Date of value, if known', type: 'date' },
    ],
    note: 'This service is for private, non-lending purposes. If you need an appraisal for a mortgage or refinance, your lender will order it through its own panel. Every enquiry is confidential.',
  },
  'real-estate-consulting': {
    label: 'Real Estate Consulting',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'client_role',
        label: 'You are',
        type: 'select',
        options: ['An owner', 'A buyer', 'A seller', 'A lender', 'A fiduciary', 'Other'],
        required: true,
        quick: true,
      },
      {
        name: 'assignment',
        label: 'What you need',
        type: 'select',
        options: ['Appraisal review', 'Lease abstracts and analysis', 'Acquisition or disposition advice', 'Not sure'],
        required: true,
        quick: true,
      },
      { name: 'property_type', label: 'Property type', type: 'select', options: PROPERTY_TYPES },
      { name: 'timeline', label: 'Timeline', type: 'text', placeholder: 'When do you need to decide?' },
    ],
    note: 'We advise buyers, sellers, owners and lenders, after a conflict check. All inquiries are treated with strict confidentiality.',
  },
  attorneys: {
    label: 'For Attorneys',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'matter_type',
        label: 'Type of matter',
        type: 'select',
        options: [
          'Real estate dispute, partition, divorce or damages',
          'Condemnation or inverse condemnation',
          'Probate, estate or trust',
          'Ground lease rent reopening',
          'Property tax dispute',
          'Luxury residential matter',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'parties',
        label: 'Parties involved (for our conflict check)',
        type: 'text',
        required: true,
        quick: true,
        placeholder: 'e.g. Smith v. Jones',
      },
      {
        name: 'venue',
        label: 'Court or venue',
        type: 'select',
        options: [
          'First Circuit (Oʻahu)',
          'Second Circuit (Maui County)',
          'Third Circuit (Hawaiʻi Island)',
          'Fifth Circuit (Kauaʻi)',
          'Federal court',
          'Tax Appeal Court or Board of Review',
          'Arbitration or mediation',
          'Guam or the Northern Mariana Islands',
          'Other or not yet filed',
        ],
      },
      {
        name: 'expert_role',
        label: 'Expert role',
        type: 'select',
        options: ['Consulting expert', 'Testifying expert', 'Not sure'],
      },
      { name: 'disclosure_date', label: 'Expert disclosure date, if known', type: 'date' },
    ],
    note: 'Please share only the names we need for a conflict check. All inquiries are treated with strict confidentiality.',
  },
  lenders: {
    label: 'For Lenders & Financial Institutions',
    propertyLabel: 'Collateral address or TMK',
    fields: [
      {
        name: 'institution',
        label: 'Your institution',
        type: 'select',
        options: ['A bank', 'A credit union', 'A private lender', 'Other'],
        required: true,
        quick: true,
      },
      {
        name: 'assignment',
        label: 'What you need',
        type: 'select',
        options: [
          'Acquisition or refinance appraisal',
          'Construction or development appraisal',
          'Leasehold collateral',
          'Portfolio or collateral review',
          'Update appraisal',
          'Appraisal review',
          'Workout, REO or foreclosure',
          'Our qualifications package for your panel',
        ],
        required: true,
        quick: true,
      },
      { name: 'property_type', label: 'Property type', type: 'select', options: PROPERTY_TYPES },
      { name: 'needed_by', label: 'Report needed by', type: 'date' },
    ],
    note: 'We work under your engagement letter. All inquiries are treated with strict confidentiality.',
  },
  'developers-investors': {
    label: 'For Developers & Investors',
    propertyLabel: 'Site address or TMK',
    fields: [
      {
        name: 'client_role',
        label: 'You are',
        type: 'select',
        options: ['A developer', 'A fund or family office', 'A private investor', 'Other'],
        required: true,
        quick: true,
      },
      {
        name: 'stage',
        label: 'Your stage',
        type: 'select',
        options: ['Before buying', 'Before building', 'Before borrowing', 'Before selling', 'Not sure'],
        required: true,
        quick: true,
      },
      {
        name: 'site_status',
        label: 'The site is',
        type: 'radio',
        options: ['Vacant land', 'Improved with a building'],
      },
      { name: 'timeline', label: 'Timeline', type: 'text', placeholder: 'When is the decision due?' },
    ],
    note: 'For federally regulated loans, the lender must engage the appraiser. All inquiries are treated with strict confidentiality.',
  },
  'government-agencies': {
    label: 'For Government Agencies',
    propertyLabel: 'Parcel address or TMK',
    fields: [
      {
        name: 'agency',
        label: 'Your agency',
        type: 'select',
        options: [
          'State of Hawaiʻi',
          'City and County of Honolulu',
          'County of Maui',
          'County of Hawaiʻi',
          'County of Kauaʻi',
          'A federal agency',
          'A Pacific government',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'assignment',
        label: 'What you need',
        type: 'select',
        options: [
          'Acquisition',
          'Disposition',
          'Remnant',
          'Easement',
          'Public land lease rent',
          'Market study',
          'Appraisal review',
          'Litigation support',
          'Our capability statement',
        ],
        required: true,
        quick: true,
      },
      { name: 'project', label: 'Project name or description', type: 'text' },
      {
        name: 'standard',
        label: 'Standard required',
        type: 'select',
        options: ['USPAP', 'Yellow Book (UASFLA)', 'Not sure'],
      },
      { name: 'needed_by', label: 'Report needed by', type: 'date' },
    ],
  },
  'hotel-hospitality': {
    label: 'Hotel & Hospitality',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'property_type',
        label: 'Property type',
        type: 'select',
        options: [
          'Full-service or resort hotel',
          'Select-service hotel',
          'Condo-hotel',
          'Ground-leased resort hotel',
          'Pacific island hotel',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'purpose',
        label: 'Purpose of the appraisal',
        type: 'select',
        options: ['Financing', 'Acquisition or sale', 'Property tax appeal', 'Litigation', 'Ground lease matter', 'Other'],
        required: true,
        quick: true,
      },
      {
        name: 'market',
        label: 'Market',
        type: 'select',
        options: [
          'Waikīkī',
          'Ko Olina and West Oʻahu',
          'North Shore Oʻahu',
          'West Maui',
          'South Maui',
          'Kohala Coast and Kailua-Kona',
          'Kauaʻi',
          'Guam',
          'Saipan',
          'Other',
        ],
      },
      { name: 'needed_by', label: 'Report needed by', type: 'date' },
    ],
  },
  industrial: {
    label: 'Industrial & Warehouse',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'property_type',
        label: 'Property type',
        type: 'select',
        options: ['Warehouse', 'Distribution building', 'Flex space', 'Industrial land', 'Other'],
        required: true,
        quick: true,
      },
      {
        name: 'purpose',
        label: 'Purpose of the appraisal',
        type: 'select',
        options: ['Financing', 'Purchase or sale', 'Litigation', 'Ground lease matter', 'Other'],
        required: true,
        quick: true,
      },
      {
        name: 'land_tenure',
        label: 'Land tenure',
        type: 'radio',
        options: ['Fee simple', 'Ground leased', 'Not sure'],
      },
      { name: 'needed_by', label: 'Report needed by', type: 'date' },
    ],
  },
  'agricultural-land': {
    label: 'Agricultural & Conservation Land',
    propertyLabel: 'Tax map key (TMK)',
    fields: [
      {
        name: 'land_type',
        label: 'Land type',
        type: 'select',
        options: [
          'Diversified farmland',
          'Pasture or ranch land',
          'Orchard or specialty crops',
          'Former plantation land',
          'Gentleman farm or estate',
          'Conservation district land',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'purpose',
        label: 'Purpose of the appraisal',
        type: 'select',
        options: [
          'Sale or purchase',
          'Financing',
          'Estate or trust',
          'Partition among family owners',
          'Government acquisition',
          'Lease rent on public agricultural land',
          'Conservation easement',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'island',
        label: 'Island',
        type: 'select',
        options: ['Oʻahu', 'Hawaiʻi Island', 'Maui', 'Kauaʻi', 'Molokaʻi or Lānaʻi'],
      },
      { name: 'acreage', label: 'Approximate acreage', type: 'text', placeholder: 'e.g. 40 acres' },
    ],
  },
  'office-retail': {
    label: 'Office & Retail',
    propertyLabel: 'Property address or TMK',
    fields: [
      {
        name: 'property_type',
        label: 'Property type',
        type: 'select',
        options: [
          'Downtown or CBD office',
          'Suburban office',
          'Shopping center',
          'Street or urban retail',
          'Single-tenant net lease',
          'Mixed-use',
          'Other',
        ],
        required: true,
        quick: true,
      },
      {
        name: 'purpose',
        label: 'Purpose of the appraisal',
        type: 'select',
        options: ['Financing', 'Purchase or sale', 'Litigation', 'Ground lease matter', 'Other'],
        required: true,
        quick: true,
      },
      { name: 'needed_by', label: 'Report needed by', type: 'date' },
    ],
  },
  process: {
    label: 'Our Process',
    propertyLabel: 'Property address or TMK',
    fields: [
      { name: 'property_type', label: 'Property type', type: 'select', options: PROPERTY_TYPES, required: true, quick: true },
      {
        name: 'purpose',
        label: 'What the appraisal will be used for',
        type: 'text',
        required: true,
        quick: true,
        placeholder: 'e.g. a loan, a tax appeal or a lawsuit',
      },
      {
        name: 'date_of_value',
        label: 'Date of value',
        type: 'radio',
        options: ['Today', 'A past date', 'A future date'],
      },
      { name: 'deadline', label: 'Report needed by', type: 'date' },
    ],
  },
}

// Admin-facing label for a stored service slug; unknown or missing → General.
export function serviceLabel(slug: string | null | undefined): string {
  return (slug && serviceForms[slug]?.label) || 'General inquiry'
}

// First line of an inquiry saved before migration 0007 added the service
// columns (the details are written into the message instead). The admin panel
// reads it back to recover the service.
export const serviceMarker = (slug: string) => `[service:${slug}]`
const MARKER_RE = /^\[service:([a-z0-9-]+)\]\n?/

export function parseServiceMarker(message: string): { service: string | null; message: string } {
  const m = message.match(MARKER_RE)
  return m ? { service: m[1], message: message.slice(m[0].length) } : { service: null, message }
}

const MAX_DETAIL_LENGTH = 300

// Keeps only the service's own fields, checks required ones and select/radio
// options. Returns the cleaned details or a visitor-facing error.
export function validateServiceDetails(
  slug: string,
  raw: unknown
): { ok: true; details: Record<string, string> } | { ok: false; error: string } {
  const config = serviceForms[slug]
  if (!config) return { ok: false, error: 'Unknown service.' }
  const input = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {}

  const details: Record<string, string> = {}
  for (const field of config.fields) {
    const value = String(input[field.name] ?? '').trim()
    if (!value) {
      if (field.required) return { ok: false, error: `Please complete: ${field.label}.` }
      continue
    }
    if (value.length > MAX_DETAIL_LENGTH) return { ok: false, error: `${field.label} is too long.` }
    if (field.options && !field.options.includes(value)) {
      return { ok: false, error: `Please choose a valid option for: ${field.label}.` }
    }
    if (field.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return { ok: false, error: `Please enter a valid date for: ${field.label}.` }
    }
    details[field.name] = value
  }
  return { ok: true, details }
}

// Field label for a stored detail key, for display in the admin panel.
export function detailLabel(slug: string | null | undefined, key: string): string {
  const field = slug ? serviceForms[slug]?.fields.find((f) => f.name === key) : undefined
  return field?.label ?? key.replace(/_/g, ' ')
}

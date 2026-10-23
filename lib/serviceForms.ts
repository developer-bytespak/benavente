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

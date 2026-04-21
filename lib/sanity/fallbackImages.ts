export const slugFallbackImage: Record<string, string> = {
  'hawaii-commercial-cap-rate-trends-2025': '/images/regions/oahu-skyline.webp',
  'understanding-property-tax-appeals-hawaii':
    '/images/gallery/office/dji_0912.webp',
  'pacific-island-markets-valuation-challenges': '/images/regions/guam.webp',
  'litigation-support-what-attorneys-need':
    '/images/gallery/cbd/dji_0347.webp',
  'guam-real-estate-emerging-dynamics': '/images/regions/guam-2.webp',
  'what-is-a-cap-rate': '/images/gallery/retail/dji_0083-large.webp',
}

export const DEFAULT_FALLBACK_IMAGE = '/images/regions/oahu-skyline.webp'

export function fallbackImageForSlug(slug?: string): string {
  if (!slug) return DEFAULT_FALLBACK_IMAGE
  return slugFallbackImage[slug] || DEFAULT_FALLBACK_IMAGE
}

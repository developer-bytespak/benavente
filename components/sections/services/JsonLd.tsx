export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://benaventegroup.com'

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString()
}

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  }
}

export const providerSchema = {
  '@type': 'ProfessionalService',
  name: 'The Benavente Group LLC',
  url: siteUrl,
  areaServed: ['Hawaii', 'Guam', 'Northern Mariana Islands', 'Marshall Islands'],
}

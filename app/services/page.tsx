import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceHero from '@/components/sections/services/ServiceHero'
import ServicesIndex from '@/components/sections/services/ServicesIndex'
import {
  ServicesIntro,
  WhoWeServe,
  PacificMarkets,
  TrustSection,
} from '@/components/sections/services/OverviewSections'
import ServiceCta from '@/components/sections/services/ServiceCta'
import JsonLd, { absoluteUrl, breadcrumbSchema } from '@/components/sections/services/JsonLd'
import { services, serviceHref } from '@/lib/services'

const description =
  "Commercial real estate appraisal, litigation support, property tax appeal, eminent domain and market study services across Hawai'i and the Pacific from MAI-designated appraisers."

export const metadata: Metadata = {
  title: 'Real Estate Appraisal & Advisory Services in Hawaii',
  description,
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Real Estate Valuation & Advisory Services | The Benavente Group',
    description,
    url: '/services',
    images: [{ url: '/images/regions/oahu-skyline.webp' }],
  },
}

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Real Estate Valuation & Advisory Services',
          itemListElement: services.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.title,
            url: absoluteUrl(serviceHref(s.slug)),
          })),
        }}
      />

      <ServiceHero
        eyebrow="Services"
        heading={'Real Estate Valuation &\n_Advisory Services_'}
        subhead="Independent appraisal, litigation support, market analysis and advisory services for attorneys, lenders, developers, owners and public agencies across Hawai‘i and the Pacific."
        image="/images/regions/oahu-skyline.webp"
        imageAlt="Aerial view of Honolulu high-rises with Diamond Head in the distance"
        breadcrumb={crumbs}
        secondaryCta={{ label: 'Explore Services', href: '#services-index' }}
        footer={
          <nav aria-label="Services" className="hidden md:grid grid-cols-5 border-t border-white/15">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={serviceHref(s.slug)}
                className="group pt-5 pr-4 border-t border-transparent -mt-px hover:border-gold transition-colors duration-500"
              >
                <span className="block text-gold-light font-serif text-[12px] tracking-[0.2em]">{s.number}</span>
                <span className="block text-white/60 group-hover:text-white font-serif text-[16px] leading-[1.3] mt-1 transition-colors duration-300">
                  {s.shortTitle}
                </span>
              </Link>
            ))}
          </nav>
        }
      />
      <ServicesIntro />
      <ServicesIndex />
      <WhoWeServe />
      <PacificMarkets />
      <TrustSection />
      <ServiceCta />
    </>
  )
}

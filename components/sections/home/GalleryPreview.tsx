'use client'

import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const previewCategories = [
  {
    slug: 'retail',
    label: 'Retail',
    image: '/images/gallery/retail/dji_0083-large.webp',
  },
  {
    slug: 'vacant-land',
    label: 'Vacant / Development Land',
    image: '/images/gallery/vacant-land/dji_0111-large.webp',
  },
  {
    slug: 'hotel-hospitality',
    label: 'Hotel & Hospitality',
    image: '/images/gallery/hotel-hospitality/dji_0861-large.webp',
  },
  {
    slug: 'industrial',
    label: 'Industrial',
    image: '/images/gallery/industrial/dji_0889.webp',
  },
  {
    slug: 'special-use',
    label: 'Special Use',
    image: '/images/gallery/special-use/dji_0675-large.webp',
  },
]

export default function GalleryPreview() {
  return (
    <section className="bg-white py-[108px] px-[4.5%]">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gold/20 pb-5 mb-10 gap-4">
        <div>
          <SectionLabel>Portfolio</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
            Selected <span className="italic text-gold">Projects</span>
          </h2>
        </div>
        <MicroCTA href="/gallery">See Full Portfolio</MicroCTA>
      </div>

      {/* Grid */}
      <RevealOnScroll>
        <div
          className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
          style={{ gridTemplateRows: 'auto auto' }}
        >
          {previewCategories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/gallery?cat=${cat.slug}`}
              className={`group relative overflow-hidden rounded-[2px] cursor-pointer ${
                i === 0 ? 'md:row-span-2 min-h-[300px] lg:min-h-0' : 'min-h-[220px]'
              }`}
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-gold text-[12px] uppercase tracking-[0.2em] font-serif">Category</span>
                <span className="text-white font-serif text-[22px] mt-1">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}

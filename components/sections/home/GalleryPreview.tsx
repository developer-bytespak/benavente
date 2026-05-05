import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { getCategoriesWithCounts } from '@/lib/cms/gallery'

const MAX_PREVIEW = 5

export default async function GalleryPreview() {
  const all = await getCategoriesWithCounts()
  const preview = all.filter((c) => c.cover_url).slice(0, MAX_PREVIEW)

  if (preview.length === 0) return null

  return (
    <section className="bg-white py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gold/20 pb-5 mb-10 gap-4">
        <div>
          <SectionLabel>Portfolio</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
            Selected <span className="italic text-gold">Projects</span>
          </h2>
        </div>
        <MicroCTA href="/gallery">See Full Portfolio</MicroCTA>
      </div>

      <RevealOnScroll>
        <div
          className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
          style={{ gridTemplateRows: 'auto auto' }}
        >
          {preview.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/gallery?cat=${cat.slug}`}
              className={`group relative overflow-hidden rounded-[2px] cursor-pointer min-h-[220px] ${
                i === 0 ? 'md:row-span-2 md:min-h-[300px] lg:min-h-0' : ''
              }`}
            >
              {cat.cover_url && (
                <Image
                  src={cat.cover_url}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
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

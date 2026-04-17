'use client'

import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { regions } from '@/lib/data/regions'

const regionImages: Record<string, string> = {
  "O'ahu": '/images/regions/oahu-skyline.webp',
  "Maui": '/images/regions/maui.webp',
  "Hawai'i Is.": '/images/regions/big-island.webp',
  "Guam & Saipan": '/images/regions/guam.webp',
  "Marshall Is.": '/images/regions/kauai.webp',
  "Other Pacific": '/images/regions/guam-2.webp',
}

export default function RegionsCoverage() {
  return (
    <section className="bg-white border-t border-gold/12 py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto">
        <RevealOnScroll>
          <SectionLabel>Coverage</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
            Serving <span className="italic text-gold">Hawai&#8216;i</span> &amp; the Pacific
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {regions.map((region) => {
              const img = regionImages[region.name]
              return (
                <div
                  key={region.name}
                  className="group relative overflow-hidden rounded-[2px] aspect-[4/3]"
                >
                  {img ? (
                    <Image
                      src={img}
                      alt={region.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-light" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="font-serif text-[24px] text-white leading-tight">{region.name}</div>
                    <div className="font-serif font-light text-[15px] text-white/75 mt-1">{region.note}</div>
                    <div className="w-8 h-px bg-gold mt-4 transition-all duration-500 group-hover:w-14" />
                  </div>
                </div>
              )
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

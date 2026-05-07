'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import RegionModal from './RegionModal'
import type { RegionRow } from '@/lib/supabase/types'

interface Props {
  regions: RegionRow[]
}

export default function RegionsCoverage({ regions }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)
  const active = openId ? regions.find((r) => r.id === openId) ?? null : null

  if (regions.length === 0) return null

  return (
    <section className="bg-white border-t border-gold/12 py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto">
        <RevealOnScroll>
          <SectionLabel>Coverage</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
            Serving <span className="italic text-gold">Hawai&#8216;i</span> &amp; the Pacific
          </h2>
          <p className="text-slate text-[15px] font-serif mt-3">
            As a Pacific real estate valuation firm, we cover commercial appraisal across the major Hawaiian Islands and the broader Pacific. Click a location to view imagery from the region.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setOpenId(region.id)}
                className="group relative overflow-hidden rounded-[2px] aspect-[4/3] text-left"
              >
                {region.hero_image_url ? (
                  <Image
                    src={region.hero_image_url}
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
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-8 h-px bg-gold transition-all duration-500 group-hover:w-14" />
                    <span className="text-gold text-[11px] uppercase tracking-[0.2em] font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Photos
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      <RegionModal
        open={openId !== null}
        onClose={() => setOpenId(null)}
        label={active?.name ?? ''}
        images={active?.broll_images ?? []}
      />
    </section>
  )
}

'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import GalleryFilters from '@/components/sections/gallery/GalleryFilters'
import GalleryGrid, { GalleryItem } from '@/components/sections/gallery/GalleryGrid'
import CtaBand from '@/components/sections/home/CtaBand'
import { galleryCategories } from '@/lib/data/gallery'

function GalleryContent() {
  const searchParams = useSearchParams()
  const initial = searchParams.get('cat') || 'all'
  const [active, setActive] = useState(initial)

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActive(cat)
  }, [searchParams])

  const items: GalleryItem[] = useMemo(() => {
    const source = active === 'all'
      ? galleryCategories
      : galleryCategories.filter((c) => c.slug === active)
    return source.flatMap((c) => c.images.map((src) => ({ src, category: c.label })))
  }, [active])

  return (
    <>
      <GalleryFilters active={active} onFilter={setActive} />
      <GalleryGrid items={items} />
    </>
  )
}

export default function GalleryPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-navy pt-[160px] pb-[80px] px-[4.5%]">
        <RevealOnScroll>
          <div className="max-w-[1280px] mx-auto">
            <SectionLabel variant="light">Portfolio</SectionLabel>
            <h1 className="font-serif text-[clamp(44px,6vw,72px)] text-white leading-[1.08]">
              Featured <span className="italic text-gold-light">Projects</span><br />
              &amp; Assignments
            </h1>
            <p className="text-white/[0.58] text-[18px] font-light leading-[1.85] max-w-[560px] mt-5">
              A sampling of prior studies and services across Hawai&#8216;i, Guam, Saipan, the Marshall Islands, and other Pacific Islands.
            </p>
            <div className="flex flex-wrap gap-5 mt-7">
              <MicroCTA href="/contact" variant="light">Start a Project</MicroCTA>
              <MicroCTA href="/about" variant="light">Our Expertise</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <Suspense fallback={<div className="h-[200px]" />}>
        <GalleryContent />
      </Suspense>

      <CtaBand />
    </>
  )
}

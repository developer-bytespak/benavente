'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import GalleryFilters from '@/components/sections/gallery/GalleryFilters'
import GalleryGrid, { GalleryItem } from '@/components/sections/gallery/GalleryGrid'
import GalleryPagination from '@/components/sections/gallery/GalleryPagination'
import CtaBand from '@/components/sections/home/CtaBand'
import { galleryCategories } from '@/lib/data/gallery'

const PAGE_SIZE = 12

function GalleryContent() {
  const searchParams = useSearchParams()
  const initial = searchParams.get('cat') || 'all'
  const [active, setActive] = useState(initial)
  const [page, setPage] = useState(1)
  const gridTopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActive(cat)
  }, [searchParams])

  const allItems: GalleryItem[] = useMemo(() => {
    const source = active === 'all'
      ? galleryCategories
      : galleryCategories.filter((c) => c.slug === active)
    return source.flatMap((c) => c.images.map((src) => ({ src, category: c.label })))
  }, [active])

  const totalPages = Math.max(1, Math.ceil(allItems.length / PAGE_SIZE))

  useEffect(() => {
    setPage(1)
  }, [active])

  const pagedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return allItems.slice(start, start + PAGE_SIZE)
  }, [allItems, page])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <GalleryFilters active={active} onFilter={setActive} />
      <div ref={gridTopRef} />
      <GalleryGrid items={pagedItems} />
      {totalPages > 1 && (
        <GalleryPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}

export default function GalleryPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-navy min-h-screen flex items-center pt-[120px] pb-[60px] px-[4.5%] overflow-hidden">
        <Image
          src="/images/regions/big-island.webp"
          alt="Hilo Bay, Hawaii"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />
        <RevealOnScroll>
          <div className="relative max-w-[1280px] mx-auto">
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

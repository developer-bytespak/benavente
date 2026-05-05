'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import GalleryFilters from './GalleryFilters'
import GalleryGrid, { GalleryItem } from './GalleryGrid'
import GalleryPagination from './GalleryPagination'
import type { GalleryCategoryRow, GalleryImageRow } from '@/lib/supabase/types'

const PAGE_SIZE = 12

interface Props {
  categories: (GalleryCategoryRow & { images: GalleryImageRow[] })[]
}

export default function GalleryClient({ categories }: Props) {
  const searchParams = useSearchParams()
  const initial = searchParams.get('cat') || 'all'
  const [active, setActive] = useState(initial)
  const [page, setPage] = useState(1)
  const gridTopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActive(cat)
  }, [searchParams])

  const filterOptions = useMemo(
    () => categories.map((c) => ({ slug: c.slug, label: c.label })),
    [categories]
  )

  const allItems: GalleryItem[] = useMemo(() => {
    const source =
      active === 'all' ? categories : categories.filter((c) => c.slug === active)
    return source.flatMap((c) =>
      c.images.map((img) => ({ src: img.image_url, category: c.label }))
    )
  }, [active, categories])

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
      <GalleryFilters active={active} onFilter={setActive} options={filterOptions} />
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

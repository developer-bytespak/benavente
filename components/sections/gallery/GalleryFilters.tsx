'use client'

import { galleryCategories } from '@/lib/data/gallery'

interface GalleryFiltersProps {
  active: string
  onFilter: (slug: string) => void
}

export default function GalleryFilters({ active, onFilter }: GalleryFiltersProps) {
  const allFilters = [{ slug: 'all', label: 'All Projects' }, ...galleryCategories]
  const row1 = allFilters.slice(0, 6)
  const row2 = allFilters.slice(6)

  const btnClass = (slug: string) =>
    `px-3 sm:px-4 py-2 text-[12px] sm:text-[14px] font-serif uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap ${
      active === slug
        ? 'text-navy border-b-2 border-gold'
        : 'text-slate-light hover:text-navy'
    }`

  return (
    <div className="bg-white border-b border-navy/8 py-4 lg:py-5 px-[4.5%] sticky top-0 z-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Mobile: single horizontal scrollable row */}
        <div className="flex lg:hidden gap-2 overflow-x-auto -mx-1 px-1">
          {allFilters.map((f) => (
            <button key={f.slug} onClick={() => onFilter(f.slug)} className={btnClass(f.slug)}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Desktop: 2 rows of 6 with divider */}
        <div className="hidden lg:block">
          <div className="flex gap-2 justify-center">
            {row1.map((f) => (
              <button key={f.slug} onClick={() => onFilter(f.slug)} className={btnClass(f.slug)}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="h-px bg-gold/20 my-3 mx-auto max-w-[80%]" />
          <div className="flex gap-2 justify-center">
            {row2.map((f) => (
              <button key={f.slug} onClick={() => onFilter(f.slug)} className={btnClass(f.slug)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

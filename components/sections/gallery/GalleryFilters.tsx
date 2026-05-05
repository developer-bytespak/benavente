'use client'

interface FilterOption {
  slug: string
  label: string
}

interface GalleryFiltersProps {
  active: string
  onFilter: (slug: string) => void
  options: FilterOption[]
}

export default function GalleryFilters({ active, onFilter, options }: GalleryFiltersProps) {
  const allFilters = [{ slug: 'all', label: 'All Projects' }, ...options]
  const half = Math.ceil(allFilters.length / 2)
  const row1 = allFilters.slice(0, half)
  const row2 = allFilters.slice(half)

  const btnClass = (slug: string) =>
    `px-3 sm:px-4 py-2 text-[12px] sm:text-[14px] font-serif uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap ${
      active === slug
        ? 'text-navy border-b-2 border-gold'
        : 'text-slate-light hover:text-navy'
    }`

  return (
    <div className="bg-white border-b border-navy/8 py-4 lg:py-5 px-[4.5%] sticky top-0 z-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex lg:hidden gap-2 overflow-x-auto -mx-1 px-1">
          {allFilters.map((f) => (
            <button key={f.slug} onClick={() => onFilter(f.slug)} className={btnClass(f.slug)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="flex gap-2 justify-center flex-wrap">
            {row1.map((f) => (
              <button key={f.slug} onClick={() => onFilter(f.slug)} className={btnClass(f.slug)}>
                {f.label}
              </button>
            ))}
          </div>
          {row2.length > 0 && (
            <>
              <div className="h-px bg-gold/20 my-3 mx-auto max-w-[80%]" />
              <div className="flex gap-2 justify-center flex-wrap">
                {row2.map((f) => (
                  <button key={f.slug} onClick={() => onFilter(f.slug)} className={btnClass(f.slug)}>
                    {f.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

const filters = [
  { key: 'all', label: 'All Projects' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'resort', label: 'Resort & Hospitality' },
  { key: 'residential', label: 'Residential' },
  { key: 'industrial', label: 'Industrial' },
  { key: 'pacific', label: 'Pacific Region' },
  { key: 'litigation', label: 'Litigation' },
]

interface GalleryFiltersProps {
  active: string
  onFilter: (cat: string) => void
}

export default function GalleryFilters({ active, onFilter }: GalleryFiltersProps) {
  return (
    <div className="bg-white border-b border-navy/8 py-4 px-[4.5%]">
      <div className="max-w-[1280px] mx-auto flex gap-2 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilter(f.key)}
            className={`px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap ${
              active === f.key
                ? 'text-navy border-b-2 border-gold'
                : 'text-slate-light hover:text-navy'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}

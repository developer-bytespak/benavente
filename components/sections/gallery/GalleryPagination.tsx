'use client'

interface GalleryPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = [1]

  if (current > 3) pages.push('ellipsis')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('ellipsis')

  pages.push(total)
  return pages
}

export default function GalleryPagination({
  currentPage,
  totalPages,
  onPageChange,
}: GalleryPaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages)

  const btn = (enabled: boolean, active = false) =>
    `min-w-[40px] h-[40px] px-3 font-serif text-[14px] tracking-[0.08em] transition-all duration-300 rounded-[2px] ${
      active
        ? 'bg-navy text-white'
        : enabled
        ? 'text-navy hover:bg-cream-deeper border border-gold/20'
        : 'text-slate-light/50 border border-gold/10 cursor-not-allowed'
    }`

  return (
    <div className="max-w-[1280px] mx-auto px-[4.5%] pb-[80px]">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={btn(currentPage > 1)}
        >
          &larr; Prev
        </button>

        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`e-${i}`} className="px-2 text-slate-light font-serif">&hellip;</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? 'page' : undefined}
              className={btn(true, p === currentPage)}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={btn(currentPage < totalPages)}
        >
          Next &rarr;
        </button>
      </div>

      <div className="text-center text-[12px] text-slate-light font-serif tracking-[0.12em] uppercase mt-4">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  )
}

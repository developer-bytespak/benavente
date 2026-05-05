// Renders automatically by Next.js while any admin page under (panel) is
// being fetched/rendered. The Sidebar (in the parent layout) stays mounted —
// only this skeleton replaces the page content while the new route loads.

export default function PanelLoading() {
  return (
    <>
      <header className="sticky top-0 z-30 bg-cream/85 backdrop-blur border-b border-gold/15 px-5 lg:px-9 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2 min-w-0 flex-1">
            <div className="h-6 w-56 bg-gold/15 rounded animate-pulse" />
            <div className="h-3 w-80 max-w-full bg-gold/10 rounded animate-pulse" />
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gold/40 animate-pulse" />
            <span className="text-gold-dark text-[11px] tracking-[0.18em] uppercase font-serif font-medium">
              Loading
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 lg:px-9 py-7 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} delay={i * 80} />
          ))}
        </div>
      </main>
    </>
  )
}

function SkeletonCard({ delay }: { delay: number }) {
  return (
    <div
      className="bg-white border border-gold/15 rounded-[4px] overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="aspect-[4/3] bg-cream-deeper animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-gold/15 rounded animate-pulse" />
        <div className="h-3 w-1/2 bg-gold/10 rounded animate-pulse" />
        <div className="flex gap-2 pt-3 border-t border-gold/10">
          <div className="h-7 w-16 bg-cream-deeper rounded animate-pulse" />
          <div className="h-7 w-7 bg-cream-deeper rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

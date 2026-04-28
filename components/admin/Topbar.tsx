'use client'

import Icon from './Icon'

interface Props {
  title: string
  subtitle?: string
  onOpenMenu: () => void
}

export default function Topbar({ title, subtitle, onOpenMenu }: Props) {
  return (
    <header className="sticky top-0 z-30 bg-cream/85 backdrop-blur-md border-b border-gold/15">
      <div className="px-6 lg:px-9 h-[68px] flex items-center justify-between gap-6">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMenu}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-[3px] border border-gold/25 text-navy hover:bg-white"
            aria-label="Open menu"
          >
            <Icon name="menu" className="w-[18px] h-[18px]" />
          </button>
          <div className="min-w-0">
            <h1 className="font-serif text-[22px] text-navy leading-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-slate text-[12px] tracking-[0.05em] mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-white border border-gold/20 rounded-[3px] px-3 h-10 w-[280px] focus-within:border-gold transition-colors">
            <Icon name="search" className="w-[16px] h-[16px] text-slate-light" />
            <input
              type="search"
              placeholder="Search leads, posts, gallery…"
              className="flex-1 bg-transparent outline-none text-[14px] font-serif text-navy placeholder:text-slate-light/60"
            />
            <kbd className="text-[10px] font-sans text-slate-light/70 border border-gold/20 rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </div>

          {/* Bell */}
          <button
            type="button"
            className="relative w-10 h-10 flex items-center justify-center rounded-[3px] border border-gold/20 text-navy hover:bg-white transition-colors"
            aria-label="Notifications"
          >
            <Icon name="bell" className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold border border-cream" />
          </button>

          {/* View site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 h-10 rounded-[3px] border border-navy/20 text-navy hover:bg-navy hover:text-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
          >
            View Site
            <Icon name="external" className="w-[14px] h-[14px]" />
          </a>
        </div>
      </div>
    </header>
  )
}

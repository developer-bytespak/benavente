'use client'

import Image from 'next/image'
import Icon, { type IconName } from './Icon'

export type SectionKey =
  | 'dashboard'
  | 'assignments'
  | 'comps'
  | 'cases'
  | 'leads'
  | 'subscribers'
  | 'letters'
  | 'invoices'
  | 'market'
  | 'analytics'
  | 'blog'
  | 'team'
  | 'gallery'
  | 'services'
  | 'testimonials'
  | 'site'
  | 'licenses'
  | 'settings'

interface NavItem {
  key: SectionKey
  label: string
  icon: IconName
  badge?: string
}

const NAV_GROUPS: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Overview',
    items: [{ key: 'dashboard', label: 'Dashboard', icon: 'dashboard' }],
  },
  {
    heading: 'Operations',
    items: [
      { key: 'assignments', label: 'Assignments', icon: 'flow', badge: '12' },
      { key: 'comps', label: 'Comps Library', icon: 'database' },
      { key: 'cases', label: 'Litigation Cases', icon: 'gavel', badge: '7' },
    ],
  },
  {
    heading: 'CRM',
    items: [
      { key: 'leads', label: 'Leads & Inquiries', icon: 'leads', badge: '8' },
      { key: 'subscribers', label: 'Subscribers', icon: 'subscribers' },
    ],
  },
  {
    heading: 'Finance',
    items: [
      { key: 'letters', label: 'Engagement Letters', icon: 'fileText' },
      { key: 'invoices', label: 'Invoices', icon: 'invoice', badge: '2' },
    ],
  },
  {
    heading: 'Intelligence',
    items: [
      { key: 'market', label: 'Market Data', icon: 'chart' },
      { key: 'analytics', label: 'Analytics', icon: 'funnel' },
    ],
  },
  {
    heading: 'Content',
    items: [
      { key: 'blog', label: 'Blog Posts', icon: 'blog' },
      { key: 'team', label: 'Team Members', icon: 'team' },
      { key: 'gallery', label: 'Gallery', icon: 'gallery' },
      { key: 'services', label: 'Services', icon: 'services' },
      { key: 'testimonials', label: 'Testimonials', icon: 'testimonials' },
      { key: 'site', label: 'Site Content', icon: 'site' },
    ],
  },
  {
    heading: 'Compliance',
    items: [{ key: 'licenses', label: 'Licenses & CE', icon: 'shield', badge: '!' }],
  },
  {
    heading: 'Setup',
    items: [{ key: 'settings', label: 'Settings & SEO', icon: 'settings' }],
  },
]

interface Props {
  active: SectionKey
  onSelect: (key: SectionKey) => void
  onLogout: () => void
  open: boolean
  onClose: () => void
}

export default function Sidebar({ active, onSelect, onLogout, open, onClose }: Props) {
  const handleSelect = (key: SectionKey) => {
    onSelect(key)
    onClose()
  }

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[272px] bg-navy text-white flex flex-col border-r border-white/8 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo header */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/8 shrink-0">
          <span className="flex items-center justify-center w-[42px] h-[42px] shrink-0">
            <Image
              src="/images/hero/logo.png"
              alt="Benavente Group"
              width={42}
              height={42}
              className="w-[42px] h-[42px] object-contain"
            />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-[15px] text-white leading-tight truncate">
              Benavente Group
            </p>
            <p className="text-gold text-[10px] tracking-[0.22em] uppercase font-serif font-medium mt-0.5">
              Admin Panel
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center text-white/60 hover:text-white"
            aria-label="Close menu"
          >
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>

        {/* Nav scroll area */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 admin-scroll">
          {NAV_GROUPS.map((group) => (
            <div key={group.heading} className="mb-5 last:mb-2">
              <p className="text-white/35 text-[10px] tracking-[0.28em] uppercase font-serif font-medium px-3 mb-1.5">
                {group.heading}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = active === item.key
                  const isAlert = item.badge === '!'
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => handleSelect(item.key)}
                        className={`group relative w-full flex items-center gap-3 px-3 py-2 rounded-[3px] text-[13.5px] font-serif font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-white/8 text-white'
                            : 'text-white/55 hover:bg-white/4 hover:text-white'
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r bg-gold transition-opacity duration-200 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                        <Icon
                          name={item.icon}
                          className={`w-[18px] h-[18px] shrink-0 ${
                            isActive ? 'text-gold' : 'text-white/45 group-hover:text-gold/70'
                          }`}
                        />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`shrink-0 inline-flex items-center justify-center min-w-[20px] px-1.5 h-[18px] rounded-full text-[10px] font-sans font-semibold ${
                              isAlert
                                ? 'bg-red-500 text-white'
                                : isActive
                                ? 'bg-gold text-navy'
                                : 'bg-gold/20 text-gold-light group-hover:bg-gold/30'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer / user pill */}
        <div className="p-4 border-t border-white/8 shrink-0">
          <div className="bg-white/4 border border-white/8 rounded-[3px] p-3 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif text-white font-medium text-[15px] shrink-0">
              FB
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-white text-[13px] font-serif font-medium truncate">
                Fernando Benavente
              </p>
              <p className="text-white/40 text-[11px] truncate">Manager &middot; Admin</p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              aria-label="Sign out"
              title="Sign out"
              className="w-8 h-8 flex items-center justify-center rounded-[3px] text-white/50 hover:text-gold hover:bg-white/5 transition-colors shrink-0"
            >
              <Icon name="logout" className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        .admin-scroll::-webkit-scrollbar { width: 4px; }
        .admin-scroll::-webkit-scrollbar-track { background: transparent; }
        .admin-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        .admin-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
      `}</style>
    </>
  )
}

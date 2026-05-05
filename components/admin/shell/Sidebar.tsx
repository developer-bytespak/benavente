'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Icon, { type IconName } from '@/components/admin/ui/Icon'
import SignOutButton from './SignOutButton'

interface NavItem {
  href: string
  label: string
  icon: IconName
  external?: boolean
}

const NAV_GROUPS: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Overview',
    items: [{ href: '/admin', label: 'Dashboard', icon: 'dashboard' }],
  },
  {
    heading: 'Pages',
    items: [
      { href: '/admin/home', label: 'Home Page', icon: 'home' },
      { href: '/admin/about', label: 'About Page', icon: 'info' },
      { href: '/admin/site-settings', label: 'Site Settings', icon: 'settings' },
    ],
  },
  {
    heading: 'Content',
    items: [
      { href: '/admin/team', label: 'Team Members', icon: 'team' },
      { href: '/admin/regions', label: 'Regions', icon: 'pin' },
      { href: '/admin/gallery', label: 'Gallery', icon: 'gallery' },
      { href: '/admin/testimonials', label: 'Testimonials', icon: 'testimonials' },
      { href: '/studio', label: 'Blog', icon: 'blog', external: true },
    ],
  },
  {
    heading: 'Communication',
    items: [
      { href: '/admin/submissions', label: 'Submissions', icon: 'inbox' },
      { href: '/admin/contact-info', label: 'Contact Info', icon: 'mail' },
    ],
  },
]

interface Props {
  user: { name: string; email: string }
}

export default function Sidebar({ user }: Props) {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="lg:sticky lg:top-0 z-40 lg:h-screen w-full lg:w-[272px] bg-navy text-white flex flex-col border-r border-white/8 shrink-0">
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
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 admin-scroll">
        {NAV_GROUPS.map((group) => (
          <div key={group.heading} className="mb-5 last:mb-2">
            <p className="text-white/35 text-[10px] tracking-[0.28em] uppercase font-serif font-medium px-3 mb-1.5">
              {group.heading}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = !item.external && isActive(item.href)
                const className = `group relative w-full flex items-center gap-3 px-3 py-2 rounded-[3px] text-[13.5px] font-serif font-medium transition-all duration-200 ${
                  active
                    ? 'bg-white/8 text-white'
                    : 'text-white/55 hover:bg-white/4 hover:text-white'
                }`
                const inner = (
                  <>
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r bg-gold transition-opacity duration-200 ${
                        active ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <Icon
                      name={item.icon}
                      className={`w-[18px] h-[18px] shrink-0 ${
                        active ? 'text-gold' : 'text-white/45 group-hover:text-gold/70'
                      }`}
                    />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.external && (
                      <Icon name="external" className="w-[12px] h-[12px] shrink-0 text-white/40" />
                    )}
                  </>
                )
                return (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={className}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link href={item.href} className={className}>
                        {inner}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/8 shrink-0">
        <div className="bg-white/4 border border-white/8 rounded-[3px] p-3 flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif text-white font-medium text-[15px] shrink-0">
            {user.name.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-white text-[13px] font-serif font-medium truncate">{user.name}</p>
            <p className="text-white/40 text-[11px] truncate">{user.email}</p>
          </div>
          <SignOutButton />
        </div>
      </div>

      <style jsx global>{`
        .admin-scroll::-webkit-scrollbar { width: 4px; }
        .admin-scroll::-webkit-scrollbar-track { background: transparent; }
        .admin-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        .admin-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
      `}</style>
    </aside>
  )
}

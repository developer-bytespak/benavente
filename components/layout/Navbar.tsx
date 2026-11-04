'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCallback, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clientPages, services, serviceHref, unlinkedServices } from '@/lib/services'

interface NavChild {
  label: string
  // Absent on an item that only opens a nested pane.
  href?: string
  children?: { label: string; href: string }[]
}

// Width of the "Additional Services" pane. The dropdown makes room for it.
const FLYOUT_WIDTH = 300

const navLinks: { label: string; href: string; children?: NavChild[] }[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About', href: '/about',
    // children: [
    //   { label: 'Our Story', href: '/about' },
    //   { label: 'Leadership', href: '/about' },
    //   { label: 'Coverage Areas', href: '/about' },
    // ],
  },
  {
    label: 'Services', href: '/services',
    children: [
      { label: 'Services Overview', href: '/services' },
      ...services.map((s) => ({ label: s.title, href: serviceHref(s.slug) })),
      {
        label: 'Additional Services',
        children: [
          ...unlinkedServices.map((s) => ({ label: s.title, href: serviceHref(s.slug) })),
          ...clientPages,
        ],
      },
    ],
  },
  {
    label: 'Portfolio', href: '/gallery',
    // children: [
    //   { label: 'All Projects', href: '/gallery' },
    //   { label: 'Commercial', href: '/gallery' },
    //   { label: 'Resort & Hospitality', href: '/gallery' },
    //   { label: 'Residential', href: '/gallery' },
    //   { label: 'Industrial', href: '/gallery' },
    //   { label: 'Pacific Region', href: '/gallery' },
    // ],
  },
  { label: 'BLOG', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

interface NavbarProps {
  logoUrl?: string | null
}

export default function Navbar({ logoUrl }: NavbarProps = {}) {
  const pathname = usePathname()
  const logo = logoUrl || '/images/hero/logo.png'
  // const isHome = pathname === '/'
  const hasDarkHero =
    ['/', '/about', '/gallery', '/blog', '/contact', '/process'].includes(pathname) ||
    ['/services', '/clients', '/property-types'].some((p) => pathname.startsWith(p))
  // Dropdown parents (Services) stay highlighted on their child routes.
  const isActive = (link: (typeof navLinks)[number]) =>
    pathname === link.href ||
    (!!link.children &&
      (pathname.startsWith(`${link.href}/`) ||
        link.children.some((child) => child.children?.some((item) => item.href === pathname))))
  const inAdditional = (child: NavChild) => !!child.children?.some((item) => item.href === pathname)
  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const [dropdownShift, setDropdownShift] = useState(0)
  const [mobileSubOpen, setMobileSubOpen] = useState(false)
  const flyoutTimeout = useRef<NodeJS.Timeout>()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const lastScrollY = useRef(0)
  const dropdownTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      const heroBottom = window.innerHeight - 100 // hero is full viewport
      const inHero = hasDarkHero && y < heroBottom

      if (inHero) {
        // In hero zone: always transparent blur, never hidden
        setScrolled(false)
        setHidden(false)
      } else {
        setScrolled(true)
        if (y > lastScrollY.current) {
          setHidden(true)
        } else {
          setHidden(false)
        }
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasDarkHero])

  const isTransparent = hasDarkHero && !scrolled
  const textColor = isTransparent ? 'text-white' : 'text-navy'
  const logoColor = isTransparent ? 'text-white' : 'text-navy'

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setOpenDropdown(label)
  }

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null)
      setFlyoutOpen(false)
    }, 150)
  }

  // The pane always opens to the right, so on narrower desktop windows the
  // dropdown sits further left to leave room for it beside the screen edge.
  const measureDropdown = useCallback((el: HTMLDivElement | null) => {
    const dropdown = el?.parentElement
    const trigger = dropdown?.parentElement
    if (!dropdown || !trigger) return
    const right = trigger.getBoundingClientRect().left + dropdown.offsetWidth + FLYOUT_WIDTH + 8
    setDropdownShift(Math.max(0, right - window.innerWidth))
  }, [])

  const openFlyout = () => {
    if (flyoutTimeout.current) clearTimeout(flyoutTimeout.current)
    setFlyoutOpen(true)
  }

  // A short delay lets the pointer cross other rows on its way to the pane.
  const closeFlyoutSoon = () => {
    if (flyoutTimeout.current) clearTimeout(flyoutTimeout.current)
    flyoutTimeout.current = setTimeout(() => setFlyoutOpen(false), 200)
  }

  const closeMenus = () => {
    setOpenDropdown(null)
    setFlyoutOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isTransparent
            ? 'bg-navy/10 backdrop-blur-sm'
            : 'bg-white/90 backdrop-blur-sm border-b border-gold/20'
        }`}
        style={{ height: isTransparent ? 96 : 80 }}
      >
        <div className="max-w-[1400px] mx-auto px-[4.5%] h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 xl:gap-4 min-w-0">
            <span className="flex items-center justify-center shrink-0 w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] xl:w-[80px] xl:h-[80px] transition-colors duration-500">
              <Image
                src={logo}
                alt="The Benavente Group LLC"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </span>
            {/* Name stays on one line; sizes step down so the block fits the bar. */}
            <div className="flex flex-col min-w-0">
              <span className={`font-serif text-[19px] sm:text-[22px] xl:text-[26px] font-medium leading-tight whitespace-nowrap ${logoColor} transition-colors duration-500`}>
                The Benavente Group LLC
              </span>
              <span className={`text-[9px] sm:text-[10px] xl:text-[12px] tracking-[0.12em] sm:tracking-[0.16em] xl:tracking-[0.18em] leading-snug mt-0.5 uppercase font-serif font-bold transition-colors duration-500 ${isTransparent ? 'text-white/60' : 'text-navy/70'}`}>
                Hawaii Based Real Estate Appraisers &amp; Consultants
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && handleDropdownEnter(link.label)}
                onMouseLeave={handleDropdownLeave}
                onFocus={() => link.children && handleDropdownEnter(link.label)}
                onBlur={handleDropdownLeave}
                onKeyDown={(e) => e.key === 'Escape' && closeMenus()}
              >
                <Link
                  href={link.href}
                  aria-haspopup={link.children ? 'true' : undefined}
                  aria-expanded={link.children ? openDropdown === link.label : undefined}
                  className={`text-[15px] font-serif font-bold tracking-[0.08em] uppercase transition-colors duration-300 ${textColor} hover:text-gold ${
                    isActive(link) ? 'text-gold' : ''
                  }`}
                >
                  {link.label}
                  {link.children && <span className="ml-0.5 text-[9px]">&#9662;</span>}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      style={{ left: -dropdownShift }}
                      className="absolute top-full mt-2 bg-white shadow-lg shadow-navy/8 border border-gold/10 rounded-[2px] py-2 min-w-[200px]"
                    >
                      <div ref={measureDropdown}>
                      {link.children.map((child) =>
                        child.children ? (
                          <div
                            key={child.label}
                            className="relative border-t border-gold/10 mt-1 pt-1"
                            onMouseEnter={openFlyout}
                            onMouseLeave={closeFlyoutSoon}
                            onFocus={openFlyout}
                            onBlur={(e) => {
                              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeFlyoutSoon()
                            }}
                          >
                            <button
                              type="button"
                              aria-haspopup="true"
                              aria-expanded={flyoutOpen}
                              onClick={openFlyout}
                              className={`w-full flex items-center justify-between gap-6 px-5 py-2 text-left text-[14px] font-serif whitespace-nowrap hover:text-gold hover:bg-cream transition-colors duration-200 ${
                                flyoutOpen || inAdditional(child) ? 'text-gold bg-cream' : 'text-navy/70'
                              }`}
                            >
                              {child.label}
                              <span aria-hidden="true" className="text-[11px]">
                                &#9656;
                              </span>
                            </button>

                            <AnimatePresence>
                              {flyoutOpen && (
                                <motion.div
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -8 }}
                                  transition={{ duration: 0.18 }}
                                  style={{ width: FLYOUT_WIDTH }}
                                  className="absolute -bottom-[9px] left-full bg-white shadow-lg shadow-navy/8 border border-gold/10 rounded-[2px] py-2"
                                >
                                  {child.children.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={closeMenus}
                                      className={`block px-5 py-2 text-[14px] font-serif whitespace-nowrap hover:text-gold hover:bg-cream transition-colors duration-200 ${
                                        pathname === item.href ? 'text-gold' : 'text-navy/70'
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            key={child.label}
                            href={child.href ?? link.href}
                            onClick={closeMenus}
                            className={`block px-5 py-2 text-[14px] font-serif whitespace-nowrap hover:text-gold hover:bg-cream transition-colors duration-200 ${
                              pathname === child.href ? 'text-gold' : 'text-navy/70'
                            }`}
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden flex flex-col gap-[5px] p-2 shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-px transition-all duration-300 ${isTransparent ? 'bg-white' : 'bg-navy'} ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`w-5 h-px transition-all duration-300 ${isTransparent ? 'bg-white' : 'bg-navy'} ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-px transition-all duration-300 ${isTransparent ? 'bg-white' : 'bg-navy'} ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Box */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/30 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ top: isTransparent ? 108 : 92 }}
              className="fixed right-[4.5%] w-[220px] bg-white z-50 lg:hidden shadow-xl shadow-navy/15 border border-gold/20 rounded-[4px] origin-top-right overflow-hidden"
            >
              <ul className="py-2 max-h-[calc(100vh-120px)] overflow-y-auto">
                {navLinks.map((link) =>
                  link.children ? (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        aria-expanded={mobileExpanded === link.label}
                        className={`w-full flex items-center justify-between px-5 py-3 text-[14px] font-serif font-medium tracking-[0.08em] uppercase transition-colors hover:bg-cream hover:text-gold ${
                          isActive(link) ? 'text-gold bg-cream/50' : 'text-navy'
                        }`}
                      >
                        {link.label}
                        <span
                          className={`text-[12px] transition-transform duration-300 ${
                            mobileExpanded === link.label ? 'rotate-180' : ''
                          }`}
                        >
                          &#9662;
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileExpanded === link.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden border-l border-gold/30 ml-5 mb-1"
                          >
                            {link.children.map((child) =>
                              child.children ? (
                                <li key={child.label}>
                                  <button
                                    type="button"
                                    onClick={() => setMobileSubOpen(!mobileSubOpen)}
                                    aria-expanded={mobileSubOpen}
                                    className={`w-full flex items-center justify-between gap-2 pl-4 pr-4 py-2 text-left text-[14px] font-serif leading-[1.35] transition-colors hover:text-gold ${
                                      inAdditional(child) ? 'text-gold' : 'text-navy/70'
                                    }`}
                                  >
                                    {child.label}
                                    <span
                                      aria-hidden="true"
                                      className={`text-[11px] transition-transform duration-300 ${mobileSubOpen ? 'rotate-180' : ''}`}
                                    >
                                      &#9662;
                                    </span>
                                  </button>
                                  <AnimatePresence initial={false}>
                                    {mobileSubOpen && (
                                      <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.22 }}
                                        className="overflow-hidden border-l border-gold/30 ml-4 mb-1"
                                      >
                                        {child.children.map((item) => (
                                          <li key={item.href}>
                                            <Link
                                              href={item.href}
                                              onClick={() => setMobileOpen(false)}
                                              className={`block pl-3 pr-3 py-2 text-[14px] font-serif leading-[1.35] transition-colors hover:text-gold ${
                                                pathname === item.href ? 'text-gold' : 'text-navy/70'
                                              }`}
                                            >
                                              {item.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </li>
                              ) : (
                                <li key={child.label}>
                                  <Link
                                    href={child.href ?? link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block pl-4 pr-4 py-2 text-[14px] font-serif leading-[1.35] transition-colors hover:text-gold ${
                                      pathname === child.href ? 'text-gold' : 'text-navy/70'
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              )
                            )}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-5 py-3 text-[14px] font-serif font-medium tracking-[0.08em] uppercase transition-colors hover:bg-cream hover:text-gold ${
                          pathname === link.href ? 'text-gold bg-cream/50' : 'text-navy'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

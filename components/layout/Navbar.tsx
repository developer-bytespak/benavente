'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About', href: '/about',
    // children: [
    //   { label: 'Our Story', href: '/about' },
    //   { label: 'Leadership', href: '/about' },
    //   { label: 'Coverage Areas', href: '/about' },
    // ],
  },
  // {
  //   label: 'Services', href: '/contact',
  //   children: [
  //     { label: 'Commercial Appraisal', href: '/contact' },
  //     { label: 'Residential Valuation', href: '/contact' },
  //     { label: 'Market Analysis', href: '/contact' },
  //     { label: 'Litigation Support', href: '/contact' },
  //     { label: 'Consulting', href: '/contact' },
  //     { label: 'Pacific Region', href: '/contact' },
  //   ],
  // },
  {
    label: 'Gallery', href: '/gallery',
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

export default function Navbar() {
  const pathname = usePathname()
  // const isHome = pathname === '/'
  const hasDarkHero = ['/', '/about', '/gallery', '/blog', '/contact'].includes(pathname)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150)
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
        <div className="max-w-[1400px] mx-auto px-[4.5%] h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <span className="flex items-center justify-center w-[69px] h-[69px] transition-colors duration-500">
              <Image
                src="/images/hero/logo.png"
                alt="The Benavente Group"
                width={52}
                height={52}
                className="w-[52px] h-[52px] object-contain"
              />
            </span>
            <div className="flex flex-col">
              <span className={`font-serif text-[26px] font-medium leading-tight ${logoColor} transition-colors duration-500`}>
                The Benavente Group
              </span>
              <span className={`text-[12px] tracking-[0.18em] uppercase font-serif font-bold transition-colors duration-500 ${isTransparent ? 'text-white/60' : 'text-navy/70'}`}>
                Hawaii Based Real Estate Appraisers &amp; Consultants
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && handleDropdownEnter(link.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={link.href}
                  className={`text-[15px] font-serif font-bold tracking-[0.08em] uppercase transition-colors duration-300 ${textColor} hover:text-gold ${
                    pathname === link.href ? 'text-gold' : ''
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
                      className="absolute top-full left-0 mt-2 bg-white shadow-lg shadow-navy/8 border border-gold/10 rounded-[2px] py-2 min-w-[200px]"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-5 py-2 text-[14px] font-serif text-navy/70 hover:text-gold hover:bg-cream transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
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
              className="fixed inset-0 bg-navy/30 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ top: isTransparent ? 108 : 92 }}
              className="fixed right-[4.5%] w-[220px] bg-white z-50 md:hidden shadow-xl shadow-navy/15 border border-gold/20 rounded-[4px] origin-top-right overflow-hidden"
            >
              <ul className="py-2">
                {navLinks.map((link) => (
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
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

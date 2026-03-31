'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About', href: '/about',
    children: [
      { label: 'Our Story', href: '/about' },
      { label: 'Leadership', href: '/about' },
      { label: 'Coverage Areas', href: '/about' },
    ],
  },
  {
    label: 'Services', href: '/contact',
    children: [
      { label: 'Commercial Appraisal', href: '/contact' },
      { label: 'Residential Valuation', href: '/contact' },
      { label: 'Market Analysis', href: '/contact' },
      { label: 'Litigation Support', href: '/contact' },
      { label: 'Consulting', href: '/contact' },
      { label: 'Pacific Region', href: '/contact' },
    ],
  },
  {
    label: 'Gallery', href: '/gallery',
    children: [
      { label: 'All Projects', href: '/gallery' },
      { label: 'Commercial', href: '/gallery' },
      { label: 'Resort & Hospitality', href: '/gallery' },
      { label: 'Residential', href: '/gallery' },
      { label: 'Industrial', href: '/gallery' },
      { label: 'Pacific Region', href: '/gallery' },
    ],
  },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const lastScrollY = useRef(0)
  const dropdownTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (y > 200 && y > lastScrollY.current) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTransparent = isHome && !scrolled
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
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md border-b border-gold/20'
        }`}
        style={{ height: isTransparent ? 76 : 68 }}
      >
        <div className="max-w-[1400px] mx-auto px-[4.5%] h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className={`font-serif text-[20px] font-medium leading-tight ${logoColor} transition-colors duration-500`}>
              The Benavente Group
            </span>
            <span className="text-gold text-[8.5px] tracking-[0.2em] uppercase font-sans">
              Real Estate Appraisers &amp; Consultants
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && handleDropdownEnter(link.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={link.href}
                  className={`text-[12px] font-sans font-medium tracking-[0.06em] uppercase transition-colors duration-300 ${textColor} hover:text-gold ${
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
                          className="block px-5 py-2 text-[11.5px] font-sans text-navy/70 hover:text-gold hover:bg-cream transition-colors duration-200"
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
            <div className="hidden md:block">
              <Button href="/contact" variant={isTransparent ? 'outline-light' : 'outline'}>
                Request Consultation
              </Button>
            </div>
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/40 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 md:hidden shadow-2xl"
            >
              <div className="pt-20 px-6">
                {navLinks.map((link) => (
                  <div key={link.label} className="mb-1">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 text-[13px] font-sans font-medium tracking-[0.06em] uppercase text-navy hover:text-gold transition-colors border-b border-gold/10 ${
                        pathname === link.href ? 'text-gold' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pl-4 pb-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1.5 text-[11.5px] font-sans text-slate hover:text-gold transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-6">
                  <Button href="/contact" variant="gold" className="w-full">
                    Request Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

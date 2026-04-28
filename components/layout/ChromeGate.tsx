'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

function isChromeless(pathname: string | null): boolean {
  if (!pathname) return false
  return pathname.startsWith('/studio') || pathname.startsWith('/admin')
}

export function ChromeNavbar() {
  const pathname = usePathname()
  if (isChromeless(pathname)) return null
  return <Navbar />
}

export function ChromeFooter() {
  const pathname = usePathname()
  if (isChromeless(pathname)) return null
  return <Footer />
}

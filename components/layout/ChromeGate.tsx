'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export function ChromeNavbar() {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return <Navbar />
}

export function ChromeFooter() {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return <Footer />
}

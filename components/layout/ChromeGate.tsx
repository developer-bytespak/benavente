'use client'

import { usePathname } from 'next/navigation'

function isChromeless(pathname: string | null): boolean {
  if (!pathname) return false
  return pathname.startsWith('/studio') || pathname.startsWith('/admin')
}

export function ChromeShell({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode
  footer: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const hide = isChromeless(pathname)
  return (
    <>
      {!hide && navbar}
      <main>{children}</main>
      {!hide && footer}
    </>
  )
}

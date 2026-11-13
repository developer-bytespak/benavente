'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// A footer link that opens a pane of links on hover, focus or tap, styled like
// the nested panes in the header's Services dropdown.
export default function FooterSubmenu({
  label,
  items,
}: {
  label: string
  items: { label: string; href: string }[]
}) {
  const [open, setOpen] = useState(false)
  const closeTimeout = useRef<NodeJS.Timeout>()
  const rootRef = useRef<HTMLLIElement>(null)

  const show = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setOpen(true)
  }

  // A short delay lets the pointer cross the gap to the pane.
  const hideSoon = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    closeTimeout.current = setTimeout(() => setOpen(false), 200)
  }

  // Close on a tap or click anywhere else (touch screens have no hover).
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  useEffect(() => () => clearTimeout(closeTimeout.current), [])

  return (
    <li
      ref={rootRef}
      // Fills its parent list, which is sized to the longest label, so the
      // arrows line up in a column just after the text.
      className="relative w-full"
      // Hover only for a real mouse, and focus only from the keyboard, so a tap
      // on a touch screen is handled once, by the button's click.
      onPointerEnter={(e) => e.pointerType === 'mouse' && show()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && hideSoon()}
      onFocus={(e) => (e.target as HTMLElement).matches(':focus-visible') && show()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hideSoon()
      }}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-3 text-left text-[15px] font-serif font-medium transition-colors duration-300 ${
          open ? 'text-white' : 'text-white/45 hover:text-white'
        }`}
      >
        {label}
        <span
          aria-hidden="true"
          className={`flex items-center justify-center shrink-0 w-5 h-5 rounded-full border transition-colors duration-200 ${
            open ? 'bg-gold border-gold text-white' : 'border-gold/60 text-gold'
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18 }}
            // Phones: opens upward over the list. Wider: opens to the right,
            // bottom-aligned with the trigger. The padding bridges the gap so
            // hover isn't lost on the way across.
            className="absolute z-30 left-0 bottom-full pb-2 md:left-full md:bottom-[-8px] md:pb-0 md:pl-4"
          >
            <ul className="w-[300px] max-w-[calc(100vw-9%)] bg-white shadow-lg shadow-black/20 border border-gold/10 rounded-[2px] py-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-5 py-2 text-[14px] font-serif text-navy/70 hover:text-gold hover:bg-cream transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

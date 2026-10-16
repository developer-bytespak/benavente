'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Mobile/tablet shortcut to the inquiry form. Appears once the hero is
// scrolled past and hides while the form or the footer is on screen.
export default function StickyInquiryButton({ target = 'inquiry' }: { target?: string }) {
  const [pastHero, setPastHero] = useState(false)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
      setBlocked(visible.size > 0)
    })
    const form = document.getElementById(target)
    const footer = document.querySelector('footer')
    if (form) observer.observe(form)
    if (footer) observer.observe(footer)

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [target])

  const show = pastHero && !blocked

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-4 inset-x-4 z-40 lg:hidden"
        >
          <a
            href={`#${target}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center justify-center gap-3 w-full bg-gold hover:bg-gold-dark text-white font-serif font-medium text-[14px] tracking-[0.1em] uppercase py-4 rounded-[2px] shadow-xl shadow-navy/25 transition-colors duration-300"
          >
            Request a Proposal
            <span aria-hidden="true">&rarr;</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

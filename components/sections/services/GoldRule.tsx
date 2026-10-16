'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// A thin gold line that draws itself in from the left when scrolled into view.
export default function GoldRule({
  className = '',
  delay = 0,
}: {
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={`block h-px bg-gold origin-left ${className}`}
    />
  )
}

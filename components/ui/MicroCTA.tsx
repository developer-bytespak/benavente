'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface MicroCTAProps {
  href: string
  children: React.ReactNode
  variant?: 'dark' | 'light' | 'gold'
  className?: string
}

const variantStyles = {
  dark: 'text-navy hover:text-gold border-gold',
  light: 'text-white/70 hover:text-gold-light border-gold/40',
  gold: 'text-gold hover:text-gold-light border-gold hover:border-gold-light',
}

export default function MicroCTA({ href, children, variant = 'dark', className = '' }: MicroCTAProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={`text-[14px] font-serif font-medium tracking-[0.1em] uppercase inline-flex items-center border-b pb-0.5 transition-all duration-300 ${variantStyles[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ gap: isHovered ? '13px' : '7px' }}
    >
      {children}
      <motion.span
        animate={{ x: isHovered ? 5 : 0 }}
        transition={{ duration: 0.25 }}
      >
        &rarr;
      </motion.span>
    </Link>
  )
}

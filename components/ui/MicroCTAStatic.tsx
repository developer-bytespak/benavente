'use client'

import { motion } from 'framer-motion'

interface MicroCTAStaticProps {
  children: React.ReactNode
  variant?: 'dark' | 'light' | 'gold'
  className?: string
}

const variantStyles = {
  dark: 'text-navy group-hover:text-gold border-gold',
  light: 'text-white/70 group-hover:text-gold-light border-gold/40',
  gold: 'text-gold group-hover:text-gold-light border-gold group-hover:border-gold-light',
}

export default function MicroCTAStatic({
  children,
  variant = 'dark',
  className = '',
}: MicroCTAStaticProps) {
  return (
    <span
      className={`text-[14px] font-serif font-medium tracking-[0.1em] uppercase inline-flex items-center gap-[7px] border-b pb-0.5 transition-all duration-300 ${variantStyles[variant]} ${className}`}
    >
      {children}
      <motion.span
        initial={{ x: 0 }}
        className="inline-block"
        variants={{
          rest: { x: 0 },
          hover: { x: 5 },
        }}
      >
        &rarr;
      </motion.span>
    </span>
  )
}

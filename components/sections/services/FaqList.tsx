'use client'

import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import type { FaqItem } from './Blocks'

const ease = [0.25, 0.46, 0.45, 0.94] as const

// Numbered accordion in the same row style as the page's other numbered lists.
// Answers stay in the DOM while collapsed so they remain crawlable.
export default function FaqList({ items }: { items: Omit<FaqItem, 'text'>[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <ol className="border-t border-gold/20">
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-faq-${i}`
        return (
          <li key={item.q} className="border-b border-gold/20">
            <RevealOnScroll delay={i * 0.05}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group w-full grid grid-cols-[44px_1fr_20px] gap-x-4 lg:gap-x-6 items-start py-7 text-left"
                >
                  {/* Number drawn via CSS content so it stays out of the heading text. */}
                  <span
                    aria-hidden="true"
                    data-num={String(i + 1).padStart(2, '0')}
                    className="font-serif text-[13px] tracking-[0.2em] text-gold pt-2 before:content-[attr(data-num)]"
                  />
                  <span
                    className={`font-serif text-[22px] sm:text-[26px] leading-[1.25] transition-colors duration-300 ${
                      isOpen ? 'text-gold-dark' : 'text-navy group-hover:text-gold-dark'
                    }`}
                  >
                    {item.q}
                  </span>
                  <span aria-hidden="true" className="relative mt-3 w-4 h-4">
                    <span className="absolute left-0 top-1/2 w-4 h-px bg-gold" />
                    <motion.span
                      className="absolute left-1/2 top-0 h-4 w-px bg-gold"
                      animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.3, ease }}
                    />
                  </span>
                </button>
              </h3>
              <motion.div
                id={panelId}
                role="region"
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.45, ease }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={false}
                  animate={{ y: isOpen ? 0 : -8 }}
                  transition={{ duration: 0.45, ease }}
                  className="pl-[60px] lg:pl-[68px] pr-10 pb-8 text-navy/80 text-[16px] font-light leading-[1.8] max-w-[820px]"
                >
                  {item.a}
                </motion.div>
              </motion.div>
            </RevealOnScroll>
          </li>
        )
      })}
    </ol>
  )
}

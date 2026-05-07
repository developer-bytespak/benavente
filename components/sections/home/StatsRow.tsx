'use client'

import RevealOnScroll from '@/components/ui/RevealOnScroll'
import CountUp from '@/components/ui/CountUp'
import type { StatItem } from '@/lib/supabase/types'

interface Props {
  stats: StatItem[]
}

export default function StatsRow({ stats }: Props) {
  if (stats.length === 0) return null
  return (
    <section className="bg-navy py-16 px-[4.5%]">
      <RevealOnScroll>
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-6 ${i < stats.length - 1 ? 'border-r border-gold/12' : ''}`}
            >
              <div className="font-serif font-light text-[52px] text-white leading-none">
                <CountUp target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-[12px] tracking-[0.2em] uppercase text-white/[0.38] font-serif mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}

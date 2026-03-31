'use client'

import RevealOnScroll from '@/components/ui/RevealOnScroll'
import CountUp from '@/components/ui/CountUp'

const stats = [
  { number: 50, suffix: '+', label: 'Years Combined Experience' },
  { number: 500, suffix: '+', label: 'Completed Assignments' },
  { number: 6, suffix: '', label: 'Pacific Island Regions' },
  { number: 18, suffix: '+', label: 'Property Types Covered' },
]

export default function StatsRow() {
  return (
    <section className="bg-navy py-16 px-[4.5%]">
      <RevealOnScroll>
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`text-center py-6 ${i < stats.length - 1 ? 'border-r border-gold/12' : ''}`}>
              <div className="font-serif font-light text-[52px] text-white leading-none">
                <CountUp target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/[0.38] font-sans mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}

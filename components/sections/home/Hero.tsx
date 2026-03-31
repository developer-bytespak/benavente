'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import CountUp from '@/components/ui/CountUp'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

const stats = [
  { number: 50, suffix: '+', label: 'Years Combined Experience' },
  { number: 500, suffix: '+', label: 'Completed Assignments' },
  { number: 6, suffix: '', label: 'Pacific Island Regions' },
]

export default function Hero() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="relative min-h-screen min-h-[680px] flex items-end overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 65% 35%, rgba(30,65,110,0.6), transparent)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/[0.88] via-navy/35 to-navy/15" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-[4.5%] pb-[8vh] grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 items-end">
        {/* Left Column */}
        <div>
          <motion.div custom={0.3} variants={fadeUp} className="flex items-center gap-2.5 mb-6">
            <span className="w-[26px] h-px bg-gold" />
            <span className="text-gold text-[9.5px] tracking-[0.32em] uppercase font-sans font-medium">
              Hawai&#8216;i &amp; Pacific Islands
            </span>
          </motion.div>

          <motion.h1 custom={0.5} variants={fadeUp} className="font-serif font-light text-[clamp(48px,6vw,84px)] leading-[1.05] text-white">
            Real Estate<br />
            <span className="italic text-gold-light">Valuation</span><br />
            &amp; Advisory
          </motion.h1>

          <motion.p custom={0.7} variants={fadeUp} className="text-white/[0.58] text-[14.5px] font-sans font-light leading-[1.8] max-w-[480px] mt-6">
            Credible solutions. Timely results. Real estate economics, valuation, and market analysis across Hawai&#8216;i and the Pacific.
          </motion.p>

          <motion.div custom={0.9} variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
            <Button href="/contact" variant="gold">Request a Consultation</Button>
            <Button href="/gallery" variant="outline-light">View Our Work</Button>
          </motion.div>
        </div>

        {/* Right Column — Stats */}
        <motion.div custom={1.1} variants={fadeUp} className="hidden lg:flex flex-col gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l border-gold/35 pl-6">
              <div className="font-serif text-[52px] font-light text-white leading-none">
                <CountUp target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-white/40 text-[10.5px] uppercase tracking-[0.2em] font-sans mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        custom={1.4}
        variants={fadeUp}
        className="absolute bottom-8 left-[4.5%] z-10 flex items-center gap-3"
      >
        <span className="w-px h-[40px] bg-gold/40" />
        <span className="text-white/30 text-[9px] uppercase tracking-[0.25em] font-sans">
          Scroll to explore
        </span>
      </motion.div>
    </motion.section>
  )
}

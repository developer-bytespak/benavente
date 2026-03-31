'use client'

import { useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import GalleryFilters from '@/components/sections/gallery/GalleryFilters'
import GalleryGrid from '@/components/sections/gallery/GalleryGrid'
import CtaBand from '@/components/sections/home/CtaBand'
import { projects } from '@/lib/data/projects'

export default function GalleryPage() {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      {/* Page Hero */}
      <section className="bg-cream border-b border-gold/15 pt-[160px] pb-[80px] px-[4.5%]">
        <RevealOnScroll>
          <div className="max-w-[1280px] mx-auto">
            <SectionLabel>Portfolio</SectionLabel>
            <h1 className="font-serif text-[clamp(44px,6vw,72px)] text-navy leading-[1.08]">
              Featured <span className="italic text-gold">Projects</span><br />
              &amp; Assignments
            </h1>
            <p className="text-slate text-[16px] font-light leading-[1.85] max-w-[560px] mt-5">
              A sampling of prior studies and services across Hawai&#8216;i, Guam, Saipan, the Marshall Islands, and other Pacific Islands.
            </p>
            <div className="flex flex-wrap gap-5 mt-7">
              <MicroCTA href="/contact">Start a Project</MicroCTA>
              <MicroCTA href="/about">Our Expertise</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <GalleryFilters active={active} onFilter={setActive} />
      <GalleryGrid projects={filtered} />
      <CtaBand />
    </>
  )
}

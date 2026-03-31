'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { projects } from '@/lib/data/projects'

const previewProjects = projects.slice(0, 5)

export default function GalleryPreview() {
  return (
    <section className="bg-white py-[108px] px-[4.5%]">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gold/20 pb-5 mb-10 gap-4">
        <div>
          <SectionLabel>Portfolio</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
            Selected <span className="italic text-gold">Projects</span>
          </h2>
        </div>
        <MicroCTA href="/gallery">See Full Portfolio</MicroCTA>
      </div>

      {/* Grid */}
      <RevealOnScroll>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2" style={{ gridTemplateRows: 'auto auto' }}>
          {previewProjects.map((project, i) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-[2px] cursor-pointer ${
                i === 0 ? 'md:row-span-2 min-h-[300px] lg:min-h-0' : 'min-h-[220px]'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cream-deeper to-cream-dark" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-gold text-[11px] uppercase tracking-[0.2em] font-sans">{project.type}</span>
                <span className="text-white font-serif text-[22px] mt-1">{project.title}</span>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}

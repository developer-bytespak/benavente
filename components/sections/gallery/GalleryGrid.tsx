'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Project } from '@/lib/types'

interface GalleryGridProps {
  projects: Project[]
}

export default function GalleryGrid({ projects }: GalleryGridProps) {
  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] px-[4.5%] py-[60px]">
      <AnimatePresence>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            <div className="group relative overflow-hidden rounded-[2px] cursor-pointer aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-br from-cream-deeper to-cream-dark" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-gold text-[14px] uppercase tracking-[0.2em] font-serif">{project.type}</span>
                <span className="text-white font-serif text-[22px] mt-1">{project.title}</span>
                <span className="text-white/50 text-[14px] font-serif mt-1">{project.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

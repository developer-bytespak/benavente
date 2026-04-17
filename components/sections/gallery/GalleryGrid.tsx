'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

export interface GalleryItem {
  src: string
  category: string
}

interface GalleryGridProps {
  items: GalleryItem[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-[4.5%] py-[80px] text-center">
        <p className="font-serif text-slate text-[18px]">No images in this category yet.</p>
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px] px-[4.5%] py-[60px]">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item.src}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            <div className="group relative overflow-hidden rounded-[2px] cursor-pointer aspect-[4/3] bg-cream-deeper">
              <Image
                src={item.src}
                alt={item.category}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-gold text-[12px] uppercase tracking-[0.2em] font-serif">
                  {item.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

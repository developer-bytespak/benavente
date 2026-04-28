'use client'

import Image from 'next/image'
import Icon from './Icon'
import { galleryAdmin } from '@/lib/admin/mockData'

export default function GalleryAdmin() {
  const totalImages = galleryAdmin.reduce((sum, c) => sum + c.count, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Content</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Project <span className="italic text-gold">Gallery</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            {totalImages} images across {galleryAdmin.length} categories &middot; appears on Portfolio page
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] border border-gold/25 text-navy hover:bg-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
            <Icon name="plus" className="w-[14px] h-[14px]" />
            New Category
          </button>
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
            <Icon name="image" className="w-[14px] h-[14px]" />
            Upload Images
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {galleryAdmin.map((cat) => (
          <div
            key={cat.slug}
            className="group bg-white border border-gold/15 rounded-[4px] overflow-hidden hover:border-gold/40 hover:shadow-md hover:shadow-navy/5 transition-all duration-300"
          >
            <div className="relative aspect-[4/3] bg-cream-deeper">
              <Image
                src={cat.cover}
                alt={cat.label}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <p className="text-gold text-[10px] tracking-[0.18em] uppercase font-serif font-medium">
                    Category
                  </p>
                  <h3 className="font-serif text-[18px] text-white leading-tight mt-0.5">{cat.label}</h3>
                </div>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/95 text-navy font-serif text-[13px] font-medium">
                  {cat.count}
                </span>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between gap-2 border-t border-gold/10">
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-[3px] border border-gold/25 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.12em] uppercase transition-colors">
                <Icon name="edit" className="w-3.5 h-3.5" />
                Manage
              </button>
              <button className="inline-flex items-center justify-center w-9 h-9 rounded-[3px] border border-gold/25 text-navy hover:bg-cream transition-colors" title="Add images">
                <Icon name="plus" className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

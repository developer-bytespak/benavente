'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ImageLightbox from '@/components/ui/ImageLightbox'

interface RegionModalProps {
  open: boolean
  onClose: () => void
  label: string
  images: string[]
}

export default function RegionModal({ open, onClose, label, images }: RegionModalProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openIdx === null) onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose, openIdx])

  useEffect(() => {
    if (!open) setOpenIdx(null)
  }, [open])

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative bg-white rounded-[4px] w-full max-w-[1100px] max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gold/20 bg-cream shrink-0">
                <div>
                  <span className="text-gold text-[11px] uppercase tracking-[0.2em] font-serif">Coverage Area</span>
                  <h3 className="font-serif text-[28px] text-navy leading-tight">{label}</h3>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-navy/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Gallery */}
              <div className="flex-1 overflow-y-auto p-6">
                {images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setOpenIdx(i)}
                        className="relative aspect-[4/3] rounded-[2px] overflow-hidden bg-cream-deeper group cursor-pointer"
                        aria-label={`View ${label} photo ${i + 1}`}
                      >
                        <Image
                          src={src}
                          alt={label}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <p className="font-serif text-[20px] text-navy">Photos coming soon</p>
                    <p className="font-serif font-light text-[16px] text-slate mt-2">
                      We have worked in {label} but don&apos;t yet have imagery available for this region.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ImageLightbox
        open={openIdx !== null}
        onClose={() => setOpenIdx(null)}
        src={openIdx !== null ? images[openIdx] : null}
        alt={label}
        hasPrev={openIdx !== null && openIdx > 0}
        hasNext={openIdx !== null && openIdx < images.length - 1}
        onPrev={() => setOpenIdx((i) => (i !== null && i > 0 ? i - 1 : i))}
        onNext={() => setOpenIdx((i) => (i !== null && i < images.length - 1 ? i + 1 : i))}
      />
    </>
  )
}

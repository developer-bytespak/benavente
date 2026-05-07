'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import type { TeamMemberRow } from '@/lib/supabase/types'

interface Props {
  team: TeamMemberRow[]
}

export default function TeamGrid({ team }: Props) {
  const [selected, setSelected] = useState<TeamMemberRow | null>(null)

  const close = useCallback(() => setSelected(null), [])

  // Keyboard + scroll-lock
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [selected, close])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {team.map((member, i) => (
          <RevealOnScroll key={member.id} delay={i * 0.08}>
            <button
              type="button"
              onClick={() => setSelected(member)}
              className="group relative text-center w-full focus:outline-none"
              aria-label={`View profile for ${member.name}`}
            >
              {/* Avatar */}
              <div className="relative mx-auto w-[180px] h-[180px] mb-6">
                <div className="absolute inset-0 rounded-full border border-gold/20 transition-all duration-500 group-hover:border-gold/60 group-hover:scale-105" />
                <div className="absolute inset-[6px] rounded-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5 transition-all duration-500">
                  {member.photo_url && (
                    <Image
                      src={member.photo_url}
                      alt={member.name}
                      fill
                      sizes="180px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="absolute bottom-1 right-3 w-3 h-3 rounded-full bg-gold border-2 border-navy transition-transform duration-300 group-hover:scale-125" />
                {/* Hover overlay */}
                <div className="absolute inset-[6px] rounded-full bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <span className="text-gold text-[11px] tracking-[0.15em] uppercase font-serif mt-1.5">
                    View Profile
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-[20px] text-white transition-colors duration-300 group-hover:text-gold px-2 leading-tight">
                {member.name}
              </h3>
              <p className="font-serif font-light text-[13px] text-white/50 tracking-[0.08em] uppercase mt-1.5">
                {member.role}
              </p>
              <div className="w-8 h-px bg-gold/30 mx-auto mt-4 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />
            </button>
          </RevealOnScroll>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="team-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={close}
          >
            <motion.div
              key="team-modal-panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-navy border border-gold/20 rounded-[4px] w-full max-w-[560px] max-h-[90vh] overflow-y-auto p-8 sm:p-10"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={close}
                aria-label="Close profile"
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Photo + name */}
              <div className="flex flex-col items-center text-center mb-7">
                <div className="relative w-[120px] h-[120px] mb-5">
                  <div className="absolute inset-0 rounded-full border border-gold/30" />
                  <div className="absolute inset-[5px] rounded-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
                    {selected.photo_url && (
                      <Image
                        src={selected.photo_url}
                        alt={selected.name}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <h3 className="font-serif text-[22px] text-white leading-tight">
                  {selected.name}
                </h3>
                <p className="font-serif font-light text-[12px] text-gold/70 tracking-[0.12em] uppercase mt-2">
                  {selected.role}
                </p>
                <div className="w-8 h-px bg-gold/40 mt-4" />
              </div>

              {/* Bio */}
              {selected.bio ? (
                <p className="text-white/70 text-[15px] font-light leading-[1.85] text-center">
                  {selected.bio}
                </p>
              ) : (
                <p className="text-white/30 text-[14px] font-light italic text-center">
                  Bio coming soon.
                </p>
              )}

              {/* CV download */}
              {selected.cv_url && (
                <div className="mt-8 flex justify-center">
                  <a
                    href={selected.cv_url}
                    download={selected.cv_filename ?? undefined}
                    className="inline-flex items-center gap-2.5 border border-gold/40 hover:border-gold text-gold hover:text-white text-[12px] tracking-[0.15em] uppercase font-serif px-6 py-3 transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    Download CV
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

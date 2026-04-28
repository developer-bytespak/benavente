'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Icon from './Icon'

interface Props {
  onAuthenticated: () => void
}

const DEMO_PASSWORD = '1234'

export default function Login({ onAuthenticated }: Props) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError('')

    setTimeout(() => {
      if (password === DEMO_PASSWORD) {
        try {
          sessionStorage.setItem('benavente_admin_auth', '1')
        } catch {}
        onAuthenticated()
      } else {
        setError('Incorrect password. Please try again.')
        setShake(true)
        setTimeout(() => setShake(false), 500)
        setSubmitting(false)
      }
    }, 350)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-navy flex items-center justify-center p-6">
      {/* Background image */}
      <Image
        src="/images/regions/oahu-skyline.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy-dark" />

      {/* Decorative gold accents */}
      <div className="absolute top-10 left-10 w-24 h-px bg-gold/30" />
      <div className="absolute top-10 left-10 w-px h-24 bg-gold/30" />
      <div className="absolute bottom-10 right-10 w-24 h-px bg-gold/30" />
      <div className="absolute bottom-10 right-10 w-px h-24 bg-gold/30" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: shake ? [0, -8, 8, -6, 6, -3, 3, 0] : 0,
        }}
        transition={{
          opacity: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
          y: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
          scale: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
          x: { duration: 0.45 },
        }}
        className="relative w-full max-w-[440px]"
      >
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[6px] overflow-hidden">
          {/* Header */}
          <div className="px-9 pt-10 pb-7 text-center border-b border-white/8">
            <div className="inline-flex items-center justify-center w-[78px] h-[78px] mb-5">
              <Image
                src="/images/hero/logo.png"
                alt="The Benavente Group LLC"
                width={78}
                height={78}
                className="w-[78px] h-[78px] object-contain"
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-gold text-[10px] tracking-[0.32em] uppercase font-serif font-medium mb-2.5">
              <span className="w-5 h-px bg-gold/50" />
              Admin Portal
              <span className="w-5 h-px bg-gold/50" />
            </div>
            <h1 className="font-serif text-[28px] text-white leading-tight">
              Welcome <span className="italic text-gold-light">Back</span>
            </h1>
            <p className="text-white/45 text-[13px] font-light mt-1.5">
              Sign in to manage your website &amp; leads
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-9 py-8">
            <label className="block">
              <span className="text-white/55 text-[11px] tracking-[0.22em] uppercase font-serif font-medium block mb-2.5">
                Password
              </span>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70">
                  <Icon name="lock" className="w-[18px] h-[18px]" />
                </span>
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (error) setError('')
                  }}
                  autoFocus
                  placeholder="••••"
                  className="w-full bg-white/5 border border-white/15 focus:border-gold focus:bg-white/10 focus:outline-none pl-11 pr-12 py-3.5 text-[16px] font-serif text-white placeholder:text-white/25 rounded-[3px] transition-all duration-300 tracking-[0.05em]"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold transition-colors p-1"
                  aria-label={show ? 'Hide password' : 'Show password'}
                >
                  <Icon name={show ? 'eyeOff' : 'eye'} className="w-[18px] h-[18px]" />
                </button>
              </div>
            </label>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-300 text-[13px] font-serif mt-3 flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-red-300" />
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={submitting || !password}
              className="w-full mt-6 bg-gold text-white hover:bg-gold-dark disabled:bg-white/10 disabled:text-white/40 disabled:cursor-not-allowed border border-gold disabled:border-white/10 px-6 py-3.5 text-[13px] font-serif font-medium tracking-[0.18em] uppercase rounded-[3px] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border border-white/40 border-t-white animate-spin" />
                  Verifying
                </>
              ) : (
                <>
                  Sign In
                  <span className="text-base leading-none">&rarr;</span>
                </>
              )}
            </button>

            <div className="mt-6 pt-5 border-t border-white/8">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold/15 border border-gold/30 text-gold text-[10px] font-bold">
                  i
                </span>
                <div>
                  <p className="text-gold/80 text-[11px] tracking-[0.18em] uppercase font-serif font-medium">
                    Demo Access
                  </p>
                  <p className="text-white/45 text-[13px] font-light leading-relaxed mt-1">
                    Use password{' '}
                    <span className="font-mono text-gold-light bg-gold/12 px-1.5 py-0.5 rounded-[2px] tracking-widest">
                      1234
                    </span>{' '}
                    to preview the panel.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <p className="text-center text-white/30 text-[11px] tracking-[0.2em] uppercase font-serif mt-6">
          The Benavente Group LLC &middot; Admin v1.0
        </p>
      </motion.div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'
import Icon from '@/components/admin/ui/Icon'
import { signIn, type SignInState } from '../_actions/auth'

export default function LoginForm() {
  const params = useSearchParams()
  const redirectTo = params.get('redirect') ?? '/admin'
  const [state, formAction] = useFormState<SignInState, FormData>(signIn, null)

  return (
    <div className="min-h-screen relative overflow-hidden bg-navy flex items-center justify-center p-6">
      <Image
        src="/images/regions/oahu-skyline.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy-dark" />

      <div className="absolute top-10 left-10 w-24 h-px bg-gold/30" />
      <div className="absolute top-10 left-10 w-px h-24 bg-gold/30" />
      <div className="absolute bottom-10 right-10 w-24 h-px bg-gold/30" />
      <div className="absolute bottom-10 right-10 w-px h-24 bg-gold/30" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-[440px]"
      >
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[6px] overflow-hidden">
          <div className="px-9 pt-10 pb-7 text-center border-b border-white/8">
            <div className="inline-flex items-center justify-center w-[78px] h-[78px] mb-5">
              <Image src="/images/hero/logo.png" alt="Benavente Group" width={78} height={78} className="object-contain" />
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
              Sign in to manage your website &amp; submissions
            </p>
          </div>

          <form action={formAction} className="px-9 py-8">
            <input type="hidden" name="redirect" value={redirectTo} />

            <label className="block">
              <span className="text-white/55 text-[11px] tracking-[0.22em] uppercase font-serif font-medium block mb-2.5">
                Email
              </span>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70">
                  <Icon name="mail" className="w-[18px] h-[18px]" />
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/15 focus:border-gold focus:bg-white/10 focus:outline-none pl-11 pr-3 py-3.5 text-[15px] font-serif text-white placeholder:text-white/25 rounded-[3px] transition-all duration-300"
                />
              </div>
            </label>

            <label className="block mt-5">
              <span className="text-white/55 text-[11px] tracking-[0.22em] uppercase font-serif font-medium block mb-2.5">
                Password
              </span>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70">
                  <Icon name="lock" className="w-[18px] h-[18px]" />
                </span>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/15 focus:border-gold focus:bg-white/10 focus:outline-none pl-11 pr-3 py-3.5 text-[15px] font-serif text-white placeholder:text-white/25 rounded-[3px] transition-all duration-300 tracking-[0.05em]"
                />
              </div>
            </label>

            {state?.error && (
              <p className="text-red-300 text-[13px] font-serif mt-4 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-red-300" />
                {state.error}
              </p>
            )}

            <SubmitButton />
          </form>
        </div>

        <p className="text-center text-white/30 text-[11px] tracking-[0.2em] uppercase font-serif mt-6">
          The Benavente Group LLC &middot; Admin v1.0
        </p>
      </motion.div>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full mt-7 bg-gold text-white hover:bg-gold-dark disabled:bg-white/10 disabled:text-white/40 disabled:cursor-not-allowed border border-gold disabled:border-white/10 px-6 py-3.5 text-[13px] font-serif font-medium tracking-[0.18em] uppercase rounded-[3px] transition-all duration-300 flex items-center justify-center gap-2"
    >
      {pending ? (
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
  )
}

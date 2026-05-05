'use client'

import { useFormStatus } from 'react-dom'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function SaveButton({ children = 'Save Changes', className = '' }: Props) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center gap-2 h-10 px-5 rounded-[3px] bg-gold text-white hover:bg-gold-dark disabled:bg-gold/40 disabled:cursor-not-allowed text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors ${className}`}
    >
      {pending ? (
        <>
          <span className="w-3 h-3 rounded-full border border-white/40 border-t-white animate-spin" />
          Saving
        </>
      ) : (
        children
      )}
    </button>
  )
}

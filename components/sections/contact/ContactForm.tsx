'use client'

import { useState, FormEvent } from 'react'
import Button from '@/components/ui/Button'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    setError(null)
    setPending(true)

    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          message: fd.get('message'),
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setPending(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <h3 className="font-serif text-[28px] text-navy">Thank You</h3>
        <p className="text-slate text-[14px] font-light mt-3">
          Your inquiry has been received. We typically provide a prompt response.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-cream border border-navy/10 focus:border-gold focus:outline-none px-4 py-3 text-[16px] font-serif text-navy placeholder:text-slate-light/60 rounded-[2px] transition-colors duration-300'

  return (
    <div>
      <h3 className="text-[14px] uppercase tracking-[0.2em] text-slate-light font-serif font-medium mb-6">
        Send Us a Message
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input name="name" type="text" placeholder="Name" className={inputClass} required />
        <input name="email" type="email" placeholder="Email Address" className={inputClass} required />
        <textarea
          name="message"
          placeholder="Comment"
          className={`${inputClass} min-h-[130px] resize-y`}
          required
        />
        {error && (
          <p className="text-red-600 text-[13px] font-serif flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            {error}
          </p>
        )}
        <Button type="submit" variant="solid" className="w-full mt-2" disabled={pending}>
          {pending ? 'Sending…' : 'Submit Inquiry'}
        </Button>
      </form>
      <p className="text-[13px] text-slate-light mt-3">
        We typically provide a prompt response. All inquiries are treated with strict confidentiality.
      </p>
    </div>
  )
}

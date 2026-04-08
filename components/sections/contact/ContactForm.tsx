'use client'

import { useState, FormEvent } from 'react'
import Button from '@/components/ui/Button'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <h3 className="font-serif text-[28px] text-navy">Thank You</h3>
        <p className="text-slate text-[14px] font-light mt-3">
          Your inquiry has been received. We typically respond within one business day.
        </p>
      </div>
    )
  }

  const inputClass = "w-full bg-cream border border-navy/10 focus:border-gold focus:outline-none px-4 py-3 text-[16px] font-serif text-navy placeholder:text-slate-light/60 rounded-[2px] transition-colors duration-300"

  return (
    <div>
      <h3 className="text-[14px] uppercase tracking-[0.2em] text-slate-light font-serif font-medium mb-6">
        Send Us a Message
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input type="text" placeholder="Name" className={inputClass} required />
        <input type="email" placeholder="Email Address" className={inputClass} required />
        <textarea placeholder="Comment" className={`${inputClass} min-h-[130px] resize-y`} required />
        <Button type="submit" variant="solid" className="w-full mt-2">Submit Inquiry</Button>
      </form>
      <p className="text-[13px] text-slate-light mt-3">
        We typically respond within one business day. All inquiries treated with strict confidentiality.
      </p>
    </div>
  )
}

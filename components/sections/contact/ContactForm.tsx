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

  const inputClass = "w-full bg-cream border border-navy/10 focus:border-gold focus:outline-none px-4 py-3 text-[15px] font-sans text-navy placeholder:text-slate-light/60 rounded-[2px] transition-colors duration-300"

  return (
    <div>
      <h3 className="text-[13px] uppercase tracking-[0.2em] text-slate-light font-sans font-medium mb-6">
        Send Us a Message
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <input type="text" placeholder="First Name" className={inputClass} required />
          <input type="text" placeholder="Last Name" className={inputClass} required />
        </div>
        <input type="email" placeholder="Email Address" className={inputClass} required />
        <input type="tel" placeholder="Phone Number" className={inputClass} />
        <select className={inputClass} defaultValue="">
          <option value="" disabled>Service Needed</option>
          <option>Commercial Appraisal</option>
          <option>Residential Valuation</option>
          <option>Market Analysis</option>
          <option>Litigation Support</option>
          <option>Property Tax Appeal</option>
          <option>Consulting</option>
          <option>Pacific Region Work</option>
          <option>Other</option>
        </select>
        <input type="text" placeholder="Property Type / Description" className={inputClass} />
        <input type="text" placeholder="Intended Use of Appraisal" className={inputClass} />
        <input type="text" placeholder="Timeline / Deadline" className={inputClass} />
        <textarea placeholder="Message / Additional Details" className={`${inputClass} min-h-[130px] resize-y`} />
        <Button type="submit" variant="solid" className="w-full mt-2">Submit Inquiry</Button>
      </form>
      <p className="text-[13px] text-slate-light mt-3">
        We typically respond within one business day. All inquiries treated with strict confidentiality.
      </p>
    </div>
  )
}

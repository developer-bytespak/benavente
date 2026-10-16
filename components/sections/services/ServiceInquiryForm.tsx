'use client'

import { useId, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { serviceForms, type ServiceField } from '@/lib/serviceForms'

interface Props {
  service: string
  // compact: hero card with contact details and the required service fields.
  // full: every field, plus property, company and message.
  variant?: 'compact' | 'full'
}

const inputClass =
  'w-full bg-cream border border-navy/10 focus:border-gold focus:outline-none px-4 py-3 text-[16px] font-serif text-navy placeholder:text-slate-light/70 rounded-[2px] transition-colors duration-300'
const labelClass = 'block text-[11px] tracking-[0.18em] uppercase font-serif font-medium text-slate mb-2'

export default function ServiceInquiryForm({ service, variant = 'full' }: Props) {
  const config = serviceForms[service]
  const uid = useId()
  const [details, setDetails] = useState<Record<string, string>>({})
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  if (!config) return null
  const compact = variant === 'compact'
  const fields = compact ? config.fields.filter((f) => f.quick) : config.fields
  const id = (name: string) => `${uid}-${name}`

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
          service,
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          company: fd.get('company'),
          property: fd.get('property'),
          message: fd.get('message'),
          website: fd.get('website'),
          details,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) setError(data.error || 'Something went wrong. Please try again.')
      else setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setPending(false)
    }
  }

  const setDetail = (name: string, value: string) => setDetails((d) => ({ ...d, [name]: value }))

  function renderField(field: ServiceField) {
    const fieldId = id(field.name)
    const label = (
      <>
        {field.label}
        {field.required && <span className="text-gold-dark"> *</span>}
      </>
    )

    if (field.type === 'radio') {
      return (
        <fieldset key={field.name}>
          <legend className={labelClass}>{label}</legend>
          <div className="flex flex-wrap gap-2">
            {field.options!.map((opt) => (
              <label key={opt} className="cursor-pointer">
                <input
                  type="radio"
                  name={fieldId}
                  value={opt}
                  required={field.required}
                  checked={details[field.name] === opt}
                  onChange={() => setDetail(field.name, opt)}
                  className="peer sr-only"
                />
                <span className="inline-block px-4 py-2 border border-navy/15 rounded-[2px] font-serif text-[15px] text-navy transition-colors duration-200 peer-checked:border-gold peer-checked:bg-gold peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-gold/40 hover:border-gold/60">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )
    }

    const hint = field.hints?.[details[field.name] ?? '']
    return (
      <div key={field.name}>
        <label htmlFor={fieldId} className={labelClass}>
          {label}
        </label>
        {field.type === 'select' ? (
          <div className="relative">
            <select
              id={fieldId}
              required={field.required}
              value={details[field.name] ?? ''}
              onChange={(e) => setDetail(field.name, e.target.value)}
              className={`${inputClass} appearance-none pr-10 ${details[field.name] ? '' : 'text-slate-light'}`}
            >
              <option value="" disabled>
                Select…
              </option>
              {field.options!.map((opt) => (
                <option key={opt} value={opt} className="text-navy">
                  {opt}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gold-dark">
              &#9662;
            </span>
          </div>
        ) : (
          <input
            id={fieldId}
            type={field.type}
            required={field.required}
            maxLength={300}
            placeholder={field.placeholder}
            value={details[field.name] ?? ''}
            onChange={(e) => setDetail(field.name, e.target.value)}
            className={inputClass}
          />
        )}
        {hint && <p className="text-gold-dark text-[13px] font-serif mt-2">{hint}</p>}
      </div>
    )
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-12"
            role="status"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold text-gold-dark text-[20px]">
              &#10003;
            </span>
            <p className="font-serif text-[28px] text-navy mt-5">Thank You</p>
            <p className="text-slate text-[15px] font-light leading-[1.7] mt-2 max-w-[360px] mx-auto">
              Your inquiry has been received. We will review the details and respond promptly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor={id('website')}>Website</label>
              <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor={id('name')} className={labelClass}>
                  Name<span className="text-gold-dark"> *</span>
                </label>
                <input id={id('name')} name="name" type="text" autoComplete="name" maxLength={200} required className={inputClass} />
              </div>
              <div>
                <label htmlFor={id('email')} className={labelClass}>
                  Email<span className="text-gold-dark"> *</span>
                </label>
                <input id={id('email')} name="email" type="email" autoComplete="email" maxLength={320} required className={inputClass} />
              </div>
              <div className={compact ? 'sm:col-span-2' : ''}>
                <label htmlFor={id('phone')} className={labelClass}>
                  Phone
                </label>
                <input id={id('phone')} name="phone" type="tel" autoComplete="tel" maxLength={40} className={inputClass} />
              </div>
              {!compact && (
                <div>
                  <label htmlFor={id('company')} className={labelClass}>
                    Company or organization
                  </label>
                  <input id={id('company')} name="company" type="text" autoComplete="organization" maxLength={200} className={inputClass} />
                </div>
              )}
            </div>

            <div className={`grid grid-cols-1 gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
              {fields.map((field) => (
                <div key={field.name} className={!compact && field.type === 'radio' ? 'sm:col-span-2' : ''}>
                  {renderField(field)}
                </div>
              ))}
            </div>

            {!compact && (
              <>
                <div>
                  <label htmlFor={id('property')} className={labelClass}>
                    {config.propertyLabel}
                  </label>
                  <input id={id('property')} name="property" type="text" maxLength={300} className={inputClass} />
                </div>
                <div>
                  <label htmlFor={id('message')} className={labelClass}>
                    Anything else we should know?
                  </label>
                  <textarea id={id('message')} name="message" maxLength={5000} className={`${inputClass} min-h-[120px] resize-y`} />
                </div>
              </>
            )}

            {error && (
              <p role="alert" className="text-red-600 text-[14px] font-serif flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                {error}
              </p>
            )}

            <Button type="submit" variant="gold" className="w-full" disabled={pending}>
              {pending ? 'Sending…' : 'Request a Proposal'}
            </Button>

            <p className="text-[13px] text-slate leading-[1.6]">
              {config.note ?? 'We typically provide a prompt response. All inquiries are treated with strict confidentiality.'}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

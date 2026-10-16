import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import {
  serviceForms,
  validateServiceDetails,
  detailLabel,
  serviceMarker,
} from '@/lib/serviceForms'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// PostgREST / Postgres codes for a column the table doesn't have yet, i.e.
// migration 0007_service_inquiries.sql has not been applied.
const MISSING_COLUMN_CODES = new Set(['PGRST204', '42703'])

const optional = (value: unknown, max: number) => String(value ?? '').trim().slice(0, max) || null

export async function POST(req: Request) {
  let body: {
    name?: unknown
    email?: unknown
    message?: unknown
    phone?: unknown
    company?: unknown
    property?: unknown
    service?: unknown
    details?: unknown
    website?: unknown
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 })
  }

  // Honeypot: real visitors never see or fill this field.
  if (String(body.website ?? '').trim()) {
    return NextResponse.json({ ok: true })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()
  const service = body.service ? String(body.service) : null

  // Service inquiries carry their details in structured fields, so the
  // free-text message is optional for them; the contact page still requires it.
  if (!name || !email || (!service && !message)) {
    return NextResponse.json(
      { ok: false, error: 'All fields are required.' },
      { status: 400 }
    )
  }
  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return NextResponse.json({ ok: false, error: 'Message too long.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address.' }, { status: 400 })
  }

  // General contact form: unchanged behaviour.
  if (!service) {
    const { error } = await supabaseServer.from('contact_submissions').insert({ name, email, message })
    if (error) {
      console.error('[contact] insert failed:', error.message)
      return NextResponse.json({ ok: false, error: 'Could not send right now.' }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  }

  if (!serviceForms[service]) {
    return NextResponse.json({ ok: false, error: 'Unknown service.' }, { status: 400 })
  }
  const checked = validateServiceDetails(service, body.details)
  if (!checked.ok) {
    return NextResponse.json({ ok: false, error: checked.error }, { status: 400 })
  }

  const phone = optional(body.phone, 40)
  const company = optional(body.company, 200)
  const property = optional(body.property, 300)

  const { error } = await supabaseServer.from('contact_submissions').insert({
    name,
    email,
    message,
    service,
    phone,
    company,
    property,
    details: checked.details,
  })

  if (error && MISSING_COLUMN_CODES.has(error.code)) {
    // Columns not migrated yet: keep the inquiry by writing everything into the
    // message so nothing is lost.
    const lines = [
      serviceMarker(service),
      phone && `Phone: ${phone}`,
      company && `Company: ${company}`,
      property && `${serviceForms[service].propertyLabel}: ${property}`,
      ...Object.entries(checked.details).map(([key, value]) => `${detailLabel(service, key)}: ${value}`),
      message && `\n${message}`,
    ].filter(Boolean)
    const fallback = await supabaseServer
      .from('contact_submissions')
      .insert({ name, email, message: lines.join('\n') })
    if (fallback.error) {
      console.error('[contact] fallback insert failed:', fallback.error.message)
      return NextResponse.json({ ok: false, error: 'Could not send right now.' }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  }

  if (error) {
    console.error('[contact] insert failed:', error.message)
    return NextResponse.json({ ok: false, error: 'Could not send right now.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}

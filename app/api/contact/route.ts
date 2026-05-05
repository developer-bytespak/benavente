import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let body: { name?: unknown; email?: unknown; message?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name || !email || !message) {
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

  const { error } = await supabaseServer.from('contact_submissions').insert({ name, email, message })
  if (error) {
    console.error('[contact] insert failed:', error.message)
    return NextResponse.json({ ok: false, error: 'Could not send right now.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

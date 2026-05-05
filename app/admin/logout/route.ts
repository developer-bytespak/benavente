import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function POST(req: Request) {
  const store = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return store.get(name)?.value
        },
        set(name, value, options: CookieOptions) {
          store.set({ name, value, ...options })
        },
        remove(name, options: CookieOptions) {
          store.set({ name, value: '', ...options })
        },
      },
    }
  )
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/admin/login', req.url), { status: 303 })
}

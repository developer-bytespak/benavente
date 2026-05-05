import 'server-only'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './types'

// Cookie-bound Supabase client for use in admin Server Components and Server
// Actions. Operates as the `authenticated` role once a session cookie is set,
// so RLS policies apply (vs. the service-role client in ./server.ts).
export function supabaseServerComponent() {
  const cookieStore = cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options: CookieOptions) {
          // Server Components can't set cookies; the middleware refresh covers it.
          try {
            cookieStore.set({ name, value, ...options })
          } catch {}
        },
        remove(name, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {}
        },
      },
    }
  )
}

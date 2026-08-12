import 'server-only'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'
import { createUnconfiguredSupabaseClient } from './unconfigured'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && serviceRoleKey)

if (!isSupabaseConfigured) {
  console.warn(
    '[supabase] Not configured (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). ' +
      'Running standalone: content reads return empty and writes are disabled.'
  )
}

// Service-role client. Bypasses RLS — only import from Server Components,
// Route Handlers, or Server Actions. The `server-only` import above will
// fail the build if a client component pulls this in.
//
// With no credentials the app still boots and the public site renders; see
// ./unconfigured.ts.
export const supabaseServer = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl!, serviceRoleKey!, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : createUnconfiguredSupabaseClient()

'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'
import { createUnconfiguredSupabaseClient } from './unconfigured'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && anonKey)

let _client: ReturnType<typeof createBrowserClient<Database>> | null = null

// Memoised so React Fast Refresh doesn't churn auth listeners.
export function supabaseBrowser() {
  if (!_client) {
    // Standalone mode: no credentials, so return the no-op client instead of
    // throwing on createBrowserClient.
    _client = isSupabaseConfigured
      ? createBrowserClient<Database>(supabaseUrl!, anonKey!)
      : (createUnconfiguredSupabaseClient() as ReturnType<
          typeof createBrowserClient<Database>
        >)
  }
  return _client
}

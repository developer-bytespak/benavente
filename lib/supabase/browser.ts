'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

let _client: ReturnType<typeof createBrowserClient<Database>> | null = null

// Memoised so React Fast Refresh doesn't churn auth listeners.
export function supabaseBrowser() {
  if (!_client) {
    _client = createBrowserClient<Database>(supabaseUrl, anonKey)
  }
  return _client
}

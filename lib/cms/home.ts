import 'server-only'
import { supabaseServer } from '@/lib/supabase/server'
import type { HomePageRow } from '@/lib/supabase/types'

export async function getHomePage(): Promise<HomePageRow | null> {
  const { data, error } = await supabaseServer
    .from('home_page')
    .select('*')
    .eq('id', 1)
    .maybeSingle()
  if (error) {
    console.error('[cms] getHomePage:', error.message)
    return null
  }
  return data
}

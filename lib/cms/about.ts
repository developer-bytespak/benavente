import 'server-only'
import { supabaseServer } from '@/lib/supabase/server'
import type { AboutPageRow } from '@/lib/supabase/types'

export async function getAboutPage(): Promise<AboutPageRow | null> {
  const { data, error } = await supabaseServer
    .from('about_page')
    .select('*')
    .eq('id', 1)
    .maybeSingle()
  if (error) {
    console.error('[cms] getAboutPage:', error.message)
    return null
  }
  return data
}

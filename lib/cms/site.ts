import 'server-only'
import { supabaseServer } from '@/lib/supabase/server'
import type { SiteSettingsRow, ContactInfoRow } from '@/lib/supabase/types'

export async function getSiteSettings(): Promise<SiteSettingsRow | null> {
  const { data, error } = await supabaseServer
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .maybeSingle()
  if (error) {
    console.error('[cms] getSiteSettings:', error.message)
    return null
  }
  return data
}

export async function getContactInfo(): Promise<ContactInfoRow | null> {
  const { data, error } = await supabaseServer
    .from('contact_info')
    .select('*')
    .eq('id', 1)
    .maybeSingle()
  if (error) {
    console.error('[cms] getContactInfo:', error.message)
    return null
  }
  return data
}

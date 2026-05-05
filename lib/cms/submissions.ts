import 'server-only'
import { supabaseServer } from '@/lib/supabase/server'
import type { ContactSubmissionRow } from '@/lib/supabase/types'

export async function getSubmissions(): Promise<ContactSubmissionRow[]> {
  const { data, error } = await supabaseServer
    .from('contact_submissions')
    .select('*')
    .order('submitted_at', { ascending: false })
  if (error) {
    console.error('[cms] getSubmissions:', error.message)
    return []
  }
  return data ?? []
}

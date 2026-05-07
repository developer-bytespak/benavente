import 'server-only'
import { supabaseServer } from '@/lib/supabase/server'
import type { RegionRow } from '@/lib/supabase/types'

export async function getRegions(): Promise<RegionRow[]> {
  const { data, error } = await supabaseServer
    .from('regions')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) {
    console.error('[cms] getRegions:', error.message)
    return []
  }
  return data ?? []
}

export async function getRegion(id: string): Promise<RegionRow | null> {
  const { data, error } = await supabaseServer
    .from('regions')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) {
    console.error('[cms] getRegion:', error.message)
    return null
  }
  return data
}

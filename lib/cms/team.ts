import 'server-only'
import { supabaseServer } from '@/lib/supabase/server'
import type { TeamMemberRow } from '@/lib/supabase/types'

export async function getVisibleTeam(): Promise<TeamMemberRow[]> {
  const { data, error } = await supabaseServer
    .from('team_members')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) {
    console.error('[cms] getVisibleTeam:', error.message)
    return []
  }
  return data ?? []
}

export async function getAllTeam(): Promise<TeamMemberRow[]> {
  const { data, error } = await supabaseServer
    .from('team_members')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) {
    console.error('[cms] getAllTeam:', error.message)
    return []
  }
  return data ?? []
}

export async function getTeamMember(id: string): Promise<TeamMemberRow | null> {
  const { data, error } = await supabaseServer
    .from('team_members')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) {
    console.error('[cms] getTeamMember:', error.message)
    return null
  }
  return data
}

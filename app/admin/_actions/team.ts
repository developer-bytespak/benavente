'use server'

import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/admin/auth'
import { revalidatePublic } from '@/lib/admin/revalidate'
import { BUCKETS } from '@/lib/admin/storage'
import type { ActionState } from '@/components/admin/ui/SaveStatus'

function readPayload(formData: FormData) {
  return {
    name: String(formData.get('name') ?? '').trim(),
    role: String(formData.get('role') ?? '').trim(),
    photo_url: String(formData.get('photo_url') ?? '').trim() || null,
    cv_url: String(formData.get('cv_url') ?? '').trim() || null,
    cv_filename: String(formData.get('cv_filename') ?? '').trim() || null,
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,
    visible: formData.get('visible') === 'on',
  }
}

export async function createTeamMember(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()
  const payload = readPayload(formData)
  if (!payload.name || !payload.role) {
    return { ok: false, message: 'Name and role are required.' }
  }
  const { error } = await supabaseServer.from('team_members').insert(payload)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('about')
  redirect('/admin/team')
}

export async function updateTeamMember(
  id: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()
  const payload = readPayload(formData)
  if (!payload.name || !payload.role) {
    return { ok: false, message: 'Name and role are required.' }
  }
  const { error } = await supabaseServer.from('team_members').update(payload).eq('id', id)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('about')
  return { ok: true, message: 'Team member saved.' }
}

// Best-effort cleanup: if the photo/CV lives in our storage, remove it.
function pathFromPublicUrl(publicUrl: string | null, bucket: string): string | null {
  if (!publicUrl) return null
  const marker = `/storage/v1/object/public/${bucket}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return null
  return publicUrl.slice(idx + marker.length)
}

export async function deleteTeamMember(id: string, _formData?: FormData) {
  await requireAdmin()
  const { data: existing } = await supabaseServer
    .from('team_members')
    .select('photo_url, cv_url')
    .eq('id', id)
    .maybeSingle()

  const { error } = await supabaseServer.from('team_members').delete().eq('id', id)
  if (error) throw new Error(error.message)

  if (existing) {
    const photoPath = pathFromPublicUrl(existing.photo_url, BUCKETS.team)
    const cvPath = pathFromPublicUrl(existing.cv_url, BUCKETS.cv)
    if (photoPath) await supabaseServer.storage.from(BUCKETS.team).remove([photoPath])
    if (cvPath) await supabaseServer.storage.from(BUCKETS.cv).remove([cvPath])
  }

  revalidatePublic('about')
  redirect('/admin/team')
}

export async function toggleTeamVisibility(id: string, _formData?: FormData) {
  await requireAdmin()
  const { data } = await supabaseServer
    .from('team_members')
    .select('visible')
    .eq('id', id)
    .maybeSingle()
  if (!data) return
  const { error } = await supabaseServer
    .from('team_members')
    .update({ visible: !data.visible })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePublic('about')
}

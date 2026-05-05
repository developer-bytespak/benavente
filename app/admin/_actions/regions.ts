'use server'

import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/admin/auth'
import { revalidatePublic } from '@/lib/admin/revalidate'
import { BUCKETS } from '@/lib/admin/storage'
import type { ActionState } from '@/components/admin/ui/SaveStatus'

function readPayload(formData: FormData) {
  const broll = formData
    .getAll('broll_images')
    .map((v) => String(v).trim())
    .filter(Boolean)

  return {
    name: String(formData.get('name') ?? '').trim(),
    note: String(formData.get('note') ?? '').trim() || null,
    hero_image_url: String(formData.get('hero_image_url') ?? '').trim() || null,
    broll_images: broll,
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,
  }
}

export async function createRegion(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()
  const payload = readPayload(formData)
  if (!payload.name) return { ok: false, message: 'Name is required.' }
  const { error } = await supabaseServer.from('regions').insert(payload)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('about')
  redirect('/admin/regions')
}

export async function updateRegion(
  id: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()
  const payload = readPayload(formData)
  if (!payload.name) return { ok: false, message: 'Name is required.' }
  const { error } = await supabaseServer.from('regions').update(payload).eq('id', id)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('about')
  return { ok: true, message: 'Region saved.' }
}

function pathFromPublicUrl(publicUrl: string | null, bucket: string): string | null {
  if (!publicUrl) return null
  const marker = `/storage/v1/object/public/${bucket}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return null
  return publicUrl.slice(idx + marker.length)
}

export async function deleteRegion(id: string, _formData?: FormData) {
  await requireAdmin()
  const { data: existing } = await supabaseServer
    .from('regions')
    .select('hero_image_url, broll_images')
    .eq('id', id)
    .maybeSingle()

  const { error } = await supabaseServer.from('regions').delete().eq('id', id)
  if (error) throw new Error(error.message)

  if (existing) {
    const paths: string[] = []
    const heroPath = pathFromPublicUrl(existing.hero_image_url, BUCKETS.regions)
    if (heroPath) paths.push(heroPath)
    for (const url of existing.broll_images ?? []) {
      const p = pathFromPublicUrl(url, BUCKETS.regions)
      if (p) paths.push(p)
    }
    if (paths.length) await supabaseServer.storage.from(BUCKETS.regions).remove(paths)
  }

  revalidatePublic('about')
  redirect('/admin/regions')
}

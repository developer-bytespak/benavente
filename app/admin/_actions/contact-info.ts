'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/admin/auth'
import { revalidatePublic } from '@/lib/admin/revalidate'
import type { ActionState } from '@/components/admin/ui/SaveStatus'

function parseRegions(raw: string): string[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export async function updateContactInfo(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()

  const payload = {
    address: String(formData.get('address') ?? '').trim() || null,
    phone: String(formData.get('phone') ?? '').trim() || null,
    email: String(formData.get('email') ?? '').trim() || null,
    hours: String(formData.get('hours') ?? '').trim() || null,
    service_regions: parseRegions(String(formData.get('service_regions') ?? '')),
    map_embed_url: String(formData.get('map_embed_url') ?? '').trim() || null,
  }

  const { error } = await supabaseServer.from('contact_info').update(payload).eq('id', 1)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('home', 'about', 'gallery', 'contact', 'blog')
  return { ok: true, message: 'Contact info saved.' }
}

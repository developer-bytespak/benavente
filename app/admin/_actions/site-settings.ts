'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/admin/auth'
import { revalidatePublic } from '@/lib/admin/revalidate'
import type { ActionState } from '@/components/admin/ui/SaveStatus'

export async function updateSiteSettings(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()

  const payload = {
    logo_url: String(formData.get('logo_url') ?? '').trim() || null,
    footer_text: String(formData.get('footer_text') ?? '').trim() || null,
    copyright_text: String(formData.get('copyright_text') ?? '').trim() || null,
  }

  const { error } = await supabaseServer.from('site_settings').update(payload).eq('id', 1)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('home', 'about', 'gallery', 'contact', 'blog')
  return { ok: true, message: 'Site settings saved.' }
}

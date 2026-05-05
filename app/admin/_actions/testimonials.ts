'use server'

import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/admin/auth'
import { revalidatePublic } from '@/lib/admin/revalidate'
import type { ActionState } from '@/components/admin/ui/SaveStatus'

function readPayload(formData: FormData) {
  return {
    quote: String(formData.get('quote') ?? '').trim(),
    author: String(formData.get('author') ?? '').trim() || null,
    company: String(formData.get('company') ?? '').trim() || null,
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,
    visible: formData.get('visible') === 'on',
  }
}

export async function createTestimonial(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()
  const payload = readPayload(formData)
  if (!payload.quote) return { ok: false, message: 'Quote is required.' }

  const { error } = await supabaseServer.from('testimonials').insert(payload)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('home')
  redirect('/admin/testimonials')
}

export async function updateTestimonial(
  id: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()
  const payload = readPayload(formData)
  if (!payload.quote) return { ok: false, message: 'Quote is required.' }

  const { error } = await supabaseServer.from('testimonials').update(payload).eq('id', id)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('home')
  return { ok: true, message: 'Testimonial saved.' }
}

export async function deleteTestimonial(id: string, _formData?: FormData) {
  await requireAdmin()
  const { error } = await supabaseServer.from('testimonials').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePublic('home')
  redirect('/admin/testimonials')
}

export async function toggleTestimonialVisibility(id: string, _formData?: FormData) {
  await requireAdmin()
  const { data } = await supabaseServer
    .from('testimonials')
    .select('visible')
    .eq('id', id)
    .maybeSingle()
  if (!data) return
  const { error } = await supabaseServer
    .from('testimonials')
    .update({ visible: !data.visible })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePublic('home')
}

'use server'

import { revalidatePath } from 'next/cache'
import { supabaseServer } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/admin/auth'

export async function toggleRead(id: string, _formData?: FormData) {
  await requireAdmin()
  const { data } = await supabaseServer
    .from('contact_submissions')
    .select('read')
    .eq('id', id)
    .maybeSingle()
  if (!data) return
  const { error } = await supabaseServer
    .from('contact_submissions')
    .update({ read: !data.read })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/submissions')
  revalidatePath('/admin')
}

export async function deleteSubmission(id: string, _formData?: FormData) {
  await requireAdmin()
  const { error } = await supabaseServer.from('contact_submissions').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/submissions')
  revalidatePath('/admin')
}

export async function markAllRead(_formData?: FormData) {
  await requireAdmin()
  const { error } = await supabaseServer
    .from('contact_submissions')
    .update({ read: true })
    .eq('read', false)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/submissions')
  revalidatePath('/admin')
}

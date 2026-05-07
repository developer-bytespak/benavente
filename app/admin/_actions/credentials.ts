'use server'

import { requireAdmin } from '@/lib/admin/auth'
import { supabaseServerComponent } from '@/lib/supabase/serverComponent'
import type { ActionState } from '@/components/admin/ui/SaveStatus'

export async function changeEmail(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await requireAdmin()

  const newEmail = String(formData.get('new_email') ?? '').trim().toLowerCase()
  if (!newEmail) return { ok: false, message: 'New email is required.' }
  if (newEmail === user.email) return { ok: false, message: 'That is already your current email.' }

  const { error } = await supabaseServerComponent().auth.updateUser({ email: newEmail })
  if (error) return { ok: false, message: error.message }

  return {
    ok: true,
    message: `Confirmation email sent to ${newEmail}. The change takes effect after you click the link.`,
  }
}

export async function changePassword(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await requireAdmin()

  const currentPassword = String(formData.get('current_password') ?? '')
  const newPassword = String(formData.get('new_password') ?? '')
  const confirmPassword = String(formData.get('confirm_password') ?? '')

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { ok: false, message: 'All three fields are required.' }
  }
  if (newPassword.length < 8) {
    return { ok: false, message: 'New password must be at least 8 characters.' }
  }
  if (newPassword !== confirmPassword) {
    return { ok: false, message: 'New password and confirmation do not match.' }
  }

  // Verify current password by re-authenticating with the session-bound client
  const client = supabaseServerComponent()
  const { error: authError } = await client.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  })
  if (authError) return { ok: false, message: 'Current password is incorrect.' }

  const { error } = await client.auth.updateUser({ password: newPassword })
  if (error) return { ok: false, message: error.message }

  return { ok: true, message: 'Password updated successfully.' }
}

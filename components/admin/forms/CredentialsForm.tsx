'use client'

import { useFormState } from 'react-dom'
import Field from '@/components/admin/ui/Field'
import FormCard from '@/components/admin/ui/FormCard'
import SaveButton from '@/components/admin/ui/SaveButton'
import SaveStatus, { type ActionState } from '@/components/admin/ui/SaveStatus'
import { changeEmail, changePassword } from '@/app/admin/_actions/credentials'

export default function CredentialsForm() {
  const [emailState, emailAction] = useFormState<ActionState, FormData>(changeEmail, null)
  const [pwState, pwAction] = useFormState<ActionState, FormData>(changePassword, null)

  return (
    <div className="space-y-5 max-w-[760px]">
      {/* ── Change email ── */}
      <form action={emailAction} className="space-y-5">
        <FormCard
          title="Change Email"
          description="A confirmation link will be sent to the new address — the change takes effect after you click it"
        >
          <Field
            name="new_email"
            label="New email address"
            type="email"
            required
            placeholder="admin@example.com"
          />
        </FormCard>
        <div className="flex items-center gap-4">
          <SaveButton>Update Email</SaveButton>
          <SaveStatus state={emailState} />
        </div>
      </form>

      {/* ── Change password ── */}
      <form action={pwAction} className="space-y-5">
        <FormCard
          title="Change Password"
          description="Must be at least 8 characters"
        >
          <Field
            name="current_password"
            label="Current password"
            type="password"
            required
            placeholder="••••••••"
          />
          <Field
            name="new_password"
            label="New password"
            type="password"
            required
            placeholder="••••••••"
            hint="Minimum 8 characters."
          />
          <Field
            name="confirm_password"
            label="Confirm new password"
            type="password"
            required
            placeholder="••••••••"
          />
        </FormCard>
        <div className="flex items-center gap-4">
          <SaveButton>Update Password</SaveButton>
          <SaveStatus state={pwState} />
        </div>
      </form>
    </div>
  )
}

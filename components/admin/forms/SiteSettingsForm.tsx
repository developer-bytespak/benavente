'use client'

import { useFormState } from 'react-dom'
import Field from '@/components/admin/ui/Field'
import FormCard from '@/components/admin/ui/FormCard'
import SaveButton from '@/components/admin/ui/SaveButton'
import SaveStatus, { type ActionState } from '@/components/admin/ui/SaveStatus'
import ImageDropzone from '@/components/admin/ui/ImageDropzone'
import { updateSiteSettings } from '@/app/admin/_actions/site-settings'
import type { SiteSettingsRow } from '@/lib/supabase/types'

interface Props {
  initial: SiteSettingsRow | null
}

export default function SiteSettingsForm({ initial }: Props) {
  const [state, formAction] = useFormState<ActionState, FormData>(updateSiteSettings, null)

  return (
    <form action={formAction} className="space-y-5 max-w-[760px]">
      <FormCard title="Branding" description="Visible across the entire website">
        <ImageDropzone
          name="logo_url"
          bucket="site"
          prefix="logo"
          defaultUrl={initial?.logo_url ?? ''}
          label="Logo"
          aspect="square"
          hint="Shown in the navbar, footer, and admin sidebar. PNG with transparent background recommended."
        />
      </FormCard>

      <FormCard title="Footer" description="Shown at the bottom of every page">
        <Field
          name="footer_text"
          label="Footer description"
          type="textarea"
          rows={3}
          defaultValue={initial?.footer_text ?? ''}
          hint="Short tagline shown beneath the logo in the footer."
        />
        <Field
          name="copyright_text"
          label="Copyright"
          defaultValue={initial?.copyright_text ?? ''}
          placeholder="© 2026 The Benavente Group LLC. All Rights Reserved."
        />
      </FormCard>

      <div className="flex items-center gap-4">
        <SaveButton />
        <SaveStatus state={state} />
      </div>
    </form>
  )
}

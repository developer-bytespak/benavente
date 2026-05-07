'use client'

import { useFormState } from 'react-dom'
import Field from '@/components/admin/ui/Field'
import FormCard from '@/components/admin/ui/FormCard'
import SaveButton from '@/components/admin/ui/SaveButton'
import SaveStatus, { type ActionState } from '@/components/admin/ui/SaveStatus'
import { updateContactInfo } from '@/app/admin/_actions/contact-info'
import type { ContactInfoRow } from '@/lib/supabase/types'

interface Props {
  initial: ContactInfoRow | null
}

export default function ContactInfoForm({ initial }: Props) {
  const [state, formAction] = useFormState<ActionState, FormData>(updateContactInfo, null)

  const regionsAsText = (initial?.service_regions ?? []).join('\n')

  return (
    <form action={formAction} className="space-y-5 max-w-[760px]">
      <FormCard title="Office" description="Shown on the Contact page and in the footer">
        <Field
          name="address"
          label="Address"
          type="textarea"
          rows={2}
          defaultValue={initial?.address ?? ''}
          placeholder="Pauahi Tower, Suite 2140, 1003 Bishop Street, Honolulu, HI 96813"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            name="phone"
            label="Phone"
            type="tel"
            defaultValue={initial?.phone ?? ''}
            placeholder="(808) 784-4320"
          />
          <Field
            name="email"
            label="Email"
            type="email"
            defaultValue={initial?.email ?? ''}
            placeholder="Mail@BenaventeGroup.com"
          />
        </div>
        <Field
          name="hours"
          label="Office hours"
          defaultValue={initial?.hours ?? ''}
          placeholder="Monday – Friday, 8:00 AM – 5:00 PM HST"
        />
      </FormCard>

      <FormCard title="Service Regions" description="Listed in the footer and contact page">
        <Field
          name="service_regions"
          label="Regions (one per line)"
          type="textarea"
          rows={6}
          defaultValue={regionsAsText}
          hint="Each line becomes a separate region label. Order is preserved."
        />
      </FormCard>

      <FormCard title="Map" description="Google Maps embed for the contact page">
        <Field
          name="map_embed_url"
          label="Map embed URL"
          type="url"
          defaultValue={initial?.map_embed_url ?? ''}
          placeholder="https://www.google.com/maps?q=..."
          hint="Use the embed URL from Google Maps → Share → Embed a map → src attribute."
        />
      </FormCard>

      <div className="flex items-center gap-4">
        <SaveButton />
        <SaveStatus state={state} />
      </div>
    </form>
  )
}

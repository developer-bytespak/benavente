'use client'

import { useFormState } from 'react-dom'
import Field from '@/components/admin/ui/Field'
import FormCard from '@/components/admin/ui/FormCard'
import SaveButton from '@/components/admin/ui/SaveButton'
import SaveStatus, { type ActionState } from '@/components/admin/ui/SaveStatus'
import ImageDropzone from '@/components/admin/ui/ImageDropzone'
import MultiImageDropzone from '@/components/admin/ui/MultiImageDropzone'
import { createRegion, updateRegion } from '@/app/admin/_actions/regions'
import type { RegionRow } from '@/lib/supabase/types'

interface Props {
  region?: RegionRow
}

export default function RegionForm({ region }: Props) {
  const action = region ? updateRegion.bind(null, region.id) : createRegion
  const [state, formAction] = useFormState<ActionState, FormData>(action, null)

  return (
    <form action={formAction} className="space-y-5 max-w-[860px]">
      <FormCard title="Basics">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4">
          <Field
            name="name"
            label="Region name"
            required
            defaultValue={region?.name ?? ''}
            placeholder="Maui County"
          />
          <Field
            name="sort_order"
            label="Sort order"
            type="number"
            defaultValue={region ? String(region.sort_order) : '0'}
            hint="Lower first"
          />
        </div>
        <Field
          name="note"
          label="Note / subtitle"
          defaultValue={region?.note ?? ''}
          placeholder="Kahului, Wailea & resort corridors"
        />
      </FormCard>

      <FormCard title="Hero Image" description="Tile image shown on the About page Coverage section">
        <ImageDropzone
          name="hero_image_url"
          bucket="regions"
          prefix="hero"
          defaultUrl={region?.hero_image_url ?? ''}
          label="Hero image"
          aspect="landscape"
        />
      </FormCard>

      <FormCard
        title="Photo Gallery (B-Roll)"
        description="Images shown when a visitor clicks the region tile"
      >
        <MultiImageDropzone
          name="broll_images"
          bucket="regions"
          prefix="broll"
          defaultUrls={region?.broll_images ?? []}
          label="Gallery images"
          hint="Upload as many as you like. Drag the order with the arrows."
        />
      </FormCard>

      <div className="flex items-center gap-4">
        <SaveButton>{region ? 'Save Changes' : 'Create Region'}</SaveButton>
        <SaveStatus state={state} />
      </div>
    </form>
  )
}

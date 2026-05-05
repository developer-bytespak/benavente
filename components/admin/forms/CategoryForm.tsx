'use client'

import { useFormState } from 'react-dom'
import Field from '@/components/admin/ui/Field'
import FormCard from '@/components/admin/ui/FormCard'
import SaveButton from '@/components/admin/ui/SaveButton'
import SaveStatus, { type ActionState } from '@/components/admin/ui/SaveStatus'
import { createCategory, updateCategory } from '@/app/admin/_actions/gallery'
import type { GalleryCategoryRow } from '@/lib/supabase/types'

interface Props {
  category?: GalleryCategoryRow
}

export default function CategoryForm({ category }: Props) {
  const action = category ? updateCategory.bind(null, category.id) : createCategory
  const [state, formAction] = useFormState<ActionState, FormData>(action, null)

  return (
    <form action={formAction} className="space-y-5 max-w-[640px]">
      <FormCard title="Category">
        <Field
          name="label"
          label="Display label"
          required
          defaultValue={category?.label ?? ''}
          placeholder="Hotel & Hospitality"
        />
        <Field
          name="slug"
          label="URL slug"
          defaultValue={category?.slug ?? ''}
          placeholder="hotel-hospitality"
          hint="Auto-generated from the label if blank. Used in /gallery?cat=…"
        />
        <Field
          name="sort_order"
          label="Sort order"
          type="number"
          defaultValue={category ? String(category.sort_order) : '0'}
          hint="Lower first"
        />
      </FormCard>

      <div className="flex items-center gap-4">
        <SaveButton>{category ? 'Save Category' : 'Create Category'}</SaveButton>
        <SaveStatus state={state} />
      </div>
    </form>
  )
}

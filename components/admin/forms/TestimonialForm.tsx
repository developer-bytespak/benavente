'use client'

import { useFormState } from 'react-dom'
import Field from '@/components/admin/ui/Field'
import FormCard from '@/components/admin/ui/FormCard'
import SaveButton from '@/components/admin/ui/SaveButton'
import SaveStatus, { type ActionState } from '@/components/admin/ui/SaveStatus'
import { createTestimonial, updateTestimonial } from '@/app/admin/_actions/testimonials'
import type { TestimonialRow } from '@/lib/supabase/types'

interface Props {
  testimonial?: TestimonialRow
}

export default function TestimonialForm({ testimonial }: Props) {
  const action = testimonial
    ? updateTestimonial.bind(null, testimonial.id)
    : createTestimonial
  const [state, formAction] = useFormState<ActionState, FormData>(action, null)

  return (
    <form action={formAction} className="space-y-5 max-w-[760px]">
      <FormCard title="Quote">
        <Field
          name="quote"
          label="Testimonial text"
          type="textarea"
          rows={6}
          required
          defaultValue={testimonial?.quote ?? ''}
          placeholder="It's a pleasure working with you and your team…"
        />
      </FormCard>

      <FormCard title="Attribution (optional)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            name="author"
            label="Author"
            defaultValue={testimonial?.author ?? ''}
            placeholder="Sarah Chen"
          />
          <Field
            name="company"
            label="Company / role"
            defaultValue={testimonial?.company ?? ''}
            placeholder="Pacific Holdings"
          />
        </div>
      </FormCard>

      <FormCard title="Display">
        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 items-end">
          <Field
            name="sort_order"
            label="Sort order"
            type="number"
            defaultValue={testimonial ? String(testimonial.sort_order) : '0'}
            hint="Lower first"
          />
          <label className="inline-flex items-center gap-2 cursor-pointer select-none pb-2.5">
            <input
              type="checkbox"
              name="visible"
              defaultChecked={testimonial?.visible ?? true}
              className="w-4 h-4 accent-gold"
            />
            <span className="text-navy text-[13px] font-serif">
              Visible in the homepage testimonial slider
            </span>
          </label>
        </div>
      </FormCard>

      <div className="flex items-center gap-4">
        <SaveButton>{testimonial ? 'Save Changes' : 'Create Testimonial'}</SaveButton>
        <SaveStatus state={state} />
      </div>
    </form>
  )
}

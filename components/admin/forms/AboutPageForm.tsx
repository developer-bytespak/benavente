'use client'

import { useFormState } from 'react-dom'
import Field from '@/components/admin/ui/Field'
import FormCard from '@/components/admin/ui/FormCard'
import SaveButton from '@/components/admin/ui/SaveButton'
import SaveStatus, { type ActionState } from '@/components/admin/ui/SaveStatus'
import ImageDropzone from '@/components/admin/ui/ImageDropzone'
import { updateAboutPage } from '@/app/admin/_actions/about'
import type { AboutPageRow } from '@/lib/supabase/types'

const STORY_STAT_SLOTS = 3
const VALUE_SLOTS = 4

interface Props {
  initial: AboutPageRow | null
}

export default function AboutPageForm({ initial }: Props) {
  const [state, formAction] = useFormState<ActionState, FormData>(updateAboutPage, null)

  return (
    <form action={formAction} className="space-y-5 max-w-[860px]">
      <FormCard title="Page Banner" description="Aerial photo at the top of the About page">
        <ImageDropzone
          name="banner_url"
          bucket="banners"
          prefix="about"
          defaultUrl={initial?.banner_url ?? ''}
          label="Banner image"
          aspect="landscape"
          hint="Aerial / wide-format photo. Recommended ~1920×1080 or larger."
        />
        <Field
          name="hero_headline"
          label="Hero headline"
          type="textarea"
          rows={3}
          defaultValue={initial?.hero_headline ?? ''}
          placeholder="Experts Rooted in&#10;_Hawai'i & the Pacific_"
          hint="Press Enter for a line break. Wrap a word in _underscores_ for the italic gold accent."
        />
        <Field
          name="hero_subtitle"
          label="Hero subtitle"
          type="textarea"
          rows={3}
          defaultValue={initial?.hero_subtitle ?? ''}
          placeholder="A team of credentialed professionals…"
        />
      </FormCard>

      <FormCard title="Our Story" description='Section beneath the banner ("Built on Integrity…")'>
        <Field
          name="story_heading"
          label="Heading"
          type="textarea"
          rows={3}
          defaultValue={initial?.story_heading ?? ''}
          placeholder="Built on Integrity,&#10;_Driven by Expertise_"
          hint="Same conventions as the hero headline above."
        />
        <Field
          name="story_paragraphs"
          label="Body paragraphs"
          type="textarea"
          rows={8}
          defaultValue={(initial?.story_paragraphs ?? []).join('\n\n')}
          hint="Separate paragraphs with a blank line."
        />
        <div className="space-y-3">
          <p className="text-navy text-[11px] tracking-[0.18em] uppercase font-serif font-medium">
            Story stats (3 slots)
          </p>
          {Array.from({ length: STORY_STAT_SLOTS }).map((_, i) => {
            const stat = initial?.story_stats?.[i]
            return (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[1fr_120px_120px] gap-3"
              >
                <Field
                  name={`story_stats_label_${i}`}
                  label={`Stat ${i + 1} label`}
                  defaultValue={stat?.label ?? ''}
                  placeholder="Yrs. Experience"
                />
                <Field
                  name={`story_stats_number_${i}`}
                  label="Number"
                  type="number"
                  defaultValue={stat?.number !== undefined ? String(stat.number) : ''}
                />
                <Field
                  name={`story_stats_suffix_${i}`}
                  label="Suffix"
                  defaultValue={stat?.suffix ?? ''}
                  placeholder="+"
                />
              </div>
            )
          })}
        </div>
      </FormCard>

      <FormCard title="Mission" description="Statement and core values">
        <Field
          name="mission_headline"
          label="Mission headline"
          type="textarea"
          rows={3}
          defaultValue={initial?.mission_headline ?? ''}
          placeholder="Credible Solutions.&#10;Timely Results."
          hint="Press Enter for a line break. The whole heading already renders italic, so no underscore needed."
        />
        <Field
          name="mission_text"
          label="Mission supporting text (optional)"
          type="textarea"
          rows={3}
          defaultValue={initial?.mission_text ?? ''}
        />
        <div className="space-y-3 pt-2">
          <p className="text-navy text-[11px] tracking-[0.18em] uppercase font-serif font-medium">
            Core values (4 slots)
          </p>
          {Array.from({ length: VALUE_SLOTS }).map((_, i) => {
            const value = initial?.core_values?.[i]
            return (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-3 p-3 bg-cream/40 rounded-[3px] border border-gold/10"
              >
                <Field
                  name={`values_number_${i}`}
                  label="Num"
                  defaultValue={value?.number ?? String(i + 1).padStart(2, '0')}
                  placeholder="01"
                />
                <div className="space-y-3">
                  <Field
                    name={`values_name_${i}`}
                    label={`Value ${i + 1} name`}
                    defaultValue={value?.name ?? ''}
                    placeholder="Accuracy"
                  />
                  <Field
                    name={`values_desc_${i}`}
                    label="Description"
                    type="textarea"
                    rows={2}
                    defaultValue={value?.desc ?? ''}
                    placeholder="Every valuation is grounded in rigorous analysis…"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </FormCard>

      <div className="flex items-center gap-4">
        <SaveButton />
        <SaveStatus state={state} />
      </div>
    </form>
  )
}

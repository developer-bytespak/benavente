'use client'

import { useFormState } from 'react-dom'
import Field from '@/components/admin/ui/Field'
import FormCard from '@/components/admin/ui/FormCard'
import SaveButton from '@/components/admin/ui/SaveButton'
import SaveStatus, { type ActionState } from '@/components/admin/ui/SaveStatus'
import VideoDropzone from '@/components/admin/ui/VideoDropzone'
import { updateHomePage } from '@/app/admin/_actions/home'
import type { HomePageRow } from '@/lib/supabase/types'

const STAT_SLOTS = 4

interface Props {
  initial: HomePageRow | null
}

export default function HomePageForm({ initial }: Props) {
  const [state, formAction] = useFormState<ActionState, FormData>(updateHomePage, null)

  return (
    <form action={formAction} className="space-y-5 max-w-[860px]">
      <FormCard title="Hero" description="Top of the homepage">
        <Field
          name="hero_headline"
          label="Headline"
          defaultValue={initial?.hero_headline ?? ''}
          placeholder="Real Estate _Valuation_&#10;& Consultancy"
          hint="Press Enter for a line break. Wrap a word in _underscores_ for the italic blue accent — e.g. Real Estate _Valuation_ & Consultancy."
          type="textarea"
          rows={3}
        />
        <Field
          name="hero_subhead"
          label="Subhead (optional)"
          defaultValue={initial?.hero_subhead ?? ''}
          placeholder="One sentence shown below the headline"
        />
        <VideoDropzone
          name="hero_video_urls"
          defaultUrls={initial?.hero_video_urls ?? []}
          label="Background videos"
          hint="Drop in .mp4 or .mov files. Cloudinary handles compression and CDN delivery. Videos cycle every ~5 seconds in the order shown — drag the arrows to reorder."
        />
      </FormCard>

      <FormCard title="Services Ticker" description="The animated services bar beneath the hero">
        <Field
          name="ticker_items"
          label="Items"
          type="textarea"
          rows={6}
          defaultValue={(initial?.ticker_items ?? []).join('\n')}
          hint="One service name per line. Order is preserved."
        />
      </FormCard>

      <FormCard title="About the Firm" description='Intro section ("A Trusted Name in Pacific Real Estate")'>
        <Field
          name="intro_heading"
          label="Heading"
          defaultValue={initial?.intro_heading ?? ''}
          placeholder="A Trusted Name in Pacific Real Estate"
        />
        <Field
          name="intro_paragraphs"
          label="Body paragraphs"
          type="textarea"
          rows={8}
          defaultValue={(initial?.intro_paragraphs ?? []).join('\n\n')}
          hint="Separate paragraphs with a blank line."
        />
      </FormCard>

      <FormCard title="Statistics" description="Up to 4 counters used on the homepage and intro section">
        <div className="space-y-4">
          {Array.from({ length: STAT_SLOTS }).map((_, i) => {
            const stat = initial?.stats?.[i]
            return (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[1fr_120px_120px] gap-3"
              >
                <Field
                  name={`stats_label_${i}`}
                  label={`Stat ${i + 1} label`}
                  defaultValue={stat?.label ?? ''}
                  placeholder={i === 0 ? 'Years Combined Experience' : ''}
                />
                <Field
                  name={`stats_number_${i}`}
                  label="Number"
                  type="number"
                  defaultValue={stat?.number !== undefined ? String(stat.number) : ''}
                />
                <Field
                  name={`stats_suffix_${i}`}
                  label="Suffix"
                  defaultValue={stat?.suffix ?? ''}
                  placeholder="+"
                />
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

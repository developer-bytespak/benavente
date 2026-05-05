'use client'

import { useFormState } from 'react-dom'
import Field from '@/components/admin/ui/Field'
import FormCard from '@/components/admin/ui/FormCard'
import SaveButton from '@/components/admin/ui/SaveButton'
import SaveStatus, { type ActionState } from '@/components/admin/ui/SaveStatus'
import ImageDropzone from '@/components/admin/ui/ImageDropzone'
import FileDropzone from '@/components/admin/ui/FileDropzone'
import { createTeamMember, updateTeamMember } from '@/app/admin/_actions/team'
import type { TeamMemberRow } from '@/lib/supabase/types'

interface Props {
  member?: TeamMemberRow
}

export default function TeamMemberForm({ member }: Props) {
  const action = member
    ? updateTeamMember.bind(null, member.id)
    : createTeamMember
  const [state, formAction] = useFormState<ActionState, FormData>(action, null)

  return (
    <form action={formAction} className="space-y-5 max-w-[820px]">
      <FormCard title="Basics" description="Name, role, and visibility">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4">
          <Field
            name="name"
            label="Full name"
            required
            defaultValue={member?.name ?? ''}
            placeholder="Fernando Benavente, MAI, SRA"
          />
          <Field
            name="sort_order"
            label="Sort order"
            type="number"
            defaultValue={member ? String(member.sort_order) : '0'}
            hint="Lower first"
          />
        </div>
        <Field
          name="role"
          label="Role / title"
          required
          defaultValue={member?.role ?? ''}
          placeholder="Manager"
        />
        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            name="visible"
            defaultChecked={member?.visible ?? true}
            className="w-4 h-4 accent-gold"
          />
          <span className="text-navy text-[13px] font-serif">Visible on the public About page</span>
        </label>
      </FormCard>

      <FormCard title="Photo">
        <ImageDropzone
          name="photo_url"
          bucket="team"
          prefix="team"
          defaultUrl={member?.photo_url ?? ''}
          label="Headshot"
          aspect="square"
          hint="A square image works best. Will be cropped to a circle on the public site."
        />
      </FormCard>

      <FormCard title="CV (optional)" description="PDF visitors can download from the team grid">
        <FileDropzone
          urlName="cv_url"
          filenameName="cv_filename"
          bucket="cv"
          prefix="cv"
          defaultUrl={member?.cv_url ?? ''}
          defaultFilename={member?.cv_filename ?? ''}
          label="CV file (PDF)"
          accept="application/pdf"
          hint="The filename below is what visitors get when downloading."
        />
      </FormCard>

      <div className="flex items-center gap-4">
        <SaveButton>{member ? 'Save Changes' : 'Create Member'}</SaveButton>
        <SaveStatus state={state} />
      </div>
    </form>
  )
}

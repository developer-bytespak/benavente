import Image from 'next/image'
import Link from 'next/link'
import Icon from '@/components/admin/ui/Icon'
import DeleteButton from '@/components/admin/ui/DeleteButton'
import { deleteTeamMember, toggleTeamVisibility } from '@/app/admin/_actions/team'
import type { TeamMemberRow } from '@/lib/supabase/types'

interface Props {
  members: TeamMemberRow[]
}

export default function TeamList({ members }: Props) {
  if (members.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gold/30 rounded-[4px] p-10 text-center">
        <span className="inline-flex w-12 h-12 rounded-full bg-gold/10 text-gold-dark items-center justify-center">
          <Icon name="team" className="w-6 h-6" />
        </span>
        <h3 className="font-serif text-[18px] text-navy mt-3">No team members yet</h3>
        <p className="text-slate text-[13px] font-serif mt-1.5">
          Click <span className="text-navy">Add Member</span> to add the first one.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((m) => (
        <div
          key={m.id}
          className="group bg-white border border-gold/15 rounded-[4px] overflow-hidden hover:border-gold/40 hover:shadow-md hover:shadow-navy/5 transition-all"
        >
          <div className="relative aspect-[4/3] bg-cream-deeper">
            {m.photo_url ? (
              <Image
                src={m.photo_url}
                alt={m.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-light/40">
                <Icon name="team" className="w-10 h-10" />
              </div>
            )}
            <span
              className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] text-[10px] font-serif font-medium tracking-[0.05em] uppercase ${
                m.visible
                  ? 'bg-emerald-100/95 text-emerald-700'
                  : 'bg-slate-200/95 text-slate-700'
              }`}
            >
              <span className={`w-1 h-1 rounded-full ${m.visible ? 'bg-emerald-700' : 'bg-slate-700'}`} />
              {m.visible ? 'Visible' : 'Hidden'}
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-serif text-[16px] text-navy leading-tight">{m.name}</h3>
            <p className="text-slate text-[12px] tracking-[0.05em] uppercase font-serif mt-1">{m.role}</p>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gold/10 text-[11px] font-serif text-slate">
              <span className="inline-flex items-center gap-1">
                <Icon name="image" className="w-3.5 h-3.5 text-gold" />
                {m.photo_url ? 'Photo' : 'No photo'}
              </span>
              <span className="text-slate-light/40">·</span>
              <span className="inline-flex items-center gap-1">
                <Icon name="fileText" className="w-3.5 h-3.5 text-gold" />
                {m.cv_url ? 'CV' : 'No CV'}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Link
                href={`/admin/team/${m.id}`}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy text-[11px] font-serif font-medium tracking-[0.12em] uppercase"
              >
                <Icon name="edit" className="w-[13px] h-[13px]" />
                Edit
              </Link>
              <form action={toggleTeamVisibility.bind(null, m.id)}>
                <button
                  type="submit"
                  title={m.visible ? 'Hide from public' : 'Show on public site'}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy"
                >
                  <Icon name={m.visible ? 'eye' : 'eyeOff'} className="w-[14px] h-[14px]" />
                </button>
              </form>
              <DeleteButton
                action={deleteTeamMember.bind(null, m.id)}
                message={`Delete "${m.name}"? This will also remove their photo and CV.`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-[3px] text-slate hover:text-red-600 hover:bg-red-50 transition-colors"
                formClassName="ml-auto"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

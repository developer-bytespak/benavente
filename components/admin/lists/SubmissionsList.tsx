import Icon from '@/components/admin/ui/Icon'
import DeleteButton from '@/components/admin/ui/DeleteButton'
import { toggleRead, deleteSubmission } from '@/app/admin/_actions/submissions'
import type { ContactSubmissionRow } from '@/lib/supabase/types'

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

interface Props {
  submissions: ContactSubmissionRow[]
}

export default function SubmissionsList({ submissions }: Props) {
  if (submissions.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gold/30 rounded-[4px] p-10 text-center">
        <span className="inline-flex w-12 h-12 rounded-full bg-gold/10 text-gold-dark items-center justify-center">
          <Icon name="inbox" className="w-6 h-6" />
        </span>
        <h3 className="font-serif text-[18px] text-navy mt-3">No submissions yet</h3>
        <p className="text-slate text-[13px] font-serif mt-1.5">
          Inquiries from the contact form will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
      <ul className="divide-y divide-gold/10">
        {submissions.map((s) => (
          <li
            key={s.id}
            className={`px-5 py-5 flex items-start gap-4 ${s.read ? '' : 'bg-gold/5'}`}
          >
            <span
              className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                s.read ? 'bg-slate-light/50' : 'bg-gold'
              }`}
              title={s.read ? 'Read' : 'Unread'}
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <p className="font-serif text-[15px] text-navy font-medium">{s.name}</p>
                <a
                  href={`mailto:${s.email}`}
                  className="text-slate text-[13px] font-serif hover:text-gold-dark"
                >
                  {s.email}
                </a>
                <span className="text-slate-light text-[12px] font-serif tabular-nums ml-auto">
                  {formatWhen(s.submitted_at)}
                </span>
              </div>
              <p className="text-slate text-[13.5px] font-serif mt-2 leading-relaxed whitespace-pre-line">
                {s.message}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-1">
              <form action={toggleRead.bind(null, s.id)}>
                <button
                  type="submit"
                  title={s.read ? 'Mark as unread' : 'Mark as read'}
                  className="w-9 h-9 flex items-center justify-center rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy"
                >
                  <Icon name={s.read ? 'eyeOff' : 'check'} className="w-[14px] h-[14px]" />
                </button>
              </form>
              <DeleteButton
                action={deleteSubmission.bind(null, s.id)}
                message="Delete this submission?"
                className="w-9 h-9 flex items-center justify-center rounded-[3px] text-slate hover:text-red-600 hover:bg-red-50"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

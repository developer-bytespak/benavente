import Icon from '@/components/admin/ui/Icon'
import DeleteButton from '@/components/admin/ui/DeleteButton'
import { toggleRead, deleteSubmission } from '@/app/admin/_actions/submissions'
import { serviceLabel, detailLabel, parseServiceMarker, serviceForms } from '@/lib/serviceForms'
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

// Service slug for a submission: the 0007 `service` column, or the marker line
// written into the message before that migration ran.
export function submissionService(s: ContactSubmissionRow): string | null {
  return s.service ?? parseServiceMarker(s.message).service
}

function formatDetail(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : value
}

interface Props {
  submissions: ContactSubmissionRow[]
  filtered?: boolean
}

export default function SubmissionsList({ submissions, filtered = false }: Props) {
  if (submissions.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gold/30 rounded-[4px] p-10 text-center">
        <span className="inline-flex w-12 h-12 rounded-full bg-gold/10 text-gold-dark items-center justify-center">
          <Icon name="inbox" className="w-6 h-6" />
        </span>
        <h3 className="font-serif text-[18px] text-navy mt-3">
          {filtered ? 'No submissions for this service' : 'No submissions yet'}
        </h3>
        <p className="text-slate text-[13px] font-serif mt-1.5">
          Inquiries from the contact form and service pages will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
      <ul className="divide-y divide-gold/10">
        {submissions.map((s) => {
          const service = submissionService(s)
          const message = parseServiceMarker(s.message).message
          const details = Object.entries(s.details ?? {})
          const propertyLabel = (service && serviceForms[service]?.propertyLabel) || 'Property'

          return (
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
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-serif text-[15px] text-navy font-medium">{s.name}</p>
                  <a
                    href={`mailto:${s.email}`}
                    className="text-slate text-[13px] font-serif hover:text-gold-dark"
                  >
                    {s.email}
                  </a>
                  {s.phone && (
                    <a
                      href={`tel:${s.phone.replace(/[^+\d]/g, '')}`}
                      className="text-slate text-[13px] font-serif hover:text-gold-dark"
                    >
                      {s.phone}
                    </a>
                  )}
                  <span className="text-slate-light text-[12px] font-serif tabular-nums ml-auto">
                    {formatWhen(s.submitted_at)}
                  </span>
                </div>

                <span
                  className={`inline-block mt-2 px-2.5 py-1 rounded-[3px] text-[11px] tracking-[0.12em] uppercase font-serif font-medium ${
                    service ? 'bg-navy text-gold-light' : 'bg-cream text-slate border border-gold/20'
                  }`}
                >
                  {serviceLabel(service)}
                </span>

                {(s.company || s.property || details.length > 0) && (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-3 bg-cream/50 border border-gold/10 rounded-[3px] px-4 py-3">
                    {s.company && (
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.14em] text-slate-light font-serif">Company</dt>
                        <dd className="text-navy text-[13.5px] font-serif">{s.company}</dd>
                      </div>
                    )}
                    {s.property && (
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.14em] text-slate-light font-serif">{propertyLabel}</dt>
                        <dd className="text-navy text-[13.5px] font-serif">{s.property}</dd>
                      </div>
                    )}
                    {details.map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-[11px] uppercase tracking-[0.14em] text-slate-light font-serif">
                          {detailLabel(service, key)}
                        </dt>
                        <dd className="text-navy text-[13.5px] font-serif">{formatDetail(String(value))}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {message && (
                  <p className="text-slate text-[13.5px] font-serif mt-3 leading-relaxed whitespace-pre-line">
                    {message}
                  </p>
                )}
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
          )
        })}
      </ul>
    </div>
  )
}

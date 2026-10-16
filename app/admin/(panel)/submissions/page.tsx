import Link from 'next/link'
import Topbar from '@/components/admin/shell/Topbar'
import SubmissionsList, { submissionService } from '@/components/admin/lists/SubmissionsList'
import Icon from '@/components/admin/ui/Icon'
import { getSubmissions } from '@/lib/cms/submissions'
import { markAllRead } from '@/app/admin/_actions/submissions'
import { serviceForms } from '@/lib/serviceForms'

export const dynamic = 'force-dynamic'

// `general` = contact page form (no service).
const GENERAL = 'general'

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: { service?: string }
}) {
  const submissions = await getSubmissions()
  const unread = submissions.filter((s) => !s.read).length

  const keyOf = (s: (typeof submissions)[number]) => submissionService(s) ?? GENERAL
  const counts = new Map<string, number>()
  for (const s of submissions) counts.set(keyOf(s), (counts.get(keyOf(s)) ?? 0) + 1)

  const active = searchParams.service ?? null
  const visible = active ? submissions.filter((s) => keyOf(s) === active) : submissions

  const filters = [
    { key: null, label: 'All', count: submissions.length },
    ...Object.entries(serviceForms).map(([slug, config]) => ({
      key: slug,
      label: config.label,
      count: counts.get(slug) ?? 0,
    })),
    { key: GENERAL, label: 'General inquiry', count: counts.get(GENERAL) ?? 0 },
  ]

  const actions =
    unread > 0 ? (
      <form action={markAllRead}>
        <button
          type="submit"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy text-[12px] font-serif font-medium tracking-[0.14em] uppercase"
        >
          <Icon name="check" className="w-[14px] h-[14px]" />
          Mark all read
        </button>
      </form>
    ) : null

  return (
    <>
      <Topbar
        title="Submissions"
        subtitle={`${submissions.length} total · ${unread} unread`}
        actions={actions}
      />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <nav aria-label="Filter by service" className="flex flex-wrap gap-2 mb-5">
          {filters.map((f) => {
            const isActive = f.key === active
            return (
              <Link
                key={f.key ?? 'all'}
                href={f.key ? `/admin/submissions?service=${f.key}` : '/admin/submissions'}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex items-center gap-2 h-9 px-3.5 rounded-[3px] border text-[12px] font-serif tracking-[0.06em] transition-colors ${
                  isActive
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-navy border-gold/20 hover:border-gold/50'
                }`}
              >
                {f.label}
                <span
                  className={`tabular-nums text-[11px] ${isActive ? 'text-gold-light' : 'text-slate-light'}`}
                >
                  {f.count}
                </span>
              </Link>
            )
          })}
        </nav>
        <SubmissionsList submissions={visible} filtered={Boolean(active)} />
      </main>
    </>
  )
}

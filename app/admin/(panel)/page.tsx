import Link from 'next/link'
import Topbar from '@/components/admin/shell/Topbar'
import MetricCard from '@/components/admin/ui/MetricCard'
import Icon, { type IconName } from '@/components/admin/ui/Icon'
import { supabaseServer } from '@/lib/supabase/server'
import { sanityClient } from '@/lib/sanity/client'
import type { ContactSubmissionRow } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

async function getMetrics() {
  const [team, gallery, testimonials, unread, total] = await Promise.all([
    supabaseServer.from('team_members').select('*', { count: 'exact', head: true }),
    supabaseServer.from('gallery_images').select('*', { count: 'exact', head: true }),
    supabaseServer.from('testimonials').select('*', { count: 'exact', head: true }),
    supabaseServer
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('read', false),
    supabaseServer.from('contact_submissions').select('*', { count: 'exact', head: true }),
  ])

  let blogCount = 0
  try {
    blogCount = (await sanityClient.fetch<number>('count(*[_type=="post"])')) ?? 0
  } catch {
    // Sanity may be unreachable in offline dev — show 0 instead of crashing the dashboard.
  }

  return {
    team: team.count ?? 0,
    gallery: gallery.count ?? 0,
    testimonials: testimonials.count ?? 0,
    unread: unread.count ?? 0,
    total: total.count ?? 0,
    blog: blogCount,
  }
}

async function getRecentSubmissions(): Promise<ContactSubmissionRow[]> {
  const { data } = await supabaseServer
    .from('contact_submissions')
    .select('*')
    .order('submitted_at', { ascending: false })
    .limit(5)
    .returns<ContactSubmissionRow[]>()
  return data ?? []
}

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default async function DashboardPage() {
  const [m, recent] = await Promise.all([getMetrics(), getRecentSubmissions()])

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="Overview of your website content and inquiries"
      />
      <main className="flex-1 px-5 lg:px-9 py-7 space-y-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <MetricCard label="Team Members" value={m.team} icon="team" hint="Visible on About page" />
          <MetricCard label="Gallery Images" value={m.gallery} icon="gallery" hint="Across all categories" />
          <MetricCard label="Testimonials" value={m.testimonials} icon="testimonials" hint="Shown on Home" />
          <MetricCard label="Blog Posts" value={m.blog} icon="blog" hint="Managed in Studio" />
          <MetricCard
            label="Unread Submissions"
            value={m.unread}
            icon="inbox"
            hint={`${m.total} total received`}
          />
        </div>

        <section className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
            <div>
              <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
                Inbox
              </p>
              <h2 className="font-serif text-[18px] text-navy leading-tight mt-0.5">
                Recent Submissions
              </h2>
            </div>
            <Link
              href="/admin/submissions"
              className="text-[12px] tracking-[0.14em] uppercase font-serif font-medium text-gold-dark hover:text-gold"
            >
              View all &rarr;
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="px-5 py-10 text-center text-slate text-[14px] font-serif">
              No submissions yet.
            </p>
          ) : (
            <ul className="divide-y divide-gold/10">
              {recent.map((s) => (
                <li key={s.id} className="px-5 py-4 flex items-start gap-4">
                  <span
                    className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                      s.read ? 'bg-slate-light/50' : 'bg-gold'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-serif text-[14px] text-navy font-medium">{s.name}</p>
                      <span className="text-slate-light text-[12px] font-serif">&middot;</span>
                      <a
                        href={`mailto:${s.email}`}
                        className="text-slate text-[13px] font-serif hover:text-gold-dark truncate"
                      >
                        {s.email}
                      </a>
                    </div>
                    <p className="text-slate text-[13px] font-serif mt-0.5 line-clamp-2">
                      {s.message}
                    </p>
                  </div>
                  <span className="text-slate-light text-[12px] font-serif shrink-0 tabular-nums">
                    {formatWhen(s.submitted_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="font-serif text-[16px] text-navy mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickLink href="/admin/team" label="Add team member" icon="team" />
            <QuickLink href="/admin/gallery" label="Upload gallery photos" icon="upload" />
            <QuickLink href="/admin/testimonials" label="Add testimonial" icon="testimonials" />
            <QuickLink href="/studio" label="Open blog studio" icon="external" external />
          </div>
        </section>
      </main>
    </>
  )
}

function QuickLink({
  href,
  label,
  icon,
  external = false,
}: {
  href: string
  label: string
  icon: IconName
  external?: boolean
}) {
  const linkProps = external ? { target: '_blank', rel: 'noreferrer' } : {}
  return (
    <Link
      href={href}
      {...linkProps}
      className="bg-white border border-gold/15 rounded-[3px] p-4 flex items-center gap-3 hover:border-gold/40 hover:shadow-sm transition"
    >
      <span className="w-9 h-9 rounded-full bg-gold/10 text-gold-dark flex items-center justify-center shrink-0">
        <Icon name={icon} className="w-[18px] h-[18px]" />
      </span>
      <span className="font-serif text-[14px] text-navy flex-1">{label}</span>
      <Icon name="chevronRight" className="w-4 h-4 text-slate-light" />
    </Link>
  )
}

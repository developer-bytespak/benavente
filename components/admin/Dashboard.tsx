'use client'

import CountUp from '@/components/ui/CountUp'
import Icon, { type IconName } from './Icon'
import StatusBadge from './StatusBadge'
import { useState } from 'react'
import {
  kpiData,
  trends,
  pipelineCounts,
  leadsByMonth,
  mockLeads,
  mockActivity,
  STATUS_LABEL,
  formatDate,
  relativeTime,
  workloadHeatmap,
  revenuePipeline,
  mockAssignments,
  mockComps,
} from '@/lib/admin/mockData'
import type { SectionKey } from './Sidebar'

interface Props {
  onNavigate: (key: SectionKey) => void
}

const KPI_CARDS: {
  key: keyof typeof kpiData
  trendKey: keyof typeof trends
  label: string
  icon: IconName
  suffix?: string
  accent: string
}[] = [
  { key: 'newLeadsThisMonth', trendKey: 'newLeads', label: 'New Leads · April', icon: 'leads', accent: 'text-ocean' },
  { key: 'totalLeads', trendKey: 'totalLeads', label: 'Total Leads', icon: 'sparkle', accent: 'text-gold' },
  { key: 'newsletterSubscribers', trendKey: 'subscribers', label: 'Newsletter Subscribers', icon: 'subscribers', accent: 'text-emerald-600' },
  { key: 'publishedPosts', trendKey: 'posts', label: 'Published Posts', icon: 'blog', accent: 'text-navy' },
]

const PIPELINE_DISPLAY: { status: typeof pipelineCounts[number]['status']; bar: string; ring: string }[] = [
  { status: 'new', bar: 'bg-ocean', ring: 'ring-ocean/30' },
  { status: 'contacted', bar: 'bg-gold', ring: 'ring-gold/30' },
  { status: 'qualified', bar: 'bg-emerald-500', ring: 'ring-emerald-500/30' },
  { status: 'closed-won', bar: 'bg-emerald-700', ring: 'ring-emerald-700/30' },
  { status: 'closed-lost', bar: 'bg-red-400', ring: 'ring-red-400/30' },
]

const ACTIVITY_ICON: Record<typeof mockActivity[number]['type'], IconName> = {
  lead: 'leads',
  subscriber: 'mail',
  blog: 'blog',
  team: 'team',
  gallery: 'image',
  cms: 'edit',
  status: 'check',
}

const ACTIVITY_TINT: Record<typeof mockActivity[number]['type'], string> = {
  lead: 'bg-ocean/12 text-ocean',
  subscriber: 'bg-emerald-100 text-emerald-700',
  blog: 'bg-gold/15 text-gold-dark',
  team: 'bg-navy/10 text-navy',
  gallery: 'bg-cream-deeper text-slate',
  cms: 'bg-gold/10 text-gold-dark',
  status: 'bg-emerald-50 text-emerald-700',
}

const QUICK_ACTIONS: { label: string; icon: IconName; section: SectionKey }[] = [
  { label: 'Edit Hero Section', icon: 'site', section: 'site' },
  { label: 'Add Blog Post', icon: 'plus', section: 'blog' },
  { label: 'Manage Team', icon: 'team', section: 'team' },
  { label: 'Upload to Gallery', icon: 'image', section: 'gallery' },
  { label: 'Update Services', icon: 'briefcase', section: 'services' },
  { label: 'Site SEO & Settings', icon: 'settings', section: 'settings' },
]

export default function Dashboard({ onNavigate }: Props) {
  const totalPipeline = pipelineCounts.reduce((sum, p) => sum + p.count, 0)
  const maxMonth = Math.max(...leadsByMonth.map((m) => m.count))
  const recentLeads = mockLeads.slice(0, 5)
  const totalRevenuePipeline = revenuePipeline.reduce((s, r) => s + r.value, 0)
  const [conflictQuery, setConflictQuery] = useState('')

  const conflictMatches = conflictQuery.length >= 3
    ? [
        ...mockLeads.filter((l) =>
          [l.name, l.email, l.location, l.message].some((f) => f.toLowerCase().includes(conflictQuery.toLowerCase())),
        ).map((l) => ({ kind: 'Lead', id: l.id, label: l.name, hint: `${l.service} · ${l.location}`, severity: 'low' as const })),
        ...mockAssignments.filter((a) =>
          [a.client, a.property, a.location].some((f) => f.toLowerCase().includes(conflictQuery.toLowerCase())),
        ).map((a) => ({ kind: 'Assignment', id: a.id, label: a.client, hint: `${a.property} · ${a.location}`, severity: 'high' as const })),
        ...mockComps.filter((c) =>
          [c.address, c.buyer, c.seller, c.submarket].some((f) => f.toLowerCase().includes(conflictQuery.toLowerCase())),
        ).slice(0, 5).map((c) => ({ kind: 'Comp', id: c.id, label: c.address, hint: `${c.buyer} ← ${c.seller}`, severity: 'low' as const })),
      ].slice(0, 6)
    : []

  return (
    <div className="space-y-7">
      {/* Welcome strip */}
      <section className="bg-gradient-to-br from-navy via-navy to-navy-light rounded-[4px] overflow-hidden relative border border-gold/15">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #B8935A 1px, transparent 1px), radial-gradient(circle at 70% 60%, #B8935A 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-gold/8 blur-2xl" />
        <div className="relative px-7 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-gold text-[10px] tracking-[0.32em] uppercase font-serif font-medium mb-1.5 flex items-center gap-2">
              <span className="w-5 h-px bg-gold/60" /> Welcome Back
            </p>
            <h2 className="font-serif text-[26px] text-white leading-tight">
              Good morning, <span className="italic text-gold-light">Fernando</span>
            </h2>
            <p className="text-white/55 text-[14px] mt-1.5">
              You have <span className="text-gold font-medium">8 new leads</span> awaiting review and{' '}
              <span className="text-gold font-medium">1 draft</span> ready to publish.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('leads')}
              className="px-5 h-10 rounded-[3px] bg-gold hover:bg-gold-dark text-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
            >
              Review Leads
            </button>
            <button
              type="button"
              onClick={() => onNavigate('blog')}
              className="px-5 h-10 rounded-[3px] border border-white/20 hover:bg-white/10 text-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
            >
              New Post
            </button>
          </div>
        </div>
      </section>

      {/* KPI cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_CARDS.map((card) => {
          const value = kpiData[card.key]
          const trend = trends[card.trendKey]
          const isUp = trend.direction === 'up'
          return (
            <div
              key={card.key}
              className="group bg-white border border-gold/15 rounded-[4px] p-5 relative overflow-hidden hover:shadow-md hover:shadow-navy/5 transition-all duration-300"
            >
              <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-start justify-between">
                <span className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">
                  {card.label}
                </span>
                <span className={`w-9 h-9 rounded-[3px] bg-cream flex items-center justify-center ${card.accent}`}>
                  <Icon name={card.icon} className="w-[18px] h-[18px]" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-[36px] text-navy font-light leading-none">
                  <CountUp target={value} duration={1.4} />
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-3 text-[12px] font-serif">
                <span
                  className={`inline-flex items-center gap-0.5 font-medium ${
                    isUp ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  <Icon name={isUp ? 'arrowUp' : 'arrowDown'} className="w-3 h-3" strokeWidth={2.4} />
                  {trend.value}%
                </span>
                <span className="text-slate-light">{trend.label}</span>
              </div>
            </div>
          )
        })}
      </section>

      {/* Pipeline */}
      <section className="bg-white border border-gold/15 rounded-[4px] p-6">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
          <div>
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              Sales Pipeline
            </p>
            <h3 className="font-serif text-[20px] text-navy mt-1">Lead Status Breakdown</h3>
          </div>
          <span className="text-slate text-[12px] font-serif">
            <span className="font-medium text-navy">{totalPipeline}</span> total leads tracked
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {PIPELINE_DISPLAY.map((p) => {
            const data = pipelineCounts.find((c) => c.status === p.status)!
            const pct = Math.round((data.count / totalPipeline) * 100)
            return (
              <button
                key={p.status}
                type="button"
                onClick={() => onNavigate('leads')}
                className={`text-left p-4 rounded-[3px] border border-gold/15 bg-cream/50 hover:bg-white hover:ring-2 transition-all duration-200 ${p.ring}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-2 h-2 rounded-full ${p.bar}`} />
                  <span className="text-slate-light text-[11px] font-serif tabular-nums">{pct}%</span>
                </div>
                <p className="font-serif text-[28px] text-navy font-light leading-none">
                  <CountUp target={data.count} duration={1.2} />
                </p>
                <p className="text-slate text-[11px] tracking-[0.18em] uppercase font-serif font-medium mt-2">
                  {STATUS_LABEL[p.status]}
                </p>
                <div className="mt-2.5 h-1 rounded-full bg-cream-deeper overflow-hidden">
                  <div className={`h-full ${p.bar} transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Revenue Pipeline */}
      <section className="bg-white border border-gold/15 rounded-[4px] p-6">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
          <div>
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              Revenue Forecast
            </p>
            <h3 className="font-serif text-[20px] text-navy mt-1">Active Engagement Pipeline</h3>
          </div>
          <span className="font-serif text-[14px] text-slate">
            <span className="text-navy font-medium">${(totalRevenuePipeline / 1000).toFixed(0)}k</span> total fees in motion
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {revenuePipeline.map((r) => {
            const pct = (r.value / totalRevenuePipeline) * 100
            return (
              <button
                key={r.label}
                type="button"
                onClick={() => onNavigate('assignments')}
                className="text-left p-4 rounded-[3px] border border-gold/15 bg-cream/40 hover:bg-white hover:border-gold/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-2 h-2 rounded-full ${r.accent}`} />
                  <span className="text-slate-light text-[11px] font-serif tabular-nums">
                    {Math.round(pct)}%
                  </span>
                </div>
                <p className="font-serif text-[24px] text-navy font-light leading-none tabular-nums">
                  ${(r.value / 1000).toFixed(0)}k
                </p>
                <p className="text-slate text-[11px] tracking-[0.05em] font-serif mt-2">{r.label}</p>
                <p className="text-slate-light text-[10px] font-serif mt-0.5">{r.count} assignments</p>
                <div className="mt-2.5 h-1 rounded-full bg-cream-deeper overflow-hidden">
                  <div className={`h-full ${r.accent} transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Workload Heatmap + Conflict Check */}
      <section className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-5">
        <div className="bg-white border border-gold/15 rounded-[4px] p-6">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
            <div>
              <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
                Capacity
              </p>
              <h3 className="font-serif text-[20px] text-navy mt-1">Team Workload Heatmap</h3>
              <p className="text-slate text-[12px] font-serif mt-0.5">
                Active assignments &amp; estimated hours per team member
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('assignments')}
              className="text-[11px] font-serif tracking-[0.12em] uppercase text-gold-dark hover:text-gold border-b border-gold/40 hover:border-gold pb-0.5"
            >
              View Assignments
            </button>
          </div>
          <div className="space-y-2.5">
            {workloadHeatmap.map((w) => {
              const loadPct = Math.min(100, (w.hours / w.capacity) * 100)
              const isHigh = loadPct >= 85
              const isLow = loadPct < 30
              return (
                <div key={w.appraiser} className="flex items-center gap-3">
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-white text-[12px] font-medium shrink-0 ${
                      isHigh
                        ? 'bg-gradient-to-br from-red-500 to-red-700'
                        : isLow
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-700'
                        : 'bg-gradient-to-br from-gold to-gold-dark'
                    }`}
                  >
                    {w.initials}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-serif text-[13px] text-navy font-medium truncate">{w.appraiser}</p>
                      <span className="text-[11px] font-serif text-slate tabular-nums shrink-0">
                        {w.active} active &middot; {w.hours}h / {w.capacity}h
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-cream-deeper overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ${
                          isHigh
                            ? 'bg-gradient-to-r from-red-500 to-red-600'
                            : isLow
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                            : 'bg-gradient-to-r from-gold to-gold-light'
                        }`}
                        style={{ width: `${loadPct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-serif tracking-[0.04em] uppercase shrink-0 w-12 text-right">
                    {isHigh ? <span className="text-red-600 font-medium">Heavy</span> : isLow ? <span className="text-emerald-700">Open</span> : <span className="text-slate">Steady</span>}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Conflict-of-Interest Check */}
        <div className="bg-gradient-to-br from-cream to-cream-dark border border-gold/20 rounded-[4px] p-6">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="shield" className="w-[18px] h-[18px] text-gold-dark" />
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              Compliance Tool
            </p>
          </div>
          <h3 className="font-serif text-[20px] text-navy leading-tight">Conflict of Interest Check</h3>
          <p className="text-slate text-[12px] font-serif font-light leading-[1.6] mt-1.5">
            Search prior leads, assignments &amp; comp transactions before accepting a new engagement.
          </p>
          <div className="mt-4 flex items-center gap-2 bg-white border border-gold/25 rounded-[3px] h-11 px-3 focus-within:border-gold transition-colors">
            <Icon name="search" className="w-[16px] h-[16px] text-gold" />
            <input
              type="search"
              value={conflictQuery}
              onChange={(e) => setConflictQuery(e.target.value)}
              placeholder="Property, client name, attorney…"
              className="flex-1 bg-transparent outline-none text-[14px] font-serif text-navy placeholder:text-slate-light/60"
            />
          </div>

          {conflictQuery.length >= 3 ? (
            conflictMatches.length === 0 ? (
              <div className="mt-4 p-4 rounded-[3px] bg-emerald-50 border border-emerald-200">
                <p className="font-serif text-[13px] text-emerald-700 font-medium">
                  ✓ No conflicts found
                </p>
                <p className="text-slate text-[12px] font-serif mt-0.5">
                  No prior engagements with &ldquo;{conflictQuery}&rdquo;.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <p className="text-red-600 text-[11px] tracking-[0.12em] uppercase font-serif font-medium">
                  {conflictMatches.length} potential matches found
                </p>
                {conflictMatches.map((m, i) => (
                  <div
                    key={i}
                    className={`bg-white border rounded-[3px] p-3 ${
                      m.severity === 'high' ? 'border-red-200' : 'border-amber-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-serif text-[13px] text-navy font-medium truncate">{m.label}</p>
                        <p className="text-slate text-[11px] font-serif truncate mt-0.5">{m.hint}</p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] shrink-0 ${
                          m.severity === 'high'
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : 'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {m.kind} · {m.id}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <p className="mt-4 text-slate-light text-[12px] font-serif italic">
              Type at least 3 characters to begin search.
            </p>
          )}
        </div>
      </section>

      {/* Two-column: Chart + Recent Leads */}
      <section className="grid grid-cols-1 xl:grid-cols-[1fr_1.4fr] gap-5">
        {/* Chart */}
        <div className="bg-white border border-gold/15 rounded-[4px] p-6">
          <div className="flex items-end justify-between mb-1">
            <div>
              <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
                Last 6 Months
              </p>
              <h3 className="font-serif text-[20px] text-navy mt-1">Lead Volume Trend</h3>
            </div>
          </div>
          <p className="text-slate-light text-[12px] font-serif mb-6">
            Inquiries received per month across all sources
          </p>
          <div className="h-[220px] flex items-end justify-between gap-3 px-1 border-b border-gold/15">
            {leadsByMonth.map((m) => {
              const heightPct = (m.count / maxMonth) * 100
              const isLast = m.month === leadsByMonth[leadsByMonth.length - 1].month
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span
                    className={`text-[12px] font-serif font-medium tabular-nums transition-opacity ${
                      isLast ? 'text-gold opacity-100' : 'text-slate opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {m.count}
                  </span>
                  <div className="w-full flex items-end justify-center" style={{ height: '170px' }}>
                    <div
                      className={`w-full rounded-t-[2px] transition-all duration-700 ${
                        isLast
                          ? 'bg-gradient-to-t from-gold to-gold-light'
                          : 'bg-gradient-to-t from-navy/80 to-navy-light/60 group-hover:from-navy group-hover:to-navy-light'
                      }`}
                      style={{ height: `${heightPct}%`, minHeight: '6px' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between mt-2 px-1">
            {leadsByMonth.map((m) => {
              const isLast = m.month === leadsByMonth[leadsByMonth.length - 1].month
              return (
                <span
                  key={m.month}
                  className={`flex-1 text-center text-[11px] tracking-[0.14em] uppercase font-serif font-medium ${
                    isLast ? 'text-gold' : 'text-slate-light'
                  }`}
                >
                  {m.month}
                </span>
              )
            })}
          </div>
        </div>

        {/* Recent leads */}
        <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15">
            <div>
              <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
                Inbox
              </p>
              <h3 className="font-serif text-[20px] text-navy mt-1">Recent Lead Inquiries</h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('leads')}
              className="text-[12px] font-serif font-medium tracking-[0.14em] uppercase text-gold hover:text-gold-dark border-b border-gold/40 hover:border-gold pb-0.5 transition-colors"
            >
              View all &rarr;
            </button>
          </div>
          <div className="divide-y divide-gold/10">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="px-6 py-3.5 hover:bg-cream/40 transition-colors flex items-center gap-4"
              >
                <span className="w-9 h-9 rounded-full bg-cream-deeper flex items-center justify-center font-serif text-navy text-[13px] font-medium shrink-0">
                  {lead.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif text-[15px] text-navy font-medium truncate">
                      {lead.name}
                    </span>
                    <StatusBadge status={lead.status} />
                  </div>
                  <p className="text-slate text-[12px] truncate font-serif mt-0.5">
                    {lead.service} &middot; {lead.location}
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end shrink-0">
                  <span className="text-slate-light text-[11px] font-serif">
                    {relativeTime(lead.createdAt)}
                  </span>
                  <span className="text-slate-light/70 text-[10px] font-mono mt-0.5">
                    {lead.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity + Quick actions */}
      <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-5">
        {/* Activity feed */}
        <div className="bg-white border border-gold/15 rounded-[4px] p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
                Activity
              </p>
              <h3 className="font-serif text-[20px] text-navy mt-1">Recent Activity</h3>
            </div>
            <button
              type="button"
              className="text-[11px] font-serif tracking-[0.14em] uppercase text-slate-light hover:text-navy transition-colors"
            >
              Mark all read
            </button>
          </div>
          <ol className="relative">
            <span className="absolute top-3 bottom-3 left-[19px] w-px bg-gold/15" />
            {mockActivity.slice(0, 7).map((entry, i) => (
              <li key={entry.id} className="relative flex items-start gap-4 pb-4 last:pb-0">
                <span
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${ACTIVITY_TINT[entry.type]} ring-4 ring-white`}
                >
                  <Icon name={ACTIVITY_ICON[entry.type]} className="w-[16px] h-[16px]" />
                </span>
                <div className="flex-1 pt-1.5 min-w-0">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <p className="font-serif text-[14px] text-navy font-medium">{entry.title}</p>
                    <span className="text-slate-light text-[11px] font-serif tabular-nums">
                      {relativeTime(entry.timestamp)}
                    </span>
                  </div>
                  <p className="text-slate text-[13px] font-serif font-light mt-0.5 truncate">
                    {entry.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Quick actions */}
        <div className="space-y-5">
          <div className="bg-white border border-gold/15 rounded-[4px] p-6">
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              Shortcuts
            </p>
            <h3 className="font-serif text-[20px] text-navy mt-1 mb-5">Quick CMS Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => onNavigate(action.section)}
                  className="group flex items-center gap-2.5 p-3 rounded-[3px] border border-gold/15 bg-cream/40 hover:bg-white hover:border-gold/40 hover:shadow-sm transition-all duration-200 text-left"
                >
                  <span className="w-9 h-9 rounded-[3px] bg-white border border-gold/15 flex items-center justify-center text-gold-dark group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-colors shrink-0">
                    <Icon name={action.icon} className="w-[16px] h-[16px]" />
                  </span>
                  <span className="text-[13px] font-serif font-medium text-navy leading-tight">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-navy to-navy-light rounded-[4px] p-6 border border-gold/15 overflow-hidden">
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gold/10 blur-2xl" />
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium relative">
              Tip
            </p>
            <h3 className="font-serif text-[18px] text-white leading-tight mt-1.5 relative">
              Featured posts get <span className="italic text-gold-light">3.2&times;</span> more clicks
            </h3>
            <p className="text-white/55 text-[13px] font-serif font-light leading-relaxed mt-2 relative">
              Mark your most relevant article as featured from the Blog Posts section to surface it
              on the Insights page hero.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('blog')}
              className="mt-4 inline-flex items-center gap-1.5 text-gold-light hover:text-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase border-b border-gold/40 hover:border-gold pb-0.5 transition-colors relative"
            >
              Open Blog Posts <span>&rarr;</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'

import { useMemo, useState } from 'react'
import Icon from './Icon'
import { mockCases, formatDate, type LitigationCase, type CaseStatus } from '@/lib/admin/mockData'

const STATUS_FILTERS: { key: CaseStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All Cases' },
  { key: 'Active', label: 'Active' },
  { key: 'Deposition Scheduled', label: 'Deposition' },
  { key: 'Trial Scheduled', label: 'Trial' },
  { key: 'Settled', label: 'Settled' },
  { key: 'Closed', label: 'Closed' },
]

const STATUS_STYLES: Record<CaseStatus, string> = {
  Active: 'bg-ocean/10 text-ocean-dark border-ocean/30',
  'Deposition Scheduled': 'bg-amber-50 text-amber-700 border-amber-200',
  'Trial Scheduled': 'bg-red-50 text-red-700 border-red-200',
  Settled: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Closed: 'bg-slate-100 text-slate border-slate-300',
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null
  const target = new Date(dateStr).getTime()
  const now = new Date('2026-04-29T10:00:00Z').getTime()
  return Math.floor((target - now) / (1000 * 60 * 60 * 24))
}

export default function LitigationCases() {
  const [filter, setFilter] = useState<CaseStatus | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return mockCases.filter((c) => {
      if (filter !== 'all' && c.status !== filter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          c.caseName.toLowerCase().includes(q) ||
          c.client.toLowerCase().includes(q) ||
          c.expert.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [filter, search])

  const upcomingDeadlines = mockCases
    .map((c) => ({ case: c, daysToDep: daysUntil(c.depositionDate), daysToTrial: daysUntil(c.trialDate) }))
    .filter((x) => (x.daysToDep !== null && x.daysToDep >= 0 && x.daysToDep <= 30) || (x.daysToTrial !== null && x.daysToTrial >= 0 && x.daysToTrial <= 90))
    .sort((a, b) => Math.min(a.daysToDep ?? 999, a.daysToTrial ?? 999) - Math.min(b.daysToDep ?? 999, b.daysToTrial ?? 999))

  const totalFees = mockCases.reduce((sum, c) => sum + c.feeQuoted, 0)
  const activeCount = mockCases.filter((c) => c.status !== 'Settled' && c.status !== 'Closed').length

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Operations</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Litigation <span className="italic text-gold">Cases</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            Expert witness engagements &middot; deposition &amp; trial deadline tracking
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
          <Icon name="plus" className="w-[14px] h-[14px]" />
          New Case
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: 'Active Cases', v: activeCount, sub: 'in progress' },
          { l: 'Upcoming Depositions', v: mockCases.filter((c) => c.depositionDate && (daysUntil(c.depositionDate) ?? 999) >= 0).length, sub: 'next 90 days' },
          { l: 'Upcoming Trials', v: mockCases.filter((c) => c.trialDate && (daysUntil(c.trialDate) ?? 999) >= 0).length, sub: 'on calendar' },
          { l: 'Total Fees', v: `$${(totalFees / 1000).toFixed(0)}k`, sub: 'across all cases' },
        ].map((s) => (
          <div key={s.l} className="bg-white border border-gold/15 rounded-[4px] p-4">
            <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">{s.l}</p>
            <p className="font-serif text-[28px] text-navy font-light leading-none mt-2">{s.v}</p>
            <p className="text-slate-light text-[11px] font-serif mt-1.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Critical deadlines strip */}
      {upcomingDeadlines.length > 0 && (
        <div className="bg-gradient-to-br from-red-50 to-amber-50 border border-red-200 rounded-[4px] p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="warning" className="w-[18px] h-[18px] text-red-600" />
            <p className="font-serif text-[14px] text-navy font-medium">
              Critical Deadlines <span className="text-slate font-light">— action required</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {upcomingDeadlines.slice(0, 4).map(({ case: c, daysToDep, daysToTrial }) => {
              const nextEvent = daysToDep !== null && daysToDep >= 0 ? { type: 'Deposition', when: c.depositionDate!, days: daysToDep } : { type: 'Trial', when: c.trialDate!, days: daysToTrial! }
              return (
                <div key={c.id} className="bg-white border border-red-200 rounded-[3px] p-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-serif text-[13px] text-navy font-medium truncate">{c.caseName}</p>
                    <p className="text-slate-light text-[11px] font-serif mt-0.5">
                      {nextEvent.type} &middot; {formatDate(nextEvent.when)} &middot; Expert: {c.expert.split(' ')[0]}
                    </p>
                  </div>
                  <span className="text-red-600 font-serif font-medium text-[14px] tabular-nums shrink-0">
                    {nextEvent.days}d
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border border-gold/15 rounded-[4px] p-3 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`px-3 h-8 rounded-[3px] border text-[11px] font-serif font-medium tracking-[0.08em] uppercase transition-colors ${
              filter === f.key
                ? 'bg-navy text-white border-navy'
                : 'bg-cream/50 text-navy border-gold/15 hover:border-gold/40 hover:bg-white'
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-cream border border-gold/20 rounded-[3px] h-8 px-3">
          <Icon name="search" className="w-[14px] h-[14px] text-slate-light" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cases by name, client, or expert…"
            className="flex-1 bg-transparent outline-none text-[12px] font-serif text-navy placeholder:text-slate-light/60"
          />
        </div>
      </div>

      {/* Cases list */}
      <div className="space-y-3">
        {filtered.map((c) => (
          <CaseCard key={c.id} caseItem={c} />
        ))}
      </div>
    </div>
  )
}

function CaseCard({ caseItem: c }: { caseItem: LitigationCase }) {
  const dDep = daysUntil(c.depositionDate)
  const dTrial = daysUntil(c.trialDate)

  return (
    <div className="bg-white border border-gold/15 rounded-[4px] p-5 hover:border-gold/40 hover:shadow-md hover:shadow-navy/5 transition-all duration-300">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] border ${STATUS_STYLES[c.status]}`}
            >
              <span className="w-1 h-1 rounded-full bg-current" />
              {c.status}
            </span>
            <span className="font-mono text-slate-light text-[10px]">{c.id}</span>
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.05em] rounded-[2px] border border-navy/15 text-navy bg-cream">
              {c.caseType}
            </span>
            {c.reportDelivered && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.05em] rounded-[2px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Icon name="check" className="w-3 h-3" />
                Report Delivered
              </span>
            )}
          </div>
          <h3 className="font-serif text-[18px] text-navy leading-snug">{c.caseName}</h3>
          <p className="text-slate text-[13px] font-serif mt-1">
            <span className="text-slate-light">Client:</span> {c.client}
            <span className="mx-2 text-slate-light/40">·</span>
            <span className="text-slate-light">Court:</span> {c.court}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-serif text-[20px] text-navy font-light tabular-nums leading-none">
            ${c.feeQuoted.toLocaleString()}
          </p>
          <p className="text-slate-light text-[11px] tracking-[0.05em] uppercase font-serif mt-1">
            {c.hoursLogged} hrs logged
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gold/10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">Expert Witness</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif text-white text-[11px] font-medium">
              {c.expert.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </span>
            <span className="font-serif text-[13px] text-navy">{c.expert}</span>
          </div>
        </div>
        <div>
          <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">Deposition</p>
          {c.depositionDate ? (
            <p className="font-serif text-[13px] text-navy mt-1.5">
              {formatDate(c.depositionDate)}
              {dDep !== null && dDep >= 0 && (
                <span className={`ml-2 text-[11px] font-medium ${dDep <= 14 ? 'text-red-600' : 'text-gold-dark'}`}>
                  {dDep}d away
                </span>
              )}
            </p>
          ) : (
            <p className="text-slate-light text-[12px] font-serif mt-1.5 italic">Not scheduled</p>
          )}
        </div>
        <div>
          <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">Trial</p>
          {c.trialDate ? (
            <p className="font-serif text-[13px] text-navy mt-1.5">
              {formatDate(c.trialDate)}
              {dTrial !== null && dTrial >= 0 && (
                <span className={`ml-2 text-[11px] font-medium ${dTrial <= 30 ? 'text-red-600' : 'text-slate'}`}>
                  {dTrial}d away
                </span>
              )}
            </p>
          ) : (
            <p className="text-slate-light text-[12px] font-serif mt-1.5 italic">Not scheduled</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] ${c.exhibitsReady ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
          <span className={`w-1 h-1 rounded-full ${c.exhibitsReady ? 'bg-emerald-700' : 'bg-amber-700'}`} />
          Exhibits {c.exhibitsReady ? 'Ready' : 'Pending'}
        </span>
        <button className="inline-flex items-center gap-1.5 ml-auto px-3 h-8 rounded-[3px] border border-gold/25 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.08em] uppercase transition-colors">
          <Icon name="external" className="w-3.5 h-3.5" />
          Open Case File
        </button>
      </div>
    </div>
  )
}

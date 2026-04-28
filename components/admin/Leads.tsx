'use client'

import { useMemo, useState } from 'react'
import Icon from './Icon'
import StatusBadge from './StatusBadge'
import {
  mockLeads,
  STATUS_LABEL,
  TEAM_NAMES,
  formatDate,
  relativeTime,
  sourceAttribution,
  type Lead,
  type LeadStatus,
} from '@/lib/admin/mockData'

const STATUS_FILTERS: { key: LeadStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'qualified', label: 'Qualified' },
  { key: 'closed-won', label: 'Closed · Won' },
  { key: 'closed-lost', label: 'Closed · Lost' },
]

const SERVICES = [
  'All Services',
  'Commercial Appraisal',
  'Litigation Support',
  'Market Analysis',
  'Property Tax Appeal',
  'Residential Valuation',
  'Pacific Region',
  'Consulting',
]

export default function Leads() {
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all')
  const [serviceFilter, setServiceFilter] = useState('All Services')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Lead | null>(null)

  const filtered = useMemo(() => {
    return mockLeads.filter((lead) => {
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false
      if (serviceFilter !== 'All Services' && lead.service !== serviceFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.location.toLowerCase().includes(q) ||
          lead.message.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [statusFilter, serviceFilter, search])

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: mockLeads.length }
    mockLeads.forEach((l) => {
      map[l.status] = (map[l.status] || 0) + 1
    })
    return map
  }, [])

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
            CRM
          </p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Leads &amp; <span className="italic text-gold">Inquiries</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            {mockLeads.length} total leads &middot; received from contact form, phone, email &amp; referrals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] border border-gold/25 text-navy hover:bg-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
          >
            <Icon name="download" className="w-[14px] h-[14px]" />
            Export CSV
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-navy text-white hover:bg-navy-light text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
          >
            <Icon name="plus" className="w-[14px] h-[14px]" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Top sources strip */}
      <div className="bg-white border border-gold/15 rounded-[4px] p-5">
        <div className="flex items-end justify-between mb-3 flex-wrap gap-2">
          <div>
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              Attribution
            </p>
            <h3 className="font-serif text-[16px] text-navy mt-0.5">Top Lead Sources</h3>
          </div>
          <span className="text-slate-light text-[11px] font-serif tracking-[0.05em]">
            click a source to filter
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {sourceAttribution.slice(0, 4).map((s) => (
            <button
              key={s.source}
              type="button"
              onClick={() => setSearch(s.source.split(' ')[0])}
              className="text-left bg-cream/40 hover:bg-white border border-gold/15 hover:border-gold/40 rounded-[3px] p-3 transition-all"
            >
              <p className="font-serif text-[13px] text-navy font-medium truncate">{s.source}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif text-[20px] text-navy font-light tabular-nums">{s.count}</span>
                <span className="text-slate-light text-[11px] font-serif">leads</span>
              </div>
              <p className="text-emerald-700 text-[11px] font-serif font-medium tabular-nums mt-1">
                {s.conversionRate}% convert &middot; ${(s.avgFee / 1000).toFixed(1)}k avg
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Filters strip */}
      <div className="bg-white border border-gold/15 rounded-[4px] p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {STATUS_FILTERS.map((f) => {
            const isActive = statusFilter === f.key
            const count = counts[f.key] ?? 0
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setStatusFilter(f.key)}
                className={`inline-flex items-center gap-2 px-3 h-9 rounded-[3px] border text-[12px] font-serif font-medium tracking-[0.1em] uppercase transition-colors ${
                  isActive
                    ? 'bg-navy text-white border-navy'
                    : 'bg-cream/50 text-navy border-gold/15 hover:border-gold/40 hover:bg-white'
                }`}
              >
                {f.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gold/15 text-gold-dark'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gold/10">
          <div className="flex-1 min-w-[260px] flex items-center gap-2 bg-cream border border-gold/20 rounded-[3px] h-10 px-3 focus-within:border-gold transition-colors">
            <Icon name="search" className="w-[16px] h-[16px] text-slate-light" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, location, message…"
              className="flex-1 bg-transparent outline-none text-[14px] font-serif text-navy placeholder:text-slate-light/60"
            />
          </div>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="h-10 bg-cream border border-gold/20 rounded-[3px] px-3 text-[13px] font-serif text-navy focus:border-gold focus:outline-none transition-colors"
          >
            {SERVICES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button
            type="button"
            className="inline-flex items-center gap-2 h-10 px-3 rounded-[3px] border border-gold/20 text-navy hover:bg-cream text-[12px] font-serif font-medium tracking-[0.1em] uppercase transition-colors"
          >
            <Icon name="filter" className="w-[14px] h-[14px]" />
            More Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream/60 border-b border-gold/15">
                {['Lead', 'Service · Property', 'Location', 'Status', 'Assigned To', 'Received', 'Source', ''].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-[10px] tracking-[0.22em] uppercase font-serif font-medium text-slate"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  className="hover:bg-cream/40 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-cream-deeper flex items-center justify-center font-serif text-navy text-[13px] font-medium shrink-0">
                        {lead.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                      <div className="min-w-0">
                        <p className="font-serif text-[14px] text-navy font-medium truncate">
                          {lead.name}
                        </p>
                        <p className="text-slate-light text-[12px] truncate">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 align-middle">
                    <p className="font-serif text-[13px] text-navy">{lead.service}</p>
                    <p className="text-slate-light text-[12px]">{lead.propertyType}</p>
                  </td>
                  <td className="px-5 py-3.5 align-middle">
                    <span className="font-serif text-[13px] text-navy">{lead.location}</span>
                  </td>
                  <td className="px-5 py-3.5 align-middle">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-5 py-3.5 align-middle">
                    {lead.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif text-white text-[11px] font-medium">
                          {lead.assignedTo
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                        <span className="font-serif text-[13px] text-navy">{lead.assignedTo.split(' ')[0]}</span>
                      </div>
                    ) : (
                      <span className="text-slate-light text-[12px] font-serif italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 align-middle">
                    <span className="text-slate text-[12px] font-serif">{relativeTime(lead.createdAt)}</span>
                  </td>
                  <td className="px-5 py-3.5 align-middle">
                    <span className="text-[11px] tracking-[0.1em] uppercase font-serif text-slate-light">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 align-middle">
                    <Icon name="chevronRight" className="w-4 h-4 text-slate-light" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center font-serif text-slate-light">
              No leads match your filters.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-gold/15 bg-cream/30">
          <span className="text-[12px] font-serif text-slate">
            Showing <span className="font-medium text-navy">{filtered.length}</span> of{' '}
            <span className="font-medium text-navy">{mockLeads.length}</span> leads
          </span>
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 flex items-center justify-center rounded-[3px] border border-gold/20 text-slate-light cursor-not-allowed">
              &larr;
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-[3px] bg-navy text-white text-[13px] font-serif">
              1
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-[3px] border border-gold/20 text-navy hover:bg-white text-[13px] font-serif">
              2
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-[3px] border border-gold/20 text-navy hover:bg-white">
              &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && <LeadDetailDrawer lead={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function LeadDetailDrawer({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm animate-[fadeIn_0.2s]" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-cream w-full max-w-[520px] h-full overflow-y-auto shadow-2xl border-l border-gold/20"
      >
        <div className="sticky top-0 bg-cream/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-gold/15 flex items-center justify-between">
          <div>
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              Lead Details
            </p>
            <p className="font-mono text-slate text-[12px] mt-0.5">{lead.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-[3px] border border-gold/20 text-navy hover:bg-white flex items-center justify-center"
          >
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Identity */}
          <div className="flex items-start gap-4">
            <span className="w-14 h-14 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center font-serif text-white text-[18px] font-medium shrink-0">
              {lead.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-[22px] text-navy leading-tight">{lead.name}</h3>
              <div className="mt-1.5">
                <StatusBadge status={lead.status} />
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="bg-white border border-gold/15 rounded-[3px] p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Icon name="mail" className="w-[16px] h-[16px] text-gold shrink-0" />
              <a href={`mailto:${lead.email}`} className="text-[13px] font-serif text-navy hover:text-gold break-all">
                {lead.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="phone" className="w-[16px] h-[16px] text-gold shrink-0" />
              <a href={`tel:${lead.phone}`} className="text-[13px] font-serif text-navy hover:text-gold">
                {lead.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="pin" className="w-[16px] h-[16px] text-gold shrink-0" />
              <span className="text-[13px] font-serif text-navy">{lead.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="briefcase" className="w-[16px] h-[16px] text-gold shrink-0" />
              <span className="text-[13px] font-serif text-navy">
                {lead.service} &middot; {lead.propertyType}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="calendar" className="w-[16px] h-[16px] text-gold shrink-0" />
              <span className="text-[13px] font-serif text-navy">
                Received {formatDate(lead.createdAt)} &middot; {lead.source}
              </span>
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="text-gold text-[10px] tracking-[0.22em] uppercase font-serif font-medium mb-2">
              Message
            </p>
            <p className="font-serif font-light italic text-[15px] text-navy leading-[1.7] border-l-2 border-gold pl-4">
              {lead.message}
            </p>
          </div>

          {/* Status pipeline */}
          <div>
            <p className="text-gold text-[10px] tracking-[0.22em] uppercase font-serif font-medium mb-2">
              Update Status
            </p>
            <div className="flex flex-wrap gap-2">
              {(['new', 'contacted', 'qualified', 'closed-won', 'closed-lost'] as LeadStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`px-3 h-9 rounded-[3px] border text-[12px] font-serif font-medium tracking-[0.1em] uppercase transition-colors ${
                    lead.status === s
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-navy border-gold/20 hover:border-gold hover:bg-cream'
                  }`}
                >
                  {STATUS_LABEL[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Assignment */}
          <div>
            <p className="text-gold text-[10px] tracking-[0.22em] uppercase font-serif font-medium mb-2">
              Assigned To
            </p>
            <select
              defaultValue={lead.assignedTo ?? ''}
              className="w-full h-11 bg-white border border-gold/20 rounded-[3px] px-3 text-[14px] font-serif text-navy focus:border-gold focus:outline-none"
            >
              <option value="">Unassigned</option>
              {TEAM_NAMES.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <p className="text-gold text-[10px] tracking-[0.22em] uppercase font-serif font-medium mb-2">
              Internal Notes
            </p>
            <textarea
              placeholder="Add a note about this lead — only visible to your team…"
              className="w-full min-h-[100px] bg-white border border-gold/20 rounded-[3px] p-3 text-[14px] font-serif text-navy placeholder:text-slate-light/60 focus:border-gold focus:outline-none resize-y"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3 border-t border-gold/15">
            <button
              type="button"
              className="flex-1 h-11 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="h-11 px-4 rounded-[3px] border border-gold/25 text-navy hover:bg-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

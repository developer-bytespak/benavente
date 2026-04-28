'use client'

import { useMemo, useState } from 'react'
import Icon from './Icon'
import {
  mockAssignments,
  STAGE_LABEL,
  STAGE_PROGRESS,
  TEAM_NAMES,
  formatDate,
  type AssignmentStage,
} from '@/lib/admin/mockData'
import type { Assignment } from '@/lib/admin/operationsData'

const STAGE_FILTERS: { key: AssignmentStage | 'all' | 'attention'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'attention', label: 'Needs Attention' },
  { key: 'engaged', label: 'Engaged' },
  { key: 'site-visit', label: 'Site Visit' },
  { key: 'research', label: 'Research' },
  { key: 'drafting', label: 'Drafting' },
  { key: 'peer-review', label: 'Peer Review' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'invoiced', label: 'Invoiced' },
]

const STAGE_COLORS: Record<AssignmentStage, { bg: string; text: string; ring: string }> = {
  engaged: { bg: 'bg-ocean/10', text: 'text-ocean-dark', ring: 'border-ocean/30' },
  'site-visit': { bg: 'bg-purple-100', text: 'text-purple-800', ring: 'border-purple-200' },
  research: { bg: 'bg-amber-100', text: 'text-amber-800', ring: 'border-amber-200' },
  drafting: { bg: 'bg-gold/15', text: 'text-gold-dark', ring: 'border-gold/30' },
  'peer-review': { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'border-emerald-200' },
  delivered: { bg: 'bg-emerald-600/15', text: 'text-emerald-700', ring: 'border-emerald-600/30' },
  invoiced: { bg: 'bg-slate-100', text: 'text-slate', ring: 'border-slate-300' },
}

function stageBadge(stage: AssignmentStage) {
  const c = STAGE_COLORS[stage]
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-sans font-medium tracking-[0.04em] uppercase rounded-[2px] border ${c.bg} ${c.text} ${c.ring}`}
    >
      <span className="w-1 h-1 rounded-full bg-current" />
      {STAGE_LABEL[stage]}
    </span>
  )
}

export default function Assignments() {
  const [filter, setFilter] = useState<AssignmentStage | 'all' | 'attention'>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Assignment | null>(null)

  const totalFee = mockAssignments.reduce((sum, a) => sum + a.fee, 0)
  const inProgress = mockAssignments.filter((a) => !['delivered', 'invoiced'].includes(a.stage)).length
  const overdue = mockAssignments.filter((a) => a.daysToDeadline < 0 && !['delivered', 'invoiced'].includes(a.stage)).length
  const dueThisWeek = mockAssignments.filter((a) => a.daysToDeadline >= 0 && a.daysToDeadline <= 7 && !['delivered', 'invoiced'].includes(a.stage)).length

  const filtered = useMemo(() => {
    return mockAssignments.filter((a) => {
      if (filter === 'attention' && !(a.daysToDeadline <= 7 && !['delivered', 'invoiced'].includes(a.stage)))
        return false
      if (filter !== 'all' && filter !== 'attention' && a.stage !== filter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          a.client.toLowerCase().includes(q) ||
          a.property.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.assignedAppraiser.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [filter, search])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Operations</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Active <span className="italic text-gold">Assignments</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            {mockAssignments.length} assignments in pipeline &middot; ${(totalFee / 1000).toFixed(0)}k total fees engaged
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
          <Icon name="plus" className="w-[14px] h-[14px]" />
          New Assignment
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'In Progress', value: inProgress, sub: 'active workload', accent: 'text-navy' },
          { label: 'Due This Week', value: dueThisWeek, sub: 'next 7 days', accent: 'text-gold-dark' },
          { label: 'Overdue', value: overdue, sub: 'requires action', accent: overdue > 0 ? 'text-red-600' : 'text-slate' },
          { label: 'Pipeline Value', value: `$${(totalFee / 1000).toFixed(0)}k`, sub: 'fees engaged', accent: 'text-emerald-700' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gold/15 rounded-[4px] p-4">
            <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">{s.label}</p>
            <p className={`font-serif text-[28px] font-light leading-none mt-2 ${s.accent}`}>{s.value}</p>
            <p className="text-slate-light text-[11px] font-serif mt-1.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gold/15 rounded-[4px] p-3">
        <div className="flex flex-wrap gap-2 mb-2.5">
          {STAGE_FILTERS.map((f) => {
            const isActive = filter === f.key
            const count =
              f.key === 'all'
                ? mockAssignments.length
                : f.key === 'attention'
                ? dueThisWeek + overdue
                : mockAssignments.filter((a) => a.stage === f.key).length
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`inline-flex items-center gap-2 px-3 h-8 rounded-[3px] border text-[11px] font-serif font-medium tracking-[0.08em] uppercase transition-colors ${
                  isActive
                    ? 'bg-navy text-white border-navy'
                    : f.key === 'attention'
                    ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                    : 'bg-cream/50 text-navy border-gold/15 hover:border-gold/40 hover:bg-white'
                }`}
              >
                {f.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : f.key === 'attention' ? 'bg-red-200 text-red-800' : 'bg-gold/15 text-gold-dark'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-2 bg-cream border border-gold/20 rounded-[3px] h-9 px-3">
          <Icon name="search" className="w-[16px] h-[16px] text-slate-light" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, property, location, appraiser, or assignment ID…"
            className="flex-1 bg-transparent outline-none text-[13px] font-serif text-navy placeholder:text-slate-light/60"
          />
        </div>
      </div>

      {/* Assignments table */}
      <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream/60 border-b border-gold/15">
                {['Assignment', 'Stage', 'Progress', 'Appraiser · Reviewer', 'Fee', 'Deadline', ''].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[10px] tracking-[0.22em] uppercase font-serif font-medium text-slate"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {filtered.map((a) => {
                const isOverdue = a.daysToDeadline < 0 && !['delivered', 'invoiced'].includes(a.stage)
                const isUrgent = a.daysToDeadline >= 0 && a.daysToDeadline <= 7 && !['delivered', 'invoiced'].includes(a.stage)
                const progress = STAGE_PROGRESS[a.stage]
                return (
                  <tr
                    key={a.id}
                    onClick={() => setSelected(a)}
                    className="hover:bg-cream/40 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3.5 max-w-[340px]">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-[10px] text-slate-light shrink-0 mt-1">{a.id}</span>
                        <div className="min-w-0">
                          <p className="font-serif text-[14px] text-navy font-medium leading-tight">
                            {a.client}
                          </p>
                          <p className="text-slate text-[12px] font-serif truncate mt-0.5">{a.property}</p>
                          <p className="text-slate-light text-[11px] font-serif truncate mt-0.5">
                            {a.location} &middot; {a.serviceType}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">{stageBadge(a.stage)}</td>
                    <td className="px-5 py-3.5 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-cream-deeper overflow-hidden">
                          <div
                            className={`h-full transition-all duration-700 ${
                              a.stage === 'invoiced'
                                ? 'bg-emerald-600'
                                : isOverdue
                                ? 'bg-red-400'
                                : 'bg-gradient-to-r from-gold to-gold-light'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-serif text-slate tabular-nums w-8 text-right">
                          {progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          title={a.assignedAppraiser}
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif text-white text-[11px] font-medium"
                        >
                          {a.assignedAppraiser
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                        {a.peerReviewer && (
                          <>
                            <span className="text-slate-light text-[10px]">/</span>
                            <span
                              title={`Reviewer: ${a.peerReviewer}`}
                              className="w-7 h-7 rounded-full bg-cream-deeper border border-gold/30 flex items-center justify-center font-serif text-navy text-[11px] font-medium"
                            >
                              {a.peerReviewer
                                .split(' ')
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join('')}
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-serif text-[14px] text-navy font-medium tabular-nums">
                        ${a.fee.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className={`font-serif text-[13px] tabular-nums ${isOverdue ? 'text-red-600 font-medium' : 'text-navy'}`}>
                        {formatDate(a.dueDate)}
                      </p>
                      <p
                        className={`text-[11px] font-serif tracking-[0.04em] mt-0.5 ${
                          isOverdue
                            ? 'text-red-600 font-medium'
                            : isUrgent
                            ? 'text-gold-dark font-medium'
                            : 'text-slate-light'
                        }`}
                      >
                        {isOverdue
                          ? `${Math.abs(a.daysToDeadline)}d overdue`
                          : a.daysToDeadline === 0
                          ? 'Due today'
                          : a.daysToDeadline > 0
                          ? `${a.daysToDeadline}d left`
                          : `Closed ${Math.abs(a.daysToDeadline)}d ago`}
                      </p>
                    </td>
                    <td className="px-3 py-3.5">
                      <Icon name="chevronRight" className="w-4 h-4 text-slate-light" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center font-serif text-slate-light">
              No assignments match your filters.
            </div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-gold/15 bg-cream/30 text-[12px] font-serif text-slate">
          Showing <span className="font-medium text-navy">{filtered.length}</span> of{' '}
          <span className="font-medium text-navy">{mockAssignments.length}</span> assignments
        </div>
      </div>

      {selected && <AssignmentDrawer assignment={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function AssignmentDrawer({ assignment, onClose }: { assignment: Assignment; onClose: () => void }) {
  const [tab, setTab] = useState<'overview' | 'review' | 'documents' | 'activity'>('overview')

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-cream w-full max-w-[640px] h-full overflow-y-auto shadow-2xl border-l border-gold/20 admin-scroll"
      >
        {/* Header */}
        <div className="sticky top-0 bg-cream/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-gold/15">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
                Assignment
              </p>
              <p className="font-mono text-slate text-[12px] mt-0.5">{assignment.id}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-[3px] border border-gold/20 text-navy hover:bg-white flex items-center justify-center"
            >
              <Icon name="close" className="w-4 h-4" />
            </button>
          </div>

          <h3 className="font-serif text-[22px] text-navy leading-tight mt-3">{assignment.client}</h3>
          <p className="font-serif text-[14px] text-slate mt-1">{assignment.property}</p>

          <div className="flex items-center gap-2 mt-3">
            {stageBadge(assignment.stage)}
            <span className="text-slate-light/40">&middot;</span>
            <span className="font-serif text-[12px] text-slate">
              ${assignment.fee.toLocaleString()} fee &middot; due {formatDate(assignment.dueDate)}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-[124px] bg-cream/95 backdrop-blur-sm z-10 border-b border-gold/15 px-6">
          <div className="flex gap-1">
            {([
              { k: 'overview', l: 'Overview' },
              { k: 'review', l: `Peer Review (${assignment.peerComments.length})` },
              { k: 'documents', l: `Documents (${assignment.documents.length})` },
              { k: 'activity', l: 'Activity' },
            ] as const).map((t) => (
              <button
                key={t.k}
                type="button"
                onClick={() => setTab(t.k as typeof tab)}
                className={`px-4 py-3 text-[12px] font-serif font-medium tracking-[0.1em] uppercase transition-colors border-b-2 ${
                  tab === t.k
                    ? 'border-gold text-navy'
                    : 'border-transparent text-slate-light hover:text-navy'
                }`}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-5">
          {tab === 'overview' && (
            <>
              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: 'Service Type', v: assignment.serviceType },
                  { l: 'Property Type', v: assignment.propertyType },
                  { l: 'Location', v: assignment.location },
                  { l: 'Started', v: formatDate(assignment.startDate) },
                ].map((kv) => (
                  <div key={kv.l} className="bg-white border border-gold/15 rounded-[3px] p-3">
                    <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">
                      {kv.l}
                    </p>
                    <p className="font-serif text-[14px] text-navy mt-1">{kv.v}</p>
                  </div>
                ))}
              </div>

              {/* Team */}
              <div className="bg-white border border-gold/15 rounded-[3px] p-4">
                <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium mb-3">
                  Team Assignment
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif text-white text-[13px] font-medium shrink-0">
                    {assignment.assignedAppraiser
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                  <div>
                    <p className="font-serif text-[14px] text-navy font-medium">{assignment.assignedAppraiser}</p>
                    <p className="text-slate-light text-[11px] tracking-[0.05em] uppercase font-serif">
                      Lead Appraiser
                    </p>
                  </div>
                </div>
                {assignment.peerReviewer && (
                  <div className="flex items-center gap-3 pt-3 border-t border-gold/10">
                    <span className="w-10 h-10 rounded-full bg-cream-deeper border border-gold/30 flex items-center justify-center font-serif text-navy text-[13px] font-medium shrink-0">
                      {assignment.peerReviewer
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    <div>
                      <p className="font-serif text-[14px] text-navy font-medium">{assignment.peerReviewer}</p>
                      <p className="text-slate-light text-[11px] tracking-[0.05em] uppercase font-serif">
                        Peer Reviewer
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              {assignment.notes && (
                <div>
                  <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium mb-2">
                    Notes
                  </p>
                  <p className="font-serif italic text-[15px] text-navy leading-[1.6] border-l-2 border-gold pl-4">
                    {assignment.notes}
                  </p>
                </div>
              )}

              {/* Stage updater */}
              <div>
                <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium mb-2">
                  Update Stage
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(['engaged', 'site-visit', 'research', 'drafting', 'peer-review', 'delivered', 'invoiced'] as AssignmentStage[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`px-3 h-8 rounded-[3px] border text-[11px] font-serif font-medium tracking-[0.08em] uppercase transition-colors ${
                        assignment.stage === s
                          ? 'bg-navy text-white border-navy'
                          : 'bg-white text-navy border-gold/20 hover:border-gold hover:bg-cream'
                      }`}
                    >
                      {STAGE_LABEL[s]}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === 'review' && (
            <div>
              {assignment.peerReviewer ? (
                <>
                  <div className="bg-white border border-gold/15 rounded-[3px] p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">
                        Peer Reviewer
                      </p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1 h-1 rounded-full bg-emerald-700" />
                        QC Active
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-cream-deeper border border-gold/30 flex items-center justify-center font-serif text-navy text-[13px] font-medium">
                        {assignment.peerReviewer
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                      <div>
                        <p className="font-serif text-[14px] text-navy font-medium">{assignment.peerReviewer}</p>
                        <p className="text-slate-light text-[11px] tracking-[0.05em] uppercase font-serif">
                          Reviewing draft v{assignment.documents.filter((d) => d.type === 'draft').length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {assignment.peerComments.length === 0 ? (
                      <p className="text-slate-light font-serif text-center py-8">
                        No review comments yet. Reviewer will add notes once draft is reviewed.
                      </p>
                    ) : (
                      assignment.peerComments.map((c, i) => (
                        <div
                          key={i}
                          className={`border rounded-[3px] p-4 ${
                            c.status === 'approved'
                              ? 'bg-emerald-50 border-emerald-200'
                              : c.status === 'addressed'
                              ? 'bg-cream/50 border-gold/15'
                              : 'bg-amber-50 border-amber-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="font-serif text-[13px] text-navy font-medium">{c.reviewer}</p>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] ${
                                c.status === 'approved'
                                  ? 'bg-emerald-200 text-emerald-800'
                                  : c.status === 'addressed'
                                  ? 'bg-slate-200 text-slate'
                                  : 'bg-amber-200 text-amber-800'
                              }`}
                            >
                              {c.status}
                            </span>
                          </div>
                          <p className="font-serif text-[14px] text-navy leading-[1.55]">{c.comment}</p>
                          <p className="text-slate-light text-[11px] font-serif mt-2">
                            {formatDate(c.timestamp)}
                          </p>
                        </div>
                      ))
                    )}
                    <div>
                      <textarea
                        placeholder="Add a peer review comment…"
                        className="w-full min-h-[90px] bg-white border border-gold/20 rounded-[3px] p-3 text-[14px] font-serif text-navy placeholder:text-slate-light/60 focus:border-gold focus:outline-none resize-y"
                      />
                      <div className="flex gap-2 mt-2">
                        <button className="flex-1 h-10 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
                          Post Comment
                        </button>
                        <button className="h-10 px-4 rounded-[3px] border border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
                          Approve Report
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="font-serif text-[16px] text-navy">No peer reviewer assigned yet</p>
                  <p className="text-slate-light text-[13px] font-serif mt-1.5">
                    Assign a reviewer for USPAP-compliant quality control.
                  </p>
                  <select className="mt-4 h-11 bg-white border border-gold/20 rounded-[3px] px-3 text-[14px] font-serif text-navy focus:border-gold focus:outline-none">
                    <option>Select reviewer…</option>
                    {TEAM_NAMES.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {tab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">
                  USPAP Workfile &middot; Auto-archived 5 years
                </p>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Icon name="shield" className="w-3 h-3" />
                  Compliant
                </span>
              </div>
              <div className="space-y-2">
                {assignment.documents.map((doc, i) => {
                  const typeColors: Record<string, string> = {
                    engagement: 'bg-ocean/10 text-ocean-dark',
                    photos: 'bg-purple-100 text-purple-800',
                    comps: 'bg-amber-100 text-amber-800',
                    workfile: 'bg-cream-deeper text-slate',
                    draft: 'bg-gold/15 text-gold-dark',
                    final: 'bg-emerald-100 text-emerald-700',
                    invoice: 'bg-emerald-600/15 text-emerald-700',
                  }
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white border border-gold/15 rounded-[3px] p-3 hover:border-gold/40 hover:shadow-sm transition-all"
                    >
                      <span className={`w-9 h-9 rounded-[3px] flex items-center justify-center shrink-0 ${typeColors[doc.type] || 'bg-cream'}`}>
                        <Icon name="fileText" className="w-[16px] h-[16px]" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-[13px] text-navy font-medium truncate">{doc.name}</p>
                        <p className="text-slate-light text-[11px] font-serif mt-0.5">
                          {doc.size} &middot; {doc.type} &middot; {doc.uploadedBy} &middot; {formatDate(doc.uploadedAt)}
                        </p>
                      </div>
                      <button className="text-slate-light hover:text-gold-dark p-1.5">
                        <Icon name="download" className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
                <button className="w-full h-11 rounded-[3px] border-2 border-dashed border-gold/30 text-navy hover:bg-cream hover:border-gold inline-flex items-center justify-center gap-2 text-[12px] font-serif font-medium tracking-[0.12em] uppercase transition-colors">
                  <Icon name="upload" className="w-4 h-4" />
                  Upload Document
                </button>
              </div>
            </div>
          )}

          {tab === 'activity' && (
            <div className="space-y-3">
              {[
                { who: 'Asiimwe Miriam', what: 'created assignment & generated engagement letter', when: assignment.startDate },
                { who: assignment.assignedAppraiser, what: 'completed site inspection', when: assignment.startDate },
                { who: 'Anthony Chang', what: 'uploaded comparable sales analysis', when: assignment.startDate },
                { who: assignment.assignedAppraiser, what: `advanced stage to ${STAGE_LABEL[assignment.stage]}`, when: assignment.startDate },
              ].map((a, i) => (
                <div key={i} className="bg-white border border-gold/15 rounded-[3px] p-3">
                  <p className="font-serif text-[13px] text-navy">
                    <span className="font-medium">{a.who}</span> <span className="text-slate">{a.what}</span>
                  </p>
                  <p className="text-slate-light text-[11px] font-serif mt-0.5">{formatDate(a.when)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

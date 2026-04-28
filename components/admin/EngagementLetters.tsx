'use client'

import { useMemo, useState } from 'react'
import Icon from './Icon'
import {
  mockLetters,
  ENGAGEMENT_TEMPLATES,
  formatDate,
  type EngagementLetter,
} from '@/lib/admin/mockData'

const STATUS_STYLES: Record<EngagementLetter['status'], string> = {
  Draft: 'bg-cream text-slate border-slate/30',
  Sent: 'bg-ocean/10 text-ocean-dark border-ocean/30',
  Signed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Declined: 'bg-red-50 text-red-700 border-red-200',
}

export default function EngagementLetters() {
  const [filter, setFilter] = useState<EngagementLetter['status'] | 'all'>('all')
  const [showGenerator, setShowGenerator] = useState(false)

  const filtered = useMemo(() => {
    if (filter === 'all') return mockLetters
    return mockLetters.filter((l) => l.status === filter)
  }, [filter])

  const counts = mockLetters.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Finance</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Engagement <span className="italic text-gold">Letters</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            Generate, send, and track signed contracts for new appraisal engagements
          </p>
        </div>
        <button
          onClick={() => setShowGenerator(true)}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
        >
          <Icon name="plus" className="w-[14px] h-[14px]" />
          Generate Letter
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(['Draft', 'Sent', 'Signed', 'Declined'] as const).map((s) => (
          <div key={s} className="bg-white border border-gold/15 rounded-[4px] p-4">
            <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">{s}</p>
            <p className="font-serif text-[28px] text-navy font-light leading-none mt-2">{counts[s] || 0}</p>
            <p className="text-slate-light text-[11px] font-serif mt-1.5">
              {s === 'Draft' ? 'awaiting review' : s === 'Sent' ? 'pending signature' : s === 'Signed' ? 'engaged' : 'no engagement'}
            </p>
          </div>
        ))}
      </div>

      {/* Templates strip */}
      <div className="bg-white border border-gold/15 rounded-[4px] p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              Templates
            </p>
            <h3 className="font-serif text-[18px] text-navy mt-0.5">Quick-Start Templates</h3>
          </div>
          <button className="text-[11px] font-serif tracking-[0.12em] uppercase text-gold-dark hover:text-gold border-b border-gold/40 hover:border-gold pb-0.5">
            Manage Templates
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {ENGAGEMENT_TEMPLATES.map((t) => (
            <button
              key={t}
              onClick={() => setShowGenerator(true)}
              className="inline-flex items-center gap-1.5 px-3 h-8 rounded-[3px] bg-cream/50 border border-gold/15 text-navy hover:bg-white hover:border-gold/40 text-[12px] font-serif tracking-[0.04em] transition-colors"
            >
              <Icon name="fileText" className="w-3.5 h-3.5 text-gold" />
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white border border-gold/15 rounded-[4px] p-3 flex flex-wrap gap-2">
        {(['all', 'Draft', 'Sent', 'Signed', 'Declined'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 h-8 rounded-[3px] border text-[11px] font-serif font-medium tracking-[0.08em] uppercase transition-colors ${
              filter === f
                ? 'bg-navy text-white border-navy'
                : 'bg-cream/50 text-navy border-gold/15 hover:border-gold/40 hover:bg-white'
            }`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {/* Letters table */}
      <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream/60 border-b border-gold/15">
                {['ID', 'Client · Property', 'Template', 'Fee', 'Status', 'Created', 'Actions'].map((h) => (
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
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-cream/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-slate text-[11px]">{l.id}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-serif text-[14px] text-navy font-medium">{l.client}</p>
                    <p className="text-slate text-[12px] font-serif truncate max-w-[280px]">{l.property}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] rounded-[2px] border border-gold/25 text-gold-dark bg-gold/10">
                      {l.template}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-serif text-[14px] text-navy font-medium tabular-nums">
                      ${l.fee.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] border ${STATUS_STYLES[l.status]}`}>
                      <span className="w-1 h-1 rounded-full bg-current" />
                      {l.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-serif text-[13px] text-navy">{formatDate(l.createdAt)}</p>
                    {l.sentTo && (
                      <p className="text-slate-light text-[11px] truncate max-w-[180px]">→ {l.sentTo}</p>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-light hover:text-navy hover:bg-cream rounded-[3px] transition-colors" title="View PDF">
                        <Icon name="eye" className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-light hover:text-gold-dark hover:bg-gold/10 rounded-[3px] transition-colors" title="Edit">
                        <Icon name="edit" className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-light hover:text-emerald-700 hover:bg-emerald-50 rounded-[3px] transition-colors" title="Download">
                        <Icon name="download" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showGenerator && <GeneratorModal onClose={() => setShowGenerator(false)} />}
    </div>
  )
}

function GeneratorModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-cream w-full max-w-[640px] max-h-[90vh] overflow-y-auto rounded-[4px] border border-gold/20 shadow-2xl"
      >
        <div className="px-6 py-4 border-b border-gold/15 flex items-center justify-between sticky top-0 bg-cream z-10">
          <div>
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Generate</p>
            <h3 className="font-serif text-[20px] text-navy mt-0.5">New Engagement Letter</h3>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-[3px] border border-gold/20 text-navy hover:bg-white flex items-center justify-center">
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium block mb-1.5">
              Template
            </label>
            <select className="w-full h-11 bg-white border border-gold/20 rounded-[3px] px-3 text-[14px] font-serif text-navy focus:border-gold focus:outline-none">
              {ENGAGEMENT_TEMPLATES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium block mb-1.5">
                Client Name
              </label>
              <input className="w-full h-11 bg-white border border-gold/20 rounded-[3px] px-3 text-[14px] font-serif text-navy focus:border-gold focus:outline-none" placeholder="e.g., First Hawaiian Bank" />
            </div>
            <div>
              <label className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium block mb-1.5">
                Client Email
              </label>
              <input className="w-full h-11 bg-white border border-gold/20 rounded-[3px] px-3 text-[14px] font-serif text-navy focus:border-gold focus:outline-none" placeholder="contact@client.com" />
            </div>
          </div>

          <div>
            <label className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium block mb-1.5">
              Property Address
            </label>
            <input className="w-full h-11 bg-white border border-gold/20 rounded-[3px] px-3 text-[14px] font-serif text-navy focus:border-gold focus:outline-none" placeholder="Full property address" />
          </div>

          <div>
            <label className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium block mb-1.5">
              Scope of Work
            </label>
            <textarea
              className="w-full min-h-[90px] bg-white border border-gold/20 rounded-[3px] p-3 text-[14px] font-serif text-navy focus:border-gold focus:outline-none resize-y"
              placeholder="Describe the appraisal scope, intended use, and deliverables…"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium block mb-1.5">
                Fee
              </label>
              <div className="flex items-center bg-white border border-gold/20 rounded-[3px] focus-within:border-gold transition-colors">
                <span className="pl-3 text-slate font-serif">$</span>
                <input className="flex-1 h-11 bg-transparent px-2 text-[14px] font-serif text-navy outline-none" placeholder="14,500" />
              </div>
            </div>
            <div>
              <label className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium block mb-1.5">
                Delivery Deadline
              </label>
              <input type="date" className="w-full h-11 bg-white border border-gold/20 rounded-[3px] px-3 text-[14px] font-serif text-navy focus:border-gold focus:outline-none" />
            </div>
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-[3px] p-4 flex items-start gap-3">
            <span className="text-gold mt-0.5">
              <Icon name="sparkle" className="w-4 h-4" />
            </span>
            <div>
              <p className="font-serif text-[13px] text-navy font-medium">Auto-fill from CRM</p>
              <p className="text-slate text-[12px] font-serif font-light mt-0.5">
                Type a client name to auto-populate prior contact details and address.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-gold/15">
            <button onClick={onClose} className="flex-1 h-11 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
              Generate &amp; Email
            </button>
            <button className="h-11 px-4 rounded-[3px] border border-gold/25 text-navy hover:bg-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
              Save Draft
            </button>
            <button onClick={onClose} className="h-11 px-4 rounded-[3px] text-slate hover:text-navy text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

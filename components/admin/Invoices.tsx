'use client'

import { useMemo, useState } from 'react'
import Icon from './Icon'
import { mockInvoices, formatDate, type InvoiceStatus } from '@/lib/admin/mockData'

const STATUS_STYLES: Record<InvoiceStatus, string> = {
  Draft: 'bg-cream text-slate border-slate/30',
  Sent: 'bg-ocean/10 text-ocean-dark border-ocean/30',
  Paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Overdue: 'bg-red-50 text-red-700 border-red-200',
}

export default function Invoices() {
  const [filter, setFilter] = useState<InvoiceStatus | 'all'>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return mockInvoices
    return mockInvoices.filter((i) => i.status === filter)
  }, [filter])

  const totalBilled = mockInvoices.reduce((s, i) => s + i.amount, 0)
  const totalPaid = mockInvoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.amount, 0)
  const totalOutstanding = mockInvoices.filter((i) => i.status !== 'Paid').reduce((s, i) => s + i.amount, 0)
  const totalOverdue = mockInvoices.filter((i) => i.status === 'Overdue').reduce((s, i) => s + i.amount, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Finance</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            <span className="italic text-gold">Invoices</span> &amp; Payments
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            Generate invoices linked to assignments &middot; track paid &amp; outstanding balances
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] border border-gold/25 text-navy hover:bg-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
            <Icon name="download" className="w-[14px] h-[14px]" />
            Export Aging Report
          </button>
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
            <Icon name="plus" className="w-[14px] h-[14px]" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-gold/15 rounded-[4px] p-4">
          <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">Total Billed</p>
          <p className="font-serif text-[28px] text-navy font-light leading-none mt-2 tabular-nums">
            ${(totalBilled / 1000).toFixed(1)}k
          </p>
          <p className="text-slate-light text-[11px] font-serif mt-1.5">last 90 days</p>
        </div>
        <div className="bg-white border border-emerald-200 rounded-[4px] p-4">
          <p className="text-emerald-700 text-[10px] tracking-[0.22em] uppercase font-serif font-medium">Collected</p>
          <p className="font-serif text-[28px] text-emerald-700 font-light leading-none mt-2 tabular-nums">
            ${(totalPaid / 1000).toFixed(1)}k
          </p>
          <p className="text-slate-light text-[11px] font-serif mt-1.5">{Math.round((totalPaid / totalBilled) * 100)}% of billed</p>
        </div>
        <div className="bg-white border border-ocean/30 rounded-[4px] p-4">
          <p className="text-ocean-dark text-[10px] tracking-[0.22em] uppercase font-serif font-medium">Outstanding</p>
          <p className="font-serif text-[28px] text-ocean-dark font-light leading-none mt-2 tabular-nums">
            ${(totalOutstanding / 1000).toFixed(1)}k
          </p>
          <p className="text-slate-light text-[11px] font-serif mt-1.5">awaiting payment</p>
        </div>
        <div className={`bg-white border rounded-[4px] p-4 ${totalOverdue > 0 ? 'border-red-200' : 'border-gold/15'}`}>
          <p className={`text-[10px] tracking-[0.22em] uppercase font-serif font-medium ${totalOverdue > 0 ? 'text-red-700' : 'text-slate'}`}>
            Overdue
          </p>
          <p className={`font-serif text-[28px] font-light leading-none mt-2 tabular-nums ${totalOverdue > 0 ? 'text-red-700' : 'text-navy'}`}>
            ${(totalOverdue / 1000).toFixed(1)}k
          </p>
          <p className="text-slate-light text-[11px] font-serif mt-1.5">
            {mockInvoices.filter((i) => i.status === 'Overdue').length} invoices &middot; needs follow-up
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white border border-gold/15 rounded-[4px] p-3 flex flex-wrap gap-2">
        {(['all', 'Draft', 'Sent', 'Paid', 'Overdue'] as const).map((f) => (
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
            {f !== 'all' && (
              <span className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[16px] px-1 rounded-full bg-gold/15 text-gold-dark text-[10px] font-sans font-semibold">
                {mockInvoices.filter((i) => i.status === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Invoices table */}
      <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream/60 border-b border-gold/15">
                {['Invoice #', 'Client · Service', 'Amount', 'Issued', 'Due', 'Status', 'Aging', ''].map((h) => (
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
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-cream/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-mono text-[12px] text-navy">{inv.id}</p>
                    <p className="font-mono text-[10px] text-slate-light mt-0.5">{inv.assignmentId}</p>
                  </td>
                  <td className="px-5 py-3.5 max-w-[260px]">
                    <p className="font-serif text-[14px] text-navy font-medium truncate">{inv.client}</p>
                    <p className="text-slate text-[12px] font-serif truncate">{inv.service}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-serif text-[15px] text-navy font-medium tabular-nums">
                      ${inv.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-serif text-[13px] text-navy">{formatDate(inv.issueDate)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-serif text-[13px] text-navy">{formatDate(inv.dueDate)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] border ${STATUS_STYLES[inv.status]}`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current" />
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {inv.status === 'Paid' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 text-[12px] font-serif">
                        <Icon name="check" className="w-3.5 h-3.5" />
                        {inv.daysOutstanding}d to pay
                      </span>
                    ) : inv.status === 'Overdue' ? (
                      <span className="inline-flex items-center gap-1 text-red-600 text-[12px] font-serif font-medium">
                        <Icon name="warning" className="w-3.5 h-3.5" />
                        {inv.daysOutstanding}d overdue
                      </span>
                    ) : (
                      <span className="text-slate text-[12px] font-serif">{inv.daysOutstanding}d open</span>
                    )}
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-light hover:text-navy hover:bg-cream rounded-[3px]" title="View">
                        <Icon name="eye" className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-light hover:text-emerald-700 hover:bg-emerald-50 rounded-[3px]" title="Mark paid">
                        <Icon name="check" className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-light hover:text-gold-dark hover:bg-gold/10 rounded-[3px]" title="Send reminder">
                        <Icon name="mail" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

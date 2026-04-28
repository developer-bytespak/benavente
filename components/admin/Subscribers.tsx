'use client'

import { useMemo, useState } from 'react'
import Icon from './Icon'
import { mockSubscribers, formatDate, relativeTime } from '@/lib/admin/mockData'

export default function Subscribers() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return mockSubscribers
    const q = search.toLowerCase()
    return mockSubscribers.filter(
      (s) => s.email.toLowerCase().includes(q) || s.name.toLowerCase().includes(q),
    )
  }, [search])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">CRM</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Newsletter <span className="italic text-gold">Subscribers</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            {mockSubscribers.length} active subscribers &middot; growing 22% month-over-month
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] border border-gold/25 text-navy hover:bg-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
            <Icon name="download" className="w-[14px] h-[14px]" />
            Export CSV
          </button>
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-navy text-white hover:bg-navy-light text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
            <Icon name="mail" className="w-[14px] h-[14px]" />
            Compose Newsletter
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Subscribers', value: '234', sub: 'across all sources' },
          { label: 'New This Month', value: '42', sub: '+22% vs March' },
          { label: 'Open Rate', value: '46%', sub: 'last campaign' },
          { label: 'Click-Through', value: '8.4%', sub: 'industry avg 2.6%' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gold/15 rounded-[4px] p-4">
            <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">
              {s.label}
            </p>
            <p className="font-serif text-[30px] text-navy font-light leading-none mt-2">{s.value}</p>
            <p className="text-slate-light text-[12px] font-serif mt-1.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white border border-gold/15 rounded-[4px] p-3">
        <div className="flex items-center gap-2 bg-cream border border-gold/20 rounded-[3px] h-10 px-3 focus-within:border-gold transition-colors">
          <Icon name="search" className="w-[16px] h-[16px] text-slate-light" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscribers by email or name…"
            className="flex-1 bg-transparent outline-none text-[14px] font-serif text-navy placeholder:text-slate-light/60"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream/60 border-b border-gold/15">
                {['Subscriber', 'Email', 'Source', 'Subscribed', ''].map((h) => (
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
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-cream/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-serif text-[12px] font-medium shrink-0">
                        {sub.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                      <div className="min-w-0">
                        <p className="font-serif text-[14px] text-navy font-medium truncate">{sub.name}</p>
                        <p className="font-mono text-slate-light text-[10px] truncate">{sub.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] font-serif text-navy">{sub.email}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] rounded-[2px] border border-gold/30 text-gold-dark bg-gold/10">
                      {sub.source}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-[13px] font-serif text-navy">{formatDate(sub.signedUpAt)}</p>
                    <p className="text-slate-light text-[11px] font-serif">{relativeTime(sub.signedUpAt)}</p>
                  </td>
                  <td className="px-3 py-3.5 text-right">
                    <button className="text-slate-light hover:text-red-600 p-1.5 rounded-[3px] hover:bg-red-50 transition-colors">
                      <Icon name="trash" className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center font-serif text-slate-light">No subscribers match.</div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-gold/15 bg-cream/30 text-[12px] font-serif text-slate">
          Showing <span className="font-medium text-navy">{filtered.length}</span> of{' '}
          <span className="font-medium text-navy">{mockSubscribers.length}</span> subscribers
        </div>
      </div>
    </div>
  )
}

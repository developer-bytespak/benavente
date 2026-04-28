'use client'

import { useMemo, useState } from 'react'
import Icon from './Icon'
import { mockComps, formatDate, type Comp } from '@/lib/admin/mockData'

const PROPERTY_TYPES = ['All Types', 'Office', 'Retail', 'Industrial', 'Hotel', 'Multi-Family', 'Vacant Land', 'Special Use']
const REGIONS = ['All Regions', 'O‘ahu', 'Maui', 'Hawai‘i Island', 'Guam', 'Saipan']

export default function CompsLibrary() {
  const [type, setType] = useState('All Types')
  const [region, setRegion] = useState('All Regions')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Comp | null>(null)

  const filtered = useMemo(() => {
    return mockComps.filter((c) => {
      if (type !== 'All Types' && c.propertyType !== type) return false
      if (region !== 'All Regions' && c.region !== region) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          c.address.toLowerCase().includes(q) ||
          c.submarket.toLowerCase().includes(q) ||
          c.buyer.toLowerCase().includes(q) ||
          c.seller.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [type, region, search])

  const totalValue = filtered.reduce((sum, c) => sum + c.salePrice, 0)
  const avgCapRate = filtered.filter((c) => c.capRate).reduce((s, c) => s + (c.capRate || 0), 0) / filtered.filter((c) => c.capRate).length || 0
  const avgPerSqft = filtered.filter((c) => c.pricePerSqft > 0).reduce((s, c) => s + c.pricePerSqft, 0) / filtered.filter((c) => c.pricePerSqft > 0).length || 0

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Operations</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Comparable Sales <span className="italic text-gold">Library</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            {mockComps.length} verified comps in database &middot; updated daily by market analysts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] border border-gold/25 text-navy hover:bg-white text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
            <Icon name="download" className="w-[14px] h-[14px]" />
            Export Set
          </button>
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
            <Icon name="plus" className="w-[14px] h-[14px]" />
            Add Comp
          </button>
        </div>
      </div>

      {/* Aggregates */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: 'Comps in Set', v: filtered.length, sub: `of ${mockComps.length} total` },
          { l: 'Total Value', v: `$${(totalValue / 1_000_000).toFixed(1)}M`, sub: 'aggregate sale prices' },
          { l: 'Avg Cap Rate', v: avgCapRate ? `${avgCapRate.toFixed(2)}%` : '—', sub: 'where applicable' },
          { l: 'Avg $/sqft', v: avgPerSqft ? `$${Math.round(avgPerSqft)}` : '—', sub: 'building area basis' },
        ].map((s) => (
          <div key={s.l} className="bg-white border border-gold/15 rounded-[4px] p-4">
            <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">{s.l}</p>
            <p className="font-serif text-[28px] text-navy font-light leading-none mt-2">{s.v}</p>
            <p className="text-slate-light text-[11px] font-serif mt-1.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gold/15 rounded-[4px] p-3">
        <div className="flex flex-wrap gap-2 mb-2.5">
          <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium self-center mr-1">
            Property Type:
          </p>
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`px-3 h-8 rounded-[3px] border text-[11px] font-serif font-medium tracking-[0.08em] uppercase transition-colors ${
                type === t
                  ? 'bg-navy text-white border-navy'
                  : 'bg-cream/50 text-navy border-gold/15 hover:border-gold/40 hover:bg-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gold/10">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="h-9 bg-cream border border-gold/20 rounded-[3px] px-3 text-[12px] font-serif text-navy focus:border-gold focus:outline-none"
          >
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select className="h-9 bg-cream border border-gold/20 rounded-[3px] px-3 text-[12px] font-serif text-navy focus:border-gold focus:outline-none">
            <option>Last 24 months</option>
            <option>Last 12 months</option>
            <option>Last 6 months</option>
            <option>Custom range</option>
          </select>
          <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-cream border border-gold/20 rounded-[3px] h-9 px-3">
            <Icon name="search" className="w-[16px] h-[16px] text-slate-light" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search address, submarket, buyer, seller, or ID…"
              className="flex-1 bg-transparent outline-none text-[13px] font-serif text-navy placeholder:text-slate-light/60"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-[3px] border border-gold/20 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.08em] uppercase transition-colors">
            <Icon name="filter" className="w-3.5 h-3.5" />
            Cap Rate / Price
          </button>
        </div>
      </div>

      {/* Comps table */}
      <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream/60 border-b border-gold/15">
                {['Sale Date', 'Property', 'Submarket', 'Sale Price', '$/sqft', 'Cap Rate', 'Used In', ''].map((h) => (
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
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className="hover:bg-cream/40 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5 align-middle">
                    <p className="font-serif text-[13px] text-navy tabular-nums">{formatDate(c.saleDate)}</p>
                    <p className="font-mono text-[10px] text-slate-light mt-0.5">{c.id}</p>
                  </td>
                  <td className="px-5 py-3.5 max-w-[280px]">
                    <div className="flex items-start gap-2">
                      {c.verified && (
                        <span title="Verified comp" className="text-emerald-700 mt-0.5 shrink-0">
                          <Icon name="check" className="w-4 h-4" />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="font-serif text-[13px] text-navy font-medium truncate">{c.address}</p>
                        <p className="text-slate-light text-[11px] font-serif">
                          {c.propertyType} &middot; {c.subtype}
                          {c.yearBuilt > 0 && ` · Built ${c.yearBuilt}`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-serif text-[13px] text-navy">{c.submarket}</p>
                    <p className="text-slate-light text-[11px] font-serif">{c.region}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-serif text-[14px] text-navy font-medium tabular-nums">
                      ${(c.salePrice / 1_000_000).toFixed(2)}M
                    </span>
                    {c.buildingSize > 0 && (
                      <p className="text-slate-light text-[11px] font-serif tabular-nums">
                        {c.buildingSize.toLocaleString()} sqft
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {c.pricePerSqft > 0 ? (
                      <span className="font-serif text-[14px] text-navy tabular-nums">
                        ${c.pricePerSqft}
                      </span>
                    ) : (
                      <span className="text-slate-light text-[12px] font-serif italic">land</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {c.capRate ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] bg-emerald-50 border border-emerald-200 font-serif text-[12px] text-emerald-700 tabular-nums">
                        {c.capRate.toFixed(2)}%
                      </span>
                    ) : (
                      <span className="text-slate-light text-[12px] font-serif italic">n/a</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2 rounded-full bg-gold/15 text-gold-dark font-serif text-[12px] font-medium">
                      {c.usedInCount}×
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <Icon name="chevronRight" className="w-4 h-4 text-slate-light" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gold/15 bg-cream/30 text-[12px] font-serif text-slate">
          <span className="font-medium text-navy">{filtered.length}</span> of{' '}
          <span className="font-medium text-navy">{mockComps.length}</span> comps shown &middot;
          {' '}<span className="text-slate-light">verified ✓ = sale price &amp; terms confirmed with party</span>
        </div>
      </div>

      {selected && <CompDetail comp={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function CompDetail({ comp, onClose }: { comp: Comp; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-cream w-full max-w-[520px] h-full overflow-y-auto shadow-2xl border-l border-gold/20"
      >
        <div className="sticky top-0 bg-cream/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-gold/15 flex items-center justify-between">
          <div>
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Comparable</p>
            <p className="font-mono text-slate text-[12px] mt-0.5">{comp.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-[3px] border border-gold/20 text-navy hover:bg-white flex items-center justify-center"
          >
            <Icon name="close" className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h3 className="font-serif text-[22px] text-navy leading-tight">{comp.address}</h3>
            <p className="font-serif text-[14px] text-slate mt-1">
              {comp.submarket}, {comp.region}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] rounded-[2px] border border-navy/15 text-navy bg-cream">
                {comp.propertyType}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] rounded-[2px] border border-gold/30 text-gold-dark bg-gold/10">
                {comp.subtype}
              </span>
              {comp.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] rounded-[2px] border border-emerald-200 text-emerald-700 bg-emerald-50">
                  <Icon name="check" className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { l: 'Sale Date', v: formatDate(comp.saleDate) },
              { l: 'Sale Price', v: `$${comp.salePrice.toLocaleString()}` },
              { l: 'Building Size', v: comp.buildingSize > 0 ? `${comp.buildingSize.toLocaleString()} sqft` : '— (land)' },
              { l: 'Price / sqft', v: comp.pricePerSqft > 0 ? `$${comp.pricePerSqft}` : 'n/a' },
              { l: 'Cap Rate', v: comp.capRate ? `${comp.capRate.toFixed(2)}%` : 'n/a' },
              { l: 'Year Built', v: comp.yearBuilt > 0 ? comp.yearBuilt : '—' },
            ].map((kv) => (
              <div key={kv.l} className="bg-white border border-gold/15 rounded-[3px] p-3">
                <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">
                  {kv.l}
                </p>
                <p className="font-serif text-[15px] text-navy mt-1 tabular-nums">{kv.v}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gold/15 rounded-[3px] p-4 space-y-2">
            <div>
              <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">Buyer</p>
              <p className="font-serif text-[14px] text-navy mt-0.5">{comp.buyer}</p>
            </div>
            <div>
              <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">Seller</p>
              <p className="font-serif text-[14px] text-navy mt-0.5">{comp.seller}</p>
            </div>
            <div>
              <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">Source</p>
              <p className="font-serif text-[14px] text-navy mt-0.5">{comp.source}</p>
            </div>
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-[3px] p-4">
            <p className="text-gold-dark text-[10px] tracking-[0.22em] uppercase font-serif font-medium">
              Usage History
            </p>
            <p className="font-serif text-[14px] text-navy mt-1 leading-[1.6]">
              Used in <span className="font-medium">{comp.usedInCount}</span> previous appraisals.
              {' '}
              <button className="text-gold-dark hover:text-gold underline-offset-2 hover:underline font-medium">
                View assignments →
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

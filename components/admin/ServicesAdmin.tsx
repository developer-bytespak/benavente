'use client'

import Icon from './Icon'
import { servicesAdmin } from '@/lib/admin/mockData'

export default function ServicesAdmin() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Content</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Services <span className="italic text-gold">Offered</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            {servicesAdmin.length} services &middot; surfaced in Services Grid &amp; Ticker
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
          <Icon name="plus" className="w-[14px] h-[14px]" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {servicesAdmin.map((s) => (
          <div
            key={s.id}
            className="group bg-white border border-gold/15 rounded-[4px] p-5 hover:border-gold/40 transition-colors"
          >
            <div className="flex items-start gap-4">
              <span className="font-serif text-gold text-[12px] tracking-[0.22em] font-medium shrink-0">
                {s.number}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-[18px] text-navy leading-tight">{s.name}</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    <span className="w-1 h-1 rounded-full bg-emerald-700" />
                    Visible
                  </span>
                </div>
                <p className="font-serif font-light text-[14px] text-navy/80 leading-[1.65] mt-2">
                  {s.shortDesc}
                </p>
                <div className="mt-4 pt-3 border-t border-gold/10 flex items-center gap-1">
                  <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-[3px] border border-gold/25 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.12em] uppercase transition-colors">
                    <Icon name="edit" className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-[3px] border border-gold/25 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.12em] uppercase transition-colors">
                    <Icon name="eyeOff" className="w-3.5 h-3.5" />
                    Hide
                  </button>
                  <button className="inline-flex items-center justify-center w-8 h-8 rounded-[3px] border border-gold/25 text-slate-light hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors ml-auto" title="Delete">
                    <Icon name="trash" className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

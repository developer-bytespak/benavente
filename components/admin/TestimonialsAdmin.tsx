'use client'

import Icon from './Icon'
import { testimonialsAdmin } from '@/lib/admin/mockData'

export default function TestimonialsAdmin() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Content</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Client <span className="italic text-gold">Testimonials</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            {testimonialsAdmin.length} testimonials &middot; the featured quote shows on the homepage
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
          <Icon name="plus" className="w-[14px] h-[14px]" />
          Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {testimonialsAdmin.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-gold/15 rounded-[4px] p-6 hover:border-gold/40 transition-colors"
          >
            <div className="flex items-start gap-4">
              <span className="font-serif text-gold/30 text-[64px] leading-none shrink-0 select-none">
                &ldquo;
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    {t.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.08em] uppercase rounded-[2px] bg-gold/15 text-gold-dark border border-gold/30">
                        <Icon name="star" className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.08em] uppercase rounded-[2px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1 h-1 rounded-full bg-emerald-700" />
                      Visible
                    </span>
                  </div>
                  <span className="font-mono text-slate-light text-[10px]">{t.id}</span>
                </div>
                <p className="font-serif italic text-[18px] text-navy leading-[1.55] mt-3">
                  {t.quote}
                </p>
                <div className="mt-4 pt-3 border-t border-gold/10 flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="font-serif text-[14px] text-navy font-medium">{t.author}</p>
                    <p className="text-slate text-[12px] tracking-[0.05em] font-serif">{t.role}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-[3px] border border-gold/25 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.12em] uppercase transition-colors">
                      <Icon name="edit" className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    {!t.featured && (
                      <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-[3px] border border-gold/25 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.12em] uppercase transition-colors">
                        <Icon name="star" className="w-3.5 h-3.5" />
                        Set Featured
                      </button>
                    )}
                    <button className="inline-flex items-center justify-center w-8 h-8 rounded-[3px] border border-gold/25 text-slate-light hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors" title="Delete">
                      <Icon name="trash" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

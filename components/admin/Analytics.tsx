'use client'

import Icon from './Icon'
import { leadFunnel, mockCvDownloads, sourceAttribution, formatDate, relativeTime } from '@/lib/admin/mockData'

export default function Analytics() {
  const topConvert = leadFunnel[0].count
  const finalConvert = leadFunnel[leadFunnel.length - 1].count
  const conversionRate = ((finalConvert / topConvert) * 100).toFixed(1)
  const totalRevenue = leadFunnel[leadFunnel.length - 1].value
  const totalDownloads = mockCvDownloads.reduce((s, c) => s + c.downloadsLast30, 0)

  return (
    <div className="space-y-5">
      <div>
        <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Intelligence</p>
        <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
          Conversion <span className="italic text-gold">Analytics</span>
        </h2>
        <p className="text-slate text-[13px] font-serif mt-1">
          Lead-to-revenue funnel &middot; CV download intelligence &middot; referral attribution
        </p>
      </div>

      {/* Headline KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-navy to-navy-light rounded-[4px] p-5 text-white border border-gold/20 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gold/10 blur-2xl" />
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium relative">
            Inquiry → Paid
          </p>
          <p className="font-serif text-[40px] font-light leading-none mt-2 tabular-nums relative">
            {conversionRate}%
          </p>
          <p className="text-white/55 text-[12px] font-serif mt-1.5 relative">
            {finalConvert} of {topConvert} leads converted to revenue
          </p>
        </div>
        <div className="bg-white border border-emerald-200 rounded-[4px] p-5">
          <p className="text-emerald-700 text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
            Revenue Collected
          </p>
          <p className="font-serif text-[40px] text-emerald-700 font-light leading-none mt-2 tabular-nums">
            ${(totalRevenue / 1000).toFixed(0)}k
          </p>
          <p className="text-slate-light text-[12px] font-serif mt-1.5">last 90 days &middot; from {finalConvert} engagements</p>
        </div>
        <div className="bg-white border border-gold/15 rounded-[4px] p-5">
          <p className="text-slate text-[10px] tracking-[0.28em] uppercase font-serif font-medium">CV Downloads</p>
          <p className="font-serif text-[40px] text-navy font-light leading-none mt-2 tabular-nums">
            {totalDownloads}
          </p>
          <p className="text-slate-light text-[12px] font-serif mt-1.5">last 30 days &middot; across all team members</p>
        </div>
      </div>

      {/* Funnel */}
      <div className="bg-white border border-gold/15 rounded-[4px] p-6">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Funnel</p>
            <h3 className="font-serif text-[20px] text-navy mt-1">Lead-to-Revenue Pipeline</h3>
          </div>
          <span className="text-slate text-[12px] font-serif">last 90 days</span>
        </div>
        <div className="space-y-2">
          {leadFunnel.map((stage, i) => {
            const widthPct = (stage.count / leadFunnel[0].count) * 100
            const dropPct = i === 0 ? null : Math.round(((leadFunnel[i - 1].count - stage.count) / leadFunnel[i - 1].count) * 100)
            return (
              <div key={stage.stage} className="space-y-1">
                <div className="flex items-center justify-between text-[12px] font-serif">
                  <span className="text-navy font-medium">{stage.stage}</span>
                  <div className="flex items-center gap-3">
                    {stage.value > 0 && (
                      <span className="text-emerald-700 tabular-nums font-medium">
                        ${(stage.value / 1000).toFixed(0)}k
                      </span>
                    )}
                    <span className="text-slate-light">{stage.hint}</span>
                    {dropPct !== null && dropPct > 0 && (
                      <span className="text-red-600 tabular-nums">−{dropPct}%</span>
                    )}
                  </div>
                </div>
                <div className="relative h-9 bg-cream/40 rounded-[3px] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-navy to-gold flex items-center px-4 transition-all duration-700"
                    style={{ width: `${widthPct}%` }}
                  >
                    <span className="font-serif text-white text-[14px] font-medium tabular-nums">
                      {stage.count}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Source attribution + CV downloads */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Source attribution */}
        <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
          <div className="px-5 py-4 border-b border-gold/15">
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              Attribution
            </p>
            <h3 className="font-serif text-[18px] text-navy mt-0.5">Top Lead Sources</h3>
            <p className="text-slate text-[12px] font-serif mt-0.5">
              Where your leads come from &middot; conversion rates &middot; avg fee
            </p>
          </div>
          <div className="divide-y divide-gold/10">
            {sourceAttribution.map((s) => (
              <div key={s.source} className="px-5 py-3 hover:bg-cream/40 transition-colors">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <p className="font-serif text-[14px] text-navy font-medium truncate">{s.source}</p>
                  <span className="font-serif text-[14px] text-navy font-medium tabular-nums shrink-0">
                    {s.count} leads
                  </span>
                </div>
                <div className="h-1 rounded-full bg-cream-deeper overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-700"
                    style={{ width: `${s.pctOfLeads * 4}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-serif">
                  <span className="text-slate-light">{s.pctOfLeads}% of leads</span>
                  <span className="text-emerald-700 font-medium">{s.conversionRate}% convert</span>
                  <span className="text-slate">avg ${(s.avgFee / 1000).toFixed(1)}k</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CV downloads */}
        <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
          <div className="px-5 py-4 border-b border-gold/15">
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              CV Downloads
            </p>
            <h3 className="font-serif text-[18px] text-navy mt-0.5">Team Member Demand</h3>
            <p className="text-slate text-[12px] font-serif mt-0.5">
              Which appraisers attorneys are evaluating &middot; signals litigation demand
            </p>
          </div>
          <div className="divide-y divide-gold/10">
            {mockCvDownloads.map((cv) => {
              const max = Math.max(...mockCvDownloads.map((c) => c.downloadsLast30))
              const widthPct = (cv.downloadsLast30 / max) * 100
              return (
                <div key={cv.teamMember} className="px-5 py-3 hover:bg-cream/40 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif text-white text-[11px] font-medium shrink-0">
                      {cv.initials}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-[13px] text-navy font-medium truncate">{cv.teamMember}</p>
                      <p className="text-slate-light text-[11px] font-serif tracking-[0.04em] truncate">{cv.role}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-serif text-[15px] text-navy font-medium tabular-nums">{cv.downloadsLast30}</p>
                      <p className="text-slate-light text-[10px] font-serif">last 30d</p>
                    </div>
                  </div>
                  <div className="h-1 rounded-full bg-cream-deeper overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-700"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                  <p className="text-slate-light text-[10px] font-serif mt-1.5 truncate">
                    Last: {relativeTime(cv.lastDownloadAt)} &middot; {cv.topSourcePage}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Icon from './Icon'
import {
  mockSubmarkets,
  mockMarketReports,
  formatDate,
  type Submarket,
} from '@/lib/admin/mockData'

export default function MarketData() {
  const [tab, setTab] = useState<'submarkets' | 'reports'>('submarkets')

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Intelligence</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Market <span className="italic text-gold">Data</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            Submarket metrics tracked monthly by Pearl &amp; Anthony &middot; powers research, blog content &amp; client pitches
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
          <Icon name="plus" className="w-[14px] h-[14px]" />
          {tab === 'submarkets' ? 'Add Data Point' : 'New Report'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gold/15 flex gap-1">
        {[
          { k: 'submarkets', l: `Submarket Metrics (${mockSubmarkets.length})` },
          { k: 'reports', l: `Quarterly Reports (${mockMarketReports.length})` },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as typeof tab)}
            className={`px-5 py-3 text-[12px] font-serif font-medium tracking-[0.12em] uppercase transition-colors border-b-2 ${
              tab === t.k ? 'border-gold text-navy' : 'border-transparent text-slate-light hover:text-navy'
            }`}
          >
            {t.l}
          </button>
        ))}
      </div>

      {tab === 'submarkets' ? <SubmarketsView /> : <ReportsView />}
    </div>
  )
}

function SubmarketsView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockSubmarkets.map((sm) => (
        <SubmarketCard key={sm.id} sm={sm} />
      ))}
    </div>
  )
}

function SubmarketCard({ sm }: { sm: Submarket }) {
  const max = Math.max(...sm.sixMonth)
  const min = Math.min(...sm.sixMonth)
  const range = max - min || 1
  const trendColor = sm.trend === 'up' ? 'text-emerald-700' : sm.trend === 'down' ? 'text-red-600' : 'text-slate'
  const isReverse = sm.metric === 'Vacancy %'  // higher vacancy is bad
  const indicatorColor = isReverse
    ? sm.trend === 'up'
      ? 'text-red-600'
      : sm.trend === 'down'
      ? 'text-emerald-700'
      : 'text-slate'
    : trendColor

  const formatValue = (v: number) => {
    if (sm.metric === 'Asking Rent $/sqft') return `$${v.toFixed(2)}`
    if (sm.metric === 'Sales Volume $M') return `$${v}M`
    return `${v.toFixed(1)}%`
  }

  return (
    <div className="bg-white border border-gold/15 rounded-[4px] p-5 hover:border-gold/40 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif text-[18px] text-navy leading-tight">{sm.name}</h3>
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.05em] rounded-[2px] border border-gold/30 text-gold-dark bg-gold/10">
              {sm.region}
            </span>
          </div>
          <p className="text-slate text-[12px] font-serif">{sm.propertyType}</p>
        </div>
        <button className="text-slate-light hover:text-gold-dark p-1.5">
          <Icon name="edit" className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">{sm.metric}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-serif text-[34px] text-navy font-light leading-none tabular-nums">
              {formatValue(sm.current)}
            </span>
            <span className={`inline-flex items-center gap-0.5 font-serif text-[13px] font-medium ${indicatorColor}`}>
              <Icon
                name={sm.trend === 'up' ? 'arrowUp' : sm.trend === 'down' ? 'arrowDown' : 'check'}
                className="w-3 h-3"
                strokeWidth={2.4}
              />
              {sm.delta > 0 ? '+' : ''}
              {sm.delta.toFixed(2)}
            </span>
          </div>
        </div>
        <span className="text-slate-light text-[10px] tracking-[0.18em] uppercase font-serif">
          6-month
        </span>
      </div>

      {/* Mini line chart */}
      <div className="relative h-[72px] mt-2">
        <svg viewBox="0 0 200 72" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad-${sm.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B8935A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#B8935A" stopOpacity="0" />
            </linearGradient>
          </defs>
          {(() => {
            const points = sm.sixMonth.map((v, i) => {
              const x = (i / (sm.sixMonth.length - 1)) * 200
              const y = 60 - ((v - min) / range) * 50 + 6
              return `${x},${y}`
            })
            const linePath = `M ${points.join(' L ')}`
            const areaPath = `${linePath} L 200,72 L 0,72 Z`
            return (
              <>
                <path d={areaPath} fill={`url(#grad-${sm.id})`} />
                <path d={linePath} fill="none" stroke="#B8935A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {sm.sixMonth.map((v, i) => {
                  const x = (i / (sm.sixMonth.length - 1)) * 200
                  const y = 60 - ((v - min) / range) * 50 + 6
                  return <circle key={i} cx={x} cy={y} r="2.5" fill="#B8935A" stroke="#fff" strokeWidth="1.2" />
                })}
              </>
            )
          })()}
        </svg>
      </div>

      <div className="mt-4 pt-3 border-t border-gold/10 flex items-center justify-between text-[11px] font-serif text-slate-light">
        <span>Updated {formatDate(sm.lastUpdated)}</span>
        <span>by {sm.updatedBy.split(' ')[0]}</span>
      </div>
    </div>
  )
}

function ReportsView() {
  return (
    <div className="space-y-3">
      {mockMarketReports.map((r) => {
        const pct = (r.sectionsComplete / r.sectionsTotal) * 100
        return (
          <div
            key={r.id}
            className="bg-white border border-gold/15 rounded-[4px] p-5 hover:border-gold/40 hover:shadow-md hover:shadow-navy/5 transition-all"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] border ${
                      r.status === 'Published'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gold/10 text-gold-dark border-gold/30'
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {r.status}
                  </span>
                  <span className="font-mono text-slate-light text-[10px]">{r.id}</span>
                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.05em] rounded-[2px] border border-navy/15 text-navy bg-cream">
                    {r.quarter}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-serif font-medium tracking-[0.05em] rounded-[2px] border border-gold/25 text-gold-dark bg-gold/10">
                    {r.region}
                  </span>
                </div>
                <h3 className="font-serif text-[18px] text-navy leading-snug">{r.title}</h3>
                <p className="text-slate text-[12px] font-serif mt-1">
                  Author: {r.author}
                  {r.publishedAt && (
                    <>
                      <span className="mx-2 text-slate-light/40">·</span>Published {formatDate(r.publishedAt)}
                    </>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-[3px] border border-gold/25 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.12em] uppercase transition-colors">
                  <Icon name="edit" className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-[3px] bg-navy text-white hover:bg-navy-light text-[11px] font-serif font-medium tracking-[0.12em] uppercase transition-colors">
                  <Icon name="download" className="w-3.5 h-3.5" />
                  PDF
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gold/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate text-[11px] tracking-[0.05em] font-serif">
                  Sections complete: <span className="text-navy font-medium">{r.sectionsComplete}</span> /{' '}
                  {r.sectionsTotal}
                </span>
                <span className="text-slate text-[11px] font-serif tabular-nums">{Math.round(pct)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-cream-deeper overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ${
                    r.status === 'Published'
                      ? 'bg-emerald-600'
                      : 'bg-gradient-to-r from-gold to-gold-light'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

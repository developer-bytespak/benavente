'use client'

import Icon from './Icon'
import { mockLicenses, formatDate, type LicenseStatus } from '@/lib/admin/mockData'

const STATUS_STYLES: Record<LicenseStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Expiring Soon': 'bg-amber-50 text-amber-700 border-amber-200',
  'Renewal Due': 'bg-red-50 text-red-700 border-red-200',
  Expired: 'bg-red-100 text-red-800 border-red-300',
}

export default function LicensesCe() {
  const expiring = mockLicenses.filter((l) => l.status === 'Expiring Soon' || l.status === 'Renewal Due' || l.status === 'Expired')

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Compliance</p>
          <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
            Licenses &amp; <span className="italic text-gold">Continuing Education</span>
          </h2>
          <p className="text-slate text-[13px] font-serif mt-1">
            Track Hawai‘i, Guam &amp; CNMI appraiser licenses &middot; CE hours required for renewal
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
          <Icon name="plus" className="w-[14px] h-[14px]" />
          Add License
        </button>
      </div>

      {/* Alerts strip */}
      {expiring.length > 0 && (
        <div className="bg-gradient-to-br from-red-50 to-amber-50 border border-red-200 rounded-[4px] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="warning" className="w-[20px] h-[20px] text-red-600" />
            <p className="font-serif text-[16px] text-navy font-medium">
              {expiring.length} {expiring.length === 1 ? 'license needs' : 'licenses need'} attention
            </p>
          </div>
          <p className="text-slate text-[13px] font-serif mb-3">
            Practicing without an active license is illegal. CE non-compliance can result in license revocation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {expiring.map((l) => (
              <div key={`alert-${l.licenseNumber}`} className="bg-white border border-red-200 rounded-[3px] p-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center font-serif text-white text-[12px] font-medium shrink-0">
                    {l.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="font-serif text-[13px] text-navy font-medium truncate">{l.teamMember}</p>
                    <p className="text-slate-light text-[11px] font-serif">
                      {l.state} · {l.status}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-serif text-[14px] text-red-600 font-medium tabular-nums">
                    {l.daysToExpiry < 0 ? `${Math.abs(l.daysToExpiry)}d ago` : `${l.daysToExpiry}d`}
                  </p>
                  <p className="text-slate-light text-[10px] font-serif">expiry</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Licenses grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockLicenses.map((l) => {
          const cePct = (l.ceCompleted / l.ceRequired) * 100
          const isComplete = cePct >= 100
          return (
            <div
              key={`${l.teamMember}-${l.licenseNumber}`}
              className="bg-white border border-gold/15 rounded-[4px] p-5 hover:border-gold/40 hover:shadow-md hover:shadow-navy/5 transition-all"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                <div className="flex items-start gap-3">
                  <span className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif text-white text-[14px] font-medium shrink-0">
                    {l.initials}
                  </span>
                  <div>
                    <p className="font-serif text-[16px] text-navy font-medium leading-tight">{l.teamMember}</p>
                    <p className="text-slate text-[12px] font-serif mt-0.5">
                      {l.state} &middot; {l.licenseType}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] border ${STATUS_STYLES[l.status]}`}
                >
                  <span className="w-1 h-1 rounded-full bg-current" />
                  {l.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <p className="text-slate text-[10px] tracking-[0.18em] uppercase font-serif font-medium">License #</p>
                  <p className="font-mono text-[12px] text-navy mt-0.5">{l.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-slate text-[10px] tracking-[0.18em] uppercase font-serif font-medium">Issued</p>
                  <p className="font-serif text-[12px] text-navy mt-0.5">{formatDate(l.issuedAt)}</p>
                </div>
                <div>
                  <p className="text-slate text-[10px] tracking-[0.18em] uppercase font-serif font-medium">Expires</p>
                  <p className={`font-serif text-[12px] mt-0.5 ${l.daysToExpiry < 90 ? 'text-red-600 font-medium' : 'text-navy'}`}>
                    {formatDate(l.expiresAt)}
                  </p>
                </div>
              </div>

              <div className="bg-cream/50 border border-gold/15 rounded-[3px] p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium">
                    Continuing Education
                  </p>
                  <span className={`text-[12px] font-serif tabular-nums ${isComplete ? 'text-emerald-700 font-medium' : 'text-navy'}`}>
                    {l.ceCompleted} / {l.ceRequired} hrs
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-cream-deeper overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      isComplete
                        ? 'bg-emerald-600'
                        : cePct >= 75
                        ? 'bg-gradient-to-r from-gold to-gold-light'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, cePct)}%` }}
                  />
                </div>
                {!isComplete && (
                  <p className="text-slate-light text-[11px] font-serif mt-1.5">
                    {l.ceRequired - l.ceCompleted} more hours needed before renewal
                  </p>
                )}
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-[3px] border border-gold/25 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.08em] uppercase transition-colors">
                  <Icon name="plus" className="w-3.5 h-3.5" />
                  Log CE
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-[3px] border border-gold/25 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.08em] uppercase transition-colors">
                  <Icon name="bell" className="w-3.5 h-3.5" />
                  Renewal Reminder
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import Icon from './Icon'

const PAGE_SEO = [
  { page: 'Home', title: 'The Benavente Group', desc: 'Hawaii-based real estate appraisers and consultants specializing in valuation, market analysis, and litigation support.' },
  { page: 'About', title: 'About | The Benavente Group', desc: 'Learn about The Benavente Group — Hawaii-based real estate appraisers with over 50 years of combined experience.' },
  { page: 'Portfolio', title: 'Portfolio | The Benavente Group', desc: 'Featured projects and assignments across Hawai‘i, Guam, Saipan, the Marshall Islands, and other Pacific Islands.' },
  { page: 'Insights', title: 'Insights | The Benavente Group', desc: 'Real estate market analysis, valuation insights, and commentary on Hawaii and Pacific region property trends.' },
  { page: 'Contact', title: 'Contact | The Benavente Group', desc: 'Request a consultation with The Benavente Group for real estate appraisal, valuation, and consulting services.' },
]

function FieldRow({
  label,
  value,
  hint,
  icon,
}: {
  label: string
  value: string
  hint?: string
  icon: 'pin' | 'phone' | 'mail' | 'calendar' | 'briefcase'
}) {
  return (
    <div>
      <label className="block text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-2 bg-cream border border-gold/20 rounded-[3px] h-11 px-3 focus-within:border-gold transition-colors">
        <Icon name={icon} className="w-[16px] h-[16px] text-gold" />
        <input
          defaultValue={value}
          className="flex-1 bg-transparent outline-none text-[14px] font-serif text-navy"
        />
      </div>
      {hint && <p className="text-slate-light text-[11px] font-serif mt-1">{hint}</p>}
    </div>
  )
}

export default function SettingsAdmin() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Setup</p>
        <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
          Settings &amp; <span className="italic text-gold">SEO</span>
        </h2>
        <p className="text-slate text-[13px] font-serif mt-1">
          Contact details, footer, and per-page search engine metadata.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Contact info */}
        <div className="bg-white border border-gold/15 rounded-[4px]">
          <div className="px-6 py-4 border-b border-gold/15">
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              Office Details
            </p>
            <h3 className="font-serif text-[20px] text-navy mt-0.5 leading-tight">Contact Information</h3>
            <p className="text-slate text-[12px] font-serif mt-0.5">
              Used in footer, contact page, and structured data for SEO.
            </p>
          </div>
          <div className="p-6 grid grid-cols-1 gap-4">
            <FieldRow
              label="Office Address"
              value="Pauahi Tower, Suite 2140, 1003 Bishop Street, Honolulu, HI 96813"
              icon="pin"
            />
            <FieldRow label="Phone" value="(808) 784-4320" icon="phone" />
            <FieldRow label="Email" value="Mail@BenaventeGroup.com" icon="mail" />
            <FieldRow
              label="Business Hours"
              value="Monday – Friday, 8:00 AM – 5:00 PM HST"
              icon="calendar"
            />
            <FieldRow
              label="Service Regions"
              value="Hawai‘i · Guam · Saipan · Marshall Islands · Pacific Islands"
              icon="briefcase"
            />

            <div className="flex items-center gap-2 pt-2">
              <button className="inline-flex items-center gap-2 px-5 h-10 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
                <Icon name="check" className="w-3.5 h-3.5" />
                Save Changes
              </button>
              <button className="inline-flex items-center px-5 h-10 rounded-[3px] border border-gold/25 text-navy hover:bg-cream text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* SEO per page */}
        <div className="bg-white border border-gold/15 rounded-[4px]">
          <div className="px-6 py-4 border-b border-gold/15">
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              Search Engine
            </p>
            <h3 className="font-serif text-[20px] text-navy mt-0.5 leading-tight">Per-Page SEO</h3>
            <p className="text-slate text-[12px] font-serif mt-0.5">
              Title and description shown in Google &amp; social previews.
            </p>
          </div>
          <div className="divide-y divide-gold/10">
            {PAGE_SEO.map((p) => (
              <div key={p.page} className="p-5 group hover:bg-cream/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-serif font-medium tracking-[0.05em] uppercase rounded-[2px] border border-gold/30 text-gold-dark bg-gold/10">
                    {p.page}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 text-slate-light hover:text-gold-dark transition-opacity inline-flex items-center gap-1 text-[11px] font-serif tracking-[0.12em] uppercase">
                    <Icon name="edit" className="w-3 h-3" />
                    Edit
                  </button>
                </div>
                <p className="text-ocean-dark text-[14px] font-serif font-medium leading-tight">
                  {p.title}
                </p>
                <p className="text-slate text-[12px] font-serif font-light leading-[1.55] mt-1 line-clamp-2">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integrations strip */}
      <div className="bg-white border border-gold/15 rounded-[4px] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
              Connected
            </p>
            <h3 className="font-serif text-[20px] text-navy mt-0.5 leading-tight">Integrations</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: 'Google Search Console', status: 'Connected', emoji: 'G' },
            { name: 'Google Analytics 4', status: 'Connected', emoji: 'A' },
            { name: 'Email · Resend', status: 'Connected', emoji: 'R' },
            { name: 'Slack Notifications', status: 'Available', emoji: 'S' },
          ].map((i) => {
            const connected = i.status === 'Connected'
            return (
              <div
                key={i.name}
                className="bg-cream/40 border border-gold/15 rounded-[3px] p-4 flex items-center gap-3"
              >
                <span className="w-10 h-10 rounded-[3px] bg-white border border-gold/20 flex items-center justify-center font-serif font-medium text-navy">
                  {i.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-[13px] text-navy font-medium leading-tight truncate">
                    {i.name}
                  </p>
                  <p
                    className={`text-[11px] font-serif tracking-[0.05em] uppercase mt-0.5 inline-flex items-center gap-1 ${
                      connected ? 'text-emerald-700' : 'text-slate-light'
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${
                        connected ? 'bg-emerald-700' : 'bg-slate-light'
                      }`}
                    />
                    {i.status}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

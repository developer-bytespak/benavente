'use client'

import Icon from './Icon'

const TICKER_ITEMS = [
  'Commercial Appraisal',
  'Market Analysis',
  'Litigation Support',
  'Property Tax Appeal',
  'Consulting',
  'Pacific Region',
  'Residential Valuation',
  'Expert Testimony',
  'Feasibility Studies',
  'Eminent Domain',
  'Portfolio Analysis',
  'Arbitration Support',
]

const STATS = [
  { number: '50+', label: 'Years Combined Experience' },
  { number: '500+', label: 'Completed Assignments' },
  { number: '6', label: 'Pacific Island Regions' },
  { number: '18+', label: 'Property Types Covered' },
]

const MISSION_PILLARS = [
  { num: '01', name: 'Accuracy', desc: 'Every valuation is grounded in rigorous analysis…' },
  { num: '02', name: 'Integrity', desc: 'We provide independent, unbiased assessments…' },
  { num: '03', name: 'Timeliness', desc: 'Our process is built to deliver thorough, court-ready reports on schedule…' },
  { num: '04', name: 'Local Knowledge', desc: 'Deep roots in Hawai‘i and the Pacific give us market insight…' },
]

const HERO_VIDEOS = [
  'video-1_b1dhpi.mp4',
  'video-3_pficky.mp4',
  'video-4_nlyktc.mp4',
  'video-2_u7oohe.mp4',
]

function SectionCard({
  title,
  subtitle,
  children,
  cta,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  cta?: string
}) {
  return (
    <div className="bg-white border border-gold/15 rounded-[4px]">
      <div className="px-6 py-4 border-b border-gold/15 flex items-center justify-between gap-3">
        <div>
          <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
            Homepage Section
          </p>
          <h3 className="font-serif text-[20px] text-navy mt-0.5 leading-tight">{title}</h3>
          <p className="text-slate text-[12px] font-serif mt-0.5">{subtitle}</p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-[3px] border border-gold/25 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.12em] uppercase transition-colors shrink-0">
          <Icon name="edit" className="w-3.5 h-3.5" />
          {cta || 'Edit Section'}
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

export default function SiteContentAdmin() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">Content</p>
        <h2 className="font-serif text-[28px] text-navy mt-1 leading-tight">
          Site <span className="italic text-gold">Content</span>
        </h2>
        <p className="text-slate text-[13px] font-serif mt-1">
          Edit the headline copy, stats, hero videos, mission pillars, and ticker that appear across the website.
        </p>
      </div>

      {/* Hero */}
      <SectionCard
        title="Hero Section"
        subtitle="Background videos &middot; headline &middot; CTA buttons on homepage"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium mb-2">
              Headline
            </p>
            <div className="bg-cream border border-gold/15 rounded-[3px] p-4">
              <p className="font-serif text-[24px] text-navy leading-tight">
                Real Estate <span className="italic text-ocean">Valuation</span>
                <br />&amp; Consultancy
              </p>
            </div>
            <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium mt-4 mb-2">
              CTA Buttons
            </p>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[3px] bg-ocean text-white text-[12px] font-serif">
                Who We Are <Icon name="external" className="w-3 h-3" />
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[3px] border border-navy/20 text-navy text-[12px] font-serif">
                View Our Work <Icon name="external" className="w-3 h-3" />
              </span>
            </div>
          </div>
          <div>
            <p className="text-slate text-[10px] tracking-[0.22em] uppercase font-serif font-medium mb-2">
              Background Videos ({HERO_VIDEOS.length})
            </p>
            <div className="space-y-2">
              {HERO_VIDEOS.map((v, i) => (
                <div
                  key={v}
                  className="flex items-center gap-3 bg-cream/50 border border-gold/15 rounded-[3px] px-3 py-2"
                >
                  <span className="font-mono text-[10px] text-slate w-5 shrink-0">#{i + 1}</span>
                  <span className="font-serif text-[13px] text-navy truncate flex-1">{v}</span>
                  <button className="text-slate-light hover:text-navy" title="Reorder">
                    <Icon name="chevronDown" className="w-3.5 h-3.5" />
                  </button>
                  <button className="text-slate-light hover:text-red-600" title="Remove">
                    <Icon name="trash" className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-[3px] border border-dashed border-gold/30 text-navy hover:bg-cream text-[11px] font-serif font-medium tracking-[0.12em] uppercase transition-colors">
                <Icon name="plus" className="w-3.5 h-3.5" />
                Upload Video
              </button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Stats */}
      <SectionCard
        title="Statistics Strip"
        subtitle="Four animated counters shown on homepage &amp; about page"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="group bg-cream/50 border border-gold/15 rounded-[3px] p-4 hover:border-gold/40 hover:bg-white transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <p className="font-serif text-[28px] text-navy font-light leading-none">{s.number}</p>
                <button className="opacity-0 group-hover:opacity-100 text-slate-light hover:text-gold-dark transition-opacity" title="Edit">
                  <Icon name="edit" className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] tracking-[0.18em] uppercase font-serif font-medium text-slate mt-3">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Mission */}
      <SectionCard
        title="Mission Pillars"
        subtitle="Four values cards on the About page"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MISSION_PILLARS.map((p) => (
            <div
              key={p.num}
              className="group bg-cream/50 border border-gold/15 rounded-[3px] p-4 hover:border-gold/40 hover:bg-white transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-gold text-[11px] tracking-[0.22em] font-medium">
                  {p.num}
                </span>
                <button className="opacity-0 group-hover:opacity-100 text-slate-light hover:text-gold-dark transition-opacity" title="Edit">
                  <Icon name="edit" className="w-3.5 h-3.5" />
                </button>
              </div>
              <h4 className="font-serif text-[18px] text-navy mt-2">{p.name}</h4>
              <p className="font-serif font-light text-[13px] text-slate mt-1.5 leading-[1.6]">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Ticker */}
      <SectionCard
        title="Marquee Ticker"
        subtitle="Scrolling list under the hero — services keywords"
      >
        <div className="flex flex-wrap gap-2">
          {TICKER_ITEMS.map((item) => (
            <span
              key={item}
              className="group inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-[3px] bg-cream border border-gold/20 text-[12px] font-serif text-navy tracking-[0.05em] uppercase hover:border-gold/50 hover:bg-white transition-colors"
            >
              {item}
              <button className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-[2px] flex items-center justify-center text-slate-light hover:text-red-600 transition-opacity" title="Remove">
                <Icon name="close" className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[3px] border border-dashed border-gold/30 text-navy hover:bg-cream text-[12px] font-serif tracking-[0.05em] uppercase transition-colors">
            <Icon name="plus" className="w-3 h-3" />
            Add Item
          </button>
        </div>
      </SectionCard>
    </div>
  )
}

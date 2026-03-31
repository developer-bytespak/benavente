const items = [
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

function TickerRow() {
  return (
    <div className="flex items-center gap-6 shrink-0">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-6 shrink-0">
          <span className="text-[13px] font-sans text-slate tracking-[0.08em] uppercase whitespace-nowrap">
            {item}
          </span>
          <span className="w-1 h-1 rounded-full bg-gold/40 shrink-0" />
        </div>
      ))}
    </div>
  )
}

export default function Ticker() {
  return (
    <section className="bg-cream border-b border-gold/15 py-[18px] overflow-hidden">
      <div className="flex" style={{ animation: 'ticker 30s linear infinite' }}>
        <TickerRow />
        <TickerRow />
      </div>
    </section>
  )
}

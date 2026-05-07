interface Props {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function Topbar({ title, subtitle, actions }: Props) {
  return (
    <header className="sticky top-0 z-30 bg-cream/85 backdrop-blur border-b border-gold/15 px-5 lg:px-9 py-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-serif text-[22px] text-navy leading-tight truncate">{title}</h1>
          {subtitle && (
            <p className="text-slate text-[13px] font-serif mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
        {actions && <div className="shrink-0 flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  )
}

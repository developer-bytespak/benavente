import Icon, { type IconName } from './Icon'

interface Props {
  label: string
  value: number | string
  icon: IconName
  hint?: string
}

export default function MetricCard({ label, value, icon, hint }: Props) {
  return (
    <div className="bg-white border border-gold/15 rounded-[4px] p-5 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
          {label}
        </p>
        <p className="font-serif text-[36px] text-navy leading-none mt-2 tabular-nums">{value}</p>
        {hint && <p className="text-slate text-[12px] font-serif mt-1.5">{hint}</p>}
      </div>
      <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold-dark shrink-0">
        <Icon name={icon} className="w-5 h-5" />
      </span>
    </div>
  )
}

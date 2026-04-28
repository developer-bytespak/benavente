import type { LeadStatus } from '@/lib/admin/mockData'
import { STATUS_LABEL } from '@/lib/admin/mockData'

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: 'bg-ocean/12 text-ocean-dark border-ocean/30',
  contacted: 'bg-gold/15 text-gold-dark border-gold/40',
  qualified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'closed-won': 'bg-emerald-600/12 text-emerald-700 border-emerald-600/30',
  'closed-lost': 'bg-red-50 text-red-700 border-red-200',
}

interface Props {
  status: LeadStatus
  className?: string
}

export default function StatusBadge({ status, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-sans font-medium tracking-[0.04em] uppercase rounded-[2px] border ${STATUS_STYLES[status]} ${className}`}
    >
      <span className="w-1 h-1 rounded-full bg-current" />
      {STATUS_LABEL[status]}
    </span>
  )
}

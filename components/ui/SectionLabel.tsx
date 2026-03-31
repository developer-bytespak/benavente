interface SectionLabelProps {
  children: React.ReactNode
  variant?: 'dark' | 'light'
}

export default function SectionLabel({ children, variant = 'dark' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-[10px] text-[11px] font-medium tracking-[0.25em] uppercase mb-4 ${variant === 'light' ? 'text-gold-light' : 'text-gold'}`}>
      <span className={`w-[22px] h-px flex-shrink-0 ${variant === 'light' ? 'bg-gold-light' : 'bg-gold'}`} />
      {children}
    </div>
  )
}

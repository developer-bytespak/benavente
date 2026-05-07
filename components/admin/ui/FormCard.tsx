interface Props {
  title: string
  description?: string
  children: React.ReactNode
}

export default function FormCard({ title, description, children }: Props) {
  return (
    <section className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
      <header className="px-5 py-4 border-b border-gold/10 bg-cream/40">
        <h3 className="font-serif text-[16px] text-navy leading-tight">{title}</h3>
        {description && (
          <p className="text-slate text-[12px] font-serif mt-0.5">{description}</p>
        )}
      </header>
      <div className="p-5 space-y-4">{children}</div>
    </section>
  )
}

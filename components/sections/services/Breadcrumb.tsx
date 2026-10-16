import Link from 'next/link'

export interface Crumb {
  label: string
  href: string
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-serif font-medium tracking-[0.18em] uppercase">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-3">
              {isLast ? (
                <span aria-current="page" className="text-gold-light">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="text-white/50 hover:text-gold-light transition-colors duration-300">
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="w-3 h-px bg-white/25" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

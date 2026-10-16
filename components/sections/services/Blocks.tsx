// Building blocks for long-form service pages driven by an SEO content brief.
// Each block is presentation only; page copy lives in the route file.
import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import Accent from './Accent'
import GoldRule from './GoldRule'

export type Tone = 'white' | 'cream' | 'navy'

const toneBg: Record<Tone, string> = {
  white: 'bg-white',
  cream: 'bg-cream border-y border-gold/12',
  navy: 'bg-navy',
}

const pad = (n: number) => String(n + 1).padStart(2, '0')

export function Section({
  tone = 'white',
  id,
  className = '',
  children,
}: {
  tone?: Tone
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`relative py-[96px] lg:py-[108px] px-[4.5%] overflow-x-clip ${toneBg[tone]} ${className}`}>
      <div className="relative max-w-[1280px] mx-auto">{children}</div>
    </section>
  )
}

export function SectionHeader({
  label,
  title,
  tone = 'white',
  className = '',
}: {
  label: string
  title: string
  tone?: Tone
  className?: string
}) {
  const dark = tone === 'navy'
  return (
    <RevealOnScroll className={className}>
      <SectionLabel variant={dark ? 'light' : 'dark'}>{label}</SectionLabel>
      <h2 className={`font-serif text-[clamp(32px,4vw,50px)] leading-[1.15] ${dark ? 'text-white' : 'text-navy'}`}>
        <Accent text={title} accentClass={`italic ${dark ? 'text-gold-light' : 'text-gold'}`} />
      </h2>
    </RevealOnScroll>
  )
}

export function Prose({
  tone = 'white',
  className = '',
  children,
}: {
  tone?: Tone
  className?: string
  children: React.ReactNode
}) {
  const dark = tone === 'navy'
  return (
    <div
      className={`text-[17px] font-light leading-[1.85] space-y-5 ${
        dark ? 'text-white/[0.62]' : 'text-navy'
      } ${className}`}
    >
      {children}
    </div>
  )
}

// In-copy link to a guide or related page.
export function TextLink({
  href,
  tone = 'white',
  children,
}: {
  href: string
  tone?: Tone
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`underline underline-offset-4 transition-colors duration-300 ${
        tone === 'navy'
          ? 'text-gold-light decoration-gold-light/40 hover:text-white hover:decoration-white/60'
          : 'text-gold-dark decoration-gold/40 hover:text-navy hover:decoration-navy/50'
      }`}
    >
      {children}
    </Link>
  )
}

// Editorial table: hairline rows, serif first column. Collapses to stacked
// label/value blocks on small screens instead of scrolling sideways.
export function EditorialTable({
  columns,
  rows,
  caption,
  emphasisColumn,
}: {
  columns: string[]
  rows: string[][]
  caption: string
  // Column index rendered in a larger gold serif (e.g. deadlines).
  emphasisColumn?: number
}) {
  const threeCol = columns.length === 3
  const template = threeCol
    ? 'md:grid-cols-[minmax(160px,0.8fr)_1.5fr_1.2fr]'
    : 'md:grid-cols-[minmax(200px,0.8fr)_2fr]'
  // On small screens a 3-column row stacks as: row heading across the top,
  // then the two value cells side by side.
  const mobileCols = threeCol ? 'grid-cols-2' : 'grid-cols-1'
  return (
    <RevealOnScroll>
      <table className="w-full text-left block">
        <caption className="sr-only">{caption}</caption>
        <thead className="hidden md:block border-b border-gold/40">
          <tr className={`grid ${template} gap-8 pb-4`}>
            {columns.map((c) => (
              <th key={c} scope="col" className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block">
          {rows.map((row) => (
            <tr
              key={row[0]}
              className={`group grid ${mobileCols} ${template} gap-x-5 md:gap-x-8 gap-y-3 md:gap-y-2 py-5 md:py-6 border-b border-gold/20 hover:bg-cream/60 transition-colors duration-300`}
            >
              {row.map((cell, i) =>
                i === 0 ? (
                  <th
                    key={i}
                    scope="row"
                    className={`font-serif font-normal text-[21px] md:text-[24px] text-navy leading-[1.25] group-hover:text-gold-dark transition-colors duration-300 ${
                      threeCol ? 'col-span-2 md:col-span-1' : ''
                    }`}
                  >
                    {cell}
                  </th>
                ) : (
                  <td
                    key={i}
                    className={
                      i === emphasisColumn
                        ? 'font-serif text-[20px] md:text-[24px] text-gold-dark leading-[1.25]'
                        : 'text-navy/80 text-[15px] md:text-[16px] font-light leading-[1.6] md:leading-[1.7]'
                    }
                  >
                    <span className="md:hidden block text-gold text-[10px] tracking-[0.18em] uppercase font-serif font-medium mb-1">
                      {columns[i]}
                    </span>
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </RevealOnScroll>
  )
}

export interface NumberedItem {
  title: string
  body: React.ReactNode
}

// Numbered items as columns (with oversized numerals) or as editorial rows.
export function NumberedItems({
  items,
  tone = 'white',
  layout = 'columns',
}: {
  items: NumberedItem[]
  tone?: Tone
  layout?: 'columns' | 'rows'
}) {
  const dark = tone === 'navy'
  const line = dark ? 'border-white/12' : 'border-gold/20'
  const titleCls = `font-serif text-[26px] leading-[1.2] ${dark ? 'text-white' : 'text-navy'}`
  const bodyCls = `text-[16px] font-light leading-[1.8] ${dark ? 'text-white/[0.6]' : 'text-navy/80'}`

  if (layout === 'rows') {
    return (
      <ol className={`border-t ${line}`}>
        {items.map((item, i) => (
          <li key={item.title}>
            <RevealOnScroll delay={i * 0.05}>
              <div className={`grid grid-cols-[44px_1fr] gap-x-4 lg:gap-x-6 py-7 border-b ${line}`}>
                <span className={`font-serif text-[13px] tracking-[0.2em] pt-2 ${dark ? 'text-gold-light' : 'text-gold'}`}>
                  {pad(i)}
                </span>
                <div>
                  <h3 className={titleCls}>{item.title}</h3>
                  <div className={`${bodyCls} mt-2`}>{item.body}</div>
                </div>
              </div>
            </RevealOnScroll>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ol className={`grid grid-cols-1 gap-x-12 gap-y-14 ${items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
      {items.map((item, i) => (
        <li key={item.title}>
          <RevealOnScroll delay={i * 0.1}>
            <span
              aria-hidden="true"
              className="block font-serif font-light text-[84px] leading-none text-transparent lining-nums"
              style={{ WebkitTextStroke: `1px ${dark ? 'rgba(207,169,110,0.55)' : 'rgba(184,147,90,0.6)'}` }}
            >
              {pad(i)}
            </span>
            <GoldRule className="w-14 mt-6 mb-6" delay={0.2 + i * 0.1} />
            <h3 className={titleCls}>{item.title}</h3>
            <div className={`${bodyCls} mt-3`}>{item.body}</div>
          </RevealOnScroll>
        </li>
      ))}
    </ol>
  )
}

// Rows with a small architectural image crop beside each heading (desktop).
export function ImageRows({
  items,
}: {
  items: { title: string; body: React.ReactNode; image: string; imageAlt: string }[]
}) {
  return (
    <ul className="border-t border-white/12">
      {items.map((item, i) => (
        <li key={item.title}>
          <RevealOnScroll delay={i * 0.05}>
            <div className="group grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_0.9fr_1.4fr] items-center gap-x-10 gap-y-3 py-7 border-b border-white/12">
              <div className="relative hidden md:block h-[110px] lg:h-[120px] overflow-hidden rounded-[2px] md:row-span-2 lg:row-span-1">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="220px"
                  className="object-cover opacity-70 grayscale-[40%] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-smooth"
                />
              </div>
              <h3 className="font-serif text-[26px] text-white leading-[1.2] group-hover:text-gold-light transition-colors duration-300">
                {item.title}
              </h3>
              <div className="text-white/[0.6] text-[16px] font-light leading-[1.8]">{item.body}</div>
            </div>
          </RevealOnScroll>
        </li>
      ))}
    </ul>
  )
}

export function ProcessSteps({ steps }: { steps: NumberedItem[] }) {
  return (
    <ol className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
      <GoldRule className="hidden lg:block absolute left-0 right-0 top-[22px] opacity-40" />
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <RevealOnScroll delay={i * 0.12}>
            <span className="relative z-[1] inline-flex items-center justify-center w-11 h-11 rounded-full border border-gold bg-cream text-gold font-serif text-[15px]">
              {pad(i)}
            </span>
            <h3 className="font-serif text-[26px] text-navy mt-6">{step.title}</h3>
            <div className="text-navy/80 text-[16px] font-light leading-[1.8] mt-2">{step.body}</div>
          </RevealOnScroll>
        </li>
      ))}
    </ol>
  )
}

export function Checklist({ items, tone = 'white' }: { items: string[]; tone?: Tone }) {
  const dark = tone === 'navy'
  return (
    <ul className={`border-t ${dark ? 'border-white/12' : 'border-gold/20'}`}>
      {items.map((item, i) => (
        <li key={item}>
          <RevealOnScroll delay={i * 0.04}>
            <div className={`flex gap-4 py-4 border-b ${dark ? 'border-white/12' : 'border-gold/20'}`}>
              <span aria-hidden="true" className={`mt-[13px] w-4 h-px shrink-0 ${dark ? 'bg-gold-light' : 'bg-gold'}`} />
              <span className={`text-[17px] font-light leading-[1.7] ${dark ? 'text-white/75' : 'text-navy'}`}>{item}</span>
            </div>
          </RevealOnScroll>
        </li>
      ))}
    </ul>
  )
}

export function Quote({ heading, quote }: { heading: string; quote: string }) {
  return (
    <section className="relative bg-navy py-[110px] px-[4.5%] overflow-hidden">
      <RevealOnScroll>
        <figure className="relative max-w-[920px] mx-auto text-center">
          <h2 className="flex items-center justify-center gap-[10px] text-gold-light text-[11px] font-medium tracking-[0.25em] uppercase">
            <span className="w-[22px] h-px bg-gold-light" />
            {heading}
            <span className="w-[22px] h-px bg-gold-light" />
          </h2>
          <span aria-hidden="true" className="block font-serif text-gold text-[110px] leading-[0.6] mt-10 select-none">
            &ldquo;
          </span>
          <blockquote className="font-serif font-light italic text-[clamp(24px,3vw,36px)] text-white leading-[1.45] mt-2">
            {quote}
          </blockquote>
          <GoldRule className="w-[120px] mx-auto mt-10 origin-center" delay={0.3} />
        </figure>
      </RevealOnScroll>
    </section>
  )
}

export interface FaqItem {
  q: string
  a: React.ReactNode
  // Plain-text answer for FAQPage structured data.
  text: string
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.text },
    })),
  }
}

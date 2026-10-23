// Building blocks for long-form service pages driven by an SEO content brief.
// Each block is presentation only; page copy lives in the route file.
import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import Accent from './Accent'
import GoldRule from './GoldRule'
import { RevealRow, RevealItem } from './Motion'

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
// label/value blocks on small screens instead of scrolling sideways. Rows slide
// in one after another; on hover a gold bar draws down the left edge.
export function EditorialTable({
  columns,
  rows,
  caption,
  emphasisColumn,
  tone = 'white',
  numbered = false,
}: {
  columns: string[]
  rows: React.ReactNode[][]
  caption: string
  // Column index rendered in a larger gold serif (e.g. deadlines).
  emphasisColumn?: number
  tone?: Tone
  // Prefix each row heading with 01, 02, ...
  numbered?: boolean
}) {
  const dark = tone === 'navy'
  const threeCol = columns.length === 3
  const template = threeCol
    ? 'md:grid-cols-[minmax(160px,0.8fr)_1.5fr_1.2fr]'
    : 'md:grid-cols-[minmax(200px,0.8fr)_2fr]'
  // On small screens a 3-column row stacks as: row heading across the top,
  // then the two value cells side by side.
  const mobileCols = threeCol ? 'grid-cols-2' : 'grid-cols-1'
  const line = dark ? 'border-white/12' : 'border-gold/20'
  const label = dark ? 'text-gold-light' : 'text-gold'
  return (
    <table className="w-full text-left block">
      <caption className="sr-only">{caption}</caption>
      <thead className={`hidden md:block border-b ${dark ? 'border-gold-light/40' : 'border-gold/40'}`}>
        <RevealRow className={`grid ${template} gap-8 pb-4`}>
          {columns.map((c) => (
            <th key={c} scope="col" className={`${label} text-[12px] tracking-[0.2em] uppercase font-serif font-medium`}>
              {c}
            </th>
          ))}
        </RevealRow>
      </thead>
      <tbody className="block">
        {rows.map((row, r) => (
          <RevealRow
            key={r}
            delay={Math.min(r, 8) * 0.07}
            className={`group relative grid ${mobileCols} ${template} gap-x-5 md:gap-x-8 gap-y-3 md:gap-y-2 py-5 md:py-6 border-b ${line} transition-colors duration-500 ${
              dark ? 'hover:bg-white/[0.04]' : 'hover:bg-gold/[0.05]'
            } before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gold before:origin-top before:scale-y-0 before:transition-transform before:duration-500 before:ease-smooth hover:before:scale-y-100`}
          >
            {row.map((cell, i) =>
              i === 0 ? (
                <th
                  key={i}
                  scope="row"
                  className={`font-serif font-normal text-[21px] md:text-[24px] leading-[1.25] transition-all duration-500 ease-smooth group-hover:translate-x-3 ${
                    dark ? 'text-white group-hover:text-gold-light' : 'text-navy group-hover:text-gold-dark'
                  } ${threeCol ? 'col-span-2 md:col-span-1' : ''}`}
                >
                  {numbered && (
                    <span className={`block ${label} text-[12px] tracking-[0.2em] mb-1`}>{pad(r)}</span>
                  )}
                  {cell}
                </th>
              ) : (
                <td
                  key={i}
                  className={
                    i === emphasisColumn
                      ? `font-serif text-[20px] md:text-[24px] leading-[1.25] ${dark ? 'text-gold-light' : 'text-gold-dark'}`
                      : `text-[15px] md:text-[16px] font-light leading-[1.6] md:leading-[1.7] transition-colors duration-500 ${
                          dark ? 'text-white/[0.6] group-hover:text-white/80' : 'text-navy/80 group-hover:text-navy'
                        }`
                  }
                >
                  <span className={`md:hidden block ${label} text-[10px] tracking-[0.18em] uppercase font-serif font-medium mb-1`}>
                    {columns[i]}
                  </span>
                  {cell}
                </td>
              )
            )}
          </RevealRow>
        ))}
      </tbody>
    </table>
  )
}

// Bulleted list in columns (purposes, decisions, situations). Items rise in
// one after another and the bullet stretches into a dash on hover.
export function DotList({
  label,
  items,
  columns = 3,
  className = '',
}: {
  label: string
  items: string[]
  columns?: 3 | 4
  className?: string
}) {
  return (
    <div className={className}>
      <RevealOnScroll>
        <p className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium">{label}</p>
      </RevealOnScroll>
      <ul
        className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-x-8 mt-4 border-t border-gold/25`}
      >
        {items.map((item, i) => (
          <RevealItem
            key={item}
            delay={Math.min(i, 8) * 0.05}
            className="group flex items-start gap-4 py-4 border-b border-gold/25 font-serif text-[19px] text-navy leading-[1.4] cursor-default"
          >
            <span
              aria-hidden="true"
              className="mt-[11px] w-1.5 h-1.5 rounded-full bg-gold shrink-0 transition-all duration-500 ease-smooth group-hover:w-5"
            />
            <span className="transition-colors duration-300 group-hover:text-gold-dark">{item}</span>
          </RevealItem>
        ))}
      </ul>
    </div>
  )
}

// Label plus H2 for the short intro section under each service hero.
export function IntroHeading({ label, title }: { label: string; title: string }) {
  return (
    <>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="font-serif text-[clamp(30px,3.4vw,44px)] text-navy leading-[1.15] mb-6">
        <Accent text={title} accentClass="italic text-gold" />
      </h2>
    </>
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
  const titleCls = `font-serif text-[26px] leading-[1.2] transition-colors duration-500 ${
    dark ? 'text-white group-hover:text-gold-light' : 'text-navy group-hover:text-gold-dark'
  }`
  const bodyCls = `text-[16px] font-light leading-[1.8] ${dark ? 'text-white/[0.6]' : 'text-navy/80'}`

  if (layout === 'rows') {
    return (
      <ol className={`border-t ${line}`}>
        {items.map((item, i) => (
          <li key={item.title}>
            <RevealOnScroll delay={i * 0.08}>
              <div
                className={`group relative grid grid-cols-[44px_1fr] gap-x-4 lg:gap-x-6 py-7 border-b ${line} transition-colors duration-500 ${
                  dark ? 'hover:bg-white/[0.03]' : 'hover:bg-gold/[0.05]'
                } before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gold before:origin-top before:scale-y-0 before:transition-transform before:duration-500 before:ease-smooth hover:before:scale-y-100`}
              >
                <span
                  className={`font-serif text-[13px] tracking-[0.2em] pt-2 pl-2 transition-transform duration-500 ease-smooth group-hover:translate-x-1 ${
                    dark ? 'text-gold-light' : 'text-gold'
                  }`}
                >
                  {pad(i)}
                </span>
                <div className="transition-transform duration-500 ease-smooth group-hover:translate-x-2 pr-2">
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
        <li key={item.title} className="group">
          <RevealOnScroll delay={i * 0.1}>
            <div className="transition-transform duration-500 ease-smooth group-hover:-translate-y-1.5">
              <span
                aria-hidden="true"
                className={`block font-serif font-light text-[84px] leading-none text-transparent lining-nums transition-colors duration-700 ${
                  dark ? 'group-hover:text-gold-light/25' : 'group-hover:text-gold/20'
                }`}
                style={{ WebkitTextStroke: `1px ${dark ? 'rgba(207,169,110,0.55)' : 'rgba(184,147,90,0.6)'}` }}
              >
                {pad(i)}
              </span>
              <div className="w-14 mt-6 mb-6 transition-all duration-700 ease-smooth group-hover:w-28">
                <GoldRule delay={0.2 + i * 0.1} />
              </div>
              <h3 className={titleCls}>{item.title}</h3>
              <div className={`${bodyCls} mt-3`}>{item.body}</div>
            </div>
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
        <li key={step.title} className="group relative">
          <RevealOnScroll delay={i * 0.12}>
            <div className="transition-transform duration-500 ease-smooth group-hover:-translate-y-1.5">
              <span className="relative z-[1] inline-flex items-center justify-center w-11 h-11 rounded-full border border-gold bg-cream text-gold font-serif text-[15px] transition-all duration-500 ease-smooth group-hover:bg-gold group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_0_7px_rgba(184,147,90,0.15)]">
                {pad(i)}
              </span>
              <h3 className="font-serif text-[26px] text-navy mt-6 transition-colors duration-500 group-hover:text-gold-dark">
                {step.title}
              </h3>
              <span
                aria-hidden="true"
                className="block h-px w-8 bg-gold/60 mt-3 transition-all duration-700 ease-smooth group-hover:w-20 group-hover:bg-gold"
              />
              <div className="text-navy/80 text-[16px] font-light leading-[1.8] mt-3 transition-colors duration-500 group-hover:text-navy">
                {step.body}
              </div>
            </div>
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
          <RevealOnScroll delay={i * 0.05}>
            <div
              className={`group flex gap-4 py-4 border-b transition-colors duration-500 ${
                dark ? 'border-white/12 hover:bg-white/[0.03]' : 'border-gold/20 hover:bg-gold/[0.05]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`mt-[13px] w-4 h-px shrink-0 transition-all duration-500 ease-smooth group-hover:w-8 ${
                  dark ? 'bg-gold-light' : 'bg-gold'
                }`}
              />
              <span
                className={`text-[17px] font-light leading-[1.7] transition-colors duration-300 ${
                  dark ? 'text-white/75 group-hover:text-white' : 'text-navy group-hover:text-gold-dark'
                }`}
              >
                {item}
              </span>
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

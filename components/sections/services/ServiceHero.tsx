import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import Button from '@/components/ui/Button'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import Breadcrumb, { type Crumb } from './Breadcrumb'
import Accent from './Accent'
import GoldRule from './GoldRule'
import ServiceInquiryForm from './ServiceInquiryForm'

interface Props {
  eyebrow: string
  heading: string
  subhead: string
  image: string
  imageAlt: string
  breadcrumb?: Crumb[]
  // Oversized service number shown as a watermark on detail pages.
  number?: string
  secondaryCta?: { label: string; href: string }
  footer?: React.ReactNode
  // Smaller H1 scale for longer, keyword-led headings.
  compact?: boolean
  primaryLabel?: string
  primaryHref?: string
  // Service slug: shows the compact inquiry form beside the copy (desktop).
  formService?: string
}

export default function ServiceHero({
  eyebrow,
  heading,
  subhead,
  image,
  imageAlt,
  breadcrumb,
  number,
  secondaryCta,
  footer,
  compact = false,
  primaryLabel = 'Discuss Your Assignment',
  primaryHref = '/contact',
  formService,
}: Props) {
  const withForm = Boolean(formService)
  const h1Size = withForm
    ? 'text-[clamp(36px,3.6vw,54px)] max-w-[760px]'
    : compact
      ? 'text-[clamp(38px,5vw,66px)] max-w-[1000px]'
      : 'text-[clamp(40px,6vw,76px)] max-w-[900px]'

  return (
    <section className="relative bg-navy min-h-screen flex flex-col justify-center pt-[140px] pb-[60px] px-[4.5%] overflow-hidden">
      <Image src={image} alt={imageAlt} fill sizes="100vw" priority className="object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/45" />

      {number && (
        <span
          aria-hidden="true"
          className={`${withForm ? 'hidden md:block lg:hidden' : 'hidden md:block'} absolute right-[4.5%] bottom-[6%] font-serif font-light leading-none text-[clamp(160px,22vw,320px)] text-transparent select-none`}
          style={{ WebkitTextStroke: '1px rgba(207,169,110,0.28)' }}
        >
          {number}
        </span>
      )}

      <div
        className={`relative w-full max-w-[1280px] mx-auto ${
          withForm ? 'grid grid-cols-1 lg:grid-cols-[1.2fr_minmax(380px,0.8fr)] gap-14 xl:gap-20 items-center' : ''
        }`}
      >
        <RevealOnScroll>
          {breadcrumb && <Breadcrumb items={breadcrumb} />}
          <SectionLabel variant="light">{eyebrow}</SectionLabel>
          <h1 className={`font-serif text-white leading-[1.08] [overflow-wrap:anywhere] sm:[overflow-wrap:normal] ${h1Size}`}>
            <Accent text={heading} accentClass="italic text-gold-light" />
          </h1>
          <GoldRule className="w-[120px] mt-8" delay={0.3} />
          <p
            className={`text-white/[0.62] text-[17px] sm:text-[18px] font-light leading-[1.85] mt-7 ${
              compact ? 'max-w-[680px]' : 'max-w-[600px]'
            }`}
          >
            {subhead}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 mt-9">
            <Button href={primaryHref} variant="gold">
              {primaryLabel}
            </Button>
            {secondaryCta && (
              <MicroCTA href={secondaryCta.href} variant="light">
                {secondaryCta.label}
              </MicroCTA>
            )}
          </div>
        </RevealOnScroll>

        {formService && (
          <RevealOnScroll delay={0.15} className="hidden lg:block">
            <div className="bg-white rounded-[2px] p-8 shadow-2xl shadow-black/30">
              <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-serif font-medium">
                Request a Proposal
              </p>
              <p className="font-serif text-[24px] text-navy leading-[1.25] mt-2 mb-6">
                Tell us about your assignment
              </p>
              <ServiceInquiryForm service={formService} variant="compact" />
            </div>
          </RevealOnScroll>
        )}
      </div>

      {footer && <div className="relative w-full max-w-[1280px] mx-auto mt-16">{footer}</div>}
    </section>
  )
}

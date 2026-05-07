import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import type { ContactInfoRow } from '@/lib/supabase/types'

interface Detail {
  label: string
  value: string
  href?: string
}

interface Props {
  info: ContactInfoRow | null
}

export default function ContactInfo({ info }: Props) {
  const details: Detail[] = []

  if (info?.address) {
    details.push({
      label: 'Office Location',
      value: info.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`,
    })
  }
  if (info?.phone) {
    details.push({
      label: 'Phone',
      value: info.phone,
      href: `tel:${info.phone.replace(/[^+\d]/g, '')}`,
    })
  }
  if (info?.email) {
    details.push({
      label: 'Email',
      value: info.email,
      href: `mailto:${info.email}`,
    })
  }
  if (info?.hours) {
    details.push({ label: 'Hours', value: info.hours })
  }
  if (info?.service_regions && info.service_regions.length > 0) {
    details.push({
      label: 'Service Regions',
      value: info.service_regions.join(' · '),
    })
  }

  const mapSrc = info?.map_embed_url

  return (
    <div>
      <SectionLabel>Hawaii Appraiser Contact</SectionLabel>
      <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
        Let&apos;s Start a <span className="italic text-gold">Conversation</span>
      </h2>
      <p className="text-navy text-[18px] font-light leading-[1.85] mt-5">
        Whether your project is residential, commercial, or mixed-use, we&apos;re here to help.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {details.map((item) => (
          <div key={item.label}>
            <span className="text-[11px] text-gold uppercase tracking-[0.2em] font-serif block">
              {item.label}
            </span>
            {item.href ? (
              <a
                href={item.href}
                className="text-navy hover:text-gold text-[18px] font-serif block mt-1 transition-colors duration-300 break-all"
              >
                {item.value}
              </a>
            ) : (
              <span className="text-navy text-[18px] font-serif block mt-1">{item.value}</span>
            )}
          </div>
        ))}
      </div>

      {mapSrc && (
        <div className="mt-8 h-[280px] rounded-[2px] overflow-hidden border border-gold/15">
          <iframe
            title="The Benavente Group office location"
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <MicroCTA href="/about">Learn About Our Team</MicroCTA>
        <MicroCTA href="/gallery">Browse Our Portfolio</MicroCTA>
        <MicroCTA href="/blog">Read Market Insights</MicroCTA>
      </div>
    </div>
  )
}

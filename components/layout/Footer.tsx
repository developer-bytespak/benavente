import Link from 'next/link'
import Image from 'next/image'
import MicroCTA from '@/components/ui/MicroCTA'
import type { SiteSettingsRow, ContactInfoRow } from '@/lib/supabase/types'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

interface Props {
  settings: SiteSettingsRow | null
  contact: ContactInfoRow | null
}

export default function Footer({ settings, contact }: Props) {
  const logo = settings?.logo_url || '/images/hero/logo.png'
  const description = settings?.footer_text
  const copyright =
    settings?.copyright_text ?? `© ${new Date().getFullYear()} The Benavente Group LLC. All Rights Reserved.`

  const address = contact?.address
  const phone = contact?.phone
  const email = contact?.email
  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : undefined

  return (
    <footer className="bg-navy border-t border-gold/10">
      <div className="max-w-[1400px] mx-auto pt-16 pb-7 px-[4.5%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-10 lg:gap-13">
          <div>
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-[88px] h-[88px] shrink-0">
                <Image
                  src={logo}
                  alt="The Benavente Group LLC"
                  width={72}
                  height={72}
                  className="w-[72px] h-[72px] object-contain"
                />
              </span>
              <div>
                <h3 className="font-serif text-[24px] text-white leading-tight">The Benavente Group LLC</h3>
                <p className="text-gold text-[12.5px] tracking-[0.2em] uppercase font-serif mt-0.5">
                  Real Estate Appraisers &amp; Consultants
                </p>
              </div>
            </div>
            {description && (
              <p className="text-white/[0.38] text-[16px] font-serif font-medium leading-[1.7] max-w-[280px] mt-4">
                {description}
              </p>
            )}
            <div className="mt-5">
              <MicroCTA href="/contact" variant="gold">Contact Us</MicroCTA>
            </div>
          </div>

          <div>
            <h4 className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/45 hover:text-white text-[15px] font-serif font-medium transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium mb-5">
              Contact
            </h4>
            <div className="space-y-4">
              {address && (
                <div>
                  <span className="text-[11px] text-gold uppercase tracking-[0.2em] font-serif font-semibold block">
                    Office
                  </span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/45 hover:text-white text-[15px] font-serif font-medium block mt-1 transition-colors duration-300"
                  >
                    {address}
                  </a>
                </div>
              )}
              {phone && (
                <div>
                  <span className="text-[11px] text-gold uppercase tracking-[0.2em] font-serif font-semibold block">
                    Phone
                  </span>
                  <a
                    href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                    className="text-white/45 hover:text-white text-[15px] font-serif font-medium block mt-1 transition-colors duration-300"
                  >
                    {phone}
                  </a>
                </div>
              )}
              {email && (
                <div>
                  <span className="text-[11px] text-gold uppercase tracking-[0.2em] font-serif font-semibold block">
                    Email
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-white/45 hover:text-white text-[15px] font-serif font-medium block mt-1 transition-colors duration-300 break-all"
                  >
                    {email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-11 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-white/[0.22] text-[13px] font-serif font-medium">{copyright}</span>
          <span className="text-white/[0.22] text-[13px] font-serif font-medium">
            Developed by Bytes Platform Inc.
          </span>
        </div>
      </div>
    </footer>
  )
}

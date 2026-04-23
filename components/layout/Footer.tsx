import Link from 'next/link'
import Image from 'next/image'
import MicroCTA from '@/components/ui/MicroCTA'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]


export default function Footer() {
  return (
    <footer className="bg-navy border-t border-gold/10">
      <div className="max-w-[1400px] mx-auto pt-16 pb-7 px-[4.5%]">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-10 lg:gap-13">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-[88px] h-[88px] shrink-0">
                <Image
                  src="/images/hero/logo.png"
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
            <p className="text-white/[0.38] text-[16px] font-serif font-medium leading-[1.7] max-w-[220px] mt-4">
              Credible solutions and timely results for real estate valuation across Hawai&#8216;i and the Pacific.
            </p>
            <div className="mt-5">
              <MicroCTA href="/contact" variant="gold">Request Consultation</MicroCTA>
            </div>
          </div>

          {/* Navigation */}
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

          {/* Contact */}
          <div>
            <h4 className="text-gold text-[12px] tracking-[0.2em] uppercase font-serif font-medium mb-5">
              Contact
            </h4>
            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-gold uppercase tracking-[0.2em] font-serif font-semibold block">Office</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Pauahi+Tower+1003+Bishop+Street+Honolulu+HI+96813"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/45 hover:text-white text-[15px] font-serif font-medium block mt-1 transition-colors duration-300"
                >
                  Pauahi Tower, 1003 Bishop St<br />Honolulu, HI 96813
                </a>
              </div>
              <div>
                <span className="text-[11px] text-gold uppercase tracking-[0.2em] font-serif font-semibold block">Phone</span>
                <a href="tel:+18087844320" className="text-white/45 hover:text-white text-[15px] font-serif font-medium block mt-1 transition-colors duration-300">(808) 784-4320</a>
              </div>
              <div>
                <span className="text-[11px] text-gold uppercase tracking-[0.2em] font-serif font-semibold block">Email</span>
                <a href="mailto:Mail@BenaventeGroup.com" className="text-white/45 hover:text-white text-[15px] font-serif font-medium block mt-1 transition-colors duration-300 break-all">Mail@BenaventeGroup.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-11 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-white/[0.22] text-[13px] font-serif font-medium">
            &copy; 2026 The Benavente Group LLC. All Rights Reserved.
          </span>
          <span className="text-white/[0.22] text-[13px] font-serif font-medium">
            Developed by Bytes Platform Inc.
          </span>
        </div>
      </div>
    </footer>
  )
}

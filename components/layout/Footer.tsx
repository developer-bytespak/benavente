import Link from 'next/link'
import MicroCTA from '@/components/ui/MicroCTA'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const serviceLinks = [
  'Commercial Appraisal',
  'Residential Valuation',
  'Market Analysis',
  'Litigation Support',
  'Property Tax Appeal',
  'Consulting',
  'Pacific Region',
]

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-gold/10">
      <div className="max-w-[1400px] mx-auto pt-16 pb-7 px-[4.5%]">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 lg:gap-13">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-[21px] text-white">The Benavente Group</h3>
            <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans mt-1">
              Real Estate Appraisers &amp; Consultants
            </p>
            <p className="text-white/[0.38] text-[14px] font-sans font-light leading-[1.7] max-w-[220px] mt-4">
              Credible solutions and timely results for real estate valuation across Hawai&#8216;i and the Pacific.
            </p>
            <div className="mt-5">
              <MicroCTA href="/contact" variant="gold">Request Consultation</MicroCTA>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/45 hover:text-white text-[14px] font-sans transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/contact"
                    className="text-white/45 hover:text-white text-[14px] font-sans transition-colors duration-300"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-5">
              Contact
            </h4>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-sans block">Office</span>
                <span className="text-white/45 text-[14px] font-sans block mt-1">Honolulu, Hawai&#8216;i</span>
              </div>
              <div>
                <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-sans block">Phone</span>
                <span className="text-white/45 text-[14px] font-sans block mt-1">(808) 555-0100</span>
              </div>
              <div>
                <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-sans block">Email</span>
                <span className="text-white/45 text-[14px] font-sans block mt-1">info@benaventegroup.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-11 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-white/[0.22] text-[12px] font-sans">
            &copy; 2025 The Benavente Group. All Rights Reserved.
          </span>
          <div className="flex items-center gap-4 text-white/[0.22] text-[12px] font-sans">
            <span>Privacy Policy</span>
            <span>&middot;</span>
            <span>Disclaimer</span>
            <span>&middot;</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

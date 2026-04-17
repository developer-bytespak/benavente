import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'

const contactDetails = [
  { label: 'Office Location', value: 'Pauahi Tower, 1003 Bishop Street, Honolulu, HI 96813', sub: 'Serving Hawai\u2018i, Guam, Saipan & the Pacific Islands' },
  { label: 'Phone', value: '(808) 784-4320' },
  { label: 'Email', value: 'Mail@BenaventeGroup.com' },
  { label: 'Hours', value: 'Monday \u2013 Friday, 8:00 AM \u2013 5:00 PM HST' },
  { label: 'Service Regions', value: 'Hawai\u2018i \u00B7 Guam \u00B7 Saipan \u00B7 Marshall Islands \u00B7 Pacific Islands' },
]

export default function ContactInfo() {
  return (
    <div>
      <SectionLabel>Contact Info</SectionLabel>
      <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
        Let&apos;s Start a <span className="italic text-gold">Conversation</span>
      </h2>
      <p className="text-navy text-[18px] font-light leading-[1.85] mt-5">
        Whether your project is a single-family home or a large commercial complex, we&apos;re here to help.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {contactDetails.map((item) => (
          <div key={item.label}>
            <span className="text-[11px] text-gold uppercase tracking-[0.2em] font-serif block">{item.label}</span>
            <span className="text-navy text-[18px] font-serif block mt-1">{item.value}</span>
            {item.sub && <span className="text-navy text-[16px] font-serif block">{item.sub}</span>}
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="mt-8 h-[280px] rounded-[2px] overflow-hidden border border-gold/15">
        <iframe
          title="The Benavente Group office location"
          src="https://www.google.com/maps?q=Pauahi+Tower+1003+Bishop+Street+Honolulu+HI+96813&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <MicroCTA href="/about">Learn About Our Team</MicroCTA>
        <MicroCTA href="/gallery">Browse Our Portfolio</MicroCTA>
        <MicroCTA href="/blog">Read Market Insights</MicroCTA>
      </div>
    </div>
  )
}

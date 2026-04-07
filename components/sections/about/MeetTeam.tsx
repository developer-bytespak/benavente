'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const team = [
  {
    name: 'First Last',
    role: 'Principal Appraiser',
    initials: 'FL',
  },
  {
    name: 'First Last',
    role: 'Senior Analyst',
    initials: 'FL',
  },
  {
    name: 'First Last',
    role: 'Valuation Consultant',
    initials: 'FL',
  },
  {
    name: 'First Last',
    role: 'Research Director',
    initials: 'FL',
  },
]

export default function MeetTeam() {
  return (
    <section className="bg-navy py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <div className="flex justify-center mb-4">
              <SectionLabel variant="light">Our People</SectionLabel>
            </div>
            <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-white leading-[1.15]">
              Meet the <span className="italic text-gold">Team</span>
            </h2>
            <p className="text-white/[0.52] text-[16px] font-light leading-[1.85] mt-4">
              Experienced professionals dedicated to delivering credible valuations across Hawai&#8216;i and the Pacific.
            </p>
          </div>
        </RevealOnScroll>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div className="group relative text-center">
                {/* Avatar circle */}
                <div className="relative mx-auto w-[180px] h-[180px] mb-6">
                  {/* Outer decorative ring */}
                  <div className="absolute inset-0 rounded-full border border-gold/20 transition-all duration-500 group-hover:border-gold/50 group-hover:scale-105" />

                  {/* Inner circle with initials placeholder */}
                  <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:from-white/15 group-hover:to-white/10">
                    <span className="font-serif text-[36px] text-gold/40 select-none transition-colors duration-500 group-hover:text-gold/70">
                      {member.initials}
                    </span>

                    {/* Replace with real image:
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    /> */}
                  </div>

                  {/* Subtle gold accent dot */}
                  <div className="absolute bottom-1 right-3 w-3 h-3 rounded-full bg-gold/60 border-2 border-navy transition-transform duration-300 group-hover:scale-125" />
                </div>

                {/* Name & Role */}
                <h3 className="font-serif text-[22px] text-white transition-colors duration-300 group-hover:text-gold">
                  {member.name}
                </h3>
                <p className="font-sans font-light text-[13px] text-white/50 tracking-[0.08em] uppercase mt-1">
                  {member.role}
                </p>

                {/* Subtle underline accent */}
                <div className="w-8 h-px bg-gold/30 mx-auto mt-4 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll delay={0.3}>
          <div className="text-center mt-16">
            <Button href="/about" variant="outline-light">
              View All Team
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

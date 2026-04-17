'use client'

import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

interface TeamMember {
  name: string
  role: string
  image: string
  cv?: string
  cvFilename?: string
}

const team: TeamMember[] = [
  {
    name: 'Fernando Benavente, MAI, SRA',
    role: 'Manager',
    image: '/images/team/fernando.webp',
    cv: '/cv/fernando-benavente.pdf',
    cvFilename: 'Fernando-Benavente-CV.pdf',
  },
  {
    name: 'Brian S. Goto, MAI, SRA',
    role: 'Appraiser Consultant',
    image: '/images/team/brian.webp',
    cv: '/cv/brian-goto.pdf',
    cvFilename: 'Brian-Goto-CV.pdf',
  },
  {
    name: 'Randolph K. Flores, MAI, SRA',
    role: 'Appraiser Consultant',
    image: '/images/team/randy.webp',
    cv: '/cv/randolph-flores.pdf',
    cvFilename: 'Randolph-Flores-CV.pdf',
  },
  {
    name: 'Matthew Flores',
    role: 'Associate',
    image: '/images/team/matt.webp',
    cv: '/cv/matthew-flores.pdf',
    cvFilename: 'Matthew-Flores-CV.pdf',
  },
  {
    name: 'Jared Miyashiro',
    role: 'Certified General Appraiser',
    image: '/images/team/jared.webp',
    cv: '/cv/jared-miyashiro.pdf',
    cvFilename: 'Jared-Miyashiro-CV.pdf',
  },
  {
    name: 'Kanae Bamba',
    role: 'Certified General Appraiser',
    image: '/images/team/kanae.webp',
    cv: '/cv/kanae-bamba.pdf',
    cvFilename: 'Kanae-Bamba-CV.pdf',
  },
  {
    name: 'Kamugisha Pearl',
    role: 'Senior Market Analyst',
    image: '/images/team/pearl.webp',
    cv: '/cv/kamugisha-pearl.pdf',
    cvFilename: 'Kamugisha-Pearl-CV.pdf',
  },
  {
    name: 'Asiimwe Miriam',
    role: 'Administrative Assistant',
    image: '/images/team/miriam.webp',
    cv: '/cv/asiimwe-miriam.pdf',
    cvFilename: 'Asiimwe-Miriam-CV.pdf',
  },
  {
    name: 'Anthony',
    role: 'Team Member',
    image: '/images/team/anthony.webp',
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
            <p className="text-white/[0.52] text-[18px] font-light leading-[1.85] mt-4">
              Experienced professionals dedicated to delivering credible valuations across Hawai&#8216;i and the Pacific.
            </p>
            <p className="text-gold/70 text-[13px] tracking-[0.15em] uppercase font-serif mt-4">
              Click a photo to download CV
            </p>
          </div>
        </RevealOnScroll>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, i) => {
            const Avatar = (
              <div className="relative mx-auto w-[180px] h-[180px] mb-6">
                {/* Outer decorative ring */}
                <div className="absolute inset-0 rounded-full border border-gold/20 transition-all duration-500 group-hover:border-gold/60 group-hover:scale-105" />

                {/* Inner circle with photo */}
                <div className="absolute inset-[6px] rounded-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5 transition-all duration-500">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Gold accent dot */}
                <div className="absolute bottom-1 right-3 w-3 h-3 rounded-full bg-gold border-2 border-navy transition-transform duration-300 group-hover:scale-125" />

                {/* Download hover overlay */}
                {member.cv && (
                  <div className="absolute inset-[6px] rounded-full bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span className="text-gold text-[11px] tracking-[0.15em] uppercase font-serif mt-1.5">
                      Download CV
                    </span>
                  </div>
                )}
              </div>
            )

            const isLastAlone = i === team.length - 1 && team.length % 4 === 1
            return (
              <RevealOnScroll
                key={i}
                delay={i * 0.08}
                className={isLastAlone ? 'sm:col-span-2 lg:col-start-2 lg:col-span-2' : ''}
              >
                <div className="group relative text-center">
                  {member.cv ? (
                    <a
                      href={member.cv}
                      download={member.cvFilename}
                      aria-label={`Download CV for ${member.name}`}
                      className="block cursor-pointer"
                    >
                      {Avatar}
                    </a>
                  ) : (
                    Avatar
                  )}

                  {/* Name & Role */}
                  <h3 className="font-serif text-[20px] text-white transition-colors duration-300 group-hover:text-gold px-2 leading-tight">
                    {member.name}
                  </h3>
                  <p className="font-serif font-light text-[13px] text-white/50 tracking-[0.08em] uppercase mt-1.5">
                    {member.role}
                  </p>

                  {/* Underline accent */}
                  <div className="w-8 h-px bg-gold/30 mx-auto mt-4 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />
                </div>
              </RevealOnScroll>
            )
          })}
        </div>

        {/* CTA */}
        <RevealOnScroll delay={0.3}>
          <div className="text-center mt-16">
            <Button href="/contact" variant="outline-light">
              Work With Our Team
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

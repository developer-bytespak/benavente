import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { getVisibleTeam } from '@/lib/cms/team'
import TeamGrid from '@/components/sections/about/TeamGrid'

export default async function MeetTeam() {
  const team = await getVisibleTeam()

  return (
    <section className="bg-navy py-[108px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto">
        <RevealOnScroll>
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <div className="flex justify-center mb-4">
              <SectionLabel variant="light">Our People</SectionLabel>
            </div>
            <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-white leading-[1.15]">
              Meet the <span className="italic text-gold">Team</span>
            </h2>
            <p className="text-white/[0.52] text-[18px] font-light leading-[1.85] mt-4">
              Our MAI certified appraisers and SRA designated appraisers serve as certified real estate appraisers in Hawaii, delivering credible valuations across Hawai&#8216;i and the Pacific.
            </p>
            <p className="text-gold/70 text-[13px] tracking-[0.15em] uppercase font-serif mt-4">
              Click a member to view their profile
            </p>
          </div>
        </RevealOnScroll>

        {team.length > 0 && <TeamGrid team={team} />}

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

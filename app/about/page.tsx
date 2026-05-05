import { Metadata } from 'next'
import PageHero from '@/components/sections/about/PageHero'
import StorySection from '@/components/sections/about/StorySection'
import MissionPillars from '@/components/sections/about/MissionPillars'
import RegionsCoverage from '@/components/sections/about/RegionsCoverage'
import MeetTeam from '@/components/sections/about/MeetTeam'
import CtaBand from '@/components/sections/home/CtaBand'
import { getAboutPage } from '@/lib/cms/about'
import { getRegions } from '@/lib/cms/regions'

export const metadata: Metadata = {
  title: 'About',
  description:
    "Learn about The Benavente Group — Hawaii-based real estate appraisers with over 50 years of combined experience across the Pacific.",
}

export const revalidate = 30

export default async function AboutPage() {
  const [about, regions] = await Promise.all([getAboutPage(), getRegions()])

  return (
    <>
      <PageHero
        bannerUrl={about?.banner_url ?? null}
        headline={about?.hero_headline ?? null}
        subtitle={about?.hero_subtitle ?? null}
      />
      <StorySection
        heading={about?.story_heading ?? null}
        paragraphs={about?.story_paragraphs ?? []}
        stats={about?.story_stats ?? []}
      />
      <MissionPillars
        missionHeadline={about?.mission_headline ?? null}
        missionText={about?.mission_text ?? null}
        values={about?.core_values ?? []}
      />
      <RegionsCoverage regions={regions} />
      <MeetTeam />
      <CtaBand />
    </>
  )
}

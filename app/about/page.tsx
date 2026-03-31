import { Metadata } from 'next'
import PageHero from '@/components/sections/about/PageHero'
import StorySection from '@/components/sections/about/StorySection'
import MissionPillars from '@/components/sections/about/MissionPillars'
import RegionsCoverage from '@/components/sections/about/RegionsCoverage'
import CtaBand from '@/components/sections/home/CtaBand'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about The Benavente Group — Hawaii-based real estate appraisers with over 50 years of combined experience across the Pacific.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <StorySection />
      <MissionPillars />
      <RegionsCoverage />
      <CtaBand />
    </>
  )
}

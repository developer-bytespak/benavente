import Hero from '@/components/sections/home/Hero'
import Ticker from '@/components/sections/home/Ticker'
import IntroSplit from '@/components/sections/home/IntroSplit'

import StatsRow from '@/components/sections/home/StatsRow'
import GalleryPreview from '@/components/sections/home/GalleryPreview'
import TestimonialPull from '@/components/sections/home/TestimonialPull'
import BlogPreview from '@/components/sections/home/BlogPreview'
import CtaBand from '@/components/sections/home/CtaBand'
import { getLatestPosts } from '@/lib/sanity/queries'

export const revalidate = 30

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3)
  return (
    <>
      <Hero />
      <Ticker />
      <IntroSplit />

      <StatsRow />
      <GalleryPreview />
      <TestimonialPull />
      <BlogPreview posts={latestPosts} />
      <CtaBand />
    </>
  )
}

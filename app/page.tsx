import Hero from '@/components/sections/home/Hero'
import Ticker from '@/components/sections/home/Ticker'
import IntroSplit from '@/components/sections/home/IntroSplit'
import ServicesGrid from '@/components/sections/home/ServicesGrid'
import StatsRow from '@/components/sections/home/StatsRow'
import GalleryPreview from '@/components/sections/home/GalleryPreview'
import TestimonialPull from '@/components/sections/home/TestimonialPull'
import BlogPreview from '@/components/sections/home/BlogPreview'
import CtaBand from '@/components/sections/home/CtaBand'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <IntroSplit />
      <ServicesGrid />
      <StatsRow />
      <GalleryPreview />
      <TestimonialPull />
      <BlogPreview />
      <CtaBand />
    </>
  )
}

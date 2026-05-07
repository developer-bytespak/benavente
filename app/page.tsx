import Hero from '@/components/sections/home/Hero'
import Ticker from '@/components/sections/home/Ticker'
import IntroSplit from '@/components/sections/home/IntroSplit'
import StatsRow from '@/components/sections/home/StatsRow'
import GalleryPreview from '@/components/sections/home/GalleryPreview'
import TestimonialPull from '@/components/sections/home/TestimonialPull'
import BlogPreview from '@/components/sections/home/BlogPreview'
import CtaBand from '@/components/sections/home/CtaBand'
import { getLatestPosts } from '@/lib/sanity/queries'
import { getHomePage } from '@/lib/cms/home'
import { getVisibleTestimonials } from '@/lib/cms/testimonials'
import type { Metadata } from 'next'

export const revalidate = 30

export const metadata: Metadata = {
  title: 'Hawaii Commercial Real Estate Appraisers & Consultants',
  description:
    'Hawaii commercial real estate appraisers offering valuation, litigation support, and market analysis across Honolulu and the Pacific.',
}

export default async function HomePage() {
  const [home, latestPosts, testimonials] = await Promise.all([
    getHomePage(),
    getLatestPosts(3),
    getVisibleTestimonials(),
  ])

  return (
    <>
      <Hero
        videos={home?.hero_video_urls ?? []}
        headline={home?.hero_headline ?? null}
        subhead={home?.hero_subhead ?? null}
      />
      <Ticker items={home?.ticker_items ?? []} />
      <IntroSplit
        heading={home?.intro_heading ?? null}
        paragraphs={home?.intro_paragraphs ?? []}
        stats={home?.stats ?? []}
      />
      <StatsRow stats={home?.stats ?? []} />
      <GalleryPreview />
      <TestimonialPull testimonials={testimonials} />
      <BlogPreview posts={latestPosts} />
      <CtaBand />
    </>
  )
}

import { Metadata } from 'next'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import FeaturedPost from '@/components/sections/insights/FeaturedPost'
import AllPostsGrid from '@/components/sections/insights/AllPostsGrid'
import { getAllPosts, getFeaturedAndRecent } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Hawaii Real Estate Insights & Market Analysis Blog',
  description:
    'Hawaii real estate insights, valuation commentary, and Pacific market analysis from credentialed appraisers at The Benavente Group.',
}

export const revalidate = 30

export default async function BlogPage() {
  const [{ featured, recent }, allPosts] = await Promise.all([
    getFeaturedAndRecent(),
    getAllPosts(),
  ])

  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-navy min-h-screen flex items-center pt-[120px] pb-[60px] px-[4.5%] overflow-hidden">
        <Image
          src="/images/regions/oahu-skyline.webp"
          alt="Honolulu skyline"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />
        <RevealOnScroll>
          <div className="relative max-w-[1280px] mx-auto">
            <SectionLabel variant="light">Hawaii Real Estate Insights</SectionLabel>
            <h1 className="font-serif text-[clamp(44px,6vw,72px)] text-white leading-[1.08]">
              Hawaii Real Estate{' '}
              <span className="italic text-gold-light">Insights</span>
              <br />
              &amp; Market Analysis
            </h1>
            <p className="text-white/[0.58] text-[18px] font-light leading-[1.85] max-w-[560px] mt-5">
              In-depth Hawaii commercial real estate insights, Hawaii property
              valuation insights, and Pacific region market analysis from
              credentialed appraisers.
            </p>
            <div className="flex flex-wrap gap-5 mt-7">
              <MicroCTA href="/contact" variant="light">
                Get Expert Advice
              </MicroCTA>
              <MicroCTA href="/about" variant="light">
                About Our Team
              </MicroCTA>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <FeaturedPost featured={featured} recent={recent} />
      <AllPostsGrid posts={allPosts} />
    </>
  )
}

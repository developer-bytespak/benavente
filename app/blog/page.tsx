import { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import FeaturedPost from '@/components/sections/insights/FeaturedPost'
import AllPostsGrid from '@/components/sections/insights/AllPostsGrid'
import NewsletterCta from '@/components/sections/insights/NewsletterCta'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Real estate market analysis, valuation insights, and commentary on Hawaii and Pacific region property trends from The Benavente Group.',
}

export default function BlogPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-navy pt-[160px] pb-[80px] px-[4.5%]">
        <RevealOnScroll>
          <div className="max-w-[1280px] mx-auto">
            <SectionLabel variant="light">Market Insights</SectionLabel>
            <h1 className="font-serif text-[clamp(44px,6vw,72px)] text-white leading-[1.08]">
              Real Estate <span className="italic text-gold-light">Analysis</span><br />
              &amp; Commentary
            </h1>
            <p className="text-white/[0.58] text-[18px] font-light leading-[1.85] max-w-[560px] mt-5">
              In-depth perspectives on Hawai&#8216;i&apos;s real estate market, valuation methodology, and Pacific region property trends.
            </p>
            <div className="flex flex-wrap gap-5 mt-7">
              <MicroCTA href="/contact" variant="light">Get Expert Advice</MicroCTA>
              <MicroCTA href="/about" variant="light">About Our Team</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <FeaturedPost />
      <AllPostsGrid />
      <NewsletterCta />
    </>
  )
}

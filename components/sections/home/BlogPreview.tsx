'use client'

import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { posts } from '@/lib/data/posts'

const postImages: Record<string, string> = {
  'hawaii-commercial-cap-rate-trends-2025': '/images/regions/oahu-skyline.webp',
  'understanding-property-tax-appeals-hawaii': '/images/gallery/office/dji_0912.webp',
  'pacific-island-markets-valuation-challenges': '/images/regions/guam.webp',
  'litigation-support-what-attorneys-need': '/images/gallery/cbd/dji_0347.webp',
  'guam-real-estate-emerging-dynamics': '/images/regions/guam-2.webp',
  'what-is-a-cap-rate': '/images/gallery/retail/dji_0083-large.webp',
}

const previewPosts = posts.slice(0, 3)

export default function BlogPreview() {
  return (
    <section className="bg-white py-[108px] px-[4.5%]">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gold/20 pb-5 mb-10 gap-4">
        <div>
          <SectionLabel>BLOGS</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
            Latest <span className="italic text-gold">Analysis</span>
          </h2>
        </div>
        <MicroCTA href="/blog">Read Blogs</MicroCTA>
      </div>

      {/* Grid */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {previewPosts.map((post, index) => (
          <RevealOnScroll key={post.id} delay={index * 0.08}>
            <div className="group cursor-pointer">
              <div className="relative aspect-video rounded-[2px] overflow-hidden mb-5">
                <Image
                  src={postImages[post.slug] || '/images/regions/oahu-skyline.webp'}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="text-gold text-[12px] uppercase tracking-[0.2em] font-serif">{post.date}</span>
              <h3 className="font-serif text-[22px] text-navy mt-2 group-hover:text-gold transition-colors duration-300 leading-[1.25]">
                {post.title}
              </h3>
              <p className="font-serif font-light text-[17px] text-navy mt-2 leading-[1.7] line-clamp-2">
                {post.excerpt}
              </p>
              <div className="mt-4">
                <MicroCTA href="/blog">Read More</MicroCTA>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

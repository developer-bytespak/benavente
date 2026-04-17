'use client'

import Image from 'next/image'
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

export default function AllPostsGrid() {
  return (
    <section className="bg-cream border-t border-gold/12 py-[80px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {posts.map((post, index) => (
          <RevealOnScroll key={post.id} delay={index * 0.08}>
            <div className="bg-white border border-gold/10 rounded-[2px] overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-navy/5 transition-shadow duration-300">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={postImages[post.slug] || '/images/regions/oahu-skyline.webp'}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-gold text-[12px] uppercase tracking-[0.2em] font-serif">{post.date}</span>
                <h3 className="font-serif text-[21px] text-navy mt-2 leading-[1.25] group-hover:text-gold transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="font-serif font-light text-[17px] text-navy mt-2 leading-[1.7] line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-4">
                  <MicroCTA href="/blog">Read More</MicroCTA>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

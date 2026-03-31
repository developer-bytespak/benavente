'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { posts } from '@/lib/data/posts'

const previewPosts = posts.slice(0, 3)

export default function BlogPreview() {
  return (
    <section className="bg-white py-[108px] px-[4.5%]">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gold/20 pb-5 mb-10 gap-4">
        <div>
          <SectionLabel>Insights</SectionLabel>
          <h2 className="font-serif text-[clamp(34px,4vw,50px)] text-navy leading-[1.15]">
            Latest <span className="italic text-gold">Analysis</span>
          </h2>
        </div>
        <MicroCTA href="/blog">Read Insights</MicroCTA>
      </div>

      {/* Grid */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {previewPosts.map((post, index) => (
          <RevealOnScroll key={post.id} delay={index * 0.08}>
            <div className="group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-cream-deeper to-cream-dark rounded-[2px] overflow-hidden mb-5" />
              <span className="text-gold text-[9.5px] uppercase tracking-[0.2em] font-sans">{post.date}</span>
              <h3 className="font-serif text-[21px] text-navy mt-2 group-hover:text-gold transition-colors duration-300 leading-[1.25]">
                {post.title}
              </h3>
              <p className="font-sans font-light text-[13px] text-slate mt-2 leading-[1.7] line-clamp-2">
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

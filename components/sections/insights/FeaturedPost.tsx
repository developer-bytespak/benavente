'use client'

import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { posts } from '@/lib/data/posts'

export default function FeaturedPost() {
  const featured = posts[0]
  const sidebar = posts.slice(1, 5)

  return (
    <section className="max-w-[1280px] mx-auto py-[80px] px-[4.5%]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-13">
        {/* Featured */}
        <RevealOnScroll>
          <div>
            <div className="aspect-[16/10] bg-gradient-to-br from-cream-deeper to-cream-dark rounded-[2px] overflow-hidden cursor-pointer" />
            <div className="flex items-center gap-3 mt-5">
              <span className="text-gold text-[9.5px] uppercase tracking-[0.2em] font-sans">{featured.date}</span>
              <span className="text-[9.5px] uppercase tracking-[0.12em] font-sans text-slate-light border border-slate-light/20 px-2 py-0.5 rounded-[2px]">
                {featured.category}
              </span>
            </div>
            <h2 className="font-serif text-[clamp(26px,3vw,36px)] text-navy mt-3 leading-[1.2]">
              {featured.title}
            </h2>
            <p className="font-sans font-light text-[14px] text-slate mt-3 leading-[1.75]">
              {featured.excerpt}
            </p>
            <div className="mt-5">
              <MicroCTA href="/blog">Read Full Article</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>

        {/* Sidebar */}
        <RevealOnScroll delay={0.15}>
          <div>
            <h3 className="font-sans font-medium text-[9px] uppercase tracking-[0.25em] text-slate-light mb-6">
              Recent Articles
            </h3>
            {sidebar.map((post, i) => (
              <div
                key={post.id}
                className={`pb-5 mb-5 ${i < sidebar.length - 1 ? 'border-b border-gold/10' : ''}`}
              >
                <span className="text-gold text-[9.5px] uppercase tracking-[0.2em] font-sans">{post.date}</span>
                <h4 className="font-serif text-[16px] text-navy mt-1.5 leading-[1.3]">{post.title}</h4>
                <div className="mt-2">
                  <MicroCTA href="/blog">Read More</MicroCTA>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

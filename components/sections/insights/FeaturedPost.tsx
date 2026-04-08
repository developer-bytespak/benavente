'use client'

import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { posts } from '@/lib/data/posts'

export default function FeaturedPost() {
  const featured = posts[0]
  const sidebar = posts.slice(1, 4)

  return (
    <section className="max-w-[1280px] mx-auto py-[80px] px-[4.5%]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-20">
        {/* Featured */}
        <RevealOnScroll>
          <div className="group cursor-pointer">
            <div className="aspect-[16/10] bg-navy rounded-[2px] overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-gold/20" />
              <div className="relative text-center px-8">
                <span className="text-gold/80 text-[12px] uppercase tracking-[0.3em] font-serif">
                  Featured Article
                </span>
                <h3 className="font-serif text-[clamp(22px,2.5vw,32px)] text-white mt-3 leading-[1.25]">
                  {featured.title}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <span className="text-gold text-[12px] uppercase tracking-[0.2em] font-serif">{featured.date}</span>
              <span className="text-[12px] uppercase tracking-[0.12em] font-serif text-slate-light border border-slate-light/20 px-2 py-0.5 rounded-[2px]">
                {featured.category}
              </span>
            </div>
            <h2 className="font-serif text-[clamp(26px,3vw,36px)] text-navy mt-3 leading-[1.2] group-hover:text-gold transition-colors duration-300">
              {featured.title}
            </h2>
            <p className="font-serif font-light text-[20px] text-navy mt-3 leading-[1.75]">
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
            <h3 className="font-serif font-medium text-[12px] uppercase tracking-[0.25em] text-slate-light mb-6 pb-3 border-b border-gold/20">
              Recent Articles
            </h3>
            {sidebar.map((post, i) => (
              <div
                key={post.id}
                className={`pb-6 mb-6 group cursor-pointer ${i < sidebar.length - 1 ? 'border-b border-gold/10' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gold text-[12px] uppercase tracking-[0.2em] font-serif">{post.date}</span>
                  <span className="text-[11px] uppercase tracking-[0.12em] font-serif text-slate-light/70">
                    {post.category}
                  </span>
                </div>
                <h4 className="font-serif text-[16px] text-navy mt-1.5 leading-[1.3] group-hover:text-gold transition-colors duration-300">
                  {post.title}
                </h4>
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

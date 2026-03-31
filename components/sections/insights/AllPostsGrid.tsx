'use client'

import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { posts } from '@/lib/data/posts'

export default function AllPostsGrid() {
  return (
    <section className="bg-cream border-t border-gold/12 py-[80px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {posts.map((post, index) => (
          <RevealOnScroll key={post.id} delay={index * 0.08}>
            <div className="bg-white border border-gold/10 rounded-[2px] overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-navy/5 transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-br from-cream-deeper to-cream-dark" />
              <div className="p-6">
                <span className="text-gold text-[9.5px] uppercase tracking-[0.2em] font-sans">{post.date}</span>
                <h3 className="font-serif text-[19px] text-navy mt-2 leading-[1.25] group-hover:text-gold transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="font-sans font-light text-[13px] text-slate mt-2 leading-[1.7] line-clamp-2">
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

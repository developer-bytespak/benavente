'use client'

import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import MicroCTAStatic from '@/components/ui/MicroCTAStatic'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { urlFor } from '@/lib/sanity/image'
import { fallbackImageForSlug } from '@/lib/sanity/fallbackImages'
import {
  type SanityPostCard,
  displayCategory,
  displayDate,
} from '@/lib/sanity/types'

interface Props {
  posts: SanityPostCard[]
}

function coverSrc(post: SanityPostCard): string {
  if (post.coverImage?.asset) {
    return urlFor(post.coverImage).width(900).height(600).fit('crop').url()
  }
  return fallbackImageForSlug(post.slug)
}

export default function BlogPreview({ posts }: Props) {
  if (posts.length === 0) return null

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
        {posts.map((post, index) => (
          <RevealOnScroll key={post._id} delay={index * 0.08}>
            <Link href={`/blog/${post.slug}`} className="block group">
              <div className="relative aspect-video rounded-[2px] overflow-hidden mb-5">
                <Image
                  src={coverSrc(post)}
                  alt={post.coverImage?.alt || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gold text-[12px] uppercase tracking-[0.2em] font-serif">
                  {displayDate(post.publishedAt)}
                </span>
                <span className="text-[11px] uppercase tracking-[0.12em] font-serif text-slate-light/70">
                  {displayCategory(post)}
                </span>
              </div>
              <h3 className="font-serif text-[22px] text-navy mt-2 group-hover:text-gold transition-colors duration-300 leading-[1.25]">
                {post.title}
              </h3>
              <p className="font-serif font-light text-[17px] text-navy mt-2 leading-[1.7] line-clamp-2">
                {post.excerpt}
              </p>
              <div className="mt-4">
                <MicroCTAStatic>Read More</MicroCTAStatic>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

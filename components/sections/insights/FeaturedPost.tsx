'use client'

import Image from 'next/image'
import Link from 'next/link'
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
  featured: SanityPostCard | null
  recent: SanityPostCard[]
}

function coverSrc(post: SanityPostCard): string {
  if (post.coverImage?.asset) {
    return urlFor(post.coverImage).width(1400).height(900).fit('crop').url()
  }
  return fallbackImageForSlug(post.slug)
}

export default function FeaturedPost({ featured, recent }: Props) {
  if (!featured) {
    return (
      <section className="max-w-[1280px] mx-auto py-[80px] px-[4.5%]">
        <p className="font-serif text-slate-light text-center">
          No articles have been published yet. Check back soon.
        </p>
      </section>
    )
  }

  return (
    <section className="max-w-[1280px] mx-auto py-[80px] px-[4.5%]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-20">
        {/* Featured */}
        <RevealOnScroll>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="aspect-[16/10] rounded-[2px] overflow-hidden relative flex items-center justify-center">
              <Image
                src={coverSrc(featured)}
                alt={featured.coverImage?.alt || featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/50 to-navy/30" />
              <div className="relative text-center px-8">
                <span className="text-gold/90 text-[12px] uppercase tracking-[0.3em] font-serif">
                  Featured Article
                </span>
                <h3 className="font-serif text-[clamp(22px,2.5vw,32px)] text-white mt-3 leading-[1.25]">
                  {featured.title}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <span className="text-gold text-[12px] uppercase tracking-[0.2em] font-serif">
                {displayDate(featured.publishedAt)}
              </span>
              <span className="text-[12px] uppercase tracking-[0.12em] font-serif text-slate-light border border-slate-light/20 px-2 py-0.5 rounded-[2px]">
                {displayCategory(featured)}
              </span>
            </div>
            <h2 className="font-serif text-[clamp(26px,3vw,36px)] text-navy mt-3 leading-[1.2] group-hover:text-gold transition-colors duration-300">
              {featured.title}
            </h2>
            <p className="font-serif font-light text-[20px] text-navy mt-3 leading-[1.75]">
              {featured.excerpt}
            </p>
            <div className="mt-5">
              <MicroCTAStatic>Read Full Article</MicroCTAStatic>
            </div>
          </Link>
        </RevealOnScroll>

        {/* Sidebar */}
        <RevealOnScroll delay={0.15}>
          <div>
            <h3 className="font-serif font-medium text-[12px] uppercase tracking-[0.25em] text-slate-light mb-6 pb-3 border-b border-gold/20">
              Recent Articles
            </h3>
            {recent.length === 0 && (
              <p className="font-serif text-slate-light text-[15px]">
                More articles coming soon.
              </p>
            )}
            {recent.map((post, i) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className={`block pb-6 mb-6 group ${
                  i < recent.length - 1 ? 'border-b border-gold/10' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gold text-[12px] uppercase tracking-[0.2em] font-serif">
                    {displayDate(post.publishedAt)}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.12em] font-serif text-slate-light/70">
                    {displayCategory(post)}
                  </span>
                </div>
                <h4 className="font-serif text-[16px] text-navy mt-1.5 leading-[1.3] group-hover:text-gold transition-colors duration-300">
                  {post.title}
                </h4>
                <div className="mt-2">
                  <MicroCTAStatic>Read More</MicroCTAStatic>
                </div>
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

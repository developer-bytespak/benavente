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
  posts: SanityPostCard[]
}

function coverSrc(post: SanityPostCard): string {
  if (post.coverImage?.asset) {
    return urlFor(post.coverImage).width(900).height(600).fit('crop').url()
  }
  return fallbackImageForSlug(post.slug)
}

export default function AllPostsGrid({ posts }: Props) {
  if (posts.length === 0) {
    return (
      <section className="bg-cream border-t border-gold/12 py-[80px] px-[4.5%]">
        <p className="font-serif text-center text-slate-light">
          No articles yet.
        </p>
      </section>
    )
  }

  return (
    <section className="bg-cream border-t border-gold/12 py-[80px] px-[4.5%]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {posts.map((post, index) => (
          <RevealOnScroll key={post._id} delay={index * 0.08}>
            <Link href={`/blog/${post.slug}`} className="block">
              <article className="bg-white border border-gold/10 rounded-[2px] overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-navy/5 transition-shadow duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={coverSrc(post)}
                    alt={post.coverImage?.alt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="text-gold text-[12px] uppercase tracking-[0.2em] font-serif">
                      {displayDate(post.publishedAt)}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.12em] font-serif text-slate-light/70">
                      {displayCategory(post)}
                    </span>
                  </div>
                  <h3 className="font-serif text-[21px] text-navy mt-2 leading-[1.25] group-hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="font-serif font-light text-[17px] text-navy mt-2 leading-[1.7] line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4">
                    <MicroCTAStatic>Read More</MicroCTAStatic>
                  </div>
                </div>
              </article>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

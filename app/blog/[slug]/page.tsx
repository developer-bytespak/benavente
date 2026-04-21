import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import PortableContent from '@/components/sections/insights/PortableContent'
import { urlFor } from '@/lib/sanity/image'
import { fallbackImageForSlug } from '@/lib/sanity/fallbackImages'
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from '@/lib/sanity/queries'
import { displayCategory, displayDate } from '@/lib/sanity/types'

export const revalidate = 30

interface Params {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return { title: 'Article not found' }
  }
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.coverImage?.asset
        ? [urlFor(post.coverImage).width(1200).height(630).fit('crop').url()]
        : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const categoryKey =
    post.category === '__custom__' ? post.customCategory : post.category
  const related = categoryKey
    ? await getRelatedPosts(params.slug, categoryKey)
    : []

  const coverUrl = post.coverImage?.asset
    ? urlFor(post.coverImage).width(2000).height(1100).fit('crop').url()
    : fallbackImageForSlug(params.slug)

  return (
    <article>
      {/* Hero */}
      <section className="relative bg-navy min-h-[70vh] flex items-end pt-[140px] pb-[80px] px-[4.5%] overflow-hidden">
        <Image
          src={coverUrl}
          alt={post.coverImage?.alt || post.title}
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />
        <RevealOnScroll>
          <div className="relative max-w-[960px] mx-auto w-full">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-gold text-[12px] uppercase tracking-[0.3em] font-serif">
                {displayDate(post.publishedAt)}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-serif text-white/70 border border-white/20 px-3 py-1 rounded-[2px]">
                {displayCategory(post)}
              </span>
            </div>
            <h1 className="font-serif text-[clamp(34px,5vw,60px)] text-white leading-[1.1] max-w-[820px]">
              {post.title}
            </h1>
            {post.author && (
              <p className="mt-6 text-white/60 text-[14px] uppercase tracking-[0.25em] font-serif">
                By {post.author}
              </p>
            )}
          </div>
        </RevealOnScroll>
      </section>

      {/* Body */}
      <section className="bg-white py-[80px] px-[4.5%]">
        <div className="max-w-[760px] mx-auto">
          {post.excerpt && (
            <p className="font-serif italic text-[22px] text-navy/80 leading-[1.6] border-l-2 border-gold pl-6 mb-12">
              {post.excerpt}
            </p>
          )}
          {post.body ? (
            <PortableContent value={post.body} />
          ) : (
            <p className="font-serif font-light text-[19px] text-slate-light leading-[1.85]">
              Full article content coming soon.
            </p>
          )}

          <div className="mt-16 pt-10 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="font-serif text-[14px] uppercase tracking-[0.2em] text-navy hover:text-gold transition-colors"
            >
              ← Back to all articles
            </Link>
            <MicroCTA href="/contact">Discuss a Project</MicroCTA>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream border-t border-gold/12 py-[80px] px-[4.5%]">
          <div className="max-w-[1280px] mx-auto">
            <h3 className="font-serif text-[clamp(24px,2.6vw,32px)] text-navy mb-10">
              Related <span className="italic text-gold">Articles</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {related.map((p) => {
                const src = p.coverImage?.asset
                  ? urlFor(p.coverImage).width(900).height(600).fit('crop').url()
                  : fallbackImageForSlug(p.slug)
                return (
                  <Link
                    key={p._id}
                    href={`/blog/${p.slug}`}
                    className="block group"
                  >
                    <div className="relative aspect-video rounded-[2px] overflow-hidden mb-5 bg-navy/10">
                      <Image
                        src={src}
                        alt={p.coverImage?.alt || p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-gold text-[12px] uppercase tracking-[0.2em] font-serif">
                      {displayDate(p.publishedAt)}
                    </span>
                    <h4 className="font-serif text-[20px] text-navy mt-2 leading-[1.3] group-hover:text-gold transition-colors">
                      {p.title}
                    </h4>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}

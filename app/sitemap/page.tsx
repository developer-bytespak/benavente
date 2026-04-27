import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import MicroCTA from '@/components/ui/MicroCTA'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { getAllPosts } from '@/lib/sanity/queries'
import { galleryCategories } from '@/lib/data/gallery'

export const revalidate = 30

export const metadata: Metadata = {
  title: 'Sitemap',
  description:
    'Browse every page across The Benavente Group — firm overview, portfolio categories, latest insights, and ways to get in touch.',
  alternates: { canonical: '/sitemap' },
}

const mainPages = [
  { href: '/', label: 'Home', desc: 'Firm overview & featured work' },
  { href: '/about', label: 'About', desc: 'Our story, team & coverage' },
  { href: '/gallery', label: 'Portfolio', desc: 'Selected appraisal work' },
  { href: '/blog', label: 'Insights', desc: 'Articles & market commentary' },
  { href: '/contact', label: 'Contact', desc: 'Engage our team' },
]

const resourceLinks = [
  { href: '/sitemap.xml', label: 'XML Sitemap', desc: 'For search engines' },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function SitemapPage() {
  const posts = await getAllPosts().catch(() => [])

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy min-h-[60vh] flex items-center pt-[120px] pb-[60px] px-[4.5%] overflow-hidden">
        <Image
          src="/images/regions/oahu-lanikai.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />

        <RevealOnScroll>
          <div className="relative max-w-[1280px] mx-auto">
            <SectionLabel variant="light">Site Index</SectionLabel>
            <h1 className="font-serif text-[clamp(44px,6vw,72px)] text-white leading-[1.08]">
              Every Page,<br />
              <span className="italic text-gold-light">One Place</span>
            </h1>
            <p className="text-white/[0.58] text-[18px] font-light leading-[1.85] max-w-[560px] mt-5">
              A complete map of The Benavente Group online — pages, portfolio
              categories, and the latest insights from our team.
            </p>
            <div className="flex flex-wrap gap-5 mt-7">
              <MicroCTA href="/contact" variant="light">Contact Us</MicroCTA>
              <MicroCTA href="/gallery" variant="light">View Portfolio</MicroCTA>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Index Grid */}
      <section className="bg-cream py-24 px-[4.5%]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main pages */}
            <div className="lg:col-span-4">
              <SectionLabel>Main Pages</SectionLabel>
              <h2 className="font-serif text-[32px] text-navy leading-[1.15] mb-8">
                Core <span className="italic text-gold-dark">navigation</span>
              </h2>
              <ul className="space-y-1">
                {mainPages.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="group block border-t border-navy/10 py-4 transition-colors duration-300 hover:border-gold"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-serif text-[20px] text-navy group-hover:text-gold-dark transition-colors duration-300">
                          {p.label}
                        </span>
                        <span
                          aria-hidden
                          className="text-gold text-[14px] translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                        >
                          →
                        </span>
                      </div>
                      <p className="text-slate text-[13.5px] font-sans mt-1">
                        {p.desc}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <SectionLabel>Resources</SectionLabel>
                <ul className="space-y-1">
                  {resourceLinks.map((r) => (
                    <li key={r.href}>
                      <a
                        href={r.href}
                        className="group block border-t border-navy/10 py-4 hover:border-gold transition-colors duration-300"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="font-serif text-[18px] text-navy group-hover:text-gold-dark transition-colors duration-300">
                            {r.label}
                          </span>
                          <span
                            aria-hidden
                            className="text-gold text-[12px] uppercase tracking-[0.2em]"
                          >
                            .xml
                          </span>
                        </div>
                        <p className="text-slate text-[13.5px] font-sans mt-1">
                          {r.desc}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Portfolio categories */}
            <div className="lg:col-span-4">
              <SectionLabel>Portfolio Categories</SectionLabel>
              <h2 className="font-serif text-[32px] text-navy leading-[1.15] mb-8">
                Browse by <span className="italic text-gold-dark">sector</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-1">
                {galleryCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/gallery?cat=${cat.slug}`}
                      className="group flex items-center justify-between gap-3 border-t border-navy/10 py-3.5 hover:border-gold transition-colors duration-300"
                    >
                      <span className="font-serif text-[16.5px] text-navy group-hover:text-gold-dark transition-colors duration-300">
                        {cat.label}
                      </span>
                      <span className="text-slate-light text-[12px] font-sans tabular-nums">
                        {cat.images.length}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Insights */}
            <div className="lg:col-span-4">
              <SectionLabel>Latest Insights</SectionLabel>
              <h2 className="font-serif text-[32px] text-navy leading-[1.15] mb-8">
                Articles &amp; <span className="italic text-gold-dark">commentary</span>
              </h2>

              {posts.length === 0 ? (
                <p className="text-slate text-[14px] font-sans">
                  Articles will appear here as they are published.
                </p>
              ) : (
                <ul className="space-y-1">
                  {posts.map((post) => (
                    <li key={post._id}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group block border-t border-navy/10 py-4 hover:border-gold transition-colors duration-300"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="font-serif text-[16.5px] text-navy leading-snug group-hover:text-gold-dark transition-colors duration-300">
                            {post.title}
                          </span>
                          <span className="text-slate-light text-[11.5px] font-sans uppercase tracking-[0.18em] whitespace-nowrap">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                        {post.excerpt && (
                          <p className="text-slate text-[13.5px] font-sans mt-1.5 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8">
                <MicroCTA href="/blog" variant="dark">
                  View all insights
                </MicroCTA>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-20 pt-8 border-t border-navy/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-slate text-[13px] font-sans">
              Looking for the machine-readable version? See{' '}
              <a
                href="/sitemap.xml"
                className="text-navy underline decoration-gold/60 underline-offset-4 hover:text-gold-dark transition-colors"
              >
                /sitemap.xml
              </a>
              .
            </p>
            <p className="text-slate-light text-[12px] font-sans uppercase tracking-[0.22em]">
              Updated automatically
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

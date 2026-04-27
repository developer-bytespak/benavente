import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/sanity/queries'

export const revalidate = 30

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://benaventegroup.com'

type Entry = {
  loc: string
  lastmod: string
  changefreq: 'weekly' | 'monthly' | 'daily' | 'yearly'
  priority: string
}

function toAbsolute(path: string): string {
  return new URL(path, siteUrl).toString()
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const nowIso = new Date().toISOString()

  const staticEntries: Entry[] = [
    { loc: toAbsolute('/'), lastmod: nowIso, changefreq: 'weekly', priority: '1.0' },
    { loc: toAbsolute('/about'), lastmod: nowIso, changefreq: 'monthly', priority: '0.9' },
    { loc: toAbsolute('/gallery'), lastmod: nowIso, changefreq: 'monthly', priority: '0.8' },
    { loc: toAbsolute('/blog'), lastmod: nowIso, changefreq: 'weekly', priority: '0.9' },
    { loc: toAbsolute('/contact'), lastmod: nowIso, changefreq: 'monthly', priority: '0.8' },
  ]

  let postEntries: Entry[] = []
  try {
    const posts = await getAllPosts()
    postEntries = posts.map((post) => ({
      loc: toAbsolute(`/blog/${post.slug}`),
      lastmod: post.publishedAt ?? nowIso,
      changefreq: 'monthly',
      priority: '0.7',
    }))
  } catch {
    // Sanity unavailable — serve static entries only.
  }

  const entries = [...staticEntries, ...postEntries]

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url>\n` +
          `    <loc>${escapeXml(e.loc)}</loc>\n` +
          `    <lastmod>${e.lastmod}</lastmod>\n` +
          `    <changefreq>${e.changefreq}</changefreq>\n` +
          `    <priority>${e.priority}</priority>\n` +
          `  </url>`
      )
      .join('\n') +
    `\n</urlset>\n`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=86400',
    },
  })
}

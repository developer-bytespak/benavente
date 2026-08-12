import { groq } from 'next-sanity'
import { sanityClient, isSanityConfigured } from './client'
import type { SanityPost, SanityPostCard } from './types'

const POST_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  category,
  customCategory,
  publishedAt
`

const POST_FULL_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  category,
  customCategory,
  author,
  publishedAt,
  body,
  seoTitle,
  seoDescription
`

const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc) {
    ${POST_CARD_FIELDS}
  }
`

const featuredPlusRecentQuery = groq`{
  "featured": *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc)[0] {
    ${POST_CARD_FIELDS}
  },
  "recent": *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc)[1...4] {
    ${POST_CARD_FIELDS}
  }
}`

const latestPostsQuery = groq`
  *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc)[0...$limit] {
    ${POST_CARD_FIELDS}
  }
`

const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FULL_FIELDS}
  }
`

const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)].slug.current
`

const relatedPostsQuery = groq`
  *[_type == "post" && defined(slug.current) && slug.current != $slug
    && (category == $category || customCategory == $category)]
    | order(publishedAt desc)[0...3] {
    ${POST_CARD_FIELDS}
  }
`

const fetchOpts = { next: { revalidate: 30 } } as const

// Sanity outages, an unreachable dataset, or missing credentials shouldn't take
// a whole page down — editorial content is supplementary on every route that
// reads it. Mirrors the degrade-to-empty behaviour in lib/cms/*, which logs and
// returns null rather than throwing.
async function safeFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  // No project configured — skip the request entirely rather than waiting on
  // one that cannot succeed.
  if (!isSanityConfigured) return fallback
  try {
    return await sanityClient.fetch<T>(query, params, fetchOpts)
  } catch (err) {
    console.error(
      '[sanity]',
      err instanceof Error ? err.message : String(err)
    )
    return fallback
  }
}

export async function getAllPosts(): Promise<SanityPostCard[]> {
  return safeFetch<SanityPostCard[]>(allPostsQuery, {}, [])
}

export async function getFeaturedAndRecent(): Promise<{
  featured: SanityPostCard | null
  recent: SanityPostCard[]
}> {
  const empty = { featured: null, recent: [] }
  const data = await safeFetch<{
    featured: SanityPostCard | null
    recent: SanityPostCard[]
  } | null>(featuredPlusRecentQuery, {}, empty)

  // A dataset with no posts resolves to null rather than the shape above.
  return {
    featured: data?.featured ?? null,
    recent: data?.recent ?? [],
  }
}

export async function getLatestPosts(
  limit = 3
): Promise<SanityPostCard[]> {
  return safeFetch<SanityPostCard[]>(latestPostsQuery, { limit }, [])
}

export async function getPostBySlug(
  slug: string
): Promise<SanityPost | null> {
  return safeFetch<SanityPost | null>(postBySlugQuery, { slug }, null)
}

export async function getAllPostSlugs(): Promise<string[]> {
  return safeFetch<string[]>(postSlugsQuery, {}, [])
}

export async function getRelatedPosts(
  slug: string,
  category: string
): Promise<SanityPostCard[]> {
  return safeFetch<SanityPostCard[]>(
    relatedPostsQuery,
    { slug, category },
    []
  )
}

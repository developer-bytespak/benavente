import { groq } from 'next-sanity'
import { sanityClient } from './client'
import type { SanityPost, SanityPostCard } from './types'

const POST_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  category,
  customCategory,
  publishedAt,
  featured
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
  featured,
  body,
  seoTitle,
  seoDescription
`

const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)]
    | order(featured desc, publishedAt desc) {
    ${POST_CARD_FIELDS}
  }
`

const featuredPlusRecentQuery = groq`{
  "featured": *[_type == "post" && featured == true && defined(slug.current)]
    | order(publishedAt desc)[0] {
    ${POST_CARD_FIELDS}
  },
  "recent": *[_type == "post" && featured != true && defined(slug.current)]
    | order(publishedAt desc)[0...6] {
    ${POST_CARD_FIELDS}
  },
  "fallbackLatest": *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc)[0] {
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

export async function getAllPosts(): Promise<SanityPostCard[]> {
  return sanityClient.fetch(allPostsQuery, {}, fetchOpts)
}

export async function getFeaturedAndRecent(): Promise<{
  featured: SanityPostCard | null
  recent: SanityPostCard[]
}> {
  const data = await sanityClient.fetch<{
    featured: SanityPostCard | null
    recent: SanityPostCard[]
    fallbackLatest: SanityPostCard | null
  }>(featuredPlusRecentQuery, {}, fetchOpts)

  const featured = data.featured ?? data.fallbackLatest
  const recent = featured
    ? data.recent.filter((p) => p._id !== featured._id).slice(0, 3)
    : data.recent.slice(0, 3)

  return { featured, recent }
}

export async function getLatestPosts(
  limit = 3
): Promise<SanityPostCard[]> {
  return sanityClient.fetch(latestPostsQuery, { limit }, fetchOpts)
}

export async function getPostBySlug(
  slug: string
): Promise<SanityPost | null> {
  return sanityClient.fetch(postBySlugQuery, { slug }, fetchOpts)
}

export async function getAllPostSlugs(): Promise<string[]> {
  return sanityClient.fetch(postSlugsQuery, {}, fetchOpts)
}

export async function getRelatedPosts(
  slug: string,
  category: string
): Promise<SanityPostCard[]> {
  return sanityClient.fetch(
    relatedPostsQuery,
    { slug, category },
    fetchOpts
  )
}

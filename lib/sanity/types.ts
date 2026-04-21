import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface SanityPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: Image & { alt?: string }
  category: string
  customCategory?: string
  author?: string
  publishedAt: string
  featured?: boolean
  body?: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
}

export interface SanityPostCard {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: Image & { alt?: string }
  category: string
  customCategory?: string
  publishedAt: string
  featured?: boolean
}

export function displayCategory(
  post: Pick<SanityPostCard, 'category' | 'customCategory'>
): string {
  return post.category === '__custom__'
    ? post.customCategory || 'Uncategorized'
    : post.category
}

export function displayDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

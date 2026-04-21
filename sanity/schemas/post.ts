import { defineType, defineField } from 'sanity'

const CATEGORY_OPTIONS = [
  { title: 'Market Analysis', value: 'Market Analysis' },
  { title: 'Litigation', value: 'Litigation' },
  { title: 'Pacific Region', value: 'Pacific Region' },
  { title: 'Property Tax', value: 'Property Tax' },
  { title: 'Commercial Trends', value: 'Commercial Trends' },
  { title: 'Education', value: 'Education' },
  { title: 'Custom (enter below)', value: '__custom__' },
]

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta & SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(5).max(140),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'content',
      description: 'Auto-generates from title. Click Generate if empty.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[‘’']/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary shown on blog listing (max 280 chars).',
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      description:
        'Pick from predefined list. To add a custom one, select "Custom" and type it in the next field.',
      options: {
        list: CATEGORY_OPTIONS,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customCategory',
      title: 'Custom Category',
      type: 'string',
      group: 'content',
      description: 'Only fill this if you selected "Custom" above.',
      hidden: ({ parent }) => parent?.category !== '__custom__',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { category?: string } | undefined
          if (parent?.category === '__custom__' && !value) {
            return 'Custom category is required when "Custom" is selected.'
          }
          return true
        }),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'content',
      initialValue: 'Benavente Group',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured post?',
      type: 'boolean',
      group: 'content',
      description:
        'Only one post should be featured at a time — it appears as the highlighted article on the Blog page.',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'meta',
      description: 'Overrides default title in browser tab & search results.',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'meta',
      description: 'Appears in search engine snippets (max 160 chars).',
      validation: (Rule) => Rule.max(160),
    }),
  ],
  orderings: [
    {
      title: 'Published date, newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      customCategory: 'customCategory',
      media: 'coverImage',
      featured: 'featured',
      publishedAt: 'publishedAt',
    },
    prepare({ title, category, customCategory, media, featured, publishedAt }) {
      const cat =
        category === '__custom__' ? customCategory : category
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          })
        : ''
      return {
        title: `${featured ? '★ ' : ''}${title}`,
        subtitle: [cat, date].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})

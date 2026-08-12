import { createClient } from 'next-sanity'

// Standalone mode: with no Sanity project configured the app still boots and
// the site renders — queries short-circuit to empty content (see ./queries.ts)
// rather than throwing here at module load.
export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
)

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'unconfigured'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

if (!isSanityConfigured) {
  console.warn(
    '[sanity] Not configured (NEXT_PUBLIC_SANITY_PROJECT_ID). ' +
      'Running standalone: editorial content resolves to empty.'
  )
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

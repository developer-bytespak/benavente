import 'server-only'
import { revalidatePath } from 'next/cache'

const PATHS = {
  home: '/',
  about: '/about',
  gallery: '/gallery',
  contact: '/contact',
  blog: '/blog',
} as const

export type PublicPage = keyof typeof PATHS

export function revalidatePublic(...keys: PublicPage[]) {
  for (const k of keys) revalidatePath(PATHS[k])
}

export function revalidateAll() {
  for (const p of Object.values(PATHS)) revalidatePath(p)
}

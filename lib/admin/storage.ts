import 'server-only'
import { supabaseServer } from '@/lib/supabase/server'

export const BUCKETS = {
  site: 'site',
  team: 'team-photos',
  cv: 'team-cvs',
  gallery: 'gallery',
  regions: 'regions',
  banners: 'banners',
} as const

export type BucketKey = keyof typeof BUCKETS

export async function createSignedUpload(bucket: BucketKey, path: string) {
  const { data, error } = await supabaseServer.storage
    .from(BUCKETS[bucket])
    .createSignedUploadUrl(path)
  if (error) throw error
  return { ...data, bucket: BUCKETS[bucket] }
}

export function publicUrl(bucket: BucketKey, path: string) {
  return supabaseServer.storage.from(BUCKETS[bucket]).getPublicUrl(path).data.publicUrl
}

// Best-effort cleanup. Orphaned files don't break anything functionally —
// they just consume storage quota. So we swallow errors and log.
export async function removeFiles(bucket: BucketKey, paths: string[]) {
  if (!paths.length) return
  const { error } = await supabaseServer.storage.from(BUCKETS[bucket]).remove(paths)
  if (error) console.warn(`[storage] remove from ${bucket} failed:`, error.message)
}

// Build a unique storage path for a new upload. Collision-resistant without
// requiring a DB lookup: <prefix>/<unix-ms>-<rand>.<ext>
export function buildUploadPath(prefix: string, filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase() ?? 'bin'
  const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  return `${prefix}/${safe}.${ext}`
}

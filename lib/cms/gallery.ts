import 'server-only'
import { supabaseServer } from '@/lib/supabase/server'
import type { GalleryCategoryRow, GalleryImageRow } from '@/lib/supabase/types'

export type CategoryWithCount = GalleryCategoryRow & {
  image_count: number
  cover_url: string | null
}

export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  const [{ data: cats, error: catErr }, { data: imgs, error: imgErr }] = await Promise.all([
    supabaseServer.from('gallery_categories').select('*').order('sort_order'),
    supabaseServer
      .from('gallery_images')
      .select('id, category_id, image_url, sort_order'),
  ])

  if (catErr || imgErr) {
    console.error('[cms] getCategoriesWithCounts:', catErr?.message ?? imgErr?.message)
    return []
  }

  const byCat = new Map<string, GalleryImageRow[]>()
  for (const img of imgs ?? []) {
    const arr = byCat.get(img.category_id) ?? []
    arr.push(img as GalleryImageRow)
    byCat.set(img.category_id, arr)
  }

  return (cats ?? []).map((c) => {
    const list = (byCat.get(c.id) ?? []).sort((a, b) => a.sort_order - b.sort_order)
    return {
      ...c,
      image_count: list.length,
      cover_url: list[0]?.image_url ?? null,
    }
  })
}

export async function getCategories(): Promise<GalleryCategoryRow[]> {
  const { data, error } = await supabaseServer
    .from('gallery_categories')
    .select('*')
    .order('sort_order')
  if (error) {
    console.error('[cms] getCategories:', error.message)
    return []
  }
  return data ?? []
}

export async function getCategory(id: string): Promise<GalleryCategoryRow | null> {
  const { data, error } = await supabaseServer
    .from('gallery_categories')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) {
    console.error('[cms] getCategory:', error.message)
    return null
  }
  return data
}

export async function getImagesForCategory(categoryId: string): Promise<GalleryImageRow[]> {
  const { data, error } = await supabaseServer
    .from('gallery_images')
    .select('*')
    .eq('category_id', categoryId)
    .order('sort_order')
    .order('created_at')
  if (error) {
    console.error('[cms] getImagesForCategory:', error.message)
    return []
  }
  return data ?? []
}

export async function getFeaturedImages(): Promise<GalleryImageRow[]> {
  const { data, error } = await supabaseServer
    .from('gallery_images')
    .select('*')
    .eq('featured', true)
    .order('featured_order')
    .limit(5)
  if (error) {
    console.error('[cms] getFeaturedImages:', error.message)
    return []
  }
  return data ?? []
}

// Public-site fetch: full categories with their images, for /gallery page.
export async function getPublicGallery(): Promise<
  (GalleryCategoryRow & { images: GalleryImageRow[] })[]
> {
  const [{ data: cats }, { data: imgs }] = await Promise.all([
    supabaseServer.from('gallery_categories').select('*').order('sort_order'),
    supabaseServer.from('gallery_images').select('*').order('sort_order'),
  ])
  if (!cats) return []
  const byCat = new Map<string, GalleryImageRow[]>()
  for (const img of imgs ?? []) {
    const arr = byCat.get(img.category_id) ?? []
    arr.push(img as GalleryImageRow)
    byCat.set(img.category_id, arr)
  }
  return cats.map((c) => ({ ...c, images: byCat.get(c.id) ?? [] }))
}

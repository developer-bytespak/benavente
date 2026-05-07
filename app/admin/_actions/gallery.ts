'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { supabaseServer } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/admin/auth'
import { revalidatePublic } from '@/lib/admin/revalidate'
import { BUCKETS } from '@/lib/admin/storage'
import type { ActionState } from '@/components/admin/ui/SaveStatus'

const FEATURED_CAP = 5

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function pathFromPublicUrl(publicUrl: string | null, bucket: string): string | null {
  if (!publicUrl) return null
  const marker = `/storage/v1/object/public/${bucket}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return null
  return publicUrl.slice(idx + marker.length)
}

// ============== Categories ==============

function readCategoryPayload(formData: FormData) {
  const labelRaw = String(formData.get('label') ?? '').trim()
  const slugRaw = String(formData.get('slug') ?? '').trim() || slugify(labelRaw)
  return {
    label: labelRaw,
    slug: slugify(slugRaw),
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,
  }
}

export async function createCategory(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()
  const payload = readCategoryPayload(formData)
  if (!payload.label) return { ok: false, message: 'Label is required.' }
  if (!payload.slug) return { ok: false, message: 'Slug is required.' }

  const { error } = await supabaseServer.from('gallery_categories').insert(payload)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('home', 'gallery')
  redirect('/admin/gallery')
}

export async function updateCategory(
  id: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()
  const payload = readCategoryPayload(formData)
  if (!payload.label) return { ok: false, message: 'Label is required.' }

  const { error } = await supabaseServer.from('gallery_categories').update(payload).eq('id', id)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('home', 'gallery')
  return { ok: true, message: 'Category saved.' }
}

export async function deleteCategory(id: string, _formData?: FormData) {
  await requireAdmin()
  // Cascade in DB removes image rows; clean up storage too.
  const { data: imgs } = await supabaseServer
    .from('gallery_images')
    .select('image_url')
    .eq('category_id', id)

  const { error } = await supabaseServer.from('gallery_categories').delete().eq('id', id)
  if (error) throw new Error(error.message)

  const paths: string[] = []
  for (const i of imgs ?? []) {
    const p = pathFromPublicUrl(i.image_url, BUCKETS.gallery)
    if (p) paths.push(p)
  }
  if (paths.length) await supabaseServer.storage.from(BUCKETS.gallery).remove(paths)

  revalidatePublic('home', 'gallery')
  redirect('/admin/gallery')
}

// ============== Images ==============

export async function addGalleryImages(categoryId: string, urls: string[]) {
  await requireAdmin()
  if (!urls.length) return

  const { data: existing } = await supabaseServer
    .from('gallery_images')
    .select('sort_order')
    .eq('category_id', categoryId)
    .order('sort_order', { ascending: false })
    .limit(1)
  const startOrder = existing && existing[0] ? existing[0].sort_order + 1 : 0

  const rows = urls.map((url, i) => ({
    category_id: categoryId,
    image_url: url,
    sort_order: startOrder + i,
  }))

  const { error } = await supabaseServer.from('gallery_images').insert(rows)
  if (error) throw new Error(error.message)

  revalidatePath(`/admin/gallery/${categoryId}`)
  revalidatePublic('home', 'gallery')
}

export async function deleteGalleryImage(id: string, _formData?: FormData) {
  await requireAdmin()
  const { data: img } = await supabaseServer
    .from('gallery_images')
    .select('image_url, category_id')
    .eq('id', id)
    .maybeSingle()

  const { error } = await supabaseServer.from('gallery_images').delete().eq('id', id)
  if (error) throw new Error(error.message)

  if (img) {
    const path = pathFromPublicUrl(img.image_url, BUCKETS.gallery)
    if (path) await supabaseServer.storage.from(BUCKETS.gallery).remove([path])
    revalidatePath(`/admin/gallery/${img.category_id}`)
  }
  revalidatePath('/admin/gallery')
  revalidatePublic('home', 'gallery')
}

export async function toggleImageFeatured(id: string, _formData?: FormData) {
  await requireAdmin()

  const { data: img } = await supabaseServer
    .from('gallery_images')
    .select('featured, category_id')
    .eq('id', id)
    .maybeSingle()
  if (!img) return { ok: false, message: 'Image not found.' }

  if (img.featured) {
    const { error } = await supabaseServer
      .from('gallery_images')
      .update({ featured: false, featured_order: null })
      .eq('id', id)
    if (error) return { ok: false, message: error.message }
  } else {
    const { count } = await supabaseServer
      .from('gallery_images')
      .select('*', { count: 'exact', head: true })
      .eq('featured', true)

    if ((count ?? 0) >= FEATURED_CAP) {
      return { ok: false, message: `Cap of ${FEATURED_CAP} featured images reached. Unfeature one first.` }
    }

    const { error } = await supabaseServer
      .from('gallery_images')
      .update({ featured: true, featured_order: (count ?? 0) + 1 })
      .eq('id', id)
    if (error) return { ok: false, message: error.message }
  }

  revalidatePath(`/admin/gallery/${img.category_id}`)
  revalidatePath('/admin/gallery')
  revalidatePublic('home', 'gallery')
}

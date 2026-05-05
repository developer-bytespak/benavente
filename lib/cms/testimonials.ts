import 'server-only'
import { supabaseServer } from '@/lib/supabase/server'
import type { TestimonialRow } from '@/lib/supabase/types'

export async function getVisibleTestimonials(): Promise<TestimonialRow[]> {
  const { data, error } = await supabaseServer
    .from('testimonials')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) {
    console.error('[cms] getVisibleTestimonials:', error.message)
    return []
  }
  return data ?? []
}

export async function getAllTestimonials(): Promise<TestimonialRow[]> {
  const { data, error } = await supabaseServer
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) {
    console.error('[cms] getAllTestimonials:', error.message)
    return []
  }
  return data ?? []
}

export async function getTestimonial(id: string): Promise<TestimonialRow | null> {
  const { data, error } = await supabaseServer
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) {
    console.error('[cms] getTestimonial:', error.message)
    return null
  }
  return data
}

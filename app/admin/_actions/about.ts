'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/admin/auth'
import { revalidatePublic } from '@/lib/admin/revalidate'
import type { ActionState } from '@/components/admin/ui/SaveStatus'
import type { StatItem, CoreValueItem } from '@/lib/supabase/types'

const STORY_STAT_SLOTS = 3
const VALUE_SLOTS = 4

function paragraphs(raw: string): string[] {
  return raw.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
}

export async function updateAboutPage(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()

  const story_stats: StatItem[] = []
  for (let i = 0; i < STORY_STAT_SLOTS; i++) {
    const label = String(formData.get(`story_stats_label_${i}`) ?? '').trim()
    if (!label) continue
    const number = Number(formData.get(`story_stats_number_${i}`) ?? 0)
    const suffix = String(formData.get(`story_stats_suffix_${i}`) ?? '').trim()
    story_stats.push({ label, number: Number.isFinite(number) ? number : 0, suffix })
  }

  const core_values: CoreValueItem[] = []
  for (let i = 0; i < VALUE_SLOTS; i++) {
    const name = String(formData.get(`values_name_${i}`) ?? '').trim()
    if (!name) continue
    const number = String(formData.get(`values_number_${i}`) ?? '').trim() || String(i + 1).padStart(2, '0')
    const desc = String(formData.get(`values_desc_${i}`) ?? '').trim()
    core_values.push({ number, name, desc })
  }

  const payload = {
    banner_url: String(formData.get('banner_url') ?? '').trim() || null,
    hero_headline: String(formData.get('hero_headline') ?? '').trim() || null,
    hero_subtitle: String(formData.get('hero_subtitle') ?? '').trim() || null,
    story_heading: String(formData.get('story_heading') ?? '').trim() || null,
    story_paragraphs: paragraphs(String(formData.get('story_paragraphs') ?? '')),
    story_stats,
    mission_headline: String(formData.get('mission_headline') ?? '').trim() || null,
    mission_text: String(formData.get('mission_text') ?? '').trim() || null,
    core_values,
  }

  const { error } = await supabaseServer.from('about_page').update(payload).eq('id', 1)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('about')
  return { ok: true, message: 'About page saved.' }
}

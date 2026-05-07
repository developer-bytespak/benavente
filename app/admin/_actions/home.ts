'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/admin/auth'
import { revalidatePublic } from '@/lib/admin/revalidate'
import type { ActionState } from '@/components/admin/ui/SaveStatus'
import type { StatItem } from '@/lib/supabase/types'

const STAT_SLOTS = 4

function lines(raw: string): string[] {
  return raw.split('\n').map((l) => l.trim()).filter(Boolean)
}

function paragraphs(raw: string): string[] {
  return raw.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
}

export async function updateHomePage(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()

  const stats: StatItem[] = []
  for (let i = 0; i < STAT_SLOTS; i++) {
    const label = String(formData.get(`stats_label_${i}`) ?? '').trim()
    if (!label) continue
    const number = Number(formData.get(`stats_number_${i}`) ?? 0)
    const suffix = String(formData.get(`stats_suffix_${i}`) ?? '').trim()
    stats.push({ label, number: Number.isFinite(number) ? number : 0, suffix })
  }

  const heroVideos = formData
    .getAll('hero_video_urls')
    .map((v) => String(v).trim())
    .filter(Boolean)

  const payload = {
    hero_video_urls: heroVideos,
    hero_headline: String(formData.get('hero_headline') ?? '').trim() || null,
    hero_subhead: String(formData.get('hero_subhead') ?? '').trim() || null,
    ticker_items: lines(String(formData.get('ticker_items') ?? '')),
    intro_heading: String(formData.get('intro_heading') ?? '').trim() || null,
    intro_paragraphs: paragraphs(String(formData.get('intro_paragraphs') ?? '')),
    stats,
  }

  const { error } = await supabaseServer.from('home_page').update(payload).eq('id', 1)
  if (error) return { ok: false, message: error.message }

  revalidatePublic('home')
  return { ok: true, message: 'Home page saved.' }
}

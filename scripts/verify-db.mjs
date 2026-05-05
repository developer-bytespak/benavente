import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

// Tiny .env loader — avoids dotenv dep
for (const line of readFileSync('.env', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)\s*=\s*"?([^"]*)"?\s*$/)
  if (m) process.env[m[1]] = m[2]
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const tables = [
  'site_settings', 'contact_info', 'home_page', 'about_page',
  'team_members', 'regions', 'gallery_categories', 'gallery_images',
  'testimonials', 'contact_submissions',
]

let pass = 0, fail = 0

console.log('\n=== Tables ===')
for (const t of tables) {
  const { count, error } = await sb.from(t).select('*', { count: 'exact', head: true })
  if (error) { console.log(`  FAIL ${t}: ${error.message}`); fail++ }
  else { console.log(`  OK   ${t}  (${count} rows)`); pass++ }
}

console.log('\n=== Singleton seed values ===')
const checks = [
  ['site_settings', 'logo_url'],
  ['contact_info',  'email'],
  ['home_page',     'hero_headline'],
  ['about_page',    'hero_headline'],
]
for (const [table, field] of checks) {
  const { data, error } = await sb.from(table).select(field).eq('id', 1).maybeSingle()
  if (error || !data) { console.log(`  FAIL ${table}.${field}: ${error?.message || 'no row'}`); fail++ }
  else { console.log(`  OK   ${table}.${field} = "${String(data[field]).slice(0, 70)}"`); pass++ }
}

console.log('\n=== Array / JSON column shapes ===')
const { data: home } = await sb.from('home_page').select('hero_video_urls, ticker_items, intro_paragraphs, stats').eq('id', 1).single()
console.log(`  home_page.hero_video_urls   : ${home?.hero_video_urls?.length} items`)
console.log(`  home_page.ticker_items      : ${home?.ticker_items?.length} items`)
console.log(`  home_page.intro_paragraphs  : ${home?.intro_paragraphs?.length} items`)
console.log(`  home_page.stats (jsonb)     : ${home?.stats?.length} items, sample = ${JSON.stringify(home?.stats?.[0])}`)

const { data: about } = await sb.from('about_page').select('story_paragraphs, story_stats, core_values').eq('id', 1).single()
console.log(`  about_page.story_paragraphs : ${about?.story_paragraphs?.length} items`)
console.log(`  about_page.story_stats      : ${about?.story_stats?.length} items`)
console.log(`  about_page.core_values      : ${about?.core_values?.length} items, sample = ${JSON.stringify(about?.core_values?.[0])}`)

console.log('\n=== RLS smoke test (anon client) ===')
const anon = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
)
// anon should be able to SELECT site_settings (public read policy)
const { error: anonReadErr } = await anon.from('site_settings').select('id').limit(1)
console.log(anonReadErr ? `  FAIL anon SELECT site_settings: ${anonReadErr.message}` : `  OK   anon SELECT site_settings allowed`)
// anon should NOT be able to UPDATE site_settings (no policy)
const { error: anonWriteErr } = await anon.from('site_settings').update({ footer_text: 'pwned' }).eq('id', 1)
console.log(anonWriteErr ? `  OK   anon UPDATE site_settings blocked (${anonWriteErr.message})` : `  FAIL anon UPDATE site_settings was ALLOWED — RLS misconfigured!`)
// anon should be able to INSERT contact_submissions
const { error: anonInsertErr } = await anon.from('contact_submissions').insert({ name: '_rls_test', email: 't@t.t', message: 'rls verification' })
console.log(anonInsertErr ? `  FAIL anon INSERT contact_submissions: ${anonInsertErr.message}` : `  OK   anon INSERT contact_submissions allowed`)
// anon should NOT be able to SELECT contact_submissions
const { data: anonReadSub, error: anonReadSubErr } = await anon.from('contact_submissions').select('*').limit(1)
console.log((anonReadSub?.length ?? 0) === 0 ? `  OK   anon SELECT contact_submissions blocked (returned 0 rows or denied)` : `  FAIL anon could read contact_submissions!`)

// Cleanup: delete the test submission via service role
await sb.from('contact_submissions').delete().eq('name', '_rls_test')

console.log(`\nSummary: ${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)

// One-shot: copy the existing hero videos from their old Cloudinary cloud
// (djqmhkla6) into the user's own cloud (dsm9mtete) under benavente/hero/,
// then update home_page.hero_video_urls to point at the new URLs.
//
// Idempotent: any URL already on the destination cloud is left alone.
//
// Usage: node scripts/migrate-hero-videos.mjs

import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)\s*=\s*"?([^"]*)"?\s*$/)
  if (m) process.env[m[1]] = m[2]
}

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET
const FOLDER = 'benavente/hero'

if (!CLOUD || !API_KEY || !API_SECRET) {
  console.error('Missing Cloudinary env vars (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)')
  process.exit(1)
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

function sign(params) {
  const sorted = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join('&')
  return createHash('sha1').update(sorted + API_SECRET).digest('hex')
}

async function uploadFromUrl(sourceUrl) {
  const timestamp = Math.floor(Date.now() / 1000)
  const toSign = { folder: FOLDER, timestamp: String(timestamp) }
  const signature = sign(toSign)

  const fd = new FormData()
  fd.append('file', sourceUrl)
  fd.append('api_key', API_KEY)
  fd.append('timestamp', String(timestamp))
  fd.append('folder', FOLDER)
  fd.append('signature', signature)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/video/upload`, {
    method: 'POST',
    body: fd,
  })
  const json = await res.json()
  if (!res.ok || json.error) {
    throw new Error(json.error?.message || `HTTP ${res.status}`)
  }
  return json.secure_url
}

console.log(`\nDestination cloud: ${CLOUD}`)
console.log(`Destination folder: ${FOLDER}\n`)

const { data: home, error: readErr } = await sb
  .from('home_page')
  .select('hero_video_urls')
  .eq('id', 1)
  .single()

if (readErr || !home) {
  console.error('Could not read home_page row:', readErr?.message)
  process.exit(1)
}

const sourceUrls = home.hero_video_urls ?? []
console.log(`Found ${sourceUrls.length} URL(s) currently in home_page.hero_video_urls:\n`)
sourceUrls.forEach((u, i) => console.log(`  ${i + 1}. ${u}`))

const newUrls = []
let migrated = 0
let skipped = 0

for (const url of sourceUrls) {
  if (url.includes(`/${CLOUD}/`)) {
    console.log(`\n  SKIP   already on destination: ${url}`)
    newUrls.push(url)
    skipped++
    continue
  }
  console.log(`\n  COPY   ${url}`)
  try {
    const newUrl = await uploadFromUrl(url)
    console.log(`         → ${newUrl}`)
    newUrls.push(newUrl)
    migrated++
  } catch (e) {
    console.error(`         FAIL: ${e.message}`)
    process.exit(1)
  }
}

console.log(`\nUpdating home_page.hero_video_urls in Supabase…`)
const { error: writeErr } = await sb
  .from('home_page')
  .update({ hero_video_urls: newUrls })
  .eq('id', 1)
if (writeErr) {
  console.error('Update failed:', writeErr.message)
  process.exit(1)
}

console.log(`\nDone. ${migrated} migrated, ${skipped} skipped.`)
console.log(`\nFinal hero_video_urls:`)
newUrls.forEach((u, i) => console.log(`  ${i + 1}. ${u}`))

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)\s*=\s*"?([^"]*)"?\s*$/)
  if (m) process.env[m[1]] = m[2]
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const buckets = [
  { id: 'site',        public: true, fileSizeLimit: '5MB',  allowedMimeTypes: ['image/*'] },
  { id: 'team-photos', public: true, fileSizeLimit: '5MB',  allowedMimeTypes: ['image/*'] },
  { id: 'team-cvs',    public: true, fileSizeLimit: '10MB', allowedMimeTypes: ['application/pdf'] },
  { id: 'gallery',     public: true, fileSizeLimit: '10MB', allowedMimeTypes: ['image/*'] },
  { id: 'regions',     public: true, fileSizeLimit: '10MB', allowedMimeTypes: ['image/*'] },
  { id: 'banners',     public: true, fileSizeLimit: '10MB', allowedMimeTypes: ['image/*'] },
]

let created = 0, existed = 0, failed = 0

for (const b of buckets) {
  const { error } = await sb.storage.createBucket(b.id, {
    public: b.public,
    fileSizeLimit: b.fileSizeLimit,
    allowedMimeTypes: b.allowedMimeTypes,
  })
  if (!error) {
    console.log(`  CREATED  ${b.id}`)
    created++
  } else if (error.message.toLowerCase().includes('already exists')) {
    console.log(`  EXISTS   ${b.id}`)
    existed++
  } else {
    console.log(`  FAIL     ${b.id}: ${error.message}`)
    failed++
  }
}

console.log(`\n${created} created, ${existed} already existed, ${failed} failed`)
process.exit(failed ? 1 : 0)

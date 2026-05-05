// One-off script to provision an admin user.
// Usage: node scripts/create-admin.mjs <email> <password> [full-name]

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)\s*=\s*"?([^"]*)"?\s*$/)
  if (m) process.env[m[1]] = m[2]
}

const [email, password, ...nameParts] = process.argv.slice(2)

if (!email || !password) {
  console.error('Usage: node scripts/create-admin.mjs <email> <password> [full-name]')
  process.exit(1)
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const fullName = nameParts.join(' ') || email.split('@')[0]

const { data, error } = await sb.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { full_name: fullName },
})

if (error) {
  console.error('Failed:', error.message)
  process.exit(1)
}

console.log(`Created admin user:`)
console.log(`  email: ${data.user.email}`)
console.log(`  id:    ${data.user.id}`)
console.log(`  name:  ${fullName}`)
console.log(`\nSign in at /admin/login`)

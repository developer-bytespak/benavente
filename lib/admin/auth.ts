import 'server-only'
import { redirect } from 'next/navigation'
import { supabaseServerComponent } from '@/lib/supabase/serverComponent'

// Defense in depth — middleware also gates admin routes, but server actions
// can be invoked outside that gate, so check at every mutation boundary.
export async function requireAdmin() {
  const { data: { user } } = await supabaseServerComponent().auth.getUser()
  if (!user) redirect('/admin/login')
  return user
}

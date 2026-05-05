import { redirect } from 'next/navigation'
import { supabaseServerComponent } from '@/lib/supabase/serverComponent'
import Sidebar from '@/components/admin/shell/Sidebar'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const supabase = supabaseServerComponent()
  const { data: { user } } = await supabase.auth.getUser()

  // Defense in depth — middleware already redirects, but never trust it alone.
  if (!user) redirect('/admin/login')

  const meta = (user.user_metadata ?? {}) as { full_name?: string; name?: string }
  const display = {
    name: meta.full_name || meta.name || user.email?.split('@')[0] || 'Admin',
    email: user.email || '',
  }

  return (
    <div className="min-h-screen bg-cream/60 lg:flex font-sans text-navy">
      <Sidebar user={display} />
      <div className="flex-1 min-w-0 flex flex-col">{children}</div>
    </div>
  )
}

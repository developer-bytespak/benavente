import Link from 'next/link'
import Topbar from '@/components/admin/shell/Topbar'
import TeamList from '@/components/admin/lists/TeamList'
import Icon from '@/components/admin/ui/Icon'
import { getAllTeam } from '@/lib/cms/team'

export const dynamic = 'force-dynamic'

export default async function TeamPage() {
  const members = await getAllTeam()

  const addBtn = (
    <Link
      href="/admin/team/new"
      className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
    >
      <Icon name="plus" className="w-[14px] h-[14px]" />
      Add Member
    </Link>
  )

  return (
    <>
      <Topbar
        title="Team Members"
        subtitle={`${members.length} member${members.length === 1 ? '' : 's'} · shown on the About page`}
        actions={addBtn}
      />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <TeamList members={members} />
      </main>
    </>
  )
}

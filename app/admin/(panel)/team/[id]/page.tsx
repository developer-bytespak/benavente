import Link from 'next/link'
import { notFound } from 'next/navigation'
import Topbar from '@/components/admin/shell/Topbar'
import TeamMemberForm from '@/components/admin/forms/TeamMemberForm'
import Icon from '@/components/admin/ui/Icon'
import DeleteButton from '@/components/admin/ui/DeleteButton'
import { getTeamMember } from '@/lib/cms/team'
import { deleteTeamMember } from '@/app/admin/_actions/team'

export const dynamic = 'force-dynamic'

export default async function EditTeamMemberPage({
  params,
}: {
  params: { id: string }
}) {
  const member = await getTeamMember(params.id)
  if (!member) notFound()

  const actions = (
    <>
      <Link
        href="/admin/team"
        className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy text-[12px] font-serif font-medium tracking-[0.14em] uppercase"
      >
        <Icon name="chevronRight" className="w-[14px] h-[14px] rotate-180" />
        Back
      </Link>
      <DeleteButton
        action={deleteTeamMember.bind(null, member.id)}
        message={`Delete ${member.name}? This will also remove their photo and CV.`}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] text-red-600 hover:bg-red-50 border border-red-200 text-[12px] font-serif font-medium tracking-[0.14em] uppercase"
      >
        <Icon name="trash" className="w-[14px] h-[14px]" />
        Delete
      </DeleteButton>
    </>
  )

  return (
    <>
      <Topbar title={member.name} subtitle={member.role} actions={actions} />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <TeamMemberForm member={member} />
      </main>
    </>
  )
}

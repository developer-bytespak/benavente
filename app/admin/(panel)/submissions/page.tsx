import Topbar from '@/components/admin/shell/Topbar'
import SubmissionsList from '@/components/admin/lists/SubmissionsList'
import Icon from '@/components/admin/ui/Icon'
import { getSubmissions } from '@/lib/cms/submissions'
import { markAllRead } from '@/app/admin/_actions/submissions'

export const dynamic = 'force-dynamic'

export default async function SubmissionsPage() {
  const submissions = await getSubmissions()
  const unread = submissions.filter((s) => !s.read).length

  const actions =
    unread > 0 ? (
      <form action={markAllRead}>
        <button
          type="submit"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy text-[12px] font-serif font-medium tracking-[0.14em] uppercase"
        >
          <Icon name="check" className="w-[14px] h-[14px]" />
          Mark all read
        </button>
      </form>
    ) : null

  return (
    <>
      <Topbar
        title="Submissions"
        subtitle={`${submissions.length} total · ${unread} unread`}
        actions={actions}
      />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <SubmissionsList submissions={submissions} />
      </main>
    </>
  )
}

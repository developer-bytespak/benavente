import Link from 'next/link'
import { notFound } from 'next/navigation'
import Topbar from '@/components/admin/shell/Topbar'
import RegionForm from '@/components/admin/forms/RegionForm'
import Icon from '@/components/admin/ui/Icon'
import DeleteButton from '@/components/admin/ui/DeleteButton'
import { getRegion } from '@/lib/cms/regions'
import { deleteRegion } from '@/app/admin/_actions/regions'

export const dynamic = 'force-dynamic'

export default async function EditRegionPage({ params }: { params: { id: string } }) {
  const region = await getRegion(params.id)
  if (!region) notFound()

  const actions = (
    <>
      <Link
        href="/admin/regions"
        className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy text-[12px] font-serif font-medium tracking-[0.14em] uppercase"
      >
        <Icon name="chevronRight" className="w-[14px] h-[14px] rotate-180" />
        Back
      </Link>
      <DeleteButton
        action={deleteRegion.bind(null, region.id)}
        message={`Delete "${region.name}" and all its images?`}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] text-red-600 hover:bg-red-50 border border-red-200 text-[12px] font-serif font-medium tracking-[0.14em] uppercase"
      >
        <Icon name="trash" className="w-[14px] h-[14px]" />
        Delete
      </DeleteButton>
    </>
  )

  return (
    <>
      <Topbar title={region.name} subtitle={region.note ?? undefined} actions={actions} />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <RegionForm region={region} />
      </main>
    </>
  )
}

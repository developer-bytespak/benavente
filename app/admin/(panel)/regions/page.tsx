import Link from 'next/link'
import Topbar from '@/components/admin/shell/Topbar'
import RegionList from '@/components/admin/lists/RegionList'
import Icon from '@/components/admin/ui/Icon'
import { getRegions } from '@/lib/cms/regions'

export const dynamic = 'force-dynamic'

export default async function RegionsPage() {
  const regions = await getRegions()

  const addBtn = (
    <Link
      href="/admin/regions/new"
      className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
    >
      <Icon name="plus" className="w-[14px] h-[14px]" />
      Add Region
    </Link>
  )

  return (
    <>
      <Topbar
        title="Regions"
        subtitle={`${regions.length} region${regions.length === 1 ? '' : 's'} · shown on the About page Coverage section`}
        actions={addBtn}
      />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <RegionList regions={regions} />
      </main>
    </>
  )
}

import Link from 'next/link'
import Topbar from '@/components/admin/shell/Topbar'
import RegionForm from '@/components/admin/forms/RegionForm'
import Icon from '@/components/admin/ui/Icon'

export const dynamic = 'force-dynamic'

export default function NewRegionPage() {
  const back = (
    <Link
      href="/admin/regions"
      className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy text-[12px] font-serif font-medium tracking-[0.14em] uppercase"
    >
      <Icon name="chevronRight" className="w-[14px] h-[14px] rotate-180" />
      Back to Regions
    </Link>
  )

  return (
    <>
      <Topbar title="Add Region" subtitle="Hero image and b-roll gallery" actions={back} />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <RegionForm />
      </main>
    </>
  )
}

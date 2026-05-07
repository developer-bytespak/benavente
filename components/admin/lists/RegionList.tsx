import Image from 'next/image'
import Link from 'next/link'
import Icon from '@/components/admin/ui/Icon'
import DeleteButton from '@/components/admin/ui/DeleteButton'
import { deleteRegion } from '@/app/admin/_actions/regions'
import type { RegionRow } from '@/lib/supabase/types'

interface Props {
  regions: RegionRow[]
}

export default function RegionList({ regions }: Props) {
  if (regions.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gold/30 rounded-[4px] p-10 text-center">
        <span className="inline-flex w-12 h-12 rounded-full bg-gold/10 text-gold-dark items-center justify-center">
          <Icon name="pin" className="w-6 h-6" />
        </span>
        <h3 className="font-serif text-[18px] text-navy mt-3">No regions yet</h3>
        <p className="text-slate text-[13px] font-serif mt-1.5">
          Add your first service region.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {regions.map((r) => (
        <div
          key={r.id}
          className="bg-white border border-gold/15 rounded-[4px] overflow-hidden hover:border-gold/40 hover:shadow-md hover:shadow-navy/5 transition-all"
        >
          <div className="relative aspect-[4/3] bg-cream-deeper">
            {r.hero_image_url ? (
              <Image
                src={r.hero_image_url}
                alt={r.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-light/40">
                <Icon name="pin" className="w-10 h-10" />
              </div>
            )}
            {r.broll_images && r.broll_images.length > 0 && (
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-navy/85 text-white text-[10px] font-serif font-medium tracking-[0.05em]">
                <Icon name="image" className="w-3 h-3" />
                {r.broll_images.length} photos
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-serif text-[16px] text-navy leading-tight">{r.name}</h3>
            {r.note && (
              <p className="text-slate text-[12px] font-serif mt-1 line-clamp-1">{r.note}</p>
            )}

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gold/10">
              <Link
                href={`/admin/regions/${r.id}`}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy text-[11px] font-serif font-medium tracking-[0.12em] uppercase"
              >
                <Icon name="edit" className="w-[13px] h-[13px]" />
                Edit
              </Link>
              <DeleteButton
                action={deleteRegion.bind(null, r.id)}
                message={`Delete "${r.name}" and all its images?`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-[3px] text-slate hover:text-red-600 hover:bg-red-50 transition-colors"
                formClassName="ml-auto"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

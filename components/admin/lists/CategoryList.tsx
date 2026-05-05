import Image from 'next/image'
import Link from 'next/link'
import Icon from '@/components/admin/ui/Icon'
import type { CategoryWithCount } from '@/lib/cms/gallery'

interface Props {
  categories: CategoryWithCount[]
}

export default function CategoryList({ categories }: Props) {
  if (categories.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gold/30 rounded-[4px] p-10 text-center">
        <span className="inline-flex w-12 h-12 rounded-full bg-gold/10 text-gold-dark items-center justify-center">
          <Icon name="gallery" className="w-6 h-6" />
        </span>
        <h3 className="font-serif text-[18px] text-navy mt-3">No categories yet</h3>
        <p className="text-slate text-[13px] font-serif mt-1.5">
          Create a category to start uploading project photos.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/admin/gallery/${cat.id}`}
          className="group bg-white border border-gold/15 rounded-[4px] overflow-hidden hover:border-gold/40 hover:shadow-md hover:shadow-navy/5 transition-all"
        >
          <div className="relative aspect-[4/3] bg-cream-deeper">
            {cat.cover_url ? (
              <Image
                src={cat.cover_url}
                alt={cat.label}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-light/40">
                <Icon name="gallery" className="w-10 h-10" />
              </div>
            )}
            <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-navy/85 text-white text-[10px] font-serif font-medium tracking-[0.05em]">
              <Icon name="image" className="w-3 h-3" />
              {cat.image_count}
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-serif text-[16px] text-navy leading-tight group-hover:text-gold-dark transition-colors">
              {cat.label}
            </h3>
            <p className="font-mono text-[10px] text-slate-light mt-0.5">{cat.slug}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

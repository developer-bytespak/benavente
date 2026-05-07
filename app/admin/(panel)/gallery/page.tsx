import Link from 'next/link'
import Image from 'next/image'
import Topbar from '@/components/admin/shell/Topbar'
import CategoryList from '@/components/admin/lists/CategoryList'
import Icon from '@/components/admin/ui/Icon'
import { getCategoriesWithCounts, getFeaturedImages } from '@/lib/cms/gallery'

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const [categories, featured] = await Promise.all([
    getCategoriesWithCounts(),
    getFeaturedImages(),
  ])

  const totalImages = categories.reduce((sum, c) => sum + c.image_count, 0)

  const addBtn = (
    <Link
      href="/admin/gallery/new"
      className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
    >
      <Icon name="plus" className="w-[14px] h-[14px]" />
      Add Category
    </Link>
  )

  return (
    <>
      <Topbar
        title="Gallery"
        subtitle={`${categories.length} categor${categories.length === 1 ? 'y' : 'ies'} · ${totalImages} total images`}
        actions={addBtn}
      />
      <main className="flex-1 px-5 lg:px-9 py-7 space-y-7">
        <section className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
          <div className="px-5 py-4 border-b border-gold/10 bg-cream/40 flex items-center justify-between">
            <div>
              <p className="text-gold text-[10px] tracking-[0.28em] uppercase font-serif font-medium">
                Home Page
              </p>
              <h2 className="font-serif text-[16px] text-navy leading-tight mt-0.5">
                Featured Portfolio ({featured.length}/5)
              </h2>
              <p className="text-slate text-[12px] font-serif mt-0.5">
                Click the star on any image to feature it on the homepage. Cap of 5.
              </p>
            </div>
          </div>
          {featured.length === 0 ? (
            <p className="px-5 py-8 text-center text-slate text-[13px] font-serif">
              No featured images yet. Open a category and click the star icon on any image.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-3">
              {featured.map((img) => (
                <Link
                  key={img.id}
                  href={`/admin/gallery/${img.category_id}`}
                  className="relative aspect-square rounded-[3px] overflow-hidden bg-cream/40 group"
                >
                  <Image
                    src={img.image_url}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                  />
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-gold/95 text-white text-[10px] font-serif font-medium">
                    <Icon name="star" className="w-3 h-3" />#{img.featured_order}
                  </span>
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-serif text-[18px] text-navy mb-3">Categories</h2>
          <CategoryList categories={categories} />
        </section>
      </main>
    </>
  )
}

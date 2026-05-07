import Link from 'next/link'
import { notFound } from 'next/navigation'
import Topbar from '@/components/admin/shell/Topbar'
import CategoryForm from '@/components/admin/forms/CategoryForm'
import GalleryImagesGrid from '@/components/admin/lists/GalleryImagesGrid'
import Icon from '@/components/admin/ui/Icon'
import DeleteButton from '@/components/admin/ui/DeleteButton'
import { getCategory, getImagesForCategory } from '@/lib/cms/gallery'
import { deleteCategory } from '@/app/admin/_actions/gallery'

export const dynamic = 'force-dynamic'

export default async function CategoryDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const category = await getCategory(params.id)
  if (!category) notFound()

  const images = await getImagesForCategory(category.id)

  const actions = (
    <>
      <Link
        href="/admin/gallery"
        className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy text-[12px] font-serif font-medium tracking-[0.14em] uppercase"
      >
        <Icon name="chevronRight" className="w-[14px] h-[14px] rotate-180" />
        Back
      </Link>
      <DeleteButton
        action={deleteCategory.bind(null, category.id)}
        message={`Delete "${category.label}" and all its images? This cannot be undone.`}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] text-red-600 hover:bg-red-50 border border-red-200 text-[12px] font-serif font-medium tracking-[0.14em] uppercase"
      >
        <Icon name="trash" className="w-[14px] h-[14px]" />
        Delete Category
      </DeleteButton>
    </>
  )

  return (
    <>
      <Topbar
        title={category.label}
        subtitle={`${images.length} image${images.length === 1 ? '' : 's'} · slug: ${category.slug}`}
        actions={actions}
      />
      <main className="flex-1 px-5 lg:px-9 py-7 space-y-7">
        <CategoryForm category={category} />
        <section>
          <h2 className="font-serif text-[18px] text-navy mb-3">Images</h2>
          <GalleryImagesGrid categoryId={category.id} images={images} />
        </section>
      </main>
    </>
  )
}

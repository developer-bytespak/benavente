import Link from 'next/link'
import { notFound } from 'next/navigation'
import Topbar from '@/components/admin/shell/Topbar'
import TestimonialForm from '@/components/admin/forms/TestimonialForm'
import Icon from '@/components/admin/ui/Icon'
import DeleteButton from '@/components/admin/ui/DeleteButton'
import { getTestimonial } from '@/lib/cms/testimonials'
import { deleteTestimonial } from '@/app/admin/_actions/testimonials'

export const dynamic = 'force-dynamic'

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const t = await getTestimonial(params.id)
  if (!t) notFound()

  const actions = (
    <>
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy text-[12px] font-serif font-medium tracking-[0.14em] uppercase"
      >
        <Icon name="chevronRight" className="w-[14px] h-[14px] rotate-180" />
        Back
      </Link>
      <DeleteButton
        action={deleteTestimonial.bind(null, t.id)}
        message="Delete this testimonial?"
        className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] text-red-600 hover:bg-red-50 border border-red-200 text-[12px] font-serif font-medium tracking-[0.14em] uppercase"
      >
        <Icon name="trash" className="w-[14px] h-[14px]" />
        Delete
      </DeleteButton>
    </>
  )

  return (
    <>
      <Topbar title="Edit Testimonial" actions={actions} />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <TestimonialForm testimonial={t} />
      </main>
    </>
  )
}

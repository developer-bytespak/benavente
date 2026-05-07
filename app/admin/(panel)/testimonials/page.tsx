import Link from 'next/link'
import Topbar from '@/components/admin/shell/Topbar'
import TestimonialList from '@/components/admin/lists/TestimonialList'
import Icon from '@/components/admin/ui/Icon'
import { getAllTestimonials } from '@/lib/cms/testimonials'

export const dynamic = 'force-dynamic'

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials()
  const visibleCount = testimonials.filter((t) => t.visible).length

  const addBtn = (
    <Link
      href="/admin/testimonials/new"
      className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors"
    >
      <Icon name="plus" className="w-[14px] h-[14px]" />
      Add Testimonial
    </Link>
  )

  return (
    <>
      <Topbar
        title="Testimonials"
        subtitle={`${testimonials.length} total · ${visibleCount} visible on homepage`}
        actions={addBtn}
      />
      <main className="flex-1 px-5 lg:px-9 py-7">
        <TestimonialList testimonials={testimonials} />
      </main>
    </>
  )
}

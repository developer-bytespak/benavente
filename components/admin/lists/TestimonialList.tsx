import Link from 'next/link'
import Icon from '@/components/admin/ui/Icon'
import DeleteButton from '@/components/admin/ui/DeleteButton'
import {
  deleteTestimonial,
  toggleTestimonialVisibility,
} from '@/app/admin/_actions/testimonials'
import type { TestimonialRow } from '@/lib/supabase/types'

interface Props {
  testimonials: TestimonialRow[]
}

export default function TestimonialList({ testimonials }: Props) {
  if (testimonials.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gold/30 rounded-[4px] p-10 text-center">
        <span className="inline-flex w-12 h-12 rounded-full bg-gold/10 text-gold-dark items-center justify-center">
          <Icon name="testimonials" className="w-6 h-6" />
        </span>
        <h3 className="font-serif text-[18px] text-navy mt-3">No testimonials yet</h3>
        <p className="text-slate text-[13px] font-serif mt-1.5">
          Add a client quote — it will appear in the homepage slider.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gold/15 rounded-[4px] overflow-hidden">
      <ul className="divide-y divide-gold/10">
        {testimonials.map((t) => (
          <li key={t.id} className="px-5 py-5 flex items-start gap-4">
            <span className="font-serif text-[40px] text-gold/30 leading-none select-none mt-1">
              &ldquo;
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-serif italic text-[15px] text-navy leading-[1.6] line-clamp-3">
                {t.quote}
              </p>
              {(t.author || t.company) && (
                <p className="text-slate text-[12px] font-serif mt-2">
                  — {[t.author, t.company].filter(Boolean).join(', ')}
                </p>
              )}
              <div className="flex items-center gap-3 mt-3 text-[11px] font-serif text-slate-light">
                <span className="inline-flex items-center gap-1">
                  <Icon name="arrowDown" className="w-3 h-3" />
                  Order {t.sort_order}
                </span>
                <span
                  className={`inline-flex items-center gap-1 ${
                    t.visible ? 'text-emerald-700' : 'text-slate'
                  }`}
                >
                  <Icon name={t.visible ? 'eye' : 'eyeOff'} className="w-3 h-3" />
                  {t.visible ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-1">
              <Link
                href={`/admin/testimonials/${t.id}`}
                title="Edit"
                className="w-9 h-9 flex items-center justify-center rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy"
              >
                <Icon name="edit" className="w-[14px] h-[14px]" />
              </Link>
              <form action={toggleTestimonialVisibility.bind(null, t.id)}>
                <button
                  type="submit"
                  title={t.visible ? 'Hide' : 'Show'}
                  className="w-9 h-9 flex items-center justify-center rounded-[3px] bg-cream/60 hover:bg-cream border border-gold/20 text-navy"
                >
                  <Icon name={t.visible ? 'eye' : 'eyeOff'} className="w-[14px] h-[14px]" />
                </button>
              </form>
              <DeleteButton
                action={deleteTestimonial.bind(null, t.id)}
                message="Delete this testimonial?"
                className="w-9 h-9 flex items-center justify-center rounded-[3px] text-slate hover:text-red-600 hover:bg-red-50"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

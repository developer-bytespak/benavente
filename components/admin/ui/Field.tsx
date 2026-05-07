interface BaseProps {
  name: string
  label: string
  defaultValue?: string
  hint?: string
  required?: boolean
  placeholder?: string
}

interface InputProps extends BaseProps {
  type?: 'text' | 'email' | 'url' | 'tel' | 'number'
  rows?: never
}

interface TextareaProps extends BaseProps {
  type: 'textarea'
  rows?: number
}

type Props = InputProps | TextareaProps

const baseClass =
  'w-full bg-cream/40 border border-gold/20 focus:border-gold focus:bg-white focus:outline-none px-3 py-2.5 text-[14px] font-serif text-navy placeholder:text-slate-light/60 rounded-[3px] transition'

export default function Field(props: Props) {
  return (
    <label className="block">
      <span className="text-navy text-[11px] tracking-[0.18em] uppercase font-serif font-medium block mb-1.5">
        {props.label} {props.required && <span className="text-red-500">*</span>}
      </span>
      {props.type === 'textarea' ? (
        <textarea
          name={props.name}
          defaultValue={props.defaultValue ?? ''}
          required={props.required}
          rows={props.rows ?? 3}
          placeholder={props.placeholder}
          className={baseClass}
        />
      ) : (
        <input
          name={props.name}
          type={props.type ?? 'text'}
          defaultValue={props.defaultValue ?? ''}
          required={props.required}
          placeholder={props.placeholder}
          className={baseClass}
        />
      )}
      {props.hint && (
        <p className="text-slate text-[11px] font-serif mt-1.5 leading-relaxed">{props.hint}</p>
      )}
    </label>
  )
}

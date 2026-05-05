'use client'

import type { ReactNode } from 'react'
import Icon from './Icon'

interface Props {
  action: (formData?: FormData) => void | Promise<void>
  message: string
  className?: string
  formClassName?: string
  title?: string
  children?: ReactNode
}

// Small client island so the confirm() dialog can run in the browser while
// the surrounding list/page stays a server component.
export default function DeleteButton({
  action,
  message,
  className = '',
  formClassName,
  title = 'Delete',
  children,
}: Props) {
  return (
    <form action={action} className={formClassName}>
      <button
        type="submit"
        title={title}
        onClick={(e) => {
          if (!confirm(message)) e.preventDefault()
        }}
        className={className}
      >
        {children ?? <Icon name="trash" className="w-[14px] h-[14px]" />}
      </button>
    </form>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/lib/sanity/image'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-serif font-light text-[19px] text-navy leading-[1.85] mb-6">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-[clamp(26px,3vw,34px)] text-navy leading-[1.25] mt-14 mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-[clamp(22px,2.5vw,28px)] text-navy leading-[1.3] mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-serif text-[20px] text-navy leading-[1.35] mt-8 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gold pl-6 my-10 font-serif italic text-[22px] text-navy leading-[1.6]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 font-serif font-light text-[19px] text-navy leading-[1.85] mb-6 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 font-serif font-light text-[19px] text-navy leading-[1.85] mb-6 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-navy">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => {
      const href: string = value?.href || '#'
      const blank = value?.blank
      const isExternal = /^https?:\/\//i.test(href)
      if (isExternal || blank) {
        return (
          <a
            href={href}
            target={blank ? '_blank' : undefined}
            rel={blank ? 'noopener noreferrer' : undefined}
            className="text-gold underline-offset-2 hover:underline"
          >
            {children}
          </a>
        )
      }
      return (
        <Link
          href={href}
          className="text-gold underline-offset-2 hover:underline"
        >
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const src = urlFor(value).width(1400).fit('max').url()
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-[16/9] rounded-[2px] overflow-hidden">
            <Image
              src={src}
              alt={value.alt || ''}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center font-serif italic text-[15px] text-slate-light">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export default function PortableContent({
  value,
}: {
  value: PortableTextBlock[]
}) {
  return <PortableText value={value} components={components} />
}

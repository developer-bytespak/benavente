'use client'

import Image from 'next/image'
import { useState } from 'react'
import Icon from './Icon'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { createUploadToken } from '@/app/admin/_actions/upload'
import { toWebP } from '@/lib/image/toWebP'
import type { BucketKey } from '@/lib/admin/storage'

interface Props {
  name: string
  bucket: BucketKey
  prefix: string
  defaultUrls?: string[]
  label: string
  hint?: string
}

export default function MultiImageDropzone({
  name,
  bucket,
  prefix,
  defaultUrls = [],
  label,
  hint,
}: Props) {
  const [urls, setUrls] = useState<string[]>(defaultUrls)
  const [uploading, setUploading] = useState(0)
  const [error, setError] = useState<string | null>(null)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setError(null)
    setUploading(files.length)
    try {
      for (const file of Array.from(files)) {
        const converted = await toWebP(file)
        const token = await createUploadToken(bucket, prefix, converted.name)
        const { error: upErr } = await supabaseBrowser()
          .storage.from(token.bucket)
          .uploadToSignedUrl(token.path, token.token, converted, {
            contentType: converted.type,
          })
        if (upErr) throw upErr
        setUrls((prev) => [...prev, token.publicUrl])
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(0)
    }
  }

  function remove(i: number) {
    setUrls((prev) => prev.filter((_, j) => j !== i))
  }

  function move(i: number, dir: -1 | 1) {
    setUrls((prev) => {
      const arr = [...prev]
      const j = i + dir
      if (j < 0 || j >= arr.length) return prev
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      return arr
    })
  }

  return (
    <div>
      <span className="text-navy text-[11px] tracking-[0.18em] uppercase font-serif font-medium block mb-1.5">
        {label} <span className="text-slate-light normal-case tracking-normal">({urls.length})</span>
      </span>
      {urls.map((url, i) => (
        <input key={`${url}-${i}`} type="hidden" name={name} value={url} />
      ))}

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
        {urls.map((url, i) => (
          <div
            key={`${url}-${i}`}
            className="relative aspect-square rounded-[3px] overflow-hidden border border-gold/20 bg-cream/40 group"
          >
            <Image src={url} alt="" fill sizes="160px" className="object-cover" />
            <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                title="Move left"
                className="w-7 h-7 rounded-[2px] bg-white/90 hover:bg-white text-navy flex items-center justify-center disabled:opacity-30"
              >
                <Icon name="chevronRight" className="w-3.5 h-3.5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === urls.length - 1}
                title="Move right"
                className="w-7 h-7 rounded-[2px] bg-white/90 hover:bg-white text-navy flex items-center justify-center disabled:opacity-30"
              >
                <Icon name="chevronRight" className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                title="Remove"
                className="w-7 h-7 rounded-[2px] bg-white/90 hover:bg-red-50 text-red-600 flex items-center justify-center"
              >
                <Icon name="trash" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        <label className="aspect-square rounded-[3px] border border-dashed border-gold/30 hover:border-gold hover:bg-cream/30 flex flex-col items-center justify-center text-slate-light hover:text-gold-dark cursor-pointer transition-colors">
          {uploading > 0 ? (
            <>
              <span className="w-5 h-5 rounded-full border-2 border-gold/40 border-t-gold animate-spin" />
              <span className="text-[11px] font-serif mt-1">Uploading {uploading}…</span>
            </>
          ) : (
            <>
              <Icon name="plus" className="w-6 h-6" />
              <span className="text-[11px] font-serif mt-1">Add images</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>

      {hint && <p className="text-slate text-[11px] font-serif mt-2 leading-relaxed">{hint}</p>}
      {error && <p className="text-red-600 text-[12px] font-serif mt-2">{error}</p>}
    </div>
  )
}

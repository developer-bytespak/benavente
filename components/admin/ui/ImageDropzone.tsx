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
  defaultUrl?: string | null
  label: string
  hint?: string
  aspect?: 'square' | 'portrait' | 'landscape'
}

export default function ImageDropzone({
  name,
  bucket,
  prefix,
  defaultUrl,
  label,
  hint,
  aspect = 'square',
}: Props) {
  const [url, setUrl] = useState(defaultUrl ?? '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const aspectClass = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/9]',
  }[aspect]

  async function handleFile(file: File | undefined) {
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      const converted = await toWebP(file)
      const token = await createUploadToken(bucket, prefix, converted.name)
      const { error: upErr } = await supabaseBrowser()
        .storage.from(token.bucket)
        .uploadToSignedUrl(token.path, token.token, converted, {
          contentType: converted.type,
        })
      if (upErr) throw upErr
      setUrl(token.publicUrl)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <span className="text-navy text-[11px] tracking-[0.18em] uppercase font-serif font-medium block mb-1.5">
        {label}
      </span>
      <input type="hidden" name={name} value={url} />

      <div className="flex items-start gap-4">
        <div
          className={`relative ${aspectClass} w-[140px] rounded-[3px] overflow-hidden border border-gold/20 bg-cream/40 shrink-0`}
        >
          {url ? (
            <Image src={url} alt="" fill sizes="140px" className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-light">
              <Icon name="image" className="w-7 h-7" />
              <span className="text-[11px] font-serif mt-1">No image</span>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-navy/60 flex items-center justify-center">
              <span className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <label className="inline-flex items-center gap-2 h-9 px-4 rounded-[3px] bg-cream border border-gold/25 hover:bg-white text-navy text-[12px] font-serif font-medium tracking-[0.14em] uppercase cursor-pointer transition-colors">
            <Icon name="upload" className="w-[14px] h-[14px]" />
            {url ? 'Replace image' : 'Choose file'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
          {url && (
            <button
              type="button"
              onClick={() => setUrl('')}
              className="ml-2 inline-flex items-center gap-1 h-9 px-3 rounded-[3px] text-slate hover:text-red-600 text-[12px] font-serif font-medium"
            >
              <Icon name="trash" className="w-[14px] h-[14px]" />
              Remove
            </button>
          )}
          {hint && <p className="text-slate text-[11px] font-serif mt-2 leading-relaxed">{hint}</p>}
          {error && <p className="text-red-600 text-[12px] font-serif mt-2">{error}</p>}
          {url && (
            <p className="text-slate-light text-[10px] font-mono mt-2 truncate">{url}</p>
          )}
        </div>
      </div>
    </div>
  )
}

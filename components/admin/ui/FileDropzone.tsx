'use client'

import { useState } from 'react'
import Icon from './Icon'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { createUploadToken } from '@/app/admin/_actions/upload'
import type { BucketKey } from '@/lib/admin/storage'

interface Props {
  urlName: string
  filenameName?: string
  bucket: BucketKey
  prefix: string
  defaultUrl?: string | null
  defaultFilename?: string | null
  label: string
  accept?: string
  hint?: string
}

export default function FileDropzone({
  urlName,
  filenameName,
  bucket,
  prefix,
  defaultUrl,
  defaultFilename,
  label,
  accept = 'application/pdf',
  hint,
}: Props) {
  const [url, setUrl] = useState(defaultUrl ?? '')
  const [filename, setFilename] = useState(defaultFilename ?? '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File | undefined) {
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      const token = await createUploadToken(bucket, prefix, file.name)
      const { error: upErr } = await supabaseBrowser()
        .storage.from(token.bucket)
        .uploadToSignedUrl(token.path, token.token, file, { contentType: file.type })
      if (upErr) throw upErr
      setUrl(token.publicUrl)
      setFilename(file.name)
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
      <input type="hidden" name={urlName} value={url} />
      {filenameName && <input type="hidden" name={filenameName} value={filename} />}

      <div className="bg-cream/40 border border-gold/20 rounded-[3px] p-4 flex items-center gap-4">
        <span className="w-10 h-10 rounded-full bg-gold/10 text-gold-dark flex items-center justify-center shrink-0">
          <Icon name={url ? 'fileText' : 'upload'} className="w-5 h-5" />
        </span>

        <div className="flex-1 min-w-0">
          {url ? (
            <>
              <p className="font-serif text-[14px] text-navy truncate">{filename || 'File uploaded'}</p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-light text-[11px] font-mono truncate hover:text-gold-dark inline-block max-w-full"
              >
                {url}
              </a>
            </>
          ) : (
            <p className="text-slate text-[13px] font-serif">No file uploaded</p>
          )}
          {error && <p className="text-red-600 text-[12px] font-serif mt-1">{error}</p>}
          {hint && !error && (
            <p className="text-slate-light text-[11px] font-serif mt-1">{hint}</p>
          )}
        </div>

        <div className="shrink-0 flex items-center gap-1">
          <label className="inline-flex items-center gap-2 h-9 px-3 rounded-[3px] bg-white border border-gold/25 hover:bg-cream text-navy text-[12px] font-serif font-medium tracking-[0.14em] uppercase cursor-pointer transition-colors">
            {uploading ? (
              <span className="w-3 h-3 rounded-full border border-navy/40 border-t-navy animate-spin" />
            ) : (
              <Icon name="upload" className="w-[14px] h-[14px]" />
            )}
            {url ? 'Replace' : 'Upload'}
            <input
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
          {url && (
            <button
              type="button"
              onClick={() => {
                setUrl('')
                setFilename('')
              }}
              title="Remove file"
              className="w-9 h-9 flex items-center justify-center rounded-[3px] text-slate hover:text-red-600 hover:bg-red-50"
            >
              <Icon name="trash" className="w-[14px] h-[14px]" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

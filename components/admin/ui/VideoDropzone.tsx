'use client'

import { useState } from 'react'
import Icon from './Icon'

interface Props {
  name: string
  defaultUrls?: string[]
  label: string
  hint?: string
  folder?: string
}

interface SignResponse {
  ok: boolean
  error?: string
  signature?: string
  timestamp?: number
  apiKey?: string
  cloudName?: string
  folder?: string
}

export default function VideoDropzone({
  name,
  defaultUrls = [],
  label,
  hint,
  folder = 'benavente/hero',
}: Props) {
  const [urls, setUrls] = useState<string[]>(defaultUrls)
  const [uploading, setUploading] = useState(0)
  const [error, setError] = useState<string | null>(null)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setError(null)
    setUploading(files.length)

    try {
      const sigRes = await fetch('/api/cloudinary/sign', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ folder }),
      })
      const sig: SignResponse = await sigRes.json()
      if (!sigRes.ok || !sig.ok || !sig.cloudName) {
        throw new Error(sig.error || 'Could not get upload signature.')
      }

      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('api_key', sig.apiKey!)
        fd.append('timestamp', String(sig.timestamp!))
        fd.append('folder', sig.folder!)
        fd.append('signature', sig.signature!)

        const upRes = await fetch(
          `https://api.cloudinary.com/v1_1/${sig.cloudName}/video/upload`,
          { method: 'POST', body: fd }
        )
        const result = await upRes.json()
        if (result.error) throw new Error(result.error.message)
        if (!result.secure_url) throw new Error('Upload returned no URL.')
        setUrls((prev) => [...prev, result.secure_url as string])
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
        {label}{' '}
        <span className="text-slate-light normal-case tracking-normal">({urls.length})</span>
      </span>
      {urls.map((url, i) => (
        <input key={`${url}-${i}`} type="hidden" name={name} value={url} />
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {urls.map((url, i) => (
          <div
            key={`${url}-${i}`}
            className="relative aspect-video rounded-[3px] overflow-hidden border border-gold/20 bg-navy/5 group"
          >
            <video
              src={url}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
              onMouseLeave={(e) => {
                e.currentTarget.pause()
                e.currentTarget.currentTime = 0
              }}
            />
            <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-navy/85 text-white text-[10px] font-mono">
              #{i + 1}
            </span>
            <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                title="Move earlier"
                className="w-9 h-9 rounded-[2px] bg-white/90 hover:bg-white text-navy flex items-center justify-center disabled:opacity-30"
              >
                <Icon name="chevronRight" className="w-4 h-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === urls.length - 1}
                title="Move later"
                className="w-9 h-9 rounded-[2px] bg-white/90 hover:bg-white text-navy flex items-center justify-center disabled:opacity-30"
              >
                <Icon name="chevronRight" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                title="Remove"
                className="w-9 h-9 rounded-[2px] bg-white/90 hover:bg-red-50 text-red-600 flex items-center justify-center"
              >
                <Icon name="trash" className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <label className="aspect-video rounded-[3px] border border-dashed border-gold/30 hover:border-gold hover:bg-cream/30 flex flex-col items-center justify-center text-slate-light hover:text-gold-dark cursor-pointer transition-colors">
          {uploading > 0 ? (
            <>
              <span className="w-6 h-6 rounded-full border-2 border-gold/40 border-t-gold animate-spin" />
              <span className="text-[12px] font-serif mt-2">Uploading {uploading}…</span>
            </>
          ) : (
            <>
              <Icon name="upload" className="w-7 h-7" />
              <span className="text-[12px] font-serif mt-2">Add video</span>
              <span className="text-[10px] font-serif mt-0.5 opacity-60">.mp4 / .mov</span>
            </>
          )}
          <input
            type="file"
            accept="video/*"
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

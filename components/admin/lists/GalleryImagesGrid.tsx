'use client'

import Image from 'next/image'
import { useState, useTransition } from 'react'
import Icon from '@/components/admin/ui/Icon'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { createUploadToken } from '@/app/admin/_actions/upload'
import { toWebP } from '@/lib/image/toWebP'
import {
  addGalleryImages,
  deleteGalleryImage,
  toggleImageFeatured,
} from '@/app/admin/_actions/gallery'
import type { GalleryImageRow } from '@/lib/supabase/types'

interface Props {
  categoryId: string
  images: GalleryImageRow[]
}

export default function GalleryImagesGrid({ categoryId, images }: Props) {
  const [pending, startTransition] = useTransition()
  const [uploadCount, setUploadCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [toggleError, setToggleError] = useState<string | null>(null)

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    setError(null)
    setUploadCount(files.length)

    const urls: string[] = []
    try {
      for (const file of Array.from(files)) {
        const converted = await toWebP(file)
        const token = await createUploadToken('gallery', `cat-${categoryId}`, converted.name)
        const { error: upErr } = await supabaseBrowser()
          .storage.from(token.bucket)
          .uploadToSignedUrl(token.path, token.token, converted, {
            contentType: converted.type,
          })
        if (upErr) throw upErr
        urls.push(token.publicUrl)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    }

    setUploadCount(0)
    if (urls.length) {
      startTransition(async () => {
        await addGalleryImages(categoryId, urls)
      })
    }
  }

  async function handleToggleFeatured(id: string) {
    setToggleError(null)
    const result = await toggleImageFeatured(id)
    if (result && !result.ok) setToggleError(result.message)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 h-10 px-4 rounded-[3px] bg-gold text-white hover:bg-gold-dark cursor-pointer text-[12px] font-serif font-medium tracking-[0.14em] uppercase transition-colors">
          {uploadCount > 0 ? (
            <>
              <span className="w-3 h-3 rounded-full border border-white/40 border-t-white animate-spin" />
              Uploading {uploadCount}
            </>
          ) : (
            <>
              <Icon name="upload" className="w-[14px] h-[14px]" />
              Upload Images
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
        </label>
        <p className="text-slate text-[12px] font-serif">
          {images.length} image{images.length === 1 ? '' : 's'} in this category
        </p>
        {pending && (
          <span className="text-slate text-[12px] font-serif italic">saving…</span>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-[13px] font-serif flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
          {error}
        </p>
      )}
      {toggleError && (
        <p className="text-red-600 text-[13px] font-serif flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
          {toggleError}
        </p>
      )}

      {images.length === 0 ? (
        <div className="bg-white border border-dashed border-gold/30 rounded-[4px] p-10 text-center">
          <p className="text-slate text-[14px] font-serif">No images yet — upload some above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-[3px] overflow-hidden border border-gold/15 bg-cream/40 group"
            >
              <Image
                src={img.image_url}
                alt={img.alt ?? ''}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              {img.featured && (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-gold/95 text-white text-[10px] font-serif font-medium tracking-[0.05em]">
                  <Icon name="star" className="w-3 h-3" />
                  Featured
                </span>
              )}
              <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(img.id)}
                  title={img.featured ? 'Unfeature' : 'Feature on home page'}
                  className={`w-9 h-9 rounded-[2px] flex items-center justify-center text-white ${
                    img.featured ? 'bg-gold hover:bg-gold-dark' : 'bg-white/90 text-navy hover:bg-white'
                  }`}
                >
                  <Icon name="star" className="w-4 h-4" />
                </button>
                <form action={deleteGalleryImage.bind(null, img.id)}>
                  <button
                    type="submit"
                    onClick={(e) => {
                      if (!confirm('Delete this image?')) e.preventDefault()
                    }}
                    title="Delete"
                    className="w-9 h-9 rounded-[2px] bg-white/90 hover:bg-red-50 text-red-600 flex items-center justify-center"
                  >
                    <Icon name="trash" className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

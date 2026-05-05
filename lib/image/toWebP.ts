// Browser-side image transcoding. Decodes the picked file via canvas and
// re-encodes as WebP. Runs only on the client (canvas + URL.createObjectURL).
//
// We skip:
//   - already-WebP files (no work to do)
//   - SVGs (vector — would lose fidelity)
//   - GIFs (canvas would only capture the first frame)
//   - non-image files (e.g. PDFs)
// In any of those cases the original File is returned untouched.

const SKIP_TYPES = new Set(['image/webp', 'image/svg+xml', 'image/gif'])

export async function toWebP(file: File, quality = 0.85): Promise<File> {
  if (!file.type.startsWith('image/')) return file
  if (SKIP_TYPES.has(file.type)) return file

  let img: HTMLImageElement
  try {
    img = await loadImage(file)
  } catch {
    // If the browser can't decode it, just upload the original.
    return file
  }

  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) return file
  ctx.drawImage(img, 0, 0)

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/webp', quality)
  )
  if (!blob) return file

  // Don't replace the file if conversion didn't actually shrink it.
  // Some PNGs with mostly-flat colors compress better than WebP for line art.
  if (blob.size >= file.size) return file

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'image'
  return new File([blob], `${baseName}.webp`, { type: 'image/webp' })
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not decode image'))
    }
    img.src = url
  })
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

type Transform = {
  width?: number
  height?: number
  quality?: 'auto' | number
  format?: 'auto' | 'webp' | 'jpg' | 'mp4'
  crop?: 'fill' | 'fit' | 'scale'
}

function buildTransform(opts: Transform) {
  return [
    `f_${opts.format ?? 'auto'}`,
    `q_${opts.quality ?? 'auto'}`,
    opts.width && `w_${opts.width}`,
    opts.height && `h_${opts.height}`,
    opts.crop && `c_${opts.crop}`,
  ]
    .filter(Boolean)
    .join(',')
}

export function cldVideo(publicId: string, opts: Transform = {}) {
  if (!CLOUD_NAME) throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME')
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${buildTransform(opts)}/${publicId}`
}

export function cldImage(publicId: string, opts: Transform = {}) {
  if (!CLOUD_NAME) throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME')
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${buildTransform(opts)}/${publicId}`
}

// Takes a full Cloudinary delivery URL (as stored in the DB) and injects
// bandwidth-saving transforms after `/video/upload/`. f_auto picks the most
// efficient codec, q_auto compresses without visible loss, and c_limit/w_ caps
// resolution so we never serve a 4K original to a hero banner. Cuts video
// delivery ~70-90%. Non-Cloudinary or already-optimized URLs are returned as-is.
export function optimizeCldVideoUrl(url: string, width = 1920): string {
  const marker = '/video/upload/'
  if (!url.includes(marker)) return url

  const [prefix, rest] = url.split(marker)
  // Skip if a transform already appears to be applied.
  if (/^(f_|q_|w_|c_|vc_)/.test(rest)) return url

  const transform = `f_auto,q_auto,w_${width},c_limit`
  return `${prefix}${marker}${transform}/${rest}`
}

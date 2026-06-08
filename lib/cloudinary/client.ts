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
// bandwidth-saving transforms after `/video/upload/`:
//   f_auto        - most efficient codec the browser supports
//   q_auto:eco    - aggressive (but still good-looking) compression
//   w_1280,c_limit- caps width at 720p-grade; never upscales
//   eo_<seconds>  - delivers ONLY the first N seconds. The hero auto-advances
//                   every 5s (~10s of footage at 2x), so the rest of each clip
//                   is never seen — no reason to download it.
// Together these cut video delivery ~90%+. Non-Cloudinary or already-transformed
// URLs are returned unchanged.
export function optimizeCldVideoUrl(
  url: string,
  { width = 1280, maxSeconds = 15 }: { width?: number; maxSeconds?: number } = {}
): string {
  const marker = '/video/upload/'
  if (!url.includes(marker)) return url

  const [prefix, rest] = url.split(marker)
  // Skip if a transform already appears to be applied.
  if (/^(f_|q_|w_|c_|vc_|eo_|du_)/.test(rest)) return url

  const transform = `f_auto,q_auto:eco,w_${width},c_limit,eo_${maxSeconds}`
  return `${prefix}${marker}${transform}/${rest}`
}

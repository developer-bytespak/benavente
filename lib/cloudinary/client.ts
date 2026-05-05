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

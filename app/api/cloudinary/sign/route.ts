import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { supabaseServerComponent } from '@/lib/supabase/serverComponent'

// Mints a short-lived signed upload payload for direct browser→Cloudinary uploads.
// The browser uses these params to POST a file directly to Cloudinary, so the
// file never passes through Vercel (avoiding the 4.5 MB body limit on functions).
export async function POST(req: Request) {
  const { data: { user } } = await supabaseServerComponent().auth.getUser()
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 })
  }

  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!apiKey || !apiSecret || !cloudName) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Cloudinary is not fully configured. Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env and restart the server.',
      },
      { status: 500 }
    )
  }

  const body = (await req.json().catch(() => ({}))) as { folder?: string }
  const folder = String(body.folder ?? 'benavente/hero')
  const timestamp = Math.floor(Date.now() / 1000)

  // Cloudinary signing: build "key=value&key=value" of the params being sent
  // (alphabetically sorted), append the api_secret, and SHA-1.
  const toSign: Record<string, string> = {
    folder,
    timestamp: String(timestamp),
  }
  const signString =
    Object.keys(toSign)
      .sort()
      .map((k) => `${k}=${toSign[k]}`)
      .join('&') + apiSecret
  const signature = createHash('sha1').update(signString).digest('hex')

  return NextResponse.json({
    ok: true,
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder,
  })
}

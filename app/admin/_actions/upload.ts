'use server'

import { requireAdmin } from '@/lib/admin/auth'
import {
  buildUploadPath,
  createSignedUpload,
  publicUrl,
  type BucketKey,
} from '@/lib/admin/storage'

export type UploadToken = {
  bucket: string
  path: string
  token: string
  publicUrl: string
}

export async function createUploadToken(
  bucket: BucketKey,
  prefix: string,
  filename: string
): Promise<UploadToken> {
  await requireAdmin()
  const path = buildUploadPath(prefix, filename)
  const upload = await createSignedUpload(bucket, path)
  return {
    bucket: upload.bucket,
    path,
    token: upload.token,
    publicUrl: publicUrl(bucket, path),
  }
}

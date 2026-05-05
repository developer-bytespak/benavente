'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

function client() {
  const store = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return store.get(name)?.value
        },
        set(name, value, options: CookieOptions) {
          store.set({ name, value, ...options })
        },
        remove(name, options: CookieOptions) {
          store.set({ name, value: '', ...options })
        },
      },
    }
  )
}

export type SignInState = { error: string } | null

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const redirectRaw = String(formData.get('redirect') ?? '/admin')
  const redirectTo = redirectRaw.startsWith('/admin') ? redirectRaw : '/admin'

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const { error } = await client().auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  redirect(redirectTo)
}

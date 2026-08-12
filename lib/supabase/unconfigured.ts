import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

// A no-op stand-in for the Supabase client, used when the project has no
// credentials configured (see ./server.ts). It lets the public site render
// standalone: every read resolves to an empty result, so the existing
// `data ?? []` / `if (error) return null` handling in lib/cms/* degrades to
// empty content instead of throwing. Writes report a clear error.

const NOT_CONFIGURED = 'Supabase is not configured'

type EmptyResult = {
  data: null
  error: null
  count: null
  status: number
  statusText: string
}

const EMPTY: EmptyResult = {
  data: null,
  error: null,
  count: null,
  status: 200,
  statusText: 'OK',
}

// PostgREST builders are chainable and awaitable. This proxy answers any
// method call with itself, and resolves to EMPTY when awaited, so arbitrary
// chains like .from(t).select(c).eq(a,b).order(x).maybeSingle() just work.
function emptyBuilder(): unknown {
  const builder: unknown = new Proxy(function noop() {}, {
    get(_target, prop) {
      if (prop === 'then') {
        return (onFulfilled?: (value: EmptyResult) => unknown) =>
          Promise.resolve(EMPTY).then(onFulfilled)
      }
      if (prop === 'catch') {
        return () => Promise.resolve(EMPTY)
      }
      if (prop === 'finally') {
        return (onFinally?: () => void) =>
          Promise.resolve(EMPTY).finally(onFinally)
      }
      return () => builder
    },
    apply: () => builder,
  })
  return builder
}

const authStub = {
  getUser: async () => ({ data: { user: null }, error: null }),
  getSession: async () => ({ data: { session: null }, error: null }),
  signInWithPassword: async () => ({
    data: { user: null, session: null },
    error: { message: NOT_CONFIGURED, name: 'AuthError', status: 500 },
  }),
  signOut: async () => ({ error: null }),
  updateUser: async () => ({
    data: { user: null },
    error: { message: NOT_CONFIGURED, name: 'AuthError', status: 500 },
  }),
  onAuthStateChange: () => ({
    data: { subscription: { unsubscribe: () => {} } },
  }),
}

const storageStub = {
  from: () => ({
    upload: async () => ({ data: null, error: { message: NOT_CONFIGURED } }),
    remove: async () => ({ data: null, error: { message: NOT_CONFIGURED } }),
    createSignedUrl: async () => ({
      data: null,
      error: { message: NOT_CONFIGURED },
    }),
    getPublicUrl: () => ({ data: { publicUrl: '' } }),
  }),
}

export function createUnconfiguredSupabaseClient(): SupabaseClient<Database> {
  return new Proxy(
    {},
    {
      get(_target, prop) {
        if (prop === 'auth') return authStub
        if (prop === 'storage') return storageStub
        // .from(), .rpc(), .schema(), …
        return () => emptyBuilder()
      },
    }
  ) as unknown as SupabaseClient<Database>
}

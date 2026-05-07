import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value
        },
        set(name, value, options: CookieOptions) {
          req.cookies.set({ name, value, ...options })
          res = NextResponse.next({ request: req })
          res.cookies.set({ name, value, ...options })
        },
        remove(name, options: CookieOptions) {
          req.cookies.set({ name, value: '', ...options })
          res = NextResponse.next({ request: req })
          res.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Refreshes the auth cookie if expiring soon, otherwise no-op.
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = req.nextUrl
  const isLoginPage = pathname === '/admin/login'
  const isLogoutPage = pathname === '/admin/logout'

  // Block unauthenticated access to /admin/* (except login/logout themselves)
  if (!user && !isLoginPage && !isLogoutPage) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    if (pathname !== '/admin') url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // If already logged in and visiting login, send them to the dashboard.
  if (user && isLoginPage) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}

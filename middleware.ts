import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export const middleware = withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Admin routes protection
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const token = req.nextauth.token

      if (!token || token.role !== 'admin') {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

/**
 * Production-grade middleware for route protection
 * Runs at the edge before any page loads
 */
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Admin routes - require SUPER_ADMIN role
    if (pathname.startsWith('/admin')) {
      if (token?.role !== 'SUPER_ADMIN') {
        // Not an admin - redirect to dashboard or sign in
        if (token) {
          return NextResponse.redirect(new URL('/studio/dashboard', req.url));
        }
        return NextResponse.redirect(new URL('/studio/signin', req.url));
      }
    }

    // Dashboard routes - require any authenticated user
    if (pathname.startsWith('/studio/dashboard')) {
      if (!token) {
        return NextResponse.redirect(new URL('/studio/signin', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Define which routes should trigger auth check
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        // Admin routes require SUPER_ADMIN
        if (pathname.startsWith('/admin')) {
          return token?.role === 'SUPER_ADMIN';
        }
        
        // Dashboard routes require any authenticated user
        if (pathname.startsWith('/studio/dashboard')) {
          return !!token;
        }
        
        // All other routes are public
        return true;
      },
    },
    pages: {
      signIn: '/studio/signin',
    },
  }
);

/**
 * Configure which routes this middleware runs on
 */
export const config = {
  matcher: [
    // Protect dashboard routes
    '/studio/dashboard/:path*',
    // Protect admin routes
    '/admin/:path*',
    // Don't run on these paths
    '/((?!api|_next/static|_next/image|favicon.ico|images|films).*)',
  ],
};

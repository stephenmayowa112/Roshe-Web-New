import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

/**
 * Get the current session on the server side
 * Used in Server Components, Route Handlers, and Server Actions
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Require authentication - redirects to sign in if not authenticated
 * Use this in Server Components that require authentication
 */
export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    redirect('/studio/signin');
  }
  
  return session;
}

/**
 * Require specific role - redirects if user doesn't have required role
 */
export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth();
  
  const userRole = session.user?.role as string;
  
  if (!userRole || !allowedRoles.includes(userRole)) {
    redirect('/studio/dashboard'); // Redirect to dashboard if insufficient permissions
  }
  
  return session;
}

/**
 * Require admin role - redirects if not admin
 */
export async function requireAdmin() {
  return await requireRole(['SUPER_ADMIN']);
}

/**
 * Check if user is authenticated (without redirect)
 * Returns true if authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

/**
 * Check if user has specific role (without redirect)
 */
export async function hasRole(allowedRoles: string[]): Promise<boolean> {
  const session = await getSession();
  const userRole = session?.user?.role as string;
  return userRole ? allowedRoles.includes(userRole) : false;
}

/**
 * Get user from session or null
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
}

/**
 * Middleware to check if the user is authenticated and has admin privileges
 */
export async function requireAdmin(): Promise<AdminUser> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  
  if (!token) {
    throw new Error('UNAUTHORIZED');
  }

  let decoded;
  try {
    decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as any;
  } catch (error) {
    throw new Error('INVALID_TOKEN');
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
    }
  });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  if (!['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
    throw new Error('FORBIDDEN');
  }

  return user;
}

/**
 * Wrapper function for admin API routes
 */
export function withAdminAuth<T extends any[]>(
  handler: (user: AdminUser, ...args: T) => Promise<Response>
) {
  return async (...args: T): Promise<Response> => {
    try {
      const user = await requireAdmin();
      return await handler(user, ...args);
    } catch (error: any) {
      console.error('Admin auth error:', error);
      
      switch (error.message) {
        case 'UNAUTHORIZED':
        case 'INVALID_TOKEN':
          return new Response(
            JSON.stringify({ error: 'Unauthorized' }), 
            { 
              status: 401,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        case 'USER_NOT_FOUND':
        case 'FORBIDDEN':
          return new Response(
            JSON.stringify({ error: 'Forbidden' }), 
            { 
              status: 403,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        default:
          return new Response(
            JSON.stringify({ error: 'Internal server error' }), 
            { 
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            }
          );
      }
    }
  };
}

/**
 * Helper function to validate admin access in client components
 */
export async function checkAdminAccess(): Promise<boolean> {
  try {
    await requireAdmin();
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get current admin user info
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    return await requireAdmin();
  } catch (error) {
    return null;
  }
}
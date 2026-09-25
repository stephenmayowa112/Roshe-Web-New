'use client';

import { signOut } from 'next-auth/react';

/**
 * Client-side sign out utility with comprehensive cleanup
 */
export async function handleSignOut() {
  try {
    // Clear all NextAuth cookies manually before calling signOut
    const cookiesToClear = [
      'next-auth.session-token',
      'next-auth.callback-url',
      'next-auth.csrf-token',
      '__Secure-next-auth.session-token',
      '__Secure-next-auth.callback-url',
      '__Host-next-auth.csrf-token',
      'auth-token', // Legacy cookie
    ];

    // Delete all auth-related cookies
    cookiesToClear.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // Sign out with NextAuth (this will also clear its cookies)
    await signOut({ 
      callbackUrl: '/',
      redirect: true 
    });
  } catch (error) {
    console.error('Sign out error:', error);
    // Force redirect even if signOut fails
    window.location.href = '/';
  }
}

import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
import { NextRequest } from 'next/server';
import { JWT_SECRET } from '@/lib/jwt';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // No PrismaAdapter — we handle user creation manually in signIn callback.
  // This avoids the conflict between PrismaAdapter and strategy: 'jwt'.
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            school: { select: { id: true, name: true, type: true } },
          },
        });

        if (!user) return null;

        // OAuth-only user — no password set
        if (!user.password) {
          throw new Error('This account uses Google sign-in. Please use "Continue with Google".');
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        if (!user.isEmailVerified) {
          throw new Error('Please verify your email before signing in.');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name || `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.email,
          image: null,
          role: user.role,
          schoolId: user.schoolId ?? undefined,
          school: user.school ?? undefined,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours - update session every day
  },

  events: {
    // Clean up on sign out
    async signOut({ token, session }) {
      console.log('[NextAuth] User signed out:', token?.email || session?.user?.email);
    },
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      // Only run extra logic for Google OAuth
      if (account?.provider === 'google') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (existingUser) {
            // User already exists — update name and mark email as verified
            await prisma.user.update({
              where: { email: user.email! },
              data: {
                name: existingUser.name || user.name || '',
                emailVerified: existingUser.emailVerified ?? new Date(),
                isEmailVerified: true,
              },
            });
            // Pass DB id so JWT callback receives the real user id
            user.id = existingUser.id;
          } else {
            // Brand-new Google user — create record
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name ?? '',
                password: null, // OAuth user — no password
                role: 'SCHOOL_ADMIN',
                emailVerified: new Date(),
                isEmailVerified: true,
              },
            });
            user.id = newUser.id;
          }

          return true;
        } catch (err) {
          console.error('[NextAuth] Google signIn error:', err);
          return false;
        }
      }

      // Credentials users fall through here after authorize()
      return true;
    },

    async jwt({ token, user, trigger }) {
      // On first sign-in `user` is populated — hydrate the token
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.schoolId = (user as any).schoolId;
        token.school = (user as any).school;
      }

      // On subsequent requests, refresh role/school from DB (optional but keeps data fresh)
      if (trigger === 'update' || (!token.role && token.sub)) {
        const dbUser = await prisma.user.findUnique({
          where: { id: (token.id ?? token.sub) as string },
          include: { school: { select: { id: true, name: true, type: true } } },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.schoolId = dbUser.schoolId ?? undefined;
          token.school = dbUser.school ?? undefined;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id ?? token.sub) as string;
        session.user.role = token.role as string;
        session.user.schoolId = token.schoolId as string | undefined;
        session.user.school = token.school as any;
      }
      return session;
    },
  },

  pages: {
    signIn: '/studio/signin',
    error: '/studio/auth/error',
  },

  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: process.env.NODE_ENV === 'production'
        ? '__Secure-next-auth.callback-url'
        : 'next-auth.callback-url',
      options: {
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: process.env.NODE_ENV === 'production'
        ? '__Host-next-auth.csrf-token'
        : 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  debug: process.env.NODE_ENV === 'development',
};

// ─── Legacy JWT helper (used by admin routes) ────────────────────────────────
export async function verifyAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return { success: false, error: 'No authentication token provided' } as const;
    }

    const decoded = (await import('jsonwebtoken')).verify(
      token,
      JWT_SECRET,
    ) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        schoolId: true,
        emailVerified: true,
        isEmailVerified: true,
      },
    });

    if (!user) return { success: false, error: 'User not found' } as const;

    if (!user.emailVerified && !user.isEmailVerified) {
      return { success: false, error: 'Email not verified' } as const;
    }

    return {
      success: true,
      user: { ...user, schoolId: user.schoolId || '' },
    } as const;
  } catch (error) {
    console.error('Auth verification error:', error);
    return { success: false, error: 'Invalid authentication token' } as const;
  }
}

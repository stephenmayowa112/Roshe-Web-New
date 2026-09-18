import { NextRequest } from 'next/server';
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
import { JWT_SECRET } from '@/lib/jwt';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Allow linking accounts with the same email address
  debug: process.env.NODE_ENV === 'development',
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    
    // Credentials Provider (for existing email/password users)
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            school: {
              select: { id: true, name: true, type: true }
            }
          }
        });

        if (!user) {
          return null;
        }

        // Check if this is an OAuth user (no password)
        if (!user.password) {
          throw new Error('This account uses social login. Please sign in with Google.');
        }

        const isPasswordValid = await compare(credentials.password, user.password);
        
        if (!isPasswordValid) {
          return null;
        }

        // Check if email is verified
        if (!user.isEmailVerified) {
          throw new Error('Please verify your email before signing in');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name || `${user.firstName} ${user.lastName}`.trim() || user.email,
          role: user.role,
          schoolId: user.schoolId || undefined,
          school: user.school || undefined
        };
      }
    }),
  ],
  
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.schoolId = user.schoolId;
        token.school = user.school;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.user.schoolId = token.schoolId as string;
        session.user.school = token.school as any;
      }
      return session;
    },
    
    async signIn({ user, account, profile, email }) {
      // Allow all sign-ins - PrismaAdapter will handle user creation/linking
      return true;
    },
  },
  
  pages: {
    signIn: '/studio/signin',
    error: '/studio/auth/error',
  },
  
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User signed in: ${user.email} via ${account?.provider}`);
    },
  },
  
  debug: process.env.NODE_ENV === 'development',
};

export async function verifyAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return { success: false, error: 'No authentication token provided' } as const;
    }

    const decoded = (await import('jsonwebtoken')).verify(token, JWT_SECRET) as {
      userId: string;
    };
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
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
          include: { school: true }
        });

        if (!user) {
          return null;
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
          schoolId: user.schoolId,
          school: user.school
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
    
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          });
          
          if (existingUser) {
            // Update existing user with Google account info if needed
            await prisma.user.update({
              where: { email: user.email! },
              data: {
                name: user.name || existingUser.name,
                emailVerified: new Date(),
                isEmailVerified: true,
              }
            });
          } else {
            // Create new user for Google sign-in
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || '',
                password: '', // Empty password for OAuth users
                role: 'SCHOOL_ADMIN', // Default role
                emailVerified: new Date(),
                isEmailVerified: true,
              }
            });
          }
        } catch (error) {
          console.error('Error in Google sign-in callback:', error);
          return false;
        }
      }
      return true;
    },
  },
  
  pages: {
    signIn: '/studio/signin',
    signUp: '/studio/signup',
    error: '/studio/auth/error',
  },
  
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User signed in: ${user.email} via ${account?.provider}`);
    },
  },
  
  debug: process.env.NODE_ENV === 'development',
};
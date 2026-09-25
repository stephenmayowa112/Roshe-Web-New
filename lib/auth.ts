import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { NextRequest } from 'next/server';
import { sql } from '@/lib/neon';
import { JWT_SECRET } from '@/lib/jwt';

type UserRow = {
  id: string;
  email: string;
  password: string | null;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string;
  schoolId: string | null;
  emailVerified: Date | null;
  isEmailVerified: boolean;
};

type SchoolRow = { id: string; name: string; type: string } | null;

async function findUserByEmail(email: string) {
  const rows = await sql<UserRow & SchoolRow extends never ? never : UserRow & { schoolName: string | null; schoolType: string | null }>`
    SELECT u."id", u."email", u."password", u."name", u."firstName", u."lastName",
           u."role", u."schoolId", u."emailVerified", u."isEmailVerified",
           s."name" AS "schoolName", s."type" AS "schoolType"
    FROM "User" u
    LEFT JOIN "School" s ON s."id" = u."schoolId"
    WHERE u."email" = ${email}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

async function findUserById(id: string) {
  const rows = await sql<UserRow & { schoolName: string | null; schoolType: string | null }>`
    SELECT u."id", u."email", u."password", u."name", u."firstName", u."lastName",
           u."role", u."schoolId", u."emailVerified", u."isEmailVerified",
           s."name" AS "schoolName", s."type" AS "schoolType"
    FROM "User" u
    LEFT JOIN "School" s ON s."id" = u."schoolId"
    WHERE u."id" = ${id}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

function schoolFromRow(row: { schoolId: string | null; schoolName: string | null; schoolType: string | null }) {
  return row.schoolId && row.schoolName && row.schoolType
    ? { id: row.schoolId, name: row.schoolName, type: row.schoolType }
    : null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { prompt: 'consent', access_type: 'offline', response_type: 'code' } },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await findUserByEmail(credentials.email);
        if (!user) return null;
        if (!user.password) throw new Error('This account uses Google sign-in. Please use "Continue with Google".');
        if (!(await compare(credentials.password, user.password))) return null;
        if (!user.isEmailVerified && !user.emailVerified) throw new Error('Please verify your email before signing in.');
        return {
          id: user.id,
          email: user.email,
          name: user.name || `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.email,
          image: null,
          role: user.role,
          schoolId: user.schoolId ?? undefined,
          school: schoolFromRow(user),
        };
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60, updateAge: 24 * 60 * 60 },
  events: {
    async signOut({ token, session }) {
      console.log('[NextAuth] User signed out:', token?.email || session?.user?.email);
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'google') return true;
      try {
        const existingUser = await findUserByEmail(user.email!);
        if (existingUser) {
          await sql`
            UPDATE "User"
            SET "name" = COALESCE(NULLIF("name", ''), ${user.name ?? ''}),
                "emailVerified" = COALESCE("emailVerified", NOW()),
                "isEmailVerified" = TRUE,
                "updatedAt" = NOW()
            WHERE "email" = ${user.email!}
          `;
          user.id = existingUser.id;
        } else {
          const rows = await sql<{ id: string }>`
            INSERT INTO "User" ("email", "name", "password", "role", "emailVerified", "isEmailVerified", "schoolId", "createdAt", "updatedAt")
            VALUES (${user.email!}, ${user.name ?? ''}, NULL, 'SCHOOL_ADMIN', NOW(), TRUE, NULL, NOW(), NOW())
            RETURNING "id"
          `;
          user.id = rows[0].id;
        }
        return true;
      } catch (error) {
        console.error('[NextAuth] Google sign-in error:', error);
        return false;
      }
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
        token.schoolId = (user as { schoolId?: string }).schoolId;
        token.school = (user as { school?: SchoolRow }).school;
      }
      if ((trigger === 'update' || (!token.role && token.sub)) && (token.id || token.sub)) {
        const dbUser = await findUserById((token.id ?? token.sub) as string);
        if (dbUser) {
          token.role = dbUser.role;
          token.schoolId = dbUser.schoolId ?? undefined;
          token.school = schoolFromRow(dbUser);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id ?? token.sub) as string;
        session.user.role = token.role as string;
        session.user.schoolId = token.schoolId as string | undefined;
        session.user.school = token.school as SchoolRow;
      }
      return session;
    },
  },
  pages: { signIn: '/studio/signin', error: '/studio/auth/error' },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: { httpOnly: true, sameSite: 'lax', path: '/', secure: process.env.NODE_ENV === 'production' },
    },
    callbackUrl: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.callback-url' : 'next-auth.callback-url',
      options: { sameSite: 'lax', path: '/', secure: process.env.NODE_ENV === 'production' },
    },
    csrfToken: {
      name: process.env.NODE_ENV === 'production' ? '__Host-next-auth.csrf-token' : 'next-auth.csrf-token',
      options: { httpOnly: true, sameSite: 'lax', path: '/', secure: process.env.NODE_ENV === 'production' },
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

export async function verifyAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) return { success: false, error: 'No authentication token provided' } as const;
    const decoded = (await import('jsonwebtoken')).verify(token, JWT_SECRET) as { userId: string };
    const user = await findUserById(decoded.userId);
    if (!user) return { success: false, error: 'User not found' } as const;
    if (!user.emailVerified && !user.isEmailVerified) return { success: false, error: 'Email not verified' } as const;
    return {
      success: true,
      user: { ...user, schoolId: user.schoolId || '', school: schoolFromRow(user) },
    } as const;
  } catch (error) {
    console.error('Auth verification error:', error);
    return { success: false, error: 'Invalid authentication token' } as const;
  }
}

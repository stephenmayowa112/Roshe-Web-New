import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  schoolId: string;
}

interface AuthResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
    schoolId: string;
  };
  error?: string;
}

export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return { success: false, error: 'No authentication token provided' };
    }

    // Verify JWT token
    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret'
    ) as JWTPayload;

    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        schoolId: true,
        emailVerified: true,
      }
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (!user.emailVerified) {
      return { success: false, error: 'Email not verified' };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId || '',
      }
    };

  } catch (error) {
    console.error('Auth verification error:', error);
    return { success: false, error: 'Invalid authentication token' };
  }
}

export function requireAuth(allowedRoles?: string[]) {
  return async (request: NextRequest) => {
    const authResult = await verifyAuth(request);
    
    if (!authResult.success) {
      return authResult;
    }

    if (allowedRoles && !allowedRoles.includes(authResult.user!.role)) {
      return { success: false, error: 'Insufficient permissions' };
    }

    return authResult;
  };
}

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = require('bcryptjs');
  return await bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(password, hashedPassword);
}
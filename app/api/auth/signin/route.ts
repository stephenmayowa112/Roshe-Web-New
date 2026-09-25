import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { z } from 'zod';
import { JWT_SECRET } from '@/lib/jwt';
import { sql } from '@/lib/neon';

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = signinSchema.parse(body);

    // Find user with school data
    const users = await sql`
      SELECT u.*, row_to_json(s) AS school
      FROM "User" u
      LEFT JOIN "School" s ON s."id" = u."schoolId"
      WHERE u."email" = ${validatedData.email}
      LIMIT 1
    `;
    const user = users[0] as any;

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password (only for users with passwords)
    if (!user.password) {
      return NextResponse.json(
        { error: 'This account uses social login. Please sign in with Google.' },
        { status: 401 }
      );
    }
    
    const isValidPassword = await compare(validatedData.password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if email is verified
    if (!user.emailVerified && !user.isEmailVerified) {
      return NextResponse.json(
        { error: 'Please verify your email before signing in' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        schoolId: user.schoolId 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Create response
    const response = NextResponse.json({
      message: 'Signed in successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        school: user.school,
      }
    });

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;

  } catch (error) {
    console.error('Signin error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
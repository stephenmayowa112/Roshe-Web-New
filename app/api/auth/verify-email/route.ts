import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/neon';

const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = verifyEmailSchema.parse(body);

    // Find user with verification token
    const users = await sql`SELECT * FROM "User" WHERE "verificationToken" = ${token} LIMIT 1`;
    const user = users[0] as any;

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Update user as verified
    await sql`UPDATE "User" SET "emailVerified" = NOW(), "verificationToken" = NULL, "isEmailVerified" = TRUE, "updatedAt" = NOW() WHERE "id" = ${user.id}`;

    return NextResponse.json({
      message: 'Email verified successfully. You can now sign in.',
    });

  } catch (error) {
    console.error('Email verification error:', error);
    
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
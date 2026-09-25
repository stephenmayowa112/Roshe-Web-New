import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { randomBytes } from 'crypto';
import { sql } from '@/lib/neon';

const signupSchema = z.object({
  schoolName: z.string().min(1, 'School name is required'),
  region: z.string().min(1, 'Region is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain uppercase, lowercase, number and special character'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    // Check if user already exists
    const existingUsers = await sql`SELECT "id" FROM "User" WHERE "email" = ${validatedData.email} LIMIT 1`;
    const existingUser = existingUsers[0];

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Check if school already exists
    const schools = await sql`SELECT * FROM "School" WHERE "name" = ${validatedData.schoolName} LIMIT 1`;
    let school = schools[0] as any;

    // Create school if it doesn't exist
    if (!school) {
      const createdSchools = await sql`
        INSERT INTO "School" ("name", "city", "type", "isActive", "createdAt", "updatedAt")
        VALUES (${validatedData.schoolName}, ${validatedData.region}, 'PRIMARY', TRUE, NOW(), NOW())
        RETURNING *
      `;
      school = createdSchools[0];
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Generate email verification token
    const emailVerificationToken = randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const users = await sql`
      INSERT INTO "User" ("email", "password", "name", "role", "schoolId", "emailVerificationToken", "emailVerificationExpires", "isEmailVerified", "createdAt", "updatedAt")
      VALUES (${validatedData.email}, ${hashedPassword}, ${validatedData.email.split('@')[0]}, 'SCHOOL_ADMIN', ${school.id}, ${emailVerificationToken}, ${emailVerificationExpires}, FALSE, NOW(), NOW())
      RETURNING *
    `;
    const user = { ...users[0] as any, school };

    // TODO: Send email verification email
    // For now, we'll auto-verify for demo purposes
    await sql`UPDATE "User" SET "isEmailVerified" = TRUE, "emailVerified" = NOW(), "updatedAt" = NOW() WHERE "id" = ${user.id}`;

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        school: user.school,
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
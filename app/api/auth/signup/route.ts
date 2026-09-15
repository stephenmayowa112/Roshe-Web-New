import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

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
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Check if school already exists
    let school = await prisma.school.findFirst({
      where: { name: validatedData.schoolName }
    });

    // Create school if it doesn't exist
    if (!school) {
      school = await prisma.school.create({
        data: {
          name: validatedData.schoolName,
          city: validatedData.region,
          type: 'PRIMARY', // Default type
          isActive: true,
        }
      });
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Generate email verification token
    const emailVerificationToken = randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.email.split('@')[0], // Use email prefix as default name
        role: 'SCHOOL_ADMIN',
        schoolId: school.id,
        emailVerificationToken,
        emailVerificationExpires,
        isEmailVerified: false,
      },
      include: {
        school: true,
      }
    });

    // TODO: Send email verification email
    // For now, we'll auto-verify for demo purposes
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerified: new Date(),
      }
    });

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
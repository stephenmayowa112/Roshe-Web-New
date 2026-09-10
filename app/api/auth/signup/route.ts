import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  schoolName: z.string().min(2, 'School name must be at least 2 characters'),
  title: z.string().optional(),
  phone: z.string().optional(),
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

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Generate verification token
    const verificationToken = Math.random().toString(36).substring(2, 15) + 
                            Math.random().toString(36).substring(2, 15);

    // Create school and user in transaction
    const result = await prisma.$transaction(async (tx: any) => {
      // Create school
      const school = await tx.school.create({
        data: {
          name: validatedData.schoolName,
          contactEmail: validatedData.email,
        }
      });

      // Create user
      const user = await tx.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          name: validatedData.name,
          title: validatedData.title,
          phone: validatedData.phone,
          role: 'SCHOOL_ADMIN',
          schoolId: school.id,
          verificationToken,
        }
      });

      return { user, school };
    });

    // TODO: Send verification email
    // await sendVerificationEmail(validatedData.email, verificationToken);

    return NextResponse.json({
      message: 'Account created successfully. Please check your email to verify your account.',
      userId: result.user.id,
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    
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
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();

const updateSchoolSchema = z.object({
  name: z.string().min(2, 'School name must be at least 2 characters'),
  address: z.string().optional(),
  city: z.string().optional(),
  postcode: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  type: z.enum(['PRIMARY', 'SECONDARY', 'INDEPENDENT', 'ACADEMY', 'FREE_SCHOOL', 'SPECIAL', 'NURSERY']),
  studentCount: z.number().positive().optional(),
  establishedYear: z.number().min(1800).max(new Date().getFullYear()).optional(),
  headTeacher: z.string().optional(),
  contactEmail: z.string().email().optional(),
});

// GET school profile
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { user } = authResult;

    if (!user.schoolId) {
      return NextResponse.json(
        { error: 'No school associated with this account' },
        { status: 404 }
      );
    }

    const school = await prisma.school.findUnique({
      where: { id: user.schoolId },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            title: true,
            role: true,
            createdAt: true,
          }
        },
        licenses: {
          where: { status: 'ACTIVE' },
          select: {
            id: true,
            type: true,
            status: true,
            startDate: true,
            endDate: true,
          }
        }
      }
    });

    if (!school) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ school });

  } catch (error) {
    console.error('Get school profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update school profile
export async function PUT(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { user } = authResult;

    if (!user.schoolId) {
      return NextResponse.json(
        { error: 'No school associated with this account' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = updateSchoolSchema.parse(body);

    const updatedSchool = await prisma.school.update({
      where: { id: user.schoolId },
      data: validatedData,
    });

    return NextResponse.json({
      message: 'School profile updated successfully',
      school: updatedSchool,
    });

  } catch (error) {
    console.error('Update school profile error:', error);
    
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
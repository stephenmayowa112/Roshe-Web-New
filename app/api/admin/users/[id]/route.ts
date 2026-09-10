import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Helper function to check admin access
async function checkAdminAccess() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  
  if (!token) {
    throw new Error('Unauthorized');
  }

  let decoded;
  try {
    decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as any;
  } catch (error) {
    throw new Error('Invalid token');
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId }
  });

  if (!user || user.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }

  return user;
}

// GET /api/admin/users/[id] - Get specific user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAdminAccess();
    const resolvedParams = await params;

    const user = await prisma.user.findUnique({
      where: { id: resolvedParams.id },
      include: {
        school: true,
        licenses: {
          include: {
            school: {
              select: { name: true }
            }
          }
        },
        payments: {
          include: {
            school: {
              select: { name: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove password from response
    const { password, ...userResponse } = user;

    return NextResponse.json(userResponse);
  } catch (error: any) {
    console.error('Get user error:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAdminAccess();
    const resolvedParams = await params;

    const body = await request.json();
    const { firstName, lastName, email, role, schoolId, password, isEmailVerified } = body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if email is being changed and if it conflicts with another user
    if (email && email !== existingUser.email) {
      const emailConflict = await prisma.user.findUnique({
        where: { email }
      });

      if (emailConflict) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (role) updateData.role = role.toUpperCase();
    if (schoolId !== undefined) updateData.schoolId = schoolId;
    if (isEmailVerified !== undefined) updateData.isEmailVerified = isEmailVerified;
    
    // Hash new password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    // Update user
    const user = await prisma.user.update({
      where: { id: resolvedParams.id },
      data: updateData,
      include: {
        school: {
          select: { name: true, id: true }
        }
      }
    });

    // Remove password from response
    const { password: _, ...userResponse } = user;

    return NextResponse.json(userResponse);
  } catch (error: any) {
    console.error('Update user error:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAdminAccess();
    const resolvedParams = await params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Don't allow deleting other admins (safety measure)
    if (existingUser.role === 'ADMIN') {
      return NextResponse.json(
        { error: 'Cannot delete admin users' },
        { status: 400 }
      );
    }

    // Delete user (this will cascade delete related records due to Prisma schema)
    await prisma.user.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('Delete user error:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    if (error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
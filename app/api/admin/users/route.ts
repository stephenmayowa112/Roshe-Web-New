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

// GET /api/admin/users - List all users with filtering
export async function GET(request: NextRequest) {
  try {
    await checkAdminAccess();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || 'all';
    const status = searchParams.get('status') || 'all';

    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (role !== 'all') {
      where.role = role.toUpperCase();
    }
    
    if (status !== 'all') {
      where.isEmailVerified = status === 'verified';
    }

    // Get users with pagination
    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          school: {
            select: { name: true, id: true }
          },
          _count: {
            select: { licenses: true }
          }
        }
      }),
      prisma.user.count({ where })
    ]);

    return NextResponse.json({
      users,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    });
  } catch (error: any) {
    console.error('Get users error:', error);
    
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

// POST /api/admin/users - Create new user
export async function POST(request: NextRequest) {
  try {
    await checkAdminAccess();

    const body = await request.json();
    const { firstName, lastName, email, role, schoolId, password } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !role || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role.toUpperCase(),
        schoolId: schoolId || null,
        isEmailVerified: true // Admin created users are auto-verified
      },
      include: {
        school: {
          select: { name: true, id: true }
        }
      }
    });

    // Remove password from response
    const { password: _, ...userResponse } = user;

    return NextResponse.json(userResponse, { status: 201 });
  } catch (error: any) {
    console.error('Create user error:', error);
    
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
import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-middleware';
import { prisma } from '@/lib/db';

// GET /api/admin/schools - List all schools with filtering
export const GET = withAdminAuth(async (user, request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || 'all';
  const status = searchParams.get('status') || 'all';

  const skip = (page - 1) * limit;
  
  // Build where clause
  const where: any = {};
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { address: { contains: search, mode: 'insensitive' } },
      { contactEmail: { contains: search, mode: 'insensitive' } }
    ];
  }
  
  if (type !== 'all') {
    where.type = type.toUpperCase();
  }
  
  if (status !== 'all') {
    where.isActive = status === 'active';
  }

  // Get schools with pagination
  const [schools, totalCount] = await Promise.all([
    prisma.school.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { 
            users: true,
            licenses: true 
          }
        },
        licenses: {
          select: {
            type: true,
            status: true,
            expiresAt: true
          }
        }
      }
    }),
    prisma.school.count({ where })
  ]);

  return NextResponse.json({
    schools,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page
  });
});

// POST /api/admin/schools - Create new school
export const POST = withAdminAuth(async (user, request: NextRequest) => {
  const body = await request.json();
  const { 
    name, 
    type, 
    address, 
    contactEmail, 
    contactPhone, 
    website,
    trustName,
    urn
  } = body;

  // Validate required fields
  if (!name || !type || !address || !contactEmail) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Check if school already exists
  const existingSchool = await prisma.school.findFirst({
    where: {
      OR: [
        { name },
        { contactEmail }
      ]
    }
  });

  if (existingSchool) {
    return NextResponse.json(
      { error: 'School with this name or email already exists' },
      { status: 400 }
    );
  }

  // Create school
  const school = await prisma.school.create({
    data: {
      name,
      type: type.toUpperCase(),
      address,
      contactEmail,
      contactPhone,
      website,
      trustName,
      urn,
      isActive: true
    },
    include: {
      _count: {
        select: { 
          users: true,
          licenses: true 
        }
      }
    }
  });

  return NextResponse.json(school, { status: 201 });
});
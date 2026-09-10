import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-middleware';
import { prisma } from '@/lib/db';

// GET /api/admin/payments - List all payments with filtering
export const GET = withAdminAuth(async (user, request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'all';
  const dateRange = searchParams.get('dateRange') || '30';

  const skip = (page - 1) * limit;
  
  // Build where clause
  const where: any = {};
  
  if (search) {
    where.OR = [
      { id: { contains: search, mode: 'insensitive' } },
      { stripePaymentIntentId: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { 
        school: {
          name: { contains: search, mode: 'insensitive' }
        }
      }
    ];
  }
  
  if (status !== 'all') {
    where.status = status;
  }
  
  // Date range filter
  if (dateRange !== 'all') {
    const days = parseInt(dateRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    where.createdAt = { gte: cutoffDate };
  }

  // Get payments with pagination
  const [payments, totalCount] = await Promise.all([
    prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        school: {
          select: { name: true }
        },
        license: {
          select: { type: true }
        }
      }
    }),
    prisma.payment.count({ where })
  ]);

  // Calculate stats
  const stats = await prisma.payment.groupBy({
    by: ['status'],
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
    where: dateRange !== 'all' ? {
      createdAt: {
        gte: new Date(Date.now() - (parseInt(dateRange) * 24 * 60 * 60 * 1000))
      }
    } : undefined
  });

  const statsFormatted = {
    totalRevenue: stats.find(s => s.status === 'SUCCEEDED')?._sum.amount || 0,
    successfulPayments: stats.find(s => s.status === 'SUCCEEDED')?._count.id || 0,
    failedPayments: stats.find(s => s.status === 'FAILED')?._count.id || 0,
    refundedPayments: stats.find(s => s.status === 'REFUNDED')?._count.id || 0,
  };

  return NextResponse.json({
    payments,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    stats: statsFormatted
  });
});

// POST /api/admin/payments - Create payment (for testing purposes)
export const POST = withAdminAuth(async (user, request: NextRequest) => {
  const body = await request.json();
  const { 
    schoolId, 
    licenseId, 
    amount, 
    currency = 'GBP',
    status = 'PENDING',
    description,
    paymentMethod,
    stripePaymentIntentId 
  } = body;

  // Validate required fields
  if (!schoolId || !amount) {
    return NextResponse.json(
      { error: 'Missing required fields: schoolId, amount' },
      { status: 400 }
    );
  }

  // Create payment
  const payment = await prisma.payment.create({
    data: {
      schoolId,
      licenseId,
      amount: Math.round(amount * 100), // Convert to pence
      currency,
      status,
      description,
      paymentMethod,
      stripePaymentIntentId,
      paidAt: status === 'SUCCEEDED' ? new Date() : null,
    },
    include: {
      school: {
        select: { name: true }
      },
      license: {
        select: { type: true }
      }
    }
  });

  return NextResponse.json(payment, { status: 201 });
});
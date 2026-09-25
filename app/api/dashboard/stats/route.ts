import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the current user from database
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { 
        id: true, 
        schoolId: true, 
        role: true,
        email: true,
        name: true
      },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const schoolId = dbUser.schoolId;

    // If user has no school yet, return empty state
    if (!schoolId) {
      return NextResponse.json({
        school: {
          name: 'Your School',
          type: 'PRIMARY',
          studentCount: 0,
          memberSince: new Date(),
        },
        licenses: {
          active: 0,
          details: [],
        },
        payments: {
          totalSpent: 0,
          recent: [],
        },
        users: { count: 1 }, // Just the user themselves
        isEmpty: true, // Flag to indicate new user with no data
      });
    }

    // Run all queries in parallel for users with schools
    const [school, activeLicenses, paymentAgg, recentPayments, userCount] =
      await Promise.all([
        // School info
        prisma.school.findUnique({
          where: { id: schoolId },
          select: { id: true, name: true, type: true, studentCount: true, createdAt: true },
        }),

        // Active licenses for THIS school only
        prisma.license.findMany({
          where: { schoolId, status: 'ACTIVE' },
          select: {
            id: true,
            type: true,
            description: true,
            startDate: true,
            endDate: true,
            amount: true,
            currency: true,
          },
        }),

        // Sum of succeeded payments for THIS school only
        prisma.payment.aggregate({
          where: { schoolId, status: 'SUCCEEDED' },
          _sum: { amount: true },
        }),

        // 5 most recent succeeded payments for THIS school only
        prisma.payment.findMany({
          where: { schoolId, status: 'SUCCEEDED' },
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            description: true,
            createdAt: true,
          },
        }),

        // Team members in THIS school only
        prisma.user.count({ where: { schoolId } }),
      ]);

    return NextResponse.json({
      school: {
        name: school?.name ?? 'Your School',
        type: school?.type ?? 'PRIMARY',
        studentCount: school?.studentCount ?? 0,
        memberSince: school?.createdAt ?? new Date(),
      },
      licenses: {
        active: activeLicenses.length,
        details: activeLicenses,
      },
      payments: {
        totalSpent: paymentAgg._sum.amount ?? 0,
        recent: recentPayments,
      },
      users: { count: userCount },
      isEmpty: false,
    });
  } catch (error) {
    console.error('[Dashboard stats] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

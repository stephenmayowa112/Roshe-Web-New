import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { user } = authResult;

    // Get school statistics
    const [
      school,
      activeLicenses,
      totalPayments,
      recentPayments,
      userCount
    ] = await Promise.all([
      // School information
      user?.schoolId ? prisma.school.findUnique({
        where: { id: user.schoolId },
        select: {
          id: true,
          name: true,
          type: true,
          studentCount: true,
          createdAt: true,
        }
      }) : null,
      
      // Active licenses
      user?.schoolId ? prisma.license.findMany({
        where: {
          schoolId: user.schoolId,
          status: 'ACTIVE',
        },
        select: {
          id: true,
          type: true,
          startDate: true,
          endDate: true,
          amount: true,
        }
      }) : [],
      
      // Total payment amount
      user?.schoolId ? prisma.payment.aggregate({
        where: {
          license: {
            schoolId: user.schoolId,
          },
          status: 'COMPLETED',
        },
        _sum: {
          amount: true,
        },
      }) : { _sum: { amount: null } },
      
      // Recent payments
      user?.schoolId ? prisma.payment.findMany({
        where: {
          license: {
            schoolId: user.schoolId,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
        select: {
          id: true,
          amount: true,
          status: true,
          createdAt: true,
          description: true,
        },
      }) : [],
      
      // User count
      user?.schoolId ? prisma.user.count({
        where: {
          schoolId: user.schoolId,
        }
      }) : 0
    ]);

    const stats = {
      school: {
        name: school?.name || 'Unknown School',
        type: school?.type || 'PRIMARY',
        studentCount: school?.studentCount || 0,
        memberSince: school?.createdAt || new Date(),
      },
      licenses: {
        active: activeLicenses.length,
        details: activeLicenses,
      },
      payments: {
        total: totalPayments._sum.amount || 0,
        recent: recentPayments,
      },
      users: {
        count: userCount,
      },
      overview: {
        totalSpent: totalPayments._sum.amount || 0,
        activeLicenses: activeLicenses.length,
        teamMembers: userCount,
        lastActivity: new Date(),
      }
    };

    return NextResponse.json({ stats });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
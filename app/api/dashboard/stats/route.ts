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

    // Always look up the DB user by email so we have the schoolId
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, schoolId: true, role: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const schoolId = dbUser.schoolId;

    // Run all queries in parallel
    const [school, activeLicenses, paymentAgg, recentPayments, userCount] =
      await Promise.all([
        // School info
        schoolId
          ? prisma.school.findUnique({
              where: { id: schoolId },
              select: { id: true, name: true, type: true, studentCount: true, createdAt: true },
            })
          : null,

        // Active licenses for this school
        schoolId
          ? prisma.license.findMany({
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
            })
          : [],

        // Sum of succeeded payments
        schoolId
          ? prisma.payment.aggregate({
              where: { schoolId, status: 'SUCCEEDED' },
              _sum: { amount: true },
            })
          : { _sum: { amount: 0 } },

        // 5 most recent succeeded payments
        schoolId
          ? prisma.payment.findMany({
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
            })
          : [],

        // Team members in this school
        schoolId ? prisma.user.count({ where: { schoolId } }) : 0,
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
    });
  } catch (error) {
    console.error('[Dashboard stats] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

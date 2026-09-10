import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as any;
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get dashboard stats
    const [
      totalUsers,
      totalSchools,
      activeLicenses,
      totalPayments,
      recentUsers,
      recentSchools,
      recentPayments
    ] = await Promise.all([
      prisma.user.count(),
      prisma.school.count(),
      prisma.license.count({
        where: {
          status: 'ACTIVE'
        }
      }),
      prisma.payment.count({
        where: {
          status: 'SUCCEEDED'
        }
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          createdAt: true
        }
      }),
      prisma.school.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { users: true }
          }
        }
      }),
      prisma.payment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          school: {
            select: {
              name: true
            }
          }
        }
      })
    ]);

    // Calculate revenue
    const totalRevenue = await prisma.payment.aggregate({
      where: {
        status: 'SUCCEEDED'
      },
      _sum: {
        amount: true
      }
    });

    // Calculate growth percentages (mock data for now)
    const stats = {
      totalUsers,
      totalSchools,
      activeLicenses,
      totalRevenue: totalRevenue._sum.amount || 0,
      userGrowth: 12.5, // This would be calculated based on previous period
      schoolGrowth: 8.3,
      licenseGrowth: 15.2,
      revenueGrowth: 22.1,
      recentActivity: {
        users: recentUsers,
        schools: recentSchools,
        payments: recentPayments
      }
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
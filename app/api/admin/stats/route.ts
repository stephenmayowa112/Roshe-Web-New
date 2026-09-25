import { NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-middleware';
import { sql } from '@/lib/neon';

export const GET = withAdminAuth(async () => {
  try {
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
      sql`SELECT COUNT(*)::int AS count FROM "User"`,
      sql`SELECT COUNT(*)::int AS count FROM "School"`,
      sql`SELECT COUNT(*)::int AS count FROM "License" WHERE "status" = 'ACTIVE'`,
      sql`SELECT COUNT(*)::int AS count FROM "Payment" WHERE "status" = 'SUCCEEDED'`,
      sql`SELECT "id", "firstName", "lastName", "email", "role", "createdAt" FROM "User" ORDER BY "createdAt" DESC LIMIT 5`,
      sql`SELECT s.*, (SELECT COUNT(*)::int FROM "User" u WHERE u."schoolId" = s."id") AS "userCount" FROM "School" s ORDER BY s."createdAt" DESC LIMIT 5`,
      sql`SELECT p.*, s."name" AS "schoolName" FROM "Payment" p LEFT JOIN "School" s ON s."id" = p."schoolId" ORDER BY p."createdAt" DESC LIMIT 5`
    ]);

    // Calculate revenue
    const revenueRows = await sql`SELECT COALESCE(SUM("amount"), 0)::int AS amount FROM "Payment" WHERE "status" = 'SUCCEEDED'`;

    // Calculate growth percentages (mock data for now)
    const stats = {
      totalUsers: (totalUsers[0] as any).count,
      totalSchools: (totalSchools[0] as any).count,
      activeLicenses: (activeLicenses[0] as any).count,
      totalRevenue: (revenueRows[0] as any).amount || 0,
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
});
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sql } from '@/lib/neon';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the current user from database
    const users = await sql`
      SELECT "id", "schoolId", "role", "email", "name"
      FROM "User"
      WHERE "email" = ${session.user.email}
      LIMIT 1
    `;
    const dbUser = users[0] as { id: string; schoolId: string | null } | undefined;

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
    const [schools, activeLicenses, paymentTotals, recentPayments, userCounts] =
      await Promise.all([
        sql`
          SELECT "id", "name", "type", "studentCount", "createdAt"
          FROM "School"
          WHERE "id" = ${schoolId}
          LIMIT 1
        `,
        sql`
          SELECT "id", "type", "description", "startDate", "endDate", "amount", "currency"
          FROM "License"
          WHERE "schoolId" = ${schoolId} AND "status" = 'ACTIVE'
        `,
        sql`
          SELECT COALESCE(SUM("amount"), 0)::int AS "totalSpent"
          FROM "Payment"
          WHERE "schoolId" = ${schoolId} AND "status" = 'SUCCEEDED'
        `,
        sql`
          SELECT "id", "amount", "currency", "description", "createdAt"
          FROM "Payment"
          WHERE "schoolId" = ${schoolId} AND "status" = 'SUCCEEDED'
          ORDER BY "createdAt" DESC
          LIMIT 5
        `,
        sql`
          SELECT COUNT(*)::int AS "count"
          FROM "User"
          WHERE "schoolId" = ${schoolId}
        `,
      ]);

    const school = schools[0] as {
      name: string;
      type: string;
      studentCount: number | null;
      createdAt: string | Date;
    } | undefined;
    const paymentTotal = paymentTotals[0] as { totalSpent: number };
    const userCount = (userCounts[0] as { count: number }).count;

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
        totalSpent: paymentTotal.totalSpent ?? 0,
        recent: recentPayments,
      },
      users: { count: userCount },
      isEmpty: false,
    });
  } catch (error) {
    console.error('[Dashboard stats] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

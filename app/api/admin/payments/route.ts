import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-middleware';
import { sql } from '@/lib/neon';

export const GET = withAdminAuth(async (_user, request: NextRequest) => {
  const params = new URL(request.url).searchParams;
  const page = Math.max(1, Number(params.get('page') || 1));
  const limit = Math.max(1, Number(params.get('limit') || 10));
  const search = params.get('search') || '';
  const status = params.get('status') || 'all';
  const dateRange = params.get('dateRange') || '30';
  const filters: string[] = [];
  const values: unknown[] = [];
  if (search) { values.push(`%${search}%`); filters.push(`(p."id" ILIKE $${values.length} OR p."stripePaymentIntentId" ILIKE $${values.length} OR p."description" ILIKE $${values.length} OR s."name" ILIKE $${values.length})`); }
  if (status !== 'all') { values.push(status); filters.push(`p."status" = $${values.length}`); }
  if (dateRange !== 'all') { values.push(new Date(Date.now() - Number(dateRange) * 86400000)); filters.push(`p."createdAt" >= $${values.length}`); }
  const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
  const countRows = await sql.query(`SELECT COUNT(*)::int AS count FROM "Payment" p LEFT JOIN "School" s ON s."id" = p."schoolId" ${where}`, values);
  const rows = await sql.query(`SELECT p.*, s."name" AS "schoolName", l."type" AS "licenseType" FROM "Payment" p LEFT JOIN "School" s ON s."id" = p."schoolId" LEFT JOIN "License" l ON l."id" = p."licenseId" ${where} ORDER BY p."createdAt" DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`, [...values, limit, (page - 1) * limit]);
  const statRows = await sql.query(`SELECT "status", COALESCE(SUM("amount"), 0)::int AS amount, COUNT(*)::int AS count FROM "Payment" ${dateRange !== 'all' ? `WHERE "createdAt" >= $1` : ''} GROUP BY "status"`, dateRange !== 'all' ? [new Date(Date.now() - Number(dateRange) * 86400000)] : []);
  const stat = (name: string) => statRows.find((row: any) => row.status === name) as any;
  const totalCount = Number((countRows[0] as any).count);
  return NextResponse.json({ payments: rows, totalCount, totalPages: Math.ceil(totalCount / limit), currentPage: page, stats: { totalRevenue: stat('SUCCEEDED')?.amount || 0, successfulPayments: stat('SUCCEEDED')?.count || 0, failedPayments: stat('FAILED')?.count || 0, refundedPayments: stat('REFUNDED')?.count || 0 } });
});

export const POST = withAdminAuth(async (_user, request: NextRequest) => {
  const { schoolId, licenseId, amount, currency = 'GBP', status = 'PENDING', description, paymentMethod, stripePaymentIntentId } = await request.json();
  if (!schoolId || !amount) return NextResponse.json({ error: 'Missing required fields: schoolId, amount' }, { status: 400 });
  const rows = await sql`
    INSERT INTO "Payment" ("schoolId", "licenseId", "amount", "currency", "status", "description", "paymentMethod", "stripePaymentIntentId", "paidAt", "createdAt", "updatedAt")
    VALUES (${schoolId}, ${licenseId ?? null}, ${Math.round(amount * 100)}, ${currency}, ${status}, ${description ?? null}, ${paymentMethod ?? null}, ${stripePaymentIntentId ?? null}, ${status === 'SUCCEEDED' ? new Date() : null}, NOW(), NOW())
    RETURNING *
  `;
  return NextResponse.json(rows[0], { status: 201 });
});

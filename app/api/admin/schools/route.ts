import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-middleware';
import { sql } from '@/lib/neon';

export const GET = withAdminAuth(async (_user, request: NextRequest) => {
  const params = new URL(request.url).searchParams;
  const page = Math.max(1, Number(params.get('page') || 1));
  const limit = Math.max(1, Number(params.get('limit') || 10));
  const search = params.get('search') || '';
  const type = params.get('type') || 'all';
  const status = params.get('status') || 'all';
  const filters: string[] = [];
  const values: unknown[] = [];
  if (search) { values.push(`%${search}%`); filters.push(`(s."name" ILIKE $${values.length} OR s."address" ILIKE $${values.length} OR s."contactEmail" ILIKE $${values.length})`); }
  if (type !== 'all') { values.push(type.toUpperCase()); filters.push(`s."type" = $${values.length}`); }
  if (status !== 'all') { values.push(status === 'active'); filters.push(`s."isActive" = $${values.length}`); }
  const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
  const countRows = await sql.query(`SELECT COUNT(*)::int AS count FROM "School" s ${where}`, values);
  const rows = await sql.query(`SELECT s.*, (SELECT COUNT(*)::int FROM "User" u WHERE u."schoolId" = s."id") AS "userCount", (SELECT COUNT(*)::int FROM "License" l WHERE l."schoolId" = s."id") AS "licenseCount" FROM "School" s ${where} ORDER BY s."createdAt" DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`, [...values, limit, (page - 1) * limit]);
  const totalCount = Number((countRows[0] as any).count);
  return NextResponse.json({ schools: rows, totalCount, totalPages: Math.ceil(totalCount / limit), currentPage: page });
});

export const POST = withAdminAuth(async (_user, request: NextRequest) => {
  const body = await request.json();
  const { name, type, address, contactEmail, contactPhone, website, trustName, urn } = body;
  if (!name || !type || !address || !contactEmail) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const existing = await sql`SELECT "id" FROM "School" WHERE "name" = ${name} OR "contactEmail" = ${contactEmail} LIMIT 1`;
  if (existing.length) return NextResponse.json({ error: 'School with this name or email already exists' }, { status: 400 });
  const rows = await sql`
    INSERT INTO "School" ("name", "type", "address", "contactEmail", "contactPhone", "website", "trustName", "urn", "isActive", "createdAt", "updatedAt")
    VALUES (${name}, ${type.toUpperCase()}, ${address}, ${contactEmail}, ${contactPhone ?? null}, ${website ?? null}, ${trustName ?? null}, ${urn ?? null}, TRUE, NOW(), NOW())
    RETURNING *
  `;
  return NextResponse.json(rows[0], { status: 201 });
});

import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { requireAdmin } from '@/lib/admin-middleware';
import { sql } from '@/lib/neon';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const params = new URL(request.url).searchParams;
    const page = Math.max(1, Number(params.get('page') || 1));
    const limit = Math.max(1, Number(params.get('limit') || 10));
    const search = params.get('search') || '';
    const role = params.get('role') || 'all';
    const status = params.get('status') || 'all';
    const filters: string[] = [];
    const values: unknown[] = [];
    if (search) { values.push(`%${search}%`); filters.push(`(u."firstName" ILIKE $${values.length} OR u."lastName" ILIKE $${values.length} OR u."email" ILIKE $${values.length})`); }
    if (role !== 'all') { values.push(role.toUpperCase()); filters.push(`u."role" = $${values.length}`); }
    if (status !== 'all') { values.push(status === 'verified'); filters.push(`u."isEmailVerified" = $${values.length}`); }
    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const countRows = await sql.query(`SELECT COUNT(*)::int AS count FROM "User" u ${where}`, values);
    const offset = (page - 1) * limit;
    const rows = await sql.query(`
      SELECT u.*, jsonb_build_object('name', s."name", 'id', s."id") AS school,
             (SELECT COUNT(*)::int FROM "License" l WHERE l."userId" = u."id") AS "licenseCount"
      FROM "User" u LEFT JOIN "School" s ON s."id" = u."schoolId"
      ${where} ORDER BY u."createdAt" DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `, [...values, limit, offset]);
    const totalCount = Number((countRows[0] as any).count);
    return NextResponse.json({ users: rows, totalCount, totalPages: Math.ceil(totalCount / limit), currentPage: page });
  } catch (error: any) {
    console.error('Get users error:', error);
    return NextResponse.json({ error: error.message === 'Unauthorized' ? 'Unauthorized' : error.message === 'Forbidden' ? 'Forbidden' : 'Internal server error' }, { status: error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden' ? 403 : 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const { firstName, lastName, email, role, schoolId, password } = await request.json();
    if (!firstName || !lastName || !email || !role || !password) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    const existing = await sql`SELECT "id" FROM "User" WHERE "email" = ${email} LIMIT 1`;
    if (existing.length) return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    const passwordHash = await hash(password, 12);
    const users = await sql`
      INSERT INTO "User" ("firstName", "lastName", "email", "password", "role", "schoolId", "isEmailVerified", "createdAt", "updatedAt")
      VALUES (${firstName}, ${lastName}, ${email}, ${passwordHash}, ${role.toUpperCase()}, ${schoolId || null}, TRUE, NOW(), NOW())
      RETURNING "id", "firstName", "lastName", "email", "role", "schoolId", "isEmailVerified", "createdAt", "updatedAt"
    `;
    const user = users[0] as any;
    const schools = user.schoolId ? await sql`SELECT "id", "name" FROM "School" WHERE "id" = ${user.schoolId}` : [];
    return NextResponse.json({ ...user, school: schools[0] ?? null }, { status: 201 });
  } catch (error: any) {
    console.error('Create user error:', error);
    return NextResponse.json({ error: error.message === 'Unauthorized' ? 'Unauthorized' : error.message === 'Forbidden' ? 'Forbidden' : 'Internal server error' }, { status: error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden' ? 403 : 500 });
  }
}

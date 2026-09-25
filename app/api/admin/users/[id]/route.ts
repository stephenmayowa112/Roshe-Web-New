import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { requireAdmin } from '@/lib/admin-middleware';
import { sql } from '@/lib/neon';

async function getUser(id: string) {
  const users = await sql`SELECT u.*, row_to_json(s) AS school FROM "User" u LEFT JOIN "School" s ON s."id" = u."schoolId" WHERE u."id" = ${id} LIMIT 1`;
  return users[0] as any;
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const user = await getUser((await params).id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const [licenses, payments] = await Promise.all([
      sql`SELECT l.*, s."name" AS "schoolName" FROM "License" l LEFT JOIN "School" s ON s."id" = l."schoolId" WHERE l."userId" = ${user.id}`,
      sql`SELECT p.*, s."name" AS "schoolName" FROM "Payment" p LEFT JOIN "School" s ON s."id" = p."schoolId" WHERE p."userId" = ${user.id} ORDER BY p."createdAt" DESC`,
    ]);
    const { password: _password, ...response } = user;
    return NextResponse.json({ ...response, licenses, payments });
  } catch (error: any) {
    return NextResponse.json({ error: error.message === 'Unauthorized' ? 'Unauthorized' : error.message === 'Forbidden' ? 'Forbidden' : 'Internal server error' }, { status: error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden' ? 403 : 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const id = (await params).id;
    const body = await request.json();
    const existing = await getUser(id);
    if (!existing) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const updates: string[] = [];
    const values: unknown[] = [];
    const add = (column: string, value: unknown) => { values.push(value); updates.push(`"${column}" = $${values.length}`); };
    if (body.firstName) add('firstName', body.firstName);
    if (body.lastName) add('lastName', body.lastName);
    if (body.email) add('email', body.email);
    if (body.role) add('role', body.role.toUpperCase());
    if (body.schoolId !== undefined) add('schoolId', body.schoolId);
    if (body.isEmailVerified !== undefined) add('isEmailVerified', body.isEmailVerified);
    if (body.password) add('password', await hash(body.password, 12));
    if (!updates.length) return NextResponse.json({ error: 'No changes supplied' }, { status: 400 });
    values.push(id);
    const rows = await sql.query(`UPDATE "User" SET ${updates.join(', ')}, "updatedAt" = NOW() WHERE "id" = $${values.length} RETURNING "id", "firstName", "lastName", "email", "role", "schoolId", "isEmailVerified", "createdAt", "updatedAt"`, values);
    return NextResponse.json(rows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message === 'Unauthorized' ? 'Unauthorized' : error.message === 'Forbidden' ? 'Forbidden' : 'Internal server error' }, { status: error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden' ? 403 : 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const id = (await params).id;
    const user = await getUser(id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    if (user.role === 'ADMIN') return NextResponse.json({ error: 'Cannot delete admin users' }, { status: 400 });
    await sql`DELETE FROM "User" WHERE "id" = ${id}`;
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message === 'Unauthorized' ? 'Unauthorized' : error.message === 'Forbidden' ? 'Forbidden' : 'Internal server error' }, { status: error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden' ? 403 : 500 });
  }
}

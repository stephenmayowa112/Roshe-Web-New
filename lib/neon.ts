import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL or POSTGRES_URL is not configured');
}

export const sql = neon(databaseUrl);

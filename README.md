# Roshe Studio Website

Next.js platform for educational film licensing, school management, resources, and Stripe payments.

## Stack

- Next.js App Router and TypeScript
- Neon serverless PostgreSQL
- NextAuth.js with JWT sessions and Google OAuth
- Stripe
- Tailwind CSS
- Vercel

## Local setup

```bash
npm install
npm run dev
```

Set `DATABASE_URL` or `POSTGRES_URL` to the Neon connection string in `.env.local`, along with the authentication, Google, Stripe, and application variables from `.env.example`.

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Main routes

- `/studio/signin` and `/studio/signup` for authentication
- `/studio/dashboard` for school users
- `/admin` for administrators
- `/licensing` for license purchases

Database reads and writes use parameterized SQL through `@neondatabase/serverless`. Neon schema management and data administration should be performed through the Neon or Vercel dashboard.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment details.

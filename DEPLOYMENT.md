# Roshe Studio Website - Deployment Guide

## ✅ Database Setup Complete

Your Neon Postgres database is configured and seeded with initial data:
- **Database**: Neon Postgres (Production-Ready)
- **Project ID**: polished-block-52232395
- **Region**: EU Central (Frankfurt)
- **Connection**: Pooled connection with auto-wake on request
- **Status**: ✅ Schema pushed, ✅ Data seeded

---

## 🚀 Deploy to Vercel

### Step 1: Connect Your Repository to Vercel

1. Go to https://vercel.com/new
2. Import your Git repository (GitHub, GitLab, or Bitbucket)
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### Step 2: Add Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add the following:

#### Database
```
DATABASE_URL=postgresql://neondb_owner:npg_dAoEkKNMWH18@ep-raspy-firefly-b211dhj6-pooler.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require
```
**Apply to**: Production, Preview, Development

#### Authentication
```
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://your-domain.vercel.app
JWT_SECRET=generate-with-openssl-rand-base64-32
```
**Apply to**: Production, Preview

**Generate secrets:**
```bash
openssl rand -base64 32
```

#### Google OAuth
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```
**Apply to**: Production, Preview, Development

⚠️ **IMPORTANT**: Update Google OAuth authorized redirect URIs:
1. Go to https://console.cloud.google.com/apis/credentials
2. Edit your OAuth 2.0 Client
3. Add authorized redirect URIs:
   - `https://your-domain.vercel.app/api/auth/callback/google`
   - `https://your-preview-domain.vercel.app/api/auth/callback/google` (for previews)

#### Stripe
```
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
STRIPE_SINGLE_SCHOOL_PRICE_ID=your-single-school-price-id
STRIPE_MULTI_SCHOOL_PRICE_ID=your-multi-school-price-id
```
**Apply to**: Production, Preview, Development

⚠️ **For Production**: Replace with live Stripe keys:
- Get them from https://dashboard.stripe.com/apikeys
- Update `STRIPE_SECRET_KEY` with `sk_live_...`
- Update `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` with `pk_live_...`

#### App Configuration
```
SUPPORT_EMAIL=support@roshestudios.co.uk
NODE_ENV=production
```
**Apply to**: Production

### Step 3: Configure Stripe Webhook (After First Deploy)

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.vercel.app/api/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the "Signing secret" (starts with `whsec_`)
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
7. Redeploy your app (Vercel Dashboard → Deployments → Redeploy)

### Step 4: Deploy

1. Click **"Deploy"** in Vercel
2. Wait for build to complete (~2-3 minutes)
3. Visit your deployment URL
4. Test the following:
   - ✅ Homepage loads
   - ✅ Google OAuth login works
   - ✅ Dashboard loads (after login)
   - ✅ Stripe checkout works (test mode)

---

## 🔧 Local Development

Your local environment is already set up! To start developing:

```bash
npm run dev
```

**Note**: If you encounter DNS issues connecting to Neon, run:
```bash
ipconfig /flushdns
Clear-DnsClientCache
```

---

## 📊 Database Management

### View Database
- Neon Console: https://console.neon.tech
- Project: polished-block-52232395

### Run Migrations
```bash
npx prisma db push
```

### Seed Database
```bash
npx tsx scripts/seed-dashboard-data.ts
```

### View Database in Prisma Studio
```bash
npx prisma studio
```

---

## 🔒 Security Checklist

Before going live:

- [ ] Generate secure secrets for `NEXTAUTH_SECRET` and `JWT_SECRET`
- [ ] Update Google OAuth redirect URIs with production domain
- [ ] Switch to Stripe live keys for production
- [ ] Configure Stripe webhook with production endpoint
- [ ] Set `NEXTAUTH_URL` to production domain
- [ ] Review and update `SUPPORT_EMAIL` if needed
- [ ] Ensure `.env` and `.env.local` are in `.gitignore`
- [ ] Never commit secrets to Git

---

## 🐛 Troubleshooting

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `DATABASE_URL` is correct

### Database connection fails
- Verify Neon database is active (check Neon console)
- Check `DATABASE_URL` has correct credentials
- Ensure Neon project is not paused

### OAuth login doesn't work
- Verify redirect URIs in Google Console match your domain
- Check `NEXTAUTH_URL` matches your deployed URL
- Ensure `NEXTAUTH_SECRET` is set

### Stripe webhook fails
- Verify webhook endpoint URL is correct
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Review webhook logs in Stripe dashboard

---

## 📝 Next Steps

1. Deploy to Vercel
2. Configure custom domain (optional)
3. Set up Stripe webhook
4. Test complete user flow
5. Switch to production Stripe keys when ready
6. Monitor application with Vercel Analytics

**Need help?** Contact: support@roshestudios.co.uk

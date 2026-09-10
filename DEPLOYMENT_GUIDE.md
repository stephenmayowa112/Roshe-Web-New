# 🚀 **Roshe Studios Deployment Guide**

## 🌟 **Recommended: Vercel + Neon Database**

### **Phase 1: Database Setup (Neon)**

#### **1. Create Neon Database**
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project: "Roshe Studios"
3. Select region closest to your users (London/EU)
4. Copy the connection string

#### **2. Update Database Configuration**
```typescript
// Update prisma/schema.prisma
datasource db {
  provider = "postgresql"  // Changed from sqlite
  url      = env("DATABASE_URL")
}
```

#### **3. Create Production Environment File**
```bash
# .env.production
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
JWT_SECRET="your-production-jwt-secret-here-make-it-64-characters-long"
NEXTAUTH_SECRET="your-nextauth-secret-different-from-jwt"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Stripe Production Keys
STRIPE_SECRET_KEY="sk_live_your_live_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_your_live_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

### **Phase 2: Vercel Deployment**

#### **1. Prepare for Deployment**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login
```

#### **2. Configure Deployment**
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "functions": {
    "app/api/**": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### **3. Deploy to Vercel**
```bash
# Initial deployment
vercel

# Production deployment
vercel --prod
```

#### **4. Configure Environment Variables**
In Vercel dashboard, add:
- `DATABASE_URL`
- `JWT_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### **Phase 3: Database Migration**

#### **1. Run Production Migrations**
```bash
# Generate Prisma client for PostgreSQL
npx prisma generate

# Push schema to production database
npx prisma db push --accept-data-loss

# Seed production database
npx prisma db seed
```

#### **2. Create Production Seed Script**
```typescript
// lib/production-seed.ts
export async function seedProduction() {
  // Create initial admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@roshestudios.co.uk',
      password: await bcrypt.hash('SecureAdminPassword123!', 12),
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
      isEmailVerified: true,
    }
  });

  console.log('Production admin created:', adminUser.email);
}
```

### **Alternative: Railway (Simpler Option)**

#### **1. Deploy to Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### **2. Railway automatically provides:**
- ✅ PostgreSQL database
- ✅ Environment variables
- ✅ SSL certificates
- ✅ Custom domain support

### **Alternative: Supabase (Backend-as-a-Service)**

#### **1. Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Create new project: "Roshe Studios"
3. Get database URL from settings

#### **2. Update Prisma for Supabase**
```typescript
// Add to prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

#### **3. Deploy Frontend to Vercel**
- Database: Supabase
- Frontend: Vercel
- Authentication: Supabase Auth (optional)

---

## 🔧 **Production Optimizations**

### **1. Database Performance**
```typescript
// lib/db.ts - Production database configuration
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### **2. Environment-Specific Configurations**
```typescript
// lib/config.ts
export const config = {
  database: {
    url: process.env.DATABASE_URL!,
    maxConnections: process.env.NODE_ENV === 'production' ? 10 : 5,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET!,
    tokenExpiry: '7d',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY!,
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  },
  app: {
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    environment: process.env.NODE_ENV || 'development',
  },
};
```

### **3. Production Scripts**
Add to `package.json`:
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "deploy": "vercel --prod",
    "db:migrate": "prisma db push",
    "db:seed:prod": "tsx lib/production-seed.ts",
    "db:studio": "prisma studio"
  }
}
```

---

## 💰 **Cost Breakdown**

### **Vercel + Neon (Recommended)**
- **Vercel Pro**: $20/month
- **Neon Scale**: $19/month  
- **Total**: ~$39/month for production

### **Railway**
- **Starter**: $5/month
- **Database**: $5/month
- **Total**: ~$10/month

### **Supabase + Vercel**
- **Supabase Pro**: $25/month
- **Vercel Pro**: $20/month
- **Total**: ~$45/month

### **Free Tier Options**
- **Vercel Hobby**: Free (with limits)
- **Neon Free**: Free (3GB database)
- **Supabase Free**: Free (500MB database)
- **Railway**: $5/month minimum

---

## 🚀 **Quick Start Commands**

### **For Vercel + Neon:**
```bash
# 1. Update Prisma schema for PostgreSQL
# 2. Create Neon database and get connection string
# 3. Deploy to Vercel
vercel
# 4. Add environment variables in Vercel dashboard
# 5. Run database migrations
npx prisma db push
```

### **For Railway:**
```bash
# 1. Install Railway CLI
npm install -g @railway/cli
# 2. Deploy everything
railway login
railway init
railway up
```

---

## ✅ **Production Checklist**

- [ ] Database migrated to PostgreSQL
- [ ] Environment variables configured
- [ ] SSL certificates enabled
- [ ] Domain configured
- [ ] Admin user created
- [ ] Stripe webhooks configured
- [ ] Email service configured
- [ ] Monitoring setup
- [ ] Backups configured
- [ ] Security headers added

---

**Choose your hosting option and I'll help you set it up step by step!**
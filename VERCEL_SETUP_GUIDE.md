# 🚀 **Vercel-Only Hosting Setup**

Complete guide to host everything (frontend + database) on Vercel.

## ✅ **Prerequisites**
- Your project is already deployed on Vercel with domain configured
- You have access to the Vercel Dashboard

## **Step 1: Add Vercel Postgres Database** (2 minutes)

### **1.1 Create Database**
1. Go to **Vercel Dashboard** → Your Project
2. Click **"Storage"** tab → **"Create Database"**
3. Select **"Postgres"** → **"Continue"**
4. Configure:
   - **Name**: `roshe-studios-db`
   - **Region**: Select closest to your users (e.g., Washington D.C. for global, or Frankfurt for Europe)
5. Click **"Create"** (takes ~30 seconds)

### **1.2 Environment Variables Added Automatically**
Vercel automatically adds these environment variables to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NO_SSL`
- `POSTGRES_URL_NON_POOLING`

## **Step 2: Add Additional Environment Variables** (1 minute)

In **Vercel Dashboard** → Project → **Settings** → **Environment Variables**, add:

```bash
# Authentication (generate secure random strings)
JWT_SECRET="your-super-secure-64-character-jwt-secret-key-here"
NEXTAUTH_SECRET="different-64-character-string-for-nextauth-security"
NEXTAUTH_URL="https://your-actual-domain.com"

# App Configuration
NODE_ENV="production"
APP_URL="https://your-actual-domain.com"
SUPPORT_EMAIL="support@roshestudios.co.uk"
```

**Generate secure secrets:**
```bash
# Run this locally to generate secure random strings
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## **Step 3: Deploy Database Schema** (2 minutes)

Run these commands **locally** (make sure you have environment variables):

```bash
# Deploy database schema to Vercel Postgres
npm run vercel:setup
```

**This will:**
- Push your Prisma schema to Vercel Postgres
- Create admin user and sample data
- Show database statistics

**Expected output:**
```
🚀 Setting up Vercel Postgres for Roshe Studios...
✅ Database connected successfully!
👤 Creating admin user...
✅ Admin user created: admin@roshestudios.co.uk
🎉 Setup completed successfully!
```

## **Step 4: Verify Deployment** (1 minute)

Your project will automatically redeploy when database is added. Check:

1. **Visit**: `https://your-domain.com/admin`
2. **Login**:
   - Email: `admin@roshestudios.co.uk`
   - Password: `RosheAdmin2024!SecurePass`
3. **Verify**: Dashboard shows live data from Vercel Postgres

## **✅ Complete Setup Checklist**

- [ ] Vercel Postgres database created
- [ ] Environment variables configured
- [ ] Database schema deployed (`npm run vercel:setup`)
- [ ] Admin panel accessible at `/admin`
- [ ] Can login with admin credentials
- [ ] Dashboard shows live data

## **🔧 Local Development**

For local development, you can:

### **Option 1: Use Vercel Postgres (Recommended)**
```bash
# Pull environment variables locally
npx vercel env pull .env.local

# Run development server
npm run dev
```

### **Option 2: Use SQLite for Development**
```bash
# Create .env.local for local development
echo 'DATABASE_URL="file:./dev.db"' > .env.local
echo 'POSTGRES_PRISMA_URL="file:./dev.db"' >> .env.local
echo 'POSTGRES_URL_NON_POOLING="file:./dev.db"' >> .env.local

# Setup local SQLite database
npm run db:setup

# Run development server
npm run dev
```

## **📊 Database Management**

### **View Database in Vercel Dashboard**
1. Go to **Storage** → **your-postgres-database** → **Data**
2. Browse tables and data directly in the dashboard

### **Use Prisma Studio (Local)**
```bash
# Open Prisma Studio to manage data
npx prisma studio
```

### **Connect with Database Client**
Use the `POSTGRES_URL` from Vercel environment variables in tools like:
- TablePlus
- pgAdmin
- DataGrip

## **💰 Pricing**

**Vercel Postgres Pricing:**
- **Hobby**: $0/month (1 database, 60 hours compute time)
- **Pro**: $20/month (includes databases + hosting)

**Your total Vercel cost:**
- **Frontend + Database**: $0 (hobby) or $20/month (pro)
- **Everything in one bill, one platform**

## **🆘 Troubleshooting**

### **Database Connection Issues**
```bash
# Check environment variables are set
npx vercel env ls

# Test database connection
npx prisma db push
```

### **Local Development Issues**
```bash
# Pull latest environment variables
npx vercel env pull .env.local

# Regenerate Prisma client
npx prisma generate

# Reset local database
rm dev.db && npm run db:setup
```

### **Deployment Issues**
```bash
# Force redeploy
git commit --allow-empty -m "Redeploy with database"
git push

# Or redeploy from Vercel dashboard
```

---

## **🎉 You're All Set!**

Your Roshe Studios website now has:
- ✅ **Frontend hosted on Vercel** (with your domain)
- ✅ **PostgreSQL database on Vercel** 
- ✅ **Admin dashboard with live data**
- ✅ **Everything in one platform**
- ✅ **Automatic scaling and performance**

**Admin Panel**: `https://your-domain.com/admin`
**Login**: `admin@roshestudios.co.uk` / `RosheAdmin2024!SecurePass`

Change the admin password after first login!
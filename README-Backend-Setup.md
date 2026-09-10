# Roshe Studios Backend Setup Guide

## 🎯 **What's Been Created**

### **Database Schema (Prisma)**
- ✅ Users with authentication and roles
- ✅ Schools with detailed information  
- ✅ Licenses (Single/Multi-School)
- ✅ Payments with Stripe integration
- ✅ Complete relationships between entities

### **API Routes**
- ✅ Authentication: `/api/auth/signup`, `/api/auth/signin`, `/api/auth/verify-email`, `/api/auth/signout`
- ✅ School Management: `/api/school/profile`
- ✅ Dashboard: `/api/dashboard/stats`
- ✅ Enhanced Stripe Integration: `/api/checkout`, `/api/webhook`

### **Authentication System**
- ✅ JWT-based authentication with HTTP-only cookies
- ✅ Email verification workflow
- ✅ Role-based access control
- ✅ Password hashing with bcryptjs

### **Dashboard Integration**
- ✅ School profile management
- ✅ License tracking
- ✅ Payment history
- ✅ User management

## 🚀 **Setup Instructions**

### **1. Install Dependencies**
```bash
npm install
```

### **2. Environment Setup**
Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL` - SQLite database path
- `JWT_SECRET` - Secret for JWT tokens
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook endpoint secret

### **3. Database Setup**
```bash
# Generate Prisma client
npm run db:generate

# Create and apply database schema
npm run db:push

# (Optional) View database in browser
npm run db:studio
```

### **4. Stripe Setup**
1. Create products in Stripe Dashboard:
   - Single School License: £200/year
   - Multi-School License: £700/year

2. Create webhook endpoint pointing to: `your-domain.com/api/webhook`
   - Events to listen for: `checkout.session.completed`, `payment_intent.succeeded`, etc.

3. Add Price IDs to your environment variables

### **5. Start Development**
```bash
npm run dev
```

## 📊 **Dashboard Features**

### **User Authentication**
- ✅ Signup with email verification
- ✅ Secure signin/signout
- ✅ Password reset (TODO)

### **School Management**
- ✅ School profile creation and editing
- ✅ Multiple users per school
- ✅ Role-based permissions

### **License System**
- ✅ Single School and Multi-School licenses
- ✅ Annual billing through Stripe
- ✅ License status tracking
- ✅ Payment history

### **Dashboard Analytics**
- ✅ School overview stats
- ✅ Active licenses count
- ✅ Total spending
- ✅ Recent payments
- ✅ Team member count

## 🔌 **API Endpoints**

### **Authentication**
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/signout` - Sign out

### **School Management** 
- `GET /api/school/profile` - Get school details
- `PUT /api/school/profile` - Update school details

### **Dashboard**
- `GET /api/dashboard/stats` - Get dashboard statistics

### **Payments**
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhook` - Handle Stripe webhooks

## 🛡️ **Security Features**

### **Authentication Security**
- ✅ JWT tokens with secure HTTP-only cookies
- ✅ Password hashing with bcryptjs
- ✅ Email verification required
- ✅ Role-based access control

### **API Security**
- ✅ Request validation with Zod
- ✅ Authentication middleware
- ✅ CSRF protection via HTTP-only cookies
- ✅ SQL injection protection via Prisma

### **Payment Security**
- ✅ Stripe webhook signature verification
- ✅ Secure payment processing
- ✅ PCI compliance via Stripe

## 🎯 **Next Steps**

### **Immediate TODOs**
1. Install the new dependencies: `npm install`
2. Set up your `.env.local` file
3. Run database setup: `npm run db:push`
4. Configure Stripe products and webhooks
5. Test the authentication flow

### **Enhancement Opportunities**
- Email service integration (SendGrid, etc.)
- Password reset functionality
- User invitations system
- Advanced analytics
- File upload for resources
- Multi-factor authentication

## 🚨 **Important Notes**

### **Database**
- Currently using SQLite for development
- For production, change to PostgreSQL in `schema.prisma`
- Run `npm run db:migrate` when deploying

### **Stripe Integration**
- Webhook endpoint must be publicly accessible
- Test with Stripe CLI during development
- Ensure webhook secrets are properly configured

### **Security**
- Change JWT_SECRET in production
- Use HTTPS in production
- Regularly update dependencies

## 🎉 **You're Ready!**

Your Roshe Studios backend is now fully configured with:
- Complete user authentication system
- School management
- License and payment processing
- Dashboard with analytics
- Secure API endpoints

Start with `npm run dev` and visit `/studio/signup` to create your first account!
# Roshe Studio Website

A Next.js-based platform for educational content licensing and distribution, featuring film licensing, downloadable resources, and school management.

## 🎯 Features

- **Film Showcase**: Display and license educational films (Remember Me, New Age, Seasonlings)
- **Licensing System**: Single and multi-school licensing options
- **School Dashboard**: Manage licenses, users, and download resources
- **Stripe Integration**: Secure payment processing for licenses
- **Google OAuth**: Easy authentication for school administrators
- **Resource Downloads**: Access to assembly scripts, teacher guides, worksheets, and activities
- **Responsive Design**: Tailwind CSS with mobile-first approach

## 🛠️ Tech Stack

- **Framework**: Next.js 15.0.4 (App Router)
- **Language**: TypeScript
- **Database**: Neon Postgres (Serverless)
- **ORM**: Prisma
- **Authentication**: NextAuth.js with Google OAuth
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Roshe-Studio-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.local` file and update with your credentials:
   - Neon database connection string
   - Google OAuth credentials
   - Stripe API keys
   - NextAuth secrets

4. **Set up the database**
   ```bash
   npx prisma db push
   npx tsx scripts/seed-dashboard-data.ts
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to http://localhost:3000

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── checkout/        # Stripe checkout
│   │   └── webhook/         # Stripe webhook
│   ├── films/               # Film pages
│   ├── licensing/           # Licensing page
│   ├── shop/                # Shop page
│   └── ...                  # Other pages
├── components/              # React components
├── lib/                     # Utility functions
├── prisma/                  # Database schema
├── public/                  # Static assets
└── scripts/                 # Database seeding scripts
```

## 🗄️ Database Schema

Key models:
- **User**: School administrators and teachers
- **School**: Educational institutions
- **License**: School licenses (single/multi-school)
- **Payment**: Stripe payment records
- **Resource**: Downloadable educational content
- **ResourceDownload**: Download tracking

## 🔐 Authentication

The app uses NextAuth.js with Google OAuth:
- Users sign in with their Google accounts
- Automatic user creation on first login
- Session management with JWT tokens
- Role-based access control (SUPER_ADMIN, SCHOOL_ADMIN, TEACHER)

## 💳 Payment Flow

1. User selects a license type (single or multi-school)
2. Stripe Checkout session is created
3. User completes payment on Stripe
4. Webhook processes the payment
5. License is activated in the database
6. User gains access to licensed resources

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Connect your Git repository
2. Add environment variables
3. Deploy!

## 🧪 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# View database in Prisma Studio
npx prisma studio

# Push schema changes to database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed database
npx tsx scripts/seed-dashboard-data.ts
```

## 📝 Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=
JWT_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_SINGLE_SCHOOL_PRICE_ID=
STRIPE_MULTI_SCHOOL_PRICE_ID=

# App
SUPPORT_EMAIL=
NODE_ENV=
```

See `.env.example` for a complete template.

## 🔧 Troubleshooting

### Database Connection Issues
If you encounter DNS errors connecting to Neon:
```bash
ipconfig /flushdns
Clear-DnsClientCache
```

### Prisma Client Generation Errors
If on Windows with OneDrive:
```bash
npx prisma db push --skip-generate
```

### OAuth Redirect Issues
Ensure your Google OAuth redirect URIs include:
- `http://localhost:3000/api/auth/callback/google` (development)
- `https://your-domain.vercel.app/api/auth/callback/google` (production)

## 📄 License

All rights reserved © Roshe Studios

## 🤝 Support

For issues or questions:
- Email: support@roshestudios.co.uk
- Website: https://roshestudios.co.uk

## 🎬 Films

### Remember Me (Remembrance Day)
Educational content for teaching about remembrance and historical significance.

### New Age
Coming soon

### Seasonlings
Coming soon

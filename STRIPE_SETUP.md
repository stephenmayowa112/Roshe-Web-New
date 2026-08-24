# Stripe Integration Setup Guide

## 📋 Prerequisites
1. Create a Stripe account at https://stripe.com/gb
2. Complete business verification with required documents
3. Add UK bank account for receiving payments

## 🔑 Step 1: Get Your API Keys
1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)
4. Update `.env.local` with your actual keys

## 🛍️ Step 2: Create Products in Stripe
1. Go to https://dashboard.stripe.com/products
2. Create two products:

### Single School License
- **Name**: Remember Me - Single School License
- **Description**: 6-minute 2D animation, assembly script, teacher's guide, student worksheet, 24/7 support
- **Pricing**: £200 GBP, recurring annually
- **Copy the Price ID** and update `STRIPE_SINGLE_SCHOOL_PRICE_ID` in `.env.local`

### Multi-School License
- **Name**: Remember Me - Multi-School Trust License  
- **Description**: Same as single school license but for multiple schools within a trust
- **Pricing**: £700 GBP, recurring annually
- **Copy the Price ID** and update `STRIPE_MULTI_SCHOOL_PRICE_ID` in `.env.local`

## 🔗 Step 3: Set Up Webhooks
1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://yourdomain.com/api/webhook`
4. Select these events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** and update `STRIPE_WEBHOOK_SECRET` in `.env.local`

## 🚀 Step 4: Test the Integration
1. Use Stripe test cards: https://stripe.com/docs/testing#cards
2. Test card: `4242 4242 4242 4242`
3. Any future date and any 3-digit CVC

## 📧 Step 5: Set Up Post-Purchase Flow
You'll need to implement:
- Email delivery system for license files
- Database to store customer licenses
- Digital asset storage (ZIP files with resources)
- Customer portal for license management

## 🔄 Going Live
1. Switch to live keys in Stripe dashboard
2. Update webhook endpoint to production URL  
3. Test with real card (small amount)
4. Update `.env.local` with live keys

## 📁 Files Created
- `lib/stripe.ts` - Stripe configuration
- `components/CheckoutButton.tsx` - Payment button component
- `app/api/checkout/route.ts` - Checkout session API
- `app/api/webhook/route.ts` - Webhook handler
- `app/success/page.tsx` - Success page
- `.env.local` - Environment variables (update with your keys)

## 🛡️ Security Notes
- Never expose secret keys in client-side code
- Always validate webhooks with signing secrets
- Use HTTPS in production
- Implement proper error handling and logging
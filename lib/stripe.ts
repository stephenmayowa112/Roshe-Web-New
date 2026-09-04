import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Client-side Stripe instance
export const getStripe = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  if (!publishableKey || publishableKey === 'pk_test_your_publishable_key_here') {
    console.error('Stripe publishable key not configured properly');
    return null;
  }
  
  const stripePromise = loadStripe(publishableKey);
  return stripePromise;
};

// Server-side Stripe instance - only initialize if secret key is available
const createStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!secretKey || secretKey === 'sk_test_your_secret_key_here') {
    console.warn('Stripe secret key not configured. Stripe functionality will be disabled.');
    return null;
  }
  
  return new Stripe(secretKey, {
    apiVersion: '2024-12-18.acacia',
    appInfo: {
      name: 'Roshe Studios',
      version: '1.0.0',
    },
  });
};

export const stripe = createStripeInstance();

// License products configuration
export const STRIPE_PRODUCTS = {
  SINGLE_SCHOOL: {
    priceId: process.env.STRIPE_SINGLE_SCHOOL_PRICE_ID || 'price_placeholder_single',
    name: 'Remember Me - Single School License',
    price: 20000, // £200.00 in pence
    description: '6-minute 2D animation, assembly script, teacher\'s guide, student worksheet, 24/7 support',
  },
  MULTI_SCHOOL: {
    priceId: process.env.STRIPE_MULTI_SCHOOL_PRICE_ID || 'price_placeholder_multi',
    name: 'Remember Me - Multi-School Trust License',
    price: 70000, // £700.00 in pence
    description: 'Same as single school license but for multiple schools within a trust',
  },
} as const;
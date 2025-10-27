import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Initialize Stripe only if secret key is provided (lazy initialization)
let stripeInstance: Stripe | null = null;

export function getStripeInstance(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      // For build time, just return a mock instance
      return {} as Stripe;
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2025-08-27.basil',
    });
  }
  return stripeInstance;
}

// Only initialize if we have the key
export const stripe = typeof process.env.STRIPE_SECRET_KEY === 'string' && process.env.STRIPE_SECRET_KEY.length > 0
  ? getStripeInstance()
  : {} as Stripe;

export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
};

// S3 client import moved to storage.ts


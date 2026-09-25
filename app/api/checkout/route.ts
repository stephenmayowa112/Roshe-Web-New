import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_PRODUCTS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment system is not configured. Please contact support.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { licenseType, customerEmail, schoolName } = body;

    // Validate license type
    if (!licenseType || !['single', 'multi'].includes(licenseType)) {
      return NextResponse.json(
        { error: 'Invalid license type' },
        { status: 400 }
      );
    }

    // Get product details
    const product = licenseType === 'single' 
      ? STRIPE_PRODUCTS.SINGLE_SCHOOL 
      : STRIPE_PRODUCTS.MULTI_SCHOOL;

    const configuredPriceId = product.priceId;
    const priceId = configuredPriceId.startsWith('prod_')
      ? await getDefaultPriceId(configuredPriceId)
      : configuredPriceId;

    if (!priceId || !priceId.startsWith('price_')) {
      return NextResponse.json(
        { error: 'Stripe product price is not configured correctly.' },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription', // For annual billing
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/licensing`,
      customer_email: customerEmail,
      metadata: {
        licenseType,
        schoolName: schoolName || '',
      },
      subscription_data: {
        metadata: {
          licenseType,
          schoolName: schoolName || '',
        },
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ 
      sessionId: session.id,
      sessionUrl: session.url 
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

async function getDefaultPriceId(productId: string): Promise<string | null> {
  const stripeProduct = await stripe!.products.retrieve(productId);
  const defaultPrice = stripeProduct.default_price;

  if (typeof defaultPrice === 'string') {
    return defaultPrice;
  }

  return defaultPrice?.id ?? null;
}
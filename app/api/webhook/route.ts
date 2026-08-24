import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('Payment successful for session:', session.id);
        
        // Here you would:
        // 1. Save the license to your database
        // 2. Send confirmation email with license files
        // 3. Generate invoice
        // 4. Set up license access
        
        // For now, we'll just log the successful payment
        console.log('License purchased:', {
          sessionId: session.id,
          customerEmail: session.customer_email,
          licenseType: session.metadata?.licenseType,
          schoolName: session.metadata?.schoolName,
          amountTotal: session.amount_total,
        });
        
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        console.log('Subscription payment succeeded:', invoice.id);
        
        // Handle recurring payment success
        // Extend license validity, send renewal confirmation, etc.
        
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log('Subscription cancelled:', subscription.id);
        
        // Handle subscription cancellation
        // Revoke license access, send cancellation confirmation, etc.
        
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
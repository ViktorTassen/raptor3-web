import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia'
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email, uid } = body;


    const priceId = "price_1N9ZQaL5pL8dc9xK0WXXEKY9";

    if (!priceId || !email || !uid) {
      return NextResponse.json(
        { error: 'Price ID, email, and UID are required' },
        { status: 400 }
      );
    }

    // Get price details to determine if it's recurring
    let price;
    try {
      price = await stripe.prices.retrieve(priceId);
    } catch (error) {
      console.error('Error retrieving price:', error);
      return NextResponse.json(
        { error: 'Invalid price ID' },
        { status: 400 }
      );
    }

    // Get or create customer
    let customer;
    try {
      const existingCustomers = await stripe.customers.search({
        query: `metadata['firebaseUID']:'${uid}'`,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          email,
          metadata: { firebaseUID: uid }
        });
      }
    } catch (error) {
      console.error('Error managing customer:', error);
      return NextResponse.json(
        { error: 'Failed to manage customer' },
        { status: 500 }
      );
    }

    // Create checkout session with the correct mode based on price type
    try {
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        allow_promotion_codes: true,
        invoice_creation: { enabled: true },
        mode: price.type === 'recurring' ? 'subscription' : 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      });

      if (!session.url) {
        throw new Error('Failed to create checkout session URL');
      }

      return NextResponse.json({ url: session.url });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
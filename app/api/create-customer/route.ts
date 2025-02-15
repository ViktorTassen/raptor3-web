import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia'
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, uid } = await request.json();

    if (!email || !uid) {
      return NextResponse.json(
        { error: 'Email and uid are required' },
        { status: 400 }
      );
    }

    // First try to find customer by Firebase UID in metadata
    const existingCustomers = await stripe.customers.search({
      query: `metadata['firebaseUID']:'${uid}'`,
    });

    if (existingCustomers.data.length > 0) {
      return NextResponse.json({ customerId: existingCustomers.data[0].id });
    }

    // If no customer found with Firebase UID, check by email
    const customersByEmail = await stripe.customers.list({ email });
    if (customersByEmail.data.length > 0) {
      // Update the existing customer with Firebase UID
      const customer = await stripe.customers.update(customersByEmail.data[0].id, {
        metadata: { firebaseUID: uid }
      });
      return NextResponse.json({ customerId: customer.id });
    }

    // If no customer found at all, create a new one
    const customer = await stripe.customers.create({
      email,
      metadata: { firebaseUID: uid }
    });

    return NextResponse.json({ customerId: customer.id });
  } catch (error) {
    console.error('Error managing Stripe customer:', error);
    return NextResponse.json(
      { error: 'Failed to manage customer' },
      { status: 500 }
    );
  }
}
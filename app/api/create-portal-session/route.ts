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
        { error: 'Email and UID are required' },
        { status: 400 }
      );
    }

    // First try to find customer by Firebase UID in metadata
    const existingCustomers = await stripe.customers.search({
      query: `metadata['firebaseUID']:'${uid}'`,
    });

    let customerId: string;

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
    } else {
      // If no customer found with Firebase UID, check by email
      const customersByEmail = await stripe.customers.list({ email });
      
      if (customersByEmail.data.length > 0) {
        // Update the existing customer with Firebase UID
        const customer = await stripe.customers.update(customersByEmail.data[0].id, {
          metadata: { firebaseUID: uid }
        });
        customerId = customer.id;
      } else {
        // If no customer found at all, create a new one
        const customer = await stripe.customers.create({
          email,
          metadata: { firebaseUID: uid }
        });
        customerId = customer.id;
      }
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
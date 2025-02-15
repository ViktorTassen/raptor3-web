import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia'
});
const db = getFirestore();

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

async function getUserByCustomerId(customerId: string) {
  const customer = await stripe.customers.retrieve(customerId);
  const firebaseUID = (customer as Stripe.Customer).metadata.firebaseUID;
  if (!firebaseUID) return null;
  return db.collection('customers').doc(firebaseUID);
}

async function updateSubscription(subscription: Stripe.Subscription, userRef: FirebaseFirestore.DocumentReference) {
  await userRef.collection('subscriptions').doc(subscription.id).set({
    id: subscription.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    quantity: subscription.items.data[0].quantity,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
    createdAt: new Date(subscription.created * 1000),
    updatedAt: new Date()
  }, { merge: true });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.text();
    const signature = (await headers()).get('stripe-signature')!;

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const dataObject = event.data.object as Stripe.Checkout.Session | Stripe.Product | Stripe.Price | Stripe.Subscription;

    switch (event.type) {
      case 'product.created':
      case 'product.updated':
        await db.collection('products').doc((dataObject as Stripe.Product).id).set(
          { ...dataObject, updatedAt: new Date() },
          { merge: true }
        );
        break;

      case 'product.deleted':
        await db.collection('products').doc((dataObject as Stripe.Product).id).update({
          active: false,
          deletedAt: new Date()
        });
        break;

      case 'price.created':
      case 'price.updated':
        await db.collection('prices').doc((dataObject as Stripe.Price).id).set(
          { ...dataObject, updatedAt: new Date() },
          { merge: true }
        );
        break;

      case 'price.deleted':
        await db.collection('prices').doc((dataObject as Stripe.Price).id).update({
          active: false,
          deletedAt: new Date()
        });
        break;

      case 'checkout.session.completed': {
        const session = dataObject as Stripe.Checkout.Session;
        const userRef = await getUserByCustomerId(session.customer as string);
        if (!userRef) break;

        if (session.mode === 'subscription') {
          // Subscription data will be handled by the subscription events
          await userRef.collection('subscriptions').doc(session.subscription as string).set({
            status: 'active',
            priceId: session.line_items?.data[0]?.price?.id,
            quantity: session.line_items?.data[0]?.quantity || 1,
            createdAt: new Date(),
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
          });
        } else if (session.mode === 'payment') {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
          const price = await stripe.prices.retrieve(lineItems.data[0].price?.id || '');
          
          // Browserfax specific: Get number of fax pages from price metadata
          const pages = parseInt(price.metadata?.pages || '0', 10);
          
          // Browserfax specific: Update user's remaining fax pages
          await userRef.update({
            remainingPages: FieldValue.increment(pages)
          });

          // Browserfax specific: Record the purchase with page count
          await userRef.collection('purchases').add({
            amount: session.amount_total,
            currency: session.currency,
            pages, // Number of fax pages purchased
            createdAt: new Date(),
            status: 'completed',
            paymentIntentId: session.payment_intent,
            priceId: price.id,
            productId: price.product
          });
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = dataObject as Stripe.Subscription;
        const userRef = await getUserByCustomerId(subscription.customer as string);
        if (!userRef) break;
        await updateSubscription(subscription, userRef);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = dataObject as Stripe.Subscription;
        const userRef = await getUserByCustomerId(subscription.customer as string);
        if (!userRef) break;

        await userRef.collection('subscriptions').doc(subscription.id).update({
          status: 'canceled',
          canceledAt: new Date(),
          updatedAt: new Date()
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
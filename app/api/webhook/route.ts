import { NextRequest, NextResponse } from 'next/server';
import { getStripeInstance } from '@/lib/stripe';
import pool from '@/lib/db';
import { sendOrderConfirmationEmail } from '@/lib/email';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    const stripe = getStripeInstance();
    event = stripe.webhooks.constructEvent(body, sig || '', endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const stripe = getStripeInstance();
    const session = event.data.object;
    const sessionId = session.id;
    const email = session.customer_details?.email || '';

    // Update order status
    await pool.query(
      `UPDATE orders SET payment_status = 'paid' WHERE stripe_session_id = $1`,
      [sessionId]
    );

    // Update event status
    const orderResult = await pool.query(
      `SELECT event_id FROM orders WHERE stripe_session_id = $1`,
      [sessionId]
    );

    if (orderResult.rows.length > 0) {
      const eventId = orderResult.rows[0].event_id;

      await pool.query(
        `UPDATE events SET status = 'paid' WHERE event_id = $1`,
        [eventId]
      );

      // Get event details for email
      const eventResult = await pool.query(
        `SELECT * FROM events WHERE event_id = $1`,
        [eventId]
      );

      if (eventResult.rows.length > 0) {
        const eventData = eventResult.rows[0];
        const adminUrl = `${process.env.NEXT_PUBLIC_APP_URL}/admin/${eventId}`;
        const eventUrl = `${process.env.NEXT_PUBLIC_APP_URL}/e/${eventData.access_key}`;

        // Send confirmation email
        await sendOrderConfirmationEmail(
          email,
          eventData.host_name,
          eventId,
          eventData.access_key,
          adminUrl,
          eventUrl
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}


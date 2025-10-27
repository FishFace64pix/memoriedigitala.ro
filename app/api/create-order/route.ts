import { NextRequest, NextResponse } from 'next/server';
import { getStripeInstance } from '@/lib/stripe';
import pool from '@/lib/db';
import { generateEventId, generateAccessKey } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      hostEmail,
      hostName,
      phone,
      eventName,
      eventDate,
      address,
      city,
      postalCode,
      country,
      qrPrintQuantity,
      voiceMessageEnabled,
      basePrice,
      qrPrintPrice,
      voiceMessagePrice,
      totalPrice,
    } = body;

    // Validate required fields
    if (!hostEmail || !hostName || !totalPrice) {
      return NextResponse.json(
        { error: 'Câmpuri obligatorii lipsă' },
        { status: 400 }
      );
    }

    // Generate unique identifiers
    const eventId = generateEventId();
    const accessKey = generateAccessKey();
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 12); // 12 months access

    // Create event in database
    const eventResult = await pool.query(
      `INSERT INTO events (
        event_id, access_key, host_email, host_name, host_phone, event_name, event_date,
        delivery_address, delivery_city, delivery_postal, delivery_country,
        qr_print_enabled, qr_print_quantity, voice_message_enabled,
        total_price, status, expires_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`,
      [
        eventId,
        accessKey,
        hostEmail,
        hostName,
        phone || null,
        eventName || null,
        eventDate || null,
        address || null,
        city || null,
        postalCode || null,
        country || 'Romania',
        qrPrintQuantity > 0,
        qrPrintQuantity || 0,
        voiceMessageEnabled || false,
        totalPrice,
        'pending',
        expiresAt,
      ]
    );

    const event = eventResult.rows[0];

    // Create Stripe checkout session
    const sessionId = uuidv4();
    
    // Get the correct app URL for redirects
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    const stripeSession = await getStripeInstance().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: 'Digital Memory Box',
              description: `Event: ${eventName || 'Undefined'}`,
            },
            unit_amount: Math.round(totalPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/admin/${eventId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/siparis`,
      metadata: {
        eventId,
        sessionId,
      },
    });

    // Create order in database
    await pool.query(
      `INSERT INTO orders (
        stripe_session_id, event_id, host_email, host_name,
        base_price, qr_print_price, voice_message_price, total_price,
        payment_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        stripeSession.id,
        eventId,
        hostEmail,
        `${hostName} (${phone})`,
        basePrice,
        qrPrintPrice || 0,
        voiceMessagePrice || 0,
        totalPrice,
        'pending',
      ]
    );

    // Send confirmation email (currently disabled due to SMTP issues)
    const adminUrl = `${appUrl}/admin/${eventId}`;
    const eventUrl = `${appUrl}/e/${accessKey}`;
    
    /*
    try {
      await sendOrderConfirmationEmail(
        hostEmail,
        hostName,
        eventId,
        accessKey,
        adminUrl,
        eventUrl
      );
      console.log('Order confirmation email sent');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }
    */
    
    console.log('Order created successfully. Admin URL:', adminUrl);

    return NextResponse.json({
      sessionId: stripeSession.id,
      eventId,
      accessKey,
      checkoutUrl: stripeSession.url,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Eroare la crearea comenzii' },
      { status: 500 }
    );
  }
}


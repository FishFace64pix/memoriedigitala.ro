import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID required' },
        { status: 400 }
      );
    }

    const mediaResult = await pool.query(
      `SELECT * FROM media_uploads 
       WHERE event_id = $1 AND is_approved = true 
       ORDER BY uploaded_at DESC`,
      [eventId]
    );

    return NextResponse.json({ media: mediaResult.rows });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Error fetching media' },
      { status: 500 }
    );
  }
}



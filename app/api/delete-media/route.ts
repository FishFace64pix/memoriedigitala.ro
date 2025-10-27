import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaId = searchParams.get('id');
    const eventId = searchParams.get('eventId');

    if (!mediaId || !eventId) {
      return NextResponse.json(
        { error: 'Media ID and Event ID required' },
        { status: 400 }
      );
    }

    await pool.query(
      `UPDATE media_uploads SET is_approved = false 
       WHERE id = $1 AND event_id = $2`,
      [mediaId, eventId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { error: 'Error deleting media' },
      { status: 500 }
    );
  }
}



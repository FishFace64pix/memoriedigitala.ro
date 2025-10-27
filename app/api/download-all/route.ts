import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import archiver from 'archiver';
import { Readable } from 'stream';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('eventId');

  if (!eventId) {
    return NextResponse.json({ error: 'Event ID required' }, { status: 400 });
  }

  try {
    // Get all media for this event
    const mediaResult = await pool.query(
      `SELECT * FROM media_uploads WHERE event_id = $1 AND is_approved = true ORDER BY uploaded_at ASC`,
      [eventId]
    );

    const mediaItems = mediaResult.rows;

    if (mediaItems.length === 0) {
      return NextResponse.json({ error: 'No media to download' }, { status: 404 });
    }

    // TODO: Create ZIP file with all media
    // For now, return JSON with all media URLs
    return NextResponse.json({
      mediaCount: mediaItems.length,
      media: mediaItems.map((item: any) => ({
        id: item.id,
        type: item.upload_type,
        url: item.file_url,
        fileName: item.file_name,
        uploadedAt: item.uploaded_at,
      })),
      message: 'Zip download will be implemented with actual file fetching and archiving',
    });
  } catch (error) {
    console.error('Error downloading media:', error);
    return NextResponse.json({ error: 'Error downloading media' }, { status: 500 });
  }
}


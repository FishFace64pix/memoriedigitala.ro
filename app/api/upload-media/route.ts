import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { uploadFileToS3 } from '@/lib/storage';
import { validateFile } from '@/lib/fileValidation';
import { getClientIP, rateLimiters } from '@/lib/rateLimit';
import { asyncHandler, handleError } from '@/lib/errorHandler';
import { logger } from '@/lib/logger';

export const POST = asyncHandler(async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getClientIP(request);
  const rateLimit = await rateLimiters.upload(request);
  
  if (!rateLimit.allowed) {
    logger.warn('Rate limit exceeded', { ip });
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  logger.info('Upload media request', { ip });

  const formData = await request.formData();
  const accessKey = formData.get('accessKey') as string;
  const file = formData.get('file') as File;
  const uploadType = formData.get('type') as string;
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';

  // Validate required fields
  if (!accessKey || !file || !uploadType) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Validate file
  const fileValidation = validateFile(file, uploadType as 'photo' | 'video' | 'audio');
  if (!fileValidation.valid) {
    logger.warn('File validation failed', { errors: fileValidation.errors });
    return NextResponse.json(
      { error: 'Invalid file', details: fileValidation.errors },
      { status: 400 }
    );
  }

  // Validate access key
  const eventResult = await pool.query(
    `SELECT * FROM events WHERE access_key = $1 AND status IN ('pending', 'paid')`,
    [accessKey]
  );

  if (eventResult.rows.length === 0) {
    logger.warn('Invalid access key', { accessKey, ip });
    return NextResponse.json(
      { error: 'Invalid code or event not paid' },
      { status: 404 }
    );
  }

  const event = eventResult.rows[0];
  const eventId = event.event_id;

  // Try to upload to S3, fallback to base64 if S3 is not configured
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `${Date.now()}_${file.name}`;
  const fileSize = file.size;
  
  let fileUrl: string;
  
  try {
    // Try to upload to S3
    fileUrl = await uploadFileToS3(buffer, fileName, file.type);
    logger.info('File uploaded to S3', { fileUrl, eventId });
  } catch (s3Error) {
    logger.warn('S3 not configured, using base64', { error: s3Error });
    // Fallback to base64 if S3 is not configured
    const base64Data = buffer.toString('base64');
    fileUrl = `data:${file.type};base64,${base64Data}`;
  }

  // Save media record to database
  await pool.query(
    `INSERT INTO media_uploads (
      event_id, upload_type, file_url, file_name, file_size, guest_ip
    ) VALUES ($1, $2, $3, $4, $5, $6)`,
    [eventId, uploadType, fileUrl, fileName, fileSize, clientIp]
  );

  logger.info('Media uploaded successfully', { eventId, uploadType });
  
  return NextResponse.json({
    success: true,
    message: 'File uploaded successfully',
  });
});


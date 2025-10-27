import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client only if credentials are provided
let s3Client: S3Client | null = null;

export function getS3Client(): S3Client | null {
  if (s3Client) return s3Client;
  
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    s3Client = new S3Client({
      region: process.env.AWS_REGION || 'eu-central-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    return s3Client;
  }
  
  return null;
}

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'memorie-digitala-media';

export async function uploadFileToS3(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const client = getS3Client();
  if (!client) {
    throw new Error('AWS S3 not configured. Please set AWS credentials in environment variables.');
  }

  const key = `uploads/${Date.now()}_${fileName}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
    ACL: 'private', // Make files private by default
  });

  await client.send(command);

  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

export async function deleteFileFromS3(fileKey: string): Promise<void> {
  const client = getS3Client();
  if (!client) {
    throw new Error('AWS S3 not configured. Please set AWS credentials in environment variables.');
  }

  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
  });

  await client.send(command);
}

export function getFileURLFromKey(key: string): string {
  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}


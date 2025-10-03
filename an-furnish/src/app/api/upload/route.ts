import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique file name
    const fileName = `${Date.now()}-${file.name}`;
    
    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `uploads/${fileName}`,
      Body: buffer,
      ContentType: file.type,
    });
    
    await s3Client.send(command);
    
    // Return the URL of the uploaded file
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
    
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connect';

export async function GET() {
  try {
    // Test database connection
    await connectToDatabase();
    
    return NextResponse.json(
      { status: 'healthy', database: 'connected' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { status: 'unhealthy', database: 'disconnected', error: errorMessage },
      { status: 500 }
    );
  }
}
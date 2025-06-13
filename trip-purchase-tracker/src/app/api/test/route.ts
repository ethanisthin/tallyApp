import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    await db.$connect()
    
    return NextResponse.json({ 
      message: 'Backend works baby yeahhhh',
      database: 'Connected successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    )
  }
}
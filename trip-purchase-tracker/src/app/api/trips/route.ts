import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const trips = await db.trip.findMany({
      include: {
        purchases: {
          include: {
            splits: true
          }
        }
      }
    })
    
    return NextResponse.json(trips)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trips' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, createdBy } = await request.json()
    
    const trip = await db.trip.create({
      data: {
        name,
        description,
        createdBy
      }
    })
    
    return NextResponse.json(trip)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create trip' },
      { status: 500 }
    )
  }
}
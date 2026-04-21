import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const campWeeks = await prisma.campWeek.findMany({
      where: { isActive: true },
      orderBy: { startDate: 'asc' },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
        registrations: {
          include: {
            registration: {
              select: { status: true },
            },
          },
        },
      },
    })

    const weeks = campWeeks.map((week) => {
      const paidCount = week.registrations.filter(
        (r) => r.registration.status === 'PAID'
      ).length

      return {
        id: week.id,
        name: week.name,
        startDate: week.startDate,
        endDate: week.endDate,
        price: week.price,
        maxSpots: week.maxSpots,
        spotsRemaining: week.maxSpots - paidCount,
        isFull: paidCount >= week.maxSpots,
      }
    })

    return NextResponse.json(weeks)
  } catch (error) {
    console.error('Error fetching camp weeks:', error)
    return NextResponse.json({ error: 'Failed to fetch camp weeks' }, { status: 500 })
  }
}

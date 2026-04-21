import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const campWeekId = searchParams.get('campWeekId')
  const status = searchParams.get('status')

  try {
    const registrations = await prisma.registration.findMany({
      where: {
        ...(status && { status: status as 'PENDING' | 'PAID' | 'CANCELLED' }),
        ...(campWeekId && {
          campWeeks: {
            some: { campWeekId },
          },
        }),
      },
      include: {
        campWeeks: {
          include: { campWeek: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(registrations)
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 })
  }
}

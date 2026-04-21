import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { parentName, parentEmail, parentPhone, playerName, playerAge, campWeekIds } = body

    // Validate required fields
    if (!parentName || !parentEmail || !parentPhone || !playerName || !playerAge || !campWeekIds?.length) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (!Array.isArray(campWeekIds) || campWeekIds.length === 0) {
      return NextResponse.json({ error: 'At least one camp week must be selected' }, { status: 400 })
    }

    // Verify all selected camp weeks exist and have capacity
    const campWeeks = await prisma.campWeek.findMany({
      where: { id: { in: campWeekIds }, isActive: true },
      include: {
        registrations: {
          include: {
            registration: { select: { status: true } },
          },
        },
      },
    })

    if (campWeeks.length !== campWeekIds.length) {
      return NextResponse.json({ error: 'One or more selected camp weeks are invalid' }, { status: 400 })
    }

    for (const week of campWeeks) {
      const paidCount = week.registrations.filter(
        (r) => r.registration.status === 'PAID'
      ).length
      if (paidCount >= week.maxSpots) {
        return NextResponse.json(
          { error: `${week.name} is full. Please select a different week.` },
          { status: 400 }
        )
      }
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        parentName,
        parentEmail,
        parentPhone,
        playerName,
        playerAge: parseInt(playerAge),
        status: 'PENDING',
        campWeeks: {
          create: campWeekIds.map((id: string) => ({ campWeekId: id })),
        },
      },
    })

    return NextResponse.json({ registrationId: registration.id })
  } catch (error) {
    console.error('Error creating registration:', error)
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 })
  }
}

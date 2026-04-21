import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const registration = await prisma.registration.findUnique({
      where: { id },
      include: {
        campWeeks: {
          include: { campWeek: true },
        },
      },
    })

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    return NextResponse.json(registration)
  } catch (error) {
    console.error('Error fetching registration:', error)
    return NextResponse.json({ error: 'Failed to fetch registration' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await req.json()
    const { parentName, parentEmail, parentPhone, playerName, playerAge, status, notes, addCampWeekId, removeCampWeekId } = body

    const updateData: Record<string, unknown> = {}
    if (parentName !== undefined) updateData.parentName = parentName
    if (parentEmail !== undefined) updateData.parentEmail = parentEmail
    if (parentPhone !== undefined) updateData.parentPhone = parentPhone
    if (playerName !== undefined) updateData.playerName = playerName
    if (playerAge !== undefined) updateData.playerAge = parseInt(playerAge)
    if (status !== undefined) updateData.status = status
    if (notes !== undefined) updateData.notes = notes

    const registration = await prisma.registration.update({
      where: { id },
      data: updateData,
    })

    // Add camp week
    if (addCampWeekId) {
      await prisma.registrationCampWeek.upsert({
        where: {
          registrationId_campWeekId: {
            registrationId: id,
            campWeekId: addCampWeekId,
          },
        },
        create: { registrationId: id, campWeekId: addCampWeekId },
        update: {},
      })
    }

    // Remove camp week
    if (removeCampWeekId) {
      await prisma.registrationCampWeek.deleteMany({
        where: { registrationId: id, campWeekId: removeCampWeekId },
      })
    }

    const updated = await prisma.registration.findUnique({
      where: { id },
      include: { campWeeks: { include: { campWeek: true } } },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating registration:', error)
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 })
  }
}

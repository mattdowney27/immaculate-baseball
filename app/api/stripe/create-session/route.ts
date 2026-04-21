import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export async function POST(req: NextRequest) {
  try {
    const { registrationId } = await req.json()

    if (!registrationId) {
      return NextResponse.json({ error: 'Registration ID is required' }, { status: 400 })
    }

    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        campWeeks: {
          include: { campWeek: true },
        },
      },
    })

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    if (registration.status === 'PAID') {
      return NextResponse.json({ error: 'Registration is already paid' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Build line items from selected camp weeks
    const lineItems = registration.campWeeks.map((rcw) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Immaculate Baseball Summer Camp — ${rcw.campWeek.name}`,
          description: `${new Date(rcw.campWeek.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(rcw.campWeek.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        },
        unit_amount: rcw.campWeek.price,
      },
      quantity: 1,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: registration.parentEmail,
      metadata: {
        registrationId: registration.id,
      },
      success_url: `${baseUrl}/registration/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/summer-camp?cancelled=true`,
    })

    // Store the session ID on the registration
    await prisma.registration.update({
      where: { id: registrationId },
      data: { stripeSessionId: session.id },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating Stripe session:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

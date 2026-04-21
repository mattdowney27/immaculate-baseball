import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const registrationId = session.metadata?.registrationId

    if (!registrationId) {
      console.error('No registrationId in session metadata')
      return NextResponse.json({ error: 'Missing registrationId' }, { status: 400 })
    }

    try {
      await prisma.registration.update({
        where: { id: registrationId },
        data: {
          status: 'PAID',
          stripeSessionId: session.id,
        },
      })
      console.log(`Registration ${registrationId} marked as PAID`)
    } catch (error) {
      console.error('Error updating registration status:', error)
      return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}

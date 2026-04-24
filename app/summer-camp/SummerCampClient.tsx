'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

interface CampWeek {
  id: string
  name: string
  startDate: string
  endDate: string
  price: number
  maxSpots: number
  spotsRemaining: number
  isFull: boolean
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(0)}`
}

function CancelledBanner() {
  const searchParams = useSearchParams()
  if (searchParams.get('cancelled') !== 'true') return null
  return (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm mb-6">
      Your registration was not completed. You can try again below.
    </div>
  )
}

export default function SummerCampClient() {
  const [campWeeks, setCampWeeks] = useState<CampWeek[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWeeks, setSelectedWeeks] = useState<string[]>([])
  const [step, setStep] = useState<'select' | 'form' | 'submitting'>('select')
  const [formError, setFormError] = useState('')

  const [form, setForm] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    playerName: '',
    playerDob: '',
  })

  useEffect(() => {
    fetch('/api/camp-weeks')
      .then((r) => r.json())
      .then((data) => {
        setCampWeeks(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function toggleWeek(id: string) {
    setSelectedWeeks((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    )
  }

  function totalPrice() {
    return campWeeks
      .filter((w) => selectedWeeks.includes(w.id))
      .reduce((sum, w) => sum + w.price, 0)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    setStep('submitting')

    try {
      // Step 1: Create registration
      const regRes = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, campWeekIds: selectedWeeks }),
      })

      const regData = await regRes.json()
      if (!regRes.ok) {
        setFormError(regData.error || 'Failed to submit registration.')
        setStep('form')
        return
      }

      // Step 2: Create Stripe checkout session
      const stripeRes = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId: regData.registrationId }),
      })

      const stripeData = await stripeRes.json()
      if (!stripeRes.ok) {
        setFormError(stripeData.error || 'Failed to start checkout.')
        setStep('form')
        return
      }

      // Step 3: Redirect to Stripe
      window.location.href = stripeData.url
    } catch {
      setFormError('Something went wrong. Please try again.')
      setStep('form')
    }
  }

  const selectedWeekDetails = campWeeks.filter((w) => selectedWeeks.includes(w.id))

  return (
    <div>
      {/* Page header */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#4b9cd3' }}
          >
            Summer 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">Summer Camp Registration</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Intensive week-long camps covering every facet of the game. Full-day programming with
            elevated instruction and focused development. Limited spots — register early.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-14">
        <Suspense fallback={null}>
          <CancelledBanner />
        </Suspense>

        {step === 'select' && (
          <div>
            {/* What to expect */}
            <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Full-Day Training',
                  desc: 'Morning through afternoon sessions covering hitting, pitching, defense, conditioning, and game IQ.',
                },
                {
                  title: 'All Skill Levels',
                  desc: 'Players are grouped and coached at their appropriate tier. Beginners and advanced players are both welcome.',
                },
                {
                  title: 'Limited Spots',
                  desc: 'Each week has a maximum capacity to ensure quality coaching ratios. Register early to secure your week.',
                },
              ].map((item) => (
                <div key={item.title} className="border border-gray-100 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Camp Week(s)</h2>
            <p className="text-gray-500 text-sm mb-8">
              You may register for multiple weeks. Each week is billed separately.
            </p>

            {loading ? (
              <div className="py-16 text-center text-gray-400">Loading available weeks...</div>
            ) : campWeeks.length === 0 ? (
              <div className="py-16 text-center text-gray-400">No camp weeks available at this time.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {campWeeks.map((week) => {
                  const selected = selectedWeeks.includes(week.id)
                  return (
                    <button
                      key={week.id}
                      onClick={() => !week.isFull && toggleWeek(week.id)}
                      disabled={week.isFull && !selected}
                      className={`text-left rounded-xl border-2 p-6 transition-all ${
                        selected
                          ? 'border-blue-400 bg-blue-50'
                          : week.isFull
                          ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                          : 'border-gray-100 hover:border-gray-200 cursor-pointer'
                      }`}
                      style={selected ? { borderColor: '#4b9cd3' } : {}}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-gray-900">{week.name}</span>
                            {week.isFull && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                                Full
                              </span>
                            )}
                            {!week.isFull && week.spotsRemaining <= 5 && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">
                                {week.spotsRemaining} spot{week.spotsRemaining !== 1 ? 's' : ''} left
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(week.startDate)} – {formatDate(week.endDate)}, 2026
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {week.spotsRemaining} of {week.maxSpots} spots remaining
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="font-bold text-gray-900 text-lg">
                            {formatPrice(week.price)}
                          </span>
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                              selected
                                ? 'border-blue-400 text-white'
                                : 'border-gray-300'
                            }`}
                            style={selected ? { backgroundColor: '#4b9cd3', borderColor: '#4b9cd3' } : {}}
                          >
                            {selected && (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {selectedWeeks.length > 0 && (
              <div className="border border-gray-100 rounded-xl p-6 bg-gray-50 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-gray-900">Selected Weeks</span>
                  <span className="font-bold text-gray-900 text-lg">
                    Total: {formatPrice(totalPrice())}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {selectedWeekDetails.map((w) => (
                    <li key={w.id} className="flex justify-between text-sm text-gray-700">
                      <span>
                        {w.name} — {formatDate(w.startDate)}–{formatDate(w.endDate)}
                      </span>
                      <span>{formatPrice(w.price)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setStep('form')}
                  className="w-full py-3 px-6 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#4b9cd3' }}
                >
                  Continue to Registration →
                </button>
              </div>
            )}
          </div>
        )}

        {(step === 'form' || step === 'submitting') && (
          <div className="max-w-2xl mx-auto">
            {/* Summary */}
            <div className="border border-gray-100 rounded-xl p-6 bg-gray-50 mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-900">Your Selected Weeks</span>
                <button
                  onClick={() => setStep('select')}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  ← Change
                </button>
              </div>
              <ul className="space-y-1 mb-3">
                {selectedWeekDetails.map((w) => (
                  <li key={w.id} className="flex justify-between text-sm text-gray-700">
                    <span>
                      {w.name} — {formatDate(w.startDate)}–{formatDate(w.endDate)}
                    </span>
                    <span>{formatPrice(w.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-gray-900">
                <span>Total</span>
                <span>{formatPrice(totalPrice())}</span>
              </div>
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Player &amp; Parent Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Parent Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Parent Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.parentEmail}
                    onChange={(e) => setForm({ ...form, parentEmail: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Parent Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.parentPhone}
                  onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                  placeholder="(555) 000-0000"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Player Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.playerName}
                    onChange={(e) => setForm({ ...form, playerName: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                    placeholder="Player's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    required
                    value={form.playerDob}
                    onChange={(e) => setForm({ ...form, playerDob: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                  />
                </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={step === 'submitting'}
                  className="w-full py-4 px-6 text-base font-semibold text-white rounded-lg transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: '#4b9cd3' }}
                >
                  {step === 'submitting' ? 'Redirecting to Payment...' : `Register & Pay ${formatPrice(totalPrice())}`}
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  You will be redirected to Stripe&apos;s secure checkout page to complete payment.
                </p>
              </div>
            </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

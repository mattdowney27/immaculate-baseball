'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CampWeekRef {
  id: string
  name: string
  startDate: string
  endDate: string
}

interface RegistrationCampWeek {
  id: string
  campWeekId: string
  campWeek: CampWeekRef
}

interface RegistrationData {
  id: string
  parentName: string
  parentEmail: string
  parentPhone: string
  playerName: string
  playerAge: number
  status: string
  notes: string
  stripeSessionId: string
  campWeeks: RegistrationCampWeek[]
}

interface Props {
  registration: RegistrationData
  allCampWeeks: CampWeekRef[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function RegistrationEditForm({ registration, allCampWeeks }: Props) {
  const router = useRouter()

  const [form, setForm] = useState({
    parentName: registration.parentName,
    parentEmail: registration.parentEmail,
    parentPhone: registration.parentPhone,
    playerName: registration.playerName,
    playerAge: String(registration.playerAge),
    status: registration.status,
    notes: registration.notes,
  })

  const [campWeeks, setCampWeeks] = useState<RegistrationCampWeek[]>(registration.campWeeks)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [addWeekId, setAddWeekId] = useState('')

  const assignedIds = campWeeks.map((rcw) => rcw.campWeekId)
  const availableToAdd = allCampWeeks.filter((w) => !assignedIds.includes(w.id))

  async function handleSave() {
    setSaving(true)
    setError('')
    setSaved(false)

    try {
      const res = await fetch(`/api/admin/registrations/${registration.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to save')
      } else {
        setSaved(true)
        router.refresh()
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  async function handleAddWeek() {
    if (!addWeekId) return
    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/registrations/${registration.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addCampWeekId: addWeekId }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to add week')
      } else {
        setCampWeeks(data.campWeeks)
        setAddWeekId('')
        router.refresh()
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  async function handleRemoveWeek(campWeekId: string) {
    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/registrations/${registration.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ removeCampWeekId: campWeekId }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to remove week')
      } else {
        setCampWeeks(data.campWeeks)
        router.refresh()
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
          Changes saved successfully.
        </div>
      )}

      {/* Registration Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-5">Registration Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
              Parent Name
            </label>
            <input
              type="text"
              value={form.parentName}
              onChange={(e) => setForm({ ...form, parentName: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
              Parent Email
            </label>
            <input
              type="email"
              value={form.parentEmail}
              onChange={(e) => setForm({ ...form, parentEmail: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
              Parent Phone
            </label>
            <input
              type="tel"
              value={form.parentPhone}
              onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
              Player Name
            </label>
            <input
              type="text"
              value={form.playerName}
              onChange={(e) => setForm({ ...form, playerName: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
              Player Age
            </label>
            <input
              type="number"
              min="5"
              max="18"
              value={form.playerAge}
              onChange={(e) => setForm({ ...form, playerAge: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 bg-white"
            >
              <option value="PENDING">PENDING</option>
              <option value="PAID">PAID</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        </div>

        {registration.stripeSessionId && (
          <div className="mt-5 pt-5 border-t border-gray-100">
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
              Stripe Session ID
            </label>
            <code className="text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded block break-all">
              {registration.stripeSessionId}
            </code>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Internal Notes</h2>
        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none"
          placeholder="Internal notes (not visible to registrant)..."
        />
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: '#4b9cd3' }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Camp weeks */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-5">Camp Weeks</h2>

        {campWeeks.length === 0 ? (
          <p className="text-sm text-gray-400 mb-4">No camp weeks assigned.</p>
        ) : (
          <ul className="space-y-2 mb-5">
            {campWeeks.map((rcw) => (
              <li
                key={rcw.id}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
              >
                <span className="text-sm text-gray-700">
                  <span className="font-medium">{rcw.campWeek.name}</span>
                  <span className="text-gray-400 ml-2 text-xs">
                    {formatDate(rcw.campWeek.startDate)} – {formatDate(rcw.campWeek.endDate)}
                  </span>
                </span>
                <button
                  onClick={() => handleRemoveWeek(rcw.campWeekId)}
                  disabled={saving}
                  className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {availableToAdd.length > 0 && (
          <div className="flex gap-3 items-center">
            <select
              value={addWeekId}
              onChange={(e) => setAddWeekId(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white"
            >
              <option value="">Add a camp week...</option>
              {availableToAdd.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} — {formatDate(w.startDate)}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddWeek}
              disabled={!addWeekId || saving}
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-50 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#4b9cd3' }}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

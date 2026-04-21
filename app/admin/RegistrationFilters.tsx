'use client'

import Link from 'next/link'

type CampWeek = { id: string; name: string }

export default function RegistrationFilters({
  campWeeks,
  campWeekId,
  status,
  resultCount,
}: {
  campWeeks: CampWeek[]
  campWeekId?: string
  status?: string
  resultCount: number
}) {
  function navigate(key: string, value: string) {
    const url = new URL(window.location.href)
    if (value) {
      url.searchParams.set(key, value)
    } else {
      url.searchParams.delete(key)
    }
    window.location.href = url.toString()
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>

        <select
          defaultValue={campWeekId || ''}
          onChange={(e) => navigate('campWeekId', e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none bg-white"
        >
          <option value="">All Camp Weeks</option>
          {campWeeks.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>

        <select
          defaultValue={status || ''}
          onChange={(e) => navigate('status', e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none bg-white"
        >
          <option value="">All Statuses</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        {(campWeekId || status) && (
          <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-700 underline">
            Clear filters
          </Link>
        )}

        <span className="text-xs text-gray-400 ml-auto">
          {resultCount} result{resultCount !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}

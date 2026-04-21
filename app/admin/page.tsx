import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'
import AdminLogoutButton from '@/components/AdminLogoutButton'
import RegistrationFilters from './RegistrationFilters'

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ campWeekId?: string; status?: string }>
}) {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const { campWeekId, status } = await searchParams

  const [campWeeks, registrations] = await Promise.all([
    prisma.campWeek.findMany({ where: { isActive: true }, orderBy: { startDate: 'asc' } }),
    prisma.registration.findMany({
      where: {
        ...(status && { status: status as 'PENDING' | 'PAID' | 'CANCELLED' }),
        ...(campWeekId && {
          campWeeks: { some: { campWeekId } },
        }),
      },
      include: {
        campWeeks: { include: { campWeek: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const stats = {
    total: await prisma.registration.count(),
    paid: await prisma.registration.count({ where: { status: 'PAID' } }),
    pending: await prisma.registration.count({ where: { status: 'PENDING' } }),
    cancelled: await prisma.registration.count({ where: { status: 'CANCELLED' } }),
  }

  function formatDate(d: Date) {
    return new Date(d).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const statusColors: Record<string, string> = {
    PAID: 'bg-green-100 text-green-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    CANCELLED: 'bg-red-100 text-red-700',
  }

  return (
    <div>
      {/* Admin header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: '#4b9cd3' }}
            >
              IB
            </div>
            <span className="font-semibold text-gray-900 text-sm">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← View Site
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Registrations', value: stats.total },
            { label: 'Paid', value: stats.paid, color: 'text-green-600' },
            { label: 'Pending', value: stats.pending, color: 'text-yellow-600' },
            { label: 'Cancelled', value: stats.cancelled, color: 'text-red-500' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className={`text-2xl font-bold mb-1 ${s.color || 'text-gray-900'}`}>
                {s.value}
              </div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <RegistrationFilters
          campWeeks={campWeeks}
          campWeekId={campWeekId}
          status={status}
          resultCount={registrations.length}
        />

        {/* Registrations table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {registrations.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">No registrations found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Parent
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Camp Week(s)
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-medium text-gray-900">{reg.playerName}</div>
                        <div className="text-xs text-gray-400">Age {reg.playerAge}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-gray-700">{reg.parentName}</div>
                        <div className="text-xs text-gray-400">{reg.parentEmail}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {reg.campWeeks.map((rcw) => (
                            <span
                              key={rcw.id}
                              className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
                            >
                              {rcw.campWeek.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[reg.status]}`}
                        >
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs">
                        {formatDate(reg.createdAt)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/registrations/${reg.id}`}
                          className="text-xs font-medium hover:underline"
                          style={{ color: '#4b9cd3' }}
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

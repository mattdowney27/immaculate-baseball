import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'
import RegistrationEditForm from './RegistrationEditForm'

export default async function RegistrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const { id } = await params

  const [registration, campWeeks] = await Promise.all([
    prisma.registration.findUnique({
      where: { id },
      include: { campWeeks: { include: { campWeek: true } } },
    }),
    prisma.campWeek.findMany({ where: { isActive: true }, orderBy: { startDate: 'asc' } }),
  ])

  if (!registration) notFound()

  return (
    <div>
      {/* Admin header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-3">
          <Link
            href="/admin"
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs text-gray-700 font-medium">{registration.playerName}</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{registration.playerName}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Registered{' '}
              {new Date(registration.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              registration.status === 'PAID'
                ? 'bg-green-100 text-green-700'
                : registration.status === 'PENDING'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {registration.status}
          </span>
        </div>

        <RegistrationEditForm
          registration={{
            id: registration.id,
            parentName: registration.parentName,
            parentEmail: registration.parentEmail,
            parentPhone: registration.parentPhone,
            playerName: registration.playerName,
            playerDob: registration.playerDob,
            status: registration.status,
            notes: registration.notes ?? '',
            stripeSessionId: registration.stripeSessionId ?? '',
            campWeeks: registration.campWeeks.map((rcw) => ({
              id: rcw.id,
              campWeekId: rcw.campWeekId,
              campWeek: {
                id: rcw.campWeek.id,
                name: rcw.campWeek.name,
                startDate: rcw.campWeek.startDate.toISOString(),
                endDate: rcw.campWeek.endDate.toISOString(),
              },
            })),
          }}
          allCampWeeks={campWeeks.map((w) => ({
            id: w.id,
            name: w.name,
            startDate: w.startDate.toISOString(),
            endDate: w.endDate.toISOString(),
          }))}
        />
      </div>
    </div>
  )
}

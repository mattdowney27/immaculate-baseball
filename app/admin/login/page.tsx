import type { Metadata } from 'next'
import AdminLoginClient from './AdminLoginClient'

export const metadata: Metadata = {
  title: 'Admin Login | Immaculate Baseball',
}

export default function AdminLoginPage() {
  return <AdminLoginClient />
}

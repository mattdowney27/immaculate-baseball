import type { Metadata } from 'next'
import SummerCampClient from './SummerCampClient'

export const metadata: Metadata = {
  title: 'Summer Camp 2026 | Immaculate Baseball Academy',
  description:
    'Register for Immaculate Baseball Academy Summer Camp 2026. Weekly sessions June through August in Weston, Florida. Limited spots available.',
}

export default function SummerCampPage() {
  return <SummerCampClient />
}

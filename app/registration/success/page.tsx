import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registration Confirmed | Immaculate Baseball Academy',
}

export default function RegistrationSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: '#e8f4fc' }}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="#4b9cd3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">You&apos;re Registered!</h1>
      <p className="text-gray-600 mb-3 leading-relaxed">
        Thank you for registering for Immaculate Baseball Academy Summer Camp 2026. Your spot is
        confirmed and payment has been received.
      </p>
      <p className="text-gray-500 text-sm mb-10">
        A confirmation receipt was sent to the email address you provided. If you have any
        questions, reach out at{' '}
        <a href="mailto:info@immaculatebaseball.com" className="underline">
          info@immaculatebaseball.com
        </a>{' '}
        or call{' '}
        <a href="tel:9545550100" className="underline">
          (954) 555-0100
        </a>
        .
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#4b9cd3' }}
      >
        Back to Home
      </Link>
    </div>
  )
}

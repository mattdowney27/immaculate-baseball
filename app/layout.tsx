import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://immaculatebaseball.com'),
  title: 'Immaculate Baseball Academy',
  description:
    "South Florida's premier baseball development academy. Built on discipline, deliberate mechanics, and the relentless pursuit of mastery.",
  keywords: 'baseball, baseball development, baseball academy, South Florida, Weston, baseball training',
  openGraph: {
    title: 'Immaculate Baseball Academy',
    description: "South Florida's premier baseball development academy. Built on discipline, deliberate mechanics, and the relentless pursuit of mastery.",
    url: '/',
    siteName: 'Immaculate Baseball Academy',
    images: [{ url: '/logo.png', alt: 'Immaculate Baseball Academy' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immaculate Baseball Academy',
    description: "South Florida's premier baseball development academy.",
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

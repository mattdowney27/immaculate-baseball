'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/summer-camp', label: 'Summer Camp' },
  { href: '/contact', label: 'Contact' },
]

const BLUE = '#4b9cd3'
const HEADER_H = 68

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: HEADER_H,
        backgroundColor: '#fff',
        borderBottom: '1px solid #f3f4f6',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          maxWidth: 1152,
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link href="/" onClick={() => setOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <img src="/logo.png" alt="Immaculate Baseball" style={{ height: 60, width: 'auto', display: 'block' }} />
          </Link>

          <nav className="ib-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href
              return (
                <Link key={link.href} href={link.href} style={{
                  padding: '10px 18px', borderRadius: 8, fontSize: 15, fontWeight: 600,
                  textDecoration: 'none',
                  color: active ? '#fff' : '#374151',
                  backgroundColor: active ? BLUE : 'transparent',
                }}>
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Hamburger button — fixed outside header to avoid sticky stacking context blocking taps */}
      <div className="ib-hamburger" style={{ position: 'fixed', top: 16, right: 16, zIndex: 999999, pointerEvents: 'auto' }}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: open ? '#fff' : '#4b9cd3',
            border: open ? '1px solid #4b9cd3' : 'none',
            borderRadius: 8,
            cursor: 'pointer',
            color: open ? '#4b9cd3' : '#fff',
            padding: 0,
            touchAction: 'manipulation',
            pointerEvents: 'auto',
          }}
        >
          <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            {open
              ? <path d="M6 18L18 6M6 6l12 12" />
              : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile nav — floating panel below header */}
      {open && (
        <div style={{
          position: 'fixed',
          top: HEADER_H + 8,
          left: 12,
          right: 12,
          zIndex: 99999,
          backgroundColor: '#fff',
          border: '1px solid #f3f4f6',
          borderRadius: '0 0 20px 20px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}>
          {NAV_LINKS.map((link, i) => {
            const active = pathname === link.href
            const isLast = i === NAV_LINKS.length - 1
            return (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="ib-nav-item"
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  borderBottom: isLast ? 'none' : '1px solid #f3f4f6',
                  fontSize: 15,
                  fontWeight: active ? 500 : 400,
                  textDecoration: 'none',
                  color: active ? BLUE : '#374151',
                  backgroundColor: active ? '#f5f9fd' : '#fff',
                }}>
                {link.label}
              </Link>
            )
          })}
        </div>
      )}

      <style>{`
        .ib-desktop-nav { display: flex !important; }
        .ib-hamburger   { display: none !important; }
        .ib-nav-item:hover,
        .ib-nav-item:active { background-color: #f3f4f6 !important; }
        @media (max-width: 767px) {
          .ib-desktop-nav { display: none !important; }
          .ib-hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  )
}

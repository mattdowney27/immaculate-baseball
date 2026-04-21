import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4b9cd3' }}>
                <span className="text-white font-bold text-sm">IB</span>
              </div>
              <span className="font-bold text-white text-lg">Immaculate Baseball</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              South Florida&apos;s premier youth baseball development academy. Built on discipline,
              deliberate mechanics, and the relentless pursuit of mastery.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Pages</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/philosophy', label: 'Philosophy' },
                { href: '/summer-camp', label: 'Summer Camp' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Weston, Florida (Broward County)</li>
              <li>
                <a href="tel:9545550100" className="hover:text-white transition-colors">
                  (954) 555-0100
                </a>
              </li>
              <li>
                <a href="mailto:info@immaculatebaseball.com" className="hover:text-white transition-colors">
                  info@immaculatebaseball.com
                </a>
              </li>
              <li className="pt-1">
                Mon–Fri: 3:30 PM – 9:00 PM
                <br />
                Sat–Sun: 8:00 AM – 5:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Immaculate Baseball Academy. All rights reserved.</span>
          <Link href="/admin" className="hover:text-gray-400 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}

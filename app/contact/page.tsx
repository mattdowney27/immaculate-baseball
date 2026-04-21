import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Immaculate Baseball Academy',
  description:
    'Get in touch with Immaculate Baseball Academy. Located in Weston, Florida.',
}

export default function ContactPage() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#4b9cd3' }}
          >
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
            Whether you&apos;re signing up for your first session, asking about our programs, or
            interested in private coaching — we&apos;re here to help. Reach out and we&apos;ll
            respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Academy Information</h2>

            <div className="space-y-8">
              <div>
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: '#4b9cd3' }}
                >
                  Location
                </div>
                <p className="text-gray-700">Weston, Florida</p>
                <p className="text-gray-500 text-sm">Broward County, South Florida</p>
              </div>

              <div>
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: '#4b9cd3' }}
                >
                  Phone
                </div>
                <a
                  href="tel:9545550100"
                  className="text-gray-700 hover:text-gray-900 transition-colors text-lg font-medium"
                >
                  (954) 555-0100
                </a>
              </div>

              <div>
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: '#4b9cd3' }}
                >
                  Email
                </div>
                <a
                  href="mailto:info@immaculatebaseball.com"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  info@immaculatebaseball.com
                </a>
              </div>

              <div>
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: '#4b9cd3' }}
                >
                  Hours
                </div>
                <div className="space-y-1 text-gray-700 text-sm">
                  <div className="flex justify-between max-w-xs">
                    <span>Monday – Friday</span>
                    <span className="text-gray-500">3:30 PM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between max-w-xs">
                    <span>Saturday – Sunday</span>
                    <span className="text-gray-500">8:00 AM – 5:00 PM</span>
                  </div>
                  <div className="pt-2 text-gray-500 text-xs">
                    Private training available by appointment 7 days a week
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send a Message</h2>
            <form
              action="mailto:info@immaculatebaseball.com"
              method="GET"
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
                  style={{ '--tw-ring-color': '#4b9cd3' } as React.CSSProperties}
                  placeholder="Parent or guardian name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
                  placeholder="(555) 000-0000"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-white"
                >
                  <option value="">Select a topic...</option>
                  <option value="summer-camp">Summer Camp Registration</option>
                  <option value="private-lessons">Private Lessons</option>
                  <option value="programs">Programs & Pricing</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="body"
                  rows={5}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow resize-none"
                  placeholder="Tell us about your player and how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#4b9cd3' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: 'What age groups does the academy serve?',
                a: "We work with players of all ages. Placement is skill-based, not age-based. Every new player goes through an assessment to determine the right tier — whether that's Fundamentals, Developmental, or Advanced.",
              },
              {
                q: 'My child has no prior baseball experience. Is that okay?',
                a: "Absolutely. Our Fundamentals program is designed precisely for this. Every player — regardless of experience — starts by learning and mastering proper mechanics. There are no shortcuts, and that's the point.",
              },
              {
                q: 'Do you offer private lessons?',
                a: 'Yes. Private one-on-one sessions are available for hitting, pitching, fielding, and catching. Contact us to schedule.',
              },
              {
                q: 'How do I register for summer camp?',
                a: 'Visit our Summer Camp page to select your preferred weeks, fill out the registration form, and complete payment through Stripe.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

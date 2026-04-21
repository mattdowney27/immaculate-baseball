import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Immaculate Baseball Academy',
  description:
    'Learn about Immaculate Baseball Academy — our mission, coaching staff, and the facility in Weston, Florida.',
}

export default function AboutPage() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#4b9cd3' }}
          >
            About the Academy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Where Baseball Players Are Made
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Immaculate Baseball is built around true player development. Every session is
            intentional, focused, and driven by the work required to improve. Our players show up
            ready to train with purpose, understanding that mastery comes from consistent,
            disciplined repetition.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#4b9cd3' }}
            >
              Our Mission
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Developing the Complete Baseball Player
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Our mission is straightforward: develop complete baseball players through deliberate,
              mechanics-first training. We believe that development comes from attempting difficult
              things, failing, and trying again — with proper technique every time.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              Every player who walks through our doors is assessed, placed at the right skill tier,
              and challenged at the edge of their ability. No exceptions. No shortcuts.
              No one advances without earning it.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The result is a player who doesn&apos;t just perform — they understand the game,
              execute under pressure, and carry the right habits into every at-bat, every inning,
              every season.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                title: 'Skill-Based Placement',
                desc: "Every new player is assessed and placed into the appropriate tier based on skill alone. Advancement is earned, not handed out.",
              },
              {
                title: 'Premium Indoor Facility',
                desc: 'Our Weston, Florida facility features full-length batting cages, regulation pitching mounds, an infield training zone, conditioning area, and climate-controlled training year-round.',
              },
              {
                title: 'Video Analysis',
                desc: 'Camera systems for swing and pitching mechanics review help players see what they cannot feel, accelerating the feedback loop between coach and athlete.',
              },
              {
                title: 'Six Days a Week',
                desc: "Serious development requires serious frequency. We train six days a week across morning, afternoon, and evening sessions — so players can fit development into any schedule.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-1.5 rounded-full mt-1.5"
                  style={{ backgroundColor: '#4b9cd3', height: '100%', minHeight: '20px' }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#4b9cd3' }}
            >
              The Facility
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for High-Level Baseball Development
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Located in Weston, Florida — a fully equipped, climate-controlled training environment
              designed to replicate professional-grade development conditions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Indoor Batting Cages',
                desc: 'Multiple full-length cages with pitching machines and live pitching setups.',
              },
              {
                title: 'Pitching Mounds',
                desc: 'Regulation mounds for bullpen work at all standard pitching heights.',
              },
              {
                title: 'Infield Training Zone',
                desc: 'Dedicated surface for groundball work, footwork drills, and defensive positioning.',
              },
              {
                title: 'Conditioning Area',
                desc: 'Agility ladders, medicine balls, plyometric boxes, and sprint lanes.',
              },
              {
                title: 'Climate Controlled',
                desc: 'Train comfortably year-round regardless of South Florida weather.',
              },
              {
                title: 'Video Analysis',
                desc: 'Camera systems for swing and pitching mechanics review and feedback.',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Register for this summer&apos;s camp or reach out to learn more about the academy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/summer-camp"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold rounded-lg text-white transition-colors"
            style={{ backgroundColor: '#4b9cd3' }}
          >
            View Summer Camp
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold rounded-lg border border-gray-200 text-gray-700 hover:border-gray-300 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

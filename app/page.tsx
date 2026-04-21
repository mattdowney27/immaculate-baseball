import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #4b9cd3 0, #4b9cd3 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36">
          <div className="max-w-3xl">
            <div
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(75,156,211,0.2)', color: '#4b9cd3' }}
            >
              Baseball Player Development
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Train With Purpose.
              <br />
              <span style={{ color: '#4b9cd3' }}>Play Immaculate.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              South Florida&apos;s premier youth baseball development academy. Built on discipline,
              deliberate mechanics, and the relentless pursuit of mastery — one rep at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/summer-camp"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg transition-colors text-white"
                style={{ backgroundColor: '#4b9cd3' }}
              >
                Register for Summer Camp
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg border border-gray-600 text-gray-200 hover:border-gray-400 hover:text-white transition-colors"
              >
                Learn About the Academy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '3', label: 'Skill-Based Tiers' },
              { stat: '6', label: 'Training Days / Week' },
              { stat: '100%', label: 'Mechanics-First' },
              { stat: 'Weston, FL', label: 'Broward County' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-2xl font-bold text-gray-900">{item.stat}</div>
                <div className="text-sm text-gray-500 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built on Three Non-Negotiables</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Every rep, every session, every player — held to the same standard.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              number: '01',
              title: 'Attitude & Effort',
              description:
                'Physical and mental mistakes are part of growth. What is never acceptable: lack of effort, lack of focus, or unwillingness to be coached.',
            },
            {
              number: '02',
              title: 'Mechanics Over Everything',
              description:
                'Proper mechanics are the foundation of long-term development and arm health. Every rep is deliberate. Volume without quality creates habits that are hard to break.',
            },
            {
              number: '03',
              title: 'Baseball IQ & Anticipation',
              description:
                "Great players know where the ball is going before it's hit. We train defensive anticipation, pitch-by-pitch awareness, and situational intelligence from day one.",
            },
          ].map((pillar) => (
            <div
              key={pillar.number}
              className="border border-gray-100 rounded-xl p-8 hover:border-gray-200 transition-colors"
            >
              <div
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: '#4b9cd3' }}
              >
                Pillar {pillar.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Summer Camp CTA */}
      <section className="py-20" style={{ backgroundColor: '#4b9cd3' }}>
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            2026 Summer Camp Registration Is Open
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Limited spots available. Weekly sessions running June through August. Register early to
            secure your player&apos;s week.
          </p>
          <Link
            href="/summer-camp"
            className="inline-flex items-center justify-center px-10 py-4 bg-white font-semibold rounded-lg transition-colors text-gray-900 hover:bg-gray-50"
          >
            View Camp Weeks &amp; Register
          </Link>
        </div>
      </section>

      {/* Philosophy teaser */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#4b9cd3' }}
            >
              Our Approach
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Skill-Based Progression, Not Age-Based
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Every player — regardless of age — starts by proving they can execute the basics
              correctly. We don&apos;t hand out advancement. Players earn it through consistent,
              correct execution.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              This system mirrors the discipline of martial arts. Progress is earned, not assumed.
              That&apos;s what makes it mean something.
            </p>
            <Link
              href="/philosophy"
              className="inline-flex items-center font-semibold text-sm transition-colors"
              style={{ color: '#4b9cd3' }}
            >
              Read Our Full Philosophy
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { level: 'Level 01', title: 'Fundamentals', desc: 'Zero shortcuts. Master the basics first.' },
              { level: 'Level 02', title: 'Developmental', desc: 'Live reps under real pressure.' },
              { level: 'Level 03', title: 'Advanced', desc: 'High-level strategy and execution.' },
              { level: 'Level ∞', title: 'Mastery', desc: 'No one graduates from discipline.' },
            ].map((level) => (
              <div key={level.level} className="rounded-xl p-5 bg-blue-50">
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: '#4b9cd3' }}
                >
                  {level.level}
                </div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{level.title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{level.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Philosophy | Immaculate Baseball Academy',
  description:
    'Our training philosophy: mechanics-first, skill-based progression, deliberate repetition, and baseball IQ development.',
}

export default function PhilosophyPage() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#4b9cd3' }}
          >
            Our Philosophy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            How We Develop Players
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Progress in baseball comes from attempting difficult things, failing, and trying again.
            Players are encouraged to take chances — because failure, when paired with effort, moves
            them closer to mastery.
          </p>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#4b9cd3' }}
          >
            Foundation
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Three Non-Negotiables</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              number: '01',
              title: 'Attitude & Effort',
              body: [
                'Physical and mental mistakes are acceptable when a player is genuinely improving.',
                'What is non-negotiable: effort, focus, and the willingness to be coached.',
                "When a mistake happens: let it go, reset, and prepare for the next play.",
              ],
            },
            {
              number: '02',
              title: 'Mechanics Over Everything',
              body: [
                'Proper mechanics are the foundation of long-term development and arm health.',
                'Players never develop bad habits through volume — every rep is deliberate.',
                'A strong arm with bad mechanics is a higher injury risk than a weaker arm with clean mechanics.',
              ],
            },
            {
              number: '03',
              title: 'Baseball IQ & Anticipation',
              body: [
                'Great players know where the ball is going before it\'s hit.',
                'We train defensive anticipation, pitch-by-pitch awareness, and offensive situational intelligence.',
                'This discipline applies regardless of age or skill level.',
              ],
            },
          ].map((pillar) => (
            <div key={pillar.number} className="border border-gray-100 rounded-xl p-8">
              <div
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: '#4b9cd3' }}
              >
                Pillar {pillar.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-5">{pillar.title}</h3>
              <ul className="space-y-3">
                {pillar.body.map((line, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <span
                      className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                      style={{ backgroundColor: '#4b9cd3' }}
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skill-based progression */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#4b9cd3' }}
            >
              The Immaculate System
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Skill-Based Progression — Not Age-Based
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The system mirrors the discipline of martial arts. Players progress by earning it —
              not aging into it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                level: 'Level 01',
                title: 'Fundamentals',
                sub: 'Entry Level · All Ages',
                desc: 'Throwing mechanics, catching, basic batting, and athletic positioning. Zero shortcuts. Every player — regardless of age — starts here and proves they can execute the basics correctly before moving on.',
              },
              {
                level: 'Level 02',
                title: 'Developmental',
                sub: 'Intermediate · Live Reps',
                desc: "Live pitching exposure, situational defense, base running science, and advanced hitting approach. Players are pushed to make mistakes — and learn from them under real game pressure.",
              },
              {
                level: 'Level 03',
                title: 'Advanced',
                sub: 'Elite Track · Competitive Focus',
                desc: 'Game strategy, defensive shifts, pitch sequencing, steal timing, and high-level batting approach. Advanced players still train fundamentals daily — mastery is never finished.',
              },
              {
                level: 'Level ∞',
                title: 'The Immaculate Standard',
                sub: 'Continuous · No Graduation',
                desc: "No player graduates from discipline, repetition, or accountability. The best players in the world take BP every day. So do ours.",
              },
            ].map((level) => (
              <div
                key={level.level}
                className="bg-white rounded-xl p-8 border border-gray-100 flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: '#4b9cd3' }}
                  >
                    {level.level.replace('Level ', '')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    {level.sub}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{level.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{level.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training principles */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#4b9cd3' }}
          >
            How We Train
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Seven Training Principles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {[
            {
              num: '1',
              title: 'Deliberate Repetition',
              desc: 'Thousands of reps — but only with proper mechanics. Bad reps are stopped, corrected, and restarted. Volume without quality creates habits that are hard to break.',
            },
            {
              num: '2',
              title: 'Arm Development First',
              desc: 'Throwing mechanics come before everything else. We build arm health through long toss programming, shoulder exercises, and structured bullpen progressions.',
            },
            {
              num: '3',
              title: 'Baseball Intelligence',
              desc: 'Knowing where the ball will be hit before it\'s hit. Reading the pitcher. Understanding defensive shifts. Baseball IQ is trained like every other skill — deliberately and consistently.',
            },
            {
              num: '4',
              title: 'KISS Defense',
              desc: "Keep It Simple. Catch groundballs. Catch flyballs. Always in proper mechanics, never lazily. Repetition builds anticipation. Anticipation builds confidence. Confidence wins games.",
            },
            {
              num: '5',
              title: 'Present-Moment Focus',
              desc: 'Every step on the field demands 100% presence. No mental drift. No replaying the last play. Reset, focus, execute. This mindset is trained, not assumed.',
            },
            {
              num: '6',
              title: 'Performance Accountability',
              desc: "We track what matters: strike percentages, walk rates, stolen base attempts, defensive anticipation reads, pitch count efficiency. Development is measured, not guessed.",
            },
          ].map((principle) => (
            <div key={principle.num} className="flex gap-5">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: '#4b9cd3' }}
              >
                {principle.num}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{principle.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{principle.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            See the Philosophy in Action
          </h2>
          <p className="text-gray-400 mb-8">
            Register your player for this summer&apos;s camp and experience the Immaculate approach
            firsthand.
          </p>
          <Link
            href="/summer-camp"
            className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-lg text-white transition-colors"
            style={{ backgroundColor: '#4b9cd3' }}
          >
            View Summer Camp
          </Link>
        </div>
      </section>
    </div>
  )
}

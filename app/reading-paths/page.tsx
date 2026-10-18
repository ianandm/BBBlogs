'use client'

import Link from 'next/link'
import { startTransition, useEffect, useRef, useState } from 'react'
import './reading-paths.css'

type ReadingPlan = {
  id: string
  title: string
  level: string
  duration: string
  bookCount: number
  tagline: string
  description: string
  goals: string[]
  steps: { weeks: string; book: string; instruction: string }[]
}

const starterPaths = [
  { level: 'Beginner', title: 'New to Bhakti', description: 'A gentle introduction to devotional practice and philosophy', books: 8, duration: '2–3 months' },
  { level: 'Intermediate', title: 'Build Inner Strength', description: 'Develop resilience through spiritual wisdom and practice', books: 12, duration: '3–4 months' },
  { level: 'All Ages', title: 'Stories for Children', description: 'Sacred narratives that inspire young minds', books: 15, duration: 'Ongoing' },
  { level: 'All Levels', title: 'Gita for Daily Life', description: 'Apply timeless teachings to modern challenges', books: 10, duration: '4–6 months' },
  { level: 'Advanced', title: 'Devotional Deep Dive', description: 'Immerse yourself in advanced bhakti practices', books: 20, duration: '6–12 months' },
]

const plans: ReadingPlan[] = [
  {
    id: 'complete-beginner', title: 'The Complete Beginner', level: 'Beginner', duration: '3 months', bookCount: 4,
    tagline: 'Start from zero, arrive at clarity.',
    description: 'Never read Vedic literature before? This path eases you in gently — beginning with conversational texts before moving to the foundational scriptures.',
    goals: ['Understanding of karma and the soul', 'A foundation in Bhakti philosophy', 'A personal daily spiritual practice'],
    steps: [
      { weeks: 'Weeks 1–2', book: 'Perfect Questions, Perfect Answers', instruction: 'Read chapters 1–4, focusing on the basics of consciousness.' },
      { weeks: 'Weeks 3–5', book: 'The Science of Self-Realization', instruction: 'Read selected chapters on karma and the self.' },
      { weeks: 'Weeks 6–10', book: 'Bhagavad Gita As It Is', instruction: 'Read with the purports; keep a reflection journal.' },
      { weeks: 'Weeks 11–12', book: 'The Journey Home', instruction: "Use the memoir to consolidate what you've learned." },
    ],
  },
  {
    id: 'devotion-bhakti', title: 'Devotion & Bhakti', level: 'Intermediate', duration: '4 months', bookCount: 5,
    tagline: 'Deepen your relationship with the Divine.',
    description: 'For readers who have read the Gita and want to go deeper into the practice and philosophy of Bhakti-yoga.',
    goals: ['An established personal devotional practice', 'Deeper understanding of Bhakti-yoga', "Connection to Lord Chaitanya's tradition"],
    steps: [
      { weeks: 'Weeks 1–3', book: 'Nectar of Devotion', instruction: 'Study the 64 limbs of Bhakti; practice one daily.' },
      { weeks: 'Weeks 4–6', book: 'Teachings of Lord Chaitanya', instruction: 'Understand acintya-bhedabheda.' },
      { weeks: 'Weeks 7–10', book: 'Srimad Bhagavatam, First Canto', instruction: 'Read with commentary; focus on the invocation verses.' },
      { weeks: 'Weeks 11–14', book: 'Krishna Book', instruction: "Meditate on Krishna's pastimes as devotional practice." },
      { weeks: 'Weeks 15–16', book: 'Krishna, the Supreme Personality', instruction: 'Integrate your understanding of the divine identity.' },
    ],
  },
  {
    id: 'leadership-purpose', title: 'Leadership & Purpose', level: 'All Levels', duration: '2 months', bookCount: 3,
    tagline: 'Ancient wisdom for the modern leader.',
    description: "Applies the Gita's guidance on duty, decision-making, and leadership to professional and personal life.",
    goals: ['Clarity on duty and right action', 'Dharma-based decision-making', 'Inner equanimity under pressure'],
    steps: [
      { weeks: 'Weeks 1–4', book: 'Bhagavad Gita As It Is', instruction: 'Focus on chapters 2, 3, and 18 (duty, action, liberation).' },
      { weeks: 'Weeks 5–6', book: 'Perfect Questions, Perfect Answers', instruction: 'Apply the answers to your own leadership questions.' },
      { weeks: 'Weeks 7–8', book: 'The Science of Self-Realization', instruction: 'Use the interviews as a model for self-inquiry at work.' },
    ],
  },
  {
    id: 'family-children', title: 'Family & Children', level: 'All Levels', duration: '2 months', bookCount: 3,
    tagline: 'Raise the next generation with wisdom.',
    description: 'For parents and families, bringing Vedic values into the home through stories, practices, and shared reading.',
    goals: ['A shared family spiritual vocabulary', 'Stories and values for children', 'Personal renewal as a parent'],
    steps: [
      { weeks: 'Weeks 1–3', book: 'Krishna Book', instruction: "Read the opening chapters together as a family; discuss Krishna's qualities." },
      { weeks: 'Weeks 4–5', book: 'The Ramayana', instruction: "Explore Rama's example of honor and duty with your children." },
      { weeks: 'Weeks 6–8', book: 'The Journey Home', instruction: "Parent's solo reading; let Radhanath Swami's journey inspire your own." },
    ],
  },
]

type SavedProgress = Record<string, boolean[]>

export default function ReadingPathsPage() {
  const [progress, setProgress] = useState<SavedProgress>({})
  const [selectedPath, setSelectedPath] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('bluishboy-reading-path-progress-v1')
      if (saved) {
        const storedProgress = JSON.parse(saved) as SavedProgress
        startTransition(() => setProgress(storedProgress))
      }
    } catch {
      // Start with empty progress when browser storage is unavailable or malformed.
    }
  }, [])

  function updateStep(planId: string, stepIndex: number, checked: boolean) {
    setProgress((current) => {
      const next = { ...current, [planId]: [...(current[planId] ?? [])] }
      next[planId][stepIndex] = checked
      try {
        window.localStorage.setItem('bluishboy-reading-path-progress-v1', JSON.stringify(next))
      } catch {
        // Keep progress available for the current visit if storage is unavailable.
      }
      return next
    })
  }

  function closeDialog() {
    dialogRef.current?.close()
    setSelectedPath('')
  }

  return (
    <div className="reading-paths">
      <div className="rp-announcement">
        <div className="rp-announcement-inner">
          <span className="rp-home-spacer" aria-hidden="true" />
          <span>Your Journey Back to Krishna Begins Here</span>
          <Link href="/" className="rp-home-link">← Home</Link>
        </div>
      </div>
      <main>
        <section className="rp-section" aria-labelledby="choose-path-title">
          <div className="rp-container">
            <div className="rp-section-heading">
              <span className="rp-kicker">Find your beginning</span>
              <h2 id="choose-path-title">Choose Your Path</h2>
              <p>Take the route that meets you where you are. You can move at your own pace, one meaningful reading at a time.</p>
            </div>
            <div className="rp-path-grid">
              {starterPaths.map((path) => (
                <article className="rp-path-card" key={path.title}>
                  <span className="rp-level">{path.level}</span>
                  <h3>{path.title}</h3>
                  <p className="rp-path-description">{path.description}</p>
                  <div className="rp-stats" aria-label={`${path.books} books, ${path.duration}, ${path.level}`}>
                    <span>📚 {path.books} books</span>
                    <span>⏱ {path.duration}</span>
                    <span>{path.level}</span>
                  </div>
                  <button className="rp-button" type="button" onClick={() => {
                    setSelectedPath(path.title)
                    dialogRef.current?.showModal()
                  }}>
                    Start Path <span aria-hidden="true">→</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rp-section rp-training" id="training-plans" aria-labelledby="training-plans-title">
          <div className="rp-container">
            <div className="rp-section-heading">
              <span className="rp-kicker">A steady step at a time</span>
              <h2 id="training-plans-title">Week-by-Week Training Plans</h2>
              <p>Four guided journeys through foundational texts. Check off each reading as you go; your progress stays on this device.</p>
            </div>
            <div className="rp-plan-list">
              {plans.map((plan) => {
                const completed = plan.steps.reduce((count, _, index) => count + (progress[plan.id]?.[index] ? 1 : 0), 0)
                return (
                  <article className="rp-plan" key={plan.id}>
                    <div className="rp-plan-aside">
                      <span className="rp-level">{plan.level} · {plan.duration} · {plan.bookCount} books</span>
                      <h3>{plan.title}</h3>
                      <p className="rp-tagline">{plan.tagline}</p>
                      <p className="rp-plan-description">{plan.description}</p>
                      <h4>You will gain</h4>
                      <ul className="rp-goals">
                        {plan.goals.map((goal) => <li key={goal}>{goal}</li>)}
                      </ul>
                    </div>
                    <div className="rp-plan-content">
                      <div className="rp-progress-label"><strong>Reading progress</strong><span aria-live="polite">{completed} of {plan.steps.length} complete</span></div>
                      <progress max={plan.steps.length} value={completed} aria-label={`${plan.title} progress`} />
                      <ol className="rp-timeline">
                        {plan.steps.map((step, index) => (
                          <li className="rp-step" key={`${plan.id}-${index}`}>
                            <input
                              id={`${plan.id}-step-${index}`}
                              type="checkbox"
                              checked={progress[plan.id]?.[index] ?? false}
                              onChange={(event) => updateStep(plan.id, index, event.target.checked)}
                            />
                            <label htmlFor={`${plan.id}-step-${index}`}>
                              <span className="rp-week">{step.weeks}</span>
                              <span className="rp-book-title">{step.book}</span>
                              <span className="rp-instruction">{step.instruction}</span>
                            </label>
                          </li>
                        ))}
                      </ol>
                      <div className="rp-plan-action">
                        <Link className="rp-button" href="/books">Start This Path <span aria-hidden="true">→</span></Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="rp-howto" aria-labelledby="howto-title">
          <div className="rp-container rp-howto-inner">
            <h2 id="howto-title">How to use a reading path</h2>
            <p><span aria-hidden="true">📖</span> Read a little daily</p>
            <p><span aria-hidden="true">✍</span> Reflect in a journal</p>
            <p><span aria-hidden="true">♡</span> Practice what you learn</p>
          </div>
        </section>
      </main>

      <footer className="rp-footer">
        <div className="rp-container">
          <p>© 2026 Bluish Boy. All rights reserved.</p>
          <p>Wisdom for the journey.</p>
        </div>
      </footer>

      <dialog
        className="rp-dialog"
        ref={dialogRef}
        aria-labelledby="rp-dialog-title"
        onClick={(event) => { if (event.target === dialogRef.current) closeDialog() }}
        onClose={() => setSelectedPath('')}
      >
        <div className="rp-dialog-content">
          <div className="rp-dialog-header">
            <div>
              <span className="rp-kicker">Your next step</span>
              <h2 id="rp-dialog-title">Week-by-week plan coming soon</h2>
            </div>
            <button className="rp-close" type="button" aria-label="Close dialog" onClick={closeDialog}>×</button>
          </div>
          <p>A detailed plan for {selectedPath || 'this path'} is in the works. In the meantime, explore the guided plans below.</p>
          <div className="rp-dialog-actions">
            <a className="rp-button" href="#training-plans" onClick={closeDialog}>View detailed plans</a>
            <button className="rp-button rp-button-secondary" type="button" onClick={closeDialog}>Keep exploring</button>
          </div>
        </div>
      </dialog>
    </div>
  )
}
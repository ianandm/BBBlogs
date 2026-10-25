'use client'

import Link from 'next/link'
import { startTransition, useEffect, useState } from 'react'

type Lesson = {
  weeks: string
  title: string
  book: string
  focus: string
  instruction: string
}

const lessons: Lesson[] = [
  {
    weeks: 'Weeks 1–2',
    title: 'Questions that begin a journey',
    book: 'Perfect Questions, Perfect Answers',
    focus: 'Start with curiosity and the nature of consciousness.',
    instruction: 'Read chapters 1–4. Notice the questions that feel most relevant to your life and write them down.',
  },
  {
    weeks: 'Weeks 3–5',
    title: 'Understanding the self',
    book: 'The Science of Self-Realization',
    focus: 'Explore the relationship between the self, action, and lasting fulfillment.',
    instruction: 'Read the selected chapters on karma and the self. At the end of each reading, note one idea you would like to revisit.',
  },
  {
    weeks: 'Weeks 6–10',
    title: 'Bringing wisdom into daily life',
    book: 'Bhagavad Gita As It Is',
    focus: 'Build a foundation in the Gita by reading steadily and reflecting on its teachings.',
    instruction: 'Read with the purports and keep a reflection journal. Take your time with each chapter rather than rushing ahead.',
  },
  {
    weeks: 'Weeks 11–12',
    title: 'Gathering the threads',
    book: 'The Journey Home',
    focus: 'Consolidate what you have learned through a personal spiritual journey.',
    instruction: 'Read the memoir and revisit your journal. Write down the ideas and practices you want to carry forward.',
  },
]

const sampleCopy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis. Reflect on the passage in your own words, connect it to the previous topic, and note one thought to carry into your next reading.'
const storageKey = 'bluishboy-new-to-bhakti-progress-v1'

export default function NewToBhaktiPage() {
  const [activeLesson, setActiveLesson] = useState(0)
  const [completed, setCompleted] = useState<boolean[]>([])

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) startTransition(() => setCompleted(parsed.map(Boolean).slice(0, lessons.length)))
      }
    } catch {
      // Keep the path usable if browser storage is unavailable or malformed.
    }
  }, [])

  function setLessonComplete(index: number, isComplete: boolean) {
    setCompleted((current) => {
      const next = lessons.map((_, lessonIndex) => lessonIndex === index ? isComplete : Boolean(current[lessonIndex]))
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        // Completion remains available for this visit if storage is unavailable.
      }
      return next
    })
  }

  const lesson = lessons[activeLesson]
  const completeCount = completed.filter(Boolean).length

  return (
    <div className="reading-paths">
      <div className="rp-announcement">
        <div className="rp-announcement-inner nbp-announcement-inner">
          <Link href="/reading-paths" className="rp-home-link nbp-back-link">← Reading Paths</Link>
          <span className="nbp-announcement-title">Your Journey Back to Krishna Begins Here</span>
          <Link href="/" className="rp-home-link nbp-home-link">Home</Link>
        </div>
      </div>

      <main>
        <section className="rp-section nbp-intro">
          <div className="rp-container">
            <p className="rp-kicker">Beginner · 3 months · 4 books</p>
            <h1>New to Bhakti</h1>
            <p className="nbp-lead">A gentle introduction to devotional practice and philosophy, guided one topic at a time.</p>
            <div className="nbp-progress-summary" aria-live="polite">
              <span>{completeCount} of {lessons.length} topics complete</span>
              <progress max={lessons.length} value={completeCount} aria-label="New to Bhakti progress" />
            </div>
          </div>
        </section>

        <section className="rp-section nbp-course" aria-label="Guided course">
          <div className="rp-container nbp-course-layout">
            <nav className="nbp-topic-nav" aria-label="Course topics">
              <p className="rp-kicker">Your learning path</p>
              <ol>
                {lessons.map((item, index) => (
                  <li key={item.title}>
                    <button
                      className={`nbp-topic${activeLesson === index ? ' is-active' : ''}`}
                      type="button"
                      aria-current={activeLesson === index ? 'step' : undefined}
                      onClick={() => setActiveLesson(index)}
                    >
                      <span className="nbp-topic-index">{completed[index] ? '✓' : String(index + 1).padStart(2, '0')}</span>
                      <span>
                        <span className="nbp-topic-weeks">{item.weeks}</span>
                        <span className="nbp-topic-title">{item.title}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="nbp-lesson" aria-live="polite">
              <p className="rp-kicker">Topic {String(activeLesson + 1).padStart(2, '0')} · {lesson.weeks}</p>
              <h2>{lesson.title}</h2>
              <p className="nbp-focus">{lesson.focus}</p>

              <div className="nbp-reading-block">
                <h3>Begin here</h3>
                <p>{sampleCopy}</p>
                <p>{sampleCopy}</p>
              </div>

              <section className="nbp-reading-block">
                <h3>Your reading</h3>
                <p className="nbp-book-name">{lesson.book}</p>
                <p>{lesson.instruction}</p>
                <p>{sampleCopy}</p>
              </section>

              <section className="nbp-reflection">
                <h3>Pause and reflect</h3>
                <p>{sampleCopy}</p>
              </section>

              <label className="nbp-complete">
                <input
                  type="checkbox"
                  checked={Boolean(completed[activeLesson])}
                  onChange={(event) => setLessonComplete(activeLesson, event.target.checked)}
                />
                <span>Mark this topic complete</span>
              </label>

              <div className="nbp-navigation">
                <button
                  className="rp-button rp-button-secondary"
                  type="button"
                  disabled={activeLesson === 0}
                  onClick={() => setActiveLesson((current) => Math.max(0, current - 1))}
                >
                  <span aria-hidden="true">←</span> Previous topic
                </button>
                {activeLesson < lessons.length - 1 ? (
                  <button
                    className="rp-button"
                    type="button"
                    onClick={() => {
                      setLessonComplete(activeLesson, true)
                      setActiveLesson((current) => Math.min(lessons.length - 1, current + 1))
                    }}
                  >
                    Next topic <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <Link className="rp-button" href="/reading-paths#training-plans">
                    Return to all plans <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="rp-footer">
        <div className="rp-container">
          <p>© 2026 Bluish Boy. All rights reserved.</p>
          <p>Wisdom for the journey.</p>
        </div>
      </footer>
    </div>
  )
}

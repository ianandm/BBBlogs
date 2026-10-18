import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | Bluish Boy',
  description: 'Learn about Bluish Boy and its mission to share the wisdom of Bhakti Yoga.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="bg-[var(--color-primary)] px-4 py-2 text-center text-sm font-medium text-white">
        Final destination for seekers of Bhakti Yoga
      </div>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <section className="max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Wisdom for the journey
          </p>
          <h1 className="mb-5">About Bluish Boy</h1>
          <p className="mb-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Bluish Boy is a place for seekers to explore the timeless wisdom of
            Bhakti Yoga and Vedic literature, one thoughtful step at a time.
          </p>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </section>
      </main>
      <footer className="mt-auto border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-[var(--color-text-secondary)] sm:px-6 lg:px-8">
          <p>© 2026 Bluish Boy. All rights reserved.</p>
          <p className="mt-2 text-sm">Wisdom for the journey.</p>
        </div>
      </footer>
    </div>
  )
}

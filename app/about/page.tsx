import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Who Are We? | Bluish Boy',
  description: 'Discover Bluish Boy’s commitment to books on Bhakti Yoga and the teachings of Srila Prabhupada and ISKCON gurus.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="bg-[var(--color-primary)] px-4 text-sm font-medium text-white">
        <div className="mx-auto grid min-h-10 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3">
          <span aria-hidden="true" />
          <span className="text-center">Final destination for seekers of Bhakti Yoga</span>
          <Link href="/" className="justify-self-end text-sm font-semibold underline-offset-4 hover:underline" style={{ color: '#fff' }}>
            ← Home
          </Link>
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <article className="max-w-3xl">
          <section className="mb-10">
            <h1 className="mb-5">Who are we?</h1>
            <p className="mb-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Welcome to Bluish Boy, the final destination where spiritual seekers and devotees find all the knowledge and guidance they need to make unwavering progress on the path of Bhakti. Bluish Boy is dedicated to the profound teachings of Srila Prabhupada and the revered gurus of the International Society for Krishna Consciousness (ISKCON).
            </p>
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              At the heart of our endeavor is a deep commitment to share the timeless wisdom encapsulated in the works of Srila Prabhupada and other ISKCON gurus. Their teachings on Bhakti Yoga, Vedic philosophy, and the path to self-realization resonate through the pages of our curated collection. Each book is a vessel of divine knowledge, offering insights into your life&apos;s purpose and the transcendental journey towards attaining bhakti or uninterrupted pure devotional service at the Lotus feet of the Lord.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4">Our vision</h2>
            <p className="mb-5 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              To be and remain the final destination for seekers of books on Bhakti Yoga written by Srila Prabhupada, his disciples and his grand disciples.
            </p>
            <blockquote className="border-l-4 border-[var(--color-accent)] py-2 pl-5 font-serif text-xl italic text-[var(--color-primary)]">
              “Final destination for books on Bhakti Yoga”
            </blockquote>
          </section>

          <section>
            <h2 className="mb-4">Our commitment</h2>
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              At Bluish Boy, we are steadfastly committed to being and remaining the ultimate destination for all books authored by the luminaries of the International Society for Krishna Consciousness (ISKCON). Our mission is to preserve and propagate the profound teachings of Srila Prabhupada, his disciples, and their successive generations.
            </p>
          </section>
        </article>
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

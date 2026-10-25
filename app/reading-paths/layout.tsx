import type { Metadata } from 'next'
import './reading-paths.css'

export const metadata: Metadata = {
  title: 'Reading Paths | Bluish Boy',
  description: 'Find your next step through guided reading paths in Vedic and Bhakti literature.',
}

export default function ReadingPathsLayout({ children }: LayoutProps<'/reading-paths'>) {
  return children
}
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New to Bhakti | Guided Reading Path | Bluish Boy',
  description: 'Begin a guided, step-by-step introduction to Bhakti practice and Vedic wisdom.',
}

export default function NewToBhaktiLayout({ children }: LayoutProps<'/reading-paths/new-to-bhakti'>) {
  return children
}

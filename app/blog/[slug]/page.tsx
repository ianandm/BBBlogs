import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'

const previousSpiritualitySlug = 'what-is-spirituality-a-simple-bhagavad-gita-guide-to-a-meaningful-life'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = (await prisma.blog.findUnique({
    where: { slug },
    select: {
      title: true,
      excerpt: true,
      status: true,
      seoTitle: true,
      seoDescription: true,
      seoPrimaryKeyword: true,
      seoRelatedKeywords: true,
      canonicalUrl: true,
    },
  })) ?? (slug === 'what-is-spirituality'
    ? await prisma.blog.findUnique({
        where: { slug: previousSpiritualitySlug },
        select: {
          title: true,
          excerpt: true,
          status: true,
          seoTitle: true,
          seoDescription: true,
          seoPrimaryKeyword: true,
          seoRelatedKeywords: true,
          canonicalUrl: true,
        },
      })
    : null)

  if (!blog || blog.status !== 'PUBLISHED') {
    return { title: 'Article not found' }
  }

  const keywords = [
    blog.seoPrimaryKeyword,
    ...(blog.seoRelatedKeywords?.split(',').map((keyword) => keyword.trim()) || []),
  ].filter((keyword): keyword is string => Boolean(keyword))

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt || undefined,
    ...(keywords.length > 0 && { keywords }),
    ...(blog.canonicalUrl && { alternates: { canonical: blog.canonicalUrl } }),
  }
}

export default async function PublicBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = (await prisma.blog.findUnique({
    where: { slug },
    include: { author: true, category: true, featuredImage: true },
  })) ?? (slug === 'what-is-spirituality'
    ? await prisma.blog.findUnique({
        where: { slug: previousSpiritualitySlug },
        include: { author: true, category: true, featuredImage: true },
      })
    : null)

  if (!blog || blog.status !== 'PUBLISHED') {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm text-[var(--color-primary)] hover:underline">
          &larr; Back to all articles
        </Link>
        <header className="mt-8 mb-8">
          {blog.category && <p className="text-sm uppercase tracking-wider text-[var(--color-accent)] mb-3">{blog.category.name}</p>}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
          {blog.subtitle && <p className="text-xl text-[var(--color-text-secondary)]">{blog.subtitle}</p>}
          <div className="meta mt-5">
            {blog.author.name && <span>{blog.author.name}</span>}
            {blog.publishedAt && <><span className="meta-divider" /><span>{formatDate(blog.publishedAt)}</span></>}
            {blog.readingTime && <><span className="meta-divider" /><span>{blog.readingTime} min read</span></>}
          </div>
        </header>
        {blog.featuredImage && (
          <img src={blog.featuredImage.url} alt={blog.featuredImage.alt || blog.title} className="w-full max-h-[28rem] object-cover rounded-lg mb-8" />
        )}
        <div className="rich-content prose prose-lg max-w-none bg-white rounded-lg p-6 md:p-10" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
    </main>
  )
}
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'

export default async function AdminBlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    redirect('/auth/login')
  }

  const { id } = await params
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: {
      author: true,
      category: true,
      featuredImage: true,
      tags: { include: { tag: true } },
    },
  })

  if (!blog) {
    notFound()
  }

  const currentBlog = blog

  async function publishBlog() {
    'use server'
    const publishSession = await getServerSession(authOptions)
    if (!publishSession?.user || (publishSession.user as { role?: string }).role !== 'admin') {
      redirect('/auth/login')
    }
    await prisma.blog.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: currentBlog.publishedAt || new Date() },
    })
    redirect(`/admin/blogs/${id}`)
  }

  async function unpublishBlog() {
    'use server'
    const unpublishSession = await getServerSession(authOptions)
    if (!unpublishSession?.user || (unpublishSession.user as { role?: string }).role !== 'admin') {
      redirect('/auth/login')
    }
    await prisma.blog.update({
      where: { id },
      data: { status: 'DRAFT', publishedAt: null },
    })
    redirect(`/admin/blogs/${id}`)
  }

  async function deleteBlog() {
    'use server'
    const deleteSession = await getServerSession(authOptions)
    if (!deleteSession?.user || (deleteSession.user as { role?: string }).role !== 'admin') {
      redirect('/auth/login')
    }
    await prisma.blog.delete({ where: { id } })
    redirect('/admin/blogs')
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/admin" className="text-sm text-[var(--color-primary)] hover:underline">
          &larr; Back to dashboard
        </Link>

        <header className="mt-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="status-badge status-published">{currentBlog.status}</span>
            {currentBlog.category && (
              <span className="text-sm text-[var(--color-text-secondary)]">
                {currentBlog.category.name}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{currentBlog.title}</h1>
          {currentBlog.subtitle && (
            <p className="text-xl text-[var(--color-text-secondary)]">{currentBlog.subtitle}</p>
          )}
          <div className="meta mt-5">
            {currentBlog.author.name && <span>{currentBlog.author.name}</span>}
            {currentBlog.publishedAt && (
              <>
                <span className="meta-divider" />
                <span>{formatDate(currentBlog.publishedAt)}</span>
              </>
            )}
            {currentBlog.readingTime && (
              <>
                <span className="meta-divider" />
                <span>{currentBlog.readingTime} min read</span>
              </>
            )}
          </div>
          {currentBlog.status !== 'PUBLISHED' && (
            <form action={publishBlog} className="mt-6 inline-block">
              <button type="submit" className="btn btn-primary">Publish blog</button>
            </form>
          )}
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href={`/admin/blogs/${id}/edit`} className="btn btn-secondary">Edit blog</Link>
            {currentBlog.status === 'PUBLISHED' && (
              <form action={unpublishBlog}>
                <button type="submit" className="btn btn-secondary">Unpublish</button>
              </form>
            )}
            <form action={deleteBlog}>
              <button type="submit" className="btn btn-secondary text-red-600">Delete blog</button>
            </form>
          </div>
        </header>

        {currentBlog.featuredImage && (
          <img
            src={currentBlog.featuredImage.url}
            alt={currentBlog.featuredImage.alt || currentBlog.title}
            className="w-full max-h-[28rem] object-cover rounded-lg mb-8"
          />
        )}

        <div
          className="rich-content prose prose-lg max-w-none bg-white rounded-lg p-6 md:p-10"
          dangerouslySetInnerHTML={{ __html: currentBlog.content }}
        />
      </article>
    </main>
  )
}
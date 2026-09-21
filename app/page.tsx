import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { prisma } from '@/lib/db'

interface Blog {
  id: string
  title: string
  subtitle?: string
  slug: string
  excerpt?: string
  featuredImage?: {
    url: string
    alt?: string
  }
  category?: {
    name: string
    slug: string
  }
  readingTime?: number
  publishedAt: string
  author?: {
    name?: string
  }
}

export const dynamic = 'force-dynamic'

async function getBlogs(): Promise<Blog[]> {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: 'PUBLISHED',
        showOnHomepage: true,
      },
      include: {
        author: true,
        category: true,
        featuredImage: true,
      },
      orderBy: { publishedAt: 'desc' },
      take: 12,
    })
    return blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      subtitle: blog.subtitle || undefined,
      excerpt: blog.excerpt || undefined,
      publishedAt: blog.publishedAt?.toISOString() || '',
      category: blog.category || undefined,
      featuredImage: blog.featuredImage ? {
        url: blog.featuredImage.url,
        alt: blog.featuredImage.alt || undefined,
      } : undefined,
      readingTime: blog.readingTime || undefined,
      author: blog.author ? { name: blog.author.name || undefined } : undefined,
    }))
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export default async function Home() {
  const blogs = await getBlogs()
  const featuredBlog = blogs[0]
  const latestBlogs = blogs.slice(1)

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="bg-[var(--color-primary)] px-4 py-2 text-center text-sm font-medium text-white">
        Final destination for seekers of Bhakti Yoga
      </div>
      <main>
        {/* Hero Banner */}
        <section className="bg-white">
          <img
            src="/BBVrindavanNew.png"
            alt="Vrindavan riverside temples at sunset"
            className="block h-auto max-h-[38rem] w-full object-cover"
          />
          <div className="border-t border-[#49A4BB]" />
        </section>

        {/* Featured Article */}
        {featuredBlog && (
          <section id="featured" className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">Featured</h2>
              <article className="card mx-auto max-w-4xl overflow-hidden hover:shadow-lg transition">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="order-2 md:order-1 p-6 flex flex-col justify-between text-left">
                    {featuredBlog.category && (
                      <Link
                        href={`/category/${featuredBlog.category.slug}`}
                        className="inline-block w-fit text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-3 hover:text-[var(--color-accent-light)]"
                      >
                        {featuredBlog.category.name}
                      </Link>
                    )}
                    <Link href={`/blog/${featuredBlog.slug}`}>
                      <h3 className="text-3xl font-bold mb-3">{featuredBlog.title}</h3>
                      <p className="text-lg text-[var(--color-text-secondary)] mb-4">
                        {featuredBlog.subtitle || featuredBlog.excerpt}
                      </p>
                    </Link>
                    <div className="meta">
                      {featuredBlog.author?.name && (
                        <span>{featuredBlog.author.name}</span>
                      )}
                      {featuredBlog.author?.name && (
                        <span className="meta-divider"></span>
                      )}
                      <span>{formatDate(featuredBlog.publishedAt)}</span>
                      {featuredBlog.readingTime && (
                        <>
                          <span className="meta-divider"></span>
                          <span>{featuredBlog.readingTime} min read</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Link href={`/blog/${featuredBlog.slug}`} className="order-1 block md:order-2">
                    {featuredBlog.featuredImage && (
                      <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
                        <img
                          src={featuredBlog.featuredImage.url}
                          alt={featuredBlog.featuredImage.alt || featuredBlog.title}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        />
                      </div>
                    )}
                  </Link>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* Latest Articles */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Latest Wisdom</h2>
            {latestBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestBlogs.map((blog) => (
                  <article key={blog.id} className="card overflow-hidden hover:shadow-lg transition flex flex-col">
                    <Link href={`/blog/${blog.slug}`} className="block">
                      {blog.featuredImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={blog.featuredImage.url}
                            alt={blog.featuredImage.alt || blog.title}
                            className="w-full h-full object-cover hover:scale-105 transition duration-300"
                          />
                        </div>
                      )}
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      {blog.category && (
                        <Link
                          href={`/category/${blog.category.slug}`}
                          className="inline-block w-fit text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-2 hover:text-[var(--color-accent-light)]"
                        >
                          {blog.category.name}
                        </Link>
                      )}
                      <Link href={`/blog/${blog.slug}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-[var(--color-primary)]">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-4 flex-grow">
                          {blog.excerpt}
                        </p>
                      </Link>
                      <div className="meta text-xs">
                        <span>{formatDate(blog.publishedAt)}</span>
                        {blog.readingTime && (
                          <>
                            <span className="meta-divider"></span>
                            <span>{blog.readingTime} min</span>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-[var(--color-text-secondary)] mb-6">
                  No published articles yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-[var(--color-text-secondary)]">
          <p>&copy; 2026 Bluish Boy. All rights reserved.</p>
          <p className="mt-2 text-sm">Wisdom for the journey.</p>
        </div>
      </footer>
    </div>
  )
}

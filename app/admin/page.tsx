'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface BlogStats {
  total: number
  drafts: number
  saved: number
  published: number
}

interface RecentBlog {
  id: string
  title: string
  status: 'DRAFT' | 'SAVED' | 'PUBLISHED'
  updatedAt: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<BlogStats | null>(null)
  const [recentBlogs, setRecentBlogs] = useState<RecentBlog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        const blogsRes = await fetch('/api/admin/blogs?limit=100')
        if (!blogsRes.ok) {
          router.push('/auth/login')
          return
        }

        const data = await blogsRes.json()
        const blogs = data.data || []

        const blogStats = {
          total: blogs.length,
          drafts: blogs.filter((b: any) => b.status === 'DRAFT').length,
          saved: blogs.filter((b: any) => b.status === 'SAVED').length,
          published: blogs.filter((b: any) => b.status === 'PUBLISHED').length,
        }

        setStats(blogStats)
        setRecentBlogs(blogs.slice(0, 5))
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [router])

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'status-badge status-draft'
      case 'SAVED':
        return 'status-badge status-saved'
      case 'PUBLISHED':
        return 'status-badge status-published'
      default:
        return 'status-badge'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full"></div>
          </div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-brand)]">Bluish Boy</h1>
            <p className="text-sm text-[var(--color-text-secondary)]">Blog Dashboard</p>
          </div>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}
            className="btn btn-secondary"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm">Total Blogs</p>
                <p className="text-3xl font-bold mt-2">{stats?.total || 0}</p>
              </div>
              <div className="text-3xl">📚</div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm">Drafts</p>
                <p className="text-3xl font-bold mt-2">{stats?.drafts || 0}</p>
              </div>
              <div className="text-3xl">✏️</div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm">Saved</p>
                <p className="text-3xl font-bold mt-2">{stats?.saved || 0}</p>
              </div>
              <div className="text-3xl">💾</div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm">Published</p>
                <p className="text-3xl font-bold mt-2 text-green-600">{stats?.published || 0}</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8 flex gap-4">
          <Link href="/admin/blogs/new" className="btn btn-primary">
            + Create New Blog
          </Link>
          <Link href="/admin/blogs" className="btn btn-secondary">
            Manage Blogs
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {recentBlogs.length === 0 ? (
              <div className="p-6 text-center text-[var(--color-text-secondary)]">
                <p>No blogs yet. Start creating one!</p>
              </div>
            ) : (
              recentBlogs.map((blog) => (
                <div key={blog.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Link
                        href={`/admin/blogs/${blog.id}`}
                        className="font-medium hover:text-[var(--color-primary)]"
                      >
                        {blog.title}
                      </Link>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        Updated {new Date(blog.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={getStatusBadgeClass(blog.status)}>
                      {blog.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

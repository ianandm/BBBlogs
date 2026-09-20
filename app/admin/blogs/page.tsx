'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Blog {
  id: string
  title: string
  status: 'DRAFT' | 'SAVED' | 'PUBLISHED'
  updatedAt: string
  category?: { name: string } | null
}

const statuses = ['', 'PUBLISHED', 'DRAFT', 'SAVED'] as const

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadBlogs() {
      setIsLoading(true)
      setError('')
      const query = new URLSearchParams({ limit: '100' })
      if (status) query.set('status', status)
      if (search.trim()) query.set('search', search.trim())

      try {
        const response = await fetch(`/api/admin/blogs?${query}`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Unable to load blogs')
        const data = await response.json()
        setBlogs(data.data || [])
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === 'AbortError') return
        setError('Unable to load blogs. Please sign in again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogs()
    return () => controller.abort()
  }, [search, status])

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <Link href="/admin" className="text-sm text-[var(--color-primary)] hover:underline">
              &larr; Dashboard
            </Link>
            <h1 className="text-3xl font-bold mt-3">Manage Blogs</h1>
          </div>
          <Link href="/admin/blogs/new" className="btn btn-primary">
            + Create New Blog
          </Link>
        </div>

        <div className="card p-4 mb-6 flex flex-wrap gap-4">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search blogs"
            className="input flex-1 min-w-64"
          />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="input">
            {statuses.map((value) => (
              <option key={value} value={value}>
                {value || 'All statuses'}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {isLoading ? (
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <div className="card p-8 text-center">No blogs match your filters.</div>
        ) : (
          <div className="card divide-y divide-[var(--color-border)]">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/admin/blogs/${blog.id}`} className="block p-5 hover:bg-gray-50">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="font-semibold">{blog.title}</h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      {blog.category?.name || 'Uncategorized'} · Updated {new Date(blog.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="status-badge">{blog.status}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
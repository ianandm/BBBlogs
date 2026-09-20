'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Category { id: string; name: string }

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const editorRef = useRef<HTMLDivElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [showOnHomepage, setShowOnHomepage] = useState(true)
  const [status, setStatus] = useState<'DRAFT' | 'SAVED' | 'PUBLISHED'>('DRAFT')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    Promise.all([fetch(`/api/admin/blogs/${id}`), fetch('/api/categories')])
      .then(async ([blogResponse, categoriesResponse]) => {
        if (!blogResponse.ok) throw new Error('Unable to load blog')
        const blog = await blogResponse.json()
        setTitle(blog.title)
        setSubtitle(blog.subtitle || '')
        setExcerpt(blog.excerpt || '')
        setContent(blog.content)
        setCategoryId(blog.categoryId || '')
        setShowOnHomepage(blog.showOnHomepage !== false)
        setStatus(blog.status)
        if (editorRef.current) editorRef.current.innerHTML = blog.content
        setCategories(await categoriesResponse.json())
      })
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : 'Unable to load blog'))
  }, [id])

  function formatContent(command: string, value?: string) {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    setContent(editorRef.current?.innerHTML || '')
  }

  async function uploadImage(file: File) {
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch('/api/media', { method: 'POST', body: formData })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to upload image')
      editorRef.current?.focus()
      document.execCommand('insertImage', false, data.url)
      setContent(editorRef.current?.innerHTML || '')
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Unable to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  async function saveBlog(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, subtitle, excerpt, content, categoryId: categoryId || null, status, showOnHomepage }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to save blog')
      router.push(`/admin/blogs/${id}`)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save blog')
      setIsSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/admin/blogs/${id}`} className="text-sm text-[var(--color-primary)] hover:underline">&larr; Back to blog</Link>
        <h1 className="text-3xl font-bold mt-3 mb-8">Edit Blog</h1>
        <form onSubmit={saveBlog} className="card p-6 space-y-5">
          <label className="block">Title<input required value={title} onChange={(event) => setTitle(event.target.value)} className="input mt-2 w-full" /></label>
          <label className="block">Subtitle<input value={subtitle} onChange={(event) => setSubtitle(event.target.value)} className="input mt-2 w-full" /></label>
          <label className="block">Excerpt<textarea value={excerpt} onChange={(event) => setExcerpt(event.target.value)} className="input mt-2 w-full" rows={3} /></label>
          <label className="block">Category<select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className="input mt-2 w-full"><option value="">Select a category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={showOnHomepage} onChange={(event) => setShowOnHomepage(event.target.checked)} /> Show this blog on the homepage</label>
          <div>
            <span className="block mb-2">Content</span>
            <div className="flex flex-wrap gap-2 border border-[var(--color-border)] bg-gray-50 p-2 rounded-t-lg">
              <button type="button" onClick={() => formatContent('formatBlock', '<p>')} className="btn btn-secondary btn-sm">Body</button>
              <button type="button" onClick={() => formatContent('formatBlock', '<h1>')} className="btn btn-secondary btn-sm">Heading 1</button>
              <button type="button" onClick={() => formatContent('formatBlock', '<h2>')} className="btn btn-secondary btn-sm">Heading 2</button>
              <button type="button" onClick={() => formatContent('bold')} className="btn btn-secondary btn-sm">Bold</button>
              <label className="btn btn-secondary btn-sm">Text color<input type="color" className="ml-2 h-5 w-5" onChange={(event) => formatContent('foreColor', event.target.value)} /></label>
              <button type="button" onClick={() => imageInputRef.current?.click()} disabled={isUploading} className="btn btn-secondary btn-sm">{isUploading ? 'Uploading...' : 'Add picture'}</button>
              <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(file); event.target.value = '' }} />
            </div>
            <div ref={editorRef} contentEditable suppressContentEditableWarning onInput={(event) => setContent(event.currentTarget.innerHTML)} className="rich-content input min-h-96 w-full rounded-t-none focus:outline-none" role="textbox" aria-label="Blog content" />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={isSaving} className="btn btn-primary">{isSaving ? 'Saving...' : 'Save changes'}</button>
            <Link href={`/admin/blogs/${id}`} className="btn btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </main>
  )
}
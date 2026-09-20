export interface User {
  id: string
  email: string
  name: string | null
  role: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Media {
  id: string
  filename: string
  url: string
  alt: string | null
  mimeType: string
  size: number
  width: number | null
  height: number | null
  uploadedAt: Date
}

export interface Blog {
  id: string
  title: string
  slug: string
  subtitle: string | null
  excerpt: string | null
  content: string
  status: 'DRAFT' | 'SAVED' | 'PUBLISHED'
  seoTitle: string | null
  seoDescription: string | null
  canonicalUrl: string | null
  readingTime: number | null
  viewCount: number
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  authorId: string
  author?: User
  categoryId: string | null
  category?: Category | null
  featuredImageId: string | null
  featuredImage?: Media | null
  tags?: Array<{ id: string; name: string; slug: string }>
}

export interface BlogWithRelations extends Omit<Blog, 'tags'> {
  author: User
  category: Category | null
  featuredImage: Media | null
  tags: Array<{ tag: Tag }>
  media: Media[]
}

export interface CreateBlogInput {
  title: string
  subtitle?: string
  excerpt?: string
  content: string
  categoryId?: string
  tagIds?: string[]
  featuredImageId?: string
  seoTitle?: string
  seoDescription?: string
}

export interface UpdateBlogInput extends Partial<CreateBlogInput> {
  status?: 'DRAFT' | 'SAVED' | 'PUBLISHED'
}

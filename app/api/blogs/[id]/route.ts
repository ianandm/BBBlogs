import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const blog = await prisma.blog.findUnique({
      where: { slug: id },
      include: {
        author: true,
        category: true,
        featuredImage: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    // CRITICAL: Only allow access to published blogs for public users
    if (blog.status !== 'PUBLISHED') {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.blog.update({
      where: { id: blog.id },
      data: { viewCount: { increment: 1 } },
    })

    // Fetch related articles (same category, only published)
    const relatedArticles = await prisma.blog.findMany({
      where: {
        categoryId: blog.categoryId,
        status: 'PUBLISHED',
        NOT: { id: blog.id },
      },
      include: {
        category: true,
        featuredImage: true,
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
    })

    return NextResponse.json({
      blog,
      relatedArticles,
    })
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

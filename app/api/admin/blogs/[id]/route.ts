import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { calculateReadingTime, generateSlug } from '@/lib/utils'

// GET /api/admin/blogs/[id] - Get single blog (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const blog = await prisma.blog.findUnique({
      where: { id },
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

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/blogs/[id] - Update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      title,
      subtitle,
      excerpt,
      content,
      categoryId,
      featuredImageId,
      status,
      seoTitle,
      seoDescription,
      canonicalUrl,
      showOnHomepage,
      tagIds = [],
    } = body

    // Check if blog exists
    const blog = await prisma.blog.findUnique({
      where: { id },
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    const readingTime = content ? calculateReadingTime(content) : blog.readingTime

    // Update blog
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        subtitle,
        excerpt,
        content,
        categoryId,
        featuredImageId,
        status,
        seoTitle,
        seoDescription,
        canonicalUrl,
        ...(typeof showOnHomepage === 'boolean' && { showOnHomepage }),
        readingTime,
        // Set publishedAt if status is changing to PUBLISHED
        ...(status === 'PUBLISHED' && !blog.publishedAt && {
          publishedAt: new Date(),
        }),
      },
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

    // Handle tags
    if (tagIds.length > 0) {
      // Remove existing tags
      await prisma.blogTag.deleteMany({
        where: { blogId: id },
      })

      // Add new tags
      await Promise.all(
        tagIds.map((tagId: string) =>
          prisma.blogTag.create({
            data: {
              blogId: id,
              tagId,
            },
          })
        )
      )
    }

    return NextResponse.json(updatedBlog)
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/blogs/[id] - Delete blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.blog.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Blog deleted successfully' }
    )
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}

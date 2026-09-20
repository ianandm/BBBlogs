import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/blogs
// Returns all published blogs (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = parseInt(searchParams.get('skip') || '0')

    // Build where clause - CRITICAL: only return PUBLISHED blogs
    let where: any = {
      status: 'PUBLISHED',
      showOnHomepage: true,
    }

    if (category) {
      where.category = {
        slug: category,
      }
    }

    if (tag) {
      where.tags = {
        some: {
          tag: {
            slug: tag,
          },
        },
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
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
        orderBy: { publishedAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.blog.count({ where }),
    ])

    return NextResponse.json({
      data: blogs,
      total,
      limit,
      skip,
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

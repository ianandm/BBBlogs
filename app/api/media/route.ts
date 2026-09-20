import { randomUUID } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file')
  if (!(file instanceof File) || !allowedTypes.has(file.type)) {
    return NextResponse.json({ error: 'Please upload a JPG, PNG, WebP, or GIF image' }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'Images must be smaller than 5 MB' }, { status: 400 })
  }

  const extension = file.type.split('/')[1].replace('jpeg', 'jpg')
  const filename = `${randomUUID()}.${extension}`
  const uploadDirectory = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDirectory, { recursive: true })
  await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()))

  const media = await prisma.media.create({
    data: {
      filename: file.name,
      url: `/uploads/${filename}`,
      alt: file.name,
      mimeType: file.type,
      size: file.size,
    },
  })

  return NextResponse.json(media, { status: 201 })
}
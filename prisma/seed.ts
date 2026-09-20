import { PrismaClient, BlogStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateSlug, calculateReadingTime } from '../lib/utils'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@bluishboy.com' },
    update: {},
    create: {
      email: 'admin@bluishboy.com',
      name: 'Bluish Boy Editor',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    },
  })

  console.log('Created admin user:', adminUser.email)

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'bhagavad-gita' },
      update: {},
      create: {
        name: 'Bhagavad Gita',
        slug: 'bhagavad-gita',
        description: 'Wisdom from the sacred dialogue of Krishna and Arjuna',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'krishna' },
      update: {},
      create: {
        name: 'Krishna',
        slug: 'krishna',
        description: 'Stories and teachings of Lord Krishna',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'mahabharata' },
      update: {},
      create: {
        name: 'Mahabharata',
        slug: 'mahabharata',
        description: 'Epic stories and lessons from the Mahabharata',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'ramayana' },
      update: {},
      create: {
        name: 'Ramayana',
        slug: 'ramayana',
        description: 'Divine journey of Lord Rama',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'spirituality' },
      update: {},
      create: {
        name: 'Spirituality',
        slug: 'spirituality',
        description: 'Spiritual wisdom and practices',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'childrens-stories' },
      update: {},
      create: {
        name: 'Children\'s Stories',
        slug: 'childrens-stories',
        description: 'Engaging spiritual stories for children',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'wellbeing' },
      update: {},
      create: {
        name: 'Wellbeing',
        slug: 'wellbeing',
        description: 'Health, wellness, and mindfulness',
      },
    }),
  ])

  console.log('Created categories:', categories.length)

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'wisdom' },
      update: {},
      create: { name: 'Wisdom', slug: 'wisdom' },
    }),
    prisma.tag.upsert({
      where: { slug: 'devotion' },
      update: {},
      create: { name: 'Devotion', slug: 'devotion' },
    }),
    prisma.tag.upsert({
      where: { slug: 'meditation' },
      update: {},
      create: { name: 'Meditation', slug: 'meditation' },
    }),
    prisma.tag.upsert({
      where: { slug: 'philosophy' },
      update: {},
      create: { name: 'Philosophy', slug: 'philosophy' },
    }),
    prisma.tag.upsert({
      where: { slug: 'story' },
      update: {},
      create: { name: 'Story', slug: 'story' },
    }),
  ])

  console.log('Created tags:', tags.length)

  // Create sample blogs
  const blogs = [
    {
      title: 'Understanding the Bhagavad Gita: A Beginner\'s Guide',
      subtitle: 'Discover the timeless wisdom of Krishna in a modern context',
      content: `<h2>The Bhagavad Gita: An Introduction</h2>
<p>The Bhagavad Gita, often called the "Song of the Lord," is one of the most profound spiritual texts in human history. Composed over 2,500 years ago, it remains as relevant today as it was in ancient times.</p>
<h3>What Makes It Special?</h3>
<p>Unlike many religious texts, the Gita is structured as a dialogue between Lord Krishna and the warrior Arjuna on the battlefield of Kurukshetra. This conversational format makes it accessible and engaging.</p>
<p>The text covers everything from duty and righteousness to meditation and the nature of the soul. Whether you're seeking spiritual enlightenment, ethical guidance, or simply wisdom for daily living, the Gita offers profound insights.</p>
<h3>Key Themes</h3>
<ul>
<li><strong>Dharma</strong> - Righteous duty</li>
<li><strong>Karma Yoga</strong> - The yoga of action</li>
<li><strong>Bhakti Yoga</strong> - The path of devotion</li>
<li><strong>Atman</strong> - The eternal soul</li>
</ul>
<p>Join us on a journey through these timeless teachings and discover how they can transform your life.</p>`,
      excerpt: 'A beginner\'s introduction to the Bhagavad Gita, one of the world\'s most important spiritual texts.',
      categoryId: categories.find((c) => c.slug === 'bhagavad-gita')?.id || '',
      status: 'PUBLISHED' as BlogStatus,
      publishedAt: new Date('2026-09-15'),
    },
    {
      title: 'Who is Krishna? Beyond the Mythology',
      subtitle: 'Exploring the divine incarnation in Hindu philosophy',
      content: `<h2>Krishna: The Divine Incarnation</h2>
<p>Lord Krishna is one of the most revered figures in Hinduism and Indian spirituality. Born in ancient Mathura, his life and teachings have influenced billions of people for thousands of years.</p>
<h3>The Life of Krishna</h3>
<p>Krishna's life, as described in ancient texts like the Mahabharata and Bhagavata Purana, is filled with divine exploits and moral teachings. From his miraculous birth to his crucial role in the Mahabharata war, every aspect of his life carries profound spiritual significance.</p>
<h3>Krishna as a Spiritual Teacher</h3>
<p>Beyond the stories and miracles, Krishna is remembered as a supreme spiritual teacher. Through the Bhagavad Gita, he imparts wisdom that guides individuals toward enlightenment and fulfillment.</p>
<h3>Significance in Modern Times</h3>
<p>In our modern world, Krishna's teachings remain incredibly relevant. His message of finding purpose through righteous action, devotion, and spiritual practice continues to inspire millions.</p>`,
      excerpt: 'Exploring the spiritual significance of Lord Krishna beyond mythology.',
      categoryId: categories.find((c) => c.slug === 'krishna')?.id || '',
      status: 'PUBLISHED' as BlogStatus,
      publishedAt: new Date('2026-09-10'),
    },
    {
      title: 'Five Powerful Lessons from the Mahabharata',
      subtitle: 'Ancient wisdom applicable to modern life',
      content: `<h2>Timeless Lessons from the Greatest Epic</h2>
<p>The Mahabharata is not just a story of war and conflict. It is a treasure trove of wisdom, ethics, and spiritual guidance. Here are five lessons that can transform your life:</p>
<h3>1. The Power of Dharma (Righteousness)</h3>
<p>The central conflict of the Mahabharata revolves around dharma. The epic teaches us that following the righteous path, even when difficult, is essential for spiritual and moral growth.</p>
<h3>2. Consequences of Choices</h3>
<p>Through the story of the Pandavas and Kauravas, we learn that our choices have far-reaching consequences. Every decision shapes our destiny and impacts those around us.</p>
<h3>3. The Value of Humility</h3>
<p>Characters like Yudhisthira teach us the importance of humility and respect for others, regardless of their station in life.</p>
<h3>4. Courage in Adversity</h3>
<p>The Mahabharata celebrates courage and resilience in the face of overwhelming odds.</p>
<h3>5. The Path to Enlightenment</h3>
<p>Through bhakti, karma yoga, and jnana yoga, the epic shows us various paths to spiritual fulfillment.</p>`,
      excerpt: 'Discover five powerful life lessons from the ancient Mahabharata.',
      categoryId: categories.find((c) => c.slug === 'mahabharata')?.id || '',
      status: 'PUBLISHED' as BlogStatus,
      publishedAt: new Date('2026-09-08'),
    },
    {
      title: 'Meditation for Beginners: Start Your Spiritual Journey',
      subtitle: 'Simple techniques to calm your mind and find inner peace',
      content: `<h2>Beginning Your Meditation Practice</h2>
<p>Meditation is one of the most powerful tools for spiritual growth and mental wellbeing. Whether you're looking to reduce stress, find clarity, or connect with your inner self, meditation offers transformative benefits.</p>
<h3>What is Meditation?</h3>
<p>Meditation is the practice of focusing your mind to achieve a state of calm awareness. It's not about emptying your mind, but rather directing your attention inward.</p>
<h3>Getting Started</h3>
<p><strong>Find a quiet space:</strong> Choose a place where you won't be disturbed.</p>
<p><strong>Sit comfortably:</strong> You can sit on a cushion, chair, or mat. Keep your spine straight.</p>
<p><strong>Close your eyes:</strong> This helps minimize external distractions.</p>
<p><strong>Focus on your breath:</strong> Simply observe your natural breathing without trying to control it.</p>
<h3>Simple Beginner Technique</h3>
<ol>
<li>Sit comfortably for 5-10 minutes</li>
<li>Close your eyes and breathe naturally</li>
<li>Count each exhale (1-10) and repeat</li>
<li>When your mind wanders, gently return to counting</li>
</ol>
<p>Start with just 5 minutes daily and gradually increase as you become more comfortable.</p>`,
      excerpt: 'Learn simple meditation techniques perfect for beginners.',
      categoryId: categories.find((c) => c.slug === 'wellbeing')?.id || '',
      status: 'PUBLISHED' as BlogStatus,
      publishedAt: new Date('2026-09-05'),
    },
    {
      title: 'Stories of Lord Rama: Lessons for Children',
      subtitle: 'Engaging tales that teach values and morality',
      content: `<h2>The Adventures of Lord Rama</h2>
<p>The story of Lord Rama, as told in the Ramayana, is one of the most beloved narratives in Indian culture. Perfect for teaching children about values, courage, and righteousness.</p>
<h3>Why Rama's Story Matters</h3>
<p>Rama's life exemplifies perfect virtue. He is dutiful, courageous, compassionate, and wise. His story teaches children the importance of:</p>
<ul>
<li>Loyalty and honor</li>
<li>Helping those in need</li>
<li>Standing against evil</li>
<li>Respecting elders</li>
<li>Keeping promises</li>
</ul>
<h3>Key Stories to Share</h3>
<p><strong>Rama's Birth:</strong> A prince born to bring righteousness to the kingdom.</p>
<p><strong>The Forest Years:</strong> Rama's courage and love for his brother Lakshman.</p>
<p><strong>Rescuing Sita:</strong> A tale of bravery, loyalty, and divine power.</p>
<h3>Lessons for Today</h3>
<p>In our modern world, Rama's values of honesty, integrity, and service are more important than ever. By sharing these stories with children, we pass on timeless wisdom.</p>`,
      excerpt: 'Timeless tales from the Ramayana for children.',
      categoryId: categories.find((c) => c.slug === 'childrens-stories')?.id || '',
      status: 'PUBLISHED' as BlogStatus,
      publishedAt: new Date('2026-09-01'),
    },
    {
      title: 'The Art of Living: Balancing Spirituality and Daily Life',
      subtitle: 'How ancient wisdom applies to modern challenges',
      content: `<h2>Integrating Spirituality into Everyday Life</h2>
<p>Many people think spirituality means withdrawing from the world. But true spiritual practice is about living a meaningful, purposeful life while fulfilling your duties and responsibilities.</p>
<h3>Karma Yoga: The Yoga of Action</h3>
<p>Lord Krishna teaches Arjuna the concept of karma yoga - performing your duties without attachment to the results. This principle is revolutionary for modern living.</p>
<p>Apply this in your life by:</p>
<ul>
<li>Doing your best in your work, whatever it may be</li>
<li>Serving others selflessly</li>
<li>Not worrying excessively about outcomes</li>
<li>Finding purpose and meaning in your actions</li>
</ul>
<h3>Mindfulness in Daily Activities</h3>
<p>You don't need to retreat to a monastery to be spiritual. Bring mindfulness to your daily activities:</p>
<ul>
<li>Eat with full awareness</li>
<li>Work with complete focus</li>
<li>Interact with others with compassion</li>
<li>Find the sacred in the ordinary</li>
</ul>
<p>This is true spirituality - living with purpose, awareness, and compassion.</p>`,
      excerpt: 'Discover how to integrate ancient spiritual wisdom into your modern life.',
      categoryId: categories.find((c) => c.slug === 'spirituality')?.id || '',
      status: 'PUBLISHED' as BlogStatus,
      publishedAt: new Date('2026-08-28'),
    },
  ]

  for (const blogData of blogs) {
    const slug = generateSlug(blogData.title)
    const readingTime = calculateReadingTime(blogData.content)

    await prisma.blog.upsert({
      where: { slug },
      update: {
        content: blogData.content,
        subtitle: blogData.subtitle,
        excerpt: blogData.excerpt,
        status: blogData.status,
        publishedAt: blogData.publishedAt,
        readingTime,
      },
      create: {
        title: blogData.title,
        slug,
        subtitle: blogData.subtitle,
        excerpt: blogData.excerpt,
        content: blogData.content,
        authorId: adminUser.id,
        categoryId: blogData.categoryId,
        status: blogData.status,
        publishedAt: blogData.publishedAt,
        readingTime,
      },
    })
  }

  console.log('Created sample blogs')

  // Add some tags to the first blog
  const firstBlog = await prisma.blog.findFirst({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'asc' },
  })

  if (firstBlog) {
    await Promise.all([
      prisma.blogTag.create({
        data: {
          blogId: firstBlog.id,
          tagId: tags[0].id, // wisdom
        },
      }),
      prisma.blogTag.create({
        data: {
          blogId: firstBlog.id,
          tagId: tags[3].id, // philosophy
        },
      }),
    ])
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

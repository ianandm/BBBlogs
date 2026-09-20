# Bluish Boy Blog Platform - Setup & Developer Guide

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Create SQLite database and run migrations
npm run db:push

# Seed with sample Bluish Boy content
npm run db:seed
```

### 3. Start Development Server
```bash
npm run dev
```

**Access:**
- 🌐 Public Blog: http://localhost:3000
- 🔐 Admin Dashboard: http://localhost:3000/admin
- 🔑 Login Page: http://localhost:3000/auth/login

**Demo Credentials:**
```
Email: admin@bluishboy.com
Password: admin123
```

---

## 📋 Publishing Workflow

### For Admins

```
Dashboard
   ↓
Create New Blog
   ↓
Edit Title & Content
   ↓
Add Featured Image & Category
   ↓
Save (Draft/Saved status)
   ↓
Preview (See how it looks)
   ↓
Publish (Goes LIVE)
   ↓
✅ Article visible to public
```

### Status Meanings

| Status | Visibility | Public API | Admin Dashboard |
|--------|-----------|-----------|-----------------|
| DRAFT | Invisible to public | ❌ Hidden | ✅ Visible |
| SAVED | Invisible to public | ❌ Hidden | ✅ Visible |
| PUBLISHED | ✅ Visible to all | ✅ Returned | ✅ Visible |

### Critical Rule
```
Only articles with status = 'PUBLISHED'
are returned by public APIs
```

---

## 🗂️ Project Structure

### Frontend Pages
```
app/
├── page.tsx              # Homepage (blog listing)
├── auth/
│   └── login/page.tsx   # Login page
├── admin/
│   ├── page.tsx         # Dashboard
│   ├── blogs/
│   │   ├── page.tsx     # All blogs list
│   │   ├── new/         # Create new blog (FUTURE)
│   │   └── [id]/        # Edit blog (FUTURE)
│   └── categories/      # Manage categories (FUTURE)
└── blog/
    ├── page.tsx         # Blog list page (FUTURE)
    └── [slug]/page.tsx  # Individual article (FUTURE)
```

### Backend APIs
```
app/api/
├── auth/[...nextauth]/route.ts   # Authentication
├── blogs/
│   ├── route.ts                  # GET published blogs
│   └── [id]/route.ts             # GET single blog
├── categories/route.ts           # GET all categories
└── admin/blogs/
    ├── route.ts                  # Admin: list & create
    └── [id]/route.ts             # Admin: update & delete
```

### Configuration
```
lib/
├── auth.ts          # NextAuth setup
├── db.ts            # Prisma client
├── types.ts         # TypeScript interfaces
└── utils.ts         # Utilities (slug, reading time, etc.)

prisma/
├── schema.prisma    # Database schema
└── seed.ts          # Sample data
```

---

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key-change-this"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Changing Database to PostgreSQL

1. **Update `.env.local`:**
```
DATABASE_URL="postgresql://user:password@localhost:5432/bluish_boy"
```

2. **Update `prisma/schema.prisma`:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. **Run migrations:**
```bash
npx prisma migrate deploy
npm run db:seed
```

### Customizing Colors

Edit `app/globals.css`:
```css
:root {
  --color-primary: #1e3a5f;      /* Deep blue/indigo */
  --color-accent: #d4a574;        /* Warm saffron/gold */
  --color-bg: #faf7f2;            /* Warm ivory */
  --color-text: #1a1a1a;          /* Dark charcoal */
  --color-text-secondary: #6b7280; /* Muted slate */
}
```

---

## 📚 API Reference

### Public APIs (Anyone can access)

#### Get All Published Blogs
```
GET /api/blogs

Query Parameters:
  limit=10        (default: 10)
  skip=0          (default: 0)
  category=slug   (optional, e.g., "bhagavad-gita")
  tag=slug        (optional)
  search=query    (optional, searches title/content)

Response:
{
  "data": [
    {
      "id": "...",
      "title": "...",
      "slug": "...",
      "content": "...",
      "status": "PUBLISHED",
      "category": { "name": "...", "slug": "..." },
      "author": { "name": "..." },
      "readingTime": 5,
      "publishedAt": "2026-09-20T...",
      ...
    }
  ],
  "total": 42,
  "limit": 10,
  "skip": 0
}
```

#### Get Single Published Blog
```
GET /api/blogs/:slug

Response:
{
  "blog": { ... blog data ... },
  "relatedArticles": [ ... 3 related blogs ... ]
}

NOTE: Returns 404 if blog is not PUBLISHED
```

#### Get All Categories
```
GET /api/categories

Response:
[
  {
    "id": "...",
    "name": "Bhagavad Gita",
    "slug": "bhagavad-gita",
    "description": "..."
  },
  ...
]
```

### Admin APIs (Requires login)

All admin endpoints require authentication. Send session token in cookies.

#### Get All Blogs (All Statuses)
```
GET /api/admin/blogs

Query Parameters: Same as public /api/blogs
Returns: Blogs with ALL statuses (DRAFT, SAVED, PUBLISHED)
```

#### Create Blog
```
POST /api/admin/blogs

Body:
{
  "title": "My New Article",
  "content": "<p>Article content...</p>",
  "subtitle": "Optional subtitle",
  "excerpt": "Short preview",
  "categoryId": "cat-id",
  "tagIds": ["tag-1", "tag-2"],
  "seoTitle": "Optional SEO title",
  "seoDescription": "Optional SEO description"
}

Response: 201 Created
{ ... blog data with status: "DRAFT" ... }
```

#### Update Blog
```
PUT /api/admin/blogs/:id

Body: (all fields optional)
{
  "title": "Updated title",
  "content": "...",
  "status": "DRAFT" | "SAVED" | "PUBLISHED",
  "categoryId": "...",
  "seoTitle": "...",
  ...
}

Response: 200 OK
{ ... updated blog data ... }

NOTE: If status changes to PUBLISHED and publishedAt is null,
it gets set to current time automatically
```

#### Publish Blog
```
PUT /api/admin/blogs/:id

Body:
{
  "status": "PUBLISHED"
}

Effect:
- Blog becomes visible to public
- publishedAt set to current time if not already set
- Appears in /api/blogs public endpoint
```

#### Unpublish Blog
```
PUT /api/admin/blogs/:id

Body:
{
  "status": "SAVED"
}

Effect:
- Blog removed from public view
- No longer returned by /api/blogs
- Admin can still see and edit it
```

#### Delete Blog
```
DELETE /api/admin/blogs/:id

Response: 200 OK
{ "message": "Blog deleted successfully" }

NOTE: This is permanent. Consider unpublishing instead.
```

---

## 🗄️ Database Schema

### Blog Table
```sql
CREATE TABLE Blog (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  subtitle        TEXT,
  excerpt         TEXT,
  content         TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'DRAFT', -- DRAFT | SAVED | PUBLISHED
  authorId        TEXT NOT NULL,
  categoryId      TEXT,
  featuredImageId TEXT,
  seoTitle        TEXT,
  seoDescription  TEXT,
  canonicalUrl    TEXT,
  readingTime     INTEGER,
  viewCount       INTEGER DEFAULT 0,
  publishedAt     DATETIME,
  createdAt       DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt       DATETIME,
  
  FOREIGN KEY (authorId) REFERENCES User(id),
  FOREIGN KEY (categoryId) REFERENCES Category(id),
  FOREIGN KEY (featuredImageId) REFERENCES Media(id),
  
  INDEX (status),
  INDEX (slug),
  INDEX (categoryId),
  INDEX (publishedAt),
  INDEX (createdAt)
);
```

### Other Tables
- **User**: Admin accounts
- **Category**: Blog categories
- **Tag**: Blog tags
- **BlogTag**: Junction table for many-to-many tag relationship
- **Media**: Uploaded images

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables:
   ```
   NEXTAUTH_SECRET=<run: openssl rand -base64 32>
   NEXTAUTH_URL=https://yourdomain.com
   DATABASE_URL=<your-postgresql-url>
   NEXT_PUBLIC_API_URL=https://yourdomain.com
   ```
4. Deploy!

### Deploy to Other Platforms

1. Build: `npm run build`
2. Start: `npm start`
3. Requires Node.js 18+

---

## 📖 Common Tasks

### Add New Category
```bash
npx prisma studio
# Navigate to Category table
# Click "Add record"
# Fill in: name, slug (auto-filled based on name)
```

### Reset Database (⚠️ Deletes all data)
```bash
npm run db:reset
npm run db:seed  # Recreate sample data
```

### View Database Visually
```bash
npx prisma studio
# Opens web interface to explore and edit data
```

### Search Sample Data
```bash
# Edit prisma/seed.ts to customize sample articles
npm run db:reset
```

### Add Admin User
```bash
npx prisma studio
# Navigate to User table
# Click "Add record"
# Fill in: email, name, password (will need to hash), role: "admin"
```

Actually, use the seed function to add users with proper hashing.

---

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Database errors
```bash
# Check database connection
npx prisma db execute --stdin < prisma/schema.prisma

# Reset and reseed
npm run db:reset
npm run db:seed

# View database
npx prisma studio
```

### Login not working
- Verify user exists: `npx prisma studio` → Users table
- Check password hashing is correct
- Clear browser cookies
- Verify `NEXTAUTH_SECRET` is set

### Build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Articles not showing on public site
- Verify blog status is "PUBLISHED"
- Check category is set correctly
- Confirm article has content
- Check `npm run dev` server is running

---

## 📚 Next Steps

### Immediate
1. ✅ Start `npm run dev`
2. ✅ Visit http://localhost:3000 to see public blog
3. ✅ Login at http://localhost:3000/auth/login
4. ✅ Create a new blog and publish it
5. ✅ Verify it appears on homepage

### Short Term
- [ ] Customize colors in `app/globals.css`
- [ ] Update admin username/password
- [ ] Replace sample categories with your own
- [ ] Update homepage copy
- [ ] Add your logo

### Medium Term
- [ ] Complete admin blog editor UI
- [ ] Build category pages
- [ ] Implement rich text editor
- [ ] Add media library
- [ ] Implement search

### Long Term
- [ ] Multiple authors
- [ ] Comments
- [ ] Analytics
- [ ] Newsletter
- [ ] Book recommendations
- [ ] API for external apps

---

## 💡 Tips

### Efficient Development
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: View database
npx prisma studio

# You now have:
# - Code editor (VS Code/similar)
# - Dev server on :3000
# - Database viewer
# - API docs ready to go
```

### Testing Publish Workflow
1. Create article, leave as DRAFT
2. Go to `/api/admin/blogs` → should see it
3. Go to `/api/blogs` → should NOT see it
4. Update status to PUBLISHED
5. Go to `/api/blogs` → now should see it
6. Go to http://localhost:3000 → should appear on homepage

### Performance
- Images use next/image for optimization
- Database queries are indexed on critical fields
- API responses are paginated
- Only published articles indexed for search

---

## 🆘 Getting Help

1. **Check console** for error messages
2. **View database** with `npx prisma studio`
3. **Check logs** in browser DevTools (F12)
4. **Verify API** with curl/Postman
5. **Check environment variables** are set

---

**Ready to build something amazing? Start with `npm run dev`! 🚀**

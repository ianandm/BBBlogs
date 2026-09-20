# Bluish Boy Blog Platform - Quick Start Guide

## ⚡ Get Running in 3 Commands

```bash
npm install
npm run db:push && npm run db:seed
npm run dev
```

That's it! You now have:

- 🌐 Public blog at http://localhost:3000
- 🔐 Admin dashboard at http://localhost:3000/admin
- 📚 Sample articles about Bhagavad Gita, Krishna, spirituality, etc.

## 🔑 Login

**URL:** http://localhost:3000/auth/login

```
Email: admin@bluishboy.com
Password: admin123
```

## 🎯 What You Can Do Right Now

### 1. View Public Blog
- Open http://localhost:3000
- See featured article and recent posts
- All content is **published** and visible

### 2. Create New Article
1. Login to admin
2. Click "+ Create New Blog"
3. Fill in title and content
4. Click "Save" (sets status to DRAFT)
5. Click "Publish" (makes it LIVE)
6. Go back to http://localhost:3000 to see it

### 3. Understand Publishing Status

| Action | Status | Public? |
|--------|--------|---------|
| Create → Save | DRAFT/SAVED | ❌ No |
| Publish | PUBLISHED | ✅ Yes |
| Unpublish | SAVED | ❌ No |

**Only PUBLISHED articles appear to public users.**

## 📁 Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage with all published blogs |
| `app/admin/page.tsx` | Admin dashboard |
| `app/auth/login/page.tsx` | Login page |
| `app/api/blogs/route.ts` | Public blog API |
| `app/api/admin/blogs/route.ts` | Admin blog API |
| `prisma/schema.prisma` | Database structure |
| `app/globals.css` | Colors and styling |

## 🎨 Customize Look & Feel

### Change Colors

Edit top of `app/globals.css`:

```css
:root {
  --color-primary: #1e3a5f;      /* Change this to your blue */
  --color-accent: #d4a574;        /* Change this to your gold */
  --color-bg: #faf7f2;            /* Background color */
}
```

### Change Fonts

Already using Playfair Display (headings) and Inter (body). Both from Google Fonts.

To change: Edit import in `app/globals.css`

## 🚀 Deploy

### To Vercel (Easiest)

1. Push to GitHub
2. Connect to Vercel at vercel.com
3. Add these environment variables:
   - `NEXTAUTH_SECRET` = (run: `openssl rand -base64 32`)
   - `NEXTAUTH_URL` = your-domain.com
   - `DATABASE_URL` = your PostgreSQL URL

4. Deploy!

### To Anywhere Else

```bash
npm run build
npm start
```

(Needs Node.js 18+)

## 🔧 Need to Change Password?

1. Run `npx prisma studio`
2. Find the User table
3. Find admin@bluishboy.com
4. Can't edit password directly in Prisma Studio

**Instead:** Use a tool to hash password with bcryptjs, or contact support.

## 📊 View Database

```bash
npx prisma studio
```

Opens visual database editor at http://localhost:5555

You can:
- View all blogs, categories, users
- Edit data directly
- Add new records
- Delete records

## ❌ Reset Everything

```bash
npm run db:reset
npm run db:seed
```

This will:
- Delete ALL data
- Recreate database
- Add sample articles back

## 🐛 Something Broken?

### "Cannot find module" error
```bash
npm install
```

### Blog doesn't appear after publishing
1. Go to admin: http://localhost:3000/admin
2. Find the blog in the list
3. Check its status is "PUBLISHED"
4. Refresh homepage

### Login not working
1. Check email is: `admin@bluishboy.com`
2. Check password is: `admin123`
3. View database: `npx prisma studio`
4. Go to Users table and verify admin user exists

### Can't see changes
1. Refresh browser (Ctrl+R or Cmd+R)
2. Stop dev server (Ctrl+C)
3. Start again: `npm run dev`

## 📚 Learn More

- **Setup Guide:** `SETUP.md` - Complete setup instructions
- **Development:** See inline code comments
- **API:** Check `app/api/` folder structure
- **Database:** Edit `prisma/schema.prisma`

## 🎓 What's Built

✅ **Complete:**
- Next.js full-stack app
- PostgreSQL/SQLite database  
- Authentication & authorization
- Admin dashboard
- Blog CRUD operations
- Publishing workflow (Draft → Saved → Published)
- Public blog homepage
- API endpoints for public & admin
- Beautiful styling with Tailwind CSS
- Sample content

⚡ **Quick to Build (Next):**
- Rich text editor improvements
- Category pages
- Search implementation
- Image upload/media library
- Individual blog detail pages

🚀 **For Future:**
- Comments section
- Author profiles
- Newsletter signup
- Analytics
- Scheduled publishing
- Content approval workflows

## 🎯 Your Next Steps

1. **Explore:** Run the app, check out public and admin
2. **Customize:** Change colors and content to match Bluish Boy
3. **Test:** Create a blog article, save, preview, publish
4. **Deploy:** Get it live on a domain
5. **Build:** Add features from the "Future" list

## 💬 Need Help?

Check files in order:
1. `QUICK_START.md` (you are here)
2. `SETUP.md` (detailed setup)
3. Code comments in source files
4. Open source docs (Next.js, Prisma, TypeScript)

---

**You're all set! Run `npm run dev` and start creating! 🚀**

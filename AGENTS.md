<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Production Deployment

- Production site: `https://bluishboy.com` on Hetzner at `root@89.167.127.126`.
- SSH key: `/Users/anandmohan/.ssh/id_ed25519`. Never request, store, or send its passphrase; the user enters it directly in the terminal if prompted.
- Production checkout: `/var/www/BBBlogs`, branch `main`, remote `origin` (`https://github.com/ianandm/BBBlogs.git`).
- The app runs under PM2 as `bluishboy`, using `npm start` on port `3000`.
- For an explicitly requested production deploy: verify local changes, run the relevant checks, commit and push to `origin/main`, then SSH to the server. Confirm the remote worktree is clean and fast-forward only to the intended `origin/main` commit. Do not reset or overwrite remote changes.
- In `/var/www/BBBlogs`, fast-forward from `origin/main`, run `npm run build`, then `pm2 reload bluishboy`. Verify PM2 is online and check `https://bluishboy.com` plus any changed asset URL over HTTPS.
- Do not claim a GitHub push is a production deploy; confirm the server checkout, build, PM2 reload, and public response.

# Prealgebra Workshop

Self-paced prealgebra for a 13-year-old: 15 chapters, 67 lessons, original problems. Per-student login, progress saved across sittings and devices, offline-tolerant, parent view, invite-only.
Vite + vanilla JS, Supabase (auth + Postgres), GitHub Pages hosting, GitHub Actions CI/CD.

## What each lesson contains
Try first (2) → Learn (rule box, worked examples, widget, spot-the-mistake) → Practice (7, hints, solution, targeted wrong-answer messages) → Challenge chains (2) + find-the-error → Mastery quiz (5 fresh questions from 6–9 generators, pass 4). Each chapter ends with an 8-question mixed test (pass 6). Daily Mix = spaced review (1, 3, 7, 14, 30 days) of what was missed.

## Local
```
npm install
npm run dev            # http://localhost:5173  (no Supabase keys = guest mode, progress in this browser)
npm test               # content gate + engine + store + UI smoke
STRICT=1 npm run validate
npm run build
```

## Go-live checklist (about 30 minutes)
| # | Step | Where |
|---|---|---|
| 1 | Create an empty private repo, push this folder to `main` | GitHub |
| 2 | Create a Supabase project (free tier). Copy Project URL and anon key | supabase.com |
| 3 | Run `supabase/migrations/0001_init.sql` in the SQL editor (or `supabase db push`) | Supabase |
| 4 | Copy `supabase/seed.sql`, put in the real emails (student, parent), run it. Only listed emails can sign in | Supabase SQL editor |
| 5 | Auth → Providers → Google: create an OAuth client in Google Cloud Console (type Web). Authorized redirect URI = the callback URL Supabase shows. Paste client id/secret into Supabase | Google Cloud + Supabase |
| 6 | Auth → URL Configuration: Site URL and Redirect URLs = `https://<user>.github.io/<repo>/` (and `http://localhost:5173/` for dev) | Supabase |
| 7 | Repo → Settings → Secrets → Actions: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (optional for migrations: `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF`, `SUPABASE_DB_PASSWORD`) | GitHub |
| 8 | Repo → Settings → Pages → Source: GitHub Actions. Push to `main` → deploy runs | GitHub |
| 9 | After both have signed in once, link parent to student: `select admin_link_parent('parent@x.com','student@x.com');` (see seed.sql) | Supabase SQL editor |

The anon key is public by design. Security comes from row-level security in the migration: a student reads and writes only their own rows, a parent reads linked students, and `allowed_emails` gates everyone else.

## CI/CD
| Workflow | When | Does |
|---|---|---|
| `ci.yml` | every PR and push | content gate (STRICT), tests, build |
| `deploy.yml` | push to `main` | tests, build with secrets, publish to Pages. `VITE_CONTENT_VERSION` = commit sha, stored on every attempt |
| `migrate.yml` | manual | `supabase db push` |

Updating content: edit a lesson file → open a PR → CI blocks it unless every answer key, wrong-answer message, generator (250 seeds each) and widget passes. Student progress is keyed by stable lesson ids, so edits never erase progress. Never rename an id.

## Adding more
See `docs/AUTHORING.md`. A new grade or an SAT/Olympiad track is a new folder `content/courses/<id>/` with `course.js` and `chNN/` files (the app currently shows the first course; a course picker is the next UI step).

## Honest limits
- Tests prove answers are correct and generators are consistent. They cannot judge teaching quality. A parent or coach should read a chapter before the student reaches it; fix by editing the lesson file.
- Widgets were checked in a real browser at default settings only.
- Not yet verified against a live Supabase project (that happens at step 8). Offline sync logic is unit-tested, not tested against a real network.

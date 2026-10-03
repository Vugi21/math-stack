# Math Workshop

A self-paced math course for my kids, with original problems, per-student logins and saved progress. It currently has two courses:

| Course | Level | Size |
|---|---|---|
| Math 4 | Ages 8–10 | 12 chapters, 54 lessons |
| Prealgebra (Math 6) | Ages 11–13 | 15 chapters, 67 lessons |

Access is invite-only. Parents can see their children's progress.

Built with Vite and plain JavaScript. Supabase handles sign-in and the database, GitHub Pages hosts it, and GitHub Actions tests and deploys every push.

## How a lesson works

1. **Try first.** Two problems before any teaching.
2. **Learn.** Rules, worked examples, an interactive widget, and a "spot the mistake" question.
3. **Practice.** Seven problems with hints, full solutions, and a specific message for each common wrong answer.
4. **Challenge.** Two multi-part problems plus a find-the-error question.
5. **Quiz.** Five fresh questions drawn from generators. Pass mark is 4 of 5.

Each chapter ends with an 8-question test (pass mark 6). Missed questions come back in the Daily Mix at 1, 3, 7, 14 and 30 days.

## Running it locally

```
npm install
npm run dev        # http://localhost:5173
npm test           # content checks, engine, storage, UI
npm run build
```

Without Supabase keys the app runs in guest mode and saves progress in the browser only.

## Setting up your own copy

| # | Step | Where |
|---|---|---|
| 1 | Create a private repo and push this code to `main` | GitHub |
| 2 | Create a Supabase project. Note the project URL and anon key | Supabase |
| 3 | Run `supabase/migrations/0001_init.sql` | Supabase SQL editor |
| 4 | Edit `supabase/seed.sql` with your real emails and run it. Only these emails can sign in | Supabase SQL editor |
| 5 | Turn on the Google provider. Create a Web OAuth client in Google Cloud and use the callback URL Supabase shows | Google Cloud, Supabase |
| 6 | Set Site URL and Redirect URLs to `https://<user>.github.io/<repo>/` (add `http://localhost:5173/` for development) | Supabase, Auth settings |
| 7 | Add the secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` | GitHub, Actions secrets |
| 8 | Set Pages source to GitHub Actions, then push to `main` | GitHub |
| 9 | After both parent and student have signed in once, link them: `select admin_link_parent('parent@x.com','student@x.com');` | Supabase SQL editor |

The anon key is meant to be public. Row-level security protects the data: students read and write only their own rows, parents read their linked students, and the `allowed_emails` list gates everyone else.

## Workflows

| File | Runs | Does |
|---|---|---|
| `ci.yml` | Every PR and push | Content checks, tests, build |
| `deploy.yml` | Push to `main` | Tests, build with secrets, publish to Pages |
| `migrate.yml` | Manually | Applies database migrations (`supabase db push`) |

The migration workflow needs three more secrets: `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF` and `SUPABASE_DB_PASSWORD`.

## Editing content

Lessons are plain files under `content/courses/<course>/chNN/`. Open a PR and CI checks every answer key, every wrong-answer message, every generator (250 seeds each) and every widget. Progress is stored against lesson ids, so never rename an id. See `docs/AUTHORING.md` for the format.

To add a course (grade 7, SAT, Olympiad), create a new folder under `content/courses/` with a `course.js` and chapter files. It shows up in the course picker automatically.

## Known limits

- The tests prove answers are correct and generators behave. They cannot judge how well something teaches, so have a parent or coach read a chapter before the student reaches it.
- Widgets were checked in a browser at default settings only.
- Offline sync is unit-tested but has not been tried on a flaky real network.

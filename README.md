# Stanford BIOME

Next.js (App Router) + Tailwind CSS v4 + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

All content lives in `src/data/`. No JSX needs to change.

| File | What it controls |
| --- | --- |
| `site.ts` | Join link (`joinUrl`), contact email, socials, nav, headline |
| `metrics.ts` | Stats bar. Set `metricsArePlaceholder = false` once numbers are real |
| `programs.ts` | The two tracks (Shark Tank incubator, Workshop Track), Speaker Series, Shark Tank phases, "what you get" pillars, FAQ (draft answers) |
| `team.ts` | President, executive board, advisors (photo, bio, links are optional) |
| `ventures.ts` | Portfolio cards. Remove `sample: true` on real entries |
| `partners.ts` | Partner tiers and logos |
| `events.ts` | Sample schedule, used only until Google Calendar is connected |

Team photos go in `public/team/`, partner logos in `public/partners/`.

## Google Calendar, email signups, track ideas

Copy `.env.example` to `.env.local` and fill it in. The file explains each value.
Until then the calendar shows a labelled sample schedule, and signups are
accepted only in development (they are logged, not stored).

## Design tokens

Colors, fonts, and shared classes (`.wrap`, `.eyebrow`, `.display`, `.glass`)
are defined in `src/app/globals.css`.

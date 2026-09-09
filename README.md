# apexsonglab.github.io

Website for the **APEX Lab** — Department of Translational Molecular Pathology,
UT MD Anderson Cancer Center.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com)
on the [AstroWind](https://github.com/arthelokyo/astrowind) template, and
published to GitHub Pages at <https://apexsonglab.github.io>.

## Requirements

Node.js 24 (see `.nvmrc`; anything `>=22.22.3` works).

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static build into dist/
npm run preview  # serve the built site
npm run check    # astro check + eslint + prettier (same as CI)
npm run fix      # auto-fix eslint + prettier
```

`npm run check` is what CI runs — a formatting failure blocks the deploy, so run
`npm run fix` before pushing.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which checks, builds
and publishes to GitHub Pages. Pull requests run the same checks without
deploying.

One-time repo setup: **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

## Editing content

| What                   | Where                                          |
| ---------------------- | ---------------------------------------------- |
| About / home page      | `src/pages/index.astro`                        |
| Publications           | `src/data/publications.ts`                     |
| Team                   | `members` array in `src/pages/team.astro`      |
| Join us                | `src/pages/join.astro`                         |
| News                   | one markdown file per item in `src/data/news/` |
| Navigation and footer  | `src/navigation.ts`                            |
| Site title, SEO, theme | `src/config.yaml`                              |
| Colors and fonts       | `src/components/CustomStyles.astro`            |

### Adding a news item

Create `src/data/news/YYYY-MM-DD.md`:

```markdown
---
date: 2026-09-01
---

Our [paper](https://example.com) has been accepted at **NeurIPS 2026**.
```

Items are sorted newest-first automatically; the five most recent also appear on
the home page.

### Adding a publication

Prepend an entry to the `publications` array in `src/data/publications.ts`.
`mark` carries the author-order footnote (`*` co-first, `+` co-second) and
`isPI: true` bolds the lab PI. Entries are grouped by `year` automatically.

## Typography

Headings are set in **Ovo**, body and UI text in **Almarai**, matching the
reference design. Both are self-hosted and subset at build time through Astro's
native Fonts API — see the `fonts` block in `astro.config.ts` and the
`--aw-font-*` variables in `src/components/CustomStyles.astro`.

## License

Site content © APEX Lab. The underlying AstroWind template is MIT licensed —
see `LICENSE.md`.

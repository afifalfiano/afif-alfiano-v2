# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (astro dev)
npm run build     # Type-check + build for production (astro check && astro build)
npm run preview   # Preview the production build
npm run check     # Run Biome linter/formatter with auto-fix (biome check --apply-unsafe .)
```

There are no test commands — this is a static portfolio site without a test suite.

## Tech Stack

- **Astro 4** — static site generation with file-based routing in `src/pages/`
- **TypeScript** — strict mode via `astro/tsconfigs/strict`
- **Tailwind CSS** — dark mode uses `.dark` class toggled via localStorage in the main layout
- **Biome** — linter and formatter (replaces ESLint + Prettier); run `npm run check` before committing
- **Vercel** — deployment target with Vercel Analytics enabled

## Architecture

### Content Model

Blog posts live as Markdown files in `src/content/post/`. The schema is defined in `src/content/config.js` and requires: `title`, `description`, `dateFormatted`, `coverImage`, `wordCount`, `author` (name + picture), `ogImage` (url), and `status`.

Word count is calculated via `src/helpers/wordCountCalculator.js` and must be populated in frontmatter manually.

### Layouts

Two layouts in `src/layouts/`:
- `main.astro` — wraps all non-post pages; includes SEO (astro-seo), Google Analytics via Partytown, dark mode init, and decorative `SquareLines` component
- `post.astro` — wraps individual blog post pages

### Pages & Routing

All routes are file-based under `src/pages/`: `index.astro`, `posts.astro`, `projects.astro`, `about-me.astro`, `talks.astro`, plus dynamic `post/[id].astro` and `rss.xml.js`.

### OG Images

Dynamic Open Graph images are generated at build time using `astro-opengraph-images` with the Roboto font (`@fontsource/roboto`). OG image config lives in `astro.config.mjs`.

### Third-party Scripts

Google Analytics / GTM is loaded off-main-thread via Partytown. The `dataLayer.push` is forwarded in `astro.config.mjs`.

## Deployment

Static output (`output: 'static'`) deployed to Vercel. The canonical domain is `https://afifalfiano.my.id` — this must match the `site` field in `astro.config.mjs` for sitemap and RSS to generate correctly.

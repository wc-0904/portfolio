# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

This is a personal portfolio site for **Wasmir Chowdhury**, ECE student at Carnegie Mellon. See `PRD.md` for full product requirements and acceptance criteria.

## Commands

```bash
npm install          # install dependencies
npm run dev          # Vite dev server (localhost:5173)
npm run build        # production build → dist/
npm run preview      # preview the production build locally
npm run deploy       # builds then publishes to GitHub Pages via gh-pages
```

## Stack

- **React 18 + Vite** — SPA, static output
- **Framer Motion** — all animations (scroll-triggered, hover, stagger)
- **react-markdown + gray-matter** — render project `.md` files at build time
- **CSS variables** — single source of truth in `src/styles/tokens.css`
- **gh-pages** — deploy target (`npm run deploy` → `gh-pages -d dist`)

Vite `base` is set to `/` (this is a `<user>.github.io` root repo, not a project page).

## Architecture

### Content loading pattern

All project markdown is loaded at build time via:
```js
import.meta.glob('./content/projects/**/*.md', { eager: true, as: 'raw' })
```
Each raw string is parsed with `gray-matter` to split frontmatter from body. Projects are split by `status` field (`"past"` vs `"current"`), sorted by `order`.

### Content files (the only files editors ever touch)

| File | Purpose |
|------|---------|
| `src/content/site.json` | Name, tagline, nav labels, contact info, social links, resume path |
| `src/content/about.md` | About section body (plain markdown, 1–3 paragraphs) |
| `src/content/skills.json` | Skill groups: `{ "Languages": [], "Hardware & Machinery": [], "Tools": [] }` |
| `src/content/projects/past/*.md` | One file per past project |
| `src/content/projects/current/*.md` | One file per in-progress project |

Adding/removing a project = adding/removing a `.md` file only, no component edits.

### Project markdown frontmatter schema

```markdown
---
title: Project Name
order: 1
status: past        # "past" or "current"
year: 2025
stack: [C, pthreads]
links:
  - label: GitHub
    url: https://github.com/...
thumbnail: /images/projects/placeholder.png
---
Body text here. Markdown renders.
```

### Theme tokens

All colors and layout constants live in `src/styles/tokens.css`:

```css
:root {
  --bg: #0f1311;
  --surface: #161b18;
  --text: #e8ece9;
  --muted: #93a39a;
  --accent-green: #3f9d6f;
  --accent-gold: #c9a44c;
  --radius: 14px;
  --maxw: 1080px;
}
```

Gold is used sparingly (highlights, hover states, section-label accents only). Mono font for small labels/numbers; clean sans for body.

### Page sections (in order)

Hero → About (portrait + resume link) → Skills → Past Projects → In-Progress Projects → Contact → Footer

Each section is a separate component in `src/components/`. No display text is hardcoded in components; everything is passed from the content files.

## Animation conventions

- Framer Motion `whileInView` for scroll-triggered entrances (run once, `viewport={{ once: true }}`)
- Card stagger on entrance; subtle lift/scale on hover
- Durations ~0.3–0.5s, soft easing — nothing bouncy
- All motion gated behind a `prefers-reduced-motion` check

## Constraints

- No display text hardcoded in JSX — everything from `src/content/`
- No em-dashes in any user-facing copy
- No UI kit unless it clearly earns its place
- Placeholder copy is fine; mark it with a comment so it's easy to find
- `public/resume.pdf` and `public/images/portrait.jpg` are placeholders the user will replace

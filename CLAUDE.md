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

Vite `base` is set to `/portfolio/` in `vite.config.js` because this deploys as a GitHub Pages **project page** at `https://wc-0904.github.io/portfolio/`. Absolute asset URLs in content (e.g. `thumbnail: /images/...`) are served relative to that base in production, so reference public assets accordingly.

> Note: `README.md` currently describes a different deploy target (repo `wchowdhu.github.io`, `base: '/'`, user-site root). That no longer matches `vite.config.js` or this file — treat `vite.config.js` as the source of truth and flag the README as needing a refresh if you touch deploy config.

## Architecture

### Content loading pattern

All project markdown is loaded at build time in `src/lib/projects.js` via:
```js
import.meta.glob('../content/projects/**/*.md', { eager: true, query: '?raw', import: 'default' })
```
Each raw string is parsed with `gray-matter` to split frontmatter from body, producing `{ ...frontmatter, body, _path }`. The module exports `pastProjects` and `currentProjects`, filtered by the `status` field (`"past"` vs `"current"`) and sorted by `order` (missing `order` sorts last). `gray-matter` needs a `Buffer` polyfill in the browser, which is why `buffer` is a dependency (wired up in `src/buffer-polyfill.js`, imported once in `src/main.jsx`).

### Base-URL-aware asset paths

Content files (`site.json`, project frontmatter) reference public assets with root-absolute paths like `/resume.pdf` or `/images/portrait.jpg`. Vite only rewrites asset *imports*, not path strings sitting inside JSON or markdown, so those paths would 404 under the `/portfolio/` base in production. `src/lib/asset.js` exports `asset(path)`, which joins a path against `import.meta.env.BASE_URL` (passing `http(s)://` URLs through unchanged). Any component rendering a content-supplied path (resume link, portrait `src`, project thumbnails) must run it through `asset()` first.

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
video: /videos/projects/placeholder.mp4   # optional
---
Body text here. Markdown renders.
```

`video` is optional. When present, `ProjectCard` (`src/components/ProjectCard.jsx`) overlays a muted, looping `<video>` on top of the `thumbnail` image inside the card's thumb area; it plays on mouse hover (via a ref-triggered `.play()`/`.pause()`, not CSS autoplay) and fades back to the static thumbnail on mouse-leave. `thumbnail` remains required as the resting-state image and touch-device fallback. Video files live under `public/videos/projects/`, referenced the same root-absolute way as image thumbnails and resolved through `asset()`.

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
- Reduced motion is handled centrally: `App.jsx` wraps everything in `<MotionConfig reducedMotion="user">`, so Framer respects the OS setting globally — no per-component `prefers-reduced-motion` checks needed
- Shared variants (`fadeUp`, `stagger`, `inViewProps`) live in `src/lib/motion.js`; reuse them instead of redefining inline

## Constraints

- No display text hardcoded in JSX — everything from `src/content/`
- No em-dashes in any user-facing copy
- No UI kit unless it clearly earns its place
- Placeholder copy is fine; mark it with a comment so it's easy to find
- `public/resume.pdf` and `public/images/portrait.jpg` are placeholders the user will replace

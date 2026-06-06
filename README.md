# Wasmir Chowdhury — Portfolio

A single-page, dark-themed portfolio built with React 18 + Vite and Framer Motion.
All content lives in plain data files, so you can update the whole site without
touching component code.

## Run locally

This project needs Node 18+ and npm.

```bash
npm install      # first time only
npm run dev      # start the dev server (prints a localhost URL)
```

Other commands:

```bash
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally to sanity-check it
npm run deploy   # build, then publish dist/ to GitHub Pages
```

## Editing content (no code required)

Everything visible on the site comes from `src/content/`.

| What you want to change | File to edit |
| --- | --- |
| Name, tagline, subtitle, nav labels, contact info, social links, resume path | `src/content/site.json` |
| The About paragraphs | `src/content/about.md` |
| Skills (the three groups and their chips) | `src/content/skills.json` |
| Past projects | `src/content/projects/past/*.md` |
| In-progress projects | `src/content/projects/current/*.md` |

Text marked "placeholder" or "replace me" is sample copy. Search for those words
to find everything you should swap out.

### Add or remove a project

- **Add:** drop a new `.md` file into `src/content/projects/past/` (or
  `current/` for work in progress). Copy an existing file as a template.
- **Remove:** delete the file.
- **Reorder:** change the `order:` number in the frontmatter (lower shows first).

No component edits are ever needed. Projects in `current/` automatically get an
"In progress" badge.

Project file format:

```markdown
---
title: "My Project"
order: 1
status: past          # "past" or "current"
year: 2025
stack: [C, FPGA, Rust]
links:
  - label: GitHub
    url: https://github.com/you/project
thumbnail: /images/projects/placeholder.svg
---

One short paragraph in your own voice. Markdown works here (**bold**, links).
```

### Swap the resume and portrait

- **Resume:** replace `public/resume.pdf` with your real PDF (keep the filename,
  or update `"resume"` in `site.json`).
- **Portrait:** drop your photo into `public/images/` and update the `src` in
  [src/components/About.jsx](src/components/About.jsx) to point at it (the
  placeholder is `portrait.svg`). A 4:5 portrait crop looks best.
- **Project thumbnails:** add images to `public/images/projects/` and reference
  them in each project's `thumbnail:` field.

### Theme colors

All colors and layout tokens live in one file:
[src/styles/tokens.css](src/styles/tokens.css). Change a value there and it
updates everywhere. Gold is intentionally used sparingly for accents.

## Deploy to GitHub Pages

This repo is named `wchowdhu.github.io`, so it deploys to the **user site root**
and `base` is set to `/` in [vite.config.js](vite.config.js).

```bash
npm run deploy
```

This builds and pushes `dist/` to a `gh-pages` branch via the `gh-pages` package.
In your GitHub repo settings, set **Pages → Source** to the `gh-pages` branch.
The site goes live at `https://wchowdhu.github.io/`.

> If you ever move this to a project page (e.g. `github.com/wchowdhu/portfolio`),
> change `base` in `vite.config.js` to `'/portfolio/'`.

## Project structure

```
src/
  content/        # all editable content (the only thing you normally touch)
  components/     # one component + co-located CSS per section
  lib/            # projects.js (loads + parses markdown), motion.js (animations)
  styles/         # tokens.css (theme), global.css
public/           # static assets served as-is (resume, images, .nojekyll)
```

## Notes

- Animations respect `prefers-reduced-motion` (via Framer Motion's `MotionConfig`
  and a CSS fallback), so motion is disabled for users who ask for it.
- Recommended VS Code extensions are listed in
  [.vscode/extensions.json](.vscode/extensions.json) (ESLint, Prettier, React
  snippets, etc.) — VS Code will prompt to install them.

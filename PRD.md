# Product Requirements Document — Wasmir Chowdhury Portfolio Site

## 1. Overview

A personal portfolio website for Wasmir Chowdhury, an Electrical & Computer
Engineering student at Carnegie Mellon. The site presents who he is, links to his
resume, showcases past and in-progress projects, and lists his core skills
(programming languages, hardware, machinery). Tone: clean and personable with
real personality, but restrained enough that a recruiter takes it seriously. Not
corporate, not flashy.

Reference for vibe (not to copy): https://anthonyr5868.github.io/ — single-page
scroll, dark theme, distinct sections, subtle motion, project cards.

## 2. Goals

- Communicate background, skills, and projects clearly in one scroll.
- Make every piece of content editable without touching component logic.
- Smooth, sleek animations that feel intentional, never distracting.
- Fast load, mobile-responsive, accessible.
- Free hosting, simple redeploy.

## 3. Non-Goals

- No CMS, database, or backend server.
- No blog, comments, or auth.
- No heavy 3D / WebGL or loud effects that bury the content.

## 4. Target Users

- Recruiters and hiring managers (internships, new-grad, research roles).
- Professors / collaborators reviewing project work.
- Peers and personal network.

## 5. Tech Stack

| Layer       | Choice                          | Why |
|-------------|----------------------------------|-----|
| Framework   | React 18 + Vite                 | Fast dev/build, easy static output |
| Animation   | Framer Motion                   | Sleek scroll/entrance animations with minimal code |
| Content     | Markdown files + gray-matter    | Each project is its own `.md`; frontmatter holds metadata |
| MD parsing  | Vite `import.meta.glob` + react-markdown | Build-time load of all project files |
| Styling     | CSS Modules or Tailwind (builder's call) | Scoped, themeable via CSS variables |
| Hosting     | GitHub Pages (recommended)      | Free, fits existing GitHub workflow |

If PR previews are ever wanted, the same build deploys to Vercel/Netlify with no code change.

## 6. Content Architecture (Modularity Requirement)

All editable text lives in data files, never hardcoded in JSX.

```
src/
  content/
    site.json            # name, tagline, nav labels, contact, social links, resume path
    about.md             # the about paragraph(s)
    skills.json          # grouped skills: { languages: [], hardware: [], tools: [] }
  content/projects/
    past/
      green-thread-runtime.md
      rtos-pid-controller.md
      ...
    current/
      some-wip-project.md
public/
  resume.pdf             # linked from the site
  images/portrait.jpg    # user's photo
```

### Project markdown format

Each project file uses frontmatter + body:

```markdown
---
title: M:N Green Thread Runtime
order: 1
status: past            # "past" or "current"
year: 2025
stack: [C, pthreads, Chase-Lev deques]
links:
  - label: GitHub
    url: https://github.com/...
  - label: Poster
    url: https://...
thumbnail: /images/projects/green-threads.png   # optional
---

One-paragraph description of the project in the author's voice. Markdown is
rendered, so bold/links work here.
```

To add a project: drop a new `.md` file in `past/` or `current/`. To remove one:
delete the file. To reorder: change `order`. No component edits required.

## 7. Sections / Page Layout

Single-page vertical scroll with a sticky/minimal nav. Sections in order:

1. **Hero** — name, short tagline, "ECE @ CMU" line, scroll cue, primary
   button ("Resume" or "Get in touch"). Subtle entrance animation.
2. **About** — portrait image + 1–3 paragraphs from `about.md`. Resume download
   link prominent here.
3. **Skills** — three labeled groups (Languages, Hardware/Machinery, Tools).
   Rendered from `skills.json`. Optional subtle marquee or static chips.
4. **Past Projects** — cards generated from `projects/past/*.md`, sorted by `order`.
5. **In-Progress Projects** — cards from `projects/current/*.md`, visually marked
   as WIP (e.g., a small badge), so it reads as "currently building".
6. **Contact** — email, GitHub, LinkedIn from `site.json`; location; availability line.
7. **Footer** — copyright, "built by hand" style sign-off.

## 8. Design Direction

- **Theme:** dark base.
- **Palette:** ECE-flavored green + gold, muted not neon. Suggested tokens
  (builder may refine):
  - `--bg: #0f1311` (near-black green-tinted)
  - `--surface: #161b18`
  - `--text: #e8ece9`
  - `--muted: #93a39a`
  - `--accent-green: #3f9d6f` (CMU-adjacent muted green)
  - `--accent-gold: #c9a44c` (muted gold, used sparingly for highlights)
- **Type:** a clean sans for body (Inter / Geist), optional mono accent for
  labels and numbers to nod at the engineering vibe.
- **Personality, not noise:** one or two distinctive touches (e.g., mono section
  labels like "— About", a tasteful hover lift on cards) rather than many effects.
- All colors come from CSS variables in one place for easy theme tweaks.

## 9. Animation Requirements

- Section content fades/slides in on scroll (Framer Motion `whileInView`, run once).
- Project cards: gentle stagger on entrance, subtle lift/scale on hover.
- Smooth scroll for nav anchor links.
- Respect `prefers-reduced-motion`: disable non-essential motion.
- Keep durations short (~0.3–0.5s) and easing soft. Nothing bouncy or loud.

## 10. Responsiveness & Accessibility

- Mobile-first; layouts collapse to single column on small screens.
- Nav becomes a simple menu on mobile.
- Semantic HTML, alt text on images, visible focus states, AA contrast.
- Keyboard navigable; animations gated by reduced-motion.

## 11. Performance

- Lighthouse target 90+ across the board.
- Lazy-load project images; compress portrait.
- No large unused dependencies.

## 12. Deployment

- **Primary:** GitHub Pages via `gh-pages` (or Actions). Set Vite `base` to the
  repo name if using a project page; `/` if using `<user>.github.io`.
- Single command (`npm run deploy`) publishes the build.
- README documents the deploy step and how to edit content.

## 13. Acceptance Criteria

- [ ] All six sections present and populated from content files.
- [ ] Adding/removing a project markdown file updates the site with no code change.
- [ ] Resume link downloads/opens `public/resume.pdf`.
- [ ] Portrait image slot works and is swappable.
- [ ] Green/gold dark theme driven by CSS variables in one location.
- [ ] Smooth scroll + scroll-triggered animations; reduced-motion respected.
- [ ] Mobile responsive, Lighthouse 90+.
- [ ] Deploys to GitHub Pages with a documented command.

## 14. Future (Optional)

- Light/dark toggle.
- Tag filtering on projects.
- Per-project detail pages from the same markdown.

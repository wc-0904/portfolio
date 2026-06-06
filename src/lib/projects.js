import matter from 'gray-matter'

// Load every project markdown file as raw text at build time.
const files = import.meta.glob('../content/projects/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function parseAll() {
  return Object.entries(files).map(([path, raw]) => {
    const { data, content } = matter(raw)
    return { ...data, body: content, _path: path }
  })
}

const all = parseAll()

const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999)

export const pastProjects = all
  .filter((p) => p.status === 'past')
  .sort(byOrder)

export const currentProjects = all
  .filter((p) => p.status === 'current')
  .sort(byOrder)

// Resolve a public-asset path against Vite's configured base URL.
// Content files use root-absolute paths like "/resume.pdf" or
// "/images/portrait.jpg", but the site is served from a sub-path
// (import.meta.env.BASE_URL, e.g. "/portfolio/"). Vite rewrites asset
// *imports* but not path strings that live in JSON or markdown, so we join
// them here. Passing an http(s):// URL through returns it unchanged.
export function asset(path) {
  if (!path) return path
  if (/^https?:\/\//.test(path)) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/${String(path).replace(/^\//, '')}`
}

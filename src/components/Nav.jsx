import { useEffect, useState } from 'react'
import site from '../content/site.json'
import { asset } from '../lib/asset.js'
import './Nav.css'

// Map nav labels to section ids. "Work" covers both project sections.
const sectionId = (label) => label.toLowerCase()

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          {site.name}
        </a>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          {site.nav.map((label) => (
            <a
              key={label}
              href={`#${sectionId(label)}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            className="btn btn-ghost nav__resume"
            href={asset(site.resume)}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  )
}

import { useEffect, useRef, useState } from 'react'
import './ScrollCue.css'

// One fixed cue in the bottom-left that always points at the *next* section.
// As each section reaches the middle of the viewport it becomes active, and
// the cue relabels itself: About Me -> Skills -> Work -> Contact. At Contact
// there is no next section, so the cue fades out.
const STEPS = [
  { id: 'top', label: 'About Me', href: '#about' },
  { id: 'about', label: 'Skills', href: '#skills' },
  { id: 'skills', label: 'Work', href: '#work' },
  { id: 'work', label: 'Contact', href: '#contact' },
  { id: 'contact', label: null, href: null },
]

export default function ScrollCue() {
  const [activeId, setActiveId] = useState('top')
  // Keep the last real label/href so the cue fades out with its text intact.
  const [cue, setCue] = useState({ label: STEPS[0].label, href: STEPS[0].href })
  const [atEnd, setAtEnd] = useState(false) // no next section -> stay hidden
  const [visible, setVisible] = useState(false) // drives the fade
  const ratios = useRef({})

  useEffect(() => {
    const sections = STEPS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.current[e.target.id] = e.isIntersecting
            ? e.intersectionRatio
            : 0
        })
        let best = null
        let bestRatio = 0
        for (const step of STEPS) {
          const r = ratios.current[step.id] || 0
          if (r > bestRatio) {
            bestRatio = r
            best = step.id
          }
        }
        if (best) setActiveId(best)
      },
      // Active = whichever section overlaps the middle ~20% band of the screen.
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const step = STEPS.find((s) => s.id === activeId)
    // Fade the current label out, swap it while invisible, then fade back in.
    setVisible(false)
    const t = setTimeout(() => {
      if (step?.href) {
        setCue({ label: step.label, href: step.href })
        setAtEnd(false)
      } else {
        setAtEnd(true)
      }
      setVisible(true)
    }, 300)
    return () => clearTimeout(t)
  }, [activeId])

  const hidden = atEnd || !visible

  return (
    <a
      className={`scroll-cue${hidden ? ' scroll-cue--hidden' : ''}`}
      href={cue.href}
      aria-hidden={hidden}
      aria-label={`Scroll to ${cue.label}`}
    >
      <span className="scroll-cue__label">{cue.label}</span>
      <span className="scroll-cue__line" />
    </a>
  )
}

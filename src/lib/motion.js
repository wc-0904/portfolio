// Shared Framer Motion variants. Components use whileInView with viewport once,
// so entrance animations run a single time. Framer Motion itself respects
// prefers-reduced-motion via the MotionConfig in App.jsx.

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

// Convenience props for a section that fades up once when scrolled into view.
export const inViewProps = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2 },
}

import { motion } from 'framer-motion'
import site from '../content/site.json'
import { fadeUp, stagger } from '../lib/motion.js'
import './Hero.css'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container">
        <motion.div
          className="hero__inner"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p className="hero__eyebrow" variants={fadeUp}>
            {site.subtitle}
          </motion.p>
          <motion.h1 className="hero__title" variants={fadeUp}>
            {site.tagline}
          </motion.h1>
          <motion.p className="hero__name" variants={fadeUp}>
            {site.name}
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp}>
            <a className="btn btn-primary" href="#contact">
              Get in touch
            </a>
            <a
              className="btn btn-ghost"
              href={site.resume}
              target="_blank"
              rel="noreferrer"
            >
              View resume
            </a>
          </motion.div>
        </motion.div>

        <a className="hero__cue" href="#about" aria-label="Scroll to about">
          <span>Scroll</span>
          <span className="hero__cue-line" />
        </a>
      </div>
    </section>
  )
}

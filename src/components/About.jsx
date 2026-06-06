import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import aboutText from '../content/about.md?raw'
import site from '../content/site.json'
import { fadeUp, stagger, inViewProps } from '../lib/motion.js'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section about">
      <motion.div
        className="container about__grid"
        variants={stagger}
        {...inViewProps}
      >
        <motion.div className="about__portrait" variants={fadeUp}>
          <img
            src="/images/portrait.svg"
            alt={`Portrait of ${site.name}`}
            loading="lazy"
            width="420"
            height="520"
          />
        </motion.div>

        <motion.div className="about__body" variants={fadeUp}>
          <p className="section-label">// about</p>
          <h2 className="section-title">A little about me</h2>
          <div className="about__prose">
            <ReactMarkdown>{aboutText}</ReactMarkdown>
          </div>
          <a
            className="btn btn-primary about__resume"
            href={site.resume}
            target="_blank"
            rel="noreferrer"
          >
            Download resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

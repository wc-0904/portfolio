import { motion } from 'framer-motion'
import site from '../content/site.json'
import { fadeUp, stagger, inViewProps } from '../lib/motion.js'
import './Contact.css'

export default function Contact() {
  const { email, location, availability } = site.contact

  return (
    <section id="contact" className="section contact">
      <motion.div className="container" variants={stagger} {...inViewProps}>
        <motion.p className="section-label" variants={fadeUp}>
          // contact
        </motion.p>
        <motion.h2 className="section-title contact__title" variants={fadeUp}>
          Let us build something.
        </motion.h2>
        <motion.p className="contact__avail eyebrow" variants={fadeUp}>
          {availability}
        </motion.p>

        <motion.a
          className="btn btn-primary contact__email"
          href={`mailto:${email}`}
          variants={fadeUp}
        >
          {email}
        </motion.a>

        <motion.div className="contact__meta" variants={fadeUp}>
          <span className="eyebrow">{location}</span>
          <div className="contact__socials">
            {site.socials.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
                {s.label} &rarr;
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

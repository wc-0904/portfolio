import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { fadeUp } from '../lib/motion.js'
import { asset } from '../lib/asset.js'

export default function ProjectCard({ project }) {
  const { title, year, stack = [], links = [], thumbnail, body, status } =
    project

  return (
    <motion.article
      className="project-card"
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {thumbnail && (
        <div className="project-card__thumb">
          <img src={asset(thumbnail)} alt={`${title} thumbnail`} loading="lazy" />
          {status === 'current' && (
            <span className="project-card__badge">In progress</span>
          )}
        </div>
      )}

      <div className="project-card__body">
        <header className="project-card__head">
          <h3 className="project-card__title">{title}</h3>
          {year && <span className="project-card__year">{year}</span>}
        </header>

        <div className="project-card__desc">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>

        {stack.length > 0 && (
          <ul className="project-card__stack">
            {stack.map((s) => (
              <li className="chip" key={s}>
                {s}
              </li>
            ))}
          </ul>
        )}

        {links.length > 0 && (
          <div className="project-card__links">
            {links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="project-card__link"
              >
                {l.label} &rarr;
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}

import { motion } from 'framer-motion'
import { pastProjects, currentProjects } from '../lib/projects.js'
import { fadeUp, stagger, inViewProps } from '../lib/motion.js'
import ProjectCard from './ProjectCard.jsx'
import './Projects.css'

function Grid({ projects }) {
  return (
    <motion.div className="projects__grid" variants={stagger} {...inViewProps}>
      {projects.map((p) => (
        <ProjectCard key={p._path} project={p} />
      ))}
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="work" className="section projects">
      <div className="container">
        <motion.div variants={fadeUp} {...inViewProps}>
          <p className="section-label">// work</p>
          <h2 className="section-title">Past projects</h2>
        </motion.div>
        {pastProjects.length > 0 ? (
          <Grid projects={pastProjects} />
        ) : (
          <p className="eyebrow">No past projects yet.</p>
        )}

        {currentProjects.length > 0 && (
          <>
            <motion.div
              className="projects__subhead"
              variants={fadeUp}
              {...inViewProps}
            >
              <h2 className="section-title">In progress</h2>
              <p className="eyebrow">What I am building right now.</p>
            </motion.div>
            <Grid projects={currentProjects} />
          </>
        )}
      </div>
    </section>
  )
}

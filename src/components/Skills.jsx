import { motion } from 'framer-motion'
import skills from '../content/skills.json'
import { fadeUp, stagger, inViewProps } from '../lib/motion.js'
import './Skills.css'

export default function Skills() {
  const groups = Object.entries(skills)

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.div variants={fadeUp} {...inViewProps}>
          <p className="section-label">// skills</p>
          <h2 className="section-title">What I work with</h2>
        </motion.div>

        <motion.div className="skills__grid" variants={stagger} {...inViewProps}>
          {groups.map(([group, items]) => (
            <motion.div className="skills__card" key={group} variants={fadeUp}>
              <h3 className="skills__group">{group}</h3>
              <ul className="skills__list">
                {items.map((item) => (
                  <li className="chip" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

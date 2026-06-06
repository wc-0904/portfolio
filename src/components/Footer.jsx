import site from '../content/site.json'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          &copy; {year} {site.name}
        </span>
        <span className="footer__sign">Built by hand. No template.</span>
      </div>
    </footer>
  )
}

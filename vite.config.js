import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This is a GitHub Pages project page served from a subpath, so base must match
// the repo name: https://wc-0904.github.io/portfolio/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})

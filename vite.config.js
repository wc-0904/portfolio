import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/' because this deploys to a <user>.github.io root repo.
// For a project page (github.com/<user>/<repo>) change this to '/<repo-name>/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})

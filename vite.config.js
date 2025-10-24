import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = process.env.REPO_NAME || ''
const isPages = process.env.GITHUB_PAGES === 'true'
const base = isPages && repoName ? `/${repoName}/` : '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})

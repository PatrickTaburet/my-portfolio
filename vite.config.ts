// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/p5')) {
            return 'p5'
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap'
          }
          if (id.includes('node_modules/react')) {
            return 'react'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})

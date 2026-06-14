import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Production build is emitted into ./docs so GitHub Pages can serve the site
// directly from the "master /docs" source. The site lives at the domain root
// (zfhassaan.github.io), so base stays "/".
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})

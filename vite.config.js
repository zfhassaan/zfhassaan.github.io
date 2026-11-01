import { writeFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages runs Jekyll by default, and Jekyll hides every file whose name
// starts with "_". Vue's build emits _plugin-vue_export-helper-*.js, so without
// this marker the browser never receives that module and the page stays blank.
function githubPagesNoJekyll() {
  return {
    name: 'github-pages-nojekyll',
    closeBundle() {
      writeFileSync(fileURLToPath(new URL('./docs/.nojekyll', import.meta.url)), '')
    },
  }
}

// Production build is emitted into ./docs so GitHub Pages can serve the site
// directly from the "master /docs" source. The site lives at the domain root
// (zfhassaan.github.io), so base stays "/".
export default defineConfig({
  base: '/',
  plugins: [vue(), githubPagesNoJekyll()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Keep the codec packages out of pre-bundling so their .wasm URLs stay intact.
  optimizeDeps: {
    exclude: ['@jsquash/jpeg', '@jsquash/webp', '@jsquash/oxipng'],
  },
  worker: {
    format: 'es',
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    // Keep codec binaries as separate files so GitHub Pages can serve them.
    assetsInlineLimit: 0,
  },
})

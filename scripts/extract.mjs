/**
 * One-time migration helper: splits the legacy monolithic index.html into
 * Vue-friendly assets (portfolio.css, portfolio-engine.js, section .vue files).
 *
 * Run: npm run extract
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const htmlPath = join(root, 'index.html')
const html = readFileSync(htmlPath, 'utf8')

function between(startMarker, endMarker) {
  const start = html.indexOf(startMarker)
  const end = html.indexOf(endMarker, start)
  if (start === -1 || end === -1) {
    throw new Error(`Marker not found: ${startMarker}`)
  }
  return html.slice(start + startMarker.length, end)
}

// ── CSS (everything inside the single <style> block) ──
const css = between('<style>', '</style>').trim()
mkdirSync(join(root, 'src/assets/styles'), { recursive: true })
writeFileSync(join(root, 'src/assets/styles/portfolio.css'), css + '\n')
console.log(`✓ portfolio.css  (${css.length} chars)`)

// ── JS animation engine (inside <script> before </body>) ──
const scriptStart = html.indexOf('<!-- SCRIPTS -->')
const scriptBlock = html.slice(scriptStart)
const js = between('<script>', '</script>').trim()

// Replace DOMContentLoaded with a named export so Vue can call it after mount
const jsModule = js
  .replace(
    /document\.addEventListener\('DOMContentLoaded',\s*function\s*\(\)\s*\{/,
    'export function initPortfolioEngine() {',
  )
  .replace(
    /\/\* ── Debounced resize ── \*\/\s*\(function\s*\(\)\s*\{[\s\S]*?\}\)\(\);/,
    `/* ── Debounced resize ── */
(function () {
    let rafId = null;
    window.addEventListener('resize', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            rafId = null;
        });
    }, { passive: true });
})();`,
  )

mkdirSync(join(root, 'src/composables'), { recursive: true })
writeFileSync(join(root, 'src/composables/portfolio-engine.js'), jsModule + '\n')
console.log(`✓ portfolio-engine.js`)

// ── Section markup slices (body inner HTML, line-accurate from index.html) ──
const sections = [
  { name: 'AppCursor', start: '<!-- CURSOR -->', end: '<!-- MOBILE MENU -->' },
  { name: 'AppMobileMenu', start: '<!-- MOBILE MENU -->', end: '<!-- NAV -->' },
  { name: 'AppNav', start: '<!-- NAV -->', end: '<!-- ══ HERO ══ -->' },
  { name: 'HeroSection', start: '<!-- ══ HERO ══ -->', end: '<!-- ══ METRICS ══ -->' },
  { name: 'MetricsSection', start: '<!-- ══ METRICS ══ -->', end: '<!-- ══ PROJECTS ══ -->' },
  { name: 'ProjectsSection', start: '<!-- ══ PROJECTS ══ -->', end: '<!-- ══ OPEN SOURCE ══ -->' },
  { name: 'OpenSourceSection', start: '<!-- ══ OPEN SOURCE ══ -->', end: '<!-- ══ ARCHITECTURE PLAYGROUND ══ -->' },
  { name: 'PlaygroundSection', start: '<!-- ══ ARCHITECTURE PLAYGROUND ══ -->', end: '<!-- ══ EXPERTISE ══ -->' },
  { name: 'ExpertiseSection', start: '<!-- ══ EXPERTISE ══ -->', end: '<!-- ══ TIMELINE ══ -->' },
  { name: 'TimelineSection', start: '<!-- ══ TIMELINE ══ -->', end: '<!-- ══ CONTACT ══ -->' },
  { name: 'ContactSection', start: '<!-- ══ CONTACT ══ -->', end: '<!-- FOOTER -->' },
  { name: 'AppFooter', start: '<!-- FOOTER -->', end: '<!-- SCRIPTS -->' },
]

const componentsDir = join(root, 'src/components')
mkdirSync(componentsDir, { recursive: true })

for (const { name, start, end } of sections) {
  const startIdx = html.indexOf(start)
  const endIdx = html.indexOf(end, startIdx)
  if (startIdx === -1 || endIdx === -1) {
    console.warn(`⚠ Skipped ${name} — markers not found`)
    continue
  }
  let markup = html.slice(startIdx, endIdx).trim()

  // Vue template cannot contain a top-level <html>/<body>; strip comment headers
  // but keep all element markup and ids/classes intact for the GSAP engine.
  const vueFile = `<template>\n${markup}\n</template>\n`
  writeFileSync(join(componentsDir, `${name}.vue`), vueFile)
  console.log(`✓ ${name}.vue`)
}

console.log('\nDone. Run: npm install && npm run dev')

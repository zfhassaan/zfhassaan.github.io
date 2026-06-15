<template>
  <main>
    <HeroSection />
    <MetricsSection />
    <ProjectsSection />
    <OpenSourceSection />
    <PlaygroundSection />
    <ExpertiseSection />
    <TimelineSection />
    <ContactSection />
  </main>
</template>

<script setup>
import { onMounted, onActivated } from 'vue'
import { initPortfolioEngine } from '@/composables/portfolio-engine'

import HeroSection from '@/components/HeroSection.vue'
import MetricsSection from '@/components/MetricsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import OpenSourceSection from '@/components/OpenSourceSection.vue'
import PlaygroundSection from '@/components/PlaygroundSection.vue'
import ExpertiseSection from '@/components/ExpertiseSection.vue'
import TimelineSection from '@/components/TimelineSection.vue'
import ContactSection from '@/components/ContactSection.vue'

// Named so <keep-alive include="HomeView"> can target this view and keep the
// GSAP-driven DOM alive across route changes (the engine only initializes once).
defineOptions({ name: 'HomeView' })

onMounted(() => {
  // GSAP is loaded globally via index.html <script> tags before the Vue bundle.
  // The engine expects the full DOM to be painted with original ids/classes.
  initPortfolioEngine()
  requestAnimationFrame(() => {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh()
  })
})

// Returning from a tool page re-activates the cached view; recalc triggers so
// pinned/scroll animations line up with the restored scroll position.
onActivated(() => {
  requestAnimationFrame(() => {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh()
  })
})
</script>

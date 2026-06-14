<template>
  <AppCursor />
  <AppMobileMenu />
  <AppNav />
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
  <AppFooter />
</template>

<script setup>
import { onMounted } from 'vue'
import { initPortfolioEngine } from '@/composables/portfolio-engine'

import AppCursor from '@/components/AppCursor.vue'
import AppMobileMenu from '@/components/AppMobileMenu.vue'
import AppNav from '@/components/AppNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import MetricsSection from '@/components/MetricsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import OpenSourceSection from '@/components/OpenSourceSection.vue'
import PlaygroundSection from '@/components/PlaygroundSection.vue'
import ExpertiseSection from '@/components/ExpertiseSection.vue'
import TimelineSection from '@/components/TimelineSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import AppFooter from '@/components/AppFooter.vue'

onMounted(() => {
  // GSAP is loaded globally via index.html <script> tags before the Vue bundle.
  // The engine expects the full DOM to be painted with original ids/classes.
  initPortfolioEngine()
  requestAnimationFrame(() => {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh()
  })
})
</script>

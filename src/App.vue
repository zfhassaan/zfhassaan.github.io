<template>
  <AppCursor />
  <AppMobileMenu />
  <AppNav />
  <router-view v-slot="{ Component }">
    <!-- HomeView stays cached so its GSAP engine (init-once) survives navigation -->
    <keep-alive include="HomeView">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <AppFooter />
</template>

<script setup>
import { onMounted } from 'vue'
import { initGlobalChrome } from '@/composables/portfolio-engine'

import AppCursor from '@/components/AppCursor.vue'
import AppMobileMenu from '@/components/AppMobileMenu.vue'
import AppNav from '@/components/AppNav.vue'
import AppFooter from '@/components/AppFooter.vue'

// Nav, cursor and mobile menu live here and exist on every route, so wire their
// interactions up regardless of which view is active (e.g. a direct /tools load).
// HomeView additionally calls initPortfolioEngine() for the home-only animations.
onMounted(() => initGlobalChrome())
</script>

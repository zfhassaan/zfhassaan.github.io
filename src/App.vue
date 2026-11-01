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
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { initGlobalChrome } from '@/composables/portfolio-engine'
import { applyDocumentLocale } from '@/lib/locale'

const route = useRoute()
const { locale, t } = useI18n()

watch(locale, (code) => {
  applyDocumentLocale(code)
  if (route.name !== 'tool') document.title = t('meta.title')
})

import AppCursor from '@/components/AppCursor.vue'
import AppMobileMenu from '@/components/AppMobileMenu.vue'
import AppNav from '@/components/AppNav.vue'
import AppFooter from '@/components/AppFooter.vue'

// Nav, cursor and mobile menu live here and exist on every route, so wire their
// interactions up regardless of which view is active (e.g. a direct /tools load).
// HomeView additionally calls initPortfolioEngine() for the home-only animations.
onMounted(() => initGlobalChrome())
</script>

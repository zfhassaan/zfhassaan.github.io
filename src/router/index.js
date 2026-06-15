import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import('@/views/ToolsView.vue'),
  },
  {
    path: '/tools/json',
    name: 'tools-json',
    component: () => import('@/views/tools/JsonToolView.vue'),
  },
  // Anything unknown falls back to the resume.
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  // Hash history keeps deep links working on GitHub Pages with zero server config.
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // In-page section links (e.g. /#projects) smooth-scroll to the element,
    // offset so the fixed nav doesn't cover the heading.
    if (to.hash) {
      return { el: to.hash, top: 84, behavior: 'smooth' }
    }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router

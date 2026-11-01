import { createApp } from 'vue'
import './assets/styles/tailwind.css'
import './assets/styles/portfolio.css'
import './assets/styles/tool-ui.css'
import './assets/styles/locale.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { applyDocumentLocale, detectLocale } from './lib/locale'

const locale = await detectLocale()
i18n.global.locale.value = locale
applyDocumentLocale(locale)
document.title = i18n.global.t('meta.title')

createApp(App).use(router).use(i18n).mount('#app')

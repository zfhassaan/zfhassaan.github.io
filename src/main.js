import { createApp } from 'vue'
import './assets/styles/tailwind.css'
import './assets/styles/portfolio.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

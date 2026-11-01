import { createI18n } from 'vue-i18n'
import en from './en'
import ur from './ur'
import fr from './fr'
import es from './es'
import nl from './nl'
import de from './de'
import ar from './ar'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  missingWarn: false,
  fallbackWarn: false,
  messages: { en, ur, fr, es, nl, de, ar },
})

export default i18n

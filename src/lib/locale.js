export const LOCALES = [
  { code: 'en', native: 'English', dir: 'ltr' },
  { code: 'fr', native: 'Français', dir: 'ltr' },
  { code: 'es', native: 'Español', dir: 'ltr' },
  { code: 'nl', native: 'Nederlands', dir: 'ltr' },
  { code: 'de', native: 'Deutsch', dir: 'ltr' },
  { code: 'ar', native: 'العربية', dir: 'rtl' },
]

const STORAGE_KEY = 'site-locale'

const COUNTRY = {
  PK: 'en',
  NL: 'nl', AW: 'nl', CW: 'nl', SX: 'nl', BQ: 'nl', SR: 'nl', BE: 'nl',
  FR: 'fr', MC: 'fr', LU: 'fr', SN: 'fr', CI: 'fr', ML: 'fr', BF: 'fr', NE: 'fr',
  TD: 'fr', CM: 'fr', GA: 'fr', CG: 'fr', CD: 'fr', MG: 'fr', HT: 'fr',
  DE: 'de', AT: 'de', LI: 'de', CH: 'de',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', EC: 'es',
  GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es', SV: 'es', NI: 'es',
  CR: 'es', PA: 'es', UY: 'es', GQ: 'es', PR: 'es',
  SA: 'ar', AE: 'ar', EG: 'ar', IQ: 'ar', JO: 'ar', KW: 'ar', LB: 'ar', LY: 'ar',
  MA: 'ar', OM: 'ar', QA: 'ar', SD: 'ar', SY: 'ar', TN: 'ar', YE: 'ar', BH: 'ar',
  DZ: 'ar', PS: 'ar', MR: 'ar', SO: 'ar',
}

const TIMEZONE = {
  'Asia/Karachi': 'en',
  'Europe/Berlin': 'de',
  'Europe/Vienna': 'de',
  'Europe/Zurich': 'de',
  'Europe/Vaduz': 'de',
  'Europe/Amsterdam': 'nl',
  'Europe/Brussels': 'nl',
  'Europe/Paris': 'fr',
  'Europe/Monaco': 'fr',
  'Europe/Luxembourg': 'fr',
  'Europe/Madrid': 'es',
  'America/Mexico_City': 'es',
  'America/Argentina/Buenos_Aires': 'es',
  'America/Bogota': 'es',
  'America/Lima': 'es',
  'America/Santiago': 'es',
  'America/Caracas': 'es',
  'Asia/Riyadh': 'ar',
  'Asia/Dubai': 'ar',
  'Asia/Baghdad': 'ar',
  'Asia/Amman': 'ar',
  'Asia/Beirut': 'ar',
  'Asia/Kuwait': 'ar',
  'Asia/Qatar': 'ar',
  'Asia/Bahrain': 'ar',
  'Asia/Muscat': 'ar',
  'Africa/Cairo': 'ar',
  'Africa/Casablanca': 'ar',
  'Africa/Tunis': 'ar',
  'Africa/Algiers': 'ar',
  'Africa/Tripoli': 'ar',
  'Africa/Khartoum': 'ar',
}

export function localeMeta(code) {
  return LOCALES.find((item) => item.code === code) || LOCALES[0]
}

export function readSavedLocale() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'ur') {
      localStorage.setItem(STORAGE_KEY, 'en')
      return 'en'
    }
    return LOCALES.some((item) => item.code === value) ? value : ''
  } catch {
    return ''
  }
}

export function saveLocale(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    /* private mode */
  }
}

export function applyDocumentLocale(code) {
  const item = localeMeta(code)
  document.documentElement.lang = item.code
  document.documentElement.dir = item.dir
}

function fromNavigator() {
  const list = navigator.languages?.length ? navigator.languages : [navigator.language || 'en']
  for (const tag of list) {
    const code = String(tag || '').slice(0, 2).toLowerCase()
    if (LOCALES.some((item) => item.code === code)) return code
  }
  return 'en'
}

async function countryCode() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 2000)
  try {
    const response = await fetch('https://ipwho.is/', { signal: controller.signal })
    if (!response.ok) return ''
    const data = await response.json()
    if (data?.success && data.country_code) return String(data.country_code).toUpperCase()
  } catch {
    return ''
  } finally {
    clearTimeout(timer)
  }
  return ''
}

export async function detectLocale() {
  const saved = readSavedLocale()
  if (saved) return saved
  const country = await countryCode()
  if (country && COUNTRY[country]) return COUNTRY[country]
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (zone && TIMEZONE[zone]) return TIMEZONE[zone]
  return fromNavigator()
}

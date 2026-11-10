import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

// Resources must follow template's format
export const RESOURCES = {
  en: {
    translation: 'portfolio-en.json'
  },
  fr: {
    translation: 'portfolio-fr.json'
  },
  pt: {
    translation: 'portfolio-pt.json'
  }
}

type Language = keyof typeof RESOURCES

const STORAGE_KEY = 'site-language'
const isLanguage = (code: unknown): code is Language =>
  typeof code === 'string' && Object.prototype.hasOwnProperty.call(RESOURCES, code)

function savedLanguage(): Language | undefined {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return isLanguage(saved) ? saved : undefined
  } catch {
    return undefined
  }
}

// First browser language we have a translation for: fr-CA → fr, pt-BR → pt.
function browserLanguage(): Language | undefined {
  const wanted = navigator.languages?.length ? navigator.languages : [navigator.language]
  return wanted.map((code) => String(code).toLowerCase().split('-')[0]).find(isLanguage)
}

// A language the visitor picked with the EN/FR/PT buttons wins, then the browser's, then English.
const initialLanguage: Language = savedLanguage() ?? browserLanguage() ?? 'en'

i18next.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})

i18next.use(initReactI18next).init({
  lng: initialLanguage,
  debug: false,
  resources: RESOURCES,
  fallbackLng: 'en'
})

// Remember only explicit choices, so visitors who never pick keep following their browser.
export function chooseLanguage(lng: Language) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // Private mode or blocked storage: the choice just won't survive a reload.
  }
  return i18next.changeLanguage(lng)
}

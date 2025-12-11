import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  // Future languages:
  // { code: 'es', name: 'Spanish', nativeName: 'Español' },
  // { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  // { code: 'fr', name: 'French', nativeName: 'Français' },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

// Get stored language preference or detect from browser
const getInitialLanguage = (): LanguageCode => {
  // Check localStorage first
  const stored = localStorage.getItem('ribbit-language');
  if (stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored)) {
    return stored as LanguageCode;
  }

  // Try to match browser language
  const browserLang = navigator.language.split('-')[0];
  const match = SUPPORTED_LANGUAGES.find((l) => l.code === browserLang);
  if (match) {
    return match.code;
  }

  // Default to English
  return 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    // Future: add more languages
    // es: { translation: es },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    useSuspense: false,
  },
});

// Helper to change language and persist preference
export const setLanguage = (code: LanguageCode) => {
  localStorage.setItem('ribbit-language', code);
  i18n.changeLanguage(code);
};

export default i18n;

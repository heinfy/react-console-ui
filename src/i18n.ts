import { getLanguage, locales } from '@/locales';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = Object.entries(locales).reduce(
  (acc, [key, local]) => ({
    ...acc,
    [key]: {
      translation: local
    }
  }),
  {}
);

const lang = getLanguage();

document.documentElement.lang = lang;

i18n.use(initReactI18next).init({
  resources,
  lng: lang,
  fallbackLng: lang,
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;

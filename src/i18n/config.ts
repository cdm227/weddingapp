import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import itTranslations from './locales/it.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'it',
    lng: 'it',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      it: { translation: itTranslations },
    },
  });

export default i18n;

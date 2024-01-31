import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import chitTranslation from './locales/chitTranslation.json';
import enTranslation from './locales/enTranslation.json';

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
        escapeValue: false,
    },

    supportedLngs: ['en', 'chit'],
    resources: {
        en: {
            translation: enTranslation,
        },
        chit: {
            translation: chitTranslation,
        },
    },
});

export default i18n;

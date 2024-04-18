import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import chit from './locales/chit.json';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
        escapeValue: false,
    },

    supportedLngs: ['en', 'chit'],
    resources: {
        en: {
            translation: en,
        },
        chit: {
            translation: chit,
        },
    },
});

export default i18n;

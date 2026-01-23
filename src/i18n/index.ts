import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import ptBR from './locales/pt-BR';
import enUS from './locales/en-US';

const resources = {
  'pt-BR': { translation: ptBR },
  'en-US': { translation: enUS },
};

// Detecta o idioma do dispositivo
const deviceLanguage = Localization.getLocales()[0]?.languageTag ?? 'pt-BR';

// Check if device language is supported
const supportedLanguages = Object.keys(resources);
const initialLanguage = supportedLanguages.includes(deviceLanguage)
  ? deviceLanguage
  : 'pt-BR';

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'pt-BR',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

/**
 * Função para sincronizar o idioma do i18n com o store
 * Chamada no AppProvider após carregar as preferências
 */
export const syncLanguageWithStore = (language: string) => {
  if (supportedLanguages.includes(language)) {
    i18n.changeLanguage(language);
  }
};

export default i18n;

// Type-safe translations
export type TranslationKeys = typeof ptBR;
